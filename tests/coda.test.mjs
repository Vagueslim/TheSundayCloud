import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";
import { routes, workSlugs } from "../src/data/routes.js";
import { alternateCodaRoute, codaRoutePath, codaRoutes, codaWorkSlugs } from "../src/data/coda-routes.js";
import { findWork } from "../src/data/work-items.js";
import { escapeHtml } from "../scripts/lib/html.js";

const projectRoot = resolve(import.meta.dirname, "..");
const pageRoots = [projectRoot, resolve(projectRoot, "dist")];
const deploymentBase = process.env.PORTFOLIO_BASE || "/";
const count = (html, pattern) => (html.match(pattern) || []).length;
const attribute = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
const local = (value) => !/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value);

function pathname(href, route) {
  return decodeURIComponent(new URL(href, `https://portfolio.invalid${route.path}`).pathname);
}

async function targetFile(root, href, route) {
  let resolvedPath = pathname(href, route);
  // Vite prefixes production assets for project Pages, but dist has no prefix folder.
  if (root !== projectRoot && deploymentBase !== "/" && resolvedPath.startsWith(deploymentBase)) {
    resolvedPath = resolvedPath.slice(deploymentBase.length);
  }
  const relativePath = resolvedPath.replace(/^\//, "");
  let path = resolve(root, relativePath);
  try {
    await access(path);
  } catch (error) {
    if (root !== projectRoot || error.code !== "ENOENT") throw error;
    // Vite serves public files from the site root and copies them to dist.
    path = resolve(root, "public", relativePath);
    await access(path);
  }
  return (await stat(path)).isDirectory() ? resolve(path, "index.html") : path;
}

test("Coda adds 12 isolated routes and preserves the original 28-page manifest", () => {
  assert.equal(routes.length, 28);
  assert.equal(codaRoutes.length, 12);
  assert.deepEqual(codaWorkSlugs, ["smart-asset-sa-ai", "rescheduling-pain", "wcf-digital"]);
  assert.equal(new Set([...routes, ...codaRoutes].map((route) => route.key)).size, 40);
  assert.equal(new Set([...routes, ...codaRoutes].map((route) => route.path)).size, 40);
  for (const locale of ["en", "th"]) {
    assert.equal(codaRoutes.filter((route) => route.locale === locale).length, 6);
  }
  for (const route of codaRoutes) {
    const alternate = alternateCodaRoute(route);
    assert.equal(alternate.page, route.page);
    assert.equal(alternate.slug, route.slug);
    assert.equal(alternateCodaRoute(alternate).path, route.path);
  }
  assert.throws(() => codaRoutePath("en", "work-detail", "maxi-task"), /Unknown Coda work/);
});

test("all 12 source and production pages retain language, navigation, and case boundaries", async () => {
  const excluded = workSlugs.filter((slug) => !codaWorkSlugs.includes(slug));
  for (const root of pageRoots) {
    for (const route of codaRoutes) {
      const html = await readFile(resolve(root, route.file), "utf8");
      assert.match(html, new RegExp(`<html lang="${route.locale}"`), route.path);
      assert.equal(count(html, /<main\b/g), 1, `${route.path} must have one main landmark`);
      assert.equal(count(html, /<h1\b/g), 1, `${route.path} must have one page title`);
      assert.doesNotMatch(html, /�|Ã|Â©|â€”|â†/, `${route.path} has invalid encoding`);

      const nav = html.match(/<nav\b[^>]*\bdata-coda-nav(?:="[^"]*")?(?=\s|>)[\s\S]*?<\/nav>/)?.[0];
      assert.ok(nav, `${route.path} must identify its primary navigation`);
      const navLinks = [...nav.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map((match) => pathname(match[1], route));
      assert.deepEqual(navLinks, ["home", "about", "work-index"].map((page) => codaRoutePath(route.locale, page)), `${route.path} navigation must contain Home, About, and Work only`);

      const languageTag = html.match(/<a\b[^>]*\bdata-coda-language(?:="[^"]*")?(?=\s|>)[^>]*>/)?.[0];
      assert.ok(languageTag, `${route.path} is missing its language switch`);
      assert.equal(pathname(attribute(languageTag, "href"), route), alternateCodaRoute(route).path, `${route.path} language switch must retain the page and case`);
      for (const slug of excluded) {
        assert.doesNotMatch(html, new RegExp(`href="[^"]*\\/work\\/${slug}\\/`), `${route.path} leaks excluded case ${slug}`);
      }
      for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
        if (!local(match[1])) continue;
        const target = new URL(match[1], `https://portfolio.invalid${route.path}`);
        if (!target.pathname.match(/\.[a-z\d]+$/i)) {
          assert.ok(codaRoutes.some((candidate) => candidate.path === target.pathname), `${route.path} leaves Coda edition via ${match[1]}`);
        }
        const file = await targetFile(root, match[1], route);
        if (target.hash) {
          const destinationHtml = await readFile(file, "utf8");
          const id = decodeURIComponent(target.hash.slice(1));
          assert.ok(destinationHtml.includes(`id="${id}"`), `${route.path} has missing fragment ${match[1]}`);
        }
      }
    }
  }
});

test("Sunday Cloud opens with Smart Asset, retains Q-CHANG research counts, and closes the case loop", async () => {
  for (const root of pageRoots) {
    for (const route of codaRoutes) {
      const html = await readFile(resolve(root, route.file), "utf8");
      assert.doesNotMatch(html, /\b(?:70|80|92)%|T\+3/, `${route.path} must not contain unsupported improvement claims`);
      if (route.page === "home") {
        const featuredHref = html.match(/<div class="co-hero-project"><div class="co-section-line">[\s\S]*?<a href="([^"]+)">PEC Smart Asset/)?.[1];
        assert.ok(featuredHref, `${route.path} must feature Smart Asset`);
        assert.equal(pathname(featuredHref, route), codaRoutePath(route.locale, "work-detail", "smart-asset-sa-ai"));
        assert.ok(html.includes('class="co-wcf-feature"'), `${route.path} needs Smart Asset interface evidence in the hero`);
        for (const value of ["3,999", "3,545", "454"]) assert.ok(html.includes(value), `${route.path} is missing study count ${value}`);
      }
      if (route.page === "home" || route.page === "work-index") {
        assert.ok(html.indexOf('data-coda-project="smart-asset-sa-ai"') < html.indexOf('data-coda-project="rescheduling-pain"') && html.indexOf('data-coda-project="rescheduling-pain"') < html.indexOf('data-coda-project="wcf-digital"'), `${route.path} must show Smart Asset, Q-CHANG, then WCF`);
      }
      if (route.page === "work-detail") {
        const nextTag = html.match(/<a\b[^>]*\bdata-coda-next(?:="[^"]*")?(?=\s|>)[^>]*>/)?.[0];
        assert.ok(nextTag, `${route.path} must provide a next case`);
        const nextSlug = codaWorkSlugs[(codaWorkSlugs.indexOf(route.slug) + 1) % codaWorkSlugs.length];
        assert.equal(pathname(attribute(nextTag, "href"), route), codaRoutePath(route.locale, "work-detail", nextSlug), `${route.path} has the wrong next case`);
      }
    }
  }
});

test("WCF cards expose a three-image slider in both languages and builds", async () => {
  for (const root of pageRoots) {
    for (const route of codaRoutes.filter((item) => item.page === "home" || item.page === "work-index")) {
      const html = await readFile(resolve(root, route.file), "utf8");
      const card = html.match(/<article class="co-project" data-coda-project="wcf-digital">[\s\S]*?<\/article>/)?.[0];
      assert.ok(card, `${route.path} is missing the WCF card`);
      assert.equal(count(card, /data-wcf-slide="\d"/g), 3, `${route.path} needs three evidence thumbnails`);
      assert.match(card, /data-wcf-image\b/, `${route.path} is missing the main image`);
      assert.match(card, /data-wcf-prev\b/, `${route.path} is missing the previous control`);
      assert.match(card, /data-wcf-next\b/, `${route.path} is missing the next control`);
      assert.match(card, /data-wcf-count>1\/3<\/span>/, `${route.path} is missing the slide count`);
    }
  }
});

test("every Coda image, stylesheet, and script resolves in source and production", async () => {
  for (const root of pageRoots) {
    for (const route of codaRoutes) {
      const html = await readFile(resolve(root, route.file), "utf8");
      const tags = html.match(/<(?:img|script|link)\b[^>]*>/g) || [];
      for (const tag of tags) {
        const ref = attribute(tag, "src") || (/<link\b/.test(tag) && /rel="(?:stylesheet|icon|modulepreload)"/.test(tag) ? attribute(tag, "href") : "");
        if (!ref || !local(ref)) continue;
        try {
          await targetFile(root, ref, route);
        } catch (error) {
          assert.fail(`${route.path} has missing asset ${ref} in ${root}: ${error.message}`);
        }
      }
    }
  }
});

test("Smart Asset carries all original bilingual Master Asset and Site operation evidence into Coda", async () => {
  const flow = findWork("smart-asset-sa-ai").coverFlow;
  for (const root of pageRoots) {
    for (const route of codaRoutes.filter(route => route.slug === "smart-asset-sa-ai")) {
      const html = await readFile(resolve(root, route.file), "utf8");
      const section = html.match(/<section\b[^>]*data-asset-site-flow[^>]*>[\s\S]*?<\/section>/)?.[0];
      assert.ok(section, `${route.path} must include the source flow`);
      assert.ok(section.includes(escapeHtml(flow.heading[route.locale])));
      assert.ok(section.includes(escapeHtml(flow.description[route.locale])));
      assert.deepEqual([...section.matchAll(/data-asset-flow-node="([^"]+)"/g)].map(match => match[1]), flow.nodes.map(node => node.id));
      assert.equal(count(section, /data-image-modal-trigger\b/g), flow.nodes.length, "Every source screen must open the evidence viewer");
      assert.doesNotMatch(section, /data:image\/gif/, "Mobile must receive all real evidence images");
      for (const node of flow.nodes) {
        assert.ok(section.includes(escapeHtml(node.title[route.locale])), node.id);
        assert.ok(section.includes(escapeHtml(node.description[route.locale])), node.id);
        assert.ok(section.includes(`alt="${escapeHtml(node.media.alt[route.locale])}"`), node.id);
      }
      for (const edge of flow.edges) assert.ok(section.includes(escapeHtml(edge.label[route.locale])));
    }
  }
});

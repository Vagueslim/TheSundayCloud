import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { routes, routePath, workSlugs } from "../src/data/routes.js";

const projectRoot = resolve(import.meta.dirname, "..");
const count = (source, expression) => (source.match(expression) || []).length;

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

test("route manifest generates exactly 28 localized pages", async () => {
  assert.equal(routes.length, 28);
  assert.equal(routes.filter((route) => route.locale === "en").length, 14);
  assert.equal(routes.filter((route) => route.locale === "th").length, 14);

  for (const route of routes) {
    const file = resolve(projectRoot, route.file);
    assert.equal(await exists(file), true, `missing ${route.file}`);
    const html = await readFile(file, "utf8");

    assert.match(html, new RegExp(`<html lang="${route.locale}">`));
    assert.equal(count(html, /<main\b/g), 1, `${route.path} must have one main`);
    assert.equal(count(html, /<h1\b/g), 1, `${route.path} must have one h1`);
    assert.match(html, /data-site-menu/);
    assert.match(html, /data-site-menu-toggle/);
    assert.match(html, /data-site-menu-panel/);
    assert.match(html, /rel="alternate" hreflang="(?:en|th)"/);
    assert.doesNotMatch(html, /North \/ Form|northform|\/projects\//i);

    for (const match of html.matchAll(/<(?:img|script)[^>]+src="([^"]+)"/g)) {
      const source = match[1];
      if (/^(?:https?:|data:)/.test(source)) continue;
      const path = resolve(dirname(file), source.split("#")[0].split("?")[0]);
      assert.equal(await exists(path), true, `${route.path} has missing source ${source}`);
    }
  }
});

test("work indexes link all 11 unique detail routes in each locale", async () => {
  for (const locale of ["en", "th"]) {
    const route = routes.find((candidate) => candidate.locale === locale && candidate.page === "work-index");
    const html = await readFile(resolve(projectRoot, route.file), "utf8");
    assert.equal(count(html, /data-work-card/g), 11);

    for (const slug of workSlugs) {
      const target = routePath(locale, "work-detail", slug);
      const detail = routes.find((candidate) => candidate.path === target);
      assert.ok(detail, `missing manifest route ${target}`);
      assert.equal(await exists(resolve(projectRoot, detail.file)), true);
    }
  }
});

test("every work detail has facts, breadcrumbs, and case navigation", async () => {
  for (const route of routes.filter((candidate) => candidate.page === "work-detail")) {
    const html = await readFile(resolve(projectRoot, route.file), "utf8");
    if (route.slug === "rescheduling-pain") {
      assert.match(html, /qcase-breadcrumb/);
      assert.match(html, /qcase-role/);
      assert.match(html, /qcase-evidence/);
      assert.match(html, /id="reflection"/);
      assert.match(html, /class="p-work-nav"/);
      continue;
    }
    const expectedFactCount = route.path.includes("/smart-asset-sa-ai/") ? 4 : 8;
    const expectedNarrativeCount = route.path.includes("/smart-asset-sa-ai/") ? 2 : 4;
    assert.match(html, /p-work-detail__breadcrumb/);
    assert.match(html, /<dl class="p-work-detail__facts(?:\s|")/);
    assert.equal(count(html, /<dt>/g), expectedFactCount, `${route.path} has the wrong fact-label count`);
    assert.equal(count(html, /<dd>/g), expectedFactCount, `${route.path} has the wrong fact-value count`);
    assert.match(html, /p-work-detail__narrative/);
    assert.equal(count(html, /<section aria-labelledby="case-[^"]+" data-reveal>/g), expectedNarrativeCount, `${route.path} must name every narrative section`);
    assert.match(html, /class="p-work-nav"/);
  }
});

test("Smart Asset renders its localized system-flow cover", async () => {
  const localizedCoverCopy = [
    {
      file: resolve(projectRoot, "work", "smart-asset-sa-ai", "index.html"),
      heading: "From master data to a site-ready asset",
      description: "Category rules shape reusable SKU metadata. Each physical asset then receives its own identity, QR code, status, and site context.",
      otherHeading: "จาก Master Data สู่ทรัพย์สินที่พร้อมใช้งานในไซต์"
    },
    {
      file: resolve(projectRoot, "th", "work", "smart-asset-sa-ai", "index.html"),
      heading: "จาก Master Data สู่ทรัพย์สินที่พร้อมใช้งานในไซต์",
      description: "กติกาของ Category กำหนด metadata ที่ใช้ซ้ำใน SKU ก่อนที่ทรัพย์สินจริงแต่ละชิ้นจะได้รับ identity, QR, สถานะ และบริบทของไซต์",
      otherHeading: "From master data to a site-ready asset"
    }
  ];

  for (const expected of localizedCoverCopy) {
    const html = await readFile(expected.file, "utf8");
    const coverSection = html.match(/<section\b(?=[^>]*class="[^"]*\bp-work-detail__cover--system-flow\b[^"]*")(?=[^>]*\bdata-cover-flow(?:\s|>))(?=[^>]*\baria-labelledby="[^"]+")[^>]*>/);

    assert.ok(coverSection, `${expected.file} must render an accessible system-flow cover section`);
    assert.match(html, new RegExp(expected.heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(html, new RegExp(expected.description.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.doesNotMatch(html, new RegExp(expected.otherHeading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.equal(count(html, /\bdata-cover-flow-node(?:\s|=)/g), 7, "system-flow cover must render seven desktop nodes");
    assert.match(html, /<svg\b(?=[^>]*class="[^"]*\bp-cover-flow__connectors\b[^"]*")(?=[^>]*\baria-hidden="true")[^>]*>/);
    assert.doesNotMatch(html, /<figure\b(?=[^>]*class="[^"]*\bp-work-detail__cover\b[^"]*")[^>]*>\s*<img\b/);
  }
});

test("work details without coverFlow preserve the image cover fallback", async () => {
  for (const route of routes.filter((candidate) => candidate.page === "work-detail" && candidate.slug !== "smart-asset-sa-ai")) {
    const html = await readFile(resolve(projectRoot, route.file), "utf8");

    assert.match(html, /<figure\b(?=[^>]*class="[^"]*\b(?:p-work-detail__cover|qcase-hero-art)\b[^"]*")[^>]*>\s*<img\b/);
    assert.doesNotMatch(html, /\bp-work-detail__cover--system-flow\b/);
    assert.doesNotMatch(html, /\bdata-cover-flow(?:\s|>)/);
  }
});

test("all internal anchors and fragments resolve", async () => {
  for (const route of routes) {
    const file = resolve(projectRoot, route.file);
    const html = await readFile(file, "utf8");

    for (const match of html.matchAll(/<a[^>]+href="([^"]+)"/g)) {
      const href = match[1];
      if (/^(?:https?:|mailto:|tel:)/.test(href)) continue;

      const [pathPart, fragment = ""] = href.split("#");
      let target = pathPart ? resolve(dirname(file), pathPart) : file;

      if (await exists(target)) {
        const targetStat = await stat(target);
        if (targetStat.isDirectory()) target = resolve(target, "index.html");
      }

      assert.equal(await exists(target), true, `${route.path} has broken link ${href}`);

      if (fragment) {
        const targetHtml = await readFile(target, "utf8");
        assert.match(targetHtml, new RegExp(`id="${fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`), `${route.path} has missing fragment ${href}`);
      }
    }
  }
});

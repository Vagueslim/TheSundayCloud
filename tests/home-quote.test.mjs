import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import test from "node:test";
import { site } from "../src/data/site-content.js";

const projectRoot = resolve(import.meta.dirname, "..");
const homeTemplatePath = resolve(projectRoot, "scripts", "templates", "home.mjs");

const localizedCopy = {
  en: {
    file: resolve(projectRoot, "index.html"),
    hero: "Users don't complain about UI. They complain about waiting.",
    quoteLead: "That’s why I look beneath the interface—to understand what actually makes users wait.",
    quoteDetail: "Data models and systems analysis reveal the rules, states, and relationships behind the UI, so I can design a better way for people and systems to work together—without pushing the system’s burden back onto the user."
  },
  th: {
    file: resolve(projectRoot, "th", "index.html"),
    hero: "ผู้ใช้ไม่ได้บ่นเรื่อง UI พวกเขาบ่นว่าต้องรอ",
    quoteLead: "ผมจึงมองลึกกว่าหน้าจอ—เพื่อเข้าใจว่าอะไรทำให้ผู้ใช้ต้องรอจริง ๆ",
    quoteDetail: "Data Model และ System Analysis ทำให้ผมเห็นกติกา สถานะ และความสัมพันธ์หลัง UI เพื่อออกแบบให้คนกับระบบทำงานร่วมกันได้ดีขึ้น โดยไม่ผลักภาระของระบบกลับไปให้ผู้ใช้"
  }
};

function decodeHtml(source) {
  return source
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)))
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function visibleText(source) {
  return decodeHtml(source)
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/?span\b[^>]*>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractSection(html, className) {
  const openingPattern = new RegExp(`<section\\b[^>]*class="[^"]*\\b${className}\\b[^"]*"[^>]*>`, "i");
  const opening = html.match(openingPattern);

  assert.ok(opening, `missing section.${className}`);
  const start = opening.index;
  const end = html.indexOf("</section>", start);
  assert.notEqual(end, -1, `section.${className} must close`);

  return {
    html: html.slice(start, end + "</section>".length),
    start,
    end: end + "</section>".length
  };
}

async function filesUnder(directory, extension) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await filesUnder(path, extension));
    else if (entry.name.endsWith(extension)) files.push(path);
  }

  return files;
}

test("Home quote copy is exact and localized at the content source", () => {
  for (const locale of ["en", "th"]) {
    const expected = localizedCopy[locale];

    assert.equal(site.home[locale].hero.replace(/\s*\n\s*/g, " "), expected.hero);
    assert.equal(site.home[locale].quoteLead, expected.quoteLead);
    assert.equal(site.home[locale].quoteDetail, expected.quoteDetail);
    assert.equal("conceptLabel" in site.home[locale], false);
    assert.equal("conceptTitle" in site.home[locale], false);
    assert.equal("conceptCopy" in site.home[locale], false);
  }
});

test("localized Home routes render the quote as live semantic text in the hero", async () => {
  for (const locale of ["en", "th"]) {
    const expected = localizedCopy[locale];
    const other = localizedCopy[locale === "en" ? "th" : "en"];
    const html = await readFile(expected.file, "utf8");
    const hero = extractSection(html, "p-home-hero");
    const work = extractSection(html, "p-home-work");
    const heroText = visibleText(hero.html);
    const blockquotes = [...hero.html.matchAll(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/gi)];

    assert.equal((html.match(/<h1\b/gi) || []).length, 1, `${locale} Home must retain one h1`);
    assert.equal(blockquotes.length, 1, `${locale} Home must expose one semantic hero blockquote`);
    assert.equal(visibleText(hero.html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || ""), expected.hero);
    assert.match(visibleText(blockquotes[0][1]), new RegExp(expected.quoteLead.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(heroText.includes(expected.quoteDetail), `${locale} quote detail must be selectable hero text`);
    assert.ok(heroText.indexOf(expected.hero) < heroText.indexOf(expected.quoteLead), `${locale} quote must follow the headline`);
    assert.ok(heroText.indexOf(expected.quoteLead) < heroText.indexOf(expected.quoteDetail), `${locale} explanation must follow the handwritten lead`);
    assert.doesNotMatch(visibleText(html), new RegExp(other.hero.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.doesNotMatch(visibleText(html), new RegExp(other.quoteLead.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.doesNotMatch(visibleText(html), new RegExp(other.quoteDetail.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(hero.start < hero.end && hero.end <= work.start, `${locale} quote hero must precede Selected Work`);
    assert.doesNotMatch(html, /class="[^"]*\bp-home-concept\b/);
  }
});

test("Home keeps the removed concept section out of the source template", async () => {
  const template = await readFile(homeTemplatePath, "utf8");

  assert.doesNotMatch(template, /class="[^"]*\bp-home-concept\b/);
  assert.match(template, /<blockquote\b/);
});

test("Mali Regular is bundled locally with its font token and license", async () => {
  const stylesRoot = resolve(projectRoot, "src", "styles");
  const fontRoot = resolve(projectRoot, "src", "assets", "fonts");
  const cssFiles = await filesUnder(stylesRoot, ".css");
  const styles = await Promise.all(cssFiles.map(async (file) => ({ file, css: await readFile(file, "utf8") })));
  const fontFace = styles
    .flatMap(({ file, css }) => [...css.matchAll(/@font-face\s*\{[\s\S]*?\}/gi)].map((match) => ({ file, block: match[0] })))
    .find(({ block }) => /font-family\s*:\s*["']?Mali["']?\s*;/i.test(block));

  assert.ok(fontFace, "styles must declare a local @font-face for Mali");
  assert.match(fontFace.block, /font-style\s*:\s*normal\s*;/i);
  assert.match(fontFace.block, /font-weight\s*:\s*(?:400|normal)\s*;/i);
  assert.match(fontFace.block, /font-display\s*:\s*swap\s*;/i);

  const source = fontFace.block.match(/url\(\s*["']?([^"')]+\.woff2(?:[?#][^"')]+)?)["']?\s*\)/i)?.[1];
  assert.ok(source, "Mali @font-face must reference a WOFF2 file");
  assert.doesNotMatch(source, /^(?:https?:|\/\/|data:)/i);
  await access(resolve(dirname(fontFace.file), source.split(/[?#]/)[0]));

  const combinedStyles = styles.map(({ css }) => css).join("\n");
  assert.match(combinedStyles, /--font-hand\s*:\s*[^;]*["']?Mali["']?[^;]*;/i);
  assert.doesNotMatch(combinedStyles, /fonts\.(?:googleapis|gstatic)\.com/i);

  const fontAssets = await readdir(fontRoot);
  assert.ok(fontAssets.some((name) => /mali/i.test(name) && /\.woff2$/i.test(name)), "font assets must include Mali WOFF2");
  assert.ok(fontAssets.some((name) => /(?:mali.*ofl|ofl.*mali)/i.test(name) && /\.txt$/i.test(name)), "font assets must include Mali's OFL license");
});

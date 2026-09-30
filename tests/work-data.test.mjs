import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";
import { workSlugs } from "../src/data/routes.js";
import { featuredWork, workItems } from "../src/data/work-items.js";

const projectRoot = resolve(import.meta.dirname, "..");
const thaiPattern = /[\u0E00-\u0E7F]/;

test("work data matches the locked 11-item order and featured set", () => {
  assert.equal(workItems.length, 11);
  assert.deepEqual(workItems.map((item) => item.slug), workSlugs);
  assert.equal(new Set(workItems.map((item) => item.slug)).size, 11);
  assert.equal(featuredWork.length, 3);
  assert.deepEqual(featuredWork.map((item) => item.slug), [
    "smart-asset-sa-ai",
    "rescheduling-pain",
    "wcf-digital"
  ]);
  assert.equal(workItems.find((item) => item.slug === "asean-summit-2019").year, "2019");
});

test("featured cards use the approved metadata and matching cover paths", () => {
  const expected = {
    "smart-asset-sa-ai": ["2026", "PROGRESS ENGINEER CONSTRUCTION", "Product Design · System Analysis", ["Asset Management", "Warehouse Workflow"]],
    "wcf-digital": ["2025-2026", "Social Security Office Thailand", "UX/UI · Workflow Design", ["Legal & Policy-Based", "Claims & Compensation"]],
    "rescheduling-pain": ["2022", "Q-CHANG", "UX · Workflow Design", ["Service Design", "Customer Journey Mapping", "Operational Workflow Design"]],
    "maxi-task": ["2019–2020", "BCH Group", "UX/UI · Workflow Design", ["Telecom Infrastructure", "GIS Workflow", "Network Operations"]],
    "asean-summit-2019": ["2019", "ASEAN Summit 2019 · Thailand", "UX/UI · Workflow Design", ["Diplomatic Registration", "Delegate Verification", "Multi-agency Workflow"]]
  };

  for (const item of featuredWork) {
    const [year, client, cardTitle, tags] = expected[item.slug];
    assert.equal(item.year, year);
    assert.equal(item.facts.client.en, client);
    assert.equal(item.en.cardTitle, cardTitle);
    assert.deepEqual(item.facts.domain.en, tags);
    assert.equal(item.cover.src, `src/assets/images/work/${item.slug}/${item.caseStudy === "change-date" ? "change-date-cover.svg" : "cover.png"}`);
  }
});

test("generated Home links, covers, and detail navigation follow the approved project order", async () => {
  const home = await readFile(resolve(projectRoot, "index.html"), "utf8");
  const slugs = featuredWork.map((item) => item.slug);
  const positions = slugs.map((slug) => home.indexOf(`href="./work/${slug}/"`));

  assert.ok(positions.every((position) => position >= 0), "every featured detail link must exist on Home");
  assert.deepEqual([...positions].sort((a, b) => a - b), positions, "featured Home links must remain in approved order");

  for (const [index, item] of featuredWork.entries()) {
    assert.ok(home.includes(`src="./${item.cover.src}"`));
    const detail = await readFile(resolve(projectRoot, "work", item.slug, "index.html"), "utf8");
    assert.match(detail, new RegExp(`p-work-detail__hero-index">${String(workSlugs.indexOf(item.slug) + 1).padStart(2, "0")} / 11`));
    if (item.coverFlow) {
      assert.match(detail, /p-work-detail__cover--system-flow/);
      assert.doesNotMatch(detail, /p-work-detail__cover[^>]*>\s*<img[^>]+cover\.png/);
    } else {
      assert.ok(detail.includes(`src="../../${item.cover.src}"`));
    }

    if (index > 0) assert.match(detail, new RegExp(`href="\\.\\./${workSlugs[workSlugs.indexOf(item.slug) - 1]}/"`));
    if (index < featuredWork.length - 1) assert.match(detail, new RegExp(`href="\\.\\./${workSlugs[workSlugs.indexOf(item.slug) + 1]}/"`));
  }
});

test("every work item has complete English and Thai content", () => {
  const required = ["title", "eyebrow", "listStatement", "summary", "challenge", "approach", "outcome", "detail", "seoTitle", "seoDescription"];

  for (const item of workItems) {
    assert.match(item.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(item.year);
    assert.ok(item.cover.width > 0 && item.cover.height > 0);

    for (const locale of ["en", "th"]) {
      for (const field of required) assert.ok(item[locale][field], `${item.slug}.${locale}.${field}`);
      if (item.narrativeLayout !== "combined") assert.ok(item[locale].detail.length > 0);
      assert.ok(item.facts.domain[locale].length > 0);
      assert.ok(item.facts.platform[locale].length > 0);
      assert.ok(item.facts.role[locale].length > 0);
      assert.ok(item.facts.workArea[locale].length > 0);
    }

    assert.equal(thaiPattern.test(`${item.th.summary}${item.th.challenge}${item.th.outcome}`), true, `${item.slug} lacks Thai copy`);
  }
});

test("every declared media file is local and present", async () => {
  for (const item of workItems) {
    const coverFlowMedia = item.coverFlow?.nodes.map((node) => node.media) || [];

    for (const media of [item.cover, ...item.gallery, ...(item.flowEvidence || []), ...coverFlowMedia]) {
      assert.doesNotMatch(media.src, /^(?:https?:)?\/\//);
      await access(resolve(projectRoot, media.src));
      assert.ok(media.width > 0 && media.height > 0);
      assert.ok(media.alt.en && media.alt.th);
    }
  }
});

test("Smart Asset defines a bilingual responsive cover flow", async () => {
  const item = workItems.find((candidate) => candidate.slug === "smart-asset-sa-ai");
  const { coverFlow } = item;

  assert.ok(coverFlow, "Smart Asset must opt into the system-flow cover");
  assert.deepEqual(coverFlow.heading, {
    en: "From master data to a site-ready asset",
    th: "จาก Master Data สู่ทรัพย์สินที่พร้อมใช้งานในไซต์"
  });
  assert.deepEqual(coverFlow.description, {
    en: "Category rules shape reusable SKU metadata. Each physical asset then receives its own identity, QR code, status, and site context.",
    th: "กติกาของ Category กำหนด metadata ที่ใช้ซ้ำใน SKU ก่อนที่ทรัพย์สินจริงแต่ละชิ้นจะได้รับ identity, QR, สถานะ และบริบทของไซต์"
  });
  assert.equal(coverFlow.nodes.length, 7, "desktop cover must expose all seven screen objects");
  assert.equal(coverFlow.nodes.filter((node) => node.mobilePriority).length, 4, "mobile cover must prioritize exactly four screen objects");

  const nodeIds = new Set(coverFlow.nodes.map((node) => node.id));
  assert.equal(nodeIds.size, 7, "cover-flow node ids must be unique");
  assert.ok(coverFlow.edges.length > 0, "cover flow must declare its connections");

  for (const node of coverFlow.nodes) {
    assert.ok(node.id, "every cover-flow node needs a stable id");
    assert.equal(typeof node.mobilePriority, "boolean", `${node.id}.mobilePriority must be explicit`);
    assert.ok(node.media, `${node.id} needs local screenshot media`);
    assert.doesNotMatch(node.media.src, /^(?:https?:)?\/\//, `${node.id} media must be local`);
    assert.ok(node.media.width > 0 && node.media.height > 0, `${node.id} media needs intrinsic dimensions`);
    assert.ok(node.media.alt.en && node.media.alt.th, `${node.id} media needs bilingual alt text`);
    assert.equal(thaiPattern.test(node.media.alt.th), true, `${node.id} needs a Thai alt description`);
    await access(resolve(projectRoot, node.media.src));
  }

  for (const edge of coverFlow.edges) {
    assert.equal(nodeIds.has(edge.from), true, `cover-flow edge has unknown source ${edge.from}`);
    assert.equal(nodeIds.has(edge.to), true, `cover-flow edge has unknown target ${edge.to}`);
  }
});

test("Smart Asset exposes six bilingual flow snapshots", async () => {
  const item = workItems.find((candidate) => candidate.slug === "smart-asset-sa-ai");

  assert.equal(item.flowEvidence.length, 6);
  assert.equal(item.factsLayout, "compact");
  assert.equal(item.narrativeLayout, "combined");
  assert.equal(item.cover.width, 1024);
  assert.equal(item.cover.height, 1536);
  assert.deepEqual(item.facts.role.en, ["UX × SA Intern"]);

  for (const evidence of item.flowEvidence) {
    assert.ok(evidence.title.en && evidence.title.th);
    assert.ok(evidence.description.en && evidence.description.th);
    assert.equal(thaiPattern.test(`${evidence.title.th}${evidence.description.th}`), true);
  }

  for (const localePath of [
    resolve(projectRoot, "work", "smart-asset-sa-ai", "index.html"),
    resolve(projectRoot, "th", "work", "smart-asset-sa-ai", "index.html")
  ]) {
    const html = await readFile(localePath, "utf8");
    assert.match(html, /p-work-detail__facts--compact/);
    assert.equal((html.match(/p-work-detail__fact-icon/g) || []).length, 4);
    assert.match(html, /case-smart-asset-sa-ai-approach-outcome/);
    assert.doesNotMatch(html, /case-smart-asset-sa-ai-detail/);
    assert.match(html, /master-asset-metadata\.png/);
    assert.match(html, /employee-management\.png/);
    assert.doesNotMatch(html, /system-sitemap\.png|return-operations\.png/);
    assert.equal((html.match(/data-image-modal-trigger/g) || []).length, 6);
    assert.equal((html.match(/<dialog class="c-image-modal"/g) || []).length, 1);
    assert.match(html, /data-image-modal-close/);
    assert.match(html, /data-image-modal-original/);
  }
});

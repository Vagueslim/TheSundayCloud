import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { careerProfile, careerTimeline, personalProjects } from "../src/data/career-history.js";
import { workItems } from "../src/data/work-items.js";

const expectedTimeline = [
  ["capability-expansion", "2026—Now"],
  ["depthfirst", "2024—2026"],
  ["codehard-consulting", "2023—2024"],
  ["q-chang", "2021—2023"],
  ["wedev", "2020—2021"],
  ["benchachinda", "2019—2020"],
  ["clicknext", "2018—2019"],
  ["digitech", "2015—2018"]
];

const correctedYears = {
  "maxi-task": "2019–2020",
  "asean-summit-2019": "2019",
  intergold: "2018",
  "my-exim": "2018",
  "oil-reserve-reporting-system": "2018"
};

const forbiddenClients = [
  "Intergold Gold Trade Co., Ltd.",
  "EXIM Bank Thailand",
  "ธนาคารเพื่อการส่งออกและนำเข้าแห่งประเทศไทย",
  "Ministry of Energy",
  "กระทรวงพลังงาน"
];

test("About keeps the canonical HR career timeline and project mapping", () => {
  assert.equal(careerTimeline.length, 8);
  assert.deepEqual(careerTimeline.map((entry) => [entry.id, entry.period.en]), expectedTimeline);
  assert.equal(careerProfile.targetRole.en, "Senior Product Designer");
  assert.equal(careerProfile.email, "dhittawat@gmail.com");

  const linkedSlugs = [...careerTimeline.flatMap((entry) => entry.projects), ...personalProjects].flatMap((project) => project.slug ? [project.slug] : []);
  assert.equal(new Set(linkedSlugs).size, linkedSlugs.length, "linked projects must not be mapped twice");

  for (const slug of linkedSlugs) {
    assert.ok(workItems.some((item) => item.slug === slug), `missing linked work item ${slug}`);
  }

  assert.equal(careerTimeline.some((entry) => entry.projects.some((project) => project.slug === "lccs-personal-research" || project.id === "thaiwater-war-room")), false);
  assert.deepEqual(personalProjects.map((project) => project.id ?? project.slug), ["thaiwater-war-room", "lccs-personal-research"]);

  for (const [slug, year] of Object.entries(correctedYears)) {
    assert.equal(workItems.find((item) => item.slug === slug)?.year, year, `${slug} has the wrong canonical year`);
  }
});

test("generated About pages are bilingual, complete, and copy-ready", async () => {
  const pages = await Promise.all([
    readFile(new URL("../about/index.html", import.meta.url), "utf8"),
    readFile(new URL("../th/about/index.html", import.meta.url), "utf8")
  ]);

  for (const page of pages) {
    assert.match(page, /<h1[^>]*>Senior Product Designer<\/h1>/);
    assert.equal((page.match(/class="p-about-career__entry /g) ?? []).length, 8);
    assert.equal((page.match(/class="p-about-personal__projects"/g) ?? []).length, 1);
    assert.doesNotMatch(page, /Case study unavailable|ยังไม่มี Case study/i);
    assert.match(page, /data-copy-email-root/);
    assert.match(page, /data-copy-email/);
    assert.match(page, /role="status" aria-live="polite"/);
    assert.match(page, /dhittawat@gmail\.com/);
    assert.doesNotMatch(page, /Download Resume/i);
  }
});

test("client display policy hides restricted identities while keeping approved names", async () => {
  const sources = await Promise.all([
    readFile(new URL("../src/data/work-items.js", import.meta.url), "utf8"),
    readFile(new URL("../src/data/career-history.js", import.meta.url), "utf8"),
    readFile(new URL("../about/index.html", import.meta.url), "utf8"),
    readFile(new URL("../th/about/index.html", import.meta.url), "utf8")
  ]);
  const generatedWork = await Promise.all([
    readFile(new URL("../work/index.html", import.meta.url), "utf8"),
    readFile(new URL("../th/work/index.html", import.meta.url), "utf8"),
    ...workItems.flatMap((item) => [
      readFile(new URL(`../work/${item.slug}/index.html`, import.meta.url), "utf8"),
      readFile(new URL(`../th/work/${item.slug}/index.html`, import.meta.url), "utf8")
    ])
  ]);
  const searchable = [...sources, ...generatedWork].join("\n");

  for (const client of forbiddenClients) {
    assert.doesNotMatch(searchable, new RegExp(client.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
  }

  assert.match(searchable, /Depthfirst Co\., Ltd\./);
  assert.match(searchable, /Social Security Office Thailand/);
  assert.match(searchable, /InterGOLD/);
  assert.match(searchable, /MY EXIM/);
});

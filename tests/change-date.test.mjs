import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { changeDate } from "../src/data/change-date.js";
import { workItems } from "../src/data/work-items.js";

test("Change Date keeps sample counts separate from unsupported improvement claims", async () => {
  assert.equal(changeDate.counts.admin + changeDate.counts.customer, changeDate.counts.total);
  assert.equal(changeDate.counts.total, 3999);
  const item = workItems.find(x => x.slug === "rescheduling-pain");
  assert.equal(item.year, "2022");
  for (const [locale, prefix] of [["en", ""], ["th", "th/"]]) {
    const html = await readFile(new URL(`../${prefix}work/rescheduling-pain/index.html`, import.meta.url), "utf8");
    assert.doesNotMatch(JSON.stringify(item[locale]) + html, /70%|80%|92%|T\+3/);
    assert.match(html, /3,999/);
    assert.match(html, /4,000/);
    assert.equal((html.match(/research-(?:channels|proposal|service-loop)\.png" alt=/g) || []).length, 3);
    for (const id of ["signal", "backstage", "window", "changes", "reflection"]) {
      assert.equal((html.match(new RegExp(`id="${id}"`, "g")) || []).length, 1);
      assert.ok(html.includes(`href="#${id}"`));
    }
    assert.ok(html.includes(changeDate[locale].hypothesis));
    assert.ok(html.includes(changeDate[locale].observation));
  }
});

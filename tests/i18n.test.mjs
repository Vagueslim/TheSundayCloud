import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";
import { alternateRoute, routes } from "../src/data/routes.js";

const projectRoot = resolve(import.meta.dirname, "..");

test("English and Thai route structures are reciprocal", () => {
  for (const route of routes) {
    const alternate = alternateRoute(route);
    assert.ok(alternate);
    assert.equal(alternate.page, route.page);
    assert.equal(alternate.slug, route.slug);
    assert.equal(alternateRoute(alternate).path, route.path);
  }
});

test("generated pages have locale-correct navigation and clean encoding", async () => {
  for (const route of routes) {
    const html = await readFile(resolve(projectRoot, route.file), "utf8");
    assert.doesNotMatch(html, /�|Ã|Â©|â€”|â†/);

    if (route.locale === "th") {
      assert.match(html, /หน้าแรก/);
      assert.match(html, /ผลงาน/);
      assert.match(html, /href="[^"]+" hreflang="en"[^>]*><span lang="en">/);
    } else {
      assert.match(html, />Home(?:<|\s)/);
      assert.match(html, />Work(?:<|\s)/);
      assert.match(html, /href="[^"]+" hreflang="th"[^>]*><span lang="th">/);
    }
  }
});

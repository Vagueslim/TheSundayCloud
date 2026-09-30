import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const templatePath = new URL("../scripts/templates/home.mjs", import.meta.url);

test("Home removes design point of view while keeping selected work", async () => {
  const template = await readFile(templatePath, "utf8");

  assert.doesNotMatch(template, /class="p-home-concept"/);
  assert.match(template, /class="p-home-work"/);
  assert.match(template, /renderWorkCard/);
});

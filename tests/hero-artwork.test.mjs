import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const svgPath = new URL("../src/assets/images/home/hero-system-diagram.svg", import.meta.url);
const templatePath = new URL("../scripts/templates/home.mjs", import.meta.url);

test("hero diagram closes animated circles cleanly and keeps the high-resolution construction artwork", async () => {
  const [svg, template] = await Promise.all([
    readFile(svgPath, "utf8"),
    readFile(templatePath, "utf8")
  ]);

  assert.match(svg, /stroke-linecap:\s*round/);
  assert.match(svg, /stroke-dasharray:\s*1\.0[1-9]/);
  assert.match(svg, /stroke-width:\s*1\.[5-9]/);
  assert.match(svg, /class="system-core"[^>]+fill="#fff"/);
  assert.match(svg, />TECHNICAL UX \/<\/text>/);
  assert.match(svg, />COLLABORATION<\/text>/);
  assert.match(template, /hero-construction-mark\.png/);
  assert.match(template, /width="1853" height="1375"/);
});

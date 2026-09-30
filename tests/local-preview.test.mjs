import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";
import { routes } from "../src/data/routes.js";

const projectRoot = resolve(import.meta.dirname, "..");

test("generated pages keep their CSS entrypoint outside the Vite-only module graph", async () => {
  for (const route of routes) {
    const html = await readFile(resolve(projectRoot, route.file), "utf8");
    assert.match(
      html,
      /<link\b[^>]*rel="stylesheet"[^>]*href="[^"]+src\/styles\/main\.css"/,
      `${route.path} must load CSS directly for local-file review`
    );
  }

  const siteScript = await readFile(resolve(projectRoot, "src/scripts/site.js"), "utf8");
  assert.doesNotMatch(siteScript, /import\s+["'][^"']*main\.css["']/);
  await access(resolve(projectRoot, "start-local.cmd"));
});

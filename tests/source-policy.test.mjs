import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { extname, join, resolve } from "node:path";
import test from "node:test";

const projectRoot = resolve(import.meta.dirname, "..");
const scanRoots = ["src", "scripts"];
const textExtensions = new Set([".js", ".mjs", ".css", ".html", ".md"]);

async function textFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) results.push(...await textFiles(path));
    else if (textExtensions.has(extname(entry.name))) results.push(path);
  }

  return results;
}

test("source contains no remote media dependencies or leftover placeholder identity", async () => {
  const files = (await Promise.all(scanRoots.map((root) => textFiles(resolve(projectRoot, root))))).flat();
  const combined = (await Promise.all(files.map((file) => readFile(file, "utf8")))).join("\n");

  assert.doesNotMatch(combined, /North \/ Form|northform|data-project-card|\/projects\//i);
  assert.doesNotMatch(combined, /https?:\/\/(?!www\.linkedin\.com)/i);
  assert.doesNotMatch(combined, /(?:src|url)\s*[=(]["']?https?:\/\//i);
  assert.doesNotMatch(combined, /vagueslim\.github\.io|vivace-inc\.co\.jp|recaptcha/i);
});

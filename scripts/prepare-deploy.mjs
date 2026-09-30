import { spawnSync } from 'node:child_process';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const env = { ...process.env, PORTFOLIO_DEPLOY: '1' };
// Relative asset URLs support both a domain root and a hosted subdirectory.
env.PORTFOLIO_BASE = process.env.PORTFOLIO_BASE || './';
for (const args of [['scripts/generate-pages.mjs'], ['node_modules/vite/bin/vite.js', 'build', '--configLoader', 'runner']]) {
  const result = spawnSync(process.execPath, args, { cwd: root, env, stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status || 1);
}
const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
for (const marker of ['lang="th"', 'data-wcf-slider', 'id="conversation"', 'I find inspiration']) {
  if (!html.includes(marker)) throw new Error(`Deployment index is missing ${marker}`);
}
await writeFile(new URL('../dist/.nojekyll', import.meta.url), '');
// The public site uses /th/ and /en/. Preserve old application links with
// relative redirects that also work below the GitHub Pages repository prefix.
const pages = ['', 'about/', 'work/', 'work/smart-asset-sa-ai/', 'work/rescheduling-pain/', 'work/wcf-digital/'];
for (const locale of ['th', 'en']) {
  for (const page of pages) {
    const oldPath = `${locale === 'th' ? 'th/coda' : 'coda'}/${page}`;
    const depth = oldPath.split('/').filter(Boolean).length;
    const target = `${'../'.repeat(depth)}${locale}/${page}`;
    const redirect = `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=${target}"><title>Portfolio — The Sunday Cloud</title></head><body><a href="${target}">Continue to portfolio</a><script>location.replace(${JSON.stringify(target)}+location.search+location.hash)</script></body></html>`;
    const clean = await readFile(new URL(`../dist/${locale}/${page}index.html`, import.meta.url), 'utf8');
    if (/href="[^"#]*\/coda(?:\/|")/.test(clean)) throw new Error(`Old route leaked into ${locale}/${page}`);
    for (const base of ['../dist/', '../']) {
      const file = new URL(`${base}${oldPath}index.html`, import.meta.url);
      await mkdir(dirname(fileURLToPath(file)), { recursive: true });
      await writeFile(file, redirect);
    }
  }
}
console.log('Ready to deploy: upload the complete dist folder. Root index verified.');

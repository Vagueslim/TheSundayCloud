import { spawnSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';

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
console.log('Ready to deploy: upload the complete dist folder. Root index verified.');

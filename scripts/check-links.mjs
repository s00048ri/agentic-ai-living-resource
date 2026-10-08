#!/usr/bin/env node
// Checks that every internal link in dist/*.html (href/src, including the base path)
// points to a file that exists. External links are not checked.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { BASE_PATH } from '../site.mjs';

const DIST = new URL('../dist/', import.meta.url).pathname;
const base = BASE_PATH.endsWith('/') ? BASE_PATH : `${BASE_PATH}/`;

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return htmlFiles(p);
    return name.endsWith('.html') ? [p] : [];
  });
}

function resolveTarget(pathname) {
  const rel = decodeURIComponent(pathname.slice(base.length));
  const candidates = rel === '' || rel.endsWith('/') ? [join(DIST, rel, 'index.html')] : [join(DIST, rel), join(DIST, rel, 'index.html'), join(DIST, `${rel}.html`)];
  return candidates.some((c) => existsSync(c) && statSync(c).isFile());
}

if (!existsSync(DIST)) {
  console.error('dist/ not found. Run `npm run build` first.');
  process.exit(1);
}

const files = htmlFiles(DIST);
const errors = [];
let checked = 0;
const ATTR = /\s(?:href|src)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi;

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const pageUrl = new URL(`https://site.invalid${base}${relative(DIST, file).replace(/index\.html$/, '')}`);
  for (const m of html.matchAll(ATTR)) {
    const raw = (m[1] ?? m[2] ?? '').replace(/&amp;/g, '&').trim();
    if (!raw || raw.startsWith('#') || /^[a-z][a-z0-9+.-]*:/i.test(raw) || raw.startsWith('//')) continue;
    const target = new URL(raw, pageUrl);
    checked++;
    const where = relative(DIST, file);
    if (!target.pathname.startsWith(base)) {
      errors.push(`${where}: "${raw}" is outside the base path ${base}`);
    } else if (!resolveTarget(target.pathname)) {
      errors.push(`${where}: "${raw}" does not resolve to a file in dist/`);
    }
  }
}

if (errors.length) {
  console.error(`Broken internal links (${errors.length}):`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
console.log(`check:links — ${checked} internal links in ${files.length} pages OK (base ${base}).`);

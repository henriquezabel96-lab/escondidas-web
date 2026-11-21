// Revisa que todos los enlaces y recursos internos de dist/ existan, incluidas las anclas (#).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const DIST = process.env.DIST || path.join(path.dirname(path.dirname(fileURLToPath(import.meta.url))), 'dist');
const htmls = fs.readdirSync(DIST, { recursive: true }).map(String).filter((f) => f.endsWith('.html'));
const ids = {};
const rutaDe = (f) => '/' + f.replace(/index\.html$/, '').replace(/\\/g, '/');
for (const f of htmls) ids[rutaDe(f)] = new Set([...fs.readFileSync(path.join(DIST, f), 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const redir = fs.readFileSync(path.join(DIST, '_redirects'), 'utf8').split('\n').filter((l) => l.trim() && !l.startsWith('#')).map((l) => l.trim().split(/\s+/)[0]);
let malos = 0, total = 0;
for (const f of htmls) {
  const html = fs.readFileSync(path.join(DIST, f), 'utf8');
  const aqui = rutaDe(f);
  for (const m of html.matchAll(/\s(?:href|src|srcset|data-src-h|data-src-v)="([^"]+)"/g)) {
    for (let u of m[1].split(',').map((x) => x.trim().split(' ')[0])) {
      u = u.replace(/&amp;/g, '&');
      if (/^(https?:|mailto:|tel:|data:)/.test(u)) continue;
      total++;
      const [base, frag] = u.split('#');
      const ruta = (base || aqui).split('?')[0];
      if (redir.includes(ruta)) continue;
      let archivo = path.join(DIST, ruta);
      if (ruta.endsWith('/')) archivo = path.join(archivo, 'index.html');
      if (!fs.existsSync(archivo)) { console.log('FALTA', f, '→', u); malos++; continue; }
      if (frag && ruta.endsWith('/') && !(ids[ruta] || new Set()).has(frag)) { console.log('ANCLA', f, '→', u); malos++; }
    }
  }
}
console.log(`${total} enlaces revisados · ${malos} con problemas`);

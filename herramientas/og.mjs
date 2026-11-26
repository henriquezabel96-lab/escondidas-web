// Imágenes para compartir (Open Graph, 1200×630): node herramientas/og.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire('/home/claude/esc/web2/');
const { chromium } = require('playwright-core');

const RAIZ = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PUB = path.join(RAIZ, 'public');
const SALIDA = path.join(PUB, 'img/og');
fs.mkdirSync(SALIDA, { recursive: true });
const f = (rel) => 'file://' + path.join(PUB, rel);

const piezas = [
  { id: 'inicio', foto: f('video/portada-h.webp'), titulo: 'Lo mejor de RD está escondido.', sub: 'Excursiones en grupo, resorts, paquetes y cruceros desde Santiago', pos: '50% 50%' },
  { id: 'macao', foto: f('img/f/buggy-amigas-1200.webp'), titulo: 'Macao + Basílica de Higüey', sub: 'Domingo 17 de enero · desde RD$3,995 · separa con RD$1,000', fecha: 'DOM 17 ENE', pos: '50% 35%' },
  { id: 'hoteles', foto: f('img/f/hardrock-960.webp'), titulo: 'Ofertas en resorts todo incluido', sub: 'Punta Cana, Puerto Plata y más · paga en cuotas', pos: '50% 50%' },
  { id: 'paquetes', foto: f('img/f/guatape-1080.webp'), titulo: 'Paquetes con vuelo, hotel y traslados', sub: 'Dentro y fuera del país · un solo precio en cuotas', pos: '50% 50%' },
  { id: 'cruceros', foto: f('img/f/costa-pacifica-1200.webp'), titulo: 'Crucero de Año Nuevo', sub: 'Con el grupo de Escondidas a bordo del Costa Pacifica', pos: '65% 50%' },
];

const html = (x) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Archivo;src:url(${f('fonts/archivo.woff2')});font-weight:100 900;font-stretch:62% 125%}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;position:relative;overflow:hidden;background:#1b2428;font-family:Archivo;color:#fff}
.foto{position:absolute;inset:0;background:url(${x.foto}) ${x.pos}/cover}
.velo{position:absolute;inset:0;background:linear-gradient(90deg,rgba(27,36,40,.97) 0%,rgba(27,36,40,.9) 38%,rgba(27,36,40,.35) 70%,rgba(27,36,40,.1) 100%)}
.in{position:absolute;inset:56px 64px;display:flex;flex-direction:column;justify-content:space-between}
.marca{display:flex;align-items:center;gap:14px}
.marca img{width:64px;height:64px}
.n{font-stretch:125%;font-weight:700;letter-spacing:.13em;color:#eec08a;font-size:22px;line-height:1}
.s{font-stretch:112%;font-weight:500;letter-spacing:.36em;font-size:12px;margin-top:6px}
h1{font-size:${x.titulo.length > 30 ? 70 : 84}px;font-stretch:68%;font-weight:820;line-height:.92;letter-spacing:-.02em;max-width:640px}
p{font-size:26px;line-height:1.3;color:rgba(255,255,255,.88);max-width:620px;margin-top:18px}
.flap{display:inline-flex;gap:4px;margin-bottom:22px}
.flap span{display:inline-block;min-width:30px;text-align:center;background:#121a1d;color:#eec08a;font-weight:700;font-stretch:85%;font-size:34px;padding:4px 3px 2px;border-radius:6px;position:relative}
.flap span::after{content:"";position:absolute;left:0;right:0;top:50%;height:1px;background:rgba(0,0,0,.6)}
.flap .e{background:transparent;min-width:12px}
.flap .e::after{display:none}
.url{font-size:20px;color:#eec08a;font-weight:600;letter-spacing:.01em}
</style></head><body><div class="foto"></div><div class="velo"></div>
<div class="in">
  <div class="marca"><img src="${f('img/marca/emblema.svg')}"><div><div class="n">ESCONDIDAS</div><div class="s">MULTISERVICES</div></div></div>
  <div>${x.fecha ? `<div class="flap">${[...x.fecha].map((c) => (c === ' ' ? '<span class="e"></span>' : `<span>${c}</span>`)).join('')}</div>` : ''}<h1>${x.titulo}</h1><p>${x.sub}</p></div>
  <div class="url">escondidasmultiservices.com</div>
</div></body></html>`;

const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--allow-file-access-from-files'] });
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
for (const x of piezas) {
  const tmp = `/tmp/og_${x.id}.html`;
  fs.writeFileSync(tmp, html(x));
  await p.goto('file://' + tmp);
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(250);
  await p.screenshot({ path: path.join(SALIDA, `${x.id}.jpg`), type: 'jpeg', quality: 84 });
  console.log('og', x.id);
}
await b.close();

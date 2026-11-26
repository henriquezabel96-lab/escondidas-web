// Genera el sitio completo en /dist a partir de contenido/datos.mjs y las plantillas.
// Uso: node build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sitio, excursiones, hoteles, cruceros, secciones } from './contenido/datos.mjs';
import { sprite, BORRADOR, visible } from './plantillas/ui.mjs';
import { inicio } from './plantillas/pag-inicio.mjs';
import { listado as excursionesListado, detalle as excursionDetalle, ficha as excursionFicha, ics } from './plantillas/pag-excursiones.mjs';
import { reservar } from './plantillas/pag-reservar.mjs';
import { listado as hotelesListado, ficha as hotelFicha } from './plantillas/pag-hoteles.mjs';
import { paginaPaquetes, paginaCruceros, detalleCrucero } from './plantillas/pag-viajes.mjs';
import { comoReservar, contacto, terminos, privacidad, creditos, gracias, noEncontrada } from './plantillas/pag-info.mjs';

const RAIZ = path.dirname(fileURLToPath(import.meta.url));
const DIST = process.env.DIST || path.join(RAIZ, 'dist');

fs.rmSync(DIST, { recursive: true, force: true });
fs.cpSync(path.join(RAIZ, 'public'), DIST, { recursive: true });
fs.writeFileSync(path.join(DIST, 'img/iconos.svg'), sprite());
fs.rmSync(path.join(DIST, 'img/f/manifest.json'), { force: true });

const paginas = [];
function escribir(ruta, html, { mapa = true, prioridad = '0.6' } = {}) {
  const archivo = ruta.endsWith('.html') ? path.join(DIST, ruta) : path.join(DIST, ruta, 'index.html');
  fs.mkdirSync(path.dirname(archivo), { recursive: true });
  fs.writeFileSync(archivo, html);
  if (mapa) paginas.push({ ruta, prioridad });
}

escribir('/', inicio(), { prioridad: '1.0' });
escribir('/excursiones/', excursionesListado(), { prioridad: '0.9' });
for (const e of excursiones.filter(visible)) {
  escribir(`/excursiones/${e.slug}/`, e.detalle === false ? excursionFicha(e) : excursionDetalle(e), { prioridad: e.estado === 'activa' ? '0.9' : '0.7' });
  if (e.fecha) fs.writeFileSync(path.join(DIST, `excursiones/${e.slug}/${e.slug}.ics`), ics(e));
}
escribir('/reservar/', reservar(), { prioridad: '0.8' });
escribir('/hoteles/', hotelesListado(), { prioridad: '0.8' });
for (const h of hoteles) escribir(`/hoteles/${h.slug}/`, hotelFicha(h), { prioridad: '0.7' });
if (secciones.paquetes) escribir('/paquetes/', paginaPaquetes(), { prioridad: '0.7' });
escribir('/cruceros/', paginaCruceros(), { prioridad: '0.7' });
for (const c of cruceros) escribir(`/cruceros/${c.slug}/`, detalleCrucero(c), { prioridad: '0.7' });
escribir('/como-reservar/', comoReservar(), { prioridad: '0.7' });
escribir('/contacto/', contacto(), { prioridad: '0.7' });
escribir('/terminos/', terminos(), { prioridad: '0.3' });
escribir('/privacidad/', privacidad(), { prioridad: '0.3' });
escribir('/gracias/', gracias(), { mapa: false });
escribir('/404.html', noEncontrada(), { mapa: false });

// Créditos: solo las fotos que de verdad aparecen en el sitio
const usadas = new Set();
for (const archivo of fs.readdirSync(DIST, { recursive: true })) {
  if (!String(archivo).endsWith('.html')) continue;
  const html = fs.readFileSync(path.join(DIST, String(archivo)), 'utf8');
  for (const m of html.matchAll(/\/img\/f\/([a-z0-9-]+?)-\d+\.webp/g)) usadas.add(m[1]);
}
escribir('/creditos/', creditos([...usadas]), { prioridad: '0.2' });
// Quitar del deploy las fotos que no se usan
for (const f of fs.readdirSync(path.join(DIST, 'img/f'))) {
  const slug = f.replace(/-\d+\.webp$/, '');
  if (!usadas.has(slug)) fs.rmSync(path.join(DIST, 'img/f', f));
}

// ── Archivos para Netlify ────────────────────────────────────────────────────
const ig = `https://www.instagram.com/${sitio.redes.instagram}/`;
fs.writeFileSync(
  path.join(DIST, '_redirects'),
  `# Enlaces viejos y cortos (los de la bio y los posts siguen funcionando)
/macao                /excursiones/macao/          301
/macao/*              /excursiones/macao/          301
/excursion-macao      /excursiones/macao/          301
/reservar/macao       /reservar/?excursion=macao   302
/wa                   https://wa.me/${sitio.whatsapp[0].numero}   302
/whatsapp             https://wa.me/${sitio.whatsapp[0].numero}   302
/ig                   ${ig}   302
/instagram            ${ig}   302

# Páginas de la web anterior en Hostinger (página "Coming soon", 2024)
/services             /                            301
/contact              /contacto/                   301
/destinations         /excursiones/                301
/explore-the-world-with-escondidas-multiservices-travel-agency                 /   301
/explore-the-world-with-escondidas-multiservices-your-trusted-travel-agency    /   301
`
);

fs.writeFileSync(
  path.join(DIST, '_headers'),
  `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()

/fonts/*
  Cache-Control: public, max-age=31536000, immutable
/css/*
  Cache-Control: public, max-age=31536000, immutable
/js/*
  Cache-Control: public, max-age=31536000, immutable
/img/*
  Cache-Control: public, max-age=604800
/video/*
  Cache-Control: public, max-age=604800
`
);

fs.writeFileSync(
  path.join(DIST, 'robots.txt'),
  BORRADOR
    ? `# Vista previa: no indexar todavía\nUser-agent: *\nDisallow: /\n`
    : `User-agent: *\nAllow: /\n\nSitemap: ${sitio.url}/sitemap.xml\n`
);

const hoy = new Date().toISOString().slice(0, 10);
fs.writeFileSync(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paginas.map((p) => `  <url><loc>${sitio.url}${p.ruta}</loc><lastmod>${hoy}</lastmod><priority>${p.prioridad}</priority></url>`).join('\n')}
</urlset>
`
);

fs.writeFileSync(
  path.join(DIST, 'manifest.webmanifest'),
  JSON.stringify(
    {
      name: sitio.nombre,
      short_name: sitio.nombreCorto,
      lang: 'es-DO',
      start_url: '/',
      display: 'standalone',
      background_color: '#28353B',
      theme_color: '#28353B',
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
      ],
    },
    null,
    2
  )
);

const total = paginas.length + 2;
console.log(`Sitio generado en ${path.relative(RAIZ, DIST) || DIST} · ${total} páginas · borrador: ${BORRADOR}`);

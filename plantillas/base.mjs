// Estructura común: <head>, cabecera, menú, pie y botón flotante.
import { sitio } from '../contenido/datos.mjs';
import { esc, icono, ph, wa, ig, BORRADOR, telPrincipal } from './ui.mjs';

export const VERSION = Date.now().toString(36);
const ANIO = new Date().getFullYear();

export const NAV = [
  { href: '/excursiones/', texto: 'Excursiones' },
  { href: '/hoteles/', texto: 'Hoteles' },
  { href: '/paquetes/', texto: 'Paquetes' },
  { href: '/cruceros/', texto: 'Cruceros' },
  { href: '/como-reservar/', texto: 'Cómo reservar' },
  { href: '/contacto/', texto: 'Contacto' },
];

const activo = (ruta, href) => (href !== '/' && ruta.startsWith(href) ? ' aria-current="page"' : '');

function marca(clase = '') {
  return `<a class="marca ${clase}" href="/" aria-label="${esc(sitio.nombre)}, ir al inicio">
    <img class="marca__emblema" src="/img/marca/emblema.svg" width="44" height="44" alt="">
    <span class="marca__texto" aria-hidden="true"><span class="marca__nombre">Escondidas</span><span class="marca__sub">Multiservices</span></span>
  </a>`;
}

function cabecera(ruta) {
  return `<header class="cab" data-cab>
  <div class="cab__barra">
    ${marca()}
    <nav class="cab__nav" aria-label="Principal">
      <ul>${NAV.map((n) => `<li><a href="${n.href}"${activo(ruta, n.href)}>${n.texto}</a></li>`).join('')}</ul>
    </nav>
    <a class="btn btn--arena btn--chico cab__cta" href="/reservar/">Reservar</a>
    <button class="cab__menu" type="button" aria-expanded="false" aria-controls="menu" data-menu-abrir>${icono('menu')}<span>Menú</span></button>
  </div>
</header>
<div class="menu" id="menu" role="dialog" aria-modal="true" aria-label="Menú del sitio" hidden data-menu>
  <div class="menu__top">
    ${marca()}
    <button class="menu__cerrar" type="button" data-menu-cerrar>${icono('cerrar')}<span>Cerrar</span></button>
  </div>
  <nav aria-label="Menú principal">
    <ul class="menu__lista">
      <li><a href="/"${ruta === '/' ? ' aria-current="page"' : ''}>Inicio</a></li>
      ${NAV.map((n) => `<li><a href="${n.href}"${activo(ruta, n.href)}>${n.texto}</a></li>`).join('')}
    </ul>
  </nav>
  <div class="menu__pie">
    <a class="btn btn--arena" href="/reservar/">Reservar mi cupo</a>
    <a class="btn btn--borde" href="${wa('Hola, quiero información de un viaje.')}" target="_blank" rel="noopener">${icono('whatsapp')}<span>${telPrincipal.visible}</span></a>
    <p class="lema">${esc(sitio.lema)}</p>
  </div>
</div>`;
}

function pie() {
  const d = sitio.direccion;
  return `<footer class="pie tema-noche">
  <div class="cont pie__grid">
    <div class="pie__intro">
      <img src="/img/marca/emblema.svg" width="64" height="64" alt="" class="pie__emblema">
      <p>Agencia de viajes en Santiago de los Caballeros. Excursiones en grupo, resorts, paquetes y cruceros.</p>
      <p class="lema">${esc(sitio.lema)}</p>
      <div class="pie__redes">
        <a href="${ig()}" target="_blank" rel="noopener" aria-label="Instagram de Escondidas">${icono('instagram')}</a>
        <a href="${wa()}" target="_blank" rel="noopener" aria-label="WhatsApp de Escondidas">${icono('whatsapp')}</a>
        <a href="mailto:${sitio.correo}" aria-label="Correo de Escondidas">${icono('correo')}</a>
      </div>
    </div>
    <nav aria-labelledby="pie-explora">
      <h2 id="pie-explora">Explora</h2>
      <ul>
        <li><a href="/excursiones/">Excursiones</a></li>
        <li><a href="/excursiones/macao/">Macao + Basílica de Higüey</a></li>
        <li><a href="/hoteles/">Hoteles y resorts</a></li>
        <li><a href="/paquetes/">Paquetes</a></li>
        <li><a href="/cruceros/">Cruceros</a></li>
      </ul>
    </nav>
    <nav aria-labelledby="pie-ayuda">
      <h2 id="pie-ayuda">Ayuda</h2>
      <ul>
        <li><a href="/reservar/">Reservar un cupo</a></li>
        <li><a href="/como-reservar/">Cómo reservar y pagar</a></li>
        <li><a href="/terminos/">Términos y condiciones</a></li>
        <li><a href="/privacidad/">Privacidad</a></li>
        <li><a href="/creditos/">Créditos de fotos</a></li>
      </ul>
    </nav>
    <div>
      <h2>Visítanos</h2>
      <address>
        ${esc(d.calle)}<br>${esc(d.sector)}, Santiago<br>
        <span class="pie__horario">${ph(sitio.horario, 'Horario por confirmar')}</span>
      </address>
      <ul class="pie__contacto">
        ${sitio.whatsapp.map((w) => `<li><a href="${wa('', w.numero)}" target="_blank" rel="noopener">${icono('whatsapp')}${w.visible}</a></li>`).join('')}
        <li><a href="mailto:${sitio.correo}">${icono('correo')}${sitio.correo}</a></li>
      </ul>
    </div>
  </div>
  <svg class="pie__marca" viewBox="0 0 1000 92" aria-hidden="true" focusable="false"><text x="0" y="89" textLength="1000" lengthAdjust="spacingAndGlyphs">ESCONDIDAS</text></svg>
  <div class="cont pie__legal">
    <p>© ${ANIO} ${esc(sitio.nombre)}. Precios por persona, sujetos a disponibilidad.</p>
    <p><a href="#contenido">Volver arriba</a></p>
  </div>
</footer>`;
}

export function pagina({
  ruta,
  titulo,
  descripcion = sitio.descripcion,
  og = '/img/og/inicio.jpg',
  cuerpo,
  clase = '',
  jsonld = [],
  flotante = true,
  datos = null,
}) {
  const url = sitio.url + ruta;
  const tituloCompleto = ruta === '/' ? titulo : `${titulo} · ${sitio.nombreCorto}`;
  const ld = jsonld
    .filter(Boolean)
    .map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`)
    .join('\n');
  const config = {
    hoja: sitio.hoja,
    whatsapp: telPrincipal.numero,
    ...(datos || {}),
  };
  return `<!doctype html>
<html lang="es-DO">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(tituloCompleto)}</title>
<meta name="description" content="${esc(descripcion)}">
${BORRADOR ? '<meta name="robots" content="noindex">\n' : ''}<link rel="canonical" href="${esc(url)}">
<meta name="theme-color" content="#28353B">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(sitio.nombre)}">
<meta property="og:locale" content="es_DO">
<meta property="og:title" content="${esc(tituloCompleto)}">
<meta property="og:description" content="${esc(descripcion)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(sitio.url + og)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="preload" href="/fonts/archivo.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/css/estilos.css?v=${VERSION}">
<script>document.documentElement.classList.add('js')</script>
${ld}
</head>
<body class="${esc(clase)}">
<a class="saltar" href="#contenido">Saltar al contenido</a>
${cabecera(ruta)}
<main id="contenido" tabindex="-1">
${cuerpo}
</main>
${pie()}
${flotante ? `<aside aria-label="Contacto rápido"><a class="flotante" href="${wa('Hola, quiero información de un viaje.')}" target="_blank" rel="noopener" aria-label="Escribir por WhatsApp al ${telPrincipal.visible}">${icono('whatsapp')}</a></aside>` : ''}
${BORRADOR ? `<aside aria-label="Aviso de vista previa"><div class="aviso-borrador" role="note" data-aviso><span>${icono('lapiz')}Vista previa: los recuadros punteados son datos por confirmar.</span><button type="button" data-aviso-cerrar>Entendido</button></div></aside>` : ''}
<script type="application/json" id="config">${JSON.stringify(config).replace(/</g, '\\u003c')}</script>
<script src="/js/app.js?v=${VERSION}" defer></script>
</body>
</html>
`;
}

// Migas de pan (visibles + datos estructurados)
export function migas(items) {
  const html = `<nav class="migas" aria-label="Estás en"><ol>${items
    .map((it, i) =>
      i < items.length - 1 ? `<li><a href="${it.href}">${esc(it.texto)}</a></li>` : `<li><span aria-current="page">${esc(it.texto)}</span></li>`
    )
    .join('')}</ol></nav>`;
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.texto, item: sitio.url + it.href })),
  };
  return { html, ld };
}

export const agenciaLD = () => ({
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: sitio.nombre,
  url: sitio.url,
  logo: `${sitio.url}/icon-512.png`,
  image: `${sitio.url}/img/og/inicio.jpg`,
  email: sitio.correo,
  telephone: '+1-829-817-8000',
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${sitio.direccion.calle}, ${sitio.direccion.sector}`,
    addressLocality: 'Santiago de los Caballeros',
    addressCountry: 'DO',
  },
  areaServed: 'DO',
  sameAs: [`https://www.instagram.com/${sitio.redes.instagram}/`],
});

// Utilidades y piezas pequeñas compartidas por todas las páginas.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sitio, fotos } from '../contenido/datos.mjs';

const RAIZ = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
export const manifest = JSON.parse(fs.readFileSync(path.join(RAIZ, 'public/img/f/manifest.json'), 'utf8'));
// BORRADOR=0 node build.mjs genera la versión final sin tocar datos.mjs (para revisar).
export const BORRADOR = process.env.BORRADOR ? process.env.BORRADOR === '1' : sitio.borrador;

// ── Texto ────────────────────────────────────────────────────────────────────
export const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export const attr = (o) =>
  Object.entries(o)
    .filter(([, v]) => v !== undefined && v !== null && v !== false)
    .map(([k, v]) => (v === true ? ` ${k}` : ` ${k}="${esc(v)}"`))
    .join('');

// Dato pendiente: en borrador se ve como recuadro punteado; publicado no se ve.
export function ph(valor, etiqueta, { bloque = false } = {}) {
  if (valor !== null && valor !== undefined && valor !== '') return esc(valor);
  if (!BORRADOR) return '';
  const tag = bloque ? 'div' : 'span';
  return `<${tag} class="pend${bloque ? ' pend--bloque' : ''}">${icono('lapiz')}<span>${esc(etiqueta)}</span></${tag}>`;
}
export const hay = (v) => v !== null && v !== undefined && v !== '';
export const visible = (item) => BORRADOR || !item?.pendiente;

// ── Números y fechas ─────────────────────────────────────────────────────────
export const miles = (n) => Number(n).toLocaleString('en-US');
export const rd = (n) => (hay(n) ? `RD$${miles(n)}` : null);
export const usd = (n) => (hay(n) ? `US$${miles(n)}` : null);

const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const fechaLocal = (iso) => {
  const [a, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(a, m - 1, d, 12));
};
export function fechaLarga(iso, { anio = true } = {}) {
  if (!iso) return null;
  const f = fechaLocal(iso);
  return `${DIAS[f.getUTCDay()]} ${f.getUTCDate()} de ${MESES[f.getUTCMonth()]}${anio ? ` de ${f.getUTCFullYear()}` : ''}`;
}
export function fechaTablero(iso) {
  if (!iso) return { dia: '—', fecha: 'Por anunciar' };
  const f = fechaLocal(iso);
  return {
    dia: DIAS[f.getUTCDay()].slice(0, 3).toUpperCase(),
    fecha: `${f.getUTCDate()} ${MESES[f.getUTCMonth()].slice(0, 3).toUpperCase()}`,
  };
}
export function diasHasta(iso) {
  if (!iso) return null;
  const hoy = new Date();
  const ini = Date.UTC(hoy.getUTCFullYear(), hoy.getUTCMonth(), hoy.getUTCDate());
  return Math.round((fechaLocal(iso).getTime() - 12 * 3600e3 - ini) / 86400e3);
}

// ── Enlaces ──────────────────────────────────────────────────────────────────
export const telPrincipal = sitio.whatsapp[0];
export const wa = (texto = '', numero = telPrincipal.numero) =>
  `https://wa.me/${numero}${texto ? `?text=${encodeURIComponent(texto)}` : ''}`;
export const ig = () => `https://www.instagram.com/${sitio.redes.instagram}/`;
export const mapaUrl = () => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(sitio.direccion.mapa)}`;

// ── Íconos (sprite en /img/iconos.svg) ───────────────────────────────────────
export const ICONOS = {
  whatsapp:
    '<path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4l-4.4 1.4 1.4-4.2a8.5 8.5 0 1 1 15.6-4.6z"/><path d="M8.8 8.3c.2-.5.5-.6.9-.6h.5c.2 0 .4.1.5.4l.7 1.6c.1.3 0 .5-.1.7l-.5.6c-.1.1-.1.3 0 .5.6 1.1 1.5 2 2.6 2.6.2.1.4.1.5 0l.6-.6c.2-.2.4-.2.7-.1l1.6.7c.3.1.4.3.4.6v.5c0 .4-.2.7-.6.9-.6.3-1.4.4-2.2.1-2.4-.8-4.4-2.8-5.2-5.2-.3-.8-.2-1.7 0-2.7z" fill="currentColor" stroke="none"/>',
  menu: '<path d="M4 9h16M4 15h16"/>',
  cerrar: '<path d="M6 6l12 12M18 6L6 18"/>',
  flecha: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  abajo: '<path d="M6 9l6 6 6-6"/>',
  izq: '<path d="M15 6l-6 6 6 6"/>',
  der: '<path d="M9 6l6 6-6 6"/>',
  calendario: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  'cal-mas': '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4M12 12.5v5.5M9.25 15.25h5.5"/>',
  reloj: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  bus: '<rect x="4" y="3.5" width="16" height="14" rx="3"/><path d="M4 11h16M7.5 17.5V20M16.5 17.5V20"/><circle cx="8" cy="14.3" r=".9" fill="currentColor" stroke="none"/><circle cx="16" cy="14.3" r=".9" fill="currentColor" stroke="none"/>',
  cafe: '<path d="M4 9h12v4.5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16M8 3.5c-.6.8-.6 1.7 0 2.5M12 3.5c-.6.8-.6 1.7 0 2.5M3 21h14"/>',
  plato: '<circle cx="13" cy="13" r="6.5"/><circle cx="13" cy="13" r="3"/><path d="M3 4v5.5a1.5 1.5 0 0 0 3 0V4M4.5 11v9"/>',
  buggy: '<circle cx="6.5" cy="16.5" r="2.7"/><circle cx="17.5" cy="16.5" r="2.7"/><path d="M9.2 16.5h5.6M3.8 16.5H3v-3.5l2-2h14l2 2v3.5h-.8M7 11l2-5h6l2 5M12 6v5"/>',
  ola: '<circle cx="16.5" cy="7" r="3"/><path d="M2.5 15c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 3.5-1.5M2.5 19.5c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 3.5-1.5"/>',
  templo: '<path d="M5 20.5V11.5L12 3.5l7 8v9M3 20.5h18M10 20.5v-4a2 2 0 0 1 4 0v4"/>',
  cueva: '<path d="M2.5 19.5c1.5-6 4.5-12 9.5-12s8 6 9.5 12zM9 19.5c.5-3 1.5-5 3-5s2.5 2 3 5"/>',
  casa: '<path d="M3.5 11L12 4.5l8.5 6.5M6 9.5v10h12v-10M10 19.5v-5h4v5"/>',
  regalo: '<rect x="4" y="9" width="16" height="11" rx="1.5"/><path d="M3 9h18M12 9v11M12 9C11 6 7 5 7 7.5S10 9 12 9zm0 0c1-3 5-4 5-1.5S14 9 12 9z"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  copiar: '<rect x="8.5" y="8.5" width="11" height="11" rx="2"/><path d="M15.5 8.5V6A1.5 1.5 0 0 0 14 4.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5"/>',
  compartir: '<circle cx="18" cy="5.5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="18.5" r="2.5"/><path d="M8.2 10.8l7.6-4.1M8.2 13.2l7.6 4.1"/>',
  maleta: '<rect x="3.5" y="7" width="17" height="12.5" rx="2.5"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3.5 12.5h17"/>',
  tarjeta: '<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M3 10h18M7 15h4"/>',
  banco: '<path d="M3.5 9.5L12 4l8.5 5.5M5 9.5v8M9.5 9.5v8M14.5 9.5v8M19 9.5v8M3 20h18"/>',
  efectivo: '<rect x="2.5" y="6.5" width="19" height="11" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 9.5v5M18 9.5v5"/>',
  escudo: '<path d="M12 3.5l7.5 3v5.5c0 4.4-3.2 7.7-7.5 8.7-4.3-1-7.5-4.3-7.5-8.7V6.5z"/><path d="M9 12l2 2 4-4"/>',
  avion: '<path d="M21 15.5v-1.8l-7.8-4.9V3.9a1.2 1.2 0 0 0-2.4 0v4.9L3 13.7v1.8l7.8-2.4v4.6l-2 1.5v1.4l3.2-.9 3.2.9v-1.4l-2-1.5v-4.6z"/>',
  barco: '<path d="M3 15l1.8 4.5h14.4L21 15zM6 15V9h12v6M12 9V4.5M9 4.5h6"/>',
  cama: '<path d="M3 18.5V6M3 14h18v4.5M21 14v-2.5A2.5 2.5 0 0 0 18.5 9H11v5"/><circle cx="7" cy="11" r="2"/>',
  auto: '<path d="M5 16.5H3.5v-4l1.9-4.4A2 2 0 0 1 7.2 7h9.6a2 2 0 0 1 1.8 1.1l1.9 4.4v4H19M9 16.5h6M3.5 12.5h17"/><circle cx="7" cy="16.5" r="2"/><circle cx="17" cy="16.5" r="2"/>',
  cuotas: '<circle cx="12" cy="12" r="8.5"/><path d="M14.5 9.2c-.5-.8-1.4-1.2-2.5-1.2-1.4 0-2.5.8-2.5 2s1.1 1.6 2.5 1.9 2.5.8 2.5 2-1.1 2-2.5 2c-1.1 0-2-.4-2.5-1.2M12 6.5v11"/>',
  usuario: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c.8-3.5 3.6-5.5 7-5.5s6.2 2 7 5.5"/>',
  personas: '<circle cx="9" cy="8" r="3"/><path d="M3.5 19c.6-3 2.8-5 5.5-5s4.9 2 5.5 5"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14c2.4-.2 4.2 1.6 4.5 4.5"/>',
  telefono: '<path d="M5 4h3l1.5 4-2 1.5a10 10 0 0 0 7 7l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  correo: '<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M3.5 7l8.5 6 8.5-6"/>',
  instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/>',
  play: '<path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/>',
  pausa: '<path d="M8.5 5.5v13M15.5 5.5v13" stroke-width="2.5"/>',
  mas: '<path d="M12 5v14M5 12h14"/>',
  menos: '<path d="M5 12h14"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.8v.2"/>',
  mapa: '<path d="M3.5 6.5l5-2 7 2.5 5-2v13l-5 2-7-2.5-5 2zM8.5 4.5v13M15.5 7v13"/>',
  externo: '<path d="M14 4h6v6M20 4l-9 9M18 13.5V19a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 19V7.5A1.5 1.5 0 0 1 5.5 6H11"/>',
  lapiz: '<path d="M4 20l1-4.5L15.5 5a2.1 2.1 0 0 1 3 3L8 18.5zM13.5 7l3 3"/>',
  sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6L6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4"/>',
  maletin: '<path d="M8 20.5V8M16 20.5V8"/><rect x="4.5" y="8" width="15" height="12.5" rx="2"/><path d="M9.5 8V5.5h5V8"/>',
  ticket: '<path d="M3.5 8a2 2 0 0 0 0 4v0a2 2 0 0 1 0 4V18a1.5 1.5 0 0 0 1.5 1.5h14A1.5 1.5 0 0 0 20.5 18v-2a2 2 0 0 1 0-4 2 2 0 0 0 0-4V6A1.5 1.5 0 0 0 19 4.5H5A1.5 1.5 0 0 0 3.5 6z"/><path d="M14.5 4.5v15" stroke-dasharray="2 2.5"/>',
};

export function sprite() {
  const simbolos = Object.entries(ICONOS)
    .map(([n, d]) => `<symbol id="${n}" viewBox="0 0 24 24">${d}</symbol>`)
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${simbolos}</svg>`;
}

export const icono = (n, clase = '') =>
  `<svg class="i${clase ? ' ' + clase : ''}" aria-hidden="true" focusable="false"><use href="/img/iconos.svg#${n}"/></svg>`;

// ── Fotos responsivas ────────────────────────────────────────────────────────
export function foto(slug, { sizes = '100vw', clase = '', carga = 'lazy', prioridad = false, pos = null, alt = null } = {}) {
  const m = manifest[slug];
  if (!m) throw new Error(`Foto no encontrada en el manifest: ${slug}`);
  const info = fotos[slug] || {};
  const srcset = m.anchos.map((a) => `/img/f/${slug}-${a}.webp ${a}w`).join(', ');
  const def = m.anchos.find((a) => a >= 800) || m.anchos[m.anchos.length - 1];
  const foco = pos ?? info.foco ?? null; // punto de interés por defecto de cada foto
  const estilo = [`background-color:${m.color}`, foco ? `object-position:${foco}` : ''].filter(Boolean).join(';');
  return `<img${attr({
    class: clase || undefined,
    src: `/img/f/${slug}-${def}.webp`,
    srcset,
    sizes,
    width: m.w,
    height: m.h,
    alt: alt ?? info.alt ?? '',
    loading: prioridad ? undefined : carga,
    fetchpriority: prioridad ? 'high' : undefined,
    decoding: 'async',
    style: estilo,
  })}>`;
}
export const fotoUrl = (slug, ancho = 1200) => {
  const m = manifest[slug];
  const a = m.anchos.find((x) => x >= ancho) || m.anchos[m.anchos.length - 1];
  return `/img/f/${slug}-${a}.webp`;
};

// ── Botones ──────────────────────────────────────────────────────────────────
export function boton(texto, href, { estilo = 'arena', ico = null, icoFinal = null, externo = false, clase = '', extra = {} } = {}) {
  return `<a class="btn btn--${estilo}${clase ? ' ' + clase : ''}" href="${esc(href)}"${externo ? ' target="_blank" rel="noopener"' : ''}${attr(extra)}>${ico ? icono(ico) : ''}<span>${esc(texto)}</span>${icoFinal ? icono(icoFinal) : ''}</a>`;
}
export const botonWa = (texto, mensaje, opts = {}) => boton(texto, wa(mensaje, opts.numero), { ico: 'whatsapp', externo: true, ...opts });

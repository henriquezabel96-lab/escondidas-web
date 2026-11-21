// Servidor local de prueba: sirve dist/ como Netlify (URLs limpias, 404, _redirects
// básicos) y acepta los POST de los formularios para probar el flujo completo.
// Uso: node herramientas/servidor.mjs [puerto]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = process.env.DIST || path.join(path.dirname(path.dirname(fileURLToPath(import.meta.url))), 'dist');
const PUERTO = Number(process.argv[2] || 4173);
const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.mp4': 'video/mp4',
  '.woff2': 'font/woff2', '.ics': 'text/calendar', '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json',
};
const redirecciones = fs
  .readFileSync(path.join(DIST, '_redirects'), 'utf8')
  .split('\n')
  .filter((l) => l.trim() && !l.startsWith('#'))
  .map((l) => l.trim().split(/\s+/));
export const envios = [];

http
  .createServer((req, res) => {
    const url = new URL(req.url, 'http://x');
    if (req.method === 'POST') {
      let cuerpo = '';
      req.on('data', (c) => (cuerpo += c));
      req.on('end', () => {
        const datos = Object.fromEntries(new URLSearchParams(cuerpo));
        fs.appendFileSync('/tmp/envios.log', JSON.stringify(datos) + '\n');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('ok');
      });
      return;
    }
    for (const [desde, hacia, codigo] of redirecciones) {
      const comodin = desde.endsWith('/*');
      if (url.pathname === desde || (comodin && url.pathname.startsWith(desde.slice(0, -1)))) {
        res.writeHead(Number(codigo), { Location: hacia });
        return res.end();
      }
    }
    let archivo = path.join(DIST, decodeURIComponent(url.pathname));
    if (fs.existsSync(archivo) && fs.statSync(archivo).isDirectory()) archivo = path.join(archivo, 'index.html');
    if (!fs.existsSync(archivo)) {
      res.writeHead(404, { 'Content-Type': TIPOS['.html'] });
      return res.end(fs.readFileSync(path.join(DIST, '404.html')));
    }
    const tipo = TIPOS[path.extname(archivo)] || 'application/octet-stream';
    const stat = fs.statSync(archivo);
    const rango = req.headers.range;
    if (rango && tipo === 'video/mp4') {
      const [a, b] = rango.replace('bytes=', '').split('-');
      const ini = Number(a), fin = b ? Number(b) : stat.size - 1;
      res.writeHead(206, { 'Content-Type': tipo, 'Content-Range': `bytes ${ini}-${fin}/${stat.size}`, 'Accept-Ranges': 'bytes', 'Content-Length': fin - ini + 1 });
      return fs.createReadStream(archivo, { start: ini, end: fin }).pipe(res);
    }
    res.writeHead(200, { 'Content-Type': tipo, 'Content-Length': stat.size, 'Accept-Ranges': 'bytes' });
    fs.createReadStream(archivo).pipe(res);
  })
  .listen(PUERTO, () => console.log(`Servidor en http://localhost:${PUERTO}`));

// Simula la hoja de Google (pestañas salidas y hoteles) y verifica que el sitio se actualiza.
import { createRequire } from 'node:module';
const require = createRequire('/home/claude/esc/web2/');
const { chromium } = require('playwright-core');
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const CSV = {
  salidas: 'id,nombre,fecha,precio_santiago,precio_puerto_plata,cupos,estado\nmacao,Macao + Basílica,2027-01-17,"RD$4,200",4650,8,\n',
  hoteles: 'id,nombre,desde_usd\nhard-rock-punta-cana,Hard Rock,US$ 145\nocean-el-faro,Ocean El Faro,129\n',
};
await ctx.route('https://docs.google.com/**', (route) => {
  const hoja = new URL(route.request().url()).searchParams.get('sheet');
  route.fulfill({ status: 200, contentType: 'text/csv', headers: { 'Access-Control-Allow-Origin': '*' }, body: CSV[hoja] || 'id\n' });
});
await ctx.route('http://localhost:4173/**', async (route) => {
  const r = await route.fetch();
  const tipo = r.headers()['content-type'] || '';
  if (!tipo.includes('text/html')) return route.fulfill({ response: r });
  const html = (await r.text()).replace('"hoja":{"id":null', '"hoja":{"id":"PRUEBA"');
  route.fulfill({ response: r, body: html });
});
const p = await ctx.newPage();
const errores = [];
p.on('pageerror', (e) => errores.push(e.message));
await p.goto('http://localhost:4173/excursiones/macao/', { waitUntil: 'networkidle' });
await p.waitForTimeout(500);
console.log('Macao:', await p.evaluate(() => ({
  precioSantiago: document.querySelector('[data-dato="salidas:macao:precio_santiago"]').textContent,
  precioPP: document.querySelector('[data-dato="salidas:macao:precio_puerto_plata"]').textContent,
  cupos: document.querySelector('[data-dato="salidas:macao:cupos"]').textContent,
  calcTotal: document.querySelector('[data-calc-total]').textContent,
})));
// Barra fija: oculta arriba, visible al bajar
const antes = await p.evaluate(() => document.querySelector('[data-barra-reserva]').classList.contains('visible'));
await p.evaluate(() => window.scrollTo(0, 2600));
await p.waitForTimeout(500);
const despues = await p.evaluate(() => document.querySelector('[data-barra-reserva]').classList.contains('visible'));
console.log('Barra visible arriba:', antes, '· al bajar:', despues);
await p.goto('http://localhost:4173/hoteles/', { waitUntil: 'networkidle' });
await p.waitForTimeout(500);
console.log('Hoteles:', await p.$$eval('.tarjeta-hotel__precio', (els) => els.map((e) => e.textContent.trim())));
await p.goto('http://localhost:4173/reservar/?excursion=macao&adultos=2', { waitUntil: 'networkidle' });
await p.waitForTimeout(500);
console.log('Reserva total con precio nuevo:', await p.textContent('[data-r="total"]'));
// Aviso de vista previa: se cierra y no vuelve en la misma sesión. Solo existe en modo borrador.
if (await p.$('[data-aviso-cerrar]')) {
  await p.click('[data-aviso-cerrar]');
  await p.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  console.log('Aviso oculto tras cerrar:', await p.evaluate(() => document.querySelector('[data-aviso]').hidden));
} else {
  console.log('Aviso de vista previa: no aplica (sitio en modo final)');
}
console.log('Errores JS:', errores);
await b.close();

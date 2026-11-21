// Prueba de punta a punta: reserva en 4 pasos y cotización de hotel.
import { createRequire } from 'node:module';
const require = createRequire('/home/claude/esc/web2/');
const { chromium } = require('playwright-core');
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const p = await ctx.newPage();
const errores = [];
p.on('pageerror', (e) => errores.push(e.message));
// 1) Reserva prellenada desde la calculadora
await p.goto('http://localhost:4173/reservar/?excursion=macao&salida=puerto-plata&adultos=3&pagos=3', { waitUntil: 'networkidle' });
const r0 = await p.evaluate(() => ({ total: document.querySelector('[data-r="total"]').textContent, salida: document.querySelector('[data-r="salida"]').textContent, personas: document.querySelector('[data-r="personas"]').textContent, cuotas: document.querySelector('[data-r="cuotas"]').textContent }));
console.log('Prellenado:', r0);
await p.click('[data-siguiente]');
await p.click('[data-contador]:nth-of-type(2) [data-mas]');
await p.fill('input[name="edades_ninos"]', '7');
await p.click('[data-siguiente]');
// Paso 3 vacío: debe mostrar errores
await p.click('[data-siguiente]');
const err = await p.$$eval('.campo--error .campo__error', (els) => els.map((e) => e.textContent));
console.log('Errores paso 3:', err);
await p.fill('input[name="nombre"]', 'María Rodríguez');
await p.fill('input[name="whatsapp"]', '809 555 1234');
await p.click('[data-siguiente]');
await p.screenshot({ path: '/tmp/res_paso4.png' });
// Enviar sin marcar términos
await p.click('[data-enviar]');
const errT = await p.$$eval('[data-paso="4"] .campo__error', (els) => els.map((e) => e.textContent));
console.log('Error términos:', errT);
await p.check('input[name="acepto"]');
await p.click('[data-enviar]');
await p.waitForSelector('[data-enviado]:not([hidden])', { timeout: 5000 });
const ok = await p.evaluate(() => ({ codigo: document.querySelector('[data-codigo]').textContent, wa: decodeURIComponent(document.querySelector('[data-enviado-wa]').href) }));
console.log('Enviado:', ok);
await p.screenshot({ path: '/tmp/res_ok.png' });
// 2) Cotización de hotel
await p.goto('http://localhost:4173/hoteles/zemi-miches/', { waitUntil: 'networkidle' });
await p.fill('form[name="cotizacion-hotel"] input[name="entrada"]', '2027-03-12');
await p.fill('form[name="cotizacion-hotel"] input[name="salida"]', '2027-03-15');
await p.fill('form[name="cotizacion-hotel"] input[name="nombre"]', 'Juan Pérez');
await p.fill('form[name="cotizacion-hotel"] input[name="whatsapp"]', '8295551234');
await p.click('form[name="cotizacion-hotel"] button[type="submit"]');
await p.waitForSelector('form[name="cotizacion-hotel"] [data-enviado]:not([hidden])', { timeout: 5000 });
console.log('Hotel WA:', decodeURIComponent(await p.getAttribute('form[name="cotizacion-hotel"] [data-enviado-wa]', 'href')));
console.log('Errores JS:', errores);
await b.close();

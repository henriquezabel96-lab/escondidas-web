// Capturas de revisión: node herramientas/capturas.mjs <ruta> <dispositivo> [salida] [--full]
// dispositivo: movil (390x844) | tablet (820x1180) | laptop (1440x900)
import { createRequire } from 'node:module';
const require = createRequire('/home/claude/esc/web2/');
const { chromium } = require('playwright-core');

const DISP = {
  movil: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  tablet: { width: 820, height: 1180, deviceScaleFactor: 1.5, isMobile: true, hasTouch: true },
  laptop: { width: 1440, height: 900, deviceScaleFactor: 1 },
};
const [ruta = '/', disp = 'laptop', salida = `/tmp/cap_${disp}.png`] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const completa = process.argv.includes('--full');

const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--autoplay-policy=no-user-gesture-required'] });
const ctx = await b.newContext({ viewport: { width: DISP[disp].width, height: DISP[disp].height }, deviceScaleFactor: DISP[disp].deviceScaleFactor, isMobile: !!DISP[disp].isMobile, hasTouch: !!DISP[disp].hasTouch, reducedMotion: 'reduce' });
if (process.env.SIN_AVISO) await ctx.addInitScript(() => { try { sessionStorage.setItem('aviso-visto', '1'); } catch (e) {} });
const p = await ctx.newPage();
const errores = [];
p.on('pageerror', (e) => errores.push(e.message));
p.on('console', (m) => { if (m.type() === 'error') errores.push(m.text()); });
await p.goto('http://localhost:' + (process.env.PUERTO || 4173) + ruta, { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
if (completa) {
  // Forzar la carga de imágenes diferidas
  await p.evaluate(async () => {
    document.querySelectorAll('img[loading="lazy"]').forEach((i) => (i.loading = 'eager'));
    await new Promise((r) => setTimeout(r, 300));
  });
  for (let y = 0; y < (await p.evaluate(() => document.documentElement.scrollHeight)); y += 700) {
    await p.evaluate((yy) => window.scrollTo(0, yy), y);
    await p.waitForTimeout(120);
  }
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForFunction(() => Array.from(document.images).every((i) => i.complete && i.naturalWidth > 0), null, { timeout: 15000 }).catch(() => {});
  await p.waitForTimeout(800);
}
await p.waitForTimeout(400);
await p.screenshot({ path: salida, fullPage: completa });
const h = await p.evaluate(() => document.documentElement.scrollHeight);
const ancho = await p.evaluate(() => ({ doc: document.documentElement.scrollWidth, vw: window.innerWidth }));
console.log(JSON.stringify({ salida, altura: h, ancho, errores }));
await b.close();

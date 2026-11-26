// Páginas de información: cómo reservar, contacto, legales, créditos, gracias, 404
import { sitio, faqGeneral, fotos, excursiones, secciones } from '../contenido/datos.mjs';
import { pagina, migas, agenciaLD } from './base.mjs';
import { esc, icono, foto, boton, botonWa, ph, rd, hay, wa, ig, mapaUrl, manifest, fechaLarga, BORRADOR } from './ui.mjs';
import { cabeza, cierre, pasos, faq, formInicio, campo, panelEnviado } from './componentes.mjs';

const mac = excursiones.find((e) => e.slug === 'macao');

export function comoReservar() {
  const m = migas([{ texto: 'Inicio', href: '/' }, { texto: 'Cómo reservar', href: '/como-reservar/' }]);
  const preguntas = faq(faqGeneral, { id: 'preguntas' });
  const p = sitio.politicas;
  const condiciones = [
    ['Depósito', p.deposito, 'Si el depósito se devuelve y en qué casos'],
    ['Cambios de nombre o de fecha', p.cambios, 'Si se puede pasar el cupo a otra persona o a otra fecha'],
    ['Si la agencia cancela', p.cancelacionAgencia, 'Qué pasa si la agencia cancela o mueve la fecha'],
    ['Niños y menores de edad', p.menores, 'Edades, precios y si deben ir con un adulto'],
    ['Mal tiempo', p.clima, 'Qué pasa si llueve el día de la excursión'],
  ].filter(([, v]) => hay(v) || BORRADOR);
  const cuentas = sitio.pagos.cuentas.filter((c) => hay(c.numero) || BORRADOR);

  const cuerpo = `
<section class="cabecera-pag tema-claro">
  <div class="cont">
    ${m.html}
    <h1 class="t-titulo">Cómo reservar y pagar</h1>
    <p class="t-lead">Separas con un depósito, te enviamos el comprobante con el cupo a tu nombre y pagas el resto a tu ritmo, siempre antes de la fecha del viaje.</p>
    <div class="acciones">${boton('Reservar un cupo', '/reservar/', { estilo: 'pizarra' })}${botonWa('Reservar por WhatsApp', 'Hola, quiero reservar un cupo.', { estilo: 'borde' })}</div>
  </div>
</section>

<section class="seccion seccion--arriba-0 tema-claro" aria-labelledby="pasos-t">
  <div class="cont"><h2 class="sr" id="pasos-t">Pasos para reservar</h2>${pasos({ deposito: mac.deposito, conEnlace: false })}</div>
</section>

<section class="seccion tema-bruma" id="pagos" aria-labelledby="pagos-t">
  <div class="cont">
    ${cabeza({ titulo: 'Formas de pago', id: 'pagos-t', texto: 'Después de pagar, envíanos una foto del recibo o la captura de la transferencia por WhatsApp, con tu código de reserva.' })}
    <div class="cuentas">
      ${cuentas
        .map(
          (c) => `<div class="cuenta-pago">${icono('banco')}<h3>Transferencia o depósito</h3>
        <p>${hay(c.banco) ? esc(c.banco) : ph(null, 'Banco')}${hay(c.tipo) ? ` · ${esc(c.tipo)}` : BORRADOR ? ` ${ph(null, 'Tipo de cuenta')}` : ''}</p>
        <p>${hay(c.numero) ? `<strong>${esc(c.numero)}</strong>` : ph(null, 'Número de cuenta')}</p>
        <p>${hay(c.titular) ? `A nombre de ${esc(c.titular)}` : ph(null, 'A nombre de')}</p>
        ${hay(c.numero) ? `<button class="copiar" type="button" data-copiar="${esc(c.numero)}">${icono('copiar')}<span>Copiar número</span></button>` : ''}</div>`
        )
        .join('')}
      <div class="cuenta-pago">${icono('banco')}<h3>Transferencia o depósito</h3><p>Te enviamos los datos de la cuenta por WhatsApp cuando confirmes tu reserva.</p></div>
      <div class="cuenta-pago">${icono('efectivo')}<h3>Efectivo en la oficina</h3><p>${esc(sitio.pagos.efectivo)}</p><p>${ph(sitio.horario, 'Horario por confirmar')}</p></div>
      ${hay(sitio.pagos.tarjeta) || BORRADOR ? `<div class="cuenta-pago">${icono('tarjeta')}<h3>Tarjeta</h3><p>${ph(sitio.pagos.tarjeta, '¿Aceptan tarjeta en la oficina o por enlace de pago?')}</p></div>` : ''}
    </div>
    <p style="margin-top:2rem">${botonWa('Enviar mi comprobante', 'Hola, envío el comprobante de mi reserva. Mi código es: ', { estilo: 'pizarra' })}</p>
  </div>
</section>

${
  condiciones.length
    ? `<section class="seccion tema-claro" id="condiciones" aria-labelledby="cond-t">
  <div class="cont dos-col">
    ${cabeza({ titulo: 'Condiciones importantes', id: 'cond-t', texto: 'Léelas antes de separar. El detalle completo está en los términos y condiciones.', extra: `<p><a class="enlace" href="/terminos/">Leer términos y condiciones</a></p>` })}
    <div class="bueno-saber">${condiciones.map(([t, v, pend]) => `<div><h3>${esc(t)}</h3><p>${hay(v) ? esc(v) : ph(null, pend)}</p></div>`).join('')}</div>
  </div>
</section>`
    : ''
}

<section class="seccion tema-bruma" aria-labelledby="faq-t">
  <div class="cont dos-col">
    ${cabeza({ titulo: 'Preguntas frecuentes', id: 'faq-t' })}
    ${preguntas.html}
  </div>
</section>
${cierre()}`;
  return pagina({
    ruta: '/como-reservar/',
    titulo: 'Cómo reservar y pagar',
    descripcion: 'Cómo reservar con Escondidas Multiservices: separa con un depósito, paga en partes antes del viaje y envía tu comprobante por WhatsApp.',
    cuerpo,
    jsonld: [m.ld, preguntas.ld],
  });
}

export function contacto() {
  const m = migas([{ texto: 'Inicio', href: '/' }, { texto: 'Contacto', href: '/contacto/' }]);
  const d = sitio.direccion;
  const cuerpo = `
<section class="cabecera-pag tema-claro">
  <div class="cont">
    ${m.html}
    <h1 class="t-titulo">Visítanos o escríbenos</h1>
    <p class="t-lead">Estamos en Los Jardines Metropolitanos, Santiago. Por WhatsApp te respondemos más rápido.</p>
  </div>
</section>

<section class="seccion seccion--arriba-0 tema-claro">
  <div class="cont contacto-grid">
    <div>
      <div class="datos-contacto">
        <div class="dato-c">${icono('pin')}<div><h2>Oficina</h2><address>${esc(d.calle)}<br>${esc(d.sector)}, ${esc(d.ciudad)}</address><p><a class="enlace" href="${mapaUrl()}" target="_blank" rel="noopener">Cómo llegar en Google Maps</a></p></div></div>
        <div class="dato-c">${icono('whatsapp')}<div><h2>WhatsApp</h2><p>${sitio.whatsapp.map((w) => `<a href="${wa('Hola, quiero información de un viaje.', w.numero)}" target="_blank" rel="noopener">${w.visible}</a>`).join(' y ')}</p></div></div>
        <div class="dato-c">${icono('correo')}<div><h2>Correo</h2><p><a href="mailto:${sitio.correo}">${sitio.correo}</a></p></div></div>
        ${hay(sitio.horario) || BORRADOR ? `<div class="dato-c">${icono('reloj')}<div><h2>Horario</h2><p>${ph(sitio.horario, 'Horario de la oficina por confirmar')}</p></div></div>` : ''}
        <div class="dato-c">${icono('usuario')}<div><h2>Gerente</h2><p>${esc(sitio.gerente)}</p></div></div>
        <div class="dato-c">${icono('instagram')}<div><h2>Instagram</h2><p><a href="${ig()}" target="_blank" rel="noopener">@${esc(sitio.redes.instagram)}</a></p></div></div>
      </div>
      <div class="mapa"><iframe title="Mapa de la oficina de Escondidas Multiservices" src="https://www.google.com/maps?q=${encodeURIComponent(d.mapa)}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
    </div>
    ${formInicio('contacto', { clase: 'tarjeta-form', extra: { 'data-wa': 'contacto' } })}
      <h2 class="tarjeta-form__t">Cuéntanos tu viaje</h2>
      <p class="form__nota">Te respondemos por WhatsApp. También llega una copia al correo de la agencia.</p>
      ${campo({ nombre: 'nombre', etiqueta: 'Tu nombre', requerido: true, autocomplete: 'name', error: 'Escribe tu nombre.' })}
      <div class="fila-campos">
        ${campo({ tipo: 'tel', nombre: 'whatsapp', etiqueta: 'Tu WhatsApp', requerido: true, autocomplete: 'tel', inputmode: 'tel', placeholder: '809 000 0000', patron: '[0-9 ()+\\-]{10,}', error: 'Escribe un número de 10 dígitos, por ejemplo 809 555 1234.' })}
        ${campo({ tipo: 'email', nombre: 'correo', etiqueta: 'Tu correo', autocomplete: 'email', error: 'Revisa el correo, parece incompleto.' })}
      </div>
      ${campo({ tipo: 'select', nombre: 'interes', etiqueta: '¿Qué te interesa?', opciones: ['Excursión a Macao', 'Otra excursión', 'Hotel o resort', ...(secciones.paquetes ? ['Paquete de viaje'] : []), 'Crucero', 'Boleto aéreo', 'Rent car', 'Seguro de viaje', 'Otra cosa'] })}
      ${campo({ tipo: 'textarea', nombre: 'mensaje', etiqueta: 'Mensaje', requerido: true, filas: 5, placeholder: 'Destino, fechas, cuántos van…', error: 'Escribe tu mensaje.' })}
      <button class="btn btn--pizarra" type="submit">${icono('whatsapp')}<span>Enviar mensaje</span></button>
      ${panelEnviado({ titulo: 'Recibimos tu mensaje', texto: 'Te escribimos por WhatsApp en horario de oficina. Si quieres adelantar, envíanos el mensaje ya armado:' })}
    </form>
  </div>
</section>`;
  return pagina({
    ruta: '/contacto/',
    titulo: 'Contacto y ubicación',
    descripcion: 'Oficina en Edificio Reina, Los Jardines Metropolitanos, Santiago. WhatsApp 829-817-8000 y 809-882-7271. Escríbenos y cotiza tu viaje.',
    cuerpo,
    jsonld: [m.ld, agenciaLD()],
  });
}

function legal(ruta, titulo, descripcion, secciones, nota = '') {
  const m = migas([{ texto: 'Inicio', href: '/' }, { texto: titulo, href: ruta }]);
  const cuerpo = `
<section class="cabecera-pag tema-claro">
  <div class="cont">
    ${m.html}
    <h1 class="t-titulo">${esc(titulo)}</h1>
    ${nota}
  </div>
</section>
<section class="seccion seccion--arriba-0 tema-claro">
  <div class="cont prosa">${secciones}</div>
</section>`;
  return pagina({ ruta, titulo, descripcion, cuerpo, jsonld: [m.ld] });
}

export function terminos() {
  const p = sitio.politicas;
  const sec = (titulo, ...parrafos) => {
    const llenos = parrafos.filter((x) => x);
    return llenos.length ? `<h2>${titulo}</h2>${llenos.map((x) => `<p>${x}</p>`).join('')}` : '';
  };
  const s = `
<h2>Reservas y depósito</h2>
<p>Para separar un cupo en una excursión se paga un depósito por persona (en la excursión a Macao, ${rd(mac.deposito)}). El cupo queda a nombre de la persona cuando la agencia confirma el pago y envía el comprobante.</p>
${hay(p.deposito) || BORRADOR ? `<p>${ph(p.deposito, 'Si el depósito se devuelve y en qué casos')}</p>` : ''}
<h2>Pagos en partes</h2>
<p>El resto del precio se puede pagar en partes. El total debe estar completo antes de la fecha del viaje. ${ph(mac.fechaLimitePago && `Para la excursión a Macao, la fecha límite es el ${fechaLarga(mac.fechaLimitePago)}.`, 'Fecha límite para completar el pago')}</p>
${sec('Cambios y cancelaciones', ph(p.cambios, 'Cambios de nombre o de fecha'), ph(p.cancelacionAgencia, 'Qué pasa si la agencia cancela o cambia la fecha'))}
${sec('Niños y menores de edad', ph(p.menores, 'Edades, precios y si deben ir acompañados'))}
${sec('Clima y causas de fuerza mayor', ph(p.clima, 'Qué pasa si hay mal tiempo o un evento fuera del control de la agencia'))}
<h2>Hoteles, paquetes y cruceros</h2>
<p>Los precios de hoteles, paquetes y cruceros dependen de la disponibilidad y la temporada, y se confirman por escrito antes de pagar. Cada hotel, aerolínea o naviera tiene además sus propias condiciones, que la agencia te comparte junto con la cotización.</p>
<h2>Documentos de viaje</h2>
<p>Para viajes fuera del país, cada viajero es responsable de tener su pasaporte vigente y las visas que pida el destino. La agencia te orienta sobre los requisitos antes de reservar.</p>
<h2>Contacto</h2>
<p>Para cualquier duda sobre estas condiciones escribe a <a href="mailto:${sitio.correo}">${sitio.correo}</a> o al WhatsApp ${sitio.whatsapp[0].visible}.</p>`;
  return legal(
    '/terminos/',
    'Términos y condiciones',
    'Condiciones de reserva, depósitos, pagos en partes, cambios y cancelaciones de Escondidas Multiservices.',
    s,
    BORRADOR ? `<p class="t-lead">${ph(null, 'Borrador: la agencia debe revisar y aprobar estas condiciones antes de publicar')}</p>` : ''
  );
}

export function privacidad() {
  const s = `
<h2>Qué datos pedimos</h2>
<p>En los formularios de este sitio pedimos tu nombre, tu número de WhatsApp, tu correo si quieres darlo y los detalles del viaje que te interesa (fechas, cantidad de personas, punto de salida).</p>
<h2>Para qué los usamos</h2>
<ul>
  <li>Responderte y enviarte cotizaciones.</li>
  <li>Gestionar tu reserva, tus pagos y la información del viaje.</li>
  <li>Avisarte de nuevas salidas, solo si lo pediste.</li>
</ul>
<p>No vendemos ni compartimos tus datos con terceros para publicidad. Solo los compartimos con hoteles, aerolíneas o navieras cuando es necesario para reservar tu viaje.</p>
<h2>Dónde se guardan</h2>
<p>Los formularios se procesan con Netlify, el servicio que aloja este sitio. Si nos escribes por WhatsApp, la conversación queda en esa aplicación.</p>
<h2>Tus derechos</h2>
<p>Puedes pedirnos en cualquier momento que corrijamos o borremos tus datos escribiendo a <a href="mailto:${sitio.correo}">${sitio.correo}</a>.</p>
<h2>Cookies</h2>
<p>Este sitio no usa cookies de publicidad. El mapa de la página de contacto lo muestra Google Maps, que puede usar sus propias cookies.</p>`;
  return legal('/privacidad/', 'Política de privacidad', 'Cómo usa Escondidas Multiservices los datos que envías en los formularios del sitio.', s);
}

export function creditos(usados = Object.keys(manifest)) {
  const filas = usados
    .map((slug) => {
      const f = fotos[slug];
      if (!f) return '';
      const c = f.credito || {};
      const texto = hay(c.autor)
        ? `${esc(c.autor)}${c.licencia ? ` · ${esc(c.licencia)}` : ''}${c.fuente ? ` · ${esc(c.fuente)}` : ''}`
        : BORRADOR
        ? `${ph(null, 'Autor y licencia por confirmar')}${c.fuente ? ` · ${esc(c.fuente)}` : ''}`
        : '';
      if (!texto) return '';
      return `<li>${foto(slug, { sizes: '88px' })}<p><strong>${esc(f.alt)}</strong><br>${texto}</p></li>`;
    })
    .join('');
  const s = `<p>Las fotos de buggies y viajeros son de excursiones de la agencia. Las fotos de lugares con licencia Creative Commons se publican con el nombre de su autor y su licencia.</p><ul class="creditos-lista">${filas}</ul>`;
  return legal('/creditos/', 'Créditos de fotos', 'Autores y licencias de las fotos usadas en el sitio de Escondidas Multiservices.', s);
}

export function gracias() {
  const cuerpo = `
<section class="tema-claro">
  <div class="cont error-pag">
    <h1 class="t-titulo">¡Gracias! Recibimos tu solicitud</h1>
    <p class="t-lead">Te escribimos por WhatsApp en horario de oficina. Si quieres adelantar, escríbenos tú.</p>
    <div class="acciones">${botonWa('Escribir por WhatsApp', 'Hola, acabo de enviar un formulario en la web.', { estilo: 'pizarra' })}${boton('Volver al inicio', '/', { estilo: 'borde' })}</div>
  </div>
</section>`;
  return pagina({ ruta: '/gracias/', titulo: 'Gracias', descripcion: 'Recibimos tu solicitud.', cuerpo });
}

export function noEncontrada() {
  const cuerpo = `
<section class="tema-claro">
  <div class="cont error-pag">
    <h1 class="t-titulo">Esta página se escondió demasiado bien</h1>
    <p class="t-lead">No la encontramos. Puede que el enlace esté viejo o mal escrito.</p>
    <div class="acciones">${boton('Ir al inicio', '/', { estilo: 'pizarra' })}${boton('Ver la excursión a Macao', '/excursiones/macao/', { estilo: 'borde' })}</div>
  </div>
</section>`;
  return pagina({ ruta: '/404.html', titulo: 'Página no encontrada', descripcion: 'Página no encontrada.', cuerpo });
}

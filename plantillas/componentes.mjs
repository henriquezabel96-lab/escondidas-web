// Piezas de interfaz que se repiten entre páginas.
import { sitio, fotos } from '../contenido/datos.mjs';
import { esc, attr, icono, ph, hay, visible, foto, rd, usd, fechaTablero, fechaLarga, diasHasta, wa, BORRADOR, boton } from './ui.mjs';

// ── Encabezado de sección ────────────────────────────────────────────────────
export function cabeza({ titulo, texto = '', id = '', nivel = 2, clase = '', extra = '' }) {
  return `<div class="cabeza ${clase}">
    <h${nivel} class="t-seccion"${id ? ` id="${id}"` : ''}>${titulo}</h${nivel}>
    ${texto ? `<p class="t-lead">${texto}</p>` : ''}
    ${extra}
  </div>`;
}

// ── Tablero de próximas salidas ──────────────────────────────────────────────
export function filaTablero(e) {
  const f = e.fecha ? fechaTablero(e.fecha) : e.fechaAprox ? { dia: '', fecha: e.fechaAprox.split(' ')[0].toUpperCase() } : fechaTablero(null);
  const fechaHtml = e.fecha || e.fechaAprox ? flap(f.fecha) : `<span class="fila__pronto">Por anunciar</span>`;
  const precioMin = e.salidas?.map((s) => s.precio).filter(hay).sort((a, b) => a - b)[0];
  const activa = e.estado === 'activa';
  const href = `/excursiones/${e.slug}/`;
  const salidas = e.salidas.map((s) => s.ciudad).join(' y ');
  const estado = activa
    ? hay(e.cupos)
      ? e.cupos <= 10
        ? `Últimos ${e.cupos} cupos`
        : `Quedan ${e.cupos} cupos`
      : 'Cupos disponibles'
    : e.fechaAprox ? 'Fecha por confirmar' : 'Próximamente';
  return `<li class="fila${activa ? ' fila--activa' : ''}${e.pendiente ? ' fila--pend' : ''}">
    <a class="fila__enlace" href="${href}">
      <span class="fila__fecha"><span class="fila__dia">${f.dia}</span><span class="fila__num">${fechaHtml}</span></span>
      <span class="fila__destino"><span class="fila__nombre">${esc(e.nombre)}</span><span class="fila__region">${esc(e.region || '')}</span></span>
      <span class="fila__salida"><span class="sr">Sale desde </span>${esc(salidas)}</span>
      <span class="fila__precio">${precioMin ? `<span class="fila__desde">desde</span> <span data-dato="salidas:${e.slug}:precio_santiago" data-formato="rd">${rd(precioMin)}</span>` : `<span class="fila__desde">Precio por anunciar</span>`}</span>
      <span class="fila__estado${activa ? ' fila__estado--ok' : ''}"${activa ? ` data-dato="salidas:${e.slug}:cupos" data-formato="estado"` : ''}><span class="punto" aria-hidden="true"></span>${estado}</span>
      <span class="fila__ir">${icono('flecha')}<span class="sr">Ver la excursión</span></span>
    </a>
  </li>`;
}

export function tablero(lista, { titulo = 'Próximas salidas', id = 'salidas', pie = '' } = {}) {
  const filas = lista.filter(visible);
  return `<div class="tablero" role="region" aria-labelledby="${id}-titulo">
    <div class="tablero__cab">
      <h2 class="t-seccion" id="${id}-titulo">${titulo}</h2>
      <p class="tablero__nota">Salidas en guagua desde Santiago y Puerto Plata</p>
    </div>
    <div class="tablero__cols" aria-hidden="true"><span>Fecha</span><span>Destino</span><span>Sale desde</span><span>Precio</span><span>Estado</span><span></span></div>
    <ol class="tablero__filas">${filas.map((e) => filaTablero(e)).join('')}</ol>
    ${pie}
  </div>`;
}

// ── Boleto con precios por punto de salida ───────────────────────────────────
export function boletos(e, { compacto = false } = {}) {
  return `<div class="boletos${compacto ? ' boletos--compacto' : ''}">
    ${e.salidas
      .map(
        (s) => `<div class="boleto">
        <div class="boleto__cuerpo">
          <span class="boleto__label">Sale desde</span>
          <span class="boleto__ciudad">${esc(s.ciudad)}</span>
          <span class="boleto__precio" data-dato="salidas:${e.slug}:precio_${s.id.replace('-', '_')}" data-formato="rd">${hay(s.precio) ? rd(s.precio) : 'Por confirmar'}</span>
          <span class="boleto__nota">${esc(e.notaPrecio || 'por persona, todo incluido')}</span>
        </div>
        <div class="boleto__talon">
          ${hay(e.deposito) ? `<span>Separa con <strong>${rd(e.deposito)}</strong></span>` : '<span>Precio por confirmar</span>'}
          ${e.estado === 'activa' ? `<a class="boleto__btn" href="/reservar/?excursion=${e.slug}&amp;salida=${s.id}">Separar desde ${esc(s.ciudad)}</a>` : `<a class="boleto__btn" href="#avisame">Avísame</a>`}
        </div>
      </div>`
      )
      .join('')}
  </div>`;
}

// ── Cuenta regresiva (se actualiza con JS) ───────────────────────────────────
export function cuenta(iso, { clase = '', hora = '06:00' } = {}) {
  if (!iso) return '';
  const d = diasHasta(iso);
  const texto = d > 1 ? `Faltan ${d} días` : d === 1 ? 'Falta 1 día' : 'Últimas horas';
  return `<span class="cuenta ${clase}" data-cuenta="${iso}T${hora || '06:00'}:00-04:00">${icono('reloj')}<span data-cuenta-texto>${texto}</span></span>`;
}

// ── Letras tipo tablero de aeropuerto ────────────────────────────────────────
export function flap(texto, { clase = '', animar = false } = {}) {
  const letras = [...String(texto)]
    .map((c) => (c === ' ' ? '<span class="flap__c flap__c--esp"> </span>' : `<span class="flap__c">${esc(c)}</span>`))
    .join('');
  return `<span class="sr">${esc(texto)}</span><span class="flap ${clase}" aria-hidden="true"${animar ? ' data-flap' : ''}>${letras}</span>`;
}

export const enlaceFlecha = (texto, href, extra = '') => `<a class="enlace-flecha" href="${href}"${extra}><span>${esc(texto)}</span>${icono('flecha')}</a>`;

// ── Pasos para reservar ──────────────────────────────────────────────────────
export function pasos({ deposito = 1000, conEnlace = true, items: propios = null } = {}) {
  const items = propios || [
    ['Reserva tu cupo', 'Llena la reserva en la web o escríbenos por WhatsApp con el viaje y cuántos van.'],
    [`Separa con ${rd(deposito)}`, 'Haces el depósito por persona y te enviamos el comprobante con el cupo a tu nombre.'],
    ['Paga el resto en partes', 'Abonas a tu ritmo, siempre antes de la fecha del viaje. Antes de salir te mandamos hora y punto de encuentro.'],
  ];
  return `<ol class="pasos">
    ${items
      .map(
        ([t, d], i) => `<li class="paso-item">
        <span class="paso-item__n" aria-hidden="true">${i + 1}</span>
        <h3 class="paso-item__t">${esc(t)}</h3>
        <p>${esc(d)}</p>
      </li>`
      )
      .join('')}
  </ol>
  ${conEnlace ? `<p class="pasos__mas"><a class="enlace" href="/como-reservar/">Formas de pago y condiciones</a></p>` : ''}`;
}

// ── Preguntas frecuentes ─────────────────────────────────────────────────────
export function faq(items, { id = 'preguntas' } = {}) {
  const lista = items.filter((x) => hay(x.r) || BORRADOR);
  const html = `<div class="faq" id="${id}">${lista
    .map(
      (x) => `<details class="faq__item">
      <summary><span>${esc(x.p)}</span>${icono('mas', 'faq__ico')}</summary>
      <div class="faq__r">${hay(x.r) ? `<p>${esc(x.r)}</p>` : ph(null, x.pendiente || 'Respuesta por confirmar', { bloque: true })}</div>
    </details>`
    )
    .join('')}</div>`;
  const conR = items.filter((x) => hay(x.r));
  const ld = conR.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: conR.map((x) => ({ '@type': 'Question', name: x.p, acceptedAnswer: { '@type': 'Answer', text: x.r } })),
      }
    : null;
  return { html, ld };
}

// ── Cierre con llamado a la acción ───────────────────────────────────────────
export function cierre({ titulo = '¿Pa’ dónde vamos?', texto = 'Escríbenos y te mandamos opciones y precios hoy mismo.', accion = '' } = {}) {
  return `<section class="cierre tema-oscuro" aria-labelledby="cierre-t">
    <div class="cont cierre__in">
      <h2 class="cierre__t" id="cierre-t">${esc(titulo)}</h2>
      <p class="t-lead">${esc(texto)}</p>
      <div class="cierre__acciones">
        ${accion}
        ${sitio.whatsapp
          .map((w, i) =>
            boton(w.visible, wa('Hola, quiero información de un viaje.', w.numero), {
              estilo: i === 0 && !accion ? 'arena' : 'borde',
              ico: 'whatsapp',
              externo: true,
              clase: 'btn--grande',
            })
          )
          .join('')}
      </div>
      <p class="cierre__correo">O escribe a <a href="mailto:${sitio.correo}">${sitio.correo}</a></p>
    </div>
  </section>`;
}

// ── Crédito de foto ──────────────────────────────────────────────────────────
export function credito(slug) {
  const c = fotos[slug]?.credito;
  if (!c) return '';
  if (!hay(c.autor)) return BORRADOR ? `<span class="credito">${ph(null, 'Crédito de la foto por confirmar')}</span>` : '';
  if (c.autor === 'Escondidas Multiservices') return '';
  return `<span class="credito">Foto: ${esc(c.autor)}${c.licencia ? `, ${esc(c.licencia)}` : ''}</span>`;
}

// ── Tarjetas ─────────────────────────────────────────────────────────────────
export function tarjetaHotel(h, zonas, { sizes = '(min-width: 1100px) 300px, (min-width: 700px) 45vw, 82vw', h3 = true } = {}) {
  const tag = h3 ? 'h3' : 'h2';
  const o = h.oferta;
  // un hotel sin precio propio solo se publica por su oferta: desaparece cuando vence
  const soloOferta = o && !hay(h.desde);
  const sello = o ? `<span class="sello sello--oferta" data-vence="${o.vence}">Oferta</span>` : h.destacado ? '<span class="sello">Oferta destacada</span>' : '';
  const sinOferta = hay(h.desde) ? `Desde <strong>${usd(h.desde)}</strong> por noche` : BORRADOR ? ph(null, 'Precio desde US$ por confirmar') : 'Cotiza con tus fechas';
  const precio = o
    ? `<span class="tarjeta-hotel__precio"><span data-vence="${o.vence}"><strong>${esc(o.resumen)}</strong></span>${soloOferta ? '' : `<span data-vencida hidden>${sinOferta}</span>`}</span>`
    : `<span class="tarjeta-hotel__precio" data-dato="hoteles:${h.slug}:desde_usd" data-formato="desde-usd">${sinOferta}</span>`;
  const linea = o ? `<span class="tarjeta-hotel__plan" data-vence="${o.vence}">${esc(o.titulo)}</span>` : h.plan ? `<span class="tarjeta-hotel__plan">${esc(h.plan)}</span>` : '';
  return `<article class="tarjeta-hotel" data-zona="${h.zona}"${soloOferta ? ` data-vence="${o.vence}"` : ''}>
    <a class="tarjeta-hotel__enlace" href="/hoteles/${h.slug}/">
      <div class="tarjeta-hotel__media">${foto(h.foto, { sizes })}${sello}</div>
      <div class="tarjeta-hotel__txt">
        <span class="tarjeta-hotel__zona">${esc(h.lugar)}</span>
        <${tag} class="tarjeta-hotel__nombre">${esc(h.nombre)}</${tag}>
        ${linea}
        ${precio}
      </div>
    </a>
  </article>`;
}

export function tarjetaExcursion(e) {
  const grande = !!e.destacada;
  const activa = e.estado === 'activa';
  const precioMin = e.salidas?.map((s) => s.precio).filter(hay).sort((a, b) => a - b)[0];
  const fecha = e.fecha ? fechaLarga(e.fecha) : e.fechaAprox ? `${e.fechaAprox}, fecha por confirmar` : 'Fecha por anunciar';
  return `<article class="tarjeta-exc${grande ? ' tarjeta-exc--activa' : ''}">
    <a class="tarjeta-exc__enlace" href="/excursiones/${e.slug}/">
      <div class="tarjeta-exc__media">${foto(e.foto, { sizes: grande ? '(min-width: 1000px) 60vw, 100vw' : '(min-width: 1100px) 30vw, (min-width: 760px) 46vw, 100vw', pos: grande ? '50% 40%' : null })}</div>
      <div class="tarjeta-exc__txt">
        <span class="tarjeta-exc__fecha">${esc(fecha)}</span>
        <h3 class="tarjeta-exc__nombre">${esc(e.nombre)}</h3>
        <p>${esc(e.resumen)}</p>
        <span class="tarjeta-exc__pie">${precioMin ? `<span>Desde <strong>${rd(precioMin)}</strong></span>` : '<span>Precio por confirmar</span>'}<span class="tarjeta-exc__cta">${activa ? 'Ver la excursión' : 'Ver y avisarme'}${icono('flecha')}</span></span>
      </div>
    </a>
  </article>`;
}

// ── Formularios ──────────────────────────────────────────────────────────────
export function formInicio(nombre, { clase = '', extra = {}, accion = '/gracias/' } = {}) {
  return `<form class="form ${clase}" name="${nombre}" method="POST" action="${accion}" data-netlify="true" netlify-honeypot="bot-field" data-formulario="${nombre}"${attr(extra)}>
    <input type="hidden" name="form-name" value="${nombre}">
    <p class="oculto" aria-hidden="true"><label>No llenes este campo <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>`;
}

let idCampo = 0;
export function campo({
  tipo = 'text',
  nombre,
  etiqueta,
  requerido = false,
  ayuda = '',
  opciones = null,
  autocomplete = null,
  inputmode = null,
  placeholder = null,
  min = null,
  max = null,
  valor = null,
  clase = '',
  filas = 4,
  error = null,
  patron = null,
}) {
  const id = `c-${nombre}-${++idCampo}`;
  const req = requerido ? ' required' : '';
  const ayudaHtml = ayuda ? `<span class="campo__ayuda" id="${id}-a">${ayuda}</span>` : '';
  const desc = ayuda ? ` aria-describedby="${id}-a"` : '';
  const err = error ? ` data-error="${esc(error)}"` : '';
  let control;
  if (tipo === 'select') {
    control = `<select id="${id}" name="${nombre}"${req}${desc}${err}>${opciones
      .map((o) => {
        const [v, t, slug] = Array.isArray(o) ? o : [o, o];
        return `<option value="${esc(v)}"${slug ? ` data-slug="${esc(slug)}"` : ''}${valor === v ? ' selected' : ''}>${esc(t)}</option>`;
      })
      .join('')}</select>`;
  } else if (tipo === 'textarea') {
    control = `<textarea id="${id}" name="${nombre}" rows="${filas}"${req}${desc}${err}${placeholder ? ` placeholder="${esc(placeholder)}"` : ''}></textarea>`;
  } else {
    control = `<input id="${id}" type="${tipo}" name="${nombre}"${attr({
      autocomplete,
      inputmode,
      placeholder,
      min,
      max,
      value: valor,
      pattern: patron,
    })}${req}${desc}${err}>`;
  }
  return `<div class="campo ${clase}">
    <label for="${id}">${esc(etiqueta)}${requerido ? '' : ' <span class="campo__opc">(opcional)</span>'}</label>
    ${control}
    ${ayudaHtml}
    <span class="campo__error" aria-live="polite"></span>
  </div>`;
}

export function opcionesTarjeta({ nombre, leyenda, opciones, requerido = true, clase = '' }) {
  const hayMarcado = opciones.some((o) => o.marcado);
  return `<fieldset class="opciones ${clase}">
    <legend>${esc(leyenda)}</legend>
    <div class="opciones__grid">
      ${opciones
        .map(
          (o, i) => `<label class="opcion">
        <input type="radio" name="${nombre}" value="${esc(o.valor)}"${o.marcado || (!hayMarcado && i === 0) ? ' checked' : ''}${requerido ? ' required' : ''}${o.datos ? attr(o.datos) : ''}>
        <span class="opcion__caja">
          <span class="opcion__t">${esc(o.titulo)}</span>
          ${o.detalle ? `<span class="opcion__d">${o.detalle}</span>` : ''}
        </span>
      </label>`
        )
        .join('')}
    </div>
    <span class="campo__error" aria-live="polite"></span>
  </fieldset>`;
}

export function contador({ nombre, etiqueta, min = 0, max = 20, valor = 0, ayuda = '' }) {
  const id = `n-${nombre}-${++idCampo}`;
  return `<div class="contador" data-contador>
    <label for="${id}">${esc(etiqueta)}${ayuda ? `<span class="campo__ayuda">${esc(ayuda)}</span>` : ''}</label>
    <div class="contador__ctrl">
      <button type="button" class="contador__btn" data-menos aria-label="Quitar uno">${icono('menos')}</button>
      <input id="${id}" type="number" name="${nombre}" value="${valor}" min="${min}" max="${max}" inputmode="numeric">
      <button type="button" class="contador__btn" data-mas aria-label="Agregar uno">${icono('mas')}</button>
    </div>
  </div>`;
}

// Panel que reemplaza al formulario cuando se envía
export function panelEnviado({ titulo = 'Recibimos tu solicitud', texto = 'Te escribimos por WhatsApp en horario de oficina. Si quieres adelantar, envíanos el mensaje ya armado:', conCodigo = false, extra = '' } = {}) {
  return `<div class="enviado" data-enviado hidden tabindex="-1">
    <div class="enviado__ico">${icono('check')}</div>
    <h3 class="enviado__t">${esc(titulo)}</h3>
    ${conCodigo ? `<p class="enviado__codigo">Tu código de reserva<strong data-codigo>ESC-0000</strong></p>` : ''}
    <p data-enviado-texto>${esc(texto)}</p>
    <a class="btn btn--arena" data-enviado-wa href="${wa()}" target="_blank" rel="noopener">${icono('whatsapp')}<span>Enviar por WhatsApp</span></a>
    ${extra}
  </div>
  <div class="fallo" data-fallo hidden tabindex="-1">
    <h3 class="fallo__t">No se pudo enviar el formulario</h3>
    <p>Puede ser la conexión. Tus datos ya están escritos en un mensaje de WhatsApp: tócalo y envíalo, y te respondemos por ahí.</p>
    <a class="btn btn--arena" data-fallo-wa href="${wa()}" target="_blank" rel="noopener">${icono('whatsapp')}<span>Enviar por WhatsApp</span></a>
  </div>`;
}

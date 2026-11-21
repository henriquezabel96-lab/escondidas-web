// Paquetes y cruceros
import { sitio, paquetes, cruceros } from '../contenido/datos.mjs';
import { pagina, migas } from './base.mjs';
import { esc, icono, foto, boton, botonWa, ph, usd, rd, hay, visible, fechaLarga, BORRADOR } from './ui.mjs';
import { cabeza, cierre, credito, pasos, formInicio, campo, contador, opcionesTarjeta, panelEnviado } from './componentes.mjs';

const CAMPOS_CONTACTO = () => `<div class="fila-campos">
  ${campo({ nombre: 'nombre', etiqueta: 'Tu nombre', requerido: true, autocomplete: 'name', error: 'Escribe tu nombre.' })}
  ${campo({ tipo: 'tel', nombre: 'whatsapp', etiqueta: 'Tu WhatsApp', requerido: true, autocomplete: 'tel', inputmode: 'tel', placeholder: '809 000 0000', patron: '[0-9 ()+\\-]{10,}', error: 'Escribe un número de 10 dígitos, por ejemplo 809 555 1234.' })}
</div>`;

// ── Paquetes ─────────────────────────────────────────────────────────────────
function formPaquete() {
  return `${formInicio('cotizacion-paquete', { clase: 'tarjeta-form', extra: { id: 'cotizar', 'data-wa': 'paquete' } })}
    <h2 class="tarjeta-form__t">Cuéntanos tu viaje</h2>
    <p class="form__nota">Con esto te armamos opciones y te mandamos el precio final por WhatsApp.</p>
    ${campo({ nombre: 'destino', etiqueta: '¿A dónde quieres ir?', requerido: true, placeholder: 'Ej.: Medellín, Cancún, Madrid…', error: 'Dinos el destino, aunque sea aproximado.' })}
    <div class="fila-campos">
      ${campo({ nombre: 'fechas', etiqueta: '¿Cuándo?', requerido: true, placeholder: 'Ej.: segunda semana de abril', error: 'Dinos las fechas o el mes.' })}
      ${campo({ tipo: 'select', nombre: 'noches', etiqueta: '¿Cuántas noches?', opciones: ['3 a 4 noches', '5 a 7 noches', 'Más de 7 noches', 'Todavía no sé'] })}
    </div>
    <div>
      ${contador({ nombre: 'adultos', etiqueta: 'Adultos', min: 1, max: 30, valor: 2 })}
      ${contador({ nombre: 'ninos', etiqueta: 'Niños', min: 0, max: 10, valor: 0 })}
    </div>
    <fieldset class="opciones">
      <legend>¿Qué quieres que incluya?</legend>
      <div class="opciones__grid">
        ${['Vuelo', 'Hotel', 'Traslados', 'Tours', 'Seguro de viaje']
          .map((x) => `<label class="opcion"><input type="checkbox" name="incluye" value="${x}"${['Vuelo', 'Hotel', 'Traslados'].includes(x) ? ' checked' : ''}><span class="opcion__caja"><span class="opcion__t">${x}</span></span></label>`)
          .join('')}
      </div>
    </fieldset>
    ${campo({ tipo: 'select', nombre: 'presupuesto', etiqueta: 'Presupuesto aproximado por persona', opciones: ['Menos de US$800', 'US$800 a US$1,500', 'US$1,500 a US$2,500', 'Más de US$2,500', 'Prefiero no decir'] })}
    ${CAMPOS_CONTACTO()}
    ${campo({ tipo: 'textarea', nombre: 'comentario', etiqueta: 'Algo más', filas: 3, placeholder: 'Ej.: viajamos para un cumpleaños, necesitamos visa…' })}
    <button class="btn btn--pizarra" type="submit">${icono('whatsapp')}<span>Pedir mi paquete</span></button>
    ${panelEnviado({ titulo: 'Recibimos tu solicitud', texto: 'Te escribimos con opciones y precios. Si quieres adelantar, envíanos el mensaje ya armado:' })}
  </form>`;
}

export function paginaPaquetes() {
  const m = migas([{ texto: 'Inicio', href: '/' }, { texto: 'Paquetes', href: '/paquetes/' }]);
  const lista = paquetes.filter(visible);
  const cuerpo = `
<section class="cabecera-pag tema-claro">
  <div class="cont">
    ${m.html}
    <h1 class="t-titulo">Paquetes con vuelo, hotel y traslados</h1>
    <p class="t-lead">Te armamos el viaje completo, dentro o fuera del país, con un solo precio y en cuotas. Tú solo llegas al aeropuerto.</p>
    <div class="acciones">${boton('Cotizar mi paquete', '#cotizar', { estilo: 'pizarra' })}${botonWa('Escribir por WhatsApp', 'Hola, quiero cotizar un paquete de viaje.', { estilo: 'borde' })}</div>
  </div>
</section>

${
  lista.length
    ? `<section class="seccion seccion--arriba-0 tema-claro" aria-labelledby="paq-t">
  <div class="cont">
    <h2 class="sr" id="paq-t">Paquetes</h2>
    <div class="paquetes">${lista
      .map(
        (p) => `<article class="paquete">
        <div class="paquete__media${p.foto ? '' : ' paquete__media--tipo'}">${p.foto ? foto(p.foto, { sizes: '(min-width: 860px) 30vw, 92vw' }) : `<span>${esc(p.nombre)}</span>`}</div>
        <div class="paquete__txt">
          <span class="paquete__pais">${esc(p.pais)}${p.pendiente && BORRADOR ? ' · ejemplo' : ''}</span>
          <h3>${esc(p.nombre)}</h3>
          <p>${esc(p.texto)}</p>
          <p>${hay(p.noches) ? `${p.noches} noches` : ph(null, 'Noches')} · ${hay(p.desde) ? `Desde <strong>${usd(p.desde)}</strong>` : ph(null, 'Precio desde')}</p>
          <a class="enlace" href="${`https://wa.me/${sitio.whatsapp[0].numero}?text=${encodeURIComponent(`Hola, quiero información del paquete ${p.nombre} (${p.pais}).`)}`}" target="_blank" rel="noopener">Pedir información</a>
        </div>
      </article>`
      )
      .join('')}</div>
  </div>
</section>`
    : ''
}

<section class="seccion tema-bruma" aria-labelledby="como-t">
  <div class="cont">
    ${cabeza({ titulo: 'Cómo armamos tu paquete', id: 'como-t' })}
    ${pasos({
      conEnlace: false,
      items: [
        ['Nos dices a dónde y cuándo', 'Destino, fechas aproximadas, cuántos van y qué quieres que incluya.'],
        ['Te mandamos opciones', 'Vuelo, hotel y traslados con el precio final, por WhatsApp y por escrito.'],
        ['Separas y pagas en cuotas', 'Con un depósito queda reservado. El resto lo completas antes del viaje.'],
      ],
    })}
  </div>
</section>

<section class="seccion tema-claro" aria-labelledby="form-t">
  <div class="cont avisame">
    ${cabeza({ titulo: 'Pide tu paquete', id: 'form-t', texto: 'Mientras más detalles nos des, más exacta sale la cotización. Si necesitas visa o pasaporte, también te orientamos.' })}
    ${formPaquete()}
  </div>
</section>
${cierre()}`;
  return pagina({
    ruta: '/paquetes/',
    titulo: 'Paquetes de viaje con vuelo y hotel',
    descripcion: 'Paquetes con vuelo, hotel y traslados dentro y fuera de República Dominicana. Cotiza gratis y paga en cuotas con Escondidas Multiservices.',
    cuerpo,
    og: '/img/og/paquetes.jpg',
    jsonld: [m.ld],
  });
}

// ── Cruceros ─────────────────────────────────────────────────────────────────
function formCrucero({ grupo = null } = {}) {
  const nombre = grupo ? 'crucero-grupo' : 'cotizacion-crucero';
  return `${formInicio(nombre, { clase: 'tarjeta-form', extra: { id: grupo ? 'unirme' : 'cotizar', 'data-wa': grupo ? 'crucero-grupo' : 'crucero' } })}
    <h2 class="tarjeta-form__t">${grupo ? 'Únete al grupo' : 'Cotiza otro crucero'}</h2>
    <p class="form__nota">${grupo ? 'Te escribimos con la fecha, el precio final y cómo separar tu cabina.' : 'Dinos qué buscas y te mandamos opciones de navieras y fechas.'}</p>
    ${grupo ? `<input type="hidden" name="crucero" value="${esc(grupo.nombre)} · ${esc(grupo.barco)}">` : `<div class="fila-campos">${campo({ nombre: 'mes', etiqueta: '¿En qué mes?', requerido: true, placeholder: 'Ej.: julio', error: 'Dinos el mes aproximado.' })}${campo({ tipo: 'select', nombre: 'noches', etiqueta: '¿Cuántas noches?', opciones: ['3 a 4 noches', '5 a 7 noches', 'Más de 7 noches', 'Todavía no sé'] })}</div>`}
    ${opcionesTarjeta({
      nombre: 'cabina',
      leyenda: '¿Qué cabina prefieres?',
      opciones: [
        { valor: 'Interior', titulo: 'Interior', detalle: 'La más económica' },
        { valor: 'Exterior', titulo: 'Exterior', detalle: 'Con ventana' },
        { valor: 'Balcón', titulo: 'Balcón', detalle: 'Tu propio balcón' },
      ],
    })}
    <div>${contador({ nombre: 'personas', etiqueta: '¿Cuántos van?', min: 1, max: 20, valor: 2 })}</div>
    ${campo({ tipo: 'select', nombre: 'visa', etiqueta: '¿Tienen visa vigente?', opciones: ['Sí, de EE. UU.', 'Sí, Schengen', 'Tenemos las dos', 'No tenemos visa', 'No estoy seguro'] })}
    ${CAMPOS_CONTACTO()}
    <button class="btn btn--pizarra" type="submit">${icono('whatsapp')}<span>${grupo ? 'Quiero unirme' : 'Pedir opciones'}</span></button>
    ${panelEnviado({ titulo: 'Recibimos tu solicitud', texto: 'Te escribimos por WhatsApp. Si quieres adelantar, envíanos el mensaje ya armado:' })}
  </form>`;
}

export function paginaCruceros() {
  const m = migas([{ texto: 'Inicio', href: '/' }, { texto: 'Cruceros', href: '/cruceros/' }]);
  const c = cruceros[0];
  const cuerpo = `
<section class="cabecera-pag tema-claro">
  <div class="cont">
    ${m.html}
    <h1 class="t-titulo">Cruceros en grupo y a tu medida</h1>
    <p class="t-lead">Viaja con el grupo de Escondidas o dinos tu fecha y te buscamos el crucero ideal. Todos se pagan en cuotas.</p>
  </div>
</section>

<section class="seccion seccion--arriba-0 tema-claro" aria-labelledby="grupo-t">
  <div class="cont">
    <article class="tarjeta-exc tarjeta-exc--activa">
      <a class="tarjeta-exc__enlace" href="/cruceros/${c.slug}/">
        <div class="tarjeta-exc__media">${foto(c.foto, { sizes: '(min-width: 1000px) 60vw, 100vw', pos: '65% 50%' })}</div>
        <div class="tarjeta-exc__txt">
          <span class="tarjeta-exc__fecha">Crucero en grupo${c.fecha ? `, ${esc(fechaLarga(c.fecha))}` : ', fecha por confirmar'}</span>
          <h2 class="tarjeta-exc__nombre" id="grupo-t">${esc(c.nombre)}</h2>
          <p>${esc(c.resumen)}</p>
          <span class="tarjeta-exc__pie"><span>${esc(c.barco)}</span><span class="tarjeta-exc__cta">Ver el crucero${icono('flecha')}</span></span>
        </div>
      </a>
    </article>
    ${credito(c.foto)}
  </div>
</section>

<section class="seccion tema-bruma" aria-labelledby="otro-t">
  <div class="cont avisame">
    ${cabeza({ titulo: '¿Buscas otra fecha?', id: 'otro-t', texto: 'Trabajamos con distintas navieras y salidas. Te ayudamos con la visa, el pasaporte y los traslados al puerto.' })}
    ${formCrucero()}
  </div>
</section>
${cierre()}`;
  return pagina({
    ruta: '/cruceros/',
    titulo: 'Cruceros en grupo',
    descripcion: 'Cruceros en grupo con Escondidas, como el de Año Nuevo en el Costa Pacifica, y cotizaciones de cruceros a tu medida. Paga en cuotas.',
    cuerpo,
    og: '/img/og/cruceros.jpg',
    jsonld: [m.ld],
  });
}

export function detalleCrucero(c) {
  const m = migas([
    { texto: 'Inicio', href: '/' },
    { texto: 'Cruceros', href: '/cruceros/' },
    { texto: c.nombre, href: `/cruceros/${c.slug}/` },
  ]);
  const requisitos = c.requisitos.filter((x) => hay(x) || BORRADOR);
  const dias = c.itinerario.filter((d) => hay(d.titulo) || BORRADOR);
  const chip = (ico, valor, pend) => (hay(valor) || BORRADOR ? `<span class="chip">${icono(ico)}${hay(valor) ? esc(valor) : ph(null, pend)}</span>` : '');
  const incluye = c.incluye.filter((x) => hay(x) || BORRADOR);
  const cuerpo = `
<section class="banda banda--hero" aria-labelledby="cru-t">
  ${foto(c.foto, { sizes: '100vw', prioridad: true, pos: '70% 50%' })}
  <div class="cont">
    <div class="banda__txt">
      ${m.html}
      <h1 class="t-titulo" id="cru-t">${esc(c.nombre)}</h1>
      <p class="t-lead">${esc(c.resumen)}</p>
      <div class="chips">
        ${chip('calendario', c.fecha && fechaLarga(c.fecha), 'Fecha por confirmar')}
        <span class="chip">${icono('barco')}${esc(c.barco)}</span>
        ${chip('reloj', hay(c.noches) ? `${c.noches} noches` : null, 'Noches')}
        ${chip('pin', hay(c.puertoSalida) ? `Sale de ${c.puertoSalida}` : null, 'Puerto de salida')}
      </div>
      <div class="acciones">${boton('Unirme al grupo', '#unirme', { estilo: 'arena' })}${botonWa('Preguntar por WhatsApp', `Hola, quiero información del ${c.nombre} en el ${c.barco}.`, { estilo: 'borde' })}</div>
    </div>
  </div>
  ${credito(c.foto)}
</section>

<section class="seccion tema-claro" aria-labelledby="iti-t">
  <div class="cont dos-col">
    ${cabeza({ titulo: 'Día por día', id: 'iti-t', texto: 'Itinerario del grupo. Te confirmamos los puertos y horarios exactos al separar.' })}
    <ol class="itinerario">${dias
      .map((d) => `<li><span class="itinerario__hora">${esc(d.dia)}</span><span class="itinerario__t">${hay(d.titulo) ? esc(d.titulo) : ph(null, d.pendiente)}</span></li>`)
      .join('')}</ol>
  </div>
</section>

<section class="seccion tema-oscuro" aria-labelledby="cab-t">
  <div class="cont">
    ${cabeza({ titulo: 'Elige tu cabina', id: 'cab-t', texto: `Precio por persona en cabina doble. Separa con ${hay(c.deposito) ? usd(c.deposito) : 'un depósito'} y paga en cuotas.` })}
    <div class="cabinas">${c.cabinas
      .map(
        (k) => `<div class="boleto">
        <div class="boleto__cuerpo"><span class="boleto__label">Cabina</span><span class="boleto__ciudad">${esc(k.nombre)}</span><span class="boleto__nota">${esc(k.texto)}</span><span class="boleto__precio" data-dato="cruceros:${c.slug}:${k.nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}_usd" data-formato="usd">${hay(k.precio) ? usd(k.precio) : BORRADOR ? ph(null, 'US$ por persona') : 'Consultar'}</span></div>
        <div class="boleto__talon"><a class="boleto__btn" href="#unirme" data-cabina="${esc(k.nombre)}">Quiero ${k.nombre.toLowerCase() === 'balcón' ? 'balcón' : 'cabina ' + k.nombre.toLowerCase()}</a></div>
      </div>`
      )
      .join('')}</div>
  </div>
</section>

<section class="seccion tema-bruma">
  <div class="cont dos-col">
    <div>
      <h2 class="t-sub" style="margin-bottom:1rem">Requisitos</h2>
      <ul class="lista-check">${requisitos.map((x) => `<li>${icono('check')}<span>${hay(x) ? esc(x) : ph(null, 'Otro requisito')}</span></li>`).join('')}</ul>
      <p class="credito" style="margin-top:1rem">Si no tienes visa, escríbenos: te orientamos con el proceso.</p>
    </div>
    ${
      incluye.length
        ? `<div>
      <h2 class="t-sub" style="margin-bottom:1rem">Qué incluye</h2>
      <ul class="lista-check">${incluye
        .map((x, i) => `<li>${icono('check')}<span>${hay(x) ? esc(x) : ph(null, ['Comidas a bordo', 'Entretenimiento y shows', 'Propinas e impuestos (si aplica)'][i] || 'Otro beneficio')}</span></li>`)
        .join('')}</ul>
    </div>`
        : ''
    }
  </div>
</section>

<section class="seccion tema-claro" aria-labelledby="unirme-t">
  <div class="cont avisame">
    ${cabeza({ titulo: '¿Te unes al grupo?', id: 'unirme-t', texto: 'Déjanos tus datos y te escribimos con la fecha, el precio final y cómo separar tu cabina.' })}
    ${formCrucero({ grupo: c })}
  </div>
</section>
${cierre()}`;
  return pagina({
    ruta: `/cruceros/${c.slug}/`,
    titulo: `${c.nombre} en el ${c.barco}`,
    descripcion: `${c.resumen} Únete al grupo de Escondidas y paga en cuotas.`,
    cuerpo,
    og: '/img/og/cruceros.jpg',
    jsonld: [m.ld],
  });
}

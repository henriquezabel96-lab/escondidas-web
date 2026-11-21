// Excursiones: listado y página de cada excursión activa
import { sitio, excursiones } from '../contenido/datos.mjs';
import { pagina, migas } from './base.mjs';
import { esc, icono, foto, fotoUrl, boton, botonWa, wa, ph, rd, fechaLarga, visible, hay, BORRADOR } from './ui.mjs';
import {
  cabeza, boletos, cuenta, pasos, faq, cierre, credito, tarjetaExcursion, formInicio, campo, opcionesTarjeta, contador, panelEnviado,
} from './componentes.mjs';

// Formulario "Avísame de la próxima salida"
export function formAvisame({ destino = '' } = {}) {
  const proximas = excursiones.filter((e) => e.estado !== 'activa' && visible(e));
  return `${formInicio('avisame', { clase: 'tarjeta-form', extra: { 'data-wa': 'avisame' } })}
    <h3 class="tarjeta-form__t">Avísame cuando haya fecha</h3>
    <p class="form__nota">Te escribimos por WhatsApp apenas abramos cupos. Nada de cadenas ni mensajes a cada rato.</p>
    <div class="fila-campos">
      ${campo({ nombre: 'nombre', etiqueta: 'Tu nombre', requerido: true, autocomplete: 'name', error: 'Escribe tu nombre.' })}
      ${campo({ tipo: 'tel', nombre: 'whatsapp', etiqueta: 'Tu WhatsApp', requerido: true, autocomplete: 'tel', inputmode: 'tel', placeholder: '809 000 0000', patron: '[0-9 ()+\\-]{10,}', error: 'Escribe un número de 10 dígitos, por ejemplo 809 555 1234.' })}
    </div>
    <div class="fila-campos">
      ${campo({
        tipo: 'select',
        nombre: 'destino',
        etiqueta: '¿Qué viaje te interesa?',
        opciones: [...proximas.map((e) => [e.nombre, e.nombre, e.slug]), ['Cualquier excursión', 'Cualquier excursión']],
        valor: excursiones.find((e) => e.slug === destino)?.nombre,
      })}
      ${campo({ tipo: 'select', nombre: 'salida', etiqueta: '¿Desde dónde saldrías?', opciones: ['Santiago', 'Puerto Plata', 'Otro lugar'] })}
    </div>
    <button class="btn btn--pizarra" type="submit">${icono('whatsapp')}<span>Avisarme</span></button>
    ${panelEnviado({ titulo: 'Listo, te avisamos', texto: 'Apenas tengamos fecha te escribimos. Si quieres, envíanos ya el mensaje para tenerte en la lista:' })}
  </form>`;
}

export function listado() {
  const m = migas([{ texto: 'Inicio', href: '/' }, { texto: 'Excursiones', href: '/excursiones/' }]);
  const lista = excursiones.filter(visible);
  const cuerpo = `
<section class="cabecera-pag tema-claro">
  <div class="cont">
    ${m.html}
    <h1 class="t-titulo">Excursiones en grupo desde Santiago y Puerto Plata</h1>
    <p class="t-lead">Un día completo con transporte, comida y actividades. Separas con RD$1,000 por persona y pagas el resto en partes.</p>
  </div>
</section>

<section class="seccion seccion--arriba-0 tema-claro" aria-labelledby="lista-t">
  <div class="cont">
    <h2 class="sr" id="lista-t">Próximas excursiones</h2>
    <div class="lista-exc">${lista.map((e) => tarjetaExcursion(e)).join('')}</div>
  </div>
</section>

<section class="seccion tema-bruma" id="avisame" aria-labelledby="avisame-t">
  <div class="cont avisame">
    ${cabeza({
      titulo: '¿No encuentras fecha? Te avisamos',
      id: 'avisame-t',
      texto: 'Organizamos salidas nuevas cada mes. Déjanos tu WhatsApp y el viaje que te interesa, y te escribimos cuando abramos cupos.',
    })}
    ${formAvisame()}
  </div>
</section>

<section class="seccion tema-claro" aria-labelledby="pasos-t">
  <div class="cont">
    ${cabeza({ titulo: 'Cómo reservar una excursión', id: 'pasos-t' })}
    ${pasos()}
  </div>
</section>

${cierre()}`;
  return pagina({
    ruta: '/excursiones/',
    titulo: 'Excursiones en grupo desde Santiago',
    descripcion: 'Excursiones de un día en grupo desde Santiago y Puerto Plata: transporte, comida y actividades incluidas. Separa con RD$1,000 y paga en partes.',
    cuerpo,
    og: '/img/og/macao.jpg',
    jsonld: [m.ld],
  });
}

// Página de una excursión activa (Macao)
export function detalle(e) {
  const m = migas([
    { texto: 'Inicio', href: '/' },
    { texto: 'Excursiones', href: '/excursiones/' },
    { texto: e.nombreCorto || e.nombre, href: `/excursiones/${e.slug}/` },
  ]);
  const preguntas = faq(e.faq, { id: 'preguntas-exc' });
  const precioMin = Math.min(...e.salidas.map((s) => s.precio));
  const s0 = e.salidas[0];
  const personas = 2;
  const pagos = 2;
  const total = s0.precio * personas;
  const dep = e.deposito * personas;
  const cuota = Math.ceil((total - dep) / pagos);
  const msgWa = `Hola, quiero información de la excursión ${e.nombre} del ${fechaLarga(e.fecha)}.`;

  const lugares = e.lugares
    .map(
      (l) => `<article class="lugar">
      <div class="lugar__media${l.foto ? '' : ' lugar__media--tipo'}">${
        l.foto ? `${foto(l.foto, { sizes: '(min-width: 1100px) 19vw, 78vw' })}${credito(l.foto)}` : icono(l.nombre.includes('Cueva') ? 'cueva' : 'casa')
      }</div>
      <h3>${esc(l.nombre)}</h3>
      <p>${esc(l.texto)}</p>
    </article>`
    )
    .join('');

  const eventoLD = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `Excursión ${e.nombre}`,
    description: e.resumen,
    startDate: e.fecha,
    endDate: e.fecha,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    image: [sitio.url + fotoUrl(e.foto, 1200)],
    location: {
      '@type': 'Place',
      name: 'Playa Macao y Basílica de Higüey',
      address: { '@type': 'PostalAddress', addressLocality: 'Higüey', addressRegion: 'La Altagracia', addressCountry: 'DO' },
    },
    offers: e.salidas.map((s) => ({
      '@type': 'Offer',
      name: `Salida desde ${s.ciudad}`,
      price: String(s.precio),
      priceCurrency: 'DOP',
      availability: 'https://schema.org/InStock',
      url: `${sitio.url}/excursiones/${e.slug}/`,
    })),
    organizer: { '@type': 'TravelAgency', name: sitio.nombre, url: sitio.url },
  };

  const pe = e.puntoEncuentro || {};
  const horas = e.horaSalida || {};
  const salidaTxt = [
    hay(horas['puerto-plata']) ? `Puerto Plata a las ${horas['puerto-plata']}` : null,
    hay(horas.santiago) ? `Santiago a las ${horas.santiago}` : null,
  ].filter(Boolean);
  const politicas = [
    ['Hora de salida', salidaTxt.length ? `En la madrugada del ${fechaLarga(e.fecha, { anio: false })}: ${salidaTxt.join(' y ')}`.replace(/\.?$/, '.') : null, 'Hora de salida en Santiago y Puerto Plata'],
    ['Punto de encuentro', hay(pe.santiago) && hay(pe['puerto-plata']) ? `Santiago: ${pe.santiago}. Puerto Plata: ${pe['puerto-plata']}.` : null, 'Lugar exacto de salida en Santiago y en Puerto Plata'],
    ['Buggies', e.requisitoBuggy, 'Requisitos para manejar el buggy'],
    ['Niños', e.notaNinos || sitio.politicas.menores, 'Edad mínima y precio de niños'],
    ['Si no puedes ir', e.politicaCambios || (sitio.politicas.deposito && sitio.politicas.cambios ? `${sitio.politicas.deposito} ${sitio.politicas.cambios}` : null), 'Cambios de nombre y devolución del depósito'],
    ['Si llueve', sitio.politicas.clima, 'Qué pasa si hay mal tiempo'],
  ].filter(([, v]) => hay(v) || BORRADOR);

  const cuerpo = `
<section class="tema-claro">
  <div class="cont exc-hero">
    <div class="exc-hero__txt">
      ${m.html}
      <div class="chips"><span class="chip chip--lleno">${icono('calendario')}${esc(fechaLarga(e.fecha))}</span><span class="chip">${cuenta(e.fecha, { hora: e.horaCuenta })}</span><span class="chip" data-dato="salidas:${e.slug}:cupos" data-formato="estado">${hay(e.cupos) ? `Quedan ${e.cupos} cupos` : 'Cupos disponibles'}</span></div>
      <h1 class="t-titulo">${esc(e.nombre)}</h1>
      <p class="t-lead">${esc(e.resumen)}</p>
      ${boletos(e)}
      <div class="exc-hero__util">
        <a href="/excursiones/${e.slug}/${e.slug}.ics" download>${icono('cal-mas')}Guardar la fecha</a>
        <button type="button" data-compartir data-titulo="${esc(e.nombre)}" data-texto="${esc(`Vamos a ${e.nombre} el ${fechaLarga(e.fecha, { anio: false })}`)}">${icono('compartir')}<span>Compartir con tu coro</span></button>
        <a href="${wa(msgWa)}" target="_blank" rel="noopener">${icono('whatsapp')}Preguntar por WhatsApp</a>
      </div>
    </div>
    <div class="exc-hero__media">${foto(e.foto, { sizes: '(min-width: 1000px) 44vw, 92vw', prioridad: true, pos: '50% 40%' })}</div>
  </div>
</section>

<section class="seccion tema-oscuro" aria-labelledby="incluye-t" data-observar-barra>
  <div class="cont">
    ${cabeza({ titulo: 'Todo esto va incluido', id: 'incluye-t', texto: `Pagas ${rd(precioMin)} desde Santiago y no tienes que preocuparte por nada más que la ropa de cambio.` })}
    <ul class="incluye">${e.incluye.map((x) => `<li>${icono(x.icono)}<span>${esc(x.texto)}</span></li>`).join('')}</ul>
  </div>
</section>

<section class="seccion tema-claro" aria-labelledby="lugares-t">
  <div class="cont">
    ${cabeza({ titulo: 'Un día, cinco lugares', id: 'lugares-t', texto: 'De la Basílica a la arena de Macao, con parada en la cueva y en la casa típica.' })}
    <div class="lugares" tabindex="0" role="region" aria-label="Lugares que visitas, desliza para ver más">${lugares}</div>
  </div>
</section>

<section class="seccion tema-bruma" aria-labelledby="dia-t">
  <div class="cont dos-col">
    <div>
      ${cabeza({ titulo: 'Así va el día', id: 'dia-t', texto: 'Horario aproximado. Antes de salir te confirmamos la hora exacta por WhatsApp.' })}
      <ol class="itinerario${e.itinerario.some((p) => hay(p.hora)) || BORRADOR ? '' : ' itinerario--sin-hora'}">${e.itinerario
        .map((p) => `<li>${e.itinerario.some((x) => hay(x.hora)) || BORRADOR ? `<span class="itinerario__hora">${hay(p.hora) ? esc(p.hora) : BORRADOR ? ph(null, 'Hora') : '—'}</span>` : ''}<span class="itinerario__t">${esc(p.titulo)}</span></li>`)
        .join('')}</ol>
    </div>
    <div>
      <h2 class="t-sub" style="margin-bottom:1rem">Qué llevar</h2>
      <ul class="llevar">${e.llevar.map((x) => `<li>${icono('check')}<span>${esc(x)}</span></li>`).join('')}</ul>
      ${
        politicas.length
          ? `<h2 class="t-sub" style="margin:2.5rem 0 1rem">Bueno saber</h2>
      <div class="bueno-saber">${politicas.map(([t, v, p]) => `<div><h3>${esc(t)}</h3><p>${hay(v) ? esc(v) : ph(null, p)}</p></div>`).join('')}</div>`
          : ''
      }
    </div>
  </div>
</section>

<section class="seccion tema-oscuro" aria-labelledby="plan-t" id="plan">
  <div class="cont">
    ${cabeza({ titulo: 'Arma tu plan de pagos', id: 'plan-t', texto: `Separas con ${rd(e.deposito)} por persona y el resto lo divides como te quede cómodo, siempre antes del ${fechaLarga(e.fechaLimitePago || e.fecha, { anio: false })}.` })}
    <div class="calc" data-calc="${e.slug}" data-deposito="${e.deposito}">
      <div class="calc__ctrl">
        ${opcionesTarjeta({ nombre: 'calc-salida', leyenda: '¿Desde dónde sales?', opciones: e.salidas.map((s) => ({ valor: s.id, titulo: s.ciudad, detalle: `${rd(s.precio)} por persona`, datos: { 'data-precio': s.precio } })) })}
        ${contador({ nombre: 'calc-personas', etiqueta: '¿Cuántos van?', min: 1, max: 40, valor: personas, ayuda: hay(e.precioNino) ? '' : 'Adultos. Esta excursión no se recomienda para niños.' })}
        ${opcionesTarjeta({
          nombre: 'calc-pagos',
          leyenda: 'Después del depósito, ¿en cuántos pagos completas?',
          opciones: [1, 2, 3, 4].map((n) => ({ valor: n, titulo: n === 1 ? '1 pago' : `${n} pagos`, marcado: n === pagos })),
        })}
      </div>
      <div class="calc__res" aria-live="polite">
        <div class="calc__fila"><span>Total del viaje</span><strong data-calc-total>${rd(total)}</strong></div>
        <div class="calc__fila"><span>Para separar hoy</span><strong data-calc-deposito>${rd(dep)}</strong></div>
        <div><span class="calc__nota" data-calc-cuota-label>Luego, ${pagos} pagos de</span><div class="calc__grande" data-calc-cuota>${rd(cuota)}</div></div>
        <p class="calc__nota">${hay(e.fechaLimitePago) ? `Fecha límite para completar el pago: ${esc(fechaLarga(e.fechaLimitePago))}.` : `Todo pagado antes del ${esc(fechaLarga(e.fecha))}.`}</p>
        <a class="btn btn--arena btn--ancho" data-calc-reservar href="/reservar/?excursion=${e.slug}&amp;salida=${s0.id}&amp;adultos=${personas}&amp;pagos=${pagos}">Reservar con este plan</a>
      </div>
    </div>
  </div>
</section>

<section class="seccion tema-claro" aria-labelledby="real-t">
  <div class="cont">
    ${cabeza({ titulo: 'Así se vive con Escondidas', id: 'real-t', texto: 'Fotos de viajeros de nuestras salidas en buggy. Lleva ropa que se pueda ensuciar.' })}
    <div class="tira" tabindex="0" role="region" aria-label="Fotos de viajeros, desliza para ver más">${e.galeria.slice(0, 5).map((s) => `<figure>${foto(s, { sizes: '(min-width: 1000px) 18vw, 64vw' })}</figure>`).join('')}</div>
  </div>
</section>

<section class="seccion tema-bruma" aria-labelledby="faq-t">
  <div class="cont dos-col">
    ${cabeza({ titulo: 'Preguntas sobre esta excursión', id: 'faq-t', texto: '¿Te quedó alguna duda? Escríbenos y te respondemos.', extra: `<div>${botonWa('Preguntar por WhatsApp', msgWa, { estilo: 'pizarra' })}</div>` })}
    ${preguntas.html}
  </div>
</section>

${cierre({ titulo: '¿Te vas con tu coro?', texto: `Quedan pocas semanas para el ${fechaLarga(e.fecha, { anio: false })}. Separa hoy con ${rd(e.deposito)} por persona.`, accion: boton('Separar mi cupo', `/reservar/?excursion=${e.slug}`, { estilo: 'arena', clase: 'btn--grande' }) })}

<aside aria-label="Reserva rápida"><div class="barra-reserva" data-barra-reserva>
  <div class="barra-reserva__precio"><span>Desde ${esc(e.salidas.map((s) => s.ciudad).join(' o '))}</span><strong>${rd(precioMin)}</strong></div>
  <div class="barra-reserva__acc">
    <a class="barra-reserva__wa" href="${wa(msgWa)}" target="_blank" rel="noopener" aria-label="Preguntar por WhatsApp">${icono('whatsapp')}</a>
    <a class="btn btn--arena" href="/reservar/?excursion=${e.slug}">Separar mi cupo</a>
  </div>
</div></aside>`;

  return pagina({
    ruta: `/excursiones/${e.slug}/`,
    titulo: `Excursión ${e.nombre} · ${fechaLarga(e.fecha, { anio: false })}`,
    descripcion: `${e.resumen} Desde ${rd(precioMin)}. Separa con ${rd(e.deposito)}.`,
    cuerpo,
    clase: 'pag-excursion con-barra',
    og: `/img/og/${e.slug}.jpg`,
    flotante: false,
    jsonld: [m.ld, eventoLD, preguntas.ld],
  });
}

// Archivo de calendario (.ics) para "Guardar la fecha"
export function ics(e) {
  const d = e.fecha.replace(/-/g, '');
  const [a, mm, dd] = e.fecha.split('-').map(Number);
  const sig = new Date(Date.UTC(a, mm - 1, dd + 1)).toISOString().slice(0, 10).replace(/-/g, '');
  const ahora = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Escondidas Multiservices//Excursiones//ES',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${e.slug}-${d}@escondidasmultiservices.com`,
    `DTSTAMP:${ahora}`,
    `DTSTART;VALUE=DATE:${d}`,
    `DTEND;VALUE=DATE:${sig}`,
    `SUMMARY:Excursión ${e.nombre} (Escondidas)`,
    `DESCRIPTION:Salida desde ${e.salidas.map((s) => s.ciudad).join(' y ')}. Info y reservas: ${sitio.url}/excursiones/${e.slug}/ · WhatsApp 829-817-8000`,
    `URL:${sitio.url}/excursiones/${e.slug}/`,
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ].join('\r\n');
}

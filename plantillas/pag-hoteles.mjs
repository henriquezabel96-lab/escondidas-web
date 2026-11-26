// Hoteles: listado con filtro por zona y ficha de cada resort
import { sitio, hoteles, zonas } from '../contenido/datos.mjs';
import { pagina, migas } from './base.mjs';
import { esc, icono, foto, fotoUrl, botonWa, ph, usd, hay, BORRADOR } from './ui.mjs';
import { cabeza, cierre, credito, tarjetaHotel, formInicio, campo, contador, panelEnviado } from './componentes.mjs';

function beneficios() {
  const items = [
    ['cuotas', 'Paga en cuotas', 'Separa tu habitación con un depósito y completa antes de la fecha de entrada.'],
    ['ticket', 'Precio confirmado por escrito', 'Te mandamos la cotización con fechas, plan y total antes de que pagues nada.'],
    ['whatsapp', 'Te atendemos por WhatsApp', 'Antes, durante y después del viaje, sin llamadas ni filas.'],
  ];
  return `<div class="beneficios">${items
    .map(([i, t, d]) => `<div class="beneficio">${icono(i)}<h3>${t}</h3><p>${d}</p></div>`)
    .join('')}</div>`;
}

export function formHotel({ hotel = '', titulo = 'Cotiza este hotel', id = 'cotizar' } = {}) {
  return `${formInicio('cotizacion-hotel', { clase: 'tarjeta-form', extra: { id, 'data-wa': 'hotel' } })}
    <h2 class="tarjeta-form__t">${esc(titulo)}</h2>
    <p class="form__nota">Te respondemos por WhatsApp con el total. Separas con un depósito y pagas en cuotas.</p>
    ${hotel ? `<input type="hidden" name="hotel" value="${esc(hotel)}">` : campo({ nombre: 'hotel', etiqueta: '¿Qué hotel o zona te interesa?', requerido: true, placeholder: 'Ej.: Bávaro, cualquier todo incluido', error: 'Dinos el hotel o la zona.' })}
    <div class="fila-campos">
      ${campo({ tipo: 'date', nombre: 'entrada', etiqueta: 'Entrada', requerido: true, error: 'Elige la fecha de entrada.' })}
      ${campo({ tipo: 'date', nombre: 'salida', etiqueta: 'Salida', requerido: true, error: 'Elige la fecha de salida.' })}
    </div>
    <div>
      ${contador({ nombre: 'adultos', etiqueta: 'Adultos', min: 1, max: 20, valor: 2 })}
      ${contador({ nombre: 'ninos', etiqueta: 'Niños', min: 0, max: 10, valor: 0 })}
    </div>
    ${campo({ nombre: 'edades_ninos', etiqueta: 'Edades de los niños', ayuda: 'Los precios de niños cambian según la edad.' })}
    <div class="fila-campos">
      ${campo({ nombre: 'nombre', etiqueta: 'Tu nombre', requerido: true, autocomplete: 'name', error: 'Escribe tu nombre.' })}
      ${campo({ tipo: 'tel', nombre: 'whatsapp', etiqueta: 'Tu WhatsApp', requerido: true, autocomplete: 'tel', inputmode: 'tel', placeholder: '809 000 0000', patron: '[0-9 ()+\\-]{10,}', error: 'Escribe un número de 10 dígitos, por ejemplo 809 555 1234.' })}
    </div>
    ${campo({ tipo: 'textarea', nombre: 'comentario', etiqueta: 'Comentarios', filas: 3, placeholder: 'Ej.: es nuestra luna de miel, preferimos habitación con vista al mar.' })}
    <button class="btn btn--pizarra" type="submit">${icono('whatsapp')}<span>Pedir cotización</span></button>
    ${panelEnviado({ titulo: 'Recibimos tu solicitud', texto: 'Te escribimos por WhatsApp con la cotización. Si quieres adelantar, envíanos el mensaje ya armado:' })}
  </form>`;
}

// Oferta del flyer: precios, condiciones y el flyer completo. Se esconde sola al vencer.
function seccionOferta(h) {
  const o = h.oferta;
  if (!o) return '';
  const msg = `Hola, quiero la oferta del ${h.nombre}: ${o.titulo} (${o.resumen}).`;
  const fin = new Date(o.vence + 'T12:00:00').toLocaleDateString('es-DO', { day: 'numeric', month: 'long' });
  return `<section class="seccion seccion--arriba-0 tema-claro" aria-labelledby="oferta-t">
  <div class="cont oferta-hotel" data-vence="${o.vence}">
    <figure class="oferta-hotel__flyer">
      ${foto(o.flyer, { sizes: '(min-width: 900px) 420px, 92vw', prioridad: true })}
      <figcaption><a class="enlace" href="${fotoUrl(o.flyer, 9999)}" target="_blank" rel="noopener">Ver el flyer en grande</a></figcaption>
    </figure>
    <div class="oferta-hotel__txt">
      <h2 class="t-seccion" id="oferta-t">${esc(o.titulo)}</h2>
      <div class="oferta-precios">${o.precios.map(([n, v]) => `<div><span>${esc(n)}</span><strong>${usd(v)}</strong></div>`).join('')}</div>
      ${o.unidad ? `<p class="credito">${esc(o.unidad)}</p>` : ''}
      <ul class="lista-check">${[o.vigencia, ...o.condiciones].filter(Boolean).map((c) => `<li>${icono('check')}<span>${esc(c)}</span></li>`).join('')}</ul>
      <p class="credito">Oferta válida hasta el ${fin} o hasta agotar disponibilidad. Te confirmamos el total por WhatsApp antes de pagar.</p>
      <div class="acciones">${botonWa('Quiero esta oferta', msg, { estilo: 'pizarra' })}<a class="btn btn--borde" href="#cotizar">Cotizar con mis fechas</a></div>
    </div>
  </div>
  <div class="cont" data-vencida hidden><p class="t-lead">Esta oferta ya terminó. Escríbenos y te decimos qué hay disponible para tus fechas.</p><div class="acciones">${botonWa('Preguntar por WhatsApp', `Hola, quiero cotizar el ${h.nombre}.`, { estilo: 'pizarra' })}</div></div>
</section>`;
}

export function listado() {
  const m = migas([{ texto: 'Inicio', href: '/' }, { texto: 'Hoteles', href: '/hoteles/' }]);
  const conteo = (z) => hoteles.filter((h) => h.zona === z).length;
  const zonasVisibles = zonas.filter((z) => conteo(z.id) > 0);
  const cuerpo = `
<section class="cabecera-pag tema-claro">
  <div class="cont">
    ${m.html}
    <h1 class="t-titulo">Resorts todo incluido en las mejores playas del país</h1>
    <p class="t-lead">Elige la zona, compara y cotiza con tus fechas. Separas con un depósito y pagas el resto en cuotas antes de la entrada.</p>
    <div class="acciones">${botonWa('Cotizar por WhatsApp', 'Hola, quiero cotizar un hotel.', { estilo: 'pizarra' })}<a class="btn btn--borde" href="#cotizar">Llenar el formulario</a></div>
  </div>
</section>

<section class="seccion seccion--arriba-0 tema-claro" aria-labelledby="hoteles-t">
  <div class="cont" data-filtro-grupo>
    <h2 class="sr" id="hoteles-t">Hoteles por zona</h2>
    <div class="filtros" role="group" aria-label="Filtrar por zona">
      <button class="filtro" type="button" aria-pressed="true" data-filtro="todas">Todas <small>${hoteles.length}</small></button>
      ${zonasVisibles.map((z) => `<button class="filtro" type="button" aria-pressed="false" data-filtro="${z.id}">${esc(z.nombre)} <small>${conteo(z.id)}</small></button>`).join('')}
    </div>
    <p class="sr" aria-live="polite" data-filtro-estado></p>
    <div class="rejilla">${hoteles.map((h) => tarjetaHotel(h, zonas, { sizes: '(min-width: 1240px) 290px, (min-width: 700px) 45vw, 92vw' })).join('')}</div>
    ${BORRADOR ? `<p style="margin-top:2rem">${ph(null, 'Agregar más hoteles u ofertas con su foto y su precio')}</p>` : ''}
  </div>
</section>

<section class="seccion tema-bruma" aria-labelledby="ben-t">
  <div class="cont">
    ${cabeza({ titulo: 'Reservar con nosotros es fácil', id: 'ben-t' })}
    ${beneficios()}
  </div>
</section>

<section class="seccion tema-claro" aria-labelledby="otro-t">
  <div class="cont avisame">
    ${cabeza({ titulo: '¿No ves tu hotel?', id: 'otro-t', texto: 'Trabajamos con muchos más, dentro y fuera del país. Dinos cuál quieres y te lo cotizamos.' })}
    ${formHotel({ titulo: 'Cotiza cualquier hotel' })}
  </div>
</section>

${cierre()}`;
  return pagina({
    ruta: '/hoteles/',
    titulo: 'Hoteles y resorts todo incluido',
    descripcion: 'Ofertas de resorts todo incluido en Punta Cana, Bávaro y Puerto Plata. Cotiza con tus fechas y paga en cuotas con Escondidas Multiservices.',
    cuerpo,
    og: '/img/og/hoteles.jpg',
    jsonld: [m.ld],
  });
}

export function ficha(h) {
  const zona = zonas.find((z) => z.id === h.zona);
  const m = migas([
    { texto: 'Inicio', href: '/' },
    { texto: 'Hoteles', href: '/hoteles/' },
    { texto: h.nombre, href: `/hoteles/${h.slug}/` },
  ]);
  const otros = hoteles.filter((x) => x.slug !== h.slug);
  const extras = (h.galeria || []).slice(0, 4);
  const pendientesGaleria = BORRADOR ? (h.galeriaPendiente || []).slice(0, Math.max(0, 4 - extras.length)) : [];
  const nGaleria = extras.length + pendientesGaleria.length;
  const claseGaleria = nGaleria === 0 ? ' galeria--sola' : nGaleria === 1 ? ' galeria--dos' : '';
  const incluye = h.incluye.filter((x) => hay(x) || BORRADOR);
  const habitaciones = h.habitaciones.filter((x) => hay(x.nombre) || BORRADOR);

  const cuerpo = `
<section class="cabecera-pag tema-claro" style="padding-bottom:2rem">
  <div class="cont">
    ${m.html}
    <div class="chips" style="margin-bottom:1.25rem"><span class="chip">${icono('pin')}${esc(h.lugar)}</span>${h.plan ? `<span class="chip">${icono('cama')}${esc(h.plan)}</span>` : ''}${h.oferta ? `<span class="chip chip--lleno" data-vence="${h.oferta.vence}">Oferta</span>` : ''}</div>
    <h1 class="t-titulo">${esc(h.nombre)}</h1>
  </div>
</section>

${seccionOferta(h)}
${h.oferta && h.foto === h.oferta.flyer ? '' : `<section class="tema-claro" aria-label="Fotos del hotel">
  <div class="cont">
    <div class="galeria${claseGaleria}">
      <div class="galeria__principal">${foto(h.foto, { sizes: '(min-width: 900px) 50vw, 92vw', prioridad: true })}${credito(h.foto)}</div>
      ${extras.map((g) => `<figure class="galeria__foto">${foto(g, { sizes: nGaleria === 1 ? '(min-width: 900px) 40vw, 92vw' : '(min-width: 900px) 25vw, 46vw' })}${credito(g)}</figure>`).join('')}
      ${pendientesGaleria.map((g) => `<div class="galeria__pend">${ph(null, `Foto: ${g}`)}</div>`).join('')}
    </div>
    ${h.fotoEsZona ? `<p class="credito">Foto de referencia de la zona (${esc(h.lugar)}), no del hotel.</p>` : ''}
  </div>
</section>`}

<section class="seccion tema-claro">
  <div class="cont ficha">
    <div>
      ${
        hay(h.descripcion) || (BORRADOR && !(h.oferta && !hay(h.desde)))
          ? `<div class="ficha__bloque"><h2>Sobre el resort</h2>${hay(h.descripcion) ? `<p class="t-lead">${esc(h.descripcion)}</p>` : ph(null, 'Descripción corta del resort: ambiente, para quién es ideal y qué lo hace especial (2 o 3 líneas)', { bloque: true })}</div>`
          : ''
      }
      ${
        incluye.length
          ? `<div class="ficha__bloque"><h2>Qué incluye el plan</h2><ul class="lista-check"><li>${icono('check')}<span>Comidas y bebidas</span></li>${incluye
              .map((x, i) => `<li>${icono('check')}<span>${hay(x) ? esc(x) : ph(null, ['Restaurantes a la carta', 'Actividades y shows', 'Club de niños', 'Wifi', 'Impuestos incluidos'][i] || 'Otro beneficio')}</span></li>`)
              .join('')}</ul></div>`
          : ''
      }
      ${
        habitaciones.length
          ? `<div class="ficha__bloque"><h2>Habitaciones</h2><div class="habitaciones">${habitaciones
              .map(
                (r, i) => `<div class="habitacion"><span><strong>${hay(r.nombre) ? esc(r.nombre) : ph(null, ['Habitación estándar', 'Habitación superior', 'Suite'][i] || 'Habitación')}</strong><br><span style="color:var(--gris)">${hay(r.capacidad) ? `Hasta ${r.capacidad} personas` : ph(null, 'Capacidad')}</span></span><span>${hay(r.desde) ? `Desde <strong>${usd(r.desde)}</strong> por noche` : ph(null, 'Desde US$ por noche')}</span></div>`
              )
              .join('')}</div><p class="credito">Precio por persona por noche en habitación doble. Sujeto a disponibilidad y temporada.</p></div>`
          : ''
      }
      <div class="ficha__bloque">
        <h2>Cómo reservar${h.oferta ? '' : ' este hotel'}</h2>
        <ul class="lista-check">
          <li>${icono('check')}<span>Pides la cotización con tus fechas y cuántos van.</span></li>
          <li>${icono('check')}<span>Te mandamos el total por escrito, con plan e impuestos.</span></li>
          <li>${icono('check')}<span>Separas con un depósito y completas en cuotas antes de la entrada.</span></li>
        </ul>
      </div>
    </div>
    <div class="ficha__lado">
      ${
        h.oferta
          ? `<div class="precio-desde" style="margin-bottom:1rem" data-vence="${h.oferta.vence}"><span>${esc(h.oferta.titulo)}</span><strong>${esc(h.oferta.resumen)}</strong></div>`
          : `<div class="precio-desde" style="margin-bottom:1rem"><span>Desde, por persona por noche</span><strong data-dato="hoteles:${h.slug}:desde_usd" data-formato="usd">${hay(h.desde) ? usd(h.desde) : BORRADOR ? ph(null, 'US$ por confirmar') : 'Cotiza tus fechas'}</strong></div>`
      }
      ${formHotel({ hotel: h.nombre })}
    </div>
  </div>
</section>

${
  otros.length
    ? `<section class="seccion tema-bruma" aria-labelledby="otros-t">
  <div class="cont" data-carrusel>
    <div class="cabeza cabeza--fila">
      <h2 class="t-seccion" id="otros-t">Otros resorts</h2>
      <p class="t-lead">Compara antes de decidir. Todos se pagan en cuotas.</p>
      <div class="cabeza__accion carrusel__ctrl">
        <button class="carrusel__btn" type="button" data-prev aria-label="Ver hoteles anteriores">${icono('izq')}</button>
        <button class="carrusel__btn" type="button" data-next aria-label="Ver más hoteles">${icono('der')}</button>
      </div>
    </div>
    <div class="carrusel__pista" data-pista>${otros.map((x) => tarjetaHotel(x, zonas)).join('')}</div>
  </div>
</section>`
    : ''
}
${cierre()}`;
  return pagina({
    ruta: `/hoteles/${h.slug}/`,
    titulo: `${h.nombre} · ${h.lugar}`,
    descripcion: h.oferta
      ? `${h.nombre} (${h.lugar}): ${h.oferta.titulo.toLowerCase()}, ${h.oferta.resumen.charAt(0).toLowerCase() + h.oferta.resumen.slice(1)}. Reserva con Escondidas Multiservices.`
      : `Cotiza el ${h.nombre} (${h.lugar})${h.plan ? `, ${h.plan.toLowerCase()},` : ''} con Escondidas Multiservices. Separa con un depósito y paga en cuotas.`,
    cuerpo,
    og: '/img/og/hoteles.jpg',
    jsonld: [m.ld],
  });
}

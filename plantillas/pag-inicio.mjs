// Página de inicio
import { sitio, excursiones, hoteles, zonas, cruceros, otrosServicios, faqGeneral, testimonios, secciones } from '../contenido/datos.mjs';
import { pagina, agenciaLD } from './base.mjs';
import { esc, icono, foto, boton, botonWa, wa, ig, ph, rd, fechaLarga, fechaTablero, visible, hay, BORRADOR } from './ui.mjs';
import { cabeza, tablero, boletos, cuenta, pasos, faq, cierre, credito, tarjetaHotel, flap, enlaceFlecha } from './componentes.mjs';

export function inicio() {
  const mac = excursiones.find((e) => e.slug === 'macao');
  const f = fechaTablero(mac.fecha);
  const crucero = cruceros[0];
  const preguntas = faq(faqGeneral, { id: 'preguntas-inicio' });
  const voces = testimonios.filter(visible);

  const cuerpo = `
<section class="portada" aria-labelledby="portada-t">
  <div class="portada__media" data-portada>
    <picture>
      <source media="(max-aspect-ratio: 1/1)" srcset="/video/portada-v.webp">
      <img src="/video/portada-h.webp" width="1280" height="720" alt="" fetchpriority="high">
    </picture>
    <video muted loop playsinline preload="none" aria-hidden="true" tabindex="-1" data-src-h="/video/portada-h.mp4" data-src-v="/video/portada-v.mp4"></video>
    <div class="portada__velo"></div>
  </div>
  <button class="portada__pausa" type="button" data-video-pausa aria-label="Pausar el video de fondo" hidden>${icono('pausa')}</button>
  <div class="cont portada__contenido">
    <h1 class="t-display" id="portada-t">Lo mejor de RD está escondido. Vamos a buscarlo.</h1>
    <p class="portada__sub">Excursiones en grupo desde Santiago y Puerto Plata, resorts todo incluido y cruceros. Separas con poco y pagas el resto en partes.</p>
    <div class="acciones">
      ${boton('Separar mi cupo para Macao', '/reservar/?excursion=macao', { estilo: 'arena', clase: 'btn--grande' })}
      ${botonWa('Escribir por WhatsApp', 'Hola, quiero información de un viaje.', { estilo: 'borde', clase: 'btn--grande' })}
    </div>
  </div>
  <div class="proxima">
    <a class="cont proxima__enlace" href="/excursiones/macao/">
      <span class="proxima__fecha"><span class="proxima__eti">Próxima salida</span>${flap(`${f.dia} ${f.fecha}`, { clase: 'flap--grande', animar: true })}</span>
      <span class="proxima__destino">${esc(mac.nombre)}</span>
      <span class="proxima__precio"><span>Desde <strong data-dato="salidas:macao:precio_santiago" data-formato="rd">${rd(mac.salidas[0].precio)}</strong></span>${cuenta(mac.fecha, { hora: mac.horaCuenta })}</span>
      <span class="proxima__ir">${icono('flecha')}<span class="sr">Ver la excursión</span></span>
    </a>
  </div>
</section>

<section class="seccion tema-oscuro" id="salidas">
  <div class="cont">
    ${tablero(excursiones, {
      pie: `<div class="tablero__pie"><p>¿Quieres saber cuándo sale la próxima?</p>${enlaceFlecha('Avísame cuando haya fecha', '/excursiones/#avisame')}</div>`,
    })}
  </div>
</section>

<section class="seccion tema-claro" aria-labelledby="serv-t">
  <div class="cont">
    ${cabeza({
      titulo: 'Todo para tu viaje, en un solo lugar',
      id: 'serv-t',
      texto: 'Desde una excursión de un día hasta una semana en un resort o un crucero. Te cotizamos, reservamos y te acompañamos por WhatsApp.',
    })}
    <div class="mosaico mosaico--${['dos', 'tres', 'cuatro'][(secciones.cruceros ? 1 : 0) + (secciones.paquetes ? 1 : 0)]}">
      <a class="mosaico__item mosaico__item--exc" href="/excursiones/">
        ${foto('macao-acantilado', { sizes: '(min-width: 900px) 56vw, 100vw', pos: '62% 50%' })}
        <div class="mosaico__txt"><h3 class="mosaico__t">Excursiones</h3><p class="mosaico__d">Salidas en grupo con transporte, comida y actividades incluidas.</p><span class="mosaico__cta">Ver excursiones${icono('flecha')}</span></div>
      </a>
      <a class="mosaico__item mosaico__item--hot" href="/hoteles/">
        ${foto('hardrock', { sizes: '(min-width: 900px) 40vw, 100vw' })}
        <div class="mosaico__txt"><h3 class="mosaico__t">Hoteles y resorts</h3><p class="mosaico__d">Ofertas todo incluido en Punta Cana, Puerto Plata y más.</p><span class="mosaico__cta">Ver hoteles${icono('flecha')}</span></div>
      </a>
      ${
        secciones.cruceros
          ? `<a class="mosaico__item mosaico__item--cru" href="/cruceros/">
        ${foto('costa-pacifica', { sizes: '(min-width: 900px) 40vw, 100vw', pos: '60% 50%' })}
        <div class="mosaico__txt"><h3 class="mosaico__t">Cruceros</h3><p class="mosaico__d">Salidas en grupo, como el de Año Nuevo.</p><span class="mosaico__cta">Ver cruceros${icono('flecha')}</span></div>
      </a>`
          : ''
      }
      ${
        secciones.paquetes
          ? `<a class="mosaico__item mosaico__item--paq" href="/paquetes/">
        ${foto('guatape', { sizes: '(min-width: 900px) 40vw, 100vw' })}
        <div class="mosaico__txt"><h3 class="mosaico__t">Paquetes</h3><p class="mosaico__d">Vuelo, hotel y traslados en un solo precio.</p><span class="mosaico__cta">Ver paquetes${icono('flecha')}</span></div>
      </a>`
          : ''
      }
      <div class="mosaico__mas">
        <h3>También te cotizamos</h3>
        <div>
          ${otrosServicios
            .map(
              (s) => `<a class="servicio-wa" href="${wa(s.mensaje)}" target="_blank" rel="noopener">${icono(s.icono)}<span><strong>${esc(s.nombre)}</strong><span>${esc(s.texto)}</span></span><span class="servicio-wa__ir">Cotizar${icono('whatsapp')}</span></a>`
            )
            .join('')}
        </div>
      </div>
    </div>
  </div>
</section>

<section class="seccion tema-bruma" aria-labelledby="pasos-t">
  <div class="cont">
    ${cabeza({ titulo: 'Separa con poco. Paga a tu ritmo.', id: 'pasos-t', texto: 'Así reservas cualquier excursión, sin filas ni papeleo.' })}
    ${pasos()}
  </div>
</section>

<section class="seccion tema-claro" aria-labelledby="hot-t">
  <div class="cont" data-carrusel>
    <div class="cabeza cabeza--fila">
      <h2 class="t-seccion" id="hot-t">Resorts todo incluido</h2>
      <p class="t-lead">Elige la zona, te cotizamos con tus fechas y separas con un depósito. El resto, en cuotas.</p>
      <div class="cabeza__accion carrusel__ctrl">
        <button class="carrusel__btn" type="button" data-prev aria-label="Ver hoteles anteriores">${icono('izq')}</button>
        <button class="carrusel__btn" type="button" data-next aria-label="Ver más hoteles">${icono('der')}</button>
      </div>
    </div>
    <div class="carrusel__pista" data-pista>
      ${hoteles.map((h) => tarjetaHotel(h, zonas)).join('')}
    </div>
    <p style="margin-top:1.75rem">${enlaceFlecha('Ver todos los hoteles', '/hoteles/')}</p>
  </div>
</section>

${
  secciones.cruceros
    ? `<section class="banda" aria-labelledby="cru-t">
  ${foto(crucero.foto, { sizes: '100vw', pos: '70% 50%' })}
  <div class="cont">
    <div class="banda__txt">
      <h2 class="t-seccion" id="cru-t">Recibe el Año Nuevo en el mar</h2>
      <p class="t-lead">A bordo del ${esc(crucero.barco)}, con el grupo de Escondidas: comidas, entretenimiento y fiesta de fin de año a bordo.</p>
      <div class="chips">
        ${hay(crucero.fecha) || BORRADOR ? `<span class="chip">${icono('calendario')}${ph(crucero.fecha && fechaLarga(crucero.fecha), 'Fecha por confirmar')}</span>` : ''}
        ${hay(crucero.noches) || BORRADOR ? `<span class="chip">${icono('barco')}${hay(crucero.noches) ? `${crucero.noches} noches` : ph(null, 'Noches por confirmar')}</span>` : ''}
        <span class="chip">${icono('maleta')}Pasaporte y visa de EE. UU. o Schengen</span>
      </div>
      <div class="acciones">
        ${boton('Ver el crucero', `/cruceros/${crucero.slug}/`, { estilo: 'arena' })}
        ${botonWa('Unirme al grupo', 'Hola, quiero unirme al grupo del crucero de Año Nuevo.', { estilo: 'borde' })}
      </div>
    </div>
  </div>
  ${credito(crucero.foto)}
</section>`
    : ''
}

${`<section class="seccion tema-claro" aria-labelledby="real-t">
  <div class="cont">
    <div class="cabeza cabeza--fila">
      <h2 class="t-seccion" id="real-t">Así se viven nuestras excursiones</h2>
      <p class="t-lead">Fotos de viajeros de Escondidas en el camino a Macao. Polvo, lodo y risas de verdad.</p>
      <div class="cabeza__accion">${boton('Míranos en Instagram', ig(), { estilo: 'borde', ico: 'instagram', externo: true })}</div>
    </div>
    <div class="tira" tabindex="0" role="region" aria-label="Fotos de viajeros, desliza para ver más">
      ${['macao-amigas-paz', 'macao-brindis', 'macao-grupo-buggies', 'buggy-casco', 'macao-amigas-risas']
        .map((s) => `<figure>${foto(s, { sizes: '(min-width: 1000px) 18vw, 64vw' })}</figure>`)
        .join('')}
    </div>
    ${
      voces.length
        ? `<div class="voces">${voces
            .map(
              (v) => `<figure class="voz"><blockquote>${hay(v.texto) ? `“${esc(v.texto)}”` : ph(null, 'Testimonio real de un cliente, con su permiso', { bloque: true })}</blockquote><figcaption>${hay(v.nombre) ? `${esc(v.nombre)} · ${esc(v.viaje)}` : ph(null, 'Nombre y viaje')}</figcaption></figure>`
            )
            .join('')}</div>`
        : ''
    }
  </div>
</section>`}

<section class="seccion tema-bruma" aria-labelledby="faq-t">
  <div class="cont dos-col">
    ${cabeza({
      titulo: 'Lo que más nos preguntan',
      id: 'faq-t',
      texto: '¿Tienes otra duda? Escríbenos y te respondemos por WhatsApp.',
      extra: `<div>${botonWa('Hacer una pregunta', 'Hola, tengo una pregunta.', { estilo: 'pizarra' })}</div>`,
    })}
    ${preguntas.html}
  </div>
</section>

${cierre()}
`;

  return pagina({
    ruta: '/',
    titulo: `${sitio.nombre} · Agencia de viajes en Santiago`,
    cuerpo,
    clase: 'pag-inicio',
    og: '/img/og/inicio.jpg',
    jsonld: [agenciaLD(), preguntas.ld],
  });
}

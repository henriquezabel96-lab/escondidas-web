// Reserva de cupo en 4 pasos (Netlify Forms + WhatsApp)
import { sitio, excursiones } from '../contenido/datos.mjs';
import { pagina, migas } from './base.mjs';
import { esc, icono, ph, rd, fechaLarga, hay, wa, BORRADOR } from './ui.mjs';
import { formInicio, campo, opcionesTarjeta, contador, panelEnviado } from './componentes.mjs';

export function reservar() {
  const m = migas([{ texto: 'Inicio', href: '/' }, { texto: 'Reservar', href: '/reservar/' }]);
  const activas = excursiones.filter((e) => e.estado === 'activa');
  const e0 = activas[0];
  const datos = {
    reserva: {
      excursiones: activas.map((e) => ({
        slug: e.slug,
        codigo: e.codigo,
        nombre: e.nombre,
        fecha: e.fecha,
        fechaTexto: fechaLarga(e.fecha),
        deposito: e.deposito,
        precioNino: e.precioNino,
        salidas: e.salidas,
      })),
    },
  };
  const cuentas = sitio.pagos.cuentas.filter((c) => hay(c.numero) || BORRADOR);

  const cuerpo = `
<section class="cabecera-pag tema-claro">
  <div class="cont">
    ${m.html}
    <h1 class="t-titulo">Reserva tu cupo</h1>
    <p class="t-lead">Toma dos minutos. Al terminar te damos un código de reserva y te decimos cómo hacer el depósito.</p>
  </div>
</section>

<section class="seccion seccion--arriba-0 tema-claro">
  <div class="cont reserva">
    <div class="tarjeta-form">
      ${formInicio('reserva', { extra: { 'data-pasos': '', 'data-wa': 'reserva' } })}
        <input type="hidden" name="codigo" value="">
        <input type="hidden" name="excursion_nombre" value="${esc(e0.nombre)}">
        <input type="hidden" name="fecha" value="${esc(fechaLarga(e0.fecha))}">
        <input type="hidden" name="total_adultos" value="">
        <input type="hidden" name="deposito_total" value="">
        <ol class="progreso" aria-label="Pasos de la reserva">
          <li aria-current="step">Excursión</li><li>Personas</li><li>Tus datos</li><li>Confirmar</li>
        </ol>
        <p class="no-js-nota form__nota">Llena todos los campos y toca “Enviar mi reserva” al final.</p>

        <fieldset class="paso" data-paso="1" style="border:0;padding:0;margin:0;min-width:0">
          <legend class="paso__t" tabindex="-1">¿A qué excursión vas?</legend>
          ${opcionesTarjeta({
            nombre: 'excursion',
            leyenda: 'Excursión',
            opciones: activas.map((e) => ({ valor: e.slug, titulo: e.nombre, detalle: esc(fechaLarga(e.fecha)) })),
            clase: 'opciones--sin-leyenda',
          })}
          ${opcionesTarjeta({
            nombre: 'salida',
            leyenda: '¿Desde dónde sales?',
            opciones: e0.salidas.map((s) => ({ valor: s.id, titulo: s.ciudad, detalle: `${rd(s.precio)} por persona`, datos: { 'data-precio': s.precio } })),
          })}
        </fieldset>

        <fieldset class="paso" data-paso="2" style="border:0;padding:0;margin:0;min-width:0">
          <legend class="paso__t" tabindex="-1">¿Cuántos van?</legend>
          <div>
            ${contador({ nombre: 'adultos', etiqueta: 'Adultos', min: 1, max: 40, valor: 1 })}
            ${contador({ nombre: 'ninos', etiqueta: 'Niños', min: 0, max: 20, valor: 0, ayuda: hay(e0.precioNino) ? `${rd(e0.precioNino)} cada uno` : e0.notaNinos ? 'No recomendado para esta excursión: escríbenos antes' : 'La agencia te confirma su precio' })}
          </div>
          ${campo({ nombre: 'edades_ninos', etiqueta: 'Edades de los niños', ayuda: 'Por ejemplo: 6 y 9 años.' })}
          ${campo({ tipo: 'select', nombre: 'pagos', etiqueta: 'Después del depósito, ¿en cuántos pagos completas?', opciones: [['1', '1 pago'], ['2', '2 pagos'], ['3', '3 pagos'], ['4', '4 pagos']], valor: '2' })}
        </fieldset>

        <fieldset class="paso" data-paso="3" style="border:0;padding:0;margin:0;min-width:0">
          <legend class="paso__t" tabindex="-1">Tus datos</legend>
          ${campo({ nombre: 'nombre', etiqueta: 'Nombre y apellido', requerido: true, autocomplete: 'name', error: 'Escribe tu nombre y apellido.' })}
          <div class="fila-campos">
            ${campo({ tipo: 'tel', nombre: 'whatsapp', etiqueta: 'WhatsApp', requerido: true, autocomplete: 'tel', inputmode: 'tel', placeholder: '809 000 0000', patron: '[0-9 ()+\\-]{10,}', error: 'Escribe un número de 10 dígitos, por ejemplo 809 555 1234.' })}
            ${campo({ tipo: 'email', nombre: 'correo', etiqueta: 'Correo', autocomplete: 'email', error: 'Revisa el correo, parece incompleto.' })}
          </div>
          ${campo({ tipo: 'select', nombre: 'pago_deposito', etiqueta: '¿Cómo vas a pagar el depósito?', opciones: ['Transferencia bancaria', 'Depósito en el banco', 'Efectivo en la oficina'] })}
          ${campo({ tipo: 'textarea', nombre: 'comentario', etiqueta: '¿Algo que debamos saber?', filas: 3, placeholder: 'Por ejemplo: vamos 4 amigas y queremos ir juntas en el bus.' })}
        </fieldset>

        <fieldset class="paso" data-paso="4" style="border:0;padding:0;margin:0;min-width:0">
          <legend class="paso__t" tabindex="-1">Revisa y envía</legend>
          <p class="form__nota">Revisa el resumen. Al enviar, te damos tu código y la cuenta para el depósito.</p>
          <label class="check"><input type="checkbox" name="acepto" value="Sí" required data-error="Marca la casilla para continuar."><span>Leí y acepto los <a class="enlace" href="/terminos/" target="_blank">términos y condiciones</a>.</span></label>
          <span class="campo__error" aria-live="polite"></span>
        </fieldset>

        <div class="form__nav">
          <button class="btn btn--borde" type="button" data-anterior hidden>Atrás</button>
          <button class="btn btn--pizarra" type="button" data-siguiente>Continuar</button>
          <button class="btn btn--arena" type="submit" data-enviar>Enviar mi reserva</button>
        </div>
        ${panelEnviado({
          titulo: '¡Tu cupo está en proceso!',
          conCodigo: true,
          texto: 'Para dejarlo a tu nombre, haz el depósito y envíanos el comprobante por WhatsApp con tu código.',
          extra: '<a class="enlace" href="#pagos">Ver dónde hacer el depósito</a>',
        })}
      </form>
    </div>

    <aside class="resumen" aria-labelledby="resumen-t" data-resumen-reserva>
      <p class="resumen__t" id="resumen-t">Tu reserva</p>
      <p class="resumen__exc" data-r="excursion">${esc(e0.nombre)}</p>
      <dl>
        <div><dt>Fecha</dt><dd data-r="fecha">${esc(fechaLarga(e0.fecha))}</dd></div>
        <div><dt>Sale desde</dt><dd data-r="salida">${esc(e0.salidas[0].ciudad)}</dd></div>
        <div><dt>Personas</dt><dd data-r="personas">1 adulto</dd></div>
        <div><dt>Precio por persona</dt><dd data-r="precio">${rd(e0.salidas[0].precio)}</dd></div>
        <div><dt>Para separar hoy</dt><dd data-r="deposito">${rd(e0.deposito)}</dd></div>
        <div><dt>Después</dt><dd data-r="cuotas">2 pagos de ${rd(Math.ceil((e0.salidas[0].precio - e0.deposito) / 2))}</dd></div>
      </dl>
      <div class="resumen__total"><span>Total</span><strong data-r="total">${rd(e0.salidas[0].precio)}</strong></div>
      <p class="resumen__nota" data-r="nota-ninos" hidden>Más el precio de los niños, que te confirma la agencia.</p>
      <p class="resumen__nota">El depósito es de ${rd(e0.deposito)} por persona. Te enviamos el comprobante con el cupo a tu nombre.</p>
    </aside>
  </div>
</section>

<section class="seccion tema-bruma" id="pagos" aria-labelledby="pagos-t">
  <div class="cont">
    <div class="cabeza">
      <h2 class="t-seccion" id="pagos-t">Dónde hacer el depósito</h2>
      <p class="t-lead">Después de pagar, envíanos el comprobante por WhatsApp con tu código de reserva.</p>
    </div>
    <div class="cuentas">
      ${cuentas
        .map(
          (c) => `<div class="cuenta-pago">${icono('banco')}<h3>${hay(c.banco) ? esc(c.banco) : ph(null, 'Banco')}</h3>
        <p>${hay(c.tipo) ? esc(c.tipo) : ph(null, 'Tipo de cuenta')}</p>
        <p>${hay(c.numero) ? `<strong>${esc(c.numero)}</strong>` : ph(null, 'Número de cuenta')}</p>
        <p>${hay(c.titular) ? `A nombre de ${esc(c.titular)}` : ph(null, 'A nombre de')}</p>
        ${hay(c.numero) ? `<button class="copiar" type="button" data-copiar="${esc(c.numero)}">${icono('copiar')}<span>Copiar número</span></button>` : ''}</div>`
        )
        .join('')}
      <div class="cuenta-pago">${icono('efectivo')}<h3>Efectivo en la oficina</h3><p>${esc(sitio.pagos.efectivo)}</p><p>${ph(sitio.horario, 'Horario por confirmar')}</p></div>
      <div class="cuenta-pago">${icono('whatsapp')}<h3>Envía tu comprobante</h3><p>Una foto del recibo o la captura de la transferencia, con tu código de reserva.</p><a class="enlace" href="${wa('Hola, envío el comprobante de mi reserva. Mi código es: ')}" target="_blank" rel="noopener">${sitio.whatsapp[0].visible}</a></div>
    </div>
  </div>
</section>`;

  return pagina({
    ruta: '/reservar/',
    titulo: 'Reserva tu cupo',
    descripcion: 'Reserva tu cupo en las excursiones de Escondidas: elige la salida, cuántos van y te damos un código para separar con el depósito.',
    cuerpo,
    clase: 'pag-reservar',
    flotante: false,
    og: '/img/og/macao.jpg',
    datos,
    jsonld: [m.ld],
  });
}

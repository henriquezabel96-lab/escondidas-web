/* Escondidas Multiservices · interacción del sitio
   Sin dependencias. Todo funciona sin JS (enlaces y formularios normales);
   esto solo mejora la experiencia. */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var CONFIG = {};
  try { CONFIG = JSON.parse(document.getElementById('config').textContent); } catch (e) { CONFIG = {}; }
  var WA = CONFIG.whatsapp || '18298178000';

  function miles(n) { return Math.round(n).toLocaleString('en-US'); }
  function rd(n) { return 'RD$' + miles(n); }
  function usd(n) { return 'US$' + miles(n); }
  function waUrl(texto) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(texto); }
  function icono(n) { return '<svg class="i" aria-hidden="true" focusable="false"><use href="/img/iconos.svg#' + n + '"/></svg>'; }
  function suave() { return reducido ? 'auto' : 'smooth'; }

  /* ── Cabecera: se esconde al bajar y vuelve al subir ───────────────────── */
  function cabecera() {
    var cab = $('[data-cab]');
    if (!cab) return;
    var ultimo = window.scrollY, pendiente = false;
    function pintar() {
      var y = window.scrollY;
      cab.classList.toggle('cab--solida', y > 40);
      if (!document.body.classList.contains('menu-abierto')) {
        if (y > 180 && y > ultimo + 6) cab.classList.add('cab--oculta');
        else if (y < ultimo - 6 || y < 180) cab.classList.remove('cab--oculta');
      }
      ultimo = y;
      pendiente = false;
    }
    window.addEventListener('scroll', function () {
      if (!pendiente) { pendiente = true; requestAnimationFrame(pintar); }
    }, { passive: true });
    cab.addEventListener('focusin', function () { cab.classList.remove('cab--oculta'); });
    pintar();
  }

  /* ── Menú del celular ──────────────────────────────────────────────────── */
  function menu() {
    var panel = $('[data-menu]'), abrir = $('[data-menu-abrir]'), cerrar = $('[data-menu-cerrar]');
    if (!panel || !abrir) return;
    function focables() { return $$('a[href], button', panel).filter(function (el) { return el.offsetParent !== null; }); }
    function teclas(ev) {
      if (ev.key === 'Escape') { cerrarMenu(true); return; }
      if (ev.key !== 'Tab') return;
      var f = focables();
      if (!f.length) return;
      var primero = f[0], ultimo = f[f.length - 1];
      if (ev.shiftKey && document.activeElement === primero) { ev.preventDefault(); ultimo.focus(); }
      else if (!ev.shiftKey && document.activeElement === ultimo) { ev.preventDefault(); primero.focus(); }
    }
    function abrirMenu() {
      panel.hidden = false;
      document.body.classList.add('menu-abierto');
      abrir.setAttribute('aria-expanded', 'true');
      if (cerrar) cerrar.focus();
      document.addEventListener('keydown', teclas);
    }
    function cerrarMenu(devolverFoco) {
      panel.hidden = true;
      document.body.classList.remove('menu-abierto');
      abrir.setAttribute('aria-expanded', 'false');
      document.removeEventListener('keydown', teclas);
      if (devolverFoco) abrir.focus();
    }
    abrir.addEventListener('click', abrirMenu);
    if (cerrar) cerrar.addEventListener('click', function () { cerrarMenu(true); });
    $$('a', panel).forEach(function (a) { a.addEventListener('click', function () { cerrarMenu(false); }); });
    var ancho = window.matchMedia('(min-width: 1100px)');
    var alCambiar = function (e) { if (e.matches && !panel.hidden) cerrarMenu(false); };
    if (ancho.addEventListener) ancho.addEventListener('change', alCambiar);
  }

  /* ── Video de portada ──────────────────────────────────────────────────── */
  function videoPortada() {
    var cont = $('[data-portada]');
    if (!cont) return;
    var v = $('video', cont), btn = $('[data-video-pausa]');
    var conn = navigator.connection;
    if (!v || reducido || (conn && (conn.saveData || /(^|-)2g/.test(conn.effectiveType || '')))) return;
    var vertical = window.matchMedia('(max-aspect-ratio: 1/1)').matches;
    v.src = vertical ? v.getAttribute('data-src-v') : v.getAttribute('data-src-h');
    v.muted = true;
    v.addEventListener('playing', function () { v.classList.add('listo'); }, { once: true });
    var porUsuario = false;
    function reproducir() { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    reproducir();
    if (btn) {
      btn.hidden = false;
      btn.addEventListener('click', function () {
        if (v.paused) {
          porUsuario = false; reproducir();
          btn.setAttribute('aria-label', 'Pausar el video de fondo'); btn.innerHTML = icono('pausa');
        } else {
          porUsuario = true; v.pause();
          btn.setAttribute('aria-label', 'Reproducir el video de fondo'); btn.innerHTML = icono('play');
        }
      });
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) {
        if (e[0].isIntersecting) { if (!porUsuario) reproducir(); } else v.pause();
      }).observe(cont);
    }
  }

  /* ── Letras de tablero (un solo momento animado, al cargar) ────────────── */
  function tablero() {
    if (reducido) return;
    var LETRAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $$('[data-flap]').forEach(function (el) {
      var celdas = $$('.flap__c:not(.flap__c--esp)', el);
      var finales = celdas.map(function (c) { return c.textContent; });
      var azar = function () { return LETRAS.charAt(Math.floor(Math.random() * LETRAS.length)); };
      celdas.forEach(function (c) { c.textContent = azar(); });
      var inicio = null, ultimoCambio = 0;
      function paso(t) {
        if (inicio === null) inicio = t;
        var cambiar = t - ultimoCambio > 55;
        if (cambiar) ultimoCambio = t;
        var faltan = 0;
        celdas.forEach(function (c, i) {
          if (t - inicio < 420 + i * 110) { faltan++; if (cambiar) c.textContent = azar(); }
          else c.textContent = finales[i];
        });
        if (faltan) requestAnimationFrame(paso);
      }
      setTimeout(function () { requestAnimationFrame(paso); }, 300);
    });
  }

  /* ── Cuenta regresiva ──────────────────────────────────────────────────── */
  function cuentas() {
    var els = $$('[data-cuenta]');
    if (!els.length) return;
    function pintar() {
      var ahora = Date.now();
      els.forEach(function (el) {
        var fin = Date.parse(el.getAttribute('data-cuenta'));
        var txt = $('[data-cuenta-texto]', el);
        if (!txt || isNaN(fin)) return;
        var ms = fin - ahora;
        if (ms <= 0) { txt.textContent = 'Esta salida ya pasó'; return; }
        var d = Math.floor(ms / 864e5), h = Math.floor((ms % 864e5) / 36e5);
        txt.textContent = d > 1 ? 'Faltan ' + d + ' días' : d === 1 ? 'Falta 1 día y ' + h + ' h' : 'Faltan ' + Math.max(1, h) + ' horas';
      });
    }
    pintar();
    setInterval(pintar, 60000);
  }

  /* ── Carruseles ────────────────────────────────────────────────────────── */
  function carruseles() {
    $$('[data-carrusel]').forEach(function (c) {
      var pista = $('[data-pista]', c), prev = $('[data-prev]', c), next = $('[data-next]', c);
      if (!pista || !prev || !next) return;
      function salto() { var it = pista.firstElementChild; return it ? it.getBoundingClientRect().width + 18 : 320; }
      prev.addEventListener('click', function () { pista.scrollBy({ left: -salto(), behavior: suave() }); });
      next.addEventListener('click', function () { pista.scrollBy({ left: salto(), behavior: suave() }); });
      function estado() {
        prev.disabled = pista.scrollLeft < 8;
        next.disabled = pista.scrollLeft + pista.clientWidth > pista.scrollWidth - 8;
      }
      pista.addEventListener('scroll', function () { requestAnimationFrame(estado); }, { passive: true });
      window.addEventListener('resize', estado);
      estado();
    });
  }

  /* ── Filtro de hoteles por zona ────────────────────────────────────────── */
  function filtros() {
    $$('[data-filtro-grupo]').forEach(function (g) {
      var botones = $$('[data-filtro]', g), items = $$('[data-zona]', g), aviso = $('[data-filtro-estado]', g);
      botones.forEach(function (b) {
        b.addEventListener('click', function () {
          var z = b.getAttribute('data-filtro'), n = 0;
          botones.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
          items.forEach(function (it) {
            var ok = z === 'todas' || it.getAttribute('data-zona') === z;
            it.hidden = !ok;
            if (ok) n++;
          });
          if (aviso) aviso.textContent = n + (n === 1 ? ' hotel' : ' hoteles');
        });
      });
    });
  }

  /* ── Contadores + / − ──────────────────────────────────────────────────── */
  function contadores() {
    $$('[data-contador]').forEach(function (c) {
      var inp = $('input', c), menos = $('[data-menos]', c), mas = $('[data-mas]', c);
      var min = parseInt(inp.min, 10) || 0, max = parseInt(inp.max, 10) || 99;
      function fijar(v, avisar) {
        v = Math.max(min, Math.min(max, parseInt(v, 10) || min));
        inp.value = v;
        menos.disabled = v <= min;
        mas.disabled = v >= max;
        if (avisar) inp.dispatchEvent(new Event('input', { bubbles: true }));
      }
      menos.addEventListener('click', function () { fijar((parseInt(inp.value, 10) || 0) - 1, true); });
      mas.addEventListener('click', function () { fijar((parseInt(inp.value, 10) || 0) + 1, true); });
      inp.addEventListener('change', function () { fijar(inp.value, true); });
      fijar(inp.value, false);
    });
  }

  /* ── Calculadora de plan de pagos ──────────────────────────────────────── */
  function calculadoras() {
    $$('[data-calc]').forEach(function (c) {
      var slug = c.getAttribute('data-calc');
      var deposito = parseInt(c.getAttribute('data-deposito'), 10) || 1000;
      function calcular() {
        var s = $('input[name="calc-salida"]:checked', c);
        var p = Math.max(1, parseInt($('input[name="calc-personas"]', c).value, 10) || 1);
        var nEl = $('input[name="calc-pagos"]:checked', c);
        var n = nEl ? parseInt(nEl.value, 10) : 1;
        if (!s) return;
        var total = parseFloat(s.getAttribute('data-precio')) * p;
        var dep = deposito * p;
        var cuota = Math.ceil(Math.max(0, total - dep) / n);
        $('[data-calc-total]', c).textContent = rd(total);
        $('[data-calc-deposito]', c).textContent = rd(dep);
        $('[data-calc-cuota-label]', c).textContent = n === 1 ? 'Luego, un solo pago de' : 'Luego, ' + n + ' pagos de';
        $('[data-calc-cuota]', c).textContent = rd(cuota);
        $('[data-calc-reservar]', c).href = '/reservar/?excursion=' + slug + '&salida=' + s.value + '&adultos=' + p + '&pagos=' + n;
      }
      c.addEventListener('input', calcular);
      c.addEventListener('change', calcular);
      document.addEventListener('esc:precios', calcular);
      calcular();
    });
  }

  /* ── Formularios ───────────────────────────────────────────────────────── */
  function prellenar(f) {
    var q = new URLSearchParams(location.search);
    q.forEach(function (v, k) {
      var el = f.elements[k];
      if (!el) return;
      if (typeof RadioNodeList !== 'undefined' && el instanceof RadioNodeList) {
        Array.prototype.forEach.call(el, function (r) { if (r.value === v) r.checked = true; });
      } else if (el.type === 'radio' || el.type === 'checkbox') {
        if (el.value === v) el.checked = true;
      } else if (el.tagName === 'SELECT') {
        var op = Array.prototype.find.call(el.options, function (o) { return o.value === v || o.getAttribute('data-slug') === v; });
        if (op) el.value = op.value;
      } else if (el.type !== 'hidden') {
        el.value = v;
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  }

  function mensajeError(el) {
    var v = el.validity;
    if (v.valueMissing) return el.getAttribute('data-error') || (el.type === 'checkbox' ? 'Marca esta casilla para continuar.' : el.type === 'radio' ? 'Elige una opción.' : 'Completa este campo.');
    if (v.typeMismatch || v.patternMismatch) return el.getAttribute('data-error') || 'Revisa este dato.';
    if (v.rangeUnderflow || v.rangeOverflow) return 'Elige un número entre ' + el.min + ' y ' + el.max + '.';
    return el.validationMessage;
  }

  function validarCampo(el) {
    var cont = el.closest('.campo, .opciones, .contador') || el.closest('.check');
    var err = cont ? $('.campo__error', cont) : null;
    if (!err && cont && cont.nextElementSibling && cont.nextElementSibling.classList.contains('campo__error')) err = cont.nextElementSibling;
    var ok = el.checkValidity();
    if (cont) cont.classList.toggle('campo--error', !ok);
    if (el.type !== 'radio') el.setAttribute('aria-invalid', String(!ok));
    if (err) err.textContent = ok ? '' : mensajeError(el);
    return ok;
  }

  function validar(contenedor) {
    var vistos = {}, primero = null;
    $$('input, select, textarea', contenedor).forEach(function (el) {
      if (el.disabled || el.type === 'hidden' || el.name === 'bot-field') return;
      if (el.type === 'radio') { if (vistos[el.name]) return; vistos[el.name] = true; }
      if (!validarCampo(el) && !primero) primero = el;
    });
    return primero;
  }

  function multipaso(f) {
    var pasos = $$('[data-paso]', f);
    var prog = $$('.progreso li', f);
    var sig = $('[data-siguiente]', f), ant = $('[data-anterior]', f), env = $('[data-enviar]', f);
    var actual = 0;
    function mostrar(n, enfocar) {
      actual = n;
      pasos.forEach(function (p, k) { p.hidden = k !== n; });
      prog.forEach(function (li, k) {
        li.classList.toggle('hecho', k < n);
        if (k === n) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
      });
      ant.hidden = n === 0;
      sig.hidden = n === pasos.length - 1;
      env.hidden = n !== pasos.length - 1;
      if (enfocar) {
        var tarjeta = f.closest('.tarjeta-form') || f;
        var top = tarjeta.getBoundingClientRect().top;
        if (top < 0 || top > window.innerHeight * 0.5) tarjeta.scrollIntoView({ behavior: suave(), block: 'start' });
        var t = $('legend', pasos[n]);
        if (t) t.focus({ preventScroll: true });
      }
    }
    sig.addEventListener('click', function () {
      var malo = validar(pasos[actual]);
      if (malo) { malo.focus(); return; }
      mostrar(actual + 1, true);
    });
    ant.addEventListener('click', function () { mostrar(actual - 1, true); });
    f._irA = function (el) {
      for (var k = 0; k < pasos.length; k++) if (pasos[k].contains(el)) { mostrar(k, false); return; }
    };
    f._enUltimo = function () { return actual === pasos.length - 1; };
    mostrar(0, false);
  }

  function personasTxt(a, n) {
    return a + (a === 1 ? ' adulto' : ' adultos') + (n ? ', ' + n + (n === 1 ? ' niño' : ' niños') : '');
  }

  function reserva(f) {
    var lista = (CONFIG.reserva && CONFIG.reserva.excursiones) || [];
    if (!lista.length) return;
    function R(k) { return document.querySelector('[data-r="' + k + '"]'); }
    var grid = $('.opciones--salida .opciones__grid', f), pintada = null;
    // Cada excursión tiene sus propios puntos de salida y precios: se vuelven a pintar al cambiarla
    function pintarSalidas(exc) {
      if (!grid || pintada === exc.slug) return;
      var previa = f.elements.salida ? f.elements.salida.value : '';
      var elegida = exc.salidas.some(function (s) { return s.id === previa; }) ? previa : exc.salidas[0].id;
      grid.innerHTML = exc.salidas.map(function (s) {
        return '<label class="opcion"><input type="radio" name="salida" value="' + s.id + '"' + (s.id === elegida ? ' checked' : '') + ' required data-precio="' + s.precio + '">' +
          '<span class="opcion__caja"><span class="opcion__t">' + s.ciudad + '</span><span class="opcion__d">' + rd(s.precio) + ' por persona</span></span></label>';
      }).join('');
      pintada = exc.slug;
    }
    function actualizar() {
      var slug = f.elements.excursion ? f.elements.excursion.value : lista[0].slug;
      var exc = lista.filter(function (x) { return x.slug === slug; })[0] || lista[0];
      pintarSalidas(exc);
      var salidaId = f.elements.salida ? f.elements.salida.value : exc.salidas[0].id;
      var sal = exc.salidas.filter(function (s) { return s.id === salidaId; })[0] || exc.salidas[0];
      var ad = Math.max(1, parseInt(f.elements.adultos.value, 10) || 1);
      var ni = Math.max(0, parseInt(f.elements.ninos.value, 10) || 0);
      var pagos = parseInt(f.elements.pagos.value, 10) || 1;
      var total = sal.precio * ad + (exc.precioNino ? exc.precioNino * ni : 0);
      var dep = exc.deposito * (ad + ni);
      var resto = Math.max(0, total - dep);
      var cuota = Math.ceil(resto / pagos);
      R('excursion').textContent = exc.nombre;
      R('fecha').textContent = exc.fechaTexto;
      R('salida').textContent = sal.ciudad;
      R('personas').textContent = personasTxt(ad, ni);
      R('precio').textContent = rd(sal.precio);
      R('deposito').textContent = rd(dep);
      R('cuotas').textContent = pagos === 1 ? '1 pago de ' + rd(resto) : pagos + ' pagos de ' + rd(cuota);
      R('total').textContent = rd(total);
      R('nota-ninos').hidden = !(ni > 0 && !exc.precioNino);
      R('deposito-pp').textContent = rd(exc.deposito);
      var ay = R('ayuda-ninos');
      if (ay) ay.textContent = exc.precioNino ? rd(exc.precioNino) + ' cada uno' : exc.notaNinos ? 'No recomendado para esta excursión: escríbenos antes' : 'La agencia te confirma su precio';
      f.elements.excursion_nombre.value = exc.nombre;
      f.elements.fecha.value = exc.fechaTexto;
      f.elements.total_adultos.value = rd(sal.precio * ad);
      f.elements.deposito_total.value = rd(dep);
      f._resumen = { exc: exc, sal: sal, ad: ad, ni: ni, pagos: pagos, total: total, dep: dep, cuota: cuota };
    }
    f.addEventListener('input', actualizar);
    f.addEventListener('change', actualizar);
    document.addEventListener('esc:precios', actualizar);
    actualizar();
  }

  function fechaCorta(iso) {
    if (!iso) return '';
    var p = iso.split('-');
    return p.length === 3 ? p[2] + '/' + p[1] + '/' + p[0] : iso;
  }

  function mensajeWa(f) {
    function v(n) { var el = f.elements[n]; return el && el.value ? String(el.value).trim() : ''; }
    function marcados(n) { return $$('input[name="' + n + '"]:checked', f).map(function (x) { return x.value; }).join(', '); }
    var tipo = f.getAttribute('data-wa'), L = [];
    var ninos = parseInt(v('ninos'), 10) || 0;
    var edades = v('edades_ninos') ? ' (edades: ' + v('edades_ninos') + ')' : '';
    if (tipo === 'reserva' && f._resumen) {
      var r = f._resumen;
      L = ['Hola, quiero separar mi cupo.', 'Código: ' + v('codigo'), 'Excursión: ' + r.exc.nombre + ' (' + r.exc.fechaTexto + ')', 'Sale desde: ' + r.sal.ciudad,
        'Personas: ' + personasTxt(r.ad, r.ni) + edades, 'Total: ' + rd(r.total) + (r.ni && !r.exc.precioNino ? ' + niños' : ''),
        'Depósito para separar: ' + rd(r.dep), 'Resto: ' + (r.pagos === 1 ? '1 pago' : r.pagos + ' pagos'), 'Pago del depósito: ' + v('pago_deposito'), 'Nombre: ' + v('nombre')];
    } else if (tipo === 'hotel') {
      L = ['Hola, quiero cotizar ' + (v('hotel') ? v('hotel') : 'un hotel') + '.', 'Entrada: ' + fechaCorta(v('entrada')), 'Salida: ' + fechaCorta(v('salida')),
        'Adultos: ' + v('adultos'), ninos ? 'Niños: ' + ninos + edades : '', 'Nombre: ' + v('nombre'), v('comentario') ? 'Comentario: ' + v('comentario') : ''];
    } else if (tipo === 'paquete') {
      L = ['Hola, quiero cotizar un paquete.', 'Destino: ' + v('destino'), 'Fechas: ' + v('fechas') + ' (' + v('noches') + ')', 'Adultos: ' + v('adultos') + (ninos ? ', niños: ' + ninos : ''),
        marcados('incluye') ? 'Que incluya: ' + marcados('incluye') : '', 'Presupuesto por persona: ' + v('presupuesto'), 'Nombre: ' + v('nombre'), v('comentario') ? 'Comentario: ' + v('comentario') : ''];
    } else if (tipo === 'crucero' || tipo === 'crucero-grupo') {
      L = [tipo === 'crucero-grupo' ? 'Hola, quiero unirme al grupo: ' + v('crucero') + '.' : 'Hola, quiero cotizar un crucero para ' + v('mes') + ' (' + v('noches') + ').',
        'Cabina: ' + marcados('cabina'), 'Personas: ' + v('personas'), 'Visa: ' + v('visa'), 'Nombre: ' + v('nombre')];
    } else if (tipo === 'avisame') {
      L = ['Hola, avísenme cuando haya fecha para ' + v('destino') + '.', 'Saldría desde: ' + v('salida'), 'Nombre: ' + v('nombre')];
    } else {
      L = ['Hola, soy ' + v('nombre') + '. Me interesa: ' + v('interes') + '.', v('mensaje')];
    }
    return L.filter(Boolean).join('\n');
  }

  function codigoReserva(prefijo) {
    var A = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789', s = '';
    var n = new Uint32Array(4);
    (window.crypto || window.msCrypto).getRandomValues(n);
    for (var i = 0; i < n.length; i++) s += A.charAt(n[i] % A.length);
    return 'ESC-' + prefijo + '-' + s;
  }

  function enviar(ev, f) {
    ev.preventDefault();
    var sig = $('[data-siguiente]', f);
    if (sig && !sig.hidden) { sig.click(); return; }
    var malo = validar(f);
    if (malo) { if (f._irA) f._irA(malo); malo.focus(); return; }
    if (f.elements.codigo) f.elements.codigo.value = codigoReserva((f._resumen && f._resumen.exc.codigo) || 'WEB');
    var texto = mensajeWa(f);
    var boton = $('button[type="submit"]', f), original = boton.innerHTML;
    boton.disabled = true;
    boton.innerHTML = '<span>Enviando…</span>';
    var cuerpo = new URLSearchParams(new FormData(f)).toString();
    var listo = function (ok) {
      boton.disabled = false;
      boton.innerHTML = original;
      var panel = $(ok ? '[data-enviado]' : '[data-fallo]', f);
      var enlace = $(ok ? '[data-enviado-wa]' : '[data-fallo-wa]', f);
      if (enlace) enlace.href = waUrl(texto);
      var cod = $('[data-codigo]', f);
      if (cod && f.elements.codigo) cod.textContent = f.elements.codigo.value;
      if (ok) {
        Array.prototype.forEach.call(f.children, function (ch) {
          if (!ch.matches('[data-enviado], [data-fallo], input[type="hidden"], .oculto')) ch.hidden = true;
        });
      }
      $$('[data-enviado], [data-fallo]', f).forEach(function (p) { p.hidden = p !== panel; });
      panel.focus({ preventScroll: true });
      panel.scrollIntoView({ behavior: suave(), block: 'center' });
    };
    fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: cuerpo })
      .then(function (r) { listo(r.ok); })
      .catch(function () { listo(false); });
  }

  function formularios() {
    $$('form[data-formulario]').forEach(function (f) {
      f.noValidate = true;
      if (f.hasAttribute('data-pasos')) multipaso(f);
      if (f.name === 'reserva') reserva(f);
      prellenar(f);
      f.dispatchEvent(new Event('change'));
      f.addEventListener('submit', function (ev) { enviar(ev, f); });
      f.addEventListener('input', function (ev) {
        var c = ev.target.closest && ev.target.closest('.campo--error');
        if (c) validarCampo(ev.target);
      });
      f.addEventListener('change', function (ev) {
        var c = ev.target.closest && ev.target.closest('.campo--error');
        if (c) validarCampo(ev.target);
      });
    });
    $$('[data-cabina]').forEach(function (a) {
      a.addEventListener('click', function () {
        var r = document.querySelector('input[name="cabina"][value="' + a.getAttribute('data-cabina') + '"]');
        if (r) r.checked = true;
      });
    });
    $$('[data-avisame]').forEach(function (a) {
      a.addEventListener('click', function () {
        var sel = document.querySelector('form[name="avisame"] select[name="destino"]');
        if (!sel) return;
        var op = Array.prototype.find.call(sel.options, function (o) { return o.getAttribute('data-slug') === a.getAttribute('data-avisame'); });
        if (op) sel.value = op.value;
      });
    });
  }

  /* ── Copiar y compartir ────────────────────────────────────────────────── */
  function avisoTemporal(boton, texto) {
    var t = $('span', boton);
    if (!t) return;
    var o = t.textContent;
    t.textContent = texto;
    setTimeout(function () { t.textContent = o; }, 2000);
  }
  function copiarYCompartir() {
    $$('[data-copiar]').forEach(function (b) {
      b.addEventListener('click', function () {
        if (!navigator.clipboard) return;
        navigator.clipboard.writeText(b.getAttribute('data-copiar')).then(function () { avisoTemporal(b, 'Copiado'); });
      });
    });
    $$('[data-compartir]').forEach(function (b) {
      b.addEventListener('click', function () {
        var url = location.origin + location.pathname;
        var datos = { title: b.getAttribute('data-titulo'), text: b.getAttribute('data-texto'), url: url };
        if (navigator.share) { navigator.share(datos).catch(function () {}); return; }
        if (navigator.clipboard) {
          navigator.clipboard.writeText(datos.text + ': ' + url).then(function () { avisoTemporal(b, 'Enlace copiado'); });
        } else {
          window.open('https://wa.me/?text=' + encodeURIComponent(datos.text + ': ' + url), '_blank', 'noopener');
        }
      });
    });
  }

  /* ── Barra de reserva fija (celular) ───────────────────────────────────── */
  function barraReserva() {
    var barra = $('[data-barra-reserva]'), hero = $('.exc-hero'), pie = $('.pie');
    if (!barra || !hero || !('IntersectionObserver' in window)) return;
    var heroVisible = true, pieVisible = false;
    function pintar() { barra.classList.toggle('visible', !heroVisible && !pieVisible); }
    new IntersectionObserver(function (e) { heroVisible = e[0].isIntersecting; pintar(); }, { rootMargin: '0px 0px -35% 0px' }).observe(hero);
    if (pie) new IntersectionObserver(function (e) { pieVisible = e[0].isIntersecting; pintar(); }).observe(pie);
  }

  /* ── Hoja de Google: precios, cupos y ofertas que edita la agencia ─────── */
  function normalizar(s) {
    return String(s || '').trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '_');
  }
  function leerCsv(texto) {
    var filas = [], fila = [], campo = '', comillas = false;
    for (var i = 0; i < texto.length; i++) {
      var c = texto[i];
      if (comillas) {
        if (c === '"' && texto[i + 1] === '"') { campo += '"'; i++; }
        else if (c === '"') comillas = false;
        else campo += c;
      } else if (c === '"') comillas = true;
      else if (c === ',') { fila.push(campo); campo = ''; }
      else if (c === '\n' || c === '\r') {
        if (c === '\r' && texto[i + 1] === '\n') i++;
        fila.push(campo); filas.push(fila); fila = []; campo = '';
      } else campo += c;
    }
    if (campo || fila.length) { fila.push(campo); filas.push(fila); }
    var cab = (filas.shift() || []).map(normalizar);
    return filas.filter(function (f) { return f.some(function (x) { return x.trim(); }); }).map(function (f) {
      var o = {};
      cab.forEach(function (k, i) { o[k] = (f[i] || '').trim(); });
      return o;
    });
  }
  function numero(v) { var n = parseFloat(String(v || '').replace(/[^0-9.]/g, '')); return isNaN(n) ? null : n; }
  function pintarEstado(el, fila) {
    var cupos = parseInt(fila.cupos, 10), estado = normalizar(fila.estado);
    var txt = null;
    if (estado.indexOf('agotad') > -1 || cupos === 0) txt = 'Agotado';
    else if (!isNaN(cupos)) txt = cupos <= 10 ? 'Últimos ' + cupos + ' cupos' : 'Quedan ' + cupos + ' cupos';
    if (!txt) return;
    var punto = $('.punto', el);
    el.textContent = txt;
    if (punto) el.insertBefore(punto, el.firstChild);
  }
  function aplicarHoja(tab, filas) {
    var porId = {};
    filas.forEach(function (f) { if (f.id) porId[normalizar(f.id)] = f; });
    $$('[data-dato^="' + tab + ':"]').forEach(function (el) {
      var partes = el.getAttribute('data-dato').split(':'), fila = porId[partes[1]];
      if (!fila) return;
      var fmt = el.getAttribute('data-formato');
      if (fmt === 'estado') { pintarEstado(el, fila); return; }
      var valor = fila[partes[2]];
      if (!valor) return;
      var n = numero(valor);
      if (fmt === 'desde-usd' && n !== null) { el.innerHTML = 'Desde <strong>' + usd(n) + '</strong> por noche'; return; }
      if (fmt === 'rd' && n !== null) el.textContent = rd(n);
      else if (fmt === 'usd' && n !== null) el.textContent = usd(n);
      else if (!fmt) el.textContent = valor;
    });
    if (tab !== 'salidas') return;
    var lista = (CONFIG.reserva && CONFIG.reserva.excursiones) || [];
    filas.forEach(function (f) {
      var id = normalizar(f.id);
      ['santiago', 'puerto-plata'].forEach(function (sid) {
        var n = numero(f['precio_' + sid.replace('-', '_')]);
        if (n === null) return;
        $$('[data-calc="' + id + '"] input[name="calc-salida"][value="' + sid + '"]').forEach(function (r) { r.setAttribute('data-precio', n); });
        lista.forEach(function (x) {
          if (x.slug !== id) return;
          x.salidas.forEach(function (s) { if (s.id === sid) s.precio = n; });
          var g = $('.opciones--salida .opciones__grid');
          if (g) $$('input[name="salida"][value="' + sid + '"]', g).forEach(function (r) {
            r.setAttribute('data-precio', n);
            var d = r.parentNode.querySelector('.opcion__d');
            if (d && x.slug === ($('input[name="excursion"]:checked') || {}).value) d.textContent = rd(n) + ' por persona';
          });
        });
      });
    });
    document.dispatchEvent(new Event('esc:precios'));
  }
  function hoja() {
    var h = CONFIG.hoja;
    if (!h || !h.id || !window.fetch) return;
    var tabs = {};
    $$('[data-dato]').forEach(function (el) { tabs[el.getAttribute('data-dato').split(':')[0]] = true; });
    if (CONFIG.reserva) tabs.salidas = true;
    Object.keys(tabs).forEach(function (tab) {
      var nombre = (h.pestanas && h.pestanas[tab]) || tab;
      var clave = 'hoja:' + h.id + ':' + nombre;
      try {
        var c = JSON.parse(sessionStorage.getItem(clave) || 'null');
        if (c && Date.now() - c.t < 5 * 60 * 1000) { aplicarHoja(tab, c.f); return; }
      } catch (e) { /* sin almacenamiento */ }
      var ctrl = window.AbortController ? new AbortController() : null;
      var reloj = ctrl ? setTimeout(function () { ctrl.abort(); }, 6000) : null;
      fetch('https://docs.google.com/spreadsheets/d/' + h.id + '/gviz/tq?tqx=out:csv&sheet=' + encodeURIComponent(nombre), ctrl ? { signal: ctrl.signal } : {})
        .then(function (r) { return r.ok ? r.text() : Promise.reject(r.status); })
        .then(function (t) {
          if (reloj) clearTimeout(reloj);
          var filas = leerCsv(t);
          try { sessionStorage.setItem(clave, JSON.stringify({ t: Date.now(), f: filas })); } catch (e) { /* lleno */ }
          aplicarHoja(tab, filas);
        })
        .catch(function () { /* si falla, se quedan los precios publicados */ });
    });
  }

  /* ── Botón flotante de WhatsApp: en el inicio aparece después de la portada ── */
  function flotante() {
    var b = $('.flotante'), portada = $('.portada');
    if (!b || !portada || !('IntersectionObserver' in window)) { if (b) b.classList.add('visible'); return; }
    new IntersectionObserver(function (e) { b.classList.toggle('visible', !e[0].isIntersecting); }, { threshold: 0.15 }).observe(portada);
  }

  /* ── Aviso de vista previa ────────────────────────────────────────────── */
  function aviso() {
    var a = $('[data-aviso]');
    if (!a) return;
    try { if (sessionStorage.getItem('aviso-visto')) { a.hidden = true; return; } } catch (e) { /* nada */ }
    var b = $('[data-aviso-cerrar]', a);
    if (b) b.addEventListener('click', function () {
      a.hidden = true;
      try { sessionStorage.setItem('aviso-visto', '1'); } catch (e) { /* nada */ }
    });
  }

  /* ── Ofertas con fecha de vencimiento: se ocultan solas al pasar la fecha ── */
  function vencimientos() {
    var d = new Date(), hoy = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
    $$('[data-vence]').forEach(function (el) {
      if (hoy <= el.getAttribute('data-vence')) return;
      el.hidden = true;
      // lo que se muestra en su lugar (un hermano con data-vencida)
      var alt = el.nextElementSibling;
      if (alt && alt.hasAttribute('data-vencida')) alt.hidden = false;
    });
  }

  /* ── Arranque ──────────────────────────────────────────────────────────── */
  [vencimientos, cabecera, menu, aviso, flotante, videoPortada, tablero, cuentas, carruseles, filtros, contadores, calculadoras, formularios, copiarYCompartir, barraReserva, hoja]
    .forEach(function (fn) { try { fn(); } catch (e) { if (window.console) console.error(e); } });
})();

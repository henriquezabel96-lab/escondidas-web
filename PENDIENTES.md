# Datos pendientes para completar la web

El sitio está en versión final (`borrador: false` en `contenido/datos.mjs`) y en línea en
https://escondidasmultiservices.com. Para revisar con los recuadros punteados de datos
pendientes: `BORRADOR=1 node build.mjs`.

Última revisión: 26 de noviembre de 2026.

---

## Lo que falta de verdad (bloquea a un cliente)

### Crucero de Año Nuevo (Costa Pacifica) — sección apagada el 26 nov
`secciones.cruceros: false` en `contenido/datos.mjs`. Sale del menú, del pie, del mosaico del
inicio y de la franja de la portada. `/cruceros/` y `/cruceros/ano-nuevo/` redirigen a `/contacto/`,
así que los enlaces ya compartidos no se caen. Mientras tanto los cruceros se cotizan desde
"También te cotizamos" en el inicio y desde el formulario de contacto.
Para encenderla de nuevo: `cruceros: true` y devolver su imagen para compartir en `herramientas/og.mjs`.
- [ ] Fecha, cantidad de noches y puerto de salida
- [ ] Itinerario por día (puertos)
- [ ] Precio por persona de cada cabina: interior, exterior y balcón
- [ ] Depósito para separar
- [ ] Qué incluye (comidas, entretenimiento, propinas e impuestos)

### Las 5 excursiones nuevas (Ballenas, Cayo Arena, Montecristi, El Dorado, Tierra Tropical)
Hoy solo se ve el flyer. Se van completando poco a poco, una por una, según Pedro mande los datos.
- [ ] Ballenas: ¿qué significa "DE 4 A 10 AÑOS" debajo de los precios? ¿Es el precio de niños? ¿Hay precio de adulto?
- [ ] Cayo Arena, Montecristi y El Dorado: ¿salen solo desde Santiago o también desde Puerto Plata, y a qué precio?
- [ ] Depósito para separar en cada una (la web usa RD$1,000 por ahora)
- [ ] Qué incluye, hora y punto de salida e itinerario de cada una
- [ ] Tierra Tropical: fecha exacta y precio
- [ ] Agregar sus filas a la pestaña "salidas" de la hoja (ids: ballenas-cayo-levantado, cayo-arena, montecristi, tierra-tropical, el-dorado-park)

### Excursión Macao (17 de enero)
- [ ] Hora aproximada de regreso
- [ ] Niños: completar la frase "En caso de llevar…" (precio o condición)

---

## Lo que mejora la página (no bloquea)

### Fotos y videos
- [ ] Fotos reales de la Cueva Taína y de la casa típica. Son las dos últimas imágenes hechas con IA, marcadas como "ilustrativa"
- [ ] Video original del grupo frente a los buggies: el del Drive pesa 1.4 MB y se ve borroso en pantalla grande
- [ ] Autor y licencia de la foto del acantilado de Playa Macao (Wikimedia). Es la única que queda sin crédito confirmado y en uso
- [ ] Confirmar permiso de la foto aérea de Hard Rock (o cambiarla por una del mayorista)
- [ ] Confirmar que las personas que salen en las fotos de Macao aceptan aparecer en la web
- [x] Fotos reales de Macao: grupo, brindis y amigas en el buggy, en la portada y en la excursión (26 nov)
- [x] Foto propia de la Basílica de Higüey, con cielo azul (26 nov)
- Sin usar en ninguna página, con licencia sin confirmar: `basilica-higuey`, `basilica-aerea`, `altagracia-cuadro`. Se pueden borrar de `herramientas/medios.py`, de `fotos` en `datos.mjs` y de `public/img/f/`

### Testimonios
- [ ] 3 testimonios reales con permiso del cliente (texto, nombre y viaje). Hoy la sección de fotos sale sin testimonios

### Decisiones de Pedro
- [ ] Términos y condiciones: siguen diciendo "hoteles, paquetes y cruceros" aunque la sección de paquetes está apagada. ¿Se quita la palabra o se deja?
- [ ] Paquetes: la sección está apagada (`secciones.paquetes` en `contenido/datos.mjs`). Al volver, agregar los paquetes reales y su imagen para compartir en `herramientas/og.mjs`
- [ ] (Opcional) Registro de la agencia y años organizando viajes

### Promoción
- [ ] Registrar el sitio en Google Search Console para que Google lo indexe más rápido

---

## Listo

### Agencia
- [x] Horario, Instagram (@escondidasmultiservices), cuentas para depósitos (se envían por WhatsApp), aceptan tarjeta
- [x] WhatsApp: queda solo el 829-817-8000. El 809-882-7271 se quitó el 26 nov
- [x] Términos y condiciones revisados y aprobados por Pedro

### Dominio y publicación
- [x] escondidasmultiservices.com en línea con https (25 nov 2026)
- [x] Hostinger DNS: A @ → 75.2.60.5, CNAME www → escondidas-nueva.netlify.app. Correo (MX y TXT) sin tocar
- [x] Redirecciones de la página vieja de Hostinger (/services, /contact, /destinations)
- [x] Insignia "Powered by Netlify" apagada (26 nov)

### Excursión Macao
- [x] Horas de salida (Puerto Plata 12:30 a. m., Santiago 2:00 a. m.) e itinerario
- [x] Punto de salida: Central 24 horas en Santiago y Total Energies en Puerto Plata, con enlace al mapa
- [x] Fecha límite de pago: 30 de diciembre de 2026
- [x] Cupos: 100 en total, 23 separados. Se actualiza desde la hoja
- [x] Requisito para manejar el buggy: licencia de conducir

### Ofertas de resorts (10 hoteles en línea)
- [x] Ocean Blue & Sand y Ocean El Faro (Black Friday, hasta el 30 nov)
- [x] Hard Rock Punta Cana (27 al 29 nov)
- [x] The Tropical Beach & Cofresí Palm y Presidential Suites (hasta el 23 dic)
- [x] Viva V Samaná, Viva Heavens, Viva Tangerine, Viva Dominicus Palace y Viva Miches (hasta el 30 nov)
- Cada oferta se oculta sola al día siguiente de su fecha (`vence` en `contenido/datos.mjs`)
- Para una oferta nueva: agregar el flyer en `herramientas/medios.py` y el hotel con su `oferta` en `datos.mjs`
- [x] Quitados Lopesan Costa Bávaro, Zemi Miches y Sunscape Dominicus (no tenían precio)
- Un hotel sin precio propio se oculta solo cuando vence su oferta. Para publicar uno fijo hace falta: precio desde, descripción, qué incluye, habitaciones y fotos (plantilla `hotelBase` en `datos.mjs`)

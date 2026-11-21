# Sitio web · Escondidas Multiservices

Sitio estático para Netlify: 19 páginas (Fase 1 + Fase 2), formularios con Netlify Forms, enlaces directos a WhatsApp y precios que se pueden actualizar desde una hoja de Google.

## Qué hay en cada carpeta

| Carpeta / archivo | Para qué sirve |
|---|---|
| `contenido/datos.mjs` | **Todo el contenido**: precios, fechas, textos, hoteles, crucero, contacto. Los `null` son datos pendientes. |
| `plantillas/` | El HTML de cada página. |
| `public/` | Estilos, JavaScript, fuentes, fotos, video y logo. |
| `build.mjs` | Genera el sitio completo en `dist/`. |
| `dist/` | El sitio listo para subir (se crea con `node build.mjs`). |
| `plantilla-hoja/` | Las 3 pestañas de la hoja de Google, en CSV, para importarlas. |
| `PENDIENTES.md` | Lista de datos que faltan por confirmar con la agencia. |
| `herramientas/` | Scripts internos: fotos, video, capturas, pruebas e imágenes para compartir. |

## Páginas

- Inicio
- Excursiones y la página de Macao, con calculadora de pagos y opción de guardar la fecha
- Reservar, en 4 pasos con código de reserva
- Cómo reservar y pagar
- Contacto
- Hoteles con filtro por zona y una ficha para cada uno de los 4 resorts
- Paquetes
- Cruceros y la página del Crucero de Año Nuevo
- Términos, privacidad, créditos de fotos, gracias y 404

## Publicar en Netlify

### Opción A · Subir la carpeta (desde una computadora)

1. Descomprime `escondidas-web-netlify.zip`.
2. En Netlify, abre el sitio y ve a **Deploys**.
3. Arrastra la carpeta descomprimida a la zona de deploy. Netlify pide la carpeta, no el zip.

> Para revisar sin tocar la web actual, súbela primero como **sitio nuevo**. Así queda con una dirección de prueba.

### Opción B · GitHub (recomendada para trabajar desde el celular)

1. Sube el contenido de `escondidas-web-codigo.zip` a un repositorio de GitHub.
2. En Netlify, entra a **Add new site → Import from Git** y elige el repositorio. Netlify lee `netlify.toml`: comando `node build.mjs`, carpeta `dist`.
3. Cada cambio que se sube al repositorio se publica solo.

### Después del primer deploy (una sola vez)

1. **Formularios.** En Netlify, ve a **Forms → Enable form detection** y vuelve a publicar. Sin este paso, los formularios abren WhatsApp con los datos, pero no se guardan en Netlify.
2. **Aviso por correo.** Ve a **Site configuration → Notifications → Emails and webhooks → Form submission notifications → Add notification → Email notification**. Pon `info@escondidasmultiservices.com`.
3. **Dominio.** Conecta escondidasmultiservices.com desde Hostinger con estos dos registros:
   - Registro **A**: nombre `@`, valor `75.2.60.5`
   - Registro **CNAME**: nombre `www`, valor `escondidasmultiservices.netlify.app`

   No toques los registros MX ni TXT, que son los del correo.

En los planes de créditos de Netlify, los envíos de formularios son gratis y sin límite.

## Formularios (7)

Cada formulario guarda el envío en Netlify y además arma el mensaje de WhatsApp con los datos. Si el envío falla, igual ofrece el WhatsApp.

| Nombre en Netlify | Dónde está |
|---|---|
| `reserva` | /reservar/ · genera un código tipo `ESC-MAC-7K3Q` |
| `avisame` | /excursiones/ · "Avísame cuando haya fecha" |
| `cotizacion-hotel` | /hoteles/ y la ficha de cada hotel |
| `cotizacion-paquete` | /paquetes/ |
| `cotizacion-crucero` | /cruceros/ |
| `crucero-grupo` | /cruceros/ano-nuevo/ |
| `contacto` | /contacto/ |

Todos tienen un campo trampa contra spam (honeypot). Netlify además filtra el spam por su cuenta.

## Enlaces cortos (`_redirects`)

| Enlace | Va a |
|---|---|
| `/macao` | /excursiones/macao/ (los enlaces viejos siguen funcionando) |
| `/reservar/macao` | La reserva con Macao ya elegida |
| `/wa` y `/whatsapp` | El chat de WhatsApp |
| `/ig` y `/instagram` | El perfil de Instagram |

## Cambiar contenido

1. Edita `contenido/datos.mjs`.
2. Ejecuta `node build.mjs`.
3. Sube `dist/`, o haz commit si usas GitHub.

Para revisar en local, ejecuta `node herramientas/servidor.mjs` y abre http://localhost:4173.

## Hoja de Google (precios, cupos y ofertas)

1. Crea una hoja con 3 pestañas: **salidas**, **hoteles** y **cruceros**. Puedes importar los CSV de `plantilla-hoja/`.
2. En **Compartir**, elige "Cualquier persona con el enlace" con permiso de **Lector**.
3. Copia el ID de la hoja: es lo que va entre `/d/` y `/edit` en la dirección.
4. Pégalo en `contenido/datos.mjs`, en `hoja.id`, y genera el sitio.

Desde ese momento, lo que Pedro cambie en la hoja se ve en la web en pocos minutos, sin volver a publicar:
- Precios
- Cupos ("Quedan 12 cupos", "Últimos 8 cupos", "Agotado")
- Precio "desde" de los hoteles
- Precio de las cabinas

Si la hoja no responde, la web muestra los precios publicados.

## Antes de lanzar

1. Completar `PENDIENTES.md`.
2. Poner `borrador: false` en `contenido/datos.mjs`. Esto quita los recuadros punteados y los ejemplos, y permite que Google indexe la web.
3. Generar el sitio y publicarlo.

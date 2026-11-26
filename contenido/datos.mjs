// ─────────────────────────────────────────────────────────────────────────────
// CONTENIDO DEL SITIO · Escondidas Multiservices
// Todo lo que se ve en la web sale de aquí. Para cambiar un precio, una fecha
// o un texto, se cambia en este archivo y se vuelve a generar el sitio.
//
// Los valores en null son datos PENDIENTES. Mientras `borrador` sea true,
// el sitio los muestra como recuadros punteados "por confirmar". Con
// `borrador: false` esos recuadros desaparecen y las tarjetas marcadas con
// `pendiente: true` (viajes de ejemplo, testimonios, etc.) no se publican.
// ─────────────────────────────────────────────────────────────────────────────

// Lugares de donde salen todas las excursiones
export const PUNTOS_SALIDA = {
  santiago: 'Central 24 horas, en la Av. 27 de Febrero esquina Estrella Sadhalá',
  'puerto-plata': 'Total Energies, casi frente a la entrada del teleférico',
};

export const sitio = {
  borrador: false, // versión final desde el 25 nov 2026 (dominio conectado). Para revisar con recuadros: BORRADOR=1 node build.mjs
  nombre: 'Escondidas Multiservices',
  nombreCorto: 'Escondidas',
  lema: 'sueña, explora, descubre',
  // Dominio final (Hostinger → Netlify). Si aún no apunta, usar urlNetlify.
  url: 'https://escondidasmultiservices.com',
  urlNetlify: 'https://escondidasmultiservices.netlify.app',
  descripcion:
    'Agencia de viajes en Santiago: excursiones en grupo desde Santiago y Puerto Plata, resorts todo incluido y cruceros. Separa con poco y paga en partes.',
  whatsapp: [
    { numero: '18298178000', visible: '829-817-8000' },
    { numero: '18098827271', visible: '809-882-7271' },
  ],
  correo: 'info@escondidasmultiservices.com',
  direccion: {
    calle: 'C/ Proyecto #3, local B8, Edificio Reina',
    sector: 'Los Jardines Metropolitanos',
    ciudad: 'Santiago de los Caballeros',
    pais: 'República Dominicana',
    mapa: 'Edificio Reina, Los Jardines Metropolitanos, Santiago de los Caballeros',
  },
  horario: 'Lunes a viernes de 8:30 a. m. a 5:00 p. m. y sábados de 9:00 a. m. a 1:00 p. m.',
  gerente: 'Lic. Pedro Hernández',
  redes: {
    instagram: 'escondidasmultiservices',
    facebook: null,
    tiktok: null,
  },
  registro: null, // PENDIENTE: número de registro de la agencia (si aplica)
  aniosOperando: null, // PENDIENTE
  // Hoja de Google que Pedro edita (precios, cupos y ofertas). Ver README.
  hoja: {
    id: '1siDAAZ4JCMg3osG8L21eyvuYuAzxGcTctpVBARL8WPo', // Hoja "Escondidas · Precios y cupos de la web" (compartir: cualquiera con el enlace, lector)
    pestanas: { salidas: 'salidas', hoteles: 'hoteles', cruceros: 'cruceros' },
  },
  pagos: {
    cuentas: [], // Los datos de la cuenta se envían por WhatsApp al confirmar la reserva
    efectivo: 'En la oficina de Los Jardines Metropolitanos, Santiago.',
    tarjeta: 'Sí, aceptamos pagos con tarjeta.',
  },
  politicas: {
    deposito:
      'El depósito no es reembolsable. En algunos casos se devuelve como crédito para otro viaje, y en casos de fuerza mayor se devuelve en efectivo. Los tiempos de reembolso pueden variar según el método de pago y las condiciones.',
    cambios:
      'En viajes nacionales que no incluyen reserva de hotel, puedes pasar tu cupo a otra persona (cambio de nombre). En viajes internacionales o con reserva de hotel, los cambios pueden tener cargos extra.',
    cancelacionAgencia: 'Si la agencia cancela el viaje, te devolvemos el monto total.',
    menores: 'Depende de la actividad. En cada viaje te decimos si pueden ir niños y cuánto pagan.',
    clima:
      'Depende de la actividad. En muchos casos la excursión se pospone para el domingo siguiente. Si el COE emite una advertencia, por la seguridad de los viajeros esperamos a que la provincia o el lugar vuelva a alerta verde. Si no puedes asistir en la nueva fecha, se te genera un crédito, porque se considera fuerza mayor.',
  },
};

// Zonas de hoteles
export const zonas = [
  { id: 'punta-cana', nombre: 'Punta Cana y Bávaro' },
  { id: 'miches', nombre: 'Miches' },
  { id: 'la-romana', nombre: 'La Romana y Bayahíbe' },
  { id: 'samana', nombre: 'Samaná' },
  { id: 'puerto-plata', nombre: 'Puerto Plata' },
];

// ─── EXCURSIONES ─────────────────────────────────────────────────────────────
export const excursiones = [
  {
    slug: 'macao',
    codigo: 'MAC',
    destacada: true,
    nombre: 'Macao + Basílica de Higüey',
    nombreCorto: 'Macao',
    estado: 'activa',
    fecha: '2027-01-17',
    horaSalida: { 'puerto-plata': '12:30 a. m.', santiago: '2:00 a. m.' }, // madrugada del domingo
    horaCuenta: '00:30', // la cuenta regresiva llega a cero con la primera salida
    puntoEncuentro: PUNTOS_SALIDA,
    region: 'Higüey y Punta Cana',
    salidas: [
      { id: 'santiago', ciudad: 'Santiago', precio: 3995 },
      { id: 'puerto-plata', ciudad: 'Puerto Plata', precio: 4450 },
    ],
    deposito: 1000,
    precioNino: null,
    notaNinos: 'No es recomendable llevar niños a esta excursión. Si aun así quieres llevarlos, escríbenos antes de reservar.',
    requisitoBuggy: 'Para manejar el buggy necesitas licencia de conducir.',
    politicaCambios:
      'El depósito no es reembolsable, pero como es un viaje nacional sin hotel puedes pasarle tu cupo a otra persona. En algunos casos se devuelve como crédito para otro viaje, y en casos de fuerza mayor en efectivo.',
    fechaLimitePago: '2026-12-30',
    cuposTotal: 100,
    cupos: 77, // 100 en total, 23 ya separados (también se puede cambiar desde la hoja de Google)
    palabraClave: 'MACAO',
    foto: 'macao-buggy-saludo',
    resumen:
      'Un día completo con tu coro: buggies, Playa Macao, la Basílica de Higüey, Cueva Taína y casa típica. Con desayuno, almuerzo buffet y transporte desde Santiago o Puerto Plata.',
    incluye: [
      { icono: 'bus', texto: 'Transporte ida y vuelta' },
      { icono: 'cafe', texto: 'Desayuno' },
      { icono: 'plato', texto: 'Almuerzo buffet' },
      { icono: 'buggy', texto: 'Buggies dobles' },
      { icono: 'ola', texto: 'Playa Macao' },
      { icono: 'templo', texto: 'Basílica de Higüey' },
      { icono: 'cueva', texto: 'Cueva Taína' },
      { icono: 'casa', texto: 'Casa típica' },
      { icono: 'regalo', texto: 'Rifas y animación' },
    ],
    lugares: [
      {
        nombre: 'Buggies dobles',
        texto: 'Buggies de dos puestos por caminos de tierra hasta la orilla. Llegas lleno de polvo y con la sonrisa puesta.',
        foto: 'buggy-casco',
      },
      {
        nombre: 'Playa Macao',
        texto: 'Arena dorada, agua turquesa y acantilados. Tiempo libre para bañarte y tomar fotos.',
        foto: 'macao-acantilado',
      },
      {
        nombre: 'Basílica de Higüey',
        texto: 'El santuario de la Virgen de la Altagracia, con su arco de concreto que se ve desde lejos.',
        foto: 'basilica-higuey',
      },
      {
        nombre: 'Cueva Taína',
        texto: 'Parada en una cueva natural de agua dulce, de las que usaban los taínos.',
        foto: 'cueva-taina',
      },
      {
        nombre: 'Casa típica',
        texto: 'Una casa dominicana tradicional con muestras de café, cacao y productos locales.',
        foto: 'casa-tipica',
      },
    ],
    itinerario: [
      { hora: '12:30 a. m.', titulo: 'Salida desde Puerto Plata' },
      { hora: '2:00 a. m.', titulo: 'Salida desde Santiago' },
      { hora: '6:30 a. m.', titulo: 'Llegada a la Basílica de Higüey' },
      { hora: '8:30 a. m.', titulo: 'Playa Macao' },
      { hora: '12:30 p. m.', titulo: 'Almuerzo buffet, hasta la 1:00 p. m.' },
      { hora: '2:30 p. m.', titulo: 'Recorrido en buggy, con Cueva Taína y casa típica' },
      { hora: null, titulo: 'Regreso con rifas y animación' },
    ],
    llevar: [
      'Traje de baño y toalla',
      'Protector solar y gafas de sol',
      'Ropa y tenis que se puedan ensuciar',
      'Muda de ropa para el regreso',
      'Efectivo para gastos personales',
    ],
    galeria: [
      'macao-grupo-buggies',
      'macao-brindis',
      'macao-amigas-paz',
      'buggy-casco',
      'buggy-polvo',
      'macao-amigas-risas',
      'buggy-camino',
      'buggy-manejando',
    ],
    faq: [
      {
        p: '¿Cómo separo mi cupo?',
        r: 'Llena la reserva en esta página o escríbenos por WhatsApp. Haces el depósito de RD$1,000 por persona y te enviamos el comprobante con el cupo a tu nombre.',
      },
      {
        p: '¿Puedo pagar el resto en partes?',
        r: 'Sí. Después del depósito abonas lo que falta en partes, como te quede cómodo, siempre antes del día de la excursión.',
      },
      {
        p: '¿A qué hora sale la guagua?',
        r: 'En la madrugada del domingo 17: desde Puerto Plata a las 12:30 a. m. y desde Santiago a las 2:00 a. m. Antes del viaje te confirmamos por WhatsApp el punto exacto de salida.',
      },
      { p: '¿Hasta cuándo tengo para pagar?', r: 'Tienes hasta el 30 de diciembre de 2026 para completar el pago.' },
      { p: '¿Hay que saber manejar para los buggies?', r: 'Para manejar el buggy necesitas tener licencia de conducir.' },
      { p: '¿Pueden ir niños?', r: 'No es recomendable llevar niños a esta excursión. Si aun así quieres llevarlos, escríbenos antes de reservar.' },
      {
        p: '¿Qué pasa si no puedo ir?',
        r: 'El depósito no es reembolsable, pero como es un viaje nacional sin hotel puedes pasarle tu cupo a otra persona. En algunos casos se devuelve como crédito para otro viaje, y en casos de fuerza mayor en efectivo.',
      },
      {
        p: '¿Qué pasa si llueve?',
        r: 'En muchos casos la excursión se pospone para el domingo siguiente. Si el COE emite una advertencia, esperamos a que la zona vuelva a alerta verde. Si no puedes ir en la nueva fecha, te queda un crédito.',
      },
    ],
  },
  // Próximas salidas (flyers de la agencia, nov 2026). Sin página propia: se reservan en /reservar/.
  {
    slug: 'ballenas-cayo-levantado',
    codigo: 'BAL',
    nombre: 'Ballenas Jorobadas y Cayo Levantado',
    nombreCorto: 'Ballenas',
    region: 'Samaná',
    estado: 'activa',
    detalle: false,
    fecha: '2027-03-07',
    salidas: [
      { id: 'santiago', ciudad: 'Santiago', precio: 3995 },
      { id: 'puerto-plata', ciudad: 'Puerto Plata', precio: 4395 },
    ],
    deposito: 1000, // CONFIRMAR: se usa el depósito general de la agencia
    notaPrecio: 'por persona',
    foto: 'exc-ballenas',
    flyer: 'flyer-ballenas',
    resumen: 'Santuario de las ballenas jorobadas y día de playa en Cayo Levantado.',
  },
  {
    slug: 'cayo-arena',
    codigo: 'CAY',
    nombre: 'Cayo Arena VIP',
    region: '',
    estado: 'activa',
    detalle: false,
    fecha: '2027-04-18',
    salidas: [{ id: 'santiago', ciudad: 'Santiago', precio: 2995 }], // CONFIRMAR punto de salida
    deposito: 1000, // CONFIRMAR: se usa el depósito general de la agencia
    notaPrecio: 'por persona',
    foto: 'exc-cayo-arena',
    flyer: 'flyer-cayo-arena',
    resumen: 'Excursión VIP al cayo de arena blanca y agua cristalina.',
  },
  {
    slug: 'montecristi',
    codigo: 'MON',
    nombre: 'Montecristi y banco de arena Grand Grosier',
    nombreCorto: 'Montecristi',
    region: 'Montecristi',
    estado: 'activa',
    detalle: false,
    fecha: '2027-05-22',
    salidas: [{ id: 'santiago', ciudad: 'Santiago', precio: 3695 }], // CONFIRMAR punto de salida
    deposito: 1000, // CONFIRMAR: se usa el depósito general de la agencia
    notaPrecio: 'por persona',
    foto: 'exc-montecristi',
    flyer: 'flyer-montecristi',
    resumen: 'El banco de arena Grand Grosier, en medio del agua turquesa de Montecristi.',
  },
  {
    slug: 'tierra-tropical',
    codigo: 'TRO',
    nombre: 'Tierra Tropical: girasoles y Feria del Mango',
    nombreCorto: 'Tierra Tropical',
    region: 'Baní',
    estado: 'proximamente',
    detalle: false,
    fecha: null,
    fechaAprox: 'Junio 2027',
    fechaOrden: '2027-06-15',
    salidas: [{ id: 'santiago', ciudad: 'Santiago', precio: null }],
    deposito: null,
    notaPrecio: 'por persona',
    foto: 'exc-tierra-tropical',
    flyer: 'flyer-tierra-tropical',
    resumen: 'Recogida de girasoles y Feria del Mango en Baní. Fecha y precio por confirmar.',
  },
  {
    slug: 'el-dorado-park',
    codigo: 'DOR',
    nombre: 'El Dorado Park',
    region: '',
    estado: 'activa',
    detalle: false,
    fecha: '2027-07-24',
    salidas: [{ id: 'santiago', ciudad: 'Santiago', precio: 5595 }], // CONFIRMAR punto de salida
    deposito: 1000, // CONFIRMAR: se usa el depósito general de la agencia
    notaPrecio: 'por persona',
    foto: 'exc-el-dorado',
    flyer: 'flyer-el-dorado',
    resumen: 'Día de toboganes y piscinas en El Dorado Park.',
  },
];

// ─── HOTELES ─────────────────────────────────────────────────────────────────
// Plantilla para un hotel con ficha completa y precio propio (hoy no hay ninguno publicado).
const hotelBase = {
  plan: 'Todo incluido',
  desde: null, // PENDIENTE: precio por persona por noche en habitación doble (US$)
  descripcion: null, // PENDIENTE
  incluye: [null, null, null, null, null], // PENDIENTE: restaurantes, actividades, club de niños, wifi, impuestos
  habitaciones: [
    { nombre: null, capacidad: null, desde: null },
    { nombre: null, capacidad: null, desde: null },
    { nombre: null, capacidad: null, desde: null },
  ],
  galeriaPendiente: ['Piscina', 'Habitación', 'Playa', 'Restaurante'],
};

// Hoteles que se publican solo con su oferta: la tarjeta se oculta sola cuando la oferta vence.
// `galeria`: fotos extra del hotel (slugs del mapa de fotos). `fotoTarjeta`: foto limpia para la tarjeta
// (si no hay, la tarjeta usa `foto`). Así el flyer completo se ve en la página del hotel y no en la lista.
const soloOferta = { plan: null, desde: null, descripcion: null, incluye: [], habitaciones: [], galeria: [], galeriaPendiente: [] };

// Ofertas vigentes: van primero. Cada oferta se oculta sola en la web después de `vence` (AAAA-MM-DD).
export const hoteles = [
  {
    ...soloOferta,
    slug: 'ocean-blue-sand',
    nombre: 'Ocean Blue & Sand',
    zona: 'punta-cana',
    lugar: 'Bávaro, Punta Cana',
    foto: 'flyer-ocean-blue-sand',
    fotoTarjeta: 'hotel-ocean-blue-sand',
    oferta: {
      titulo: 'Oferta Black Friday',
      resumen: 'Desde US$182',
      precios: [['Desde', 182]],
      vigencia: 'Para reservar hasta el 30 de noviembre de 2026, con viajes hasta el 23 de diciembre de 2027.',
      condiciones: ['1er niño gratis (3 a 12 años) del 1 de mayo al 30 de junio y del 17 de agosto al 31 de octubre.'],
      vence: '2026-11-30',
      flyer: 'flyer-ocean-blue-sand',
    },
  },
  {
    ...soloOferta,
    slug: 'ocean-el-faro',
    nombre: 'Ocean El Faro',
    zona: 'punta-cana',
    lugar: 'Punta Cana',
    foto: 'flyer-ocean-el-faro',
    fotoTarjeta: 'hotel-ocean-el-faro',
    oferta: {
      titulo: 'Oferta Black Friday',
      resumen: 'Desde US$196',
      precios: [['Desde', 196]],
      vigencia: 'Para reservar hasta el 30 de noviembre de 2026, con viajes hasta el 23 de diciembre de 2027.',
      condiciones: ['1er niño gratis (3 a 12 años) del 1 de mayo al 30 de junio y del 17 de agosto al 31 de octubre.'],
      vence: '2026-11-30',
      flyer: 'flyer-ocean-el-faro',
    },
  },
  {
    ...soloOferta,
    slug: 'hard-rock-punta-cana',
    nombre: 'Hard Rock Punta Cana',
    zona: 'punta-cana',
    lugar: 'Punta Cana',
    foto: 'hardrock',
    galeria: ['hardrock-piscina'],
    oferta: {
      titulo: 'Del 27 al 29 de noviembre',
      resumen: 'US$998 en ocupación doble, 3 días y 2 noches',
      precios: [['Ocupación doble', 998]],
      unidad: 'Tarifa por 3 días y 2 noches.',
      condiciones: ['2 niños gratis hasta los 17 años.', 'Tarifa sujeta a cambio y disponibilidad sin previo aviso.'],
      vence: '2026-11-27',
      flyer: 'flyer-hard-rock',
    },
  },
  {
    ...soloOferta,
    slug: 'tropical-beach-cofresi-palm',
    nombre: 'The Tropical Beach & Cofresí Palm',
    zona: 'puerto-plata',
    lugar: 'Cofresí, Puerto Plata',
    foto: 'flyer-tropical-cofresi',
    fotoTarjeta: 'hotel-tropical-cofresi',
    oferta: {
      titulo: 'Para reservar y viajar hasta el 23 de diciembre',
      resumen: 'Desde US$93 por persona por noche',
      precios: [['Fines de semana', 100], ['Días de semana', 93]],
      unidad: 'Por persona por noche.',
      condiciones: ['Mínimo 2 noches.', '1er niño gratis y el 2do paga US$50.', 'Días de semana: niños gratis.', 'Niños de 4 a 12 años.'],
      vence: '2026-12-23',
      flyer: 'flyer-tropical-cofresi',
    },
  },
  {
    ...soloOferta,
    slug: 'presidential-suites-lifestyle',
    nombre: 'Presidential Suites by Lifestyle',
    zona: 'puerto-plata',
    lugar: 'Cofresí, Puerto Plata',
    foto: 'flyer-presidential-suites',
    fotoTarjeta: 'hotel-presidential-suites',
    oferta: {
      titulo: 'Para reservar y viajar hasta el 23 de diciembre',
      resumen: 'US$164 por persona por noche',
      precios: [['Doble', 164], ['Niños (4 a 12 años)', 82]],
      unidad: 'Por persona por noche.',
      condiciones: ['Mínimo 2 noches.'],
      vence: '2026-12-23',
      flyer: 'flyer-presidential-suites',
    },
  },
];

// ─── PAQUETES ────────────────────────────────────────────────────────────────
// Sección apagada: la agencia todavía no confirma paquetes (nov 2026). No sale en el menú,
// el pie, el inicio ni el formulario de contacto, y no se genera /paquetes/.
// Para volver a mostrarla: `paquetes: true` y agregar aquí los paquetes reales.
export const secciones = { paquetes: false };
export const paquetes = [];

// ─── CRUCEROS ────────────────────────────────────────────────────────────────
export const cruceros = [
  {
    slug: 'ano-nuevo',
    nombre: 'Crucero de Año Nuevo',
    barco: 'Costa Pacifica',
    naviera: 'Costa Cruceros',
    foto: 'costa-pacifica',
    fecha: null, // PENDIENTE
    noches: null, // PENDIENTE
    puertoSalida: null, // PENDIENTE
    deposito: null, // PENDIENTE
    resumen: 'Recibe el Año Nuevo en el mar con el grupo de Escondidas: comidas, entretenimiento y varias noches de puerto en puerto.',
    itinerario: [
      { dia: 'Día 1', titulo: null, pendiente: 'Embarque en [puerto de salida]' },
      { dia: 'Día 2', titulo: null, pendiente: 'Puerto por confirmar' },
      { dia: 'Día 3', titulo: null, pendiente: 'Puerto por confirmar' },
      { dia: '31 de diciembre', titulo: 'Fiesta de Año Nuevo a bordo' },
      { dia: 'Último día', titulo: null, pendiente: 'Desembarque en [puerto]' },
    ],
    cabinas: [
      { nombre: 'Interior', texto: 'Sin ventana. La opción más económica.', precio: null },
      { nombre: 'Exterior', texto: 'Con ventana al mar.', precio: null },
      { nombre: 'Balcón', texto: 'Tu propio balcón para recibir el año.', precio: null },
    ],
    requisitos: ['Pasaporte vigente', 'Visa de EE. UU. o Schengen', null],
    incluye: [null, null, null], // PENDIENTE: comidas a bordo, entretenimiento, propinas/impuestos
  },
];

// ─── OTROS SERVICIOS (se cotizan por WhatsApp; páginas en la Fase 3) ─────────
export const otrosServicios = [
  { icono: 'avion', nombre: 'Boletos aéreos', texto: 'Te buscamos el mejor vuelo para tus fechas.', mensaje: 'Hola, quiero cotizar un boleto aéreo.' },
  { icono: 'auto', nombre: 'Rent car', texto: 'Vehículo listo para tus vacaciones.', mensaje: 'Hola, quiero cotizar un rent car.' },
  { icono: 'escudo', nombre: 'Seguros de viaje', texto: 'Viaja cubierto dentro y fuera del país.', mensaje: 'Hola, quiero cotizar un seguro de viaje.' },
  { icono: 'cuotas', nombre: 'Financiamiento', texto: 'Viaja ahora y paga por partes.', mensaje: 'Hola, quiero saber cómo funciona el financiamiento.' },
];

// ─── PREGUNTAS FRECUENTES GENERALES ──────────────────────────────────────────
export const faqGeneral = [
  {
    p: '¿Cómo separo mi cupo?',
    r: 'Reserva en la web o escríbenos por WhatsApp. Haces el depósito y te enviamos el comprobante con el cupo a tu nombre.',
  },
  {
    p: '¿Puedo pagar en partes?',
    r: 'Sí. Separas con un depósito y abonas el resto a tu ritmo, siempre antes de la fecha del viaje.',
  },
  {
    p: '¿Necesito visa para viajar fuera?',
    r: 'Depende del destino. Antes de reservar te decimos qué documentos pide cada viaje.',
  },
  {
    p: '¿Dónde están ubicados?',
    r: 'En el Edificio Reina, local B8, Los Jardines Metropolitanos, Santiago. También te atendemos completo por WhatsApp.',
  },
  {
    p: '¿Qué pasa si no puedo ir?',
    r: 'El depósito no es reembolsable. En viajes nacionales sin hotel puedes pasarle tu cupo a otra persona; en viajes internacionales o con hotel, los cambios pueden tener cargos extra.',
  },
  { p: '¿Qué pasa si la agencia cancela?', r: 'Te devolvemos el monto total.' },
];

// ─── TESTIMONIOS (solo con permiso del cliente) ──────────────────────────────
export const testimonios = [
  { texto: null, nombre: null, viaje: null, pendiente: true },
  { texto: null, nombre: null, viaje: null, pendiente: true },
  { texto: null, nombre: null, viaje: null, pendiente: true },
];

// ─── FOTOS: texto alternativo y crédito ──────────────────────────────────────
const propia = { autor: 'Escondidas Multiservices', licencia: 'Foto de una excursión de la agencia' };
const pendienteWiki = { autor: null, licencia: null, fuente: 'Wikimedia Commons' }; // PENDIENTE: autor y licencia

export const fotos = {
  'buggy-caravana': { alt: 'Caravana de buggies levantando polvo en un camino de tierra', credito: propia },
  'buggy-polvo': { alt: 'Buggies avanzando entre árboles y polvo bajo el cielo azul', credito: propia },
  'buggy-casco': { alt: 'Viajero con casco rojo y bandana manejando un buggy', credito: propia },
  'buggy-manejando': { alt: 'Manos al volante de un buggy en un camino de tierra', credito: propia },
  'buggy-amigas': { alt: 'Grupo de amigas con bandanas y cascos dentro de un buggy', credito: propia },
  'buggy-amigas-2': { alt: 'Amigas riendo dentro de un buggy lleno de lodo', credito: propia },
  'buggy-camino': { alt: 'Camino de tierra entre árboles verdes con buggies adelante', credito: propia },
  'buggy-volante': { alt: 'Volante de un buggy cubierto de lodo en pleno recorrido', credito: propia },
  // foco: hacia dónde se recorta la foto cuando el espacio es más alto o más ancho que ella
  'macao-grupo-buggies': { alt: 'El grupo completo con los brazos en alto frente a la fila de buggies', credito: propia, foco: '46% 72%' },
  'macao-buggy-saludo': { alt: 'Tres viajeros en un buggy lleno de lodo, uno saludando con la mano en alto', credito: propia, foco: '55% 45%' },
  'macao-amigas-paz': { alt: 'Dos amigas sonriendo y haciendo la señal de la paz dentro de un buggy', credito: propia, foco: '52% 45%' },
  'macao-amigas-risas': { alt: 'Amigas riendo en un buggy cubierto de lodo bajo el cielo azul', credito: propia, foco: '40% 48%' },
  'macao-brindis': { alt: 'Viajeras y viajeros con casco y bandana brindando bajo un techo de yagua', credito: propia, foco: '48% 50%' },
  'basilica-higuey': { alt: 'Fachada de la Basílica de Nuestra Señora de la Altagracia en Higüey', credito: pendienteWiki },
  'basilica-aerea': { alt: 'La Basílica de Higüey vista desde arriba, con la ciudad alrededor', credito: pendienteWiki },
  'altagracia-cuadro': { alt: 'Cuadro de la Virgen de la Altagracia', credito: pendienteWiki },
  'macao-acantilado': { alt: 'Acantilado verde frente al mar turquesa en Playa Macao', credito: pendienteWiki },
  'saona-playa': { alt: 'Playa de Isla Saona con palmeras inclinadas sobre el agua', credito: { autor: 'Danu Widjajanto y Oleg Yunakov', licencia: 'CC BY-SA 4.0', fuente: 'Wikimedia Commons' } },
  'saona-palmera': { alt: 'Palmera inclinada sobre el agua turquesa de Isla Saona', credito: { autor: 'Danu Widjajanto y Oleg Yunakov', licencia: 'CC BY-SA 4.0', fuente: 'Wikimedia Commons' } },
  'saona-cocoteros': { alt: 'Cocoteros sobre la arena blanca de Isla Saona', credito: { autor: 'Danu Widjajanto y Oleg Yunakov', licencia: 'CC BY-SA 4.0', fuente: 'Wikimedia Commons' } },
  'bahia-aguilas': { alt: 'Arena blanca y agua turquesa en Bahía de las Águilas', credito: { autor: 'jordina_co', licencia: 'CC BY-SA 2.0', fuente: 'Wikimedia Commons' } },
  'salto-limon': { alt: 'Cascada del Salto El Limón entre la vegetación de Samaná', credito: { autor: 'Daniel Lobo', licencia: 'CC BY 2.0', fuente: 'Wikimedia Commons' } },
  'pico-duarte': { alt: 'Pinos y sol en el camino al Pico Duarte', credito: { autor: 'jvg19', licencia: 'CC BY 3.0', fuente: 'Wikimedia Commons' } },
  'costa-pacifica': { alt: 'El crucero Costa Pacifica atracado entre montañas', credito: { autor: 'Diego Delso', licencia: 'CC BY-SA 4.0', fuente: 'Wikimedia Commons' } },
  lopesan: { alt: 'Vista aérea del Lopesan Costa Bávaro frente a la playa', credito: { autor: 'IsaiahRogers', licencia: 'CC BY-SA 4.0', fuente: 'Wikimedia Commons' } },
  'flyer-ocean-blue-sand': { alt: 'Flyer: Ocean Blue & Sand, oferta Black Friday desde US$182', credito: { autor: 'Hotel o mayorista de la oferta', licencia: 'Material promocional' } },
  'flyer-ocean-el-faro': { alt: 'Flyer: Ocean El Faro, oferta Black Friday desde US$196', credito: { autor: 'Hotel o mayorista de la oferta', licencia: 'Material promocional' } },
  'flyer-hard-rock': { alt: 'Flyer: Hard Rock Punta Cana del 27 al 29 de noviembre, US$998 en ocupación doble', credito: { autor: 'Hotel o mayorista de la oferta', licencia: 'Material promocional' } },
  'flyer-tropical-cofresi': { alt: 'Flyer: The Tropical Beach & Cofresí Palm, US$100 fines de semana y US$93 días de semana', credito: { autor: 'Hotel o mayorista de la oferta', licencia: 'Material promocional' } },
  'flyer-presidential-suites': { alt: 'Flyer: Presidential Suites by Lifestyle, doble US$164 y niños US$82', credito: { autor: 'Hotel o mayorista de la oferta', licencia: 'Material promocional' } },
  'hotel-ocean-blue-sand': { alt: 'Piscina y palapa del Ocean Blue & Sand vistas desde arriba', credito: { autor: 'Hotel o mayorista de la oferta', licencia: 'Material promocional' } },
  'hotel-ocean-el-faro': { alt: 'Playa con palapas y mar turquesa frente al Ocean El Faro', credito: { autor: 'Hotel o mayorista de la oferta', licencia: 'Material promocional' } },
  'hotel-presidential-suites': { alt: 'Piscina rodeada de camastros y jardines en Presidential Suites, Cofresí', credito: { autor: 'Hotel o mayorista de la oferta', licencia: 'Material promocional' } },
  'hotel-tropical-cofresi': { alt: 'Camas de playa con cortinas blancas bajo las palmeras en Cofresí', credito: { autor: 'Hotel o mayorista de la oferta', licencia: 'Material promocional' } },
  hardrock: { alt: 'Vista aérea del Hard Rock Punta Cana y su playa al atardecer', credito: { autor: 'Hard Rock Punta Cana', licencia: 'Cortesía del hotel' } },
  zemi: { alt: 'Piscina infinita frente a la bahía de Miches en Zemi Miches', credito: { autor: 'Zemi Miches', licencia: 'Cortesía del hotel' } },
  bayahibe: { alt: 'Muelle con palapa sobre el mar en Bayahíbe', credito: { autor: 'Mariordo', licencia: 'CC BY-SA 4.0', fuente: 'Wikimedia Commons' } },
  'exc-ballenas': { alt: 'Ballena jorobada saltando frente a una playa con palmeras', credito: { autor: 'Escondidas Multiservices', licencia: 'Imagen del flyer de la excursión' } },
  'exc-cayo-arena': { alt: 'Cayo de arena blanca rodeado de lanchas y agua turquesa', credito: { autor: 'Escondidas Multiservices', licencia: 'Imagen del flyer de la excursión' } },
  'exc-montecristi': { alt: 'Banco de arena en el mar turquesa frente al morro de Montecristi', credito: { autor: 'Escondidas Multiservices', licencia: 'Imagen del flyer de la excursión' } },
  'exc-el-dorado': { alt: 'Toboganes y piscina de un parque acuático entre palmeras', credito: { autor: 'Escondidas Multiservices', licencia: 'Imagen del flyer de la excursión' } },
  'exc-tierra-tropical': { alt: 'Campo de girasoles y puestos de mangos', credito: { autor: 'Escondidas Multiservices', licencia: 'Imagen del flyer de la excursión' } },
  'flyer-ballenas': { alt: 'Flyer: Ballenas Jorobadas y Cayo Levantado, domingo 7 de marzo de 2027', credito: { autor: 'Escondidas Multiservices', licencia: 'Flyer de la agencia' } },
  'flyer-cayo-arena': { alt: 'Flyer: Cayo Arena VIP, domingo 18 de abril de 2027', credito: { autor: 'Escondidas Multiservices', licencia: 'Flyer de la agencia' } },
  'flyer-montecristi': { alt: 'Flyer: Montecristi, banco de arena Grand Grosier, 22 de mayo de 2027', credito: { autor: 'Escondidas Multiservices', licencia: 'Flyer de la agencia' } },
  'flyer-el-dorado': { alt: 'Flyer: El Dorado Park, 24 de julio de 2027', credito: { autor: 'Escondidas Multiservices', licencia: 'Flyer de la agencia' } },
  'flyer-tierra-tropical': { alt: 'Flyer: Tierra Tropical en Baní, junio de 2027', credito: { autor: 'Escondidas Multiservices', licencia: 'Flyer de la agencia' } },
  'cueva-taina': { alt: 'Cueva de piedra con una poza de agua dulce cristalina y luz que entra desde arriba', credito: { autor: 'Escondidas Multiservices', licencia: 'Imagen ilustrativa generada con IA' } },
  'casa-tipica': { alt: 'Casa dominicana de madera pintada con café y cacao servidos en la galería', credito: { autor: 'Escondidas Multiservices', licencia: 'Imagen ilustrativa generada con IA' } },
  'hardrock-piscina': { alt: 'Piscina y edificios del Hard Rock Punta Cana entre palmeras, con el mar al fondo', credito: { autor: 'Magnus Bråth', licencia: 'CC BY 2.0', fuente: 'Wikimedia Commons' } },
  guatape: { alt: 'Casas de colores en el pueblo de Guatapé, Colombia', credito: { autor: 'Escondidas Multiservices', licencia: 'Publicación de la agencia en Instagram' } },
};

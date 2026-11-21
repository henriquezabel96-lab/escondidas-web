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

export const sitio = {
  borrador: true,
  nombre: 'Escondidas Multiservices',
  nombreCorto: 'Escondidas',
  lema: 'sueña, explora, descubre',
  // Dominio final (Hostinger → Netlify). Si aún no apunta, usar urlNetlify.
  url: 'https://escondidasmultiservices.com',
  urlNetlify: 'https://escondidasmultiservices.netlify.app',
  descripcion:
    'Agencia de viajes en Santiago: excursiones en grupo desde Santiago y Puerto Plata, resorts todo incluido, paquetes y cruceros. Separa con poco y paga en partes.',
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
  horario: null, // PENDIENTE: ej. 'Lunes a viernes, 9:00 a. m. a 6:00 p. m. · Sábados, 9:00 a. m. a 1:00 p. m.'
  gerente: 'Lic. Pedro Hernández',
  redes: {
    instagram: 'escondidasmultiservices', // CONFIRMAR usuario exacto
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
    cuentas: [
      { banco: null, tipo: null, numero: null, titular: null }, // PENDIENTE
    ],
    efectivo: 'En la oficina de Los Jardines Metropolitanos, Santiago.',
    tarjeta: null, // PENDIENTE: ¿aceptan tarjeta en la oficina o por enlace de pago?
  },
  politicas: {
    deposito: null, // PENDIENTE: ¿el depósito se devuelve? ¿en qué casos?
    cambios: null, // PENDIENTE: cambios de nombre o de fecha
    cancelacionAgencia: null, // PENDIENTE: qué pasa si la agencia cancela o mueve la fecha
    menores: null, // PENDIENTE: edades, precio de niños, si deben ir con un adulto
    clima: null, // PENDIENTE: qué pasa si llueve o hay mal tiempo
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
    nombre: 'Macao + Basílica de Higüey',
    nombreCorto: 'Macao',
    estado: 'activa',
    fecha: '2027-01-17',
    horaSalida: null, // PENDIENTE: hora de salida desde Santiago
    puntoEncuentro: { santiago: null, 'puerto-plata': null }, // PENDIENTE
    region: 'Higüey y Punta Cana',
    salidas: [
      { id: 'santiago', ciudad: 'Santiago', precio: 3995 },
      { id: 'puerto-plata', ciudad: 'Puerto Plata', precio: 4450 },
    ],
    deposito: 1000,
    precioNino: null, // PENDIENTE
    fechaLimitePago: null, // PENDIENTE: ej. '2027-01-10'
    cupos: null, // PENDIENTE: cupos disponibles (también se puede cambiar desde la hoja de Google)
    palabraClave: 'MACAO',
    foto: 'buggy-amigas',
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
        foto: 'buggy-caravana',
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
        foto: null,
      },
      {
        nombre: 'Casa típica',
        texto: 'Una casa dominicana tradicional con muestras de café, cacao y productos locales.',
        foto: null,
      },
    ],
    itinerario: [
      { hora: null, titulo: 'Salida desde Santiago y Puerto Plata' },
      { hora: null, titulo: 'Desayuno en ruta' },
      { hora: null, titulo: 'Visita a la Basílica de Higüey' },
      { hora: null, titulo: 'Buggies, Cueva Taína y casa típica' },
      { hora: null, titulo: 'Playa Macao y almuerzo buffet' },
      { hora: null, titulo: 'Regreso con rifas y animación' },
    ],
    llevar: [
      'Traje de baño y toalla',
      'Protector solar y gafas de sol',
      'Ropa y tenis que se puedan ensuciar',
      'Muda de ropa para el regreso',
      'Efectivo para gastos personales',
    ],
    galeria: ['buggy-casco', 'buggy-amigas-2', 'buggy-polvo', 'buggy-volante', 'buggy-camino', 'buggy-manejando'],
    faq: [
      {
        p: '¿Cómo separo mi cupo?',
        r: 'Llena la reserva en esta página o escríbenos por WhatsApp. Haces el depósito de RD$1,000 por persona y te enviamos el comprobante con el cupo a tu nombre.',
      },
      {
        p: '¿Puedo pagar el resto en partes?',
        r: 'Sí. Después del depósito abonas lo que falta en partes, como te quede cómodo, siempre antes del día de la excursión.',
      },
      { p: '¿Desde dónde sale la guagua?', r: null, pendiente: 'Punto exacto y hora de salida en Santiago y en Puerto Plata' },
      { p: '¿Hay que saber manejar para los buggies?', r: null, pendiente: 'Requisitos para manejar el buggy (edad mínima, licencia)' },
      { p: '¿Pueden ir niños?', r: null, pendiente: 'Edad mínima, precio de niños y si deben ir con un adulto' },
      { p: '¿Qué pasa si no puedo ir?', r: null, pendiente: 'Política de cambios y devolución del depósito' },
      { p: '¿Qué pasa si llueve?', r: null, pendiente: 'Qué hace la agencia si hay mal tiempo' },
    ],
  },
  // Viajes de ejemplo para la sección "Próximas salidas". Se publican solo en borrador.
  {
    slug: 'sur-profundo',
    codigo: 'SUR',
    nombre: 'Sur Profundo',
    region: 'Barahona y Pedernales',
    estado: 'proximamente',
    pendiente: true,
    fecha: null,
    salidas: [{ id: 'santiago', ciudad: 'Santiago', precio: null }],
    foto: 'bahia-aguilas',
    resumen: 'Bahía de las Águilas, lagunas y miradores del sur, en grupo y con todo resuelto.',
  },
  {
    slug: 'isla-saona',
    codigo: 'SAO',
    nombre: 'Isla Saona',
    region: 'La Romana y Bayahíbe',
    estado: 'proximamente',
    pendiente: true,
    fecha: null,
    salidas: [{ id: 'santiago', ciudad: 'Santiago', precio: null }],
    foto: 'saona-palmera',
    resumen: 'Catamarán, piscina natural y la playa de las palmeras inclinadas.',
  },
  {
    slug: 'samana',
    codigo: 'SAM',
    nombre: 'Samaná y Salto El Limón',
    region: 'Samaná',
    estado: 'proximamente',
    pendiente: true,
    fecha: null,
    salidas: [{ id: 'santiago', ciudad: 'Santiago', precio: null }],
    foto: 'salto-limon',
    resumen: 'Cascada entre la montaña y tarde de playa en la península.',
  },
];

// ─── HOTELES ─────────────────────────────────────────────────────────────────
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

export const hoteles = [
  {
    ...hotelBase,
    slug: 'lopesan-costa-bavaro',
    nombre: 'Lopesan Costa Bávaro',
    zona: 'punta-cana',
    lugar: 'Bávaro, Punta Cana',
    foto: 'lopesan',
    destacado: true,
  },
  {
    ...hotelBase,
    slug: 'hard-rock-punta-cana',
    nombre: 'Hard Rock Punta Cana',
    zona: 'punta-cana',
    lugar: 'Punta Cana',
    foto: 'hardrock',
  },
  {
    ...hotelBase,
    slug: 'zemi-miches',
    nombre: 'Zemi Miches',
    zona: 'miches',
    lugar: 'Miches, El Seibo',
    foto: 'zemi',
  },
  {
    ...hotelBase,
    slug: 'sunscape-dominicus',
    nombre: 'Sunscape Dominicus',
    zona: 'la-romana',
    lugar: 'Bayahíbe, La Romana',
    foto: 'bayahibe',
    fotoEsZona: true,
  },
];

// ─── PAQUETES (ejemplos pendientes de confirmar) ─────────────────────────────
export const paquetes = [
  {
    slug: 'medellin-guatape',
    nombre: 'Medellín y Guatapé',
    pais: 'Colombia',
    foto: 'guatape',
    noches: null,
    desde: null,
    pendiente: true,
    texto: 'Ciudad de la eterna primavera, Comuna 13 y el pueblo de colores.',
  },
  {
    slug: 'rio-de-janeiro',
    nombre: 'Río de Janeiro',
    pais: 'Brasil',
    foto: null,
    noches: null,
    desde: null,
    pendiente: true,
    texto: 'Pan de Azúcar, Copacabana y la ciudad vista desde arriba.',
  },
  {
    slug: 'cofresi-palm-beach',
    nombre: 'Cofresí Palm Beach',
    pais: 'Puerto Plata, RD',
    foto: null,
    noches: 2,
    desde: null,
    pendiente: true,
    texto: 'Fin de semana todo incluido a menos de una hora de Santiago.',
  },
];

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
  { p: '¿Qué pasa si no puedo ir?', r: null, pendiente: 'Política de cambios y devoluciones de la agencia' },
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
  hardrock: { alt: 'Vista aérea del Hard Rock Punta Cana y su playa al atardecer', credito: { autor: 'Hard Rock Punta Cana', licencia: 'Cortesía del hotel' } },
  zemi: { alt: 'Piscina infinita frente a la bahía de Miches en Zemi Miches', credito: { autor: 'Zemi Miches', licencia: 'Cortesía del hotel' } },
  bayahibe: { alt: 'Muelle con palapa sobre el mar en Bayahíbe', credito: { autor: 'Mariordo', licencia: 'CC BY-SA 4.0', fuente: 'Wikimedia Commons' } },
  guatape: { alt: 'Casas de colores en el pueblo de Guatapé, Colombia', credito: { autor: 'Escondidas Multiservices', licencia: 'Publicación de la agencia en Instagram' } },
};

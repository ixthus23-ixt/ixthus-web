import {
  BookOpen,
  CalendarHeart,
  Church,
  Compass,
  Flame,
  GraduationCap,
  HandHeart,
  Heart,
  MessageCircleHeart,
  Music,
  Sprout,
  Star,
  Users,
} from "lucide-react";

export const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Historia", href: "#historia" },
  { label: "Misión", href: "#mision" },
  { label: "Eventos", href: "#eventos" },
  { label: "Comunidad", href: "#comunidad" },
  { label: "Oración", href: "#oracion" },
  { label: "Ubícanos", href: "#ubicanos" },
  { label: "Contacto", href: "#contacto" },
];

export const heroContent = {
  label: "Pastoral Juvenil Universitaria",
  title: "IXTHUS",
  slogan: "Hacer del mundo la Iglesia que Jesús soñó",
  description:
    "Somos una Pastoral Universitaria que evangeliza de joven a joven, formando comunidades centradas en Cristo, la oración, el servicio y la misión.",
  inspiration:
    "No nacimos para caminar solos. Fuimos llamados a caminar con Cristo y con nuestros hermanos.",
  emotionalCallout:
    "Más que un grupo juvenil, somos una familia que busca vivir el Evangelio con alegría.",
  bibleQuote: "Vayan y hagan discípulos a todas las naciones.",
  bibleReference: "Mateo 28,19",
  // Reemplaza este valor por un archivo local en /public, por ejemplo: "/videos/ixthus-hero.mp4".
  backgroundVideoSrc: "",
};

export const heroStats = [
  { value: 200, prefix: "+", label: "Jóvenes acompañados" },
  { value: 12, prefix: "+", label: "Retiros realizados" },
  { value: 4, prefix: "+", label: "Años evangelizando" },
  { value: 10, prefix: "+", label: "Encuentros con Cristo" },
];

export const whatIsContent = {
  eyebrow: "Pastoral Juvenil Universitaria",
  title: "¿Qué es IXTHUS?",
  text: [
    "IXTHUS es un movimiento de Pastoral Juvenil Universitaria que busca evangelizar de joven a joven, inspirada en la vida y enseñanzas de los primeros cristianos.",
    "Creemos que la fe no es algo que se vive únicamente dentro del templo, sino una forma de transformar nuestra universidad, nuestras familias y nuestro mundo.",
    "Somos jóvenes caminando juntos hacia Cristo, creciendo en comunidad, oración, formación y misión.",
  ],
  // Reemplazar por fotografía real: public/images/what-is/what-is-ixthus.jpg
  image: "/images/what-is/what-is-ixthus.jpg",
  imageAlt: "Jóvenes compartiendo una experiencia de comunidad",
  photoTypes: ["Retiros", "Formación", "Misas", "Adoración", "Convivencias"],
  closing:
    "No importa en qué punto de tu camino estés. Siempre habrá un lugar para ti en IXTHUS.",
};

export const whatIsCards = [
  {
    title: "Cristo",
    icon: Church,
    text: "Todo comienza en Él.",
  },
  {
    title: "Comunidad",
    icon: Users,
    text: "Nadie camina solo.",
  },
  {
    title: "Formación",
    icon: BookOpen,
    text: "Crecemos en la fe.",
  },
  {
    title: "Misión",
    icon: Flame,
    text: "Llevamos a Cristo al mundo.",
  },
];

export const historyContent = {
  eyebrow: "Nuestra historia",
  title: "Una historia que sigue escribiéndose",
  intro: [
    "Todo comenzó con un grupo de jóvenes que creyeron que la fe podía vivirse con alegría, autenticidad y compromiso.",
    "Inspirados por el ejemplo de los primeros cristianos, nació un sueño: evangelizar de joven a joven y construir la Iglesia que Jesús soñó.",
    "Desde entonces, IXTHUS ha sido un espacio donde generaciones de jóvenes han encontrado amistad, formación, comunidad y un encuentro personal con Cristo.",
  ],
  photos: [
    {
      label: "Retiros",
      // Reemplazar por fotografía real: public/images/history/retiros.jpg
      image: "/images/history/retiros.jpg",
    },
    {
      label: "Comunidad",
      // Reemplazar por fotografía real: public/images/history/comunidad.jpg
      image: "/images/history/comunidad.jpg",
    },
    {
      label: "Misión",
      // Reemplazar por fotografía real: public/images/history/mision.jpg
      image: "/images/history/mision.jpg",
    },
  ],
  missionTitle: "Una historia que sigue creciendo",
  missionText:
    "Desde aquellos primeros siete jóvenes hasta la comunidad que hoy continúa expandiendo esta misión, IXTHUS ha sido testimonio de que Dios sigue llamando a nuevas generaciones a transformar el mundo desde el Evangelio.\n\nNuestra historia no se mide únicamente por los años transcurridos, sino por las vidas que han encontrado en Cristo un camino de esperanza, amistad y propósito.\n\nY esta historia sigue escribiéndose cada día.",
};

export const historyTimeline = [
  {
    stage: "Etapa 1",
    year: "Inicio",
    title: "Fundación",
    icon: Sprout,
    text: "IXTHUS nació gracias al entusiasmo y compromiso de siete jóvenes fundadores que respondieron al llamado de evangelizar a otros jóvenes desde la vivencia auténtica del Evangelio.\n\nLos primeros pasos de esta misión se dieron en la comunidad de San Pío X, donde comenzó a formarse una comunidad inspirada en la fraternidad, la oración y el testimonio de los primeros cristianos.\n\nDesde sus inicios, IXTHUS asumió el desafío de construir espacios donde los jóvenes pudieran encontrarse con Cristo y crecer en la fe.",
  },
  {
    stage: "Etapa 2",
    year: "Primeros pasos",
    title: "Primeros retiros y actividades",
    icon: CalendarHeart,
    text: "La comunidad empezó a tomar forma a través de retiros, encuentros, oración y actividades que abrieron camino a nuevas amistades en Cristo.",
  },
  {
    stage: "Etapa 3",
    year: "Crecimiento",
    title: "Crecimiento de la comunidad",
    icon: Users,
    text: "Más jóvenes encontraron en IXTHUS un lugar para formarse, servir, sanar, compartir la vida y descubrir su misión dentro de la Iglesia.",
  },
  {
    stage: "Etapa 4",
    year: "Hoy",
    title: "IXTHUS Hoy",
    icon: Compass,
    text: "Con el paso de los años, IXTHUS ha experimentado un crecimiento constante en su misión evangelizadora.\n\nLo que comenzó como una iniciativa juvenil en una comunidad parroquial ha evolucionado hasta consolidarse como un movimiento de Pastoral Juvenil Universitaria comprometido con la formación integral de los jóvenes y la construcción de la Iglesia que Jesús soñó.\n\nActualmente, IXTHUS tiene presencia en tres parroquias, fortaleciendo redes de comunidad, formación, servicio y evangelización entre jóvenes de distintos contextos, siempre con Cristo como centro de su camino.",
  },
];

export const saintQuote = {
  quote:
    "Muchos no se hacen cristianos porque no hay quien los haga cristianos.",
  author: "San Francisco Javier, Patrono de IXTHUS",
};

export const missionCards = [
  {
    title: "Misión",
    icon: Flame,
    text: "Evangelizar de joven a joven, construyendo la Iglesia que Jesús soñó.",
  },
  {
    title: "Visión",
    icon: Church,
    text: "Ser una comunidad juvenil inspirada en la vida y enseñanzas de los primeros cristianos, creciendo constantemente en el amor de Cristo y formando jóvenes que revitalicen la fe en su entorno.",
  },
  {
    title: "Objetivo",
    icon: HandHeart,
    text: "Llevar a Cristo a nuestra vida y a nuestro entorno mediante el amor, el servicio y la expresión de la Pastoral Juvenil Parroquial, fortaleciendo nuestra fe a ejemplo de los primeros apóstoles a través del testimonio y la oración.",
  },
];

export const pillars = [
  {
    title: "Cristo al centro",
    icon: Star,
    text: "Todo nace de Él y vuelve a Él. Cristo es el corazón de nuestra comunidad.",
  },
  {
    title: "Comunidad",
    icon: Users,
    text: "Caminamos juntos, compartiendo la fe, la alegría y la vida como una familia espiritual.",
  },
  {
    title: "Oración",
    icon: MessageCircleHeart,
    text: "Nos encontramos con Dios en el silencio, la adoración y la escucha de su Palabra.",
  },
  {
    title: "Servicio",
    icon: HandHeart,
    text: "Ponemos nuestros dones al servicio de la Iglesia y de quienes más lo necesitan.",
  },
  {
    title: "Formación",
    icon: BookOpen,
    text: "Crecemos en la fe con bases sólidas, aprendiendo a vivir el Evangelio cada día.",
  },
  {
    title: "Misión",
    icon: Flame,
    text: "Salimos al encuentro de otros jóvenes para anunciar a Cristo con alegría y testimonio.",
  },
  {
    title: "Alegría",
    icon: Music,
    text: "Vivimos la fe con entusiasmo, amistad y esperanza, mostrando que seguir a Cristo llena el corazón.",
  },
  {
    title: "Testimonio",
    icon: Heart,
    text: "Nuestra vida habla de lo que creemos: ser luz en la universidad, la familia y el mundo.",
  },
];

export const events = [
  {
    title: "Retiros",
    icon: Sprout,
    text: "Espacios para detenernos, escuchar a Dios y volver al corazón con una fe renovada.",
  },
  {
    title: "Horas Santas",
    icon: Church,
    text: "Encuentros de adoración para poner nuestra vida frente a Jesús Eucaristía.",
  },
  {
    title: "Misiones",
    icon: Flame,
    text: "Salir al encuentro de otros jóvenes llevando esperanza, escucha y alegría cristiana.",
  },
  {
    title: "Campamentos",
    icon: CalendarHeart,
    text: "Experiencias intensas de fraternidad, oración, naturaleza y crecimiento espiritual.",
  },
  {
    title: "Reuniones juveniles",
    icon: Users,
    text: "Noches de comunidad, dinámicas, formación, amistad y fe compartida.",
  },
  {
    title: "Formación católica",
    icon: BookOpen,
    text: "Temas claros y profundos para conocer, amar y vivir mejor nuestra fe.",
  },
];

export const testimonials = [
  {
    name: "Donaji, 18",
    text: "En IXTHUS encontré una comunidad que me ayudó a volver a orar y a entender que mi fe también puede ser joven, alegre y real.",
  },
  {
    name: "Luis, 24",
    text: "Llegué buscando amigos y terminé encontrando una familia espiritual. Servir con otros jóvenes me cambió la forma de ver la Iglesia.",
  },
  {
    name: "Vania, 22",
    text: "Aquí aprendí que Cristo no se queda en el templo: camina conmigo en la escuela, en mi casa y en cada decisión importante.",
  },
];

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "TikTok", href: "https://tiktok.com" },
  { label: "WhatsApp", href: "https://wa.me/" },
];

export const footerContent = {
  description:
    "Pastoral Universitaria que evangeliza de joven a joven, caminando con Cristo en comunidad, oración, formación y misión.",
  institutional:
    "Pastoral Universitaria con presencia en parroquias de la Arquidiócesis Primada de México.",
  city: "Ciudad de México",
  email: "contacto@ixthus.org",
};

export const parishPresence = [
  "San Pío Décimo",
  "Divina Providencia",
  "Asunción de Nuestra Señora",
];

export const locations = [
  {
    name: "San Pío Décimo",
    tag: "Sede principal",
    text: "Comunidad donde nació IXTHUS y punto principal de encuentro.",
    image: "/images/parishes/san-pio-decimo.jpg",
    imageAlt: "Fotografía de la parroquia San Pío Décimo",
    address:
      "Calle Ote. 172 250, Moctezuma 2da Secc, Venustiano Carranza, 15530 Ciudad de México, CDMX.",
    mapsUrl:
      "https://maps.google.com/?q=Calle%20Ote.%20172%20250%2C%20Moctezuma%202da%20Secc%2C%20Venustiano%20Carranza%2C%2015530%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Calle%20Ote.%20172%20250%2C%20Moctezuma%202da%20Secc%2C%20Venustiano%20Carranza%2C%2015530%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX",
  },
  {
    name: "Divina Providencia",
    tag: "Comunidad IXTHUS",
    text: "Comunidad donde IXTHUS continúa viviendo su misión evangelizadora.",
    image: "/images/parishes/divina-providencia.jpg",
    imageAlt: "Fotografía de la parroquia Divina Providencia",
    address:
      "Calle Ote. 168 93, Moctezuma 2da Secc, Venustiano Carranza, 15530 Ciudad de México, CDMX.",
    mapsUrl:
      "https://maps.google.com/?q=Calle%20Ote.%20168%2093%2C%20Moctezuma%202da%20Secc%2C%20Venustiano%20Carranza%2C%2015530%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Calle%20Ote.%20168%2093%2C%20Moctezuma%202da%20Secc%2C%20Venustiano%20Carranza%2C%2015530%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX",
  },
  {
    name: "Asunción de Nuestra Señora",
    tag: "Comunidad IXTHUS",
    text: "Comunidad parroquial donde seguimos creciendo en fe, comunidad y servicio.",
    image: "/images/parishes/asuncion-de-nuestra-senora.jpg",
    imageAlt: "Fotografía de la parroquia Asunción de Nuestra Señora",
    address:
      "Tacuba 12, Merced Gómez, Álvaro Obregón, 01600 Ciudad de México, CDMX.",
    mapsUrl:
      "https://maps.google.com/?q=Tacuba%2012%2C%20Merced%20G%C3%B3mez%2C%20%C3%81lvaro%20Obreg%C3%B3n%2C%2001600%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Tacuba%2012%2C%20Merced%20G%C3%B3mez%2C%20%C3%81lvaro%20Obreg%C3%B3n%2C%2001600%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX",
  },
];

export const parishPresenceContent = {
  eyebrow: "Presencia IXTHUS",
  title: "Tres comunidades, una misma misión",
  text: "IXTHUS tiene presencia en comunidades parroquiales de la Arquidiócesis Primada de México, donde jóvenes universitarios encuentran espacios de formación, oración, servicio y misión.",
  institutionalLine:
    "Presencia actual en la Arquidiócesis Primada de México",
};

export const integrationContent = {
  eyebrow: "¿Dónde puedo integrarme?",
  title: "Tu lugar puede estar aquí",
  text: "No importa si llevas años caminando en la fe o si apenas estás comenzando. En IXTHUS queremos caminar contigo, acompañarte y ayudarte a descubrir el lugar que Dios ha preparado para ti.",
  button: "Quiero formar parte de IXTHUS",
};

export const integrationPoints = [
  { title: "Soy universitario", icon: GraduationCap },
  { title: "Quiero acercarme más a Cristo", icon: Church },
  { title: "Busco una comunidad", icon: Users },
  { title: "Quiero servir y crecer en la fe", icon: HandHeart },
];

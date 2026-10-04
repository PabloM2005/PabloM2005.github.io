/**
 * TODO EL TEXTO DE LA WEB ESTÁ AQUÍ, en español (es) y en inglés (en).
 * Los dos objetos tienen exactamente las mismas claves.
 * Para cambiar una frase, búscala aquí y cámbiala en los dos idiomas.
 */
export const translations = {
  es: {
    meta: {
      title: 'Pablo Muñoz Cabrerizo — Estudiante de DAM',
      description:
        'Portfolio de Pablo Muñoz Cabrerizo, estudiante de Desarrollo de Aplicaciones Multiplataforma en Zaragoza.',
    },
    nav: {
      home: 'Inicio',
      projects: 'Proyectos',
      about: 'Sobre mí',
      contact: 'Contacto',
      menu: 'Menú',
      close: 'Cerrar',
      aria: 'Navegación principal',
      skip: 'Saltar al contenido',
    },
    loader: 'Cargando portfolio',
    hero: {
      eyebrow: 'Portfolio · 2026',
      role: 'Estudiante de 2º de DAM',
      location: 'Zaragoza, España',
      status: 'Buscando prácticas',
      lead: 'Aprendiendo a construir',
      accent: 'software',
      intro:
        'Curso segundo de Desarrollo de Aplicaciones Multiplataforma en Zaragoza. Aprendo construyendo: cada cosa que estudio acaba en un proyecto que funciona.',
      ctaProjects: 'Ver proyectos',
      ctaCv: 'Descargar CV',
      scroll: 'Desliza',
      ring: 'Pablo Muñoz Cabrerizo · Desarrollo de aplicaciones · Zaragoza · ',
    },
    projects: {
      label: 'Proyectos',
      title: 'Trabajo',
      titleAccent: 'seleccionado',
      intro:
        'Proyectos de clase que he llevado de la idea al código funcionando. Poco a poco irán apareciendo más.',
      yearLabel: 'Año',
      typeLabel: 'Tipo',
      stackLabel: 'Tecnologías',
      demo: 'Ver demo',
      liveNote: 'Aplicación publicada · se abre en otra pestaña',
      shots: ['Página de inicio', 'Funciones', 'Inicio de sesión', 'Registro'],
      hintDesktop: 'Sigue bajando para ver las capturas',
      hintMobile: 'Desliza para ver las capturas',
      soonTitle: 'Más en camino',
      soonText:
        'Estoy en segundo curso, así que esto crece cada trimestre. Mientras tanto, en mi GitHub está todo lo que voy subiendo.',
      soonCta: 'Ver mi GitHub',
      list: [
        {
          id: 'tracki',
          title: 'Tracki',
          year: '2026',
          type: 'Trabajo de clase',
          tagline: 'Control de ingresos y gastos',
          summary:
            'Aplicación web para llevar el control de ingresos y gastos. Permite registrar transacciones, gestionar varias cuentas, fijar objetivos de ahorro y ver la evolución en gráficos. Incluye registro e inicio de sesión, y guarda todos los datos en una base de datos en la nube.',
        },
      ],
    },
    about: {
      label: 'Sobre mí',
      statement:
        'Empecé el ciclo con la idea de hacer aplicaciones, y lo que más me ha enganchado es ver una idea convertirse en algo que alguien puede abrir y usar.',
      bio1: 'Estoy cursando segundo de Desarrollo de Aplicaciones Multiplataforma en Zaragoza. Me muevo bien tanto en la parte de la interfaz como en la lógica y la base de datos que hay detrás, y disfruto especialmente cuando las dos encajan y la aplicación empieza a funcionar de verdad.',
      bio2: 'Fuera de clase intento llevar los proyectos un paso más allá de lo que pide el enunciado: si algo se puede hacer más claro para quien lo usa, me gusta dedicarle ese rato extra. Ahora mismo busco prácticas donde seguir aprendiendo con gente que lleve más tiempo en esto.',
      facts: [
        { label: 'Ubicación', value: 'Zaragoza, España' },
        { label: 'Ahora mismo', value: '2º de DAM' },
        { label: 'Idiomas', value: 'Español · Inglés' },
      ],
      skillsLabel: 'Tecnologías',
      skills: [
        { group: 'Lenguajes', items: ['Java', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'SQL'] },
        { group: 'Frameworks', items: ['React', 'Next.js'] },
        { group: 'Estilos', items: ['Tailwind CSS'] },
        { group: 'Datos', items: ['Supabase', 'PostgreSQL'] },
        { group: 'Herramientas', items: ['Git', 'GitHub', 'VS Code', 'IntelliJ IDEA'] },
      ],
      processLabel: 'Cómo trabajo',
      process: [
        { title: 'Entender', text: 'Antes de escribir nada, tener claro qué tiene que hacer la aplicación y para quién.' },
        { title: 'Planificar', text: 'Pensar las pantallas y la estructura de datos. Dibujarlo ahorra muchas vueltas después.' },
        { title: 'Programar', text: 'Ir por partes, probando cada pieza en cuanto funciona en lugar de dejarlo todo para el final.' },
        { title: 'Pulir', text: 'Revisar los casos raros, los mensajes de error y los detalles de la interfaz.' },
      ],
      quoteBefore: 'Todavía me queda mucho por aprender, y',
      quoteAccent: 'esa es justo la parte que me gusta.',
    },
    contact: {
      label: 'Contacto',
      title: '¿Hablamos?',
      text: 'Si tienes una oferta de prácticas, un proyecto en el que pueda echar una mano o simplemente quieres comentarme algo, escríbeme.',
      emailLabel: 'Escríbeme',
      cv: 'Descargar CV',
    },
    footer: {
      madeWith: 'Hecho con React, Tailwind CSS y GSAP',
      localTime: 'Hora en Zaragoza',
      top: 'Volver arriba',
    },
    language: { switchTo: 'Switch to English' },
  },

  en: {
    meta: {
      title: 'Pablo Muñoz Cabrerizo — Software Development Student',
      description:
        'Portfolio of Pablo Muñoz Cabrerizo, cross-platform application development student based in Zaragoza, Spain.',
    },
    nav: {
      home: 'Home',
      projects: 'Projects',
      about: 'About',
      contact: 'Contact',
      menu: 'Menu',
      close: 'Close',
      aria: 'Main navigation',
      skip: 'Skip to content',
    },
    loader: 'Loading portfolio',
    hero: {
      eyebrow: 'Portfolio · 2026',
      role: 'Second-year DAM student',
      location: 'Zaragoza, Spain',
      status: 'Looking for an internship',
      lead: 'Learning to build',
      accent: 'software',
      intro:
        "I'm in my second year of Cross-Platform Application Development in Zaragoza, Spain. I learn by building: whatever I study ends up in a project that actually runs.",
      ctaProjects: 'See projects',
      ctaCv: 'Download CV',
      scroll: 'Scroll',
      ring: 'Pablo Muñoz Cabrerizo · Application development · Zaragoza · ',
    },
    projects: {
      label: 'Projects',
      title: 'Selected',
      titleAccent: 'work',
      intro: 'Coursework projects I took from the brief to working code. More will show up here as I go.',
      yearLabel: 'Year',
      typeLabel: 'Type',
      stackLabel: 'Tech',
      demo: 'View demo',
      liveNote: 'Live app · opens in a new tab',
      shots: ['Landing page', 'Features', 'Log in', 'Sign up'],
      hintDesktop: 'Keep scrolling to see the screenshots',
      hintMobile: 'Swipe to see the screenshots',
      soonTitle: 'More coming',
      soonText:
        "I'm only in my second year, so this grows every term. In the meantime, everything I build goes up on my GitHub.",
      soonCta: 'Visit my GitHub',
      list: [
        {
          id: 'tracki',
          title: 'Tracki',
          year: '2026',
          type: 'Coursework',
          tagline: 'Income and expense tracking',
          summary:
            'A web app for keeping track of income and expenses. You can log transactions, manage several accounts, set savings goals and follow your progress in charts. It includes sign-up and login, and stores everything in a cloud database.',
        },
      ],
    },
    about: {
      label: 'About me',
      statement:
        'I started the course wanting to build applications, and what hooked me was watching an idea turn into something a person can actually open and use.',
      bio1: "I'm in my second year of Cross-Platform Application Development in Zaragoza. I'm comfortable both on the interface side and with the logic and database behind it, and I especially enjoy the moment the two click together and the app really starts working.",
      bio2: "Outside of class I try to push projects a bit further than the brief asks: if something can be made clearer for the person using it, I like spending that extra time on it. Right now I'm looking for an internship where I can keep learning alongside people who've been doing this longer.",
      facts: [
        { label: 'Location', value: 'Zaragoza, Spain' },
        { label: 'Right now', value: 'Second year' },
        { label: 'Languages', value: 'Spanish · English' },
      ],
      skillsLabel: 'Tech',
      skills: [
        { group: 'Languages', items: ['Java', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'SQL'] },
        { group: 'Frameworks', items: ['React', 'Next.js'] },
        { group: 'Styling', items: ['Tailwind CSS'] },
        { group: 'Data', items: ['Supabase', 'PostgreSQL'] },
        { group: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'IntelliJ IDEA'] },
      ],
      processLabel: 'How I work',
      process: [
        { title: 'Understand', text: 'Before writing anything, get clear on what the app has to do and who it is for.' },
        { title: 'Plan', text: 'Sketch the screens and the data structure. Drawing it first saves a lot of backtracking.' },
        { title: 'Build', text: 'Work in pieces and test each one as soon as it runs, instead of leaving it all to the end.' },
        { title: 'Polish', text: 'Go back over the edge cases, the error messages and the interface details.' },
      ],
      quoteBefore: 'I still have a lot to learn, and',
      quoteAccent: "that's exactly the part I enjoy.",
    },
    contact: {
      label: 'Contact',
      title: 'Want to talk?',
      text: 'If you have an internship opening, a project I could help with, or just something to tell me, drop me a line.',
      emailLabel: 'Write to me',
      cv: 'Download CV',
    },
    footer: {
      madeWith: 'Built with React, Tailwind CSS and GSAP',
      localTime: 'Time in Zaragoza',
      top: 'Back to top',
    },
    language: { switchTo: 'Cambiar a español' },
  },
};

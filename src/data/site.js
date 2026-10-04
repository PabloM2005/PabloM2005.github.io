/**
 * Datos que NO cambian con el idioma (enlaces, imágenes, tecnologías).
 * Las imágenes se importan para que Vite las optimice y les ponga la ruta
 * correcta al publicar la web.
 */
import logo from '../assets/logo-pm.webp';
import shot1 from '../assets/proyectos/tracki-1-inicio.webp';
import shot2 from '../assets/proyectos/tracki-2-funciones.webp';
import shot3 from '../assets/proyectos/tracki-3-login.webp';
import shot4 from '../assets/proyectos/tracki-4-registro.webp';

export const profile = {
  name: 'Pablo Muñoz Cabrerizo',
  firstName: 'Pablo',
  lastName: 'Muñoz',
  email: 'pablomunozcab@gmail.com',
  github: 'https://github.com/PabloM2005',
  // El CV está en la carpeta public/ y se copia tal cual al publicar
  cv: `${import.meta.env.BASE_URL}cv-pablo-munoz-cabrerizo.pdf`,
  cvFileName: 'cv-pablo-munoz-cabrerizo.pdf',
  logo,
};

export const navLinks = [
  { key: 'home', href: '#inicio' },
  { key: 'projects', href: '#proyectos' },
  { key: 'about', href: '#sobre-mi' },
  { key: 'contact', href: '#contacto' },
];

/** Tecnologías de la cinta que se mueve debajo del inicio */
export const marqueeTech = [
  'Java',
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Tailwind CSS',
  'SQL',
  'PostgreSQL',
  'Supabase',
  'Git',
];

/** Datos de los proyectos que no se traducen. Se emparejan por `id`. */
export const projectsMeta = {
  tracki: {
    tags: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Supabase', 'Recharts'],
    demoUrl: 'https://tracki-seven.vercel.app',
    gallery: [shot1, shot2, shot3, shot4],
  },
};

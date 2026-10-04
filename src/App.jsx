import { useCallback, useEffect, useState } from 'react';
import { useLanguage } from './i18n/LanguageContext';
import { ScrollTrigger, prefersReducedMotion } from './lib/gsap';
import { lockScroll, startSmoothScroll } from './lib/smoothScroll';
import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Marquee from './sections/Marquee';
import Projects from './sections/Projects';
import About from './sections/About';
import Contact from './sections/Contact';

export default function App() {
  const { lang, t } = useLanguage();
  // Si el usuario pide menos movimiento, no hay pantalla de carga.
  const [ready, setReady] = useState(() => prefersReducedMotion());

  // Scroll suave (Lenis) para toda la web
  useEffect(() => startSmoothScroll(), []);

  // Mientras se ve la pantalla de carga, la página no se puede mover
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    if (!ready) {
      window.scrollTo(0, 0);
      lockScroll(true);
    } else {
      lockScroll(false);
      ScrollTrigger.refresh();
    }
  }, [ready]);

  // Al cambiar de idioma los textos cambian de tamaño: se recalculan
  // las posiciones de todas las animaciones de scroll.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [lang]);

  const onLoaded = useCallback(() => setReady(true), []);

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-paper focus:px-4 focus:py-2 focus:text-ink-950"
      >
        {t.nav.skip}
      </a>

      {!ready && <Preloader onDone={onLoaded} />}
      <Cursor />
      <Header ready={ready} />

      <main id="contenido">
        <Hero ready={ready} />
        <Marquee />
        {/* key={lang}: al cambiar de idioma estas secciones se vuelven a crear,
            así sus animaciones se rehacen con los textos nuevos. */}
        <Projects key={`projects-${lang}`} />
        <About key={`about-${lang}`} />
        <Contact key={`contact-${lang}`} />
      </main>

      <Footer />
      <div className="grain" aria-hidden="true" />
    </>
  );
}

import { useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { profile } from '../data/site';
import { gsap, useGSAP, hasFinePointer } from '../lib/gsap';
import { scrollToTarget } from '../lib/smoothScroll';
import Magnetic from '../components/Magnetic';

/** Separa una palabra en letras, cada una dentro de su máscara */
function Letters({ word }) {
  return (
    <span aria-hidden="true" className="inline-flex overflow-hidden pb-[0.06em]">
      {[...word].map((char, index) => (
        <span key={index} className="hero-char inline-block will-change-transform">
          {char}
        </span>
      ))}
    </span>
  );
}

/**
 * Pantalla de inicio.
 * Animaciones (todas con GSAP):
 *  - Entrada: timeline que arranca cuando termina la pantalla de carga.
 *    Las letras del nombre suben una a una, luego aparece el logo y el resto.
 *  - Logo: flota arriba y abajo sin parar, el anillo de texto gira y, con
 *    ratón, se inclina en 3D hacia donde apuntas.
 *  - Scroll: al bajar, "Pablo" se va a la izquierda, "Muñoz" a la derecha y
 *    el logo gira; la animación va atada a la rueda (scrub).
 */
export default function Hero({ ready }) {
  const { t } = useLanguage();
  const root = useRef(null);
  const intro = useRef(null);

  // 1) Estado inicial + timeline de entrada (en pausa hasta que `ready` sea true)
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        intro.current = gsap
          .timeline({ paused: true })
          .from('.hero-char', { yPercent: 110, duration: 1.3, stagger: 0.045, ease: 'expo.out' })
          .from('.hero-logo', { scale: 0.4, rotate: -120, autoAlpha: 0, duration: 1.6, ease: 'expo.out' }, 0.2)
          .from('.hero-meta', { y: 20, autoAlpha: 0, stagger: 0.07, duration: 0.9 }, 0.5)
          .from('.hero-fade', { y: 36, autoAlpha: 0, stagger: 0.1, duration: 1.1 }, 0.6)
          .from('.hero-rule', { scaleX: 0, transformOrigin: 'left center', duration: 1.4, ease: 'expo.inOut' }, 0.3);

        // Animaciones infinitas del logo
        gsap.to('.hero-float', { y: -16, rotate: 2, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 });
        gsap.to('.hero-ring', { rotate: 360, duration: 26, ease: 'none', repeat: -1 });
        gsap.to('.hero-glow', { scale: 1.15, opacity: 0.85, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
        gsap.to('.hero-orbit', { rotate: -360, duration: 14, ease: 'none', repeat: -1 });

        // Animación ligada al scroll (scrub)
        gsap
          .timeline({
            scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.8 },
          })
          .to('.hero-line-1', { xPercent: -14, ease: 'none' }, 0)
          .to('.hero-line-2', { xPercent: 14, ease: 'none' }, 0)
          .to('.hero-tilt', { rotate: 40, scale: 0.85, ease: 'none' }, 0)
          .to('.hero-bottom', { y: -60, autoAlpha: 0, ease: 'none' }, 0);

        // Inclinación 3D del logo siguiendo al ratón
        if (hasFinePointer()) {
          const rx = gsap.quickTo('.hero-tilt', 'rotationX', { duration: 0.8, ease: 'power3.out' });
          const ry = gsap.quickTo('.hero-tilt', 'rotationY', { duration: 0.8, ease: 'power3.out' });
          const onMove = (event) => {
            const x = event.clientX / window.innerWidth - 0.5;
            const y = event.clientY / window.innerHeight - 0.5;
            ry(x * 24);
            rx(-y * 24);
          };
          window.addEventListener('mousemove', onMove);
          return () => window.removeEventListener('mousemove', onMove);
        }
        return undefined;
      });
    },
    { scope: root },
  );

  // 2) Cuando termina la pantalla de carga, se reproduce la entrada
  useGSAP(() => {
    if (ready) intro.current?.play();
  }, [ready]);


  return (
    <section ref={root} id="inicio" className="relative flex min-h-svh flex-col overflow-hidden pt-24 md:pt-28">
      {/* Fondo: cuadrícula que se desvanece hacia los bordes + halo azul */}
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_40%,black_10%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 size-[40rem] rounded-full bg-electric/15 blur-[140px]"
      />

      <div className="wrap relative flex flex-1 flex-col">
        {/* Fila de datos */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 md:grid-cols-4">
          <p className="hero-meta label">{t.hero.eyebrow}</p>
          <p className="hero-meta label">{t.hero.role}</p>
          <p className="hero-meta label">{t.hero.location}</p>
          <p className="hero-meta label flex items-center gap-2 text-paper md:justify-end">
            <span className="size-1.5 rounded-full bg-cyan shadow-[0_0_10px] shadow-cyan" />
            {t.hero.status}
          </p>
        </div>
        <div className="hero-rule mt-5 h-px w-full bg-white/10" />

        {/* Nombre gigante + logo */}
        <div className="relative grid flex-1 grid-cols-1 items-center gap-6 py-8 lg:grid-cols-[1fr_auto] lg:py-6">
          <h1 className="relative z-10 order-2 font-semibold leading-[0.84] tracking-[-0.055em] lg:order-1">
            <span className="sr-only">{profile.name}</span>
            <span className="hero-line-1 block whitespace-nowrap text-[clamp(4.25rem,19vw,15.5rem)] lg:text-[12vw] xl:text-[min(14vw,15.5rem)]">
              <Letters word={profile.firstName} />
            </span>
            <span className="hero-line-2 block whitespace-nowrap pl-[8vw] text-[clamp(4.25rem,19vw,15.5rem)] lg:pl-[12vw] lg:text-[12vw] xl:text-[min(14vw,15.5rem)]">
              <Letters word={profile.lastName} />
              <span className="hero-char ml-[0.04em] inline-block text-electric">.</span>
            </span>
          </h1>

          {/* Logo animado */}
          <div className="hero-logo relative order-1 size-40 justify-self-end [perspective:1000px] sm:size-52 lg:order-2 lg:size-[22rem] xl:size-[26rem]">
            <div className="hero-glow absolute inset-[18%] rounded-full bg-electric/40 opacity-60 blur-3xl" />
            <div className="hero-tilt relative size-full [transform-style:preserve-3d]">
              {/* Anillo de texto que gira */}
              <svg viewBox="0 0 200 200" className="hero-ring absolute inset-0 size-full" aria-hidden="true">
                <defs>
                  <path id="ring-path" d="M100,100 m-88,0 a88,88 0 1,1 176,0 a88,88 0 1,1 -176,0" />
                </defs>
                <text className="fill-muted font-mono text-[7.4px] uppercase tracking-[0.2em]">
                  <textPath href="#ring-path" textLength="548" lengthAdjust="spacing">
                    {t.hero.ring}
                  </textPath>
                </text>
              </svg>
              {/* Órbita con un punto que da vueltas */}
              <div className="hero-orbit absolute inset-[9%] rounded-full border border-dashed border-white/10">
                <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_12px] shadow-cyan" />
              </div>
              <div className="hero-float absolute inset-[17%]">
                <img
                  src={profile.logo}
                  alt="Logo PM"
                  className="size-full object-contain drop-shadow-[0_0_30px_rgba(31,123,255,0.35)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Parte de abajo: frase, introducción y botones */}
        <div className="hero-bottom grid gap-8 pb-10 md:pb-12 lg:grid-cols-12 lg:items-end">
          <p className="hero-fade text-[clamp(1.75rem,3.6vw,3rem)] font-medium leading-[1.05] tracking-tight lg:col-span-5">
            {t.hero.lead}{' '}
            <span className="text-brand pr-1 font-serif text-[1.15em] font-normal italic">{t.hero.accent}</span>
          </p>
          <p className="hero-fade max-w-md text-[15px] leading-relaxed text-muted lg:col-span-4">{t.hero.intro}</p>
          <div className="hero-fade flex flex-wrap items-center gap-3 lg:col-span-3 lg:justify-end">
            <Magnetic>
              <a
                href="#proyectos"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToTarget('#proyectos');
                }}
                className="group inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-full bg-paper px-6 text-sm font-medium text-ink-950 transition-colors hover:bg-white"
              >
                {t.hero.ctaProjects}
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.cv}
                download={profile.cvFileName}
                className="inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-full border border-white/15 px-6 text-sm font-medium transition-colors hover:border-electric hover:text-white"
              >
                {t.hero.ctaCv}
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

    </section>
  );
}

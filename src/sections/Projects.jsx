import { useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { profile, projectsMeta } from '../data/site';
import { gsap, useGSAP } from '../lib/gsap';
import { useReveal } from '../hooks/useReveal';
import SectionLabel from '../components/SectionLabel';
import SplitWords from '../components/SplitWords';
import Magnetic from '../components/Magnetic';
import BrowserFrame from '../components/BrowserFrame';

/**
 * Proyectos.
 * La parte más llamativa es la galería de capturas de Tracki:
 *  - En ordenador (≥1024 px) la galería se queda "clavada" en pantalla (pin)
 *    y, mientras sigues haciendo scroll hacia abajo, las capturas se
 *    desplazan en horizontal. Cada captura crece un poco al entrar.
 *  - En móvil y tablet es un carrusel normal que se desliza con el dedo.
 */
export default function Projects() {
  const { t } = useLanguage();
  const root = useRef(null);
  const project = t.projects.list[0];
  const meta = projectsMeta[project.id];
  const host = meta.demoUrl.replace('https://', '');

  useReveal(root);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const pin = root.current.querySelector('.pj-pin');
        const track = root.current.querySelector('.pj-track');
        const rail = root.current.querySelector('.pj-rail');
        const counter = root.current.querySelector('.pj-counter');
        const total = meta.gallery.length;
        const distance = () => rail.scrollWidth - document.documentElement.clientWidth;

        gsap.set(track, { overflow: 'clip' });

        const slide = gsap.to(rail, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              gsap.set('.pj-progress', { scaleX: self.progress });
              const current = Math.min(total, Math.floor(self.progress * total) + 1);
              counter.textContent = `0${current} / 0${total}`;
            },
          },
        });

        // Cada captura entra un poco más pequeña y apagada y crece al llegar
        gsap.utils.toArray('.pj-card', root.current).forEach((card, index) => {
          if (index === 0) return;
          gsap.from(card.querySelector('.pj-frame'), {
            scale: 0.86,
            opacity: 0.35,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              containerAnimation: slide,
              start: 'left right',
              end: 'left 35%',
              scrub: true,
            },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="proyectos" className="relative pb-10 pt-24 md:pb-14 md:pt-36">
      <div className="wrap">
        <SectionLabel index="01">{t.projects.label}</SectionLabel>

        <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
          <h2 data-split className="text-[clamp(3.25rem,9vw,8.5rem)] font-medium leading-[0.9] tracking-[-0.045em] md:col-span-8">
            <SplitWords text={t.projects.title} />{' '}
            <SplitWords text={t.projects.titleAccent} wordClassName="text-brand pr-[0.08em] font-serif font-normal italic" />
          </h2>
          <p data-reveal className="max-w-sm text-[15px] leading-relaxed text-muted md:col-span-4 md:justify-self-end">
            {t.projects.intro}
          </p>
        </div>

        {/* Tracki: información */}
        <article className="mt-16 grid gap-10 border-t border-white/10 pt-10 md:mt-24 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label text-electric">01</p>
            <h3 data-split className="mt-3 text-[clamp(3.75rem,10vw,8rem)] font-semibold leading-[0.85] tracking-[-0.055em]">
              <SplitWords text={project.title} />
            </h3>
            <p data-reveal className="mt-4 font-serif text-2xl italic text-muted md:text-3xl">
              {project.tagline}
            </p>
          </div>

          <div data-reveal className="lg:col-span-7">
            <dl className="grid grid-cols-2 gap-6 border-b border-white/10 pb-6">
              <div>
                <dt className="label">{t.projects.yearLabel}</dt>
                <dd className="mt-2 text-lg">{project.year}</dd>
              </div>
              <div>
                <dt className="label">{t.projects.typeLabel}</dt>
                <dd className="mt-2 text-lg">{project.type}</dd>
              </div>
            </dl>
            <p className="mt-6 text-lg leading-relaxed text-paper/85">{project.summary}</p>
            <p className="label mt-8">{t.projects.stackLabel}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {meta.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-white/10 px-3.5 py-1.5 font-mono text-xs text-paper/80">
                  {tag}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Magnetic>
                <a
                  href={meta.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor={t.projects.demo}
                  className="group inline-flex h-14 items-center gap-3 rounded-full bg-electric px-7 text-sm font-medium text-white shadow-[0_10px_40px_-10px_rgba(31,123,255,0.8)] transition-colors hover:bg-[#3b8cff]"
                >
                  {t.projects.demo}
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </a>
              </Magnetic>
              <span className="label">{t.projects.liveNote}</span>
            </div>
          </div>
        </article>
      </div>

      {/* Tracki: galería de capturas (horizontal) */}
      <div className="pj-pin relative mt-16 md:mt-24 lg:flex lg:h-svh lg:flex-col lg:justify-center">
        <div className="wrap mb-6 flex items-center justify-between gap-4">
          <p className="label">
            <span className="lg:hidden">{t.projects.hintMobile} →</span>
            <span className="hidden lg:inline">{t.projects.hintDesktop} ↓</span>
          </p>
          <p className="pj-counter label tabular-nums text-paper">01 / 0{meta.gallery.length}</p>
        </div>

        <div className="pj-track snap-track snap-x snap-mandatory overflow-x-auto lg:snap-none">
          <ul className="pj-rail flex w-max gap-4 px-5 md:gap-6 md:px-10 lg:gap-10">
            {meta.gallery.map((src, index) => (
              <li
                key={src}
                className="pj-card w-[84vw] shrink-0 snap-center sm:w-[68vw] lg:w-[min(60vw,64rem,calc((100svh-15rem)*1.6))]"
              >
                <a href={meta.demoUrl} target="_blank" rel="noreferrer" data-cursor={t.projects.demo} className="block">
                  <BrowserFrame
                    className="pj-frame"
                    src={src}
                    alt={`${project.title} — ${t.projects.shots[index]}`}
                    url={host}
                  />
                </a>
                <p className="label mt-4 flex justify-between gap-4">
                  <span>
                    <span className="text-electric">0{index + 1}</span> — {t.projects.shots[index]}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="wrap mt-8 hidden lg:block" aria-hidden="true">
          <div className="h-px bg-white/10">
            <div className="pj-progress h-full origin-left scale-x-0 bg-gradient-to-r from-deep via-electric to-cyan" />
          </div>
        </div>
      </div>

      {/* Más en camino → GitHub */}
      <div className="wrap mt-20 md:mt-28">
        <a
          data-reveal
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          data-cursor="GitHub"
          className="group relative block overflow-hidden rounded-2xl border border-white/10 px-6 py-10 md:px-12 md:py-14"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 origin-bottom scale-y-0 bg-electric transition-transform duration-700 ease-out-expo group-hover:scale-y-100"
          />
          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="label transition-colors group-hover:text-white/80">02</p>
              <p className="mt-3 text-[clamp(2.25rem,5.5vw,4.75rem)] font-medium leading-none tracking-[-0.04em]">
                {t.projects.soonTitle}
              </p>
              <p className="mt-4 max-w-xl leading-relaxed text-muted transition-colors group-hover:text-white/85">
                {t.projects.soonText}
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-4 text-sm font-medium">
              {t.projects.soonCta}
              <span
                aria-hidden="true"
                className="grid size-14 place-items-center rounded-full border border-white/20 text-xl transition-transform duration-500 group-hover:rotate-45 group-hover:border-white"
              >
                ↑
              </span>
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}

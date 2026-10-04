import { useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { profile } from '../data/site';
import { gsap, useGSAP } from '../lib/gsap';

/**
 * Pantalla de carga (unos 2 segundos).
 * Es una "línea de tiempo" (timeline) de GSAP: varias animaciones encadenadas
 * una detrás de otra, como en un editor de vídeo.
 *   1. El contador sube de 000 a 100 mientras la barra se llena.
 *   2. El logo y los textos se van.
 *   3. El panel entero sube como una persiana y deja ver la web.
 * Al terminar avisa a la App (onDone) para que empiece la animación del inicio.
 */
export default function Preloader({ onDone }) {
  const { t } = useLanguage();
  const root = useRef(null);
  const counter = useRef(null);

  useGSAP(
    () => {
      const progress = { value: 0 };
      const tl = gsap.timeline({ onComplete: onDone });

      tl.from('.pl-logo', { scale: 0.6, autoAlpha: 0, duration: 0.8 })
        .from('.pl-text', { yPercent: 110, stagger: 0.08, duration: 0.8 }, '<0.1')
        .to(
          progress,
          {
            value: 100,
            duration: 1.5,
            ease: 'power2.inOut',
            onUpdate: () => {
              counter.current.textContent = String(Math.round(progress.value)).padStart(3, '0');
            },
          },
          0.2,
        )
        .fromTo('.pl-bar', { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }, 0.2)
        .to('.pl-logo', { rotate: 90, scale: 0.8, autoAlpha: 0, duration: 0.5, ease: 'power2.in' })
        .to('.pl-text', { yPercent: -110, stagger: 0.05, duration: 0.5, ease: 'power2.in' }, '<')
        .to(root.current, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '-=0.15');
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      role="status"
      aria-label={t.loader}
      className="fixed inset-0 z-[95] flex flex-col justify-between bg-ink-900 p-5 md:p-10"
    >
      <div className="overflow-hidden">
        <p className="pl-text label">{t.loader}</p>
      </div>

      <img
        src={profile.logo}
        alt=""
        className="pl-logo mx-auto size-28 drop-shadow-[0_0_40px_rgba(31,123,255,0.45)] md:size-36"
      />

      <div>
        <div className="flex items-end justify-between gap-6">
          <div className="overflow-hidden">
            <p className="pl-text text-lg font-medium tracking-tight md:text-2xl">{profile.name}</p>
          </div>
          <div className="overflow-hidden">
            <p ref={counter} className="pl-text font-mono text-5xl font-light tabular-nums leading-none text-paper md:text-8xl">
              000
            </p>
          </div>
        </div>
        <div className="mt-5 h-px w-full bg-white/10">
          <div className="pl-bar h-full origin-left bg-gradient-to-r from-deep via-electric to-cyan" />
        </div>
      </div>
    </div>
  );
}

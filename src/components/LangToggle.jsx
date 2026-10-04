import { useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { gsap, prefersReducedMotion } from '../lib/gsap';

/**
 * Botón ES / EN.
 * La "píldora" azul se desliza al idioma activo (transición CSS) y, al
 * pulsar, GSAP hace un pequeño rebote del botón para que se note el cambio.
 */
export default function LangToggle({ className = '' }) {
  const { lang, toggle, t } = useLanguage();
  const button = useRef(null);

  const onClick = () => {
    toggle();
    if (!prefersReducedMotion()) {
      gsap.fromTo(button.current, { scale: 0.9 }, { scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
    }
  };

  return (
    <button
      ref={button}
      type="button"
      onClick={onClick}
      aria-label={t.language.switchTo}
      title={t.language.switchTo}
      className={`relative grid h-9 w-[5.25rem] shrink-0 grid-cols-2 items-center rounded-full border border-white/12 bg-ink-900/60 p-1 text-center font-mono text-[11px] font-medium tracking-[0.12em] ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-electric shadow-[0_0_18px_rgba(31,123,255,0.55)] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{ transform: lang === 'en' ? 'translateX(100%)' : 'translateX(0)' }}
      />
      <span className={`relative z-10 transition-colors duration-300 ${lang === 'es' ? 'text-white' : 'text-muted'}`}>ES</span>
      <span className={`relative z-10 transition-colors duration-300 ${lang === 'en' ? 'text-white' : 'text-muted'}`}>EN</span>
    </button>
  );
}

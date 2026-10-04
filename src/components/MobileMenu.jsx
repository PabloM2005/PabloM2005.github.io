import { useEffect, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { navLinks, profile } from '../data/site';
import { gsap, useGSAP } from '../lib/gsap';
import { lockScroll, scrollToTarget } from '../lib/smoothScroll';

/**
 * Menú a pantalla completa para móvil y tablet.
 * Se abre con una timeline de GSAP: el fondo "baja" recortándose
 * (clip-path) y después los enlaces suben uno detrás de otro (stagger).
 * Para cerrar, la misma timeline se reproduce al revés (reverse).
 */
export default function MobileMenu({ open, onClose }) {
  const { t } = useLanguage();
  const root = useRef(null);
  const tl = useRef(null);

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true })
        .set(root.current, { visibility: 'visible' })
        .fromTo(
          root.current,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'expo.inOut' },
        )
        .from('.mm-link', { yPercent: 120, stagger: 0.07, duration: 0.9 }, '-=0.3')
        .from('.mm-foot', { autoAlpha: 0, y: 16, duration: 0.6 }, '-=0.6');
    },
    { scope: root },
  );

  const wasOpen = useRef(false);

  useEffect(() => {
    if (!tl.current) return undefined;
    if (open) {
      tl.current.timeScale(1).play();
      lockScroll(true);
    } else if (wasOpen.current) {
      tl.current.timeScale(1.6).reverse();
      lockScroll(false);
    }
    wasOpen.current = open;
    const onKey = (event) => event.key === 'Escape' && onClose();
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const go = (event, href) => {
    event.preventDefault();
    onClose();
    // Se espera a que el menú empiece a cerrarse antes de desplazar la página
    setTimeout(() => scrollToTarget(href), 350);
  };

  return (
    <div
      ref={root}
      id="menu-movil"
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      inert={!open}
      className="invisible fixed inset-0 z-[60] flex flex-col bg-ink-900 lg:hidden"
    >
      <div className="wrap flex h-16 items-center justify-between md:h-20">
        <span className="label">{t.nav.menu}</span>
        <button
          type="button"
          onClick={onClose}
          className="label flex h-9 items-center gap-2 rounded-full border border-white/12 px-4 text-paper"
        >
          {t.nav.close} <span aria-hidden="true">✕</span>
        </button>
      </div>

      <nav aria-label={t.nav.aria} className="wrap flex flex-1 flex-col justify-center">
        <ul className="space-y-1">
          {navLinks.map((link, index) => (
            <li key={link.key} className="overflow-hidden">
              <a
                href={link.href}
                onClick={(event) => go(event, link.href)}
                className="mm-link flex items-baseline gap-4 py-1 text-[clamp(2.75rem,12vw,5.5rem)] font-medium leading-none tracking-tighter"
              >
                <span className="font-mono text-xs tracking-normal text-electric">0{index}</span>
                {t.nav[link.key]}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mm-foot wrap flex flex-wrap items-center justify-between gap-3 border-t border-white/8 py-6">
        <a href={`mailto:${profile.email}`} className="text-sm text-muted">
          {profile.email}
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer" className="label text-paper">
          GitHub ↗
        </a>
      </div>
    </div>
  );
}

import { useRef, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { navLinks, profile } from '../data/site';
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { scrollToTarget } from '../lib/smoothScroll';
import LangToggle from './LangToggle';
import Clock from './Clock';
import MobileMenu from './MobileMenu';

/**
 * Barra superior.
 *  - Se esconde al bajar y reaparece al subir (ScrollTrigger detecta la
 *    dirección del scroll).
 *  - Cuando ya no estás arriba del todo, gana un fondo oscuro desenfocado.
 *  - En pantallas pequeñas los enlaces pasan a un menú a pantalla completa.
 */
export default function Header({ ready }) {
  const { t } = useLanguage();
  const bar = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useGSAP(
    () => {
      if (!ready) return;
      if (!prefersReducedMotion()) {
        gsap.from(bar.current.querySelectorAll('.hd-item'), { y: -30, autoAlpha: 0, stagger: 0.06, delay: 0.5 });
      }

      let hidden = false;
      let solid = false;
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const y = self.scroll();
          const shouldHide = self.direction === 1 && y > 160;
          if (shouldHide !== hidden) {
            hidden = shouldHide;
            gsap.to(bar.current, { yPercent: hidden ? -110 : 0, duration: 0.6, ease: 'power3.out' });
          }
          const shouldBeSolid = y > 40;
          if (shouldBeSolid !== solid) {
            solid = shouldBeSolid;
            bar.current.dataset.solid = String(solid);
          }
        },
      });
    },
    { dependencies: [ready], scope: bar },
  );

  const go = (event, href) => {
    event.preventDefault();
    scrollToTarget(href);
  };

  return (
    <>
      <header
        ref={bar}
        data-solid="false"
        className="group/hd fixed inset-x-0 top-0 z-50 border-b border-transparent transition-[background-color,border-color,backdrop-filter] duration-500 data-[solid=true]:border-white/8 data-[solid=true]:bg-ink-950/70 data-[solid=true]:backdrop-blur-xl"
      >
        <div className="wrap flex h-16 items-center justify-between gap-4 md:h-20">
          <a
            href="#inicio"
            onClick={(event) => go(event, '#inicio')}
            className="hd-item flex items-center gap-3"
            aria-label={profile.name}
          >
            <img src={profile.logo} alt="" className="size-8 drop-shadow-[0_0_12px_rgba(31,123,255,0.5)]" />
            <span className="hidden sm:inline-flex">
              <span className="roll text-sm font-medium tracking-tight">
                <span>{profile.firstName} {profile.lastName}</span>
                <span>{profile.firstName} {profile.lastName}</span>
              </span>
            </span>
          </a>

          <nav aria-label={t.nav.aria} className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((link, index) => (
                <li key={link.key} className="hd-item">
                  <a
                    href={link.href}
                    onClick={(event) => go(event, link.href)}
                    className="flex items-baseline gap-1.5 text-sm text-paper/80 transition-colors hover:text-paper"
                  >
                    <span className="font-mono text-[10px] text-electric">0{index}</span>
                    <span className="roll">
                      <span>{t.nav[link.key]}</span>
                      <span>{t.nav[link.key]}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3 md:gap-5">
            <p className="hd-item label hidden items-center gap-2 md:flex">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-cyan" />
              </span>
              ZGZ <Clock />
            </p>
            <div className="hd-item">
              <LangToggle />
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="hd-item label flex h-9 items-center gap-2 rounded-full border border-white/12 px-4 text-paper lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="menu-movil"
            >
              {t.nav.menu}
              <span aria-hidden="true" className="flex flex-col gap-[3px]">
                <span className="block h-px w-3.5 bg-paper" />
                <span className="block h-px w-3.5 bg-paper" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

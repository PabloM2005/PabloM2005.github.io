import { useLanguage } from '../i18n/LanguageContext';
import { profile } from '../data/site';
import { scrollToTarget } from '../lib/smoothScroll';
import Clock from './Clock';

/** Pie de página tipo "barra de estado": autor, tecnologías, hora y volver arriba */
export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/8">
      <div className="wrap grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-4 lg:items-center">
        <p className="label flex items-center gap-3 text-paper">
          <img src={profile.logo} alt="" className="size-5" />© 2026 {profile.name}
        </p>
        <p className="label">{t.footer.madeWith}</p>
        <p className="label">
          {t.footer.localTime} · <Clock className="text-paper" />
        </p>
        <button
          type="button"
          onClick={() => scrollToTarget(0)}
          className="label group flex items-center gap-2 justify-self-start text-paper sm:justify-self-end lg:col-start-4"
        >
          <span className="roll">
            <span>{t.footer.top}</span>
            <span>{t.footer.top}</span>
          </span>
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5">↑</span>
        </button>
      </div>
    </footer>
  );
}

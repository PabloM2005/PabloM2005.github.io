import { useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { profile } from '../data/site';
import { useReveal } from '../hooks/useReveal';
import SectionLabel from '../components/SectionLabel';
import SplitWords from '../components/SplitWords';
import Magnetic from '../components/Magnetic';

/**
 * Contacto. No hay formulario ni backend: el correo abre directamente la
 * aplicación de email del visitante (enlace mailto:).
 */
export default function Contact() {
  const { t } = useLanguage();
  const root = useRef(null);
  useReveal(root);

  return (
    <section ref={root} id="contacto" className="relative overflow-hidden pb-16 pt-24 md:pt-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-60 left-1/2 size-[46rem] -translate-x-1/2 rounded-full bg-electric/15 blur-[150px]"
      />
      <div className="wrap relative">
        <SectionLabel index="03">{t.contact.label}</SectionLabel>

        <h2 data-split className="mt-10 text-[clamp(3.75rem,14vw,13rem)] font-semibold leading-[0.85] tracking-[-0.055em]">
          <SplitWords text={t.contact.title} />
        </h2>

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:items-end">
          <p data-reveal className="max-w-md text-[15px] leading-relaxed text-muted md:col-span-5">
            {t.contact.text}
          </p>

          <div data-reveal className="md:col-span-7 md:justify-self-end md:text-right">
            <p className="label">{t.contact.emailLabel}</p>
            <a
              href={`mailto:${profile.email}`}
              data-cursor="Email"
              className="group relative mt-3 inline-block break-all text-[clamp(1.4rem,3.6vw,3.25rem)] font-medium tracking-[-0.03em]"
            >
              {profile.email}
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-[2px] w-full origin-right scale-x-0 bg-gradient-to-r from-deep via-electric to-cyan transition-transform duration-700 ease-out-expo group-hover:origin-left group-hover:scale-x-100"
              />
            </a>
          </div>
        </div>

        <div data-reveal className="mt-14 flex flex-wrap gap-3">
          <Magnetic>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 px-6 text-sm font-medium transition-colors hover:border-electric hover:text-white"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={profile.cv}
              download={profile.cvFileName}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-paper px-6 text-sm font-medium text-ink-950 transition-colors hover:bg-white"
            >
              {t.contact.cv} <span aria-hidden="true">↓</span>
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

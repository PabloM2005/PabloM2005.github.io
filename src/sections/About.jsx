import { useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { gsap, useGSAP } from '../lib/gsap';
import { useReveal } from '../hooks/useReveal';
import SectionLabel from '../components/SectionLabel';
import SplitWords from '../components/SplitWords';

/**
 * Sobre mí.
 *  - La frase grande se "enciende" palabra a palabra según haces scroll:
 *    cada palabra pasa de gris oscuro a blanco (scrub = va atada a la rueda,
 *    si subes se vuelve a apagar).
 *  - El resto de bloques usan las animaciones de entrada comunes (useReveal).
 */
export default function About() {
  const { t } = useLanguage();
  const root = useRef(null);
  const statementWords = t.about.statement.split(' ');

  useReveal(root);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.ab-word',
          { color: '#2a2f3c' },
          {
            color: '#eef1f7',
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: { trigger: '.ab-statement', start: 'top 80%', end: 'bottom 45%', scrub: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="sobre-mi" className="relative py-24 md:py-36">
      <div className="wrap">
        <SectionLabel index="02">{t.about.label}</SectionLabel>

        {/* Frase que se ilumina con el scroll */}
        <p className="ab-statement mt-12 max-w-6xl text-[clamp(1.75rem,4.4vw,4rem)] font-medium leading-[1.08] tracking-[-0.03em] md:mt-16">
          {statementWords.map((word, index) => (
            <span key={index} className="ab-word">
              {word}{' '}
            </span>
          ))}
        </p>

        {/* Bio + datos + tecnologías */}
        <div className="mt-20 grid gap-14 md:mt-28 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-1">
              {t.about.facts.map((fact) => (
                <div key={fact.label} data-reveal className="flex items-center justify-between gap-4 bg-ink-950 px-5 py-4 sm:flex-col sm:items-start lg:flex-row lg:items-center">
                  <dt className="label">{fact.label}</dt>
                  <dd className="text-[15px]">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 space-y-5 text-[15px] leading-relaxed text-muted">
              <p data-reveal>{t.about.bio1}</p>
              <p data-reveal>{t.about.bio2}</p>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <p data-reveal className="label">{t.about.skillsLabel}</p>
            <ul className="mt-4">
              {t.about.skills.map((group) => (
                <li
                  key={group.group}
                  data-reveal
                  className="group grid gap-2 border-b border-white/10 py-5 transition-colors sm:grid-cols-[9rem_1fr] sm:items-baseline"
                >
                  <span className="label transition-colors group-hover:text-electric">{group.group}</span>
                  <span className="text-xl leading-snug tracking-tight md:text-2xl">
                    {group.items.map((item, index) => (
                      <span key={item} className="inline-block whitespace-nowrap">
                        <span className="transition-colors hover:text-cyan">{item}</span>
                        {index < group.items.length - 1 && <span className="px-2 text-dim">/</span>}{' '}
                      </span>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cómo trabajo */}
        <div className="mt-24 md:mt-32">
          <p data-reveal className="label">{t.about.processLabel}</p>
          <ol className="mt-6 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {t.about.process.map((step, index) => (
              <li key={step.title} data-reveal data-delay={index * 0.08}>
                <span data-line className="block h-px w-full bg-gradient-to-r from-electric to-transparent" />
                <p className="mt-5 font-mono text-xs text-electric">0{index + 1}</p>
                <p className="mt-2 text-2xl font-medium tracking-tight">{step.title}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Cita */}
        <blockquote data-split className="mx-auto mt-28 max-w-5xl text-center text-[clamp(2rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.03em] md:mt-40">
          <SplitWords text={t.about.quoteBefore} className="font-medium" />{' '}
          <SplitWords text={t.about.quoteAccent} wordClassName="text-brand pr-[0.06em] font-serif italic" />
        </blockquote>
      </div>
    </section>
  );
}

import { useRef } from 'react';
import { marqueeTech } from '../data/site';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';

/**
 * Cinta infinita con las tecnologías.
 * GSAP la mueve sin parar (repeat: -1). Además, ScrollTrigger mide la
 * velocidad del scroll: si bajas rápido la cinta acelera, y si subes
 * cambia de sentido. Después vuelve poco a poco a su velocidad normal.
 */
export default function Marquee() {
  const root = useRef(null);
  const items = [...marqueeTech, ...marqueeTech];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const loop = gsap.to('.mq-track', { xPercent: -50, duration: 38, ease: 'none', repeat: -1 });

        let direction = 1;
        ScrollTrigger.create({
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            direction = self.direction;
            const boost = Math.min(Math.abs(self.getVelocity()) / 250, 6);
            gsap
              .timeline()
              .to(loop, { timeScale: direction * (1 + boost), duration: 0.2, overwrite: true })
              .to(loop, { timeScale: direction, duration: 1.2, ease: 'power2.out' });
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="Tecnologías" className="relative overflow-hidden border-y border-white/8 bg-ink-900 py-6 md:py-8">
      <div className="mq-track flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {items.map((tech, index) => (
              <li key={`${copy}-${index}`} className="flex items-center">
                <span
                  className={`px-6 text-[clamp(1.75rem,4.5vw,3.75rem)] font-medium tracking-tight md:px-10 ${
                    index % 2 ? 'font-serif font-normal italic text-muted' : 'text-paper'
                  }`}
                >
                  {tech}
                </span>
                <span aria-hidden="true" className="text-xl text-electric md:text-2xl">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}

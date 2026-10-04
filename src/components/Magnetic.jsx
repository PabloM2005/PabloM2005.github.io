import { useRef } from 'react';
import { gsap, useGSAP, hasFinePointer, prefersReducedMotion } from '../lib/gsap';

/**
 * Efecto magnético: el elemento se desplaza un poco hacia el ratón cuando
 * está encima, y al salir vuelve a su sitio con un rebote elástico.
 *
 * gsap.quickTo crea una función muy rápida que anima siempre la misma
 * propiedad; es ideal para cosas que se actualizan en cada movimiento del ratón.
 */
export default function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !hasFinePointer() || prefersReducedMotion()) return;

      const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });

      const onMove = (event) => {
        const rect = el.getBoundingClientRect();
        xTo((event.clientX - (rect.left + rect.width / 2)) * strength);
        yTo((event.clientY - (rect.top + rect.height / 2)) * strength);
      };
      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.35)' });
      };

      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      return () => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
      };
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}

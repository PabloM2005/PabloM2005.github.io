import { useRef } from 'react';
import { gsap, useGSAP, hasFinePointer, prefersReducedMotion } from '../lib/gsap';

/**
 * Cursor personalizado (solo en ordenadores con ratón).
 *  - Un punto que sigue al ratón casi al instante.
 *  - Un anillo que lo sigue con retraso, lo que da sensación de fluidez.
 *  - Encima de un enlace el anillo crece; si el elemento tiene
 *    data-cursor="Texto", el anillo se hace grande y muestra ese texto.
 */
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const label = useRef(null);

  useGSAP(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    document.documentElement.classList.add('has-custom-cursor');

    gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    const dotX = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3.out' });
    const dotY = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3.out' });
    const ringX = gsap.quickTo(ring.current, 'x', { duration: 0.55, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring.current, 'y', { duration: 0.55, ease: 'power3.out' });

    let visible = false;
    const onMove = (event) => {
      if (!visible) {
        visible = true;
        gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.3 });
      }
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
    };

    const onOver = (event) => {
      const target = event.target.closest('[data-cursor], a, button');
      if (!target) return;
      const text = target.getAttribute('data-cursor');
      label.current.textContent = text ?? '';
      gsap.to(ring.current, {
        width: text ? 96 : 56,
        height: text ? 96 : 56,
        backgroundColor: text ? 'rgba(31, 123, 255, 0.92)' : 'rgba(255, 255, 255, 0.04)',
        borderColor: text ? 'rgba(31, 123, 255, 0)' : 'rgba(238, 241, 247, 0.5)',
        duration: 0.4,
        ease: 'power3.out',
      });
      gsap.to(label.current, { autoAlpha: text ? 1 : 0, duration: 0.25 });
      gsap.to(dot.current, { scale: text ? 0 : 1, duration: 0.25 });
    };

    const onOut = (event) => {
      const from = event.target.closest('[data-cursor], a, button');
      const to = event.relatedTarget?.closest?.('[data-cursor], a, button');
      if (!from || from === to) return;
      gsap.to(ring.current, {
        width: 34,
        height: 34,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        borderColor: 'rgba(238, 241, 247, 0.35)',
        duration: 0.4,
        ease: 'power3.out',
      });
      gsap.to(label.current, { autoAlpha: 0, duration: 0.2 });
      gsap.to(dot.current, { scale: 1, duration: 0.25 });
    };

    const onLeaveWindow = () => {
      visible = false;
      gsap.to([dot.current, ring.current], { autoAlpha: 0, duration: 0.3 });
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    document.documentElement.addEventListener('mouseleave', onLeaveWindow);
    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.documentElement.removeEventListener('mouseleave', onLeaveWindow);
    };
  });

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] hidden [@media(hover:hover)_and_(pointer:fine)]:block">
      <div
        ref={ring}
        className="fixed left-0 top-0 grid size-[34px] place-items-center rounded-full border border-paper/35 opacity-0"
      >
        <span
          ref={label}
          className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-white opacity-0"
        />
      </div>
      <div ref={dot} className="fixed left-0 top-0 size-1.5 rounded-full bg-paper opacity-0" />
    </div>
  );
}

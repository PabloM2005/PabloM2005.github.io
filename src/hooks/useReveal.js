import { gsap, useGSAP } from '../lib/gsap';

/**
 * Animaciones de entrada al hacer scroll, reutilizables en todas las secciones.
 *
 * Basta con marcar los elementos en el JSX:
 *   data-reveal  → el bloque sube y aparece.
 *   data-split   → el texto (hecho con <SplitWords>) sale palabra a palabra
 *                  desde debajo de una "máscara".
 *   data-line    → una línea que se dibuja de izquierda a derecha.
 *
 * Cada animación tiene su propio ScrollTrigger: empieza cuando el elemento
 * llega al 88 % de la altura de la pantalla y solo se reproduce una vez.
 * Si el usuario ha pedido reducir movimiento no se crea ninguna.
 */
export function useReveal(scope, deps = []) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        root.querySelectorAll('[data-reveal]').forEach((el) => {
          gsap.from(el, {
            y: 48,
            autoAlpha: 0,
            delay: Number(el.dataset.delay ?? 0),
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          });
        });

        root.querySelectorAll('[data-split]').forEach((el) => {
          gsap.from(el.querySelectorAll('.split-inner'), {
            yPercent: 115,
            rotate: 4,
            duration: 1.2,
            stagger: 0.06,
            delay: Number(el.dataset.delay ?? 0),
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          });
        });

        root.querySelectorAll('[data-line]').forEach((el) => {
          gsap.from(el, {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 1.6,
            ease: 'expo.inOut',
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          });
        });
      });
    },
    { scope, dependencies: deps },
  );
}

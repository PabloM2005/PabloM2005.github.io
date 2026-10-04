/**
 * Scroll suave con Lenis, sincronizado con GSAP ScrollTrigger.
 *
 * Lenis suaviza la rueda del ratón (el scroll "se desliza" en vez de ir a
 * saltos). Para que las animaciones ligadas al scroll vayan perfectamente a
 * la par, Lenis se actualiza con el mismo reloj que GSAP (gsap.ticker) y
 * avisa a ScrollTrigger cada vez que la página se mueve.
 */
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap';

let lenis = null;

export function startSmoothScroll() {
  if (prefersReducedMotion()) return () => {};

  lenis = new Lenis({ duration: 1.15, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);

  const tick = (time) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

/** Desplaza la página hasta un selector ("#proyectos"), un elemento o un número */
export function scrollToTarget(target) {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.4 });
    return;
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    return;
  }
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  element?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

/** Bloquea / desbloquea el scroll (pantalla de carga y menú del móvil) */
export function lockScroll(locked) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}

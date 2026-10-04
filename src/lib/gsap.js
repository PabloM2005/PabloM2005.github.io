/**
 * Punto único donde se prepara GSAP.
 * Los plugins se registran una sola vez aquí y el resto de la web los
 * importa desde este archivo.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Curva de movimiento por defecto: arranca rápido y frena suave.
gsap.defaults({ ease: 'expo.out', duration: 1.1 });

/** true si el usuario ha pedido "reducir movimiento" en su sistema */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** true en ordenadores con ratón (no en móviles ni tablets táctiles) */
export const hasFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export { gsap, ScrollTrigger, useGSAP };

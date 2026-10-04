import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// base: './' hace que todas las rutas de la web compilada sean relativas.
// Así funciona igual en GitHub Pages tanto si el repositorio se llama
// "PabloM2005.github.io" como si tiene otro nombre (por ejemplo "portfolio").
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
});

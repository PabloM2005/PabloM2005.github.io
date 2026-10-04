import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/', // <--- ¡Solo la barra! (sin el punto)
  plugins: [react(), tailwindcss()],
});
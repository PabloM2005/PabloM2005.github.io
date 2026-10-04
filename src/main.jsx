import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Tipografías instaladas con npm (no dependen de Google Fonts)
import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import 'lenis/dist/lenis.css';
import './index.css';

import { LanguageProvider } from './i18n/LanguageContext';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);

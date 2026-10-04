import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from './translations';

/**
 * Contexto del idioma: guarda si la web está en español o en inglés y
 * entrega a cada componente los textos de ese idioma (`t`).
 * El idioma elegido se recuerda en el navegador (localStorage).
 */
const LanguageContext = createContext(null);
const STORAGE_KEY = 'portfolio-lang';

function readSavedLang() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === 'en' ? 'en' : 'es';
  } catch {
    return 'es';
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readSavedLang);
  const t = translations[lang];

  // Actualiza <html lang>, el título de la pestaña y la descripción.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* navegador sin almacenamiento: no pasa nada */
    }
  }, [lang, t]);

  const toggle = useCallback(() => setLang((current) => (current === 'es' ? 'en' : 'es')), []);
  const value = useMemo(() => ({ lang, t, toggle }), [lang, t, toggle]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage debe usarse dentro de <LanguageProvider>');
  return context;
}

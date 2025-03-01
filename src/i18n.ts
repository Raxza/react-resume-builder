import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../src/locales/en/translation.json';
import esTranslation from '../src/locales/es/translation.json';
import idTranslation from '../src/locales/id/translation.json';

const savedLanguage = localStorage.getItem('language') || 'en';

i18n
  .use(initReactI18next)
  .init({
    lng: savedLanguage,
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: enTranslation
      },
      es: {
        translation: esTranslation
      },
      id: {
        translation: idTranslation
      }
    }
  });

// Save language selection to localStorage when it changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;

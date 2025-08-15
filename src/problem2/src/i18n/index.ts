import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonEn from '@/locales/en/common.json';
import errorEn from '@/locales/en/error.json';
import homeEn from '@/locales/en/home.json';
import priceEn from '@/locales/en/price.json';
import validationEn from '@/locales/en/validation.json';

const resources = {
  en: {
    common: commonEn,
    error: errorEn,
    home: homeEn,
    price: priceEn,
    validation: validationEn,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // default language
  fallbackLng: 'en',
  defaultNS: 'common',
  nsSeparator: ':',
  keySeparator: '.',
  interpolation: {
    escapeValue: false,
  },
  debug: import.meta.env.DEV,
  react: {
    useSuspense: false,
  },
});

export default i18n;

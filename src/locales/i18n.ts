import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

// Import language resources
import en from './en.json';
import fr from './fr.json';
import de from './de.json';
import nl from './nl.json';
import es from './es.json';



// Define resources object
const resources = {
  en: en ,
  fr: fr ,
  nl: nl , 
  de: de ,
  es: es 
};

// Initialize i18n
i18n
  .use(initReactI18next) // Bind react-i18next to i18n
  .init({
    resources,
    // lng: RNLocalize.getLocales()[0].languageCode, // Set initial language based on device settings
    lng: 'en',
    fallbackLng: 'en', // Fallback language if translation is missing
    interpolation: {
      escapeValue: false // React already escapes by default
    },
    compatibilityJSON: 'v3',
  
  }) .then(() => console.log('i18n initialized successfully'))
  .catch((error) => console.error('Error initializing i18n:', error));

export default i18n;
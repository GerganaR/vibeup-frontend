import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import moment from "moment";

import en from "./locales/en.json";
import bg from "./locales/bg.json";

const STORAGE_KEY = "vibeup_language";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      bg: { translation: bg },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "bg"],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: STORAGE_KEY,
      caches: ["localStorage"],
    },
    react: {
      bindI18n: "languageChanged loaded added",
      bindI18nStore: "added",
    },
    debug: import.meta.env.DEV,
  });

// Synchronize moment locale with i18n language changes
i18n.on("languageChanged", (lng) => {
  moment.locale(lng === "bg" ? "bg" : "en");
});

// Set initial moment locale
moment.locale(i18n.language === "bg" ? "bg" : "en");

export { STORAGE_KEY };
export default i18n;

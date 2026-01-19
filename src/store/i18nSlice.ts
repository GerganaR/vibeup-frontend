import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import i18n, { STORAGE_KEY } from "@/i18n/i18n";

export type Language = "en" | "bg";

const CUSTOM_TRANSLATIONS_KEY = "vibeup_custom_translations";

interface I18nState {
  language: Language;
  customTranslations: Record<Language, Record<string, string>>;
}

const getInitialLanguage = (): Language => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "bg") {
    return stored;
  }
  return "en";
};

const getInitialTranslations = (): Record<Language, Record<string, string>> => {
  try {
    const stored = localStorage.getItem(CUSTOM_TRANSLATIONS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to parse custom translations", e);
  }
  return {
    en: {},
    bg: {},
  };
};

const initialState: I18nState = {
  language: getInitialLanguage(),
  customTranslations: getInitialTranslations(),
};

// Initialize i18next with stored custom translations immediately
const initI18nResources = () => {
  const custom = initialState.customTranslations;

  // Apply overrides to i18n instance
  Object.keys(custom).forEach((lang) => {
    const language = lang as Language;
    const overrides = custom[language];
    Object.keys(overrides).forEach((key) => {
      i18n.addResource(language, "translation", key, overrides[key]);
    });
  });
};

initI18nResources();

const i18nSlice = createSlice({
  name: "i18n",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
      localStorage.setItem(STORAGE_KEY, action.payload);
      i18n.changeLanguage(action.payload);
    },
    updateTranslation: (
      state,
      action: PayloadAction<{ lang: Language; key: string; value: string }>
    ) => {
      const { lang, key, value } = action.payload;

      // Update state
      if (!state.customTranslations[lang]) {
        state.customTranslations[lang] = {};
      }
      state.customTranslations[lang][key] = value;

      // Persist to localStorage
      localStorage.setItem(
        CUSTOM_TRANSLATIONS_KEY,
        JSON.stringify(state.customTranslations)
      );

      // Update active i18next instance
      i18n.addResource(lang, "translation", key, value);
    },
  },
});

export const { setLanguage, updateTranslation } = i18nSlice.actions;
export default i18nSlice.reducer;

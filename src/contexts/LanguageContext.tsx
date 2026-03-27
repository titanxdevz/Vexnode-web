import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, TranslationKeys } from '../locales/translations';

type Language = {
  code: string;
  label: string;
  flag: string;
};

const languages: Language[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
];

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: TranslationKeys;
  availableLanguages: Language[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const detectLanguage = (): string => {
  // Try to detect from browser
  const browserLang = navigator.language || (navigator as any).userLanguage;
  if (browserLang) {
    const langCode = browserLang.split('-')[0].toLowerCase();
    
    // Check if exact match exists
    if (translations[langCode]) {
      return langCode;
    }
    
    // Check for partial matches (e.g., 'en' for 'en-US')
    for (const code of Object.keys(translations)) {
      if (langCode.startsWith(code) || code.startsWith(langCode)) {
        return code;
      }
    }
  }
  
  // Try to detect from system locale
  const systemLang = Intl.DateTimeFormat().resolvedOptions().locale;
  if (systemLang) {
    const langCode = systemLang.split('-')[0].toLowerCase();
    if (translations[langCode]) {
      return langCode;
    }
  }
  
  // Fallback to English
  return 'en';
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    // Try to get saved language from localStorage
    const savedLang = localStorage.getItem('vexanode-language');
    if (savedLang) {
      const lang = languages.find(l => l.code === savedLang);
      if (lang) return lang;
    }
    
    // Auto-detect language
    const detectedCode = detectLanguage();
    const detectedLang = languages.find(l => l.code === detectedCode);
    return detectedLang || languages[0]; // Fallback to English
  });

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('vexanode-language', language.code);
    
    // Update document lang attribute
    document.documentElement.lang = language.code;
    
    // Update document direction for RTL languages
    if (language.code === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  };

  // Get translations for current language, fallback to English if missing
  const t: TranslationKeys = {
    ...translations['en'], // Start with English as base
    ...translations[currentLanguage.code], // Override with current language
  };

  // Set initial document attributes
  useEffect(() => {
    document.documentElement.lang = currentLanguage.code;
    if (currentLanguage.code === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [currentLanguage.code]);

  const value: LanguageContextType = {
    currentLanguage,
    setLanguage,
    t,
    availableLanguages: languages,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};

// Helper hook for translations
export const useT = () => {
  const { t } = useTranslation();
  return t;
};

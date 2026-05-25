export const locales = ['en', 'ja', 'uz', 'ru'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ja: '日本語',
  uz: "O'zbek",
  ru: 'Русский',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  ja: '🇯🇵',
  uz: '🇺🇿',
  ru: '🇷🇺',
};

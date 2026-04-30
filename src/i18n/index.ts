import { es } from './es';
import { en } from './en';

export const languages = {
  es,
  en,
} as const;

export type Lang = keyof typeof languages;

export function getLangFromUrl(url: URL): Lang {
  if (url.pathname.startsWith('/en')) return 'en';
  return 'es';
}

export function useTranslations(lang: Lang) {
  return languages[lang];
}

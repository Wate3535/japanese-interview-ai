'use client';

import { type Locale } from '@/messages/i18n.config';

export function setLocaleCookie(locale: Locale) {
  document.cookie = `locale=${locale};path=/;max-age=31536000`;
}

export function getLocaleFromCookie(): Locale | null {
  const match = document.cookie.match(/locale=([^;]+)/);
  if (match && match[1]) {
    return match[1] as Locale;
  }
  return null;
}

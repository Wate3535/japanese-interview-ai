'use client';

import { NextIntlClientProvider } from 'next-intl';
import enMessages from '@/messages/en.json';
import jaMessages from '@/messages/ja.json';
import uzMessages from '@/messages/uz.json';
import ruMessages from '@/messages/ru.json';

type Props = {
  children: React.ReactNode;
};

const locale =
  typeof window !== 'undefined'
    ? localStorage.getItem('locale') || 'en'
    : 'en';

const messagesMap: Record<string, typeof enMessages> = {
  en: enMessages,
  ja: jaMessages,
  uz: uzMessages,
  ru: ruMessages,
};

export default function IntlProvider({ children }: Props) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messagesMap[locale]}
    >
      {children}
    </NextIntlClientProvider>
  );
}
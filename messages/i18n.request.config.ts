import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { locales, type Locale } from './i18n.config';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('locale')?.value as Locale | undefined;
  const locale = localeCookie && locales.includes(localeCookie) ? localeCookie : 'en';

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

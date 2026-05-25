'use client';

import {NextIntlClientProvider} from 'next-intl';

type Props = {
  children: React.ReactNode;
};

export default function IntlProvider({children}: Props) {
  return (
    <NextIntlClientProvider
      locale="en"
      messages={{}}
    >
      {children}
    </NextIntlClientProvider>
  );
}
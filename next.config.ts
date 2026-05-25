import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./messages/i18n.request.config.ts');

const nextConfig: NextConfig = {
  allowedDevOrigins: ['*.bolt.new'],
};

export default withNextIntl(nextConfig);

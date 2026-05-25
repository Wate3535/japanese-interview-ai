'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { SettingsTabs } from '@/components/settings/settings-tabs';

export default function SettingsPage() {
  const t = useTranslations('settings');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold">{t('title')}</h1>
      </motion.div>

      <SettingsTabs />
    </div>
  );
}

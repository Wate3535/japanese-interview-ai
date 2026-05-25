'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CtaSection() {
  const t = useTranslations('landing');

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-blue-600 to-gray-800 dark:from-blue-700 dark:to-gray-900">
      <div className="container px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('ctaTitle')}
          </h2>
          <p className="text-lg text-blue-100 mb-8">{t('ctaSubtitle')}</p>
          <Link href="/signup">
            <Button
              size="lg"
              variant="secondary"
              className="h-12 px-8 text-base bg-white text-gray-900 hover:bg-gray-100"
            >
              {t('ctaButton')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

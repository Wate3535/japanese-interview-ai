'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Shield, Sparkles, LineChart } from 'lucide-react';

const benefits = [
  {
    icon: Shield,
    titleKey: 'benefit1Title',
    descKey: 'benefit1Desc',
  },
  {
    icon: Sparkles,
    titleKey: 'benefit2Title',
    descKey: 'benefit2Desc',
  },
  {
    icon: LineChart,
    titleKey: 'benefit3Title',
    descKey: 'benefit3Desc',
  },
];

export function BenefitsSection() {
  const t = useTranslations('landing');

  return (
    <section className="py-20 md:py-28 bg-gray-50 dark:bg-gray-800/50">
      <div className="container px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('benefitTitle')}</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mb-6 inline-flex p-4 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t(benefit.titleKey)}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t(benefit.descKey)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

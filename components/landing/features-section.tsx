'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Bot, BarChart3, TrendingUp, Briefcase } from 'lucide-react';

const features = [
  {
    icon: Bot,
    titleKey: 'feature1Title',
    descKey: 'feature1Desc',
  },
  {
    icon: BarChart3,
    titleKey: 'feature2Title',
    descKey: 'feature2Desc',
  },
  {
    icon: TrendingUp,
    titleKey: 'feature3Title',
    descKey: 'feature3Desc',
  },
  {
    icon: Briefcase,
    titleKey: 'feature4Title',
    descKey: 'feature4Desc',
  },
];

export function FeaturesSection() {
  const t = useTranslations('landing');

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-gray-900">
      <div className="container px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('featureTitle')}</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-800 group">
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{t(feature.titleKey)}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t(feature.descKey)}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

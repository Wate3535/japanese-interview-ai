'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    nameKey: 'pricingFree',
    priceKey: 'pricingFreePrice',
    features: ['5 interviews/month', 'Basic feedback', 'Limited support', 'Community access'],
    cta: 'Get Started',
    popular: false,
  },
  {
    nameKey: 'pricingPro',
    priceKey: 'pricingProPrice',
    period: '/month',
    features: [
      'Unlimited interviews',
      'Detailed AI feedback',
      'Progress analytics',
      'All interview types',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    nameKey: 'pricingEnterprise',
    priceKey: 'pricingEnterprisePrice',
    features: ['Custom interviews', 'Team management', 'API access', 'Dedicated support', 'Custom features'],
    cta: 'Contact Sales',
    popular: false,
  },
];

export function PricingSection() {
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('pricingTitle')}</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.nameKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={plan.popular ? 'relative' : ''}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <Card
                className={`h-full ${
                  plan.popular
                    ? 'border-2 border-blue-600 shadow-lg'
                    : 'border border-gray-200 dark:border-gray-700'
                }`}
              >
                <CardHeader className="text-center pb-4">
                  <h3 className="text-xl font-semibold">{t(plan.nameKey)}</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{t(plan.priceKey)}</span>
                    {plan.period && (
                      <span className="text-gray-600 dark:text-gray-400">{plan.period}</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/signup">
                    <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

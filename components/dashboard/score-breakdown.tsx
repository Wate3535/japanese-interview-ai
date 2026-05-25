'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useTranslations } from 'next-intl';

interface ScoreBreakdownProps {
  scores: {
    grammar: number;
    keigo: number;
    confidence: number;
    naturalness: number;
    hr_impression: number;
  };
}

const scoreConfig = [
  { key: 'grammar', color: 'bg-blue-500' },
  { key: 'keigo', color: 'bg-green-500' },
  { key: 'confidence', color: 'bg-purple-500' },
  { key: 'naturalness', color: 'bg-orange-500' },
  { key: 'hr_impression', color: 'bg-pink-500' },
];

export function ScoreBreakdown({ scores }: ScoreBreakdownProps) {
  const t = useTranslations('dashboard');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>{t('scoreBreakdown')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {scoreConfig.map((score) => (
            <div key={score.key} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {t(`${score.key}Score`)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {scores[score.key as keyof typeof scores].toFixed(1)}%
                </span>
              </div>
              <div className="relative h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${scores[score.key as keyof typeof scores]}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`absolute inset-y-0 left-0 rounded-full ${score.color}`}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}

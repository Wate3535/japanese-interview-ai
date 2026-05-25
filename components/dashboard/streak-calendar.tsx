'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';

interface StreakCalendarProps {
  streakData: Array<{
    date: string;
    completed: boolean;
  }>;
  currentStreak: number;
}

export function StreakCalendar({ streakData, currentStreak }: StreakCalendarProps) {
  const t = useTranslations('dashboard');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {t('currentStreak')}
            <span className="text-2xl">{currentStreak} {t('practiceStreak')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
              <div
                key={day}
                className="text-center text-xs text-muted-foreground py-1"
              >
                {day}
              </div>
            ))}
            {streakData.map((day, index) => (
              <motion.div
                key={day.date}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.02 }}
                className={`aspect-square rounded-sm ${
                  day.completed
                    ? 'bg-green-500 dark:bg-green-600'
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}
                title={day.date}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

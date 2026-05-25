'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { ScoreBreakdown } from '@/components/dashboard/score-breakdown';
import { ProgressChart } from '@/components/dashboard/progress-chart';
import { StreakCalendar } from '@/components/dashboard/streak-calendar';
import { RecentInterviews } from '@/components/dashboard/recent-interviews';
import { StartInterviewCard } from '@/components/dashboard/start-interview-card';

// Mock data - in a real app, this would come from the database
const mockStats = {
  totalInterviews: 24,
  averageScore: 78.5,
  currentStreak: 7,
  grammarScore: 82.3,
};

const mockScores = {
  grammar: 82,
  keigo: 75,
  confidence: 70,
  naturalness: 78,
  hr_impression: 80,
};

const mockProgressData = [
  { date: 'Week 1', grammar: 65, keigo: 60, confidence: 55 },
  { date: 'Week 2', grammar: 70, keigo: 65, confidence: 62 },
  { date: 'Week 3', grammar: 75, keigo: 68, confidence: 68 },
  { date: 'Week 4', grammar: 78, keigo: 72, confidence: 70 },
  { date: 'Week 5', grammar: 82, keigo: 75, confidence: 70 },
];

const mockStreakData = Array.from({ length: 35 }, (_, i) => ({
  date: new Date(Date.now() - (34 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  completed: Math.random() > 0.3,
}));

const mockRecentInterviews = [
  { id: '1', type: 'it_company', score: 85, date: new Date().toISOString() },
  { id: '2', type: 'new_grad', score: 72, date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
  { id: '3', type: 'part_time', score: 68, date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() },
];

export default function DashboardPage() {
  const t = useTranslations('dashboard');

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground mt-1">{t('welcomeBack')}</p>
      </motion.div>

      <StartInterviewCard />

      <StatsCards stats={mockStats} />

      <div className="grid lg:grid-cols-2 gap-6">
        <ProgressChart data={mockProgressData} />
        <ScoreBreakdown scores={mockScores} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <RecentInterviews interviews={mockRecentInterviews} />
        <StreakCalendar streakData={mockStreakData} currentStreak={mockStats.currentStreak} />
      </div>
    </div>
  );
}

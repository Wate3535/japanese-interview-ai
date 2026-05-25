'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { InterviewHistoryList } from '@/components/history/interview-history-list';
import { useRouter } from 'next/navigation';

// Mock data for demo
const mockInterviews = [
  {
    id: '1',
    type: 'it_company',
    score: 85,
    date: new Date().toISOString(),
    duration: 1080,
    grammar_score: 88,
    keigo_score: 82,
    confidence_score: 85,
    naturalness_score: 90,
    hr_impression_score: 87,
  },
  {
    id: '2',
    type: 'new_grad',
    score: 72,
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 900,
    grammar_score: 75,
    keigo_score: 65,
    confidence_score: 75,
    naturalness_score: 70,
    hr_impression_score: 72,
  },
  {
    id: '3',
    type: 'part_time',
    score: 68,
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 600,
    grammar_score: 70,
    keigo_score: 60,
    confidence_score: 70,
    naturalness_score: 68,
    hr_impression_score: 65,
  },
  {
    id: '4',
    type: 'intl_student',
    score: 78,
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 840,
    grammar_score: 80,
    keigo_score: 75,
    confidence_score: 78,
    naturalness_score: 76,
    hr_impression_score: 79,
  },
  {
    id: '5',
    type: 'it_company',
    score: 90,
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 1200,
    grammar_score: 92,
    keigo_score: 88,
    confidence_score: 90,
    naturalness_score: 90,
    hr_impression_score: 91,
  },
];

export default function HistoryPage() {
  const t = useTranslations('history');
  const router = useRouter();

  const handleReplay = (id: string) => {
    // In a real app, this would open a dialog to replay the interview
    console.log('Replay interview:', id);
    router.push('/interview');
  };

  const handleViewFeedback = (id: string) => {
    router.push(`/feedback?id=${id}`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold">{t('title')}</h1>
      </motion.div>

      <InterviewHistoryList
        interviews={mockInterviews}
        onReplay={handleReplay}
        onViewFeedback={handleViewFeedback}
      />
    </div>
  );
}

'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, MessageSquare, RotateCcw, BarChart3 } from 'lucide-react';
import Link from 'next/link';

interface InterviewCompleteProps {
  duration: number;
  messageCount: number;
  onViewFeedback: () => void;
  onTryAnother: () => void;
}

export function InterviewComplete({
  duration,
  messageCount,
  onViewFeedback,
  onTryAnother,
}: InterviewCompleteProps) {
  const t = useTranslations('interview');

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md mx-auto text-center"
    >
      <div className="flex justify-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="p-4 rounded-full bg-green-100 dark:bg-green-900/30"
        >
          <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
        </motion.div>
      </div>

      <h1 className="text-3xl font-bold mb-4">{t('interviewComplete')}</h1>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-muted rounded-lg">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold">{messageCount}</div>
              <div className="text-sm text-muted-foreground">
                {t('messagesExchanged')}
              </div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
              >
                <RotateCcw className="h-8 w-8 mx-auto mb-2 text-orange-600" />
              </motion.div>
              <div className="text-2xl font-bold">{formatTime(duration)}</div>
              <div className="text-sm text-muted-foreground">
                {t('timeElapsed')}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3">
        <Button size="lg" className="w-full" onClick={onViewFeedback}>
          <BarChart3 className="mr-2 h-5 w-5" />
          {t('viewFeedback')}
        </Button>
        <Button size="lg" variant="outline" className="w-full" onClick={onTryAnother}>
          {t('tryAgain')}
        </Button>
        <Link href="/dashboard">
          <Button variant="ghost" className="w-full">
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

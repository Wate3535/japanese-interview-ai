'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface RecentInterview {
  id: string;
  type: string;
  score: number;
  date: string;
}

interface RecentInterviewsProps {
  interviews: RecentInterview[];
}

export function RecentInterviews({ interviews }: RecentInterviewsProps) {
  const t = useTranslations();

  const getInterviewTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      new_grad: t('interview.newGrad'),
      it_company: t('interview.itCompany'),
      part_time: t('interview.partTime'),
      intl_student: t('interview.intlStudent'),
    };
    return types[type] || type;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t('dashboard.interviewHistory')}</CardTitle>
          <Link href="/history">
            <Button variant="ghost" size="sm">
              {t('dashboard.viewAllHistory')}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {interviews.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">
                {t('dashboard.noInterviews')}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {t('dashboard.startPracticing')}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {interviews.map((interview) => (
                <div
                  key={interview.id}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-sm font-medium">
                        {getInterviewTypeLabel(interview.type)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(interview.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={interview.score >= 60 ? 'secondary' : 'destructive'}
                    className={interview.score >= 80 ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : ''}
                  >
                    {interview.score.toFixed(0)}%
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

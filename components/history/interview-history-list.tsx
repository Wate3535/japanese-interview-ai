'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Clock, BarChart2, Play } from 'lucide-react';
import { useState } from 'react';

interface Interview {
  id: string;
  type: string;
  score: number;
  date: string;
  duration: number;
  grammar_score: number;
  keigo_score: number;
  confidence_score: number;
  naturalness_score: number;
  hr_impression_score: number;
}

interface InterviewHistoryListProps {
  interviews: Interview[];
  onReplay: (id: string) => void;
  onViewFeedback: (id: string) => void;
}

export function InterviewHistoryList({
  interviews: initialInterviews,
  onReplay,
  onViewFeedback,
}: InterviewHistoryListProps) {
  const t = useTranslations('history');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredInterviews = initialInterviews
    .filter((interview) => {
      if (filterType !== 'all' && interview.type !== filterType) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'score':
          return b.score - a.score;
        default:
          return 0;
      }
    });

  const getInterviewTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      new_grad: t('newGrad') || 'New Graduate',
      it_company: t('itCompany') || 'IT Company',
      part_time: t('partTime') || 'Part-time',
      intl_student: t('intlStudent') || 'International Student',
    };
    return labels[type] || type;
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterType} onValueChange={(value) => setFilterType(value || 'all')}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder={t('filterByType')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="new_grad">{t('newGrad') || 'New Graduate'}</SelectItem>
            <SelectItem value="it_company">{t('itCompany') || 'IT Company'}</SelectItem>
            <SelectItem value="part_time">{t('partTime') || 'Part-time'}</SelectItem>
            <SelectItem value="intl_student">{t('intlStudent') || 'International Student'}</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={(value) => setSortBy(value || 'newest')}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder={t('sortBy')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">{t('sortNewest')}</SelectItem>
            <SelectItem value="oldest">{t('sortOldest')}</SelectItem>
            <SelectItem value="score">{t('sortScore')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Interview List */}
      {filteredInterviews.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t('noHistory')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredInterviews.map((interview, index) => (
            <motion.div
              key={interview.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">
                              {getInterviewTypeLabel(interview.type)}
                            </h3>
                            <Badge
                              variant={interview.score >= 60 ? 'secondary' : 'destructive'}
                              className={interview.score >= 80 ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : ''}
                            >
                              {interview.score.toFixed(0)}%
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {formatDuration(interview.duration)}
                            </span>
                            <span>{new Date(interview.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => onReplay(interview.id)}>
                        <Play className="mr-2 h-4 w-4" />
                        {t('replay')}
                      </Button>
                      <Button size="sm" onClick={() => onViewFeedback(interview.id)}>
                        <BarChart2 className="mr-2 h-4 w-4" />
                        {t('viewDetails')}
                      </Button>
                    </div>
                  </div>

                  {/* Score Breakdown */}
                  <div className="grid grid-cols-5 gap-2 mt-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">Grammar</div>
                      <div className="text-sm font-semibold">
                        {interview.grammar_score}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">Keigo</div>
                      <div className="text-sm font-semibold">
                        {interview.keigo_score}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">Confidence</div>
                      <div className="text-sm font-semibold">
                        {interview.confidence_score}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">Naturalness</div>
                      <div className="text-sm font-semibold">
                        {interview.naturalness_score}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">HR</div>
                      <div className="text-sm font-semibold">
                        {interview.hr_impression_score}%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

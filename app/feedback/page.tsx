'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScoreRadarChart } from '@/components/feedback/score-radar-chart';
import { ImprovementSuggestions } from '@/components/feedback/improvement-suggestions';
import { CorrectedAnswers } from '@/components/feedback/corrected-answers';

// Mock data for demo
const mockFeedback = {
  overallScore: 75,
  scores: {
    grammar: 65,
    keigo: 70,
    confidence: 80,
    naturalness: 75,
    hr_impression: 78,
  },
  strengths: [
    'Good self-introduction structure',
    'Clear pronunciation',
    'Appropriate eye contact',
    'Confident body language',
  ],
  weakPoints: [
    'Keigo usage in formal contexts',
    'Some grammar mistakes with particles',
    'Response speed could be improved',
  ],
  improvements: [
    'Practice keigo patterns for business settings',
    'Review particle usage: は vs が',
    'Prepare common interview questions in advance',
    'Record yourself to improve naturalness',
  ],
  corrections: [
    {
      original: '株式会社○○に入りたいです。',
      corrected: '御社で働かせていただければと存じます。',
      explanation: 'For expressing desire to join a company in an interview, use more humble language: 存じます instead of です.',
    },
    {
      original: '私は日本のアニメが好きですから、日本語を勉強しています。',
      corrected: '日本のアニメに興味があり、それをきっかけに日本語の学習を始めました。',
      explanation: 'Avoid using から for reasons in interviews. Use more formal expressions like きっかけに (triggered by).',
    },
  ],
};

const scoreDescriptions: Record<string, { level: string; color: string }> = {
  90: { level: 'Excellent!', color: 'text-green-600' },
  80: { level: 'Very Good', color: 'text-blue-600' },
  70: { level: 'Good', color: 'text-blue-500' },
  60: { level: 'Needs Practice', color: 'text-orange-600' },
  0: { level: 'Keep Working', color: 'text-red-600' },
};

function getScoreLevel(score: number) {
  if (score >= 90) return scoreDescriptions['90'];
  if (score >= 80) return scoreDescriptions['80'];
  if (score >= 70) return scoreDescriptions['70'];
  if (score >= 60) return scoreDescriptions['60'];
  return scoreDescriptions['0'];
}

export default function FeedbackPage() {
  const t = useTranslations('feedback');

  const searchParams = useSearchParams();

const sessionId =
  searchParams.get(
    'sessionId'
  );
  
  const [feedback, setFeedback] = useState(mockFeedback); 
  const [loading, setLoading] = useState(true);

  const scoreLevel = getScoreLevel( feedback.overallScore );

 
useEffect(() => {
  const loadFeedback =
    async () => {
     
        console.log(
        'SESSION ID:',
        sessionId
      );


      try {
        const response =
          await fetch(
            '/api/feedback',
            {
              method: 'POST',

              headers: {
                'Content-Type':
                  'application/json',
              },

              body: JSON.stringify({
                messages: [
                  {
                    role: 'user',
                    content:
                      '自己紹介をします。',
                  },
                ],
              }),
            }
          );

        const data =
          await response.json();

        setFeedback((prev) => ({
  ...prev,
  ...data,
}));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  loadFeedback();
}, []);



  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold">{t('title')}</h1>
      </motion.div>

      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="bg-gradient-to-br from-blue-50 to-gray-50 dark:from-blue-900/20 dark:to-gray-900/20">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-200 dark:text-gray-700"
                  />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeLinecap="round"
                    strokeDasharray={352}
                    initial={{ strokeDashoffset: 352 }}
animate={{
  strokeDashoffset:
    352 -
    (352 *
      feedback.overallScore) /
      100,
}}                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="text-blue-600"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold">
  {feedback.overallScore}
</div>
                    <div className="text-sm text-muted-foreground">/ 100</div>
                  </div>
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2">{t('overallScore')}</h2>
                <p className={`text-xl font-semibold ${scoreLevel.color}`}>
                  {scoreLevel.level}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Based on your responses during the interview
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Score Radar Chart */}
      <ScoreRadarChart scores={feedback.scores} />

      {/* Detailed Scores */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(feedback.scores).map(([key, value], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">
  {t(
    key === 'hr_impression'
      ? 'hrImpression'
      : (key as never)
  )}
</span>
                  <span className="text-sm font-bold">{value}%</span>
                </div>
                <Progress value={value} className="h-2" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Improvement Suggestions */}
      <ImprovementSuggestions
  strengths={feedback.strengths}
  improvements={feedback.improvements}
  weakPoints={feedback.weakPoints}
/>

      {/* Corrected Answers */}
      <CorrectedAnswers
  corrections={feedback.corrections}
/>
    </div>
  );
}

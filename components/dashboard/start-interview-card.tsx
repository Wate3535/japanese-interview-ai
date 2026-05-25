'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { MessageSquare, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function StartInterviewCard() {
  const t = useTranslations('dashboard');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-blue-600 to-gray-800 dark:from-blue-700 dark:to-gray-900 border-0">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full bg-white/10">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <div className="text-white">
                <h3 className="text-xl font-semibold">
                  {t('startInterview')}
                </h3>
                <p className="text-sm text-blue-100 mt-1">
                  Practice makes perfect
                </p>
              </div>
            </div>
            <Link href="/interview">
              <Button className="bg-white text-gray-900 hover:bg-gray-100 gap-2">
                Start Practice
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

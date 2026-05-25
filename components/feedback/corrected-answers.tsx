'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

interface CorrectedAnswer {
  original: string;
  corrected: string;
  explanation: string;
}

interface CorrectedAnswersProps {
  corrections: CorrectedAnswer[];
}

export function CorrectedAnswers({ corrections }: CorrectedAnswersProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (corrections.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">No corrections needed!</p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="secondary">📝</Badge>
            Corrected Answers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {corrections.map((correction, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 space-y-3"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Original:
                  </div>
                  <div className="text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-200 dark:border-red-800 line-through">
                    {correction.original}
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0 mt-6" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Corrected:
                  </div>
                  <div className="text-sm bg-green-50 dark:bg-green-900/20 p-2 rounded border border-green-200 dark:border-green-800">
                    {correction.corrected}
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={() =>
                  setExpandedIndex(
                    expandedIndex === index ? null : index
                  )
                }
              >
                {expandedIndex === index ? (
                  <>
                    Hide Explanation <ChevronUp className="ml-1 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Show Explanation <ChevronDown className="ml-1 h-4 w-4" />
                  </>
                )}
              </Button>

              {expandedIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800"
                >
                  <p className="text-sm">{correction.explanation}</p>
                </motion.div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Lightbulb } from 'lucide-react';

interface ImprovementSuggestionsProps {
  strengths: string[];
  improvements: string[];
  weakPoints: string[];
}

export function ImprovementSuggestions({
  strengths = [],
  improvements = [],
  weakPoints = [],
}: ImprovementSuggestionsProps) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Strengths */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            {strengths.length === 0 ? (
              <p className="text-sm text-muted-foreground">Keep practicing!</p>
            ) : (
              <ul className="space-y-2">
                {strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 shrink-0">
                      ✓
                    </Badge>
                    <span className="text-sm">{strength}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Weak Points */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="border-orange-200 dark:border-orange-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <AlertCircle className="h-5 w-5" />
              Needs Work
            </CardTitle>
          </CardHeader>
          <CardContent>
            {weakPoints.length === 0 ? (
              <p className="text-sm text-muted-foreground">You're doing great!</p>
            ) : (
              <ul className="space-y-2">
                {weakPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 shrink-0">
                      !
                    </Badge>
                    <span className="text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Improvement Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Card className="border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-600">
              <Lightbulb className="h-5 w-5" />
              Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {improvements.length === 0 ? (
              <p className="text-sm text-muted-foreground">Great job!</p>
            ) : (
              <ul className="space-y-2">
                {improvements.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Badge variant="secondary" className="shrink-0">
                      💡
                    </Badge>
                    <span className="text-sm">{suggestion}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

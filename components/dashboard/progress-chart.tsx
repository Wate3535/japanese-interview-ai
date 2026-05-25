'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { useTranslations } from 'next-intl';

interface ProgressChartProps {
  data: Array<{
    date: string;
    grammar: number;
    keigo: number;
    confidence: number;
  }>;
}

const chartConfig = {
  grammar: {
    label: 'Grammar',
    color: 'hsl(var(--chart-1))',
  },
  keigo: {
    label: 'Keigo',
    color: 'hsl(var(--chart-2))',
  },
  confidence: {
    label: 'Confidence',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

export function ProgressChart({ data }: ProgressChartProps) {
  const t = useTranslations('dashboard');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>{t('progressChart')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 5)}
                  className="text-xs"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 100]}
                  className="text-xs"
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="grammar"
                  stroke="var(--color-grammar)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="keigo"
                  stroke="var(--color-keigo)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="confidence"
                  stroke="var(--color-confidence)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}

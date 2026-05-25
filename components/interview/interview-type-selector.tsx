'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Code, Coffee, Users } from 'lucide-react';

interface InterviewTypeSelectorProps {
  onSelect: (type: string) => void;
}

const interviewTypes = [
  {
    type: 'new_grad',
    icon: GraduationCap,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
  },
  {
    type: 'it_company',
    icon: Code,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
  },
  {
    type: 'part_time',
    icon: Coffee,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
  },
  {
    type: 'intl_student',
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
  },
];

export function InterviewTypeSelector({ onSelect }: InterviewTypeSelectorProps) {
  const t = useTranslations('interview');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleSelect = (type: string) => {
    setSelectedType(type);
  };

  const handleStart = () => {
    if (selectedType) {
      onSelect(selectedType);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">{t('selectType')}</h1>
        <div className="w-20 h-1 bg-blue-600 mx-auto" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {interviewTypes.map((item, index) => {
          const Icon = item.icon;
          const isSelected = selectedType === item.type;

          return (
            <motion.div
              key={item.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  isSelected
                    ? 'ring-2 ring-blue-600 shadow-lg'
                    : 'hover:border-gray-300 dark:hover:border-gray-700'
                }`}
                onClick={() => handleSelect(item.type)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-full ${item.bgColor}`}>
                      <Icon className={`h-8 w-8 ${item.color}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {t(item.type)}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Practice for {item.type.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="mt-12 text-center"
      >
        <Button
          size="lg"
          disabled={!selectedType}
          onClick={handleStart}
          className="min-w-[200px]"
        >
          {t('start')}
        </Button>
      </motion.div>
    </motion.div>
  );
}

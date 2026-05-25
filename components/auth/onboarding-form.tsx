'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { type JLPTLevel, type Industry } from '@/types';
import {
  GraduationCap,
  Briefcase,
  Globe,
  Rocket,
} from 'lucide-react';

const jlptLevels: JLPTLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1'];
const industries: Industry[] = [
  'IT / Technology',
  'Hotel / Hospitality',
  'Restaurant / Food Service',
  'Office / Administration',
  'Engineering / Manufacturing',
];

const steps = [
  { id: 'jlpt', icon: GraduationCap, titleKey: 'onboarding.jlptLevel' },
  { id: 'industry', icon: Briefcase, titleKey: 'onboarding.targetIndustry' },
  { id: 'language', icon: Globe, titleKey: 'onboarding.preferredLanguage' },
];

export function OnboardingForm() {
  const t = useTranslations();
  const router = useRouter();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    jlpt_level: 'N3' as JLPTLevel,
    target_industry: 'IT / Technology' as Industry,
    preferred_language: 'en' as 'en' | 'ja' | 'uz' | 'ru',
  });
  const supabase = createClient();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/login');
        return;
      }

      const { error } = await supabase
        .from('users')
        .update({
          jlpt_level: formData.jlpt_level,
          target_industry: formData.target_industry,
          preferred_language: formData.preferred_language,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({ title: t('onboarding.welcome') });
      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      toast({
        title: t('common.error'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const StepIcon = steps[currentStep].icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl space-y-8"
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold">{t('onboarding.title')}</h1>
        <p className="text-sm text-muted-foreground mt-2">
          {t('onboarding.subtitle')}
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-between items-center px-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  index <= currentStep
                    ? 'bg-primary border-primary text-primary-foreground'
                    : 'border-muted-foreground/30 text-muted-foreground'
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-xs mt-2 text-muted-foreground">
                {index + 1}
              </span>
            </div>
          );
        })}
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label className="text-base font-medium">
              {t(steps[currentStep].titleKey)}
            </Label>
          </div>

          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {currentStep === 0 && (
              <Select
                value={formData.jlpt_level}
                onValueChange={(value) =>
                  setFormData({ ...formData, jlpt_level: value as JLPTLevel })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('onboarding.selectJlpt')} />
                </SelectTrigger>
                <SelectContent>
                  {jlptLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {t(`onboarding.jlpt${level.toLowerCase()}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {currentStep === 1 && (
              <Select
                value={formData.target_industry}
                onValueChange={(value) =>
                  setFormData({ ...formData, target_industry: value as Industry })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('onboarding.selectIndustry')} />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => {
                    const industryKey = industry.split(' / ')[0].toLowerCase();
                    return (
                      <SelectItem key={industry} value={industry}>
                        {t(`onboarding.industry${industryKey.charAt(0).toUpperCase() + industryKey.slice(1)}`)}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            )}

            {currentStep === 2 && (
              <Select
                value={formData.preferred_language}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    preferred_language: value as 'en' | 'ja' | 'uz' | 'ru',
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('onboarding.preferredLanguage')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ja">日本語</SelectItem>
                  <SelectItem value="uz">O'zbek</SelectItem>
                  <SelectItem value="ru">Русский</SelectItem>
                </SelectContent>
              </Select>
            )}
          </motion.div>

          <div className="flex justify-between pt-4">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              {t('common.back')}
            </Button>

            {currentStep === steps.length - 1 ? (
              <Button onClick={handleComplete} disabled={loading}>
                <Rocket className="mr-2 h-4 w-4" />
                {loading ? t('common.loading') : t('onboarding.complete')}
              </Button>
            ) : (
              <Button onClick={handleNext}>
                {t('common.next')}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

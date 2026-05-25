export * from './database';

export type JLPTLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

export type Industry =
  | 'IT / Technology'
  | 'Hotel / Hospitality'
  | 'Restaurant / Food Service'
  | 'Office / Administration'
  | 'Engineering / Manufacturing';

export type InterviewType =
  | 'new_grad'
  | 'it_company'
  | 'part_time'
  | 'intl_student';

export type MessageRole = 'user' | 'assistant';

export interface ChartDataPoint {
  date: string;
  grammar: number;
  keigo: number;
  confidence: number;
  naturalness: number;
  hr_impression: number;
}

export interface ScoreBreakdown {
  grammar: number;
  keigo: number;
  confidence: number;
  naturalness: number;
  hr_impression: number;
}

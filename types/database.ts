export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          jlpt_level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | null;
          preferred_language: 'en' | 'ja' | 'uz' | 'ru';
          target_industry: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name?: string;
          jlpt_level?: 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | null;
          preferred_language?: 'en' | 'ja' | 'uz' | 'ru';
          target_industry?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          jlpt_level?: 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | null;
          preferred_language?: 'en' | 'ja' | 'uz' | 'ru';
          target_industry?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      interviews: {
        Row: {
          id: string;
          user_id: string;
          interview_type: string;
          overall_score: number | null;
          duration_seconds: number;
          status: 'in_progress' | 'completed' | 'abandoned';
          created_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          interview_type: string;
          overall_score?: number | null;
          duration_seconds?: number;
          status?: 'in_progress' | 'completed' | 'abandoned';
          created_at?: string;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          interview_type?: string;
          overall_score?: number | null;
          duration_seconds?: number;
          status?: 'in_progress' | 'completed' | 'abandoned';
          created_at?: string;
          completed_at?: string | null;
        };
      };
      messages: {
        Row: {
          id: string;
          interview_id: string;
          role: 'user' | 'assistant';
          message: string;
          message_ja: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          interview_id: string;
          role: 'user' | 'assistant';
          message: string;
          message_ja?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          interview_id?: string;
          role?: 'user' | 'assistant';
          message?: string;
          message_ja?: string | null;
          created_at?: string;
        };
      };
      feedbacks: {
        Row: {
          id: string;
          interview_id: string;
          grammar_score: number;
          keigo_score: number;
          confidence_score: number;
          naturalness_score: number;
          hr_impression_score: number;
          overall_feedback: string;
          corrected_answers: Json;
          improvement_suggestions: Json;
          strengths: Json;
          weak_points: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          interview_id: string;
          grammar_score?: number;
          keigo_score?: number;
          confidence_score?: number;
          naturalness_score?: number;
          hr_impression_score?: number;
          overall_feedback?: string;
          corrected_answers?: Json;
          improvement_suggestions?: Json;
          strengths?: Json;
          weak_points?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          interview_id?: string;
          grammar_score?: number;
          keigo_score?: number;
          confidence_score?: number;
          naturalness_score?: number;
          hr_impression_score?: number;
          overall_feedback?: string;
          corrected_answers?: Json;
          improvement_suggestions?: Json;
          strengths?: Json;
          weak_points?: Json;
          created_at?: string;
        };
      };
      user_stats: {
        Row: {
          id: string;
          user_id: string;
          total_interviews: number;
          total_duration_seconds: number;
          average_grammar_score: number;
          average_keigo_score: number;
          average_confidence_score: number;
          average_naturalness_score: number;
          average_hr_impression_score: number;
          current_streak: number;
          longest_streak: number;
          last_practice_date: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          total_interviews?: number;
          total_duration_seconds?: number;
          average_grammar_score?: number;
          average_keigo_score?: number;
          average_confidence_score?: number;
          average_naturalness_score?: number;
          average_hr_impression_score?: number;
          current_streak?: number;
          longest_streak?: number;
          last_practice_date?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          total_interviews?: number;
          total_duration_seconds?: number;
          average_grammar_score?: number;
          average_keigo_score?: number;
          average_confidence_score?: number;
          average_naturalness_score?: number;
          average_hr_impression_score?: number;
          current_streak?: number;
          longest_streak?: number;
          last_practice_date?: string | null;
          updated_at?: string;
        };
      };
    };
  };
}

export type User = Database['public']['Tables']['users']['Row'];
export type Interview = Database['public']['Tables']['interviews']['Row'];
export type Message = Database['public']['Tables']['messages']['Row'];
export type Feedback = Database['public']['Tables']['feedbacks']['Row'];
export type UserStats = Database['public']['Tables']['user_stats']['Row'];

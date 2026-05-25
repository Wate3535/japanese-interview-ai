'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './chat-message';
import { ChatInput } from './chat-input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Timer, MessageSquare, ArrowLeft, LogOut } from 'lucide-react';

interface InterviewChatProps {
  interviewType: string;
  onEnd: () => void;
  onBack: () => void;
}

// Mock AI responses for demo purposes
const mockResponses = [
  'はじめまして。本日は面接に来ていただきありがとうございます。まず、自己紹介をお願いします。',
  'そうですか。御社でどういう仕事をしてみたいですか？',
  'なるほど。あなたの長所と短所を教えてください。',
  '困難な状況でどのように対処したか、具体例を教えてください。',
  '志望動機を詳しく聞かせてください。',
];

export function InterviewChat({ interviewType, onEnd, onBack }: InterviewChatProps) {
  const t = useTranslations('interview');
  const [messages, setMessages] = useState<Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [startTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Start with AI greeting
  useEffect(() => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages([
        {
          role: 'assistant',
          content: mockResponses[0],
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1000);
  }, []);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (content: string) => {
    // Add user message
    setMessages((prev) => [
      ...prev,
      { role: 'user', content, timestamp: new Date() },
    ]);

    // Show typing indicator
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responseIndex = Math.min(messages.filter((m) => m.role === 'user').length, mockResponses.length - 1);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: mockResponses[responseIndex],
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg border">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Avatar className="h-10 w-10 bg-gray-600">
            <AvatarFallback className="bg-gray-600 text-white">AI</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{t('aiInterviewer')}</h2>
            <Badge variant={isTyping ? 'secondary' : 'default'} className="text-xs">
              {isTyping ? t('typing') : t('inProgress')}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Timer className="h-4 w-4" />
            <span className="text-sm font-mono">{formatTime(elapsed)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            <span className="text-sm font-mono">
              {messages.filter((m) => m.role === 'user').length}
            </span>
          </div>
          <Button variant="destructive" onClick={onEnd}>
            <LogOut className="mr-2 h-4 w-4" />
            {t('endInterview')}
          </Button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg border mb-4 p-4">
        <ScrollArea className="h-full pr-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {isTyping && (
              <ChatMessage
                message={{ role: 'assistant', content: '', timestamp: new Date() }}
                isTyping
              />
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>
    </div>
  );
}

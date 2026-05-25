'use client';

import { useState } from 'react';
import { InterviewTypeSelector } from '@/components/interview/interview-type-selector';
import { InterviewChat } from '@/components/interview/interview-chat';
import { InterviewComplete } from '@/components/interview/interview-complete';

type InterviewState = 'select' | 'chat' | 'complete';

export default function InterviewPage() {
  const [state, setState] = useState<InterviewState>('select');
  const [interviewType, setInterviewType] = useState<string>('');
  const [duration, setDuration] = useState(0);
  const [messageCount, setMessageCount] = useState(0);

  const handleTypeSelect = (type: string) => {
    setInterviewType(type);
    setState('chat');
  };

  const handleEndInterview = () => {
    // In a real app, you would save the interview data here
    setDuration(180); // Mock: 3 minutes
    setMessageCount(12); // Mock: 12 messages
    setState('complete');
  };

  const handleViewFeedback = () => {
    window.location.href = '/feedback';
  };

  const handleTryAnother = () => {
    setInterviewType('');
    setDuration(0);
    setMessageCount(0);
    setState('select');
  };

  const handleBack = () => {
    setState('select');
  };

  return (
    <>
      {state === 'select' && (
        <InterviewTypeSelector onSelect={handleTypeSelect} />
      )}
      {state === 'chat' && (
        <InterviewChat
          interviewType={interviewType}
          onEnd={handleEndInterview}
          onBack={handleBack}
        />
      )}
      {state === 'complete' && (
        <InterviewComplete
          duration={duration}
          messageCount={messageCount}
          onViewFeedback={handleViewFeedback}
          onTryAnother={handleTryAnother}
        />
      )}
    </>
  );
}

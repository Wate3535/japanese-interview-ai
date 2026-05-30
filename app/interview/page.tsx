
'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { InterviewTypeSelector } from '@/components/interview/interview-type-selector';

import { InterviewChat } from '@/components/interview/interview-chat';

import { InterviewComplete } from '@/components/interview/interview-complete';

import { InterviewService } from '@/lib/services/interview.service';



type InterviewState =
  | 'select'
  | 'mode'
  | 'chat'
  | 'complete';

type InterviewMode =
  | 'chat'
  | 'video';

export default function InterviewPage() {
  const [state, setState] =
    useState<InterviewState>(
      'select'
    );

  const [interviewType, setInterviewType] =
    useState<string>('');

  const [mode, setMode] =
    useState<InterviewMode>(
      'chat'
    );

  const [duration, setDuration] =
    useState(0);

  const [messageCount, setMessageCount] =
    useState(0);

    const [sessionId, setSessionId] = useState<string>('');

  // INTERVIEW TYPE
  const handleTypeSelect = (
    type: string
  ) => {
    setInterviewType(type);

    setState('mode');
  };

  // MODE SELECT

const handleModeSelect = async (
  selectedMode: InterviewMode
) => {
  try {
    const newSessionId =
      await InterviewService.createSession({
        interviewType,
        mode: selectedMode,
      });

    setSessionId(
      newSessionId
    );

    setMode(
      selectedMode
    );

    setState('chat');
  } catch (error) {
    console.error(
      'Create Session Error:',
      error
    );
  }
};



  // END INTERVIEW
 const handleEndInterview = async (
  duration: number,
  messageCount: number
) => {
  try {
    await InterviewService.completeSession(
      sessionId,
      duration
    );

    setDuration(
      duration
    );

    setMessageCount(
      messageCount
    );

    setState(
      'complete'
    );
  } catch (error) {
    console.error(
      'Complete Session Error:',
      error
    );
  }
};
// FEEDBACK
const handleViewFeedback = () => {
  window.location.href =
    `/feedback?sessionId=${sessionId}`;
};

  // RESET
  const handleTryAnother = () => {
    setInterviewType('');

    setMode('chat');

    setDuration(0);

    setMessageCount(0);

    setState('select');
  };

  // BACK
  const handleBack = () => {
    if (state === 'mode') {
      setState('select');
    } else {
      setState('mode');
    }
  };

  return (
    <>
      {/* STEP 1 */}
      {state === 'select' && (
        <InterviewTypeSelector
          onSelect={
            handleTypeSelect
          }
        />
      )}

      {/* STEP 2 */}
      {state === 'mode' && (
        <div className="max-w-3xl mx-auto py-20 px-4">

          <h1 className="text-3xl font-bold text-center mb-10">
            Choose Interview Mode
          </h1>

          <div className="grid md:grid-cols-2 gap-6">

            {/* CHAT MODE */}
            <div className="border rounded-2xl p-8 bg-white dark:bg-gray-900">

              <h2 className="text-2xl font-semibold mb-4">
                Chat Interview
              </h2>

              <p className="text-muted-foreground mb-6">
                Practice by typing messages with the AI interviewer.
              </p>

              <Button
                className="w-full h-12 text-lg"
                onClick={() =>
                  handleModeSelect(
                    'chat'
                  )
                }
              >
                Start Chat Interview
              </Button>
            </div>

            {/* VIDEO MODE */}
            <div className="border rounded-2xl p-8 bg-white dark:bg-gray-900">

              <h2 className="text-2xl font-semibold mb-4">
                Video Interview
              </h2>

              <p className="text-muted-foreground mb-6">
                Face-to-face AI interview with voice and webcam.
              </p>

              <Button
                className="w-full h-12 text-lg"
                onClick={() =>
                  handleModeSelect(
                    'video'
                  )
                }
              >
                Start Video Interview
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {state === 'chat' && (
       <InterviewChat
  interviewType={interviewType}
  mode={mode}
  sessionId={sessionId}
  onEnd={handleEndInterview}
  onBack={handleBack}
/>
      )}

      {/* STEP 4 */}
      {state === 'complete' && (
        <InterviewComplete
          duration={duration}
          messageCount={
            messageCount
          }
          onViewFeedback={
            handleViewFeedback
          }
          onTryAnother={
            handleTryAnother
          }
        />
      )}
    </>
  );
}


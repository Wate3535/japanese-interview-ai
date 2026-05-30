
'use client';

import {
  useState,
  useRef,
  useEffect,
} from 'react';

import { useTranslations } from 'next-intl';

import { motion } from 'framer-motion';

import Webcam from 'react-webcam';

import { Button } from '@/components/ui/button';

import { ScrollArea } from '@/components/ui/scroll-area';

import { ChatMessage } from './chat-message';

import { ChatInput } from './chat-input';

import {
  Avatar,
  AvatarFallback,
} from '@/components/ui/avatar';

import { Badge } from '@/components/ui/badge';

import {
  Timer,
  MessageSquare,
  ArrowLeft,
  LogOut,
} from 'lucide-react';

import { InterviewService } from '@/lib/services/interview.service';

interface InterviewChatProps {
  interviewType: string;

  mode: 'chat' | 'video';

  sessionId: string;

  onEnd: (
  duration: number,
  messageCount: number
) => void;

  onBack: () => void;
}

export function InterviewChat({
  interviewType,
  mode,
  sessionId,
  onEnd,
  onBack,
}: InterviewChatProps) {
  const t =
    useTranslations('interview');

  const [messages, setMessages] =
    useState<
      Array<{
        role:
          | 'user'
          | 'assistant';

        content: string;

        timestamp: Date;
      }>
    >([]);

  const [isTyping, setIsTyping] =
    useState(false);

  const [elapsed, setElapsed] =
    useState(0);

  const [isSpeaking, setIsSpeaking] =
    useState(false);

  const [isListening, setIsListening] =
    useState(false);

  const [startTime] =
    useState<number>(() => Date.now());

  const scrollRef =
    useRef<HTMLDivElement>(null);

  const webcamRef =
    useRef<Webcam>(null);

const recognitionRef =
  useRef<{
    start: () => void;
  } | null>(null);



  // SEND MESSAGE

const handleSend = async (
  content: string
) => {
  setMessages((prev) => [
    ...prev,
    {
      role: 'user',
      content,
      timestamp: new Date(),
    },
  ]);

  await InterviewService.saveMessage(
  sessionId,
  'user',
  content
);

  setIsTyping(true);

  try {
    const response =
      await fetch(
        '/api/interview',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            answer: content,
            interviewType,
          }),
        }
      );

    const data =
      await response.json();

    // ADD CHAT MESSAGE
    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',

        content:
          data.result ||
          'AI response failed',

        timestamp:
          new Date(),
      },
    ]);

    await InterviewService.saveMessage(
  sessionId,
  'assistant',
  data.result
);

    // D-ID VIDEO MODE
    if (
      mode === 'video' &&
      data.talkId
    ) {
      const interval =
        setInterval(
          async () => {
            const talkResponse =
              await fetch(
                `https://api.d-id.com/talks/${data.talkId}`,
                {
                  headers: {
                    Authorization: `Basic ${process.env.NEXT_PUBLIC_DID_API_KEY}`,
                  },
                }
              );

            const talkData =
              await talkResponse.json();

            if (
              talkData.status ===
              'done'
            ) {
              clearInterval(
                interval
              );

              const video =
                document.getElementById(
                  'ai-video'
                ) as HTMLVideoElement;

              if (
                video
              ) {
                video.src =
                  talkData.result_url;

                video.play();
              }
            }
          },
          3000
        );
    }

    // AI VOICE
    if (
      mode === 'video'
    ) {
      const utterance =
        new SpeechSynthesisUtterance(
          data.result
        );

      utterance.lang =
        'ja-JP';

      utterance.rate = 1;

      utterance.pitch = 1;

      utterance.onstart =
        () => {
          setIsSpeaking(
            true
          );
        };

      utterance.onend =
        () => {
          setIsSpeaking(
            false
          );
        };

      speechSynthesis.speak(
        utterance
      );
    }
  } catch (error) {
    console.error(error);

    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',

        content:
          'Error connecting to AI',

        timestamp:
          new Date(),
      },
    ]);
  }

  setIsTyping(false);
};



  // START MESSAGE
  useEffect(() => {
    const timer =
      setTimeout(() => {
        setIsTyping(true);

        setTimeout(() => {
          const firstMessage =
            'はじめまして。本日は面接に来ていただきありがとうございます。まず、自己紹介をお願いします。';

          setMessages([
            {
              role:
                'assistant',

              content:
                firstMessage,

              timestamp:
                new Date(),
            },
          ]);

          if (
            mode === 'video'
          ) {
            const utterance =
              new SpeechSynthesisUtterance(
                firstMessage
              );

            utterance.lang =
              'ja-JP';

            utterance.onstart =
              () => {
                setIsSpeaking(
                  true
                );
              };

            utterance.onend =
              () => {
                setIsSpeaking(
                  false
                );
              };

            speechSynthesis.speak(
              utterance
            );
          }

          setIsTyping(false);
        }, 1000);
      }, 0);

    return () =>
      clearTimeout(timer);
  }, []);


// SPEECH RECOGNITION
useEffect(() => {
  if (
    mode === 'video' &&
    typeof window !==
      'undefined'
  ) {
    const SpeechRecognition =
      (
        window as Window & {
          webkitSpeechRecognition?: new () => {
            lang: string;

            continuous: boolean;

            interimResults: boolean;

            start: () => void;

            onstart:
              | (() => void)
              | null;

            onend:
              | (() => void)
              | null;

            onresult:
              | ((
                  event: {
                    results: Array<
                      Array<{
                        transcript: string;
                      }>
                    >;
                  }
                ) => void)
              | null;
          };
        }
      )
        .webkitSpeechRecognition;

    if (!SpeechRecognition)
      return;

    const recognition =
      new SpeechRecognition();

    recognition.lang = 'ja-JP';

    recognition.continuous =
      false;

    recognition.interimResults =
      false;

    recognition.onstart =
      () => {
        setIsListening(true);
      };

    recognition.onend =
      () => {
        setIsListening(false);
      };

    recognition.onresult =
      async (
        event
      ) => {
        const transcript =
          event.results[0][0]
            .transcript;

        await handleSend(
          transcript
        );
      };

    recognitionRef.current =
      recognition;
  }
}, [mode]);




  // TIMER
  useEffect(() => {
    const timer =
      setInterval(() => {
        setElapsed(
          Math.floor(
            (Date.now() -
              startTime) /
              1000
          )
        );
      }, 1000);

    return () =>
      clearInterval(timer);
  }, [startTime]);

  // AUTO SCROLL
  useEffect(() => {
    if (
      scrollRef.current
    ) {
      scrollRef.current.scrollTop =
        scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const formatTime = (
    seconds: number
  ) => {
    const mins =
      Math.floor(
        seconds / 60
      );

    const secs =
      seconds % 60;

    return `${mins
      .toString()
      .padStart(
        2,
        '0'
      )}:${secs
      .toString()
      .padStart(
        2,
        '0'
      )}`;
  };

  return (
    <div className="flex flex-col h-screen max-w-6xl mx-auto p-4">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg border">

        <div className="flex items-center gap-3">

          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <Avatar className="h-10 w-10 bg-gray-600">
            <AvatarFallback className="bg-gray-600 text-white">
              AI
            </AvatarFallback>
          </Avatar>

          <div>
            <h2 className="font-semibold">
              {t(
                'aiInterviewer'
              )}
            </h2>

            <Badge
              variant={
                isTyping
                  ? 'secondary'
                  : 'default'
              }
              className="text-xs"
            >
              {isTyping
                ? t(
                    'typing'
                  )
                : t(
                    'inProgress'
                  )}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-4">

          <div className="flex items-center gap-2 text-muted-foreground">
            <Timer className="h-4 w-4" />

            <span className="text-sm font-mono">
              {formatTime(
                elapsed
              )}
            </span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <MessageSquare className="h-4 w-4" />

            <span className="text-sm font-mono">
              {
                messages.filter(
                  (m) =>
                    m.role ===
                    'user'
                ).length
              }
            </span>
          </div>

          <Button
  variant="destructive"
  onClick={() =>
    onEnd(
      elapsed,
      messages.filter(
        (m) =>
          m.role ===
          'user'
      ).length
    )
  }
>
            <LogOut className="mr-2 h-4 w-4" />

            {t(
              'endInterview'
            )}
          </Button>
        </div>
      </div>

      {/* VIDEO MODE */}
      {mode ===
        'video' && (
        <>
          {/* VIDEO SECTION */}
          <div className="grid grid-cols-2 gap-4 mb-4">
     
{/* AI HR */}
<motion.div
  animate={{
    scale: isSpeaking
      ? [1, 1.015, 1]
      : [1, 1.005, 1],

    y: isSpeaking
      ? [0, -2, 0]
      : [0, -1, 0],
  }}
  transition={{
    duration: isSpeaking
      ? 1
      : 4,

    repeat: Infinity,

    ease: 'easeInOut',
  }}
  className="relative bg-gray-900 rounded-2xl overflow-hidden h-[500px] border shadow-2xl"
>

  {/* VIDEO CONTAINER */}
  <div className="relative w-full h-full">

    {/* TALKING VIDEO */}
    <video
      id="ai-video"
      autoPlay
      playsInline
      className="w-full h-full object-cover"
      poster="/ai-hr.png"
    />

    {/* DEFAULT IMAGE */}
    <img
      src="/ai-hr.png"
      alt="AI HR"
      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
    />
  </div>

  {/* SPEAKING LIGHT */}
  {isSpeaking && (
    <motion.div
      className="absolute inset-0 bg-green-400/10"

      animate={{
        opacity: [
          0.1,
          0.25,
          0.1,
        ],
      }}

      transition={{
        duration: 1,
        repeat: Infinity,
      }}
    />
  )}

  {/* LIVE BADGE */}
  <div className="absolute top-4 right-4">

    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full">

      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />

      <span className="text-white text-sm">
        LIVE
      </span>
    </div>
  </div>

  {/* NAME */}
  <div className="absolute bottom-4 left-4">

    <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl">

      <p className="text-white font-semibold">
        Yuki Tanaka
      </p>

      <p className="text-gray-300 text-sm">
        HR Interviewer
      </p>
    </div>
  </div>

  {/* SPEAKING BORDER */}
  {isSpeaking && (
    <motion.div
      className="absolute inset-0 border-4 border-green-400 rounded-2xl"

      animate={{
        opacity: [
          0.5,
          1,
          0.5,
        ],
      }}

      transition={{
        duration: 1,
        repeat: Infinity,
      }}
    />
  )}
</motion.div>





            {/* USER CAMERA */}
            <div className="relative bg-black rounded-xl overflow-hidden h-[500px] border">

              <Webcam
                ref={
                  webcamRef
                }
                audio={
                  true
                }
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-4 left-4">
                <Badge variant="secondary">
                  You
                </Badge>
              </div>
            </div>
          </div>

          {/* MIC BUTTON */}
          <div className="flex justify-center">

            <Button
              size="lg"
              variant={
                isListening
                  ? 'destructive'
                  : 'default'
              }
              onClick={() => {
                recognitionRef.current?.start();
              }}
              className="w-full h-16 text-xl"
            >
              {isListening
                ? '🎤 Listening...'
                : '🎤 Speak Japanese'}
            </Button>
          </div>
        </>
      )}

      {/* CHAT MODE */}
      {mode ===
        'chat' && (
        <>
          {/* CHAT */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg border mb-4 p-4">

            <ScrollArea
              className="h-full pr-4"
              ref={
                scrollRef
              }
            >
              <div className="space-y-4">

                {messages.map(
                  (
                    message,
                    index
                  ) => (
                    <ChatMessage
                      key={
                        index
                      }
                      message={
                        message
                      }
                    />
                  )
                )}

                {isTyping && (
                  <ChatMessage
                    message={{
                      role:
                        'assistant',

                      content:
                        '',

                      timestamp:
                        new Date(),
                    }}
                    isTyping
                  />
                )}
              </div>
            </ScrollArea>
          </div>

          {/* INPUT */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">

            <ChatInput
              onSend={
                handleSend
              }
              disabled={
                isTyping
              }
            />
          </div>
        </>
      )}
    </div>
  );
}


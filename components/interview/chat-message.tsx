'use client';

import { motion } from 'framer-motion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  };
  isTyping?: boolean;
}

export function ChatMessage({ message, isTyping }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'flex gap-3',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      <Avatar className={cn(
        'h-10 w-10 shrink-0',
        isUser ? 'bg-blue-600' : 'bg-gray-600'
      )}>
        <AvatarFallback className={cn(
          isUser ? 'bg-blue-600' : 'bg-gray-600',
          'text-white'
        )}>
          {isUser ? 'You' : 'AI'}
        </AvatarFallback>
      </Avatar>

      <div className={cn(
        'flex flex-col max-w-[70%]',
        isUser ? 'items-end' : 'items-start'
      )}>
        <div
          className={cn(
            'rounded-2xl px-4 py-3 shadow-sm',
            isUser
              ? 'bg-blue-600 text-white rounded-br-md'
              : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-bl-md'
          )}
        >
          {isTyping ? (
            <div className="flex gap-1">
              <span className="animate-bounce">●</span>
              <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>●</span>
              <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>●</span>
            </div>
          ) : (
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          )}
        </div>
        <span className="text-xs text-muted-foreground mt-1">
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </motion.div>
  );
}

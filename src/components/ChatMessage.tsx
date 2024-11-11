import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../types';

interface Props {
  message: Message;
  fontSize: string;
}

export const ChatMessage: React.FC<Props> = ({ message, fontSize }) => {
  const isUser = message.role === 'user';
  
  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3 sm:mb-4 px-1 sm:px-0`}
    >
      <div
        className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3 sm:p-4 border ${
          isUser
            ? 'border-modern-primary bg-modern-primary/10 text-modern-primary shadow-modern'
            : 'border-modern-secondary bg-modern-secondary/10 text-modern-secondary shadow-modern-colored'
        } ${
          fontSize === 'small'
            ? 'text-sm'
            : fontSize === 'large'
            ? 'text-lg'
            : 'text-base'
        }`}
      >
        <ReactMarkdown 
          className="prose dark:prose-invert max-w-none prose-sm sm:prose-base"
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};
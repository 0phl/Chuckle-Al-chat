import React, { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

interface Props {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<Props> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-modern-gray/20 bg-white dark:bg-modern-dark p-3 sm:p-4">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 bg-gray-50 dark:bg-modern-dark rounded-xl p-2 border border-gray-200 dark:border-modern-gray/20 shadow-sm hover:shadow-modern transition-all duration-300">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-transparent border-none focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 min-w-0 text-sm sm:text-base px-2"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !message.trim()}
            className="p-1.5 sm:p-2 rounded-full bg-modern-primary disabled:opacity-50 transition-all duration-300 text-white hover:shadow-modern flex-shrink-0"
          >
            <PaperAirplaneIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};
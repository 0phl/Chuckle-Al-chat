import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { Settings } from './components/Settings';
import { TypingIndicator } from './components/TypingIndicator';
import { useStore } from './store/useStore';
import { generateAIResponse } from './services/ai';
import { Cog6ToothIcon, ArrowPathIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { Message } from './types';
import { ConfirmDialog } from './components/ConfirmDialog';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  
  const { 
    messages, 
    settings, 
    addMessage, 
    clearMessages,
    updateSettings 
  } = useStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setIsLoading(true);

    try {
      const response = await generateAIResponse(
        content,
        settings.tone,
        messages
      );

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      addMessage(aiMessage);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    if (messages.length > 0) {
      setConfirmOpen(true);
    }
  };

  const confirmClear = () => {
    clearMessages();
    setConfirmOpen(false);
  };

  const toggleTheme = () => {
    const newTheme = settings.theme === 'light' ? 'dark' : 'light';
    updateSettings({ theme: newTheme });
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-modern-light dark:bg-modern-dark transition-colors duration-300">
      {/* Header */}
      <header className="flex items-center justify-between p-3 sm:p-4 bg-white dark:bg-modern-dark border-b border-gray-200 dark:border-modern-gray/20 shadow-sm">
        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-modern text-transparent bg-clip-text animate-float">
          Chuckie AI
        </h1>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 rounded-full bg-modern-light dark:bg-modern-dark border border-modern-primary/20 hover:border-modern-primary/50 text-modern-primary transition-all duration-300 hover:shadow-modern"
            title={`Switch to ${settings.theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {settings.theme === 'light' ? (
              <MoonIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <SunIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
          <button
            onClick={handleNewChat}
            className="p-1.5 sm:p-2 rounded-full bg-modern-light dark:bg-modern-dark border border-modern-primary/20 hover:border-modern-primary/50 text-modern-primary transition-all duration-300 hover:shadow-modern"
            title="New Chat"
          >
            <ArrowPathIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={() => setSettingsOpen(true)}
            className="p-1.5 sm:p-2 rounded-full bg-modern-primary text-white hover:bg-modern-primary/90 transition-all duration-300 shadow-modern hover:shadow-modern-lg"
          >
            <Cog6ToothIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50 dark:bg-modern-dark">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            fontSize={settings.fontSize}
          />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />

      {/* Modals */}
      <Settings
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={updateSettings}
      />

      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmClear}
        title="Start New Chat"
        message="Are you sure you want to start a new chat? This will clear all current messages."
      />
    </div>
  );
}

export default App;
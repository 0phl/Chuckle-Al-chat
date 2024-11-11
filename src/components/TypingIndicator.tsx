import React from 'react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center space-x-2 p-4 animate-fade-in">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-modern-primary rounded-full animate-bounce [animation-delay:-0.3s] shadow-modern"></div>
        <div className="w-2 h-2 bg-modern-primary rounded-full animate-bounce [animation-delay:-0.15s] shadow-modern"></div>
        <div className="w-2 h-2 bg-modern-primary rounded-full animate-bounce shadow-modern"></div>
      </div>
    </div>
  );
}; 
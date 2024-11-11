export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export interface ChatSettings {
  tone: 'formal' | 'friendly' | 'humorous' | 'informative';
  theme: 'light' | 'dark';
  fontSize: 'small' | 'medium' | 'large';
}
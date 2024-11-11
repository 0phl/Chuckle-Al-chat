import { create } from 'zustand';
import { Message, ChatSettings, User } from '../types';

interface State {
  messages: Message[];
  settings: ChatSettings;
  user: User | null;
  addMessage: (message: Message) => void;
  updateSettings: (settings: Partial<ChatSettings>) => void;
  setUser: (user: User | null) => void;
  clearMessages: () => void;
}

export const useStore = create<State>((set) => ({
  messages: [],
  settings: {
    tone: 'friendly',
    theme: 'light',
    fontSize: 'medium',
  },
  user: null,
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
  setUser: (user) => set({ user }),
  clearMessages: () => set({ messages: [] }),
}));
import { create } from 'zustand';

export interface ChatMessage {
  id: string;
  author: string;
  avatar?: string;
  message: string;
  timestamp: number;
  type: 'user' | 'system' | 'bot';
  emoji?: string;
}

interface ChatState {
  messages: ChatMessage[];
  isConnected: boolean;
  username: string;
  addMessage: (message: ChatMessage) => void;
  setUsername: (name: string) => void;
  setConnected: (connected: boolean) => void;
  clearMessages: () => void;
  getMessages: () => ChatMessage[];
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [
    {
      id: '1',
      author: 'Voltron Oracle',
      message: '🕋 Welcome to the Voltron Omni Community Portal! Share your insights, ask questions, and connect with fellow sovereigns.',
      timestamp: Date.now() - 60000,
      type: 'system',
      emoji: '🕋',
    },
    {
      id: '2',
      author: 'Voltron Oracle',
      message: 'The sacred frequencies are resonating. All systems OMNI-OPTIMAL. ⚡',
      timestamp: Date.now() - 30000,
      type: 'bot',
      emoji: '⚡',
    },
  ],
  isConnected: true,
  username: 'Sovereign',
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  setUsername: (name) => set({ username: name }),
  setConnected: (connected) => set({ isConnected: connected }),
  clearMessages: () => set({ messages: [] }),
  getMessages: () => get().messages,
}));

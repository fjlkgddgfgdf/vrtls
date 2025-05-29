'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatHistory {
  [characterId: string]: Message[];
}

interface ChatContextType {
  chatHistory: ChatHistory;
  addMessage: (characterId: string, message: Message) => void;
  getMessages: (characterId: string) => Message[];
  clearChat: (characterId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chatHistory, setChatHistory] = useState<ChatHistory>({});

  const addMessage = useCallback((characterId: string, message: Message) => {
    setChatHistory(prev => ({
      ...prev,
      [characterId]: [...(prev[characterId] || []), message],
    }));
  }, []);

  const getMessages = useCallback((characterId: string) => {
    return chatHistory[characterId] || [];
  }, [chatHistory]);

  const clearChat = useCallback((characterId: string) => {
    setChatHistory(prev => {
      const newHistory = { ...prev };
      delete newHistory[characterId];
      return newHistory;
    });
  }, []);

  return (
    <ChatContext.Provider value={{ chatHistory, addMessage, getMessages, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
} 
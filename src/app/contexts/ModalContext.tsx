'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { characterDetails } from '../data/characters';

interface ModalContextType {
  isModalOpen: boolean;
  selectedCharacter: number | null;
  userName: string;
  openModal: (characterIndex: number) => void;
  closeModal: () => void;
  handleSubmit: (name: string, age: number) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null);
  const [userName, setUserName] = useState('');
  const router = useRouter();

  const openModal = (characterIndex: number) => {
    setSelectedCharacter(characterIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCharacter(null);
  };

  const handleSubmit = (name: string, age: number) => {
    console.log('Form submitted:', { name, age, selectedCharacter });
    setUserName(name);
    closeModal();
    
    // Get the character ID from the characterDetails array
    const character = characterDetails[selectedCharacter || 0];
    if (character) {
      router.push(`/chat/${character.id}`);
    }
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        selectedCharacter,
        userName,
        openModal,
        closeModal,
        handleSubmit,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
} 
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useModal } from '../../contexts/ModalContext';
import { useChatContext } from '../../contexts/ChatContext';
import { generateAIResponse } from '../../services/ai';
import { characterDetails as characterList } from '../../data/characters';

interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  characterId: string;
}

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const { userName } = useModal();
  const { chatHistory, addMessage, getMessages, clearChat } = useChatContext();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const character = params?.character as string || '';
  const currentCharacter = characterList.find(c => c.id === character);
  
  useEffect(() => {
    if (!currentCharacter) {
      router.push('/');
    }
  }, [currentCharacter, router]);

  const currentMessages = getMessages(character);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      text: input.trim(),
      sender: 'user',
      timestamp: new Date(),
      characterId: character
    };

    addMessage(character, {
      role: 'user',
      content: input.trim()
    });
    
    setInput('');
    setIsLoading(true);

    try {
      const messages = getMessages(character);
      const aiResponse = await generateAIResponse(messages, currentCharacter?.description || '');

      addMessage(character, {
        role: 'assistant',
        content: aiResponse
      });
    } catch (error) {
      console.error('Error generating AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    clearChat(character);
  };

  if (!currentCharacter) return null;

  return (
    <div className="flex h-[calc(100vh-64px)] bg-[#0a0a0a] text-white">
      {/* Sidebar с аватарами */}
      <div className="hidden md:flex w-20 bg-[#111111] border-gray-800 border-r">
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent py-4">
          <div className="flex flex-col items-center space-y-4">
            {characterList.map((char) => (
              <div
                key={char.id}
                className={`relative cursor-pointer transition-transform group ${
                  char.locked ? 'cursor-not-allowed' : 'hover:scale-105'
                }`}
                onClick={() => !char.locked && router.push(`/chat/${char.id}`)}
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={`/avatars/${char.imageId}.webp`}
                    alt={char.name}
                    width={48}
                    height={48}
                    className={`w-full h-full object-cover ${char.locked ? 'blur-sm brightness-75' : ''}`}
                  />
                  {char.locked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-lock w-5 h-5 text-white"
                      >
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                  )}
                </div>
                {char.locked && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    1,000,000 $SUGAR required
                  </div>
                )}
                {getMessages(char.id).length > 0 && !char.locked && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="flex-1 flex flex-col">
        {/* Хедер */}
        <div className="h-16 border-b border-gray-800 flex items-center justify-between px-4">
          <div className="flex items-center space-x-3">
            <button className="md:hidden p-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
              </svg>
            </button>
            <Image
              src={`/avatars/${currentCharacter.imageId}.webp`}
              alt={currentCharacter.name}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-semibold">{currentCharacter.name}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-300">Hey, <span className="font-semibold">{userName}</span>!</span>
            <button
              onClick={handleClearChat}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              title="Clear chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Чат */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
          {currentMessages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-800 text-gray-100'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-800 text-gray-100 rounded-lg p-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Ввод сообщения */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
          <div className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </form>
      </div>

      {/* Правая панель с информацией о персонаже */}
      <div className="hidden lg:block w-96 bg-[#111111] border-gray-800 border-l p-6">
        <div className="relative w-full h-96 bg-[#1a1a1a] rounded-lg overflow-hidden">
          <Image
            src={`/avatars/${currentCharacter.imageId}.webp`}
            alt={currentCharacter.name}
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-4">
          <h2 className="text-2xl font-bold">{currentCharacter.name}</h2>
          <p className="mt-2 text-gray-400">
            {currentCharacter.description.includes('http') ? (
              <>
                {currentCharacter.description.split('http')[0]}
                <a 
                  href={'http' + currentCharacter.description.split('http')[1]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-pink-400 transition-colors block mt-2"
                >
                  Visit OF →
                </a>
              </>
            ) : (
              currentCharacter.description
            )}
          </p>
        </div>
      </div>
    </div>
  );
} 
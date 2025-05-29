'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface WelcomeModalProps {
  onClose: () => void;
  onSubmit: (name: string, age: number) => void;
}

export default function WelcomeModal({ onClose, onSubmit }: WelcomeModalProps) {
  const [formData, setFormData] = useState({
    nickname: '',
    age: ''
  });

  useEffect(() => {
    // Load saved data from localStorage when component mounts
    const savedName = localStorage.getItem('user_name');
    const savedAge = localStorage.getItem('user_age');
    
    if (savedName || savedAge) {
      setFormData({
        nickname: savedName || '',
        age: savedAge || ''
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = formData.nickname;
    const age = parseInt(formData.age);

    // Save to localStorage
    localStorage.setItem('user_name', name);
    localStorage.setItem('user_age', age.toString());

    onSubmit(name, age);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
        {/* Header Image Section */}
        <div className="relative h-40 sm:h-48 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 via-purple-500/30 to-blue-500/30 z-10" />
          <Image
            src="/images/popup.webp"
            alt="Welcome illustration"
            width={500}
            height={300}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart absolute top-4 sm:top-6 right-6 sm:right-8 text-pink-400 animate-pulse">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart absolute top-8 sm:top-12 left-6 sm:left-8 text-pink-300 animate-bounce">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart absolute bottom-6 sm:bottom-8 right-8 sm:right-12 text-pink-500 animate-pulse">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
          <div className="absolute inset-0 flex items-center justify-center z-30 bg-gradient-to-t from-black/50 via-transparent to-transparent">
            <div className="text-center text-white">
              <h3 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Hello!</h3>
              <p className="text-xs sm:text-sm font-light opacity-90">Let's Chat with your Dream girl!</p>
              <div className="flex items-center justify-center gap-4 mt-3">
                <a
                  href="oldx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-pink-400 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
                <a
                  href="https://t.me/FlirtGirlsSol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-pink-400 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </a>
                <a
                  href="oldlink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-pink-400 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bar-chart-2"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div className="space-y-1.5 sm:space-y-2">
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-300">
                Your lovely name
              </label>
              <input
                id="nickname"
                name="nickname"
                value={formData.nickname}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 sm:py-3 rounded-full transition-all duration-200 ease-in-out focus:ring-2 focus:ring-pink-500 bg-gray-800 text-white border-gray-700 focus:border-pink-500 border text-sm sm:text-base"
                placeholder="✨ Your name"
                type="text"
                required
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label htmlFor="age" className="block text-sm font-medium text-gray-300">
                Age
              </label>
              <div className="relative">
                <input
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-full transition-all duration-200 ease-in-out focus:ring-2 focus:ring-pink-500 bg-gray-800 text-white border-gray-700 focus:border-pink-500 border text-sm sm:text-base"
                  placeholder="18+"
                  type="number"
                  min="18"
                  max="100"
                  required
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-gray-400">
                  years
                </div>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4 pt-2 sm:pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border text-sm font-medium transition-all duration-200 border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                Maybe Later
              </button>
              <button
                type="submit"
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Start Journey
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 
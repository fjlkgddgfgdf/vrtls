'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import BuildYourOwnCard from './BuildYourOwnCard';
import { characters } from '../data/characters';
import { useState } from 'react';
import WelcomeModal from './WelcomeModal';
import { useModal } from '../contexts/ModalContext';

interface CharacterCard {
  id: string;
  name: string;
  imageId: string;
  description: string;
  locked: boolean;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

const badgeVariants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
      delay: 0.2
    }
  }
};

const tokenVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      delay: 0.3
    }
  }
};

export default function ExploreSection() {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [hoveredCharacter, setHoveredCharacter] = useState<number | null>(null);
  const { isModalOpen, selectedCharacter, openModal, closeModal, handleSubmit } = useModal();

  const handleImageError = (characterName: string) => {
    setFailedImages(prev => ({
      ...prev,
      [characterName]: true
    }));
  };

  const isLocked = (index: number) => index >= 4;

  const handleCardClick = (index: number) => {
    if (!isLocked(index)) {
      openModal(index);
    }
  };

  const getSwapImage = (index: number) => {
    const swapImages = ['first_swap', 'second_swap', 'third_swap', 'fourth_swap'];
    return index < 4 ? `/images/${swapImages[index]}.jpg` : '';
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Description Block - Moved to top */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <div className="inline-block max-w-3xl">
            <p className="text-xl sm:text-2xl font-light text-gray-200 mb-6 leading-relaxed">
              FLIRT GIRLS is a new way to connect with the internet's most irresistible personalities — reimagined as anime-style AI companions.
            </p>
            <p className="text-lg sm:text-xl font-light text-gray-300 leading-relaxed">
              We collaborate with real creators and models to bring their digital alter egos to life: flirty, stylized, and always online.
            </p>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-white mb-12">Explore AI Flirt Babies</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          <motion.div
            className="relative h-[400px] sm:h-[500px] rounded-xl overflow-hidden cursor-pointer group"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={0}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="transition-all duration-500 group-hover:blur-sm">
              <BuildYourOwnCard />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                className="w-12 h-12 text-white drop-shadow-glow animate-bounce"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
          </motion.div>
          {characters.map((character, index) => (
            <motion.div
              key={character.name}
              className="relative h-[400px] sm:h-[500px] rounded-xl overflow-hidden cursor-pointer group"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={index}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              onClick={() => handleCardClick(index)}
              onMouseEnter={() => setHoveredCharacter(index)}
              onMouseLeave={() => setHoveredCharacter(null)}
            >
              <Image
                src={
                  !isLocked(index) && hoveredCharacter === index
                    ? getSwapImage(index)
                    : failedImages[character.name]
                    ? '/images/placeholder.svg'
                    : character.images[6].src
                }
                alt={`${character.name}'s avatar`}
                fill
                className={`object-cover transition-all duration-500 group-hover:scale-110 ${isLocked(index) ? 'brightness-90 blur-sm' : ''}`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                quality={100}
                priority={index < 4}
                onError={() => handleImageError(character.name)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              
              {/* Top badges - только для заблокированных персонажей */}
              {isLocked(index) && (
                <div className="absolute top-4 right-4 left-4 flex justify-between items-start z-20">
                  <motion.div
                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1"
                    variants={badgeVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <span className="animate-pulse">●</span> NEW
                  </motion.div>
                  
                  <motion.div
                    className="bg-black/60 backdrop-blur-md rounded-full px-3 py-1 border border-pink-500/50 shadow-lg flex items-center gap-2"
                    variants={tokenVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <span className="text-pink-500 font-bold text-sm">$</span>
                    <Image
                      src="/images/pp-1.png"
                      alt="SUGAR token"
                      width={16}
                      height={16}
                      className="w-4 h-4 bg-coin"
                    />
                    <span className="text-pink-500 font-bold text-sm">1M</span>
                  </motion.div>
                </div>
              )}

              {/* Анимированный замок появляется только при наведении */}
              {isLocked(index) && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                    className="w-12 h-12 text-white drop-shadow-glow animate-bounce"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
              )}

              {/* Character Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                <h3 className="text-2xl font-bold mb-2">{character.name}</h3>
                <p className="text-gray-300 mb-2">{character.description}</p>
                {character.id === 'sakura' && (
                  <a href="https://onlyfans.com/harley_fayefree" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 transition-colors">
                    Visit OF →
                  </a>
                )}
                {character.id === 'yuki' && (
                  <a href="https://onlyfans.com/summerchandler" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 transition-colors">
                    Visit OF →
                  </a>
                )}
                {character.id === 'mai' && (
                  <a href="https://onlyfans.com/candidcath" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 transition-colors">
                    Visit OF →
                  </a>
                )}
                {character.id === 'rei' && (
                  <a href="https://onlyfans.com/baby_capricornn" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 transition-colors">
                    Visit OF →
                  </a>
                )}
              </div>
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            </motion.div>
          ))}
        </div>

        {/* Welcome Modal */}
        {isModalOpen && selectedCharacter !== null && (
          <WelcomeModal
            onClose={closeModal}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </section>
  );
} 
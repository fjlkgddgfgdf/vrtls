'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppKitAccount, useAppKit } from '@reown/appkit/react';
import { useDisconnect } from '@reown/appkit/react';

export default function Navbar() {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const { open } = useAppKit();
   const { disconnect } = useDisconnect();
   const solanaAccount = useAppKitAccount({ namespace: 'solana' });
   const isConnected = solanaAccount.isConnected;
   const publicKey = solanaAccount.address;
   const [tokenBalance, setTokenBalance] = useState('0');

   useEffect(() => {
      if (isConnected && publicKey) {
         // Здесь можно добавить логику получения баланса токенов
         // Например, через API или другой метод
         setTokenBalance('0'); // Временно установим 0
      } else {
         setTokenBalance('0');
      }
   }, [isConnected, publicKey]);

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
   };

   const connectWallet = async (): Promise<void> => {
      try {
         await open({
            view: 'Connect',
            namespace: 'solana'
         });
      } catch (error) {
         console.error('Wallet connection error:', error);
      }
   };

   const disconnectWallet = async (): Promise<void> => {
      try {
         await disconnect();
      } catch (error) {
         console.error('Error disconnecting wallet:', error);
      }
   };

   return (
      <nav className='fixed top-0 left-0 right-0 z-50 bg-[#0b0d0e]/95 backdrop-blur-md border-gray-800 border-b transition-colors duration-200'>
         <div className='max-w-7xl mx-auto px-2 sm:px-4 lg:px-8'>
            <div className='flex items-center justify-between h-14 sm:h-16'>
               <motion.div
                  className='flex items-center'
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
               >
                  <Link
                     href='/'
                     className='flex items-center space-x-1 sm:space-x-2'
                  >
                     <motion.div
                        className='w-8 h-8 sm:w-10 sm:h-10'
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                     >
                        <Image
                           src='/images/pp.png'
                           alt='AIGF Logo'
                           width={60}
                           height={60}
                           className='w-full h-full object-contain'
                        />
                     </motion.div>
                  </Link>
                  <motion.div
                     className='flex items-center space-x-6 sm:space-x-8 ml-8 sm:ml-12'
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 0.2 }}
                  >
                     <Link
                        href='https://x.com/FlirtGirlsSol'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-white hover:text-pink-400 transition-colors p-1'
                     >
                        <svg
                           xmlns='http://www.w3.org/2000/svg'
                           width='24'
                           height='24'
                           viewBox='0 0 300 300'
                           fill='currentColor'
                           className='w-5 h-5'
                        >
                           <path d='M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66' />
                        </svg>
                     </Link>
                     <Link
                        href='https://t.me/FlirtGirlsSol'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-white hover:text-pink-400 transition-colors p-1'
                     >
                        <svg
                           xmlns='http://www.w3.org/2000/svg'
                           width='24'
                           height='24'
                           viewBox='0 0 24 24'
                           fill='none'
                           stroke='currentColor'
                           strokeWidth='2'
                           strokeLinecap='round'
                           strokeLinejoin='round'
                           className='w-5 h-5'
                        >
                           <line x1='22' x2='11' y1='2' y2='13' />
                           <polygon points='22 2 15 22 11 13 2 9 22 2' />
                        </svg>
                     </Link>
                     <Link
                        href='oldlink'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-white hover:text-pink-400 transition-colors p-1'
                     >
                        <Image
                           src='/images/dexscreener_logo.jpg'
                           alt='Dexscreener'
                           width={20}
                           height={20}
                           className='w-5 h-5 rounded-full'
                        />
                     </Link>
                  </motion.div>
               </motion.div>

               {/* Desktop Navigation */}
               <motion.div
                  className='hidden sm:flex items-center space-x-4'
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
               >
                  <button
                     className='hidden sm:block px-4 py-2 rounded-lg border border-gray-700 hover:border-gray-600 text-gray-300'
                     onClick={isConnected ? disconnectWallet : connectWallet}
                  >
                     {isConnected && publicKey ? (
                        <>
                           {publicKey.slice(0, 4)}...{publicKey.slice(-4)}
                           {tokenBalance !== '0' && (
                              <span className='ml-2'>
                                 | $FLIRT: {tokenBalance}
                              </span>
                           )}
                        </>
                     ) : (
                        'Connect Wallet'
                     )}
                  </button>
                  <motion.div
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                  >
                     <Link
                        href='oldlink'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='relative bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg text-base font-medium hover:from-pink-600 hover:to-purple-600 transition-all duration-200 transform hover:-translate-y-0.5 animate-borderGlow whitespace-nowrap'
                     >
                        Buy $FLIRT
                     </Link>
                  </motion.div>
               </motion.div>

               {/* Mobile Menu Button */}
               <motion.button
                  className='sm:hidden text-gray-300 hover:text-white p-2'
                  onClick={toggleMenu}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
               >
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     fill='none'
                     viewBox='0 0 24 24'
                     stroke='currentColor'
                     className='w-6 h-6'
                  >
                     {isMenuOpen ? (
                        <path
                           strokeLinecap='round'
                           strokeLinejoin='round'
                           strokeWidth={2}
                           d='M6 18L18 6M6 6l12 12'
                        />
                     ) : (
                        <path
                           strokeLinecap='round'
                           strokeLinejoin='round'
                           strokeWidth={2}
                           d='M4 6h16M4 12h16M4 18h16'
                        />
                     )}
                  </svg>
               </motion.button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
               {isMenuOpen && (
                  <motion.div
                     className='sm:hidden'
                     initial={{ opacity: 0, height: 0 }}
                     animate={{ opacity: 1, height: 'auto' }}
                     exit={{ opacity: 0, height: 0 }}
                     transition={{ duration: 0.2 }}
                  >
                     <div className='px-2 pt-2 pb-3 space-y-1'>
                        <button
                           className='block px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 transition-colors duration-200'
                           onClick={
                              isConnected ? disconnectWallet : connectWallet
                           }
                        >
                           {isConnected && publicKey ? (
                              <>
                                 {publicKey.slice(0, 4)}...{publicKey.slice(-4)}
                                 {tokenBalance !== '0' && (
                                    <span className='ml-2'>
                                       | $FLIRT: {tokenBalance}
                                    </span>
                                 )}
                              </>
                           ) : (
                              'Connect Wallet'
                           )}
                        </button>
                        <Link
                           href='oldlink'
                           target='_blank'
                           rel='noopener noreferrer'
                           className='block px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 transition-colors duration-200'
                        >
                           Buy $FLIRT
                        </Link>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
      </nav>
   );
}

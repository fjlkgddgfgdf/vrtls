'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import WalletStatus from './WalletStatus';

export default function Hero() {
  return (
    <div className="relative min-h-[400px] bg-[#1E1726] rounded-[32px] overflow-hidden px-8 py-12">
      {/* Left side content */}
      <motion.div 
        className="relative z-10 max-w-xl pt-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-[52px] leading-[1.1] font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          YOUR LOVELY FLIRT BABY
        </motion.h1>

        <motion.p 
          className="text-xl text-gray-300 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Chat with your dream AI Girlfriend
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <WalletStatus />
        </motion.div>
      </motion.div>

      {/* Right side images */}
      <motion.div 
        className="absolute top-0 right-0 h-full w-[55%]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <div className="relative h-full flex justify-end items-end">
          <div className="relative h-full w-1/2">
            <Image
              src="/images/grp.png"
              alt="Virtual companions group"
              fill
              className="object-contain object-bottom"
              sizes="(max-width: 1024px) 50vw, 25vw"
              quality={100}
              priority
            />
          </div>
          <div className="relative h-full w-1/2 ml-4">
            <Image
              src="/images/three_real_girls.png"
              alt="Three real girls"
              fill
              className="object-contain object-bottom"
              sizes="(max-width: 1024px) 50vw, 25vw"
              quality={100}
              priority
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
} 
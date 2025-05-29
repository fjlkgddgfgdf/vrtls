'use client';

import { motion } from 'framer-motion';

export default function BuildYourOwnCard() {
  return (
    <motion.div 
      className="relative h-[400px] sm:h-[500px] rounded-[32px] overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 animate-gradient-xy"></div>
      
      {/* Hover overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/10 transition-opacity duration-300"></div>
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white">
        {/* Sparkle icon with rotation animation */}
        <motion.div 
          className="mb-6"
          animate={{ rotate: [-10, 10, -10] }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse"
          }}
        >
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
            className="w-20 h-20 text-yellow-300 drop-shadow-glow filter brightness-125"
            style={{
              filter: "drop-shadow(0 0 10px rgba(253, 224, 71, 0.5)) drop-shadow(0 0 20px rgba(253, 224, 71, 0.3))"
            }}
          >
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
            <path d="M20 3v4" />
            <path d="M22 5h-4" />
            <path d="M4 17v2" />
            <path d="M5 18H3" />
          </svg>
        </motion.div>

        {/* Text content */}
        <h2 className="font text-3xl sm:text-4xl font-bold mb-4 text-center text-shadow-glow">
          Build Your Own
        </h2>
        <p className="text-lg text-center mb-6 text-white/90">
          Design your perfect AI girlfriend
        </p>

        {/* Icons */}
        <div className="flex gap-4 mb-6">
          {/* Star icon */}
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
            className="w-6 h-6 text-yellow-300 animate-pulse"
          >
            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
          </svg>

          {/* Crown icon */}
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
            className="w-6 h-6 text-yellow-300 animate-pulse delay-100"
          >
            <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
            <path d="M5 21h14" />
          </svg>

          {/* Heart icon */}
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
            className="w-6 h-6 text-yellow-300 animate-pulse delay-200"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
} 
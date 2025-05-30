'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaCopy, FaCheck } from 'react-icons/fa';

export default function PhantomGuide() {
   const [copied, setCopied] = useState(false);

   const phantomUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.href;

   const copyToClipboard = async () => {
      try {
         await navigator.clipboard.writeText(phantomUrl);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      } catch (err) {
         console.error('Failed to copy: ', err);
      }
   };

   return (
      <div className='min-h-screen flex items-center justify-center bg-[url("/grid.png")] bg-repeat p-6'>
         <div className='bg-gradient-to-b from-gray-900 to-black border border-pink-500/20 rounded-2xl max-w-md w-full p-8 shadow-[0_0_15px_rgba(236,72,153,0.3)]'>
            <h1 className='text-3xl font-bold mb-8 text-center text-white'>
               Open in{' '}
               <span className='bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text'>
                  Phantom Browser
               </span>
            </h1>

            <div className='mb-8'>
               <p className='text-gray-300 mb-6 text-lg'>
                  To use this app with your Phantom wallet on mobile, you need
                  to open this link in the Phantom browser:
               </p>

               <ol className='space-y-4 mb-8'>
                  <li className='flex items-center text-gray-300'>
                     <span className='w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold mr-3'>
                        1
                     </span>
                     Copy the link below
                  </li>
                  <li className='flex items-center text-gray-300'>
                     <span className='w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold mr-3'>
                        2
                     </span>
                     Open the Phantom app on your device
                  </li>
                  <li className='flex items-center text-gray-300'>
                     <span className='w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold mr-3'>
                        3
                     </span>
                     Tap on the browser icon at the bottom
                  </li>
                  <li className='flex items-center text-gray-300'>
                     <span className='w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold mr-3'>
                        4
                     </span>
                     Paste the link in the address bar
                  </li>
               </ol>
            </div>

            <div className='mb-8 bg-black/50 rounded-xl p-4 relative border border-pink-500/20'>
               <p className='text-sm font-mono break-all pr-10 text-gray-300'>
                  {phantomUrl}
               </p>
               <button
                  onClick={copyToClipboard}
                  className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded-full p-2 transition-all transform hover:scale-105'
                  aria-label='Copy to clipboard'
               >
                  {copied ? (
                     <FaCheck size={16} className='text-white' />
                  ) : (
                     <FaCopy size={16} className='text-white' />
                  )}
               </button>
            </div>

            <div className='flex flex-col items-center'>
               <Link
                  href={'/'}
                  className='w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-xl uppercase tracking-wider shadow-lg hover:from-pink-600 hover:to-purple-600 transition-all transform hover:scale-[1.02] text-center'
               >
                  Return to Home
               </Link>
            </div>
         </div>
      </div>
   );
}

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
      <div className='flex flex-col items-center justify-center p-6'>
         <div className='bg-[#130720] border border-[#6F39AA] rounded-[2rem] max-w-md w-full p-8 text-white'>
            <h1 className='text-2xl font-bold mb-6 text-center'>
               Open in{' '}
               <span className='font-bold text-purple-600'>
                  Phantom Browser
               </span>
            </h1>

            <div className='mb-8'>
               <p className='mb-4'>
                  To use this app with your Phantom wallet on mobile, you need
                  to open this link in the Phantom browser:
               </p>

               <ol className='list-decimal pl-6 space-y-2 mb-6'>
                  <li>Copy the link below</li>
                  <li>Open the Phantom app on your device</li>
                  <li>Tap on the browser icon at the bottom</li>
                  <li>Paste the link in the address bar</li>
               </ol>
            </div>

            <div className='mb-8 bg-[#2a1841] rounded-lg p-4 relative'>
               <p className='text-sm font-mono break-all pr-10'>{phantomUrl}</p>
               <button
                  onClick={copyToClipboard}
                  className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#6F39AA] hover:bg-[#8B45D6] rounded-full p-2 transition-colors'
                  aria-label='Copy to clipboard'
               >
                  {copied ? <FaCheck size={16} /> : <FaCopy size={16} />}
               </button>
            </div>

            <div className='flex flex-col items-center'>
               <Link
                  href={'/'}
                  className='bg-[#6F39AA] font-bold hover:bg-[#8B45D6] text-white py-3 px-6 rounded-full transition-colors mb-4 text-center w-full'
               >
                  Return to Home
               </Link>
            </div>
         </div>
      </div>
   );
}

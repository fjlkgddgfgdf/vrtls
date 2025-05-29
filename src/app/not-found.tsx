'use client';

import { useRouter } from 'next/navigation';

export default function NotFound() {
   const router = useRouter();

   return (
      <div className='flex h-screen items-center justify-center bg-[#0a0a0a] text-white'>
         <div className='text-center'>
            <h1 className='text-4xl font-bold mb-4'>404</h1>
            <p className='text-gray-400 mb-8'>Page not found</p>
            <button
               onClick={() => router.push('/')}
               className='px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors'
            >
               Return Home
            </button>
         </div>
      </div>
   );
}

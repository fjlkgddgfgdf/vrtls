'use client';

import { useAppKitAccount, useAppKit } from '@reown/appkit/react';
import { useDisconnect } from '@reown/appkit/react';
import { useState, useEffect } from 'react';

export default function WalletStatus() {
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

   return isConnected && publicKey ? (
      <div className='bg-[#E558B1] text-white px-8 py-3 rounded-full text-lg font-medium inline-flex items-center space-x-4'>
         <span className='font-mono text-base'>
            {publicKey.slice(0, 4)}...{publicKey.slice(-4)}
         </span>
         {tokenBalance !== '0' && (
            <span className='text-white font-bold text-base'>
               $FLIRT: {tokenBalance}
            </span>
         )}
         <button
            onClick={disconnectWallet}
            className='ml-4 px-4 py-2 rounded-full bg-[#d44ba0] text-white text-base font-medium hover:bg-[#c13e92] transition-colors duration-300'
         >
            Disconnect
         </button>
      </div>
   ) : (
      <button
         className='bg-[#E558B1] text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-[#d44ba0] transition-colors duration-300'
         onClick={connectWallet}
      >
         CONNECT WALLET
      </button>
   );
}

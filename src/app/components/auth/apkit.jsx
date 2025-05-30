'use client';

import { wagmiAdapter, projectId, networks } from './config/wagmiConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAppKit } from '@reown/appkit/react';
import React from 'react';
import { cookieToInitialState, WagmiProvider } from 'wagmi';
import { SolanaAdapter } from '@reown/appkit-adapter-solana';

// Создаем QueryClient для React Query
const queryClient = new QueryClient();

// 2. Create a metadata object
const metadata = {
   name: 'Meme app',
   description: 'Wallet connect',
   url: process.env.NEXT_PUBLIC_SITE_URL, // origin must match your domain & subdomain
   icons: [`${process.env.NEXT_PUBLIC_SITE_URL}/favicon.png`]
};

const solanaAdapter = new SolanaAdapter({
   networks,
   ssr: true
});
// Экспортируем networks для других компонентов
export { networks };

const blockedForPublicWallets = [
   'a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393' //phantom
];

function isMobileAndNotPhantom() {
   if (typeof navigator === 'undefined') return false;

   const ua = navigator.userAgent.toLowerCase();
   const isMobile = /iphone|ipad|android|mobile/.test(ua);
   const isPhantom = ua.includes('phantom');

   return isMobile && !isPhantom;
}

export const modal = createAppKit({
   adapters: [wagmiAdapter, solanaAdapter],
   projectId,
   networks,
   metadata,
   themeMode: 'light',
   features: {
      connectMethodsOrder: ['wallet'],
      analytics: true, // Optional - defaults to your Cloud configuration
      forceSelectionOnConnect: true // Показывать экран выбора кошелька каждый раз
   },
   featuredWalletIds: [
      'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', //metamask
      'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa', //solflare
      '1ca0bdd4747578705b1939af023d120677c64fe6ca76add81fda36e350605e79', //coinbase
      '8a0ee50d1f22f6651afcae7eb4253e52a3310b90af5daef78a8c4929a9bb99d4' //binance
   ],
   customWallets: [
      ...(typeof window !== 'undefined' && isMobileAndNotPhantom()
         ? [
              {
                 id: 'phantom-custom',
                 name: 'Phantom (guide)',
                 image_url: `${process.env.NEXT_PUBLIC_SITE_URL}/phantom.png`,
                 mobile_link: (() => {
                    // Construct absolute URL with locale from cookie
                    const phantomGuideUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/phantom-guide`;

                    return phantomGuideUrl;
                 })(),
                 desktop_link: 'https://phantom.app'
              }
           ]
         : [])
   ],
   // includeWalletIds: [
   //    '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369',
   //    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0'
   // ],
   // excludeWalletIds: [],
   // isClient && localStorage.getItem('devMode') === 'enabled'
   //    ? []
   //    : blockedForPublicWallets,
   themeVariables: {
      // Основной акцентный цвет
      '--w3m-accent': '#000000',

      // Цвета кнопок
      '--w3m-accent-fill': '#000000', // Основной цвет заливки кнопки
      '--w3m-accent-color': '#FFFFFF', // Цвет текста на кнопке
      '--w3m-button-hover-opacity': '0.8', // Прозрачность при наведении
      '--w3m-color-fg-1': '#FFFFFF', // Цвет переднего плана
      '--w3m-color-fg-2': '#F4F4F4', // Цвет альтернативного переднего плана

      // Общая стилизация контролов
      '--w3m-border-radius-master': '12px', // Радиус скругления
      '--w3m-container-border-radius': '24px', // Радиус контейнера
      '--w3m-button-border-radius': '12px', // Радиус кнопки
      '--w3m-font-family': 'Inter, sans-serif', // Шрифт

      // Стили текста
      '--w3m-text-medium-regular-size': '15px',
      '--w3m-text-medium-regular-weight': '500',
      '--w3m-text-medium-regular-line-height': '20px'
   }
});

export function AppKit({ children, cookies }) {
   const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig, cookies);
   return (
      <WagmiProvider
         config={wagmiAdapter.wagmiConfig}
         initialState={initialState}
      >
         <QueryClientProvider client={queryClient}>
            {children}
         </QueryClientProvider>
      </WagmiProvider>
   );
}

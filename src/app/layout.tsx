
import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';
import type { Metadata } from 'next';
import { ModalProvider } from './contexts/ModalContext';
import { ChatProvider } from './contexts/ChatContext';
import { WalletProvider } from './contexts/WalletContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Virtual Sugar Baby - Your Virtual Companion',
  description: 'No girlfriend? No problem! Design and personalize your AI girlfriend today. Enjoy meaningful conversations, emotional support, and fun interactions tailored just for you. [ 690m total supply ]',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased gradient-bg min-h-screen pt-14 sm:pt-16`}>
        <WalletProvider>
          <ChatProvider>
            <ModalProvider>
              <Navbar />
              {children}
            </ModalProvider>
          </ChatProvider>
        </WalletProvider>
      </body>
    </html>
  );
} 
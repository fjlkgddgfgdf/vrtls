'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { Connection, PublicKey } from '@solana/web3.js';

// Add type declaration for window.solana
declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
    };
  }
}

// Token Program Interface
interface TokenBalance {
  amount: number;
  decimals: number;
}

interface WalletContextType {
  wallet: PhantomWalletAdapter | null;
  connected: boolean;
  publicKey: string | null;
  connecting: boolean;
  tokenBalance: string;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType>({
  wallet: null,
  connected: false,
  publicKey: null,
  connecting: false,
  tokenBalance: '0',
  connect: async () => {},
  disconnect: async () => {},
});

export function useWallet() {
  return useContext(WalletContext);
}

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [wallet, setWallet] = useState<PhantomWalletAdapter | null>(null);
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [tokenBalance, setTokenBalance] = useState('0');

  // Initialize Solana connection
  const connection = new Connection('https://api.mainnet-beta.solana.com');
  
  // FLIRT token mint address
  const FLIRT_TOKEN_MINT = 'YOUR_TOKEN_MINT_ADDRESS';

  const getTokenBalance = async (walletAddress: string) => {
    try {
      const response = await fetch(`https://public-api.solscan.io/account/tokens?account=${walletAddress}`);
      const tokens = await response.json();
      
      // Find FLIRT token in the list
      const flirtToken = tokens.find((token: any) => token.tokenAddress === FLIRT_TOKEN_MINT);
      
      if (flirtToken) {
        const amount = parseFloat(flirtToken.tokenAmount.amount) / Math.pow(10, flirtToken.tokenAmount.decimals);
        setTokenBalance(amount.toLocaleString());
      } else {
        setTokenBalance('0');
      }
    } catch (error) {
      console.error('Error fetching token balance:', error);
      setTokenBalance('0');
    }
  };

  // Try to reconnect on mount if previously connected
  useEffect(() => {
    const tryReconnect = async () => {
      const phantomWallet = new PhantomWalletAdapter();
      setWallet(phantomWallet);

      try {
        // Check if Phantom is installed and previously connected
        if (localStorage.getItem('walletConnected') === 'true' && window.solana?.isPhantom) {
          await phantomWallet.connect();
        }
      } catch (error) {
        console.error('Failed to reconnect:', error);
      }
    };

    tryReconnect();

    return () => {
      if (wallet) {
        wallet.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (wallet) {
      wallet.on('connect', () => {
        setConnected(true);
        const walletPublicKey = wallet.publicKey?.toBase58() || null;
        setPublicKey(walletPublicKey);
        localStorage.setItem('walletConnected', 'true');
        
        if (walletPublicKey) {
          getTokenBalance(walletPublicKey);
        }
      });

      wallet.on('disconnect', () => {
        setConnected(false);
        setPublicKey(null);
        setTokenBalance('0');
        localStorage.removeItem('walletConnected');
      });
    }
  }, [wallet]);

  const connect = async () => {
    if (wallet) {
      try {
        setConnecting(true);
        await wallet.connect();
      } catch (error) {
        console.error('Failed to connect to wallet:', error);
      } finally {
        setConnecting(false);
      }
    }
  };

  const disconnect = async () => {
    if (wallet) {
      try {
        await wallet.disconnect();
      } catch (error) {
        console.error('Failed to disconnect wallet:', error);
      }
    }
  };

  return (
    <WalletContext.Provider
      value={{
        wallet,
        connected,
        publicKey,
        connecting,
        tokenBalance,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
} 
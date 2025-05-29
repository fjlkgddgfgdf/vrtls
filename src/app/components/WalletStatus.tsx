"use client";

import { useWallet } from '../contexts/WalletContext';

export default function WalletStatus() {
  const { connected, publicKey, tokenBalance, connect, disconnect } = useWallet();

  return connected && publicKey ? (
    <div className="bg-[#E558B1] text-white px-8 py-3 rounded-full text-lg font-medium inline-flex items-center space-x-4">
      <span className="font-mono text-base">{publicKey.slice(0, 4)}...{publicKey.slice(-4)}</span>
      {tokenBalance !== '0' && (
        <span className="text-white font-bold text-base">$FLIRT: {tokenBalance}</span>
      )}
      <button
        onClick={disconnect}
        className="ml-4 px-4 py-2 rounded-full bg-[#d44ba0] text-white text-base font-medium hover:bg-[#c13e92] transition-colors duration-300"
      >
        Disconnect
      </button>
    </div>
  ) : (
    <button
      className="bg-[#E558B1] text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-[#d44ba0] transition-colors duration-300"
      onClick={connect}
    >
      CONNECT WALLET
    </button>
  );
} 
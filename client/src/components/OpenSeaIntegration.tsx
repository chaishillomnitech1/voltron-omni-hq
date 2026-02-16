import React, { useState } from 'react';
import { Wallet, ExternalLink, Copy, Check } from 'lucide-react';

interface OpenSeaIntegrationProps {
  onConnectWallet: () => Promise<void>;
  isConnecting: boolean;
  account: string | null;
}

export const OpenSeaIntegration: React.FC<OpenSeaIntegrationProps> = ({
  onConnectWallet,
  isConnecting,
  account,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openSeaUrl = account
    ? `https://opensea.io/${account}`
    : 'https://opensea.io/create';

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="space-y-4">
      {!account ? (
        <button
          onClick={onConnectWallet}
          disabled={isConnecting}
          className="w-full bg-gradient-to-r from-[#d4af37] to-[#ff6b9d] text-black font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-[#d4af37]/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isConnecting ? (
            <>
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              Connecting Wallet...
            </>
          ) : (
            <>
              <Wallet size={20} />
              Connect Wallet to OpenSea
            </>
          )}
        </button>
      ) : (
        <div className="space-y-3">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Connected Wallet</p>
            <div className="flex items-center justify-between">
              <p className="text-[#d4af37] font-bold font-mono">{truncateAddress(account)}</p>
              <button
                onClick={handleCopyAddress}
                className="p-2 hover:bg-[#2a2a2a] rounded transition-colors"
              >
                {copied ? (
                  <Check size={18} className="text-green-400" />
                ) : (
                  <Copy size={18} className="text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <a
            href={openSeaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-gradient-to-r from-[#d4af37] to-[#ff6b9d] text-black font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-[#d4af37]/50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ExternalLink size={20} />
            View on OpenSea
          </a>

          <p className="text-xs text-gray-500 text-center">
            Your NFT collection will appear on OpenSea after minting
          </p>
        </div>
      )}
    </div>
  );
};

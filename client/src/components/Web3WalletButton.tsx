import React from 'react';
import { Button } from '@/components/ui/button';
import { useWeb3Wallet } from '@/hooks/useWeb3Wallet';
import { Wallet, AlertCircle, CheckCircle2 } from 'lucide-react';

export function Web3WalletButton() {
  const {
    address,
    balance,
    chainId,
    isConnected,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
    switchToSepolia,
    isMetaMaskInstalled,
  } = useWeb3Wallet();

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const isSepolia = chainId === 11155111;

  if (!isMetaMaskInstalled()) {
    return (
      <Button
        disabled
        className="bg-red-500/20 text-red-400 hover:bg-red-500/30"
      >
        <AlertCircle size={16} className="mr-2" />
        MetaMask Not Found
      </Button>
    );
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        {!isSepolia && (
          <Button
            onClick={switchToSepolia}
            className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 text-sm"
          >
            Switch to Sepolia
          </Button>
        )}
        {isSepolia && (
          <div className="flex items-center gap-1 px-3 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm">
            <CheckCircle2 size={14} />
            Sepolia
          </div>
        )}
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-800 rounded-lg border border-slate-700">
          <Wallet size={16} className="text-rose-400" />
          <span className="text-sm font-mono text-slate-300">{formatAddress(address)}</span>
          <span className="text-xs text-slate-500">{parseFloat(balance || '0').toFixed(4)} ETH</span>
        </div>
        <Button
          onClick={disconnectWallet}
          variant="outline"
          className="text-xs"
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={connectWallet}
      disabled={isConnecting}
      className="bg-gradient-to-r from-rose-500 to-cyan-500 hover:from-rose-600 hover:to-cyan-600 text-white"
    >
      <Wallet size={16} className="mr-2" />
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </Button>
  );
}

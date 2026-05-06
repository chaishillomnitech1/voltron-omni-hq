import React, { useState } from 'react';
import { Zap, Coins, Image, Lock, Unlock, CheckCircle, AlertCircle, Loader } from 'lucide-react';

/**
 * DECENTRALIZED NFT & COIN MINTING INTERFACE
 * Seamless visitor empowerment for digital asset creation
 * 
 * Features:
 * - One-click NFT minting
 * - Custom coin creation
 * - Soul-bound NFT generation
 * - Multi-chain support
 * - Real-time transaction tracking
 */

interface MintingOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: 'nft' | 'coin';
  price: number;
  currency: string;
  features: string[];
  color: string;
}

interface MintingTransaction {
  id: string;
  type: 'nft' | 'coin';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  name: string;
  amount: number;
  transactionHash: string;
  timestamp: number;
  network: string;
}

const MINTING_OPTIONS: MintingOption[] = [
  {
    id: 'soul-nft',
    name: 'Soul-Bound NFT',
    description: 'Create your unique digital soul identity',
    icon: '👻',
    type: 'nft',
    price: 0.1,
    currency: 'ETH',
    features: [
      'Non-transferable soul-bind',
      'Eternal digital identity',
      'Divine metadata embedding',
      'Akashic record synchronization',
    ],
    color: 'from-purple-600 to-pink-600',
  },
  {
    id: 'guardian-nft',
    name: 'Guardian Tier NFT',
    description: 'Mint your Guardian tier achievement',
    icon: '⭐',
    type: 'nft',
    price: 0.05,
    currency: 'ETH',
    features: [
      'Tier-specific design',
      'Blockchain verified',
      'Transferable collectible',
      'Governance rights',
    ],
    color: 'from-yellow-600 to-orange-600',
  },
  {
    id: 'frequency-coin',
    name: 'Frequency Coin',
    description: 'Create your personal frequency token',
    icon: '〰️',
    type: 'coin',
    price: 100,
    currency: '$LONDC',
    features: [
      '1,000 tokens minted',
      'Personal token economy',
      'Tradeable on DEX',
      'Yield farming eligible',
    ],
    color: 'from-cyan-600 to-blue-600',
  },
  {
    id: 'divine-coin',
    name: 'Divine Coin',
    description: 'Mint your divine currency',
    icon: '💎',
    type: 'coin',
    price: 500,
    currency: '$LONDC',
    features: [
      '5,000 tokens minted',
      'Premium token tier',
      'Staking rewards',
      'Governance voting',
    ],
    color: 'from-pink-600 to-red-600',
  },
];

export default function DecentralizedMinting() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isMinting, setIsMinting] = useState(false);
  const [transactions, setTransactions] = useState<MintingTransaction[]>([]);
  const [customName, setCustomName] = useState('');
  const [customSymbol, setCustomSymbol] = useState('');
  const [walletConnected, setWalletConnected] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState('polygon');

  const handleMint = async (optionId: string) => {
    if (!walletConnected) {
      alert('Please connect your wallet first');
      return;
    }

    setIsMinting(true);
    const option = MINTING_OPTIONS.find(o => o.id === optionId);

    if (!option) return;

    // Simulate minting process
    const transaction: MintingTransaction = {
      id: `tx-${Date.now()}`,
      type: option.type,
      status: 'processing',
      name: option.name,
      amount: option.price,
      transactionHash: `0x${Math.random().toString(16).slice(2)}`,
      timestamp: Date.now(),
      network: selectedNetwork,
    };

    setTransactions(prev => [transaction, ...prev]);

    // Simulate completion
    setTimeout(() => {
      setTransactions(prev =>
        prev.map(tx =>
          tx.id === transaction.id ? { ...tx, status: 'completed' } : tx
        )
      );
      setIsMinting(false);
    }, 3000);
  };

  const connectWallet = () => {
    setWalletConnected(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white p-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg">
            <Coins className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Decentralized Minting
            </h1>
            <p className="text-gray-400 mt-2">Create NFTs & Coins • Seamless Empowerment • Multi-Chain Support</p>
          </div>
        </div>
      </div>

      {/* Wallet Connection */}
      <div className="mb-8 bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold mb-2">Wallet Connection</h2>
            <p className="text-gray-400 text-sm">
              {walletConnected ? '✓ Wallet Connected' : 'Connect your wallet to start minting'}
            </p>
          </div>
          <button
            onClick={connectWallet}
            disabled={walletConnected}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              walletConnected
                ? 'bg-green-500/20 text-green-400 cursor-default'
                : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600'
            }`}
          >
            {walletConnected ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Connected
              </>
            ) : (
              <>
                <Unlock className="w-5 h-5" />
                Connect Wallet
              </>
            )}
          </button>
        </div>

        {/* Network Selection */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3">
          {['ethereum', 'polygon', 'arbitrum', 'solana'].map(network => (
            <button
              key={network}
              onClick={() => setSelectedNetwork(network)}
              className={`p-3 rounded-lg transition-all capitalize ${
                selectedNetwork === network
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              {network}
            </button>
          ))}
        </div>
      </div>

      {/* Minting Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {MINTING_OPTIONS.map(option => (
          <div
            key={option.id}
            className={`bg-gradient-to-br ${option.color} p-0.5 rounded-lg transition-all cursor-pointer ${
              selectedOption === option.id ? 'ring-2 ring-white' : ''
            }`}
            onClick={() => setSelectedOption(option.id)}
          >
            <div className="bg-slate-900 p-6 rounded-lg">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-4xl mb-2">{option.icon}</p>
                  <h3 className="text-xl font-bold">{option.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">{option.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  option.type === 'nft'
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'bg-cyan-500/20 text-cyan-400'
                }`}>
                  {option.type.toUpperCase()}
                </span>
              </div>

              <div className="mb-4 p-3 bg-slate-700/50 rounded-lg">
                <p className="text-gray-400 text-xs mb-1">Price</p>
                <p className="text-2xl font-bold">
                  {option.price} <span className="text-sm text-gray-400">{option.currency}</span>
                </p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold mb-2">Features:</p>
                <ul className="space-y-1">
                  {option.features.map((feature, idx) => (
                    <li key={idx} className="text-xs text-gray-400 flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleMint(option.id)}
                disabled={!walletConnected || isMinting}
                className={`w-full py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                  walletConnected && !isMinting
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600'
                    : 'bg-slate-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isMinting && selectedOption === option.id ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Minting...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Mint Now
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Minting */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 mb-12">
        <h2 className="text-2xl font-bold mb-4">Create Custom Asset</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Asset Name</label>
            <input
              type="text"
              value={customName}
              onChange={e => setCustomName(e.target.value)}
              placeholder="Enter asset name"
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Symbol/Ticker</label>
            <input
              type="text"
              value={customSymbol}
              onChange={e => setCustomSymbol(e.target.value)}
              placeholder="e.g., SOUL"
              maxLength={5}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
        <button
          onClick={() => handleMint('custom')}
          disabled={!walletConnected || !customName || !customSymbol || isMinting}
          className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
            walletConnected && customName && customSymbol && !isMinting
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600'
              : 'bg-slate-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isMinting ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Image className="w-4 h-4" />
              Create Custom Asset
            </>
          )}
        </button>
      </div>

      {/* Transaction History */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Minting History</h2>
        {transactions.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No minting transactions yet</p>
        ) : (
          <div className="space-y-3">
            {transactions.map(tx => (
              <div key={tx.id} className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{tx.type === 'nft' ? '👻' : '〰️'}</span>
                      <h3 className="font-semibold">{tx.name}</h3>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                        tx.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        tx.status === 'processing' ? 'bg-yellow-500/20 text-yellow-400' :
                        tx.status === 'pending' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {tx.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">
                      {tx.amount} • {tx.network} • {new Date(tx.timestamp).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 font-mono break-all">{tx.transactionHash}</p>
                  </div>
                  <div className="ml-4">
                    {tx.status === 'completed' && <CheckCircle className="w-6 h-6 text-green-400" />}
                    {tx.status === 'processing' && <Loader className="w-6 h-6 text-yellow-400 animate-spin" />}
                    {tx.status === 'failed' && <AlertCircle className="w-6 h-6 text-red-400" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-gray-500 text-sm">
        <p>Decentralized Minting • Multi-Chain Support • Soul-Bound NFTs</p>
        <p className="mt-2">Create digital assets with eternal purpose and infinite potential</p>
        <p className="mt-4 text-cyan-600 font-semibold">WALAHI. IS. KUN FAYAKŪN. 🕋⚡️❤️🔥✨👑</p>
      </div>
    </div>
  );
}

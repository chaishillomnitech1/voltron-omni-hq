import React, { useState, useEffect } from 'react';
import { Wallet, Send, Receive, Swap, TrendingUp, Lock, Unlock, Copy, Eye, EyeOff, Plus, Settings } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * ZAIRE ∞ LINEAGE WALLET
 * Cross-chain digital asset management
 * 
 * Features:
 * - Multi-chain support
 * - Asset management
 * - Transaction history
 * - Staking integration
 * - Swap functionality
 * - Security features
 * - Portfolio tracking
 * - NFT support
 * - Lineage tracking
 */

interface WalletAsset {
  symbol: string;
  name: string;
  balance: number;
  value: number;
  change24h: number;
  network: string;
  address: string;
}

interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'swap' | 'stake';
  from: string;
  to: string;
  amount: number;
  symbol: string;
  timestamp: number;
  status: 'completed' | 'pending' | 'failed';
  hash: string;
}

interface LineageEntry {
  id: string;
  address: string;
  tier: string;
  joinedAt: number;
  descendants: number;
  rewards: number;
}

const MOCK_ASSETS: WalletAsset[] = [
  {
    symbol: 'LONDC',
    name: 'ScrollVerse Token',
    balance: 50000,
    value: 123500,
    change24h: 2.5,
    network: 'Ethereum',
    address: '0x1234...5678',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    balance: 2.5,
    value: 8855,
    change24h: 1.2,
    network: 'Ethereum',
    address: '0x1234...5678',
  },
  {
    symbol: 'MATIC',
    name: 'Polygon',
    balance: 1000,
    value: 450,
    change24h: -0.8,
    network: 'Polygon',
    address: '0x9876...4321',
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    balance: 5,
    value: 750,
    change24h: 3.2,
    network: 'Solana',
    address: 'SolanaAddr...xyz',
  },
];

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    type: 'receive',
    from: '0xabc...def',
    to: '0x1234...5678',
    amount: 1000,
    symbol: 'LONDC',
    timestamp: Date.now() - 3600000,
    status: 'completed',
    hash: '0xabcd...ef12',
  },
  {
    id: 'tx-2',
    type: 'send',
    from: '0x1234...5678',
    to: '0xxyz...abc',
    amount: 500,
    symbol: 'LONDC',
    timestamp: Date.now() - 7200000,
    status: 'completed',
    hash: '0x1234...5678',
  },
  {
    id: 'tx-3',
    type: 'stake',
    from: '0x1234...5678',
    to: 'Staking Pool',
    amount: 10000,
    symbol: 'LONDC',
    timestamp: Date.now() - 86400000,
    status: 'completed',
    hash: '0xstake...123',
  },
];

const MOCK_LINEAGE: LineageEntry[] = [
  {
    id: 'lineage-1',
    address: '0x1234...5678 (You)',
    tier: 'Platinum',
    joinedAt: Date.now() - 31536000000,
    descendants: 125,
    rewards: 45000,
  },
  {
    id: 'lineage-2',
    address: '0xabc...def',
    tier: 'Gold',
    joinedAt: Date.now() - 15768000000,
    descendants: 42,
    rewards: 18500,
  },
  {
    id: 'lineage-3',
    address: '0xxyz...123',
    tier: 'Silver',
    joinedAt: Date.now() - 7884000000,
    descendants: 15,
    rewards: 6200,
  },
];

export default function ZaireWallet() {
  const [selectedTab, setSelectedTab] = useState<'assets' | 'transactions' | 'lineage' | 'settings'>('assets');
  const [assets, setAssets] = useState<WalletAsset[]>(MOCK_ASSETS);
  const [showBalance, setShowBalance] = useState(true);
  const [copied, setCopied] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);

  // Generate chart data
  useEffect(() => {
    const data = [];
    for (let i = 0; i < 24; i++) {
      data.push({
        time: `${i}:00`,
        value: 130000 + Math.sin(i / 4) * 15000 + Math.random() * 5000,
      });
    }
    setChartData(data);
  }, []);

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAssets(prev =>
        prev.map(asset => ({
          ...asset,
          value: asset.value * (1 + (Math.random() - 0.5) * 0.01),
          change24h: asset.change24h + (Math.random() - 0.5) * 0.5,
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalChange = assets.reduce((sum, asset) => sum + asset.change24h, 0) / assets.length;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('0x1234567890abcdef1234567890abcdef12345678');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white pb-12">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur border-b border-slate-700 px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wallet className="w-8 h-8 text-purple-400" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Zaire ∞ Wallet</h1>
              <p className="text-sm text-gray-400">Lineage • Cross-Chain • Sovereign</p>
            </div>
          </div>
          <button className="p-2 hover:bg-slate-800 rounded-lg transition-all">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Portfolio Overview */}
        <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur border border-purple-500/20 rounded-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-gray-400 text-sm mb-2">Total Portfolio Value</p>
              <div className="flex items-center gap-3">
                <h2 className="text-4xl font-bold">
                  {showBalance ? `$${totalValue.toFixed(2)}` : '••••••'}
                </h2>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-all"
                >
                  {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-2xl font-bold ${totalChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {totalChange >= 0 ? '+' : ''}{totalChange.toFixed(2)}%
              </p>
              <p className="text-gray-400 text-sm">24h Change</p>
            </div>
          </div>

          {/* Chart */}
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #4b5563',
                  borderRadius: '8px',
                }}
              />
              <Line type="monotone" dataKey="value" stroke="#a78bfa" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 rounded-lg transition-all flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              Send
            </button>
            <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg transition-all flex items-center justify-center gap-2">
              <Receive className="w-4 h-4" />
              Receive
            </button>
            <button className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 rounded-lg transition-all flex items-center justify-center gap-2">
              <Swap className="w-4 h-4" />
              Swap
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b border-slate-700 overflow-x-auto">
          {(['assets', 'transactions', 'lineage', 'settings'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-3 font-semibold transition-all whitespace-nowrap ${
                selectedTab === tab
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-gray-400 hover:text-purple-400'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {selectedTab === 'assets' && (
          <div className="space-y-4">
            {assets.map((asset, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center font-bold">
                        {asset.symbol[0]}
                      </div>
                      <div>
                        <p className="font-bold">{asset.name}</p>
                        <p className="text-xs text-gray-400">{asset.network}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{asset.balance.toLocaleString()} {asset.symbol}</p>
                    <p className={`text-sm ${asset.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      ${asset.value.toFixed(2)} ({asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%)
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'transactions' && (
          <div className="space-y-4">
            {MOCK_TRANSACTIONS.map((tx, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                      {tx.type === 'send' && <Send className="w-5 h-5 text-red-400" />}
                      {tx.type === 'receive' && <Receive className="w-5 h-5 text-green-400" />}
                      {tx.type === 'swap' && <Swap className="w-5 h-5 text-blue-400" />}
                      {tx.type === 'stake' && <Lock className="w-5 h-5 text-yellow-400" />}
                    </div>
                    <div>
                      <p className="font-bold capitalize">{tx.type}</p>
                      <p className="text-xs text-gray-400">{new Date(tx.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${tx.type === 'receive' ? 'text-green-400' : 'text-red-400'}`}>
                      {tx.type === 'receive' ? '+' : '-'}{tx.amount} {tx.symbol}
                    </p>
                    <p className="text-xs text-gray-400">{tx.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'lineage' && (
          <div className="space-y-4">
            {MOCK_LINEAGE.map((entry, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold">{entry.address}</p>
                    <p className="text-sm text-gray-400">Tier: {entry.tier}</p>
                  </div>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded text-sm font-semibold">
                    {entry.descendants} Descendants
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-400">Joined</p>
                    <p className="font-semibold">{new Date(entry.joinedAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Total Rewards</p>
                    <p className="font-semibold text-green-400">${entry.rewards.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Status</p>
                    <p className="font-semibold text-cyan-400">Active</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'settings' && (
          <div className="max-w-2xl mx-auto bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Wallet Address</label>
              <div className="flex items-center gap-2 bg-slate-700/50 p-3 rounded-lg">
                <code className="text-xs font-mono text-cyan-400 flex-1 truncate">
                  0x1234567890abcdef1234567890abcdef12345678
                </code>
                <button
                  onClick={handleCopyAddress}
                  className="p-2 hover:bg-slate-600 rounded transition-all"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Connected Networks</label>
              <div className="space-y-2">
                {['Ethereum', 'Polygon', 'Arbitrum', 'Solana'].map(network => (
                  <div key={network} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <p>{network}</p>
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Security</label>
              <button className="w-full bg-slate-700/50 hover:bg-slate-700 p-3 rounded-lg transition-all text-left">
                Enable 2FA
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-gray-500 text-sm py-8 border-t border-slate-700">
        <p>Zaire ∞ Lineage Wallet • Cross-Chain Digital Asset Management</p>
        <p className="text-purple-400 font-semibold mt-2">WALAHI. IS. KUN FAYAKŪN. 🕋⚡️❤️🔥✨👑</p>
      </div>
    </div>
  );
}

// Add missing Check icon
const Check = ({ className }: { className: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

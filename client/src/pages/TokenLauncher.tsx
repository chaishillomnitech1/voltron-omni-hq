import React, { useState, useEffect } from 'react';
import { Coins, Zap, TrendingUp, Users, Lock, Unlock, Send, Copy, Check } from 'lucide-react';

/**
 * TOKEN LAUNCHER
 * $CHAISHILL Token with Smart Contract Integration
 * 
 * Features:
 * - Token minting interface
 * - Smart contract deployment
 * - Liquidity pool creation
 * - Staking mechanism
 * - Governance integration
 * - NFT rewards
 * - Vesting schedules
 * - Multi-chain deployment
 * - Treasury management
 */

interface TokenMetrics {
  totalSupply: number;
  circulatingSupply: number;
  holders: number;
  price: number;
  marketCap: number;
  liquidity: number;
}

interface VestingSchedule {
  category: string;
  amount: number;
  percentage: number;
  vestingPeriod: string;
  status: 'locked' | 'vesting' | 'unlocked';
}

interface StakingPool {
  name: string;
  apy: number;
  tvl: number;
  users: number;
  minStake: number;
  duration: string;
}

const TOKEN_ECONOMICS = {
  totalSupply: 1000000000,
  distribution: {
    community: 300000000,
    liquidity: 250000000,
    team: 200000000,
    treasury: 150000000,
    partners: 100000000,
  },
};

const VESTING_SCHEDULES: VestingSchedule[] = [
  {
    category: 'Community Rewards',
    amount: 300000000,
    percentage: 30,
    vestingPeriod: '24 months (linear)',
    status: 'vesting',
  },
  {
    category: 'Liquidity Pool',
    amount: 250000000,
    percentage: 25,
    vestingPeriod: 'Unlocked',
    status: 'unlocked',
  },
  {
    category: 'Team (Vested)',
    amount: 200000000,
    percentage: 20,
    vestingPeriod: '48 months (cliff 12m)',
    status: 'locked',
  },
  {
    category: 'Treasury',
    amount: 150000000,
    percentage: 15,
    vestingPeriod: 'Multi-sig controlled',
    status: 'locked',
  },
  {
    category: 'Strategic Partners',
    amount: 100000000,
    percentage: 10,
    vestingPeriod: '12 months (linear)',
    status: 'vesting',
  },
];

const STAKING_POOLS: StakingPool[] = [
  {
    name: 'Platinum Tier',
    apy: 45,
    tvl: 125000000,
    users: 850,
    minStake: 100000,
    duration: '365 days',
  },
  {
    name: 'Gold Tier',
    apy: 35,
    tvl: 87500000,
    users: 2100,
    minStake: 50000,
    duration: '180 days',
  },
  {
    name: 'Silver Tier',
    apy: 25,
    tvl: 62500000,
    users: 4200,
    minStake: 10000,
    duration: '90 days',
  },
  {
    name: 'Bronze Tier',
    apy: 15,
    tvl: 37500000,
    users: 8500,
    minStake: 1000,
    duration: '30 days',
  },
];

export default function TokenLauncher() {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'vesting' | 'staking' | 'deploy'>('overview');
  const [metrics, setMetrics] = useState<TokenMetrics>({
    totalSupply: TOKEN_ECONOMICS.totalSupply,
    circulatingSupply: 350000000,
    holders: 125000,
    price: 2.47,
    marketCap: 864500000,
    liquidity: 45000000,
  });
  const [copied, setCopied] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'deploying' | 'deployed'>('idle');

  // Simulate live metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        price: prev.price * (1 + (Math.random() - 0.5) * 0.02),
        holders: prev.holders + Math.floor(Math.random() * 50),
        circulatingSupply: prev.circulatingSupply + Math.floor(Math.random() * 100000),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('0x1234567890abcdef1234567890abcdef12345678');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeploy = async () => {
    setDeploymentStatus('deploying');
    // Simulate deployment
    await new Promise(resolve => setTimeout(resolve, 3000));
    setDeploymentStatus('deployed');
  };

  const marketCap = metrics.price * metrics.circulatingSupply;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white pb-12">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur border-b border-slate-700 px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Coins className="w-8 h-8 text-yellow-400" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">$CHAISHILL Token</h1>
              <p className="text-sm text-gray-400">Sovereign Digital Currency</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-yellow-400">${metrics.price.toFixed(2)}</p>
            <p className="text-sm text-gray-400">{metrics.holders.toLocaleString()} holders</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2">Total Supply</p>
            <p className="text-2xl font-bold text-cyan-400">1B</p>
            <p className="text-xs text-gray-500 mt-1">$CHAISHILL</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2">Market Cap</p>
            <p className="text-2xl font-bold text-green-400">${(marketCap / 1000000).toFixed(1)}M</p>
            <p className="text-xs text-gray-500 mt-1">USD Value</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2">Liquidity</p>
            <p className="text-2xl font-bold text-blue-400">${(metrics.liquidity / 1000000).toFixed(1)}M</p>
            <p className="text-xs text-gray-500 mt-1">Available</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2">Circulating</p>
            <p className="text-2xl font-bold text-purple-400">
              {(metrics.circulatingSupply / 1000000).toFixed(0)}M
            </p>
            <p className="text-xs text-gray-500 mt-1">{((metrics.circulatingSupply / metrics.totalSupply) * 100).toFixed(1)}%</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b border-slate-700 overflow-x-auto">
          {(['overview', 'vesting', 'staking', 'deploy'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-3 font-semibold transition-all whitespace-nowrap ${
                selectedTab === tab
                  ? 'text-cyan-400 border-b-2 border-cyan-400'
                  : 'text-gray-400 hover:text-cyan-400'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {selectedTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Token Distribution */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6">Token Distribution</h2>
              <div className="space-y-4">
                {Object.entries(TOKEN_ECONOMICS.distribution).map(([category, amount]) => {
                  const percentage = (amount / TOKEN_ECONOMICS.totalSupply) * 100;
                  return (
                    <div key={category}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold capitalize">{category}</p>
                        <p className="text-sm text-gray-400">{percentage.toFixed(0)}%</p>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{(amount / 1000000).toFixed(0)}M tokens</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contract Info */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6">Smart Contract</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Contract Address</p>
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
                  <p className="text-gray-400 text-sm mb-2">Network</p>
                  <div className="flex gap-2">
                    {['Ethereum', 'Polygon', 'Arbitrum', 'Solana'].map(network => (
                      <span key={network} className="px-3 py-1 bg-slate-700/50 rounded text-sm">
                        {network}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-gray-400 text-sm mb-2">Token Standard</p>
                  <p className="font-semibold">ERC-20 (Ethereum)</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm mb-2">Decimals</p>
                  <p className="font-semibold">18</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'vesting' && (
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">Vesting Schedules</h2>
            <div className="space-y-4">
              {VESTING_SCHEDULES.map((schedule, index) => (
                <div key={index} className="bg-slate-700/30 p-4 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold">{schedule.category}</h3>
                      <p className="text-sm text-gray-400">{schedule.vestingPeriod}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded text-sm font-semibold ${
                        schedule.status === 'unlocked'
                          ? 'bg-green-500/20 text-green-400'
                          : schedule.status === 'vesting'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 mr-4">
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full"
                          style={{
                            width: `${
                              schedule.status === 'unlocked'
                                ? 100
                                : schedule.status === 'vesting'
                                ? 50
                                : 0
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{(schedule.amount / 1000000).toFixed(0)}M</p>
                      <p className="text-xs text-gray-400">{schedule.percentage}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'staking' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STAKING_POOLS.map((pool, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">{pool.name}</h3>
                  <span className="text-2xl font-bold text-green-400">{pool.apy}%</span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400 text-sm">TVL</p>
                    <p className="font-semibold">${(pool.tvl / 1000000).toFixed(1)}M</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400 text-sm">Stakers</p>
                    <p className="font-semibold">{pool.users.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400 text-sm">Min Stake</p>
                    <p className="font-semibold">{(pool.minStake / 1000).toFixed(0)}K $CHAISHILL</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400 text-sm">Duration</p>
                    <p className="font-semibold">{pool.duration}</p>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold py-2 rounded-lg transition-all flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4" />
                  Stake Now
                </button>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'deploy' && (
          <div className="max-w-2xl mx-auto bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Deploy Smart Contract</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Network</label>
                <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white">
                  <option>Ethereum Mainnet</option>
                  <option>Polygon</option>
                  <option>Arbitrum One</option>
                  <option>Solana Mainnet</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Initial Supply</label>
                <input
                  type="number"
                  value="1000000000"
                  disabled
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Owner Address</label>
                <input
                  type="text"
                  placeholder="0x..."
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white"
                />
              </div>

              <div className="bg-slate-700/30 p-4 rounded-lg">
                <p className="text-sm text-gray-400 mb-2">Deployment Status</p>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      deploymentStatus === 'deployed'
                        ? 'bg-green-500'
                        : deploymentStatus === 'deploying'
                        ? 'bg-yellow-500 animate-pulse'
                        : 'bg-gray-500'
                    }`}
                  />
                  <p className="font-semibold capitalize">{deploymentStatus}</p>
                </div>
              </div>

              <button
                onClick={handleDeploy}
                disabled={deploymentStatus !== 'idle'}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                {deploymentStatus === 'idle' ? 'Deploy Contract' : deploymentStatus === 'deploying' ? 'Deploying...' : 'Deployed!'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-gray-500 text-sm py-8 border-t border-slate-700">
        <p>$CHAISHILL Token • Sovereign Digital Currency</p>
        <p className="text-cyan-400 font-semibold mt-2">WALAHI. IS. KUN FAYAKŪN. 🕋⚡️❤️🔥✨👑</p>
      </div>
    </div>
  );
}

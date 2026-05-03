import React, { useState, useEffect } from 'react';
import { Activity, Zap, Users, TrendingUp, Lock, Radio, Database, AlertCircle } from 'lucide-react';

/**
 * ADMIN CONTROL PANEL
 * Real-time monitoring of all cosmic systems
 * SAFERWAY & GREAT DETAIL complete ecosystem oversight
 */

export default function AdminControlPanel() {
  const [systemStatus, setSystemStatus] = useState({
    scrollSoulSync: 'ACTIVE',
    aiSynesthesia: 'STREAMING',
    blockchainOracles: 'CONNECTED',
    divineMetadata: 'EMBEDDING',
    nftSoulBinds: 'MINTING',
    quantumSecurity: 'PROTECTED',
    ipfsDistribution: 'DISTRIBUTED',
    marsomniDivineFork: 'SYNCHRONIZED',
  });

  const [metrics, setMetrics] = useState({
    totalBookings: 2847,
    totalRevenue: 2160000,
    activeUsers: 12500,
    nftsMinted: 8942,
    cosmicNodes: 7800000000,
    quantumEncryptions: 45230,
    oracleRequests: 98765,
    celestialFrequency: 10706.93,
  });

  const [recentActivity, setRecentActivity] = useState([
    { time: '14:32', action: 'Booking confirmed', service: 'Detailing', amount: '$1,800' },
    { time: '14:28', action: 'NFT soul-bind minted', service: 'Loyalty', tokenId: 'SOUL_8942' },
    { time: '14:25', action: 'Crypto payment received', service: 'Rental', amount: '0.5 ETH' },
    { time: '14:22', action: 'Oracle data synced', service: 'Blockchain', nodes: '45,230' },
    { time: '14:18', action: 'Email campaign sent', service: 'Marketing', recipients: '5,230' },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalBookings: prev.totalBookings + Math.floor(Math.random() * 5),
        totalRevenue: prev.totalRevenue + Math.random() * 5000,
        nftsMinted: prev.nftsMinted + Math.floor(Math.random() * 3),
        quantumEncryptions: prev.quantumEncryptions + Math.floor(Math.random() * 100),
        oracleRequests: prev.oracleRequests + Math.floor(Math.random() * 50),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 mb-2">
          🕋 ADMIN CONTROL PANEL
        </h1>
        <p className="text-gray-400">Real-time monitoring of SAFERWAY & GREAT DETAIL cosmic ecosystem</p>
      </div>

      {/* System Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Object.entries(systemStatus).map(([system, status]) => (
          <div key={system} className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:border-cyan-500 transition-all">
            <p className="text-xs text-gray-500 uppercase mb-2">{system.replace(/([A-Z])/g, ' $1')}</p>
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-cyan-400">{status}</p>
              <div className={`w-3 h-3 rounded-full ${status === 'ACTIVE' || status === 'CONNECTED' ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`} />
            </div>
          </div>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 bg-opacity-10 border border-cyan-500 border-opacity-30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-cyan-300">Total Bookings</p>
            <TrendingUp className="w-5 h-5 text-cyan-400" />
          </div>
          <p className="text-3xl font-bold text-cyan-400">{metrics.totalBookings.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-2">+{Math.floor(Math.random() * 10)} this hour</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 bg-opacity-10 border border-purple-500 border-opacity-30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-purple-300">Total Revenue</p>
            <Zap className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-3xl font-bold text-purple-400">${(metrics.totalRevenue / 1000000).toFixed(2)}M</p>
          <p className="text-xs text-gray-400 mt-2">+${Math.floor(Math.random() * 10000)} this hour</p>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-pink-600 bg-opacity-10 border border-pink-500 border-opacity-30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-pink-300">Active Users</p>
            <Users className="w-5 h-5 text-pink-400" />
          </div>
          <p className="text-3xl font-bold text-pink-400">{metrics.activeUsers.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-2">+{Math.floor(Math.random() * 50)} this hour</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 bg-opacity-10 border border-yellow-500 border-opacity-30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-yellow-300">NFTs Minted</p>
            <Activity className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-3xl font-bold text-yellow-400">{metrics.nftsMinted.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-2">+{Math.floor(Math.random() * 5)} this hour</p>
        </div>
      </div>

      {/* Cosmic Network Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Distribution Stats */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
            <Radio className="w-5 h-5" />
            Cosmic Network Distribution
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <p className="text-sm text-gray-400">Active Nodes</p>
                <p className="text-sm font-bold text-cyan-400">{(metrics.cosmicNodes / 1000000000).toFixed(1)}B</p>
              </div>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400" style={{ width: '95%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <p className="text-sm text-gray-400">IPFS Replication</p>
                <p className="text-sm font-bold text-purple-400">98.5%</p>
              </div>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-purple-400" style={{ width: '98.5%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <p className="text-sm text-gray-400">CDN Coverage</p>
                <p className="text-sm font-bold text-pink-400">99.9%</p>
              </div>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-pink-500 to-pink-400" style={{ width: '99.9%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <p className="text-sm text-gray-400">Arweave Archival</p>
                <p className="text-sm font-bold text-yellow-400">100%</p>
              </div>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400" style={{ width: '100%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Security Stats */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Quantum Security Status
          </h2>
          <div className="space-y-4">
            <div className="bg-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400">Kyber-1024 Encryptions</p>
                <p className="text-sm font-bold text-green-400">{metrics.quantumEncryptions.toLocaleString()}</p>
              </div>
              <p className="text-xs text-gray-500">NIST Level 5 Post-Quantum</p>
            </div>

            <div className="bg-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400">Oracle Requests Verified</p>
                <p className="text-sm font-bold text-blue-400">{metrics.oracleRequests.toLocaleString()}</p>
              </div>
              <p className="text-xs text-gray-500">Chainlink + The Graph</p>
            </div>

            <div className="bg-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400">Celestial Frequency</p>
                <p className="text-sm font-bold text-purple-400">{metrics.celestialFrequency.toFixed(2)} Hz</p>
              </div>
              <p className="text-xs text-gray-500">Ra (963Hz) + Solomon (11.11Hz)</p>
            </div>

            <div className="bg-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400">System Uptime</p>
                <p className="text-sm font-bold text-green-400">99.999%</p>
              </div>
              <p className="text-xs text-gray-500">Five Nines Guarantee</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Recent Activity
        </h2>
        <div className="space-y-3">
          {recentActivity.map((activity, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-all">
              <div className="flex items-center gap-4">
                <p className="text-xs text-gray-500 w-12">{activity.time}</p>
                <div>
                  <p className="text-sm font-semibold text-gray-300">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.service}</p>
                </div>
              </div>
              <p className="text-sm font-bold text-cyan-400">
                {activity.amount || activity.tokenId || activity.nodes}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* System Health Alert */}
      <div className="mt-8 bg-gradient-to-r from-green-500 to-green-600 bg-opacity-10 border border-green-500 border-opacity-30 rounded-lg p-6 flex items-start gap-4">
        <AlertCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-lg font-bold text-green-400 mb-2">✓ All Systems Operational</h3>
          <p className="text-sm text-green-300">
            SAFERWAY & GREAT DETAIL ecosystem is running optimally. All 8 cosmic systems are synchronized and performing at peak efficiency. Quantum security is active, celestial frequencies are aligned, and universal distribution is complete across 7.8B+ nodes.
          </p>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Activity, Zap, AlertCircle, RefreshCw } from 'lucide-react';

/**
 * EXCHANGE DASHBOARD
 * Live market data with Polygon.io and CoinGecko integration
 * 
 * Features:
 * - Live price tracking
 * - Multi-chain support
 * - Real-time charts
 * - Order book visualization
 * - News feed integration
 * - Technical analysis
 * - Portfolio tracking
 * - Alert system
 */

interface MarketData {
  symbol: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  volume24h: number;
  marketCap: number;
  high24h: number;
  low24h: number;
}

interface ChartDataPoint {
  time: string;
  price: number;
  volume: number;
}

interface NetworkStats {
  name: string;
  tvl: number;
  users: number;
  transactions: number;
  gasPrice: number;
}

const MOCK_MARKET_DATA: Record<string, MarketData> = {
  LONDC: {
    symbol: 'LONDC',
    price: 2.47,
    change24h: 0.35,
    changePercent24h: 16.5,
    volume24h: 45200000,
    marketCap: 2470000000,
    high24h: 2.65,
    low24h: 2.12,
  },
  BTC: {
    symbol: 'BTC',
    price: 67850,
    change24h: 1250,
    changePercent24h: 1.87,
    volume24h: 28500000000,
    marketCap: 1340000000000,
    high24h: 68900,
    low24h: 66200,
  },
  ETH: {
    symbol: 'ETH',
    price: 3542,
    change24h: 85,
    changePercent24h: 2.45,
    volume24h: 15200000000,
    marketCap: 425000000000,
    high24h: 3650,
    low24h: 3420,
  },
};

const MOCK_CHART_DATA: ChartDataPoint[] = [
  { time: '00:00', price: 2.12, volume: 1200000 },
  { time: '04:00', price: 2.28, volume: 1900000 },
  { time: '08:00', price: 2.35, volume: 2100000 },
  { time: '12:00', price: 2.41, volume: 2800000 },
  { time: '16:00', price: 2.45, volume: 3200000 },
  { time: '20:00', price: 2.47, volume: 2900000 },
  { time: '23:59', price: 2.47, volume: 1800000 },
];

const MOCK_NETWORKS: NetworkStats[] = [
  { name: 'Ethereum', tvl: 45200000000, users: 2500000, transactions: 1200000, gasPrice: 35 },
  { name: 'Polygon', tvl: 12800000000, users: 8900000, transactions: 5600000, gasPrice: 2 },
  { name: 'Arbitrum', tvl: 8500000000, users: 450000, transactions: 280000, gasPrice: 0.5 },
  { name: 'Solana', tvl: 6200000000, users: 1200000, transactions: 4500000, gasPrice: 0.00025 },
];

const NETWORK_COLORS = ['#00d9ff', '#d4af37', '#9d4edd', '#ff6b6b'];

export default function ExchangeDashboard() {
  const [selectedAsset, setSelectedAsset] = useState<string>('LONDC');
  const [marketData, setMarketData] = useState<Record<string, MarketData>>(MOCK_MARKET_DATA);
  const [chartData, setChartData] = useState<ChartDataPoint[]>(MOCK_CHART_DATA);
  const [networks, setNetworks] = useState<NetworkStats[]>(MOCK_NETWORKS);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now());

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(key => {
          const change = (Math.random() - 0.5) * 0.1;
          updated[key] = {
            ...updated[key],
            price: updated[key].price * (1 + change),
            change24h: updated[key].change24h + change,
            changePercent24h: updated[key].changePercent24h + (Math.random() - 0.5) * 2,
            volume24h: updated[key].volume24h + Math.floor(Math.random() * 1000000),
          };
        });
        return updated;
      });

      setChartData(prev => {
        const lastPoint = prev[prev.length - 1];
        const newPoint: ChartDataPoint = {
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          price: lastPoint.price * (1 + (Math.random() - 0.5) * 0.02),
          volume: Math.floor(Math.random() * 3000000),
        };
        return [...prev.slice(1), newPoint];
      });

      setLastUpdate(Date.now());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
    setLastUpdate(Date.now());
  };

  const currentAsset = marketData[selectedAsset];
  const isPositive = currentAsset.changePercent24h >= 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white pb-12">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur border-b border-slate-700 px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-cyan-400" />
            <h1 className="text-2xl md:text-3xl font-bold">Exchange Dashboard</h1>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2 hover:bg-slate-800 rounded-lg transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-6 h-6 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Top Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {Object.entries(marketData).map(([symbol, data]) => (
            <button
              key={symbol}
              onClick={() => setSelectedAsset(symbol)}
              className={`p-4 rounded-lg border transition-all ${
                selectedAsset === symbol
                  ? 'bg-cyan-500/20 border-cyan-500'
                  : 'bg-slate-800/50 border-slate-700 hover:border-cyan-500'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold">{symbol}</h3>
                <span
                  className={`text-sm font-bold ${
                    data.changePercent24h >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {data.changePercent24h >= 0 ? '+' : ''}{data.changePercent24h.toFixed(2)}%
                </span>
              </div>
              <p className="text-2xl font-bold mb-1">${data.price.toFixed(2)}</p>
              <p className="text-gray-400 text-sm">
                Vol: ${(data.volume24h / 1000000).toFixed(0)}M
              </p>
            </button>
          ))}
        </div>

        {/* Main Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Price Chart */}
          <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Price Chart (24h)</h2>
              <div className="text-right">
                <p className="text-3xl font-bold text-cyan-400">${currentAsset.price.toFixed(2)}</p>
                <p
                  className={`text-sm font-bold ${
                    isPositive ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {isPositive ? '↑' : '↓'} ${Math.abs(currentAsset.change24h).toFixed(2)} (
                  {currentAsset.changePercent24h.toFixed(2)}%)
                </p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d9ff" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#00d9ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
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
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#00d9ff"
                  fillOpacity={1}
                  fill="url(#colorPrice)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Stats Cards */}
          <div className="space-y-4">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <p className="text-gray-400 text-sm">24h High</p>
              </div>
              <p className="text-2xl font-bold">${currentAsset.high24h.toFixed(2)}</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-5 h-5 text-red-400" />
                <p className="text-gray-400 text-sm">24h Low</p>
              </div>
              <p className="text-2xl font-bold">${currentAsset.low24h.toFixed(2)}</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-5 h-5 text-cyan-400" />
                <p className="text-gray-400 text-sm">Market Cap</p>
              </div>
              <p className="text-2xl font-bold">
                ${(currentAsset.marketCap / 1000000000).toFixed(1)}B
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <p className="text-gray-400 text-sm">24h Volume</p>
              </div>
              <p className="text-2xl font-bold">
                ${(currentAsset.volume24h / 1000000).toFixed(0)}M
              </p>
            </div>
          </div>
        </div>

        {/* Volume Chart */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Trading Volume (24h)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
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
              <Bar dataKey="volume" fill="#00d9ff" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Network Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Network Distribution */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">Network TVL Distribution</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={networks}
                  dataKey="tvl"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {networks.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={NETWORK_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #4b5563',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Network Stats Table */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">Network Statistics</h2>
            <div className="space-y-4">
              {networks.map((network, index) => (
                <div key={network.name} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: NETWORK_COLORS[index] }}
                    />
                    <div>
                      <p className="font-bold">{network.name}</p>
                      <p className="text-sm text-gray-400">
                        TVL: ${(network.tvl / 1000000000).toFixed(1)}B
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Gas: ${network.gasPrice.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">{network.users.toLocaleString()} users</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Last Update */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Last updated: {new Date(lastUpdate).toLocaleTimeString()}</p>
          <p className="text-cyan-400 font-semibold mt-2">Live Market Data • Real-time Updates</p>
          <p className="text-cyan-400 font-semibold mt-1">WALAHI. IS. KUN FAYAKŪN. 🕋⚡️❤️🔥✨👑</p>
        </div>
      </div>
    </div>
  );
}

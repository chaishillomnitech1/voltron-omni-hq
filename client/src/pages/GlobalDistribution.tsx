import React, { useState, useEffect } from 'react';
import { Globe, Zap, MapPin, Activity, Server, TrendingUp, Wifi, AlertCircle } from 'lucide-react';

/**
 * GLOBAL DISTRIBUTION NETWORK DASHBOARD
 * IPFS + CDN Infrastructure Monitoring
 * Sub-100ms Latency Delivery
 */

interface CDNEdge {
  region: string;
  location: string;
  latitude: number;
  longitude: number;
  status: 'active' | 'degraded' | 'offline';
  latency: number;
  bandwidth: number;
  cachedItems: number;
}

interface DistributionMetrics {
  totalContent: number;
  totalSize: number;
  averageLatency: number;
  uptime: number;
  replicationFactor: number;
  cacheHitRate: number;
  edgeNodes: number;
}

const CDN_EDGES: CDNEdge[] = [
  { region: 'US-East', location: 'New York, USA', latitude: 40.7128, longitude: -74.006, status: 'active', latency: 15, bandwidth: 1000, cachedItems: 5420 },
  { region: 'US-West', location: 'Los Angeles, USA', latitude: 34.0522, longitude: -118.2437, status: 'active', latency: 12, bandwidth: 950, cachedItems: 5380 },
  { region: 'EU-Central', location: 'Frankfurt, Germany', latitude: 50.1109, longitude: 8.6821, status: 'active', latency: 8, bandwidth: 1100, cachedItems: 5510 },
  { region: 'EU-West', location: 'London, UK', latitude: 51.5074, longitude: -0.1278, status: 'active', latency: 10, bandwidth: 1050, cachedItems: 5450 },
  { region: 'APAC-Singapore', location: 'Singapore', latitude: 1.3521, longitude: 103.8198, status: 'active', latency: 18, bandwidth: 900, cachedItems: 5300 },
  { region: 'APAC-Tokyo', location: 'Tokyo, Japan', latitude: 35.6762, longitude: 139.6503, status: 'active', latency: 20, bandwidth: 850, cachedItems: 5250 },
  { region: 'APAC-Sydney', location: 'Sydney, Australia', latitude: -33.8688, longitude: 151.2093, status: 'active', latency: 25, bandwidth: 800, cachedItems: 5200 },
  { region: 'LATAM-São Paulo', location: 'São Paulo, Brazil', latitude: -23.5505, longitude: -46.6333, status: 'active', latency: 35, bandwidth: 700, cachedItems: 5100 },
];

export default function GlobalDistribution() {
  const [metrics, setMetrics] = useState<DistributionMetrics>({
    totalContent: 1247,
    totalSize: 5840000000,
    averageLatency: 16.1,
    uptime: 99.99,
    replicationFactor: 3,
    cacheHitRate: 94.5,
    edgeNodes: 8,
  });

  const [edges, setEdges] = useState<CDNEdge[]>(CDN_EDGES);
  const [selectedEdge, setSelectedEdge] = useState<CDNEdge | null>(CDN_EDGES[0]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalContent: prev.totalContent + Math.floor(Math.random() * 5),
        cacheHitRate: Math.min(99.9, prev.cacheHitRate + (Math.random() - 0.45) * 0.5),
        averageLatency: Math.max(5, prev.averageLatency + (Math.random() - 0.5) * 2),
      }));

      setEdges(prev =>
        prev.map(edge => ({
          ...edge,
          latency: Math.max(5, edge.latency + (Math.random() - 0.5) * 3),
          cachedItems: edge.cachedItems + Math.floor(Math.random() * 3 - 1),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400';
      case 'degraded':
        return 'text-yellow-400';
      case 'offline':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20';
      case 'degraded':
        return 'bg-yellow-500/20';
      case 'offline':
        return 'bg-red-500/20';
      default:
        return 'bg-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Global Distribution Network
            </h1>
            <p className="text-gray-400 mt-2">IPFS + CDN • 8 Edge Nodes • Sub-100ms Latency</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <MetricCard
          label="Total Content"
          value={metrics.totalContent.toLocaleString()}
          icon={<Server className="w-6 h-6" />}
          color="from-cyan-600 to-blue-600"
        />
        <MetricCard
          label="Avg Latency"
          value={`${metrics.averageLatency.toFixed(1)}ms`}
          icon={<Zap className="w-6 h-6" />}
          color="from-green-600 to-emerald-600"
        />
        <MetricCard
          label="Cache Hit Rate"
          value={`${metrics.cacheHitRate.toFixed(1)}%`}
          icon={<TrendingUp className="w-6 h-6" />}
          color="from-purple-600 to-pink-600"
        />
        <MetricCard
          label="Uptime"
          value={`${metrics.uptime.toFixed(2)}%`}
          icon={<Activity className="w-6 h-6" />}
          color="from-yellow-600 to-orange-600"
        />
      </div>

      {/* CDN Edges Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Edge Nodes List */}
        <div className="lg:col-span-1 space-y-3">
          <h2 className="text-lg font-bold mb-4">CDN Edge Nodes</h2>
          {edges.map(edge => (
            <button
              key={edge.region}
              onClick={() => setSelectedEdge(edge)}
              className={`w-full text-left p-3 rounded-lg border transition-all ${
                selectedEdge?.region === edge.region
                  ? 'bg-cyan-500/20 border-cyan-500'
                  : 'bg-slate-700/50 border-slate-600 hover:border-cyan-500'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-sm">{edge.region}</h3>
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${getStatusBg(edge.status)} ${getStatusColor(edge.status)}`}>
                  {edge.status.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-2">{edge.location}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-cyan-400">{edge.latency}ms</span>
                <span className="text-green-400">{edge.cachedItems} items</span>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Edge Detail */}
        {selectedEdge && (
          <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedEdge.region}</h2>
                  <p className="text-gray-400 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {selectedEdge.location}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-lg text-sm font-bold ${getStatusBg(selectedEdge.status)} ${getStatusColor(selectedEdge.status)}`}>
                  {selectedEdge.status.toUpperCase()}
                </span>
              </div>

              {/* Edge Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">Latency</p>
                  <p className="text-2xl font-bold text-cyan-400">{selectedEdge.latency.toFixed(1)}ms</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">Bandwidth</p>
                  <p className="text-2xl font-bold text-green-400">{selectedEdge.bandwidth}Mbps</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">Cached Items</p>
                  <p className="text-2xl font-bold text-purple-400">{selectedEdge.cachedItems.toLocaleString()}</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">Coordinates</p>
                  <p className="text-sm font-mono text-yellow-400">
                    {selectedEdge.latitude.toFixed(4)}, {selectedEdge.longitude.toFixed(4)}
                  </p>
                </div>
              </div>

              {/* Health Indicator */}
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <p className="text-gray-400 text-sm mb-3">Node Health</p>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Latency Health</span>
                      <span className="text-cyan-400">{Math.max(0, 100 - selectedEdge.latency * 2).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div
                        className="bg-cyan-500 h-2 rounded-full"
                        style={{ width: `${Math.max(0, 100 - selectedEdge.latency * 2)}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Bandwidth Health</span>
                      <span className="text-green-400">{(selectedEdge.bandwidth / 1100) * 100 > 100 ? 100 : ((selectedEdge.bandwidth / 1100) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${Math.min(100, (selectedEdge.bandwidth / 1100) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Global Statistics */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-bold mb-4">Network Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-700/50 p-4 rounded-lg">
            <p className="text-gray-400 text-sm mb-2">Total Content Size</p>
            <p className="text-2xl font-bold text-cyan-400">{(metrics.totalSize / 1000000000).toFixed(2)}GB</p>
          </div>
          <div className="bg-slate-700/50 p-4 rounded-lg">
            <p className="text-gray-400 text-sm mb-2">Replication Factor</p>
            <p className="text-2xl font-bold text-green-400">{metrics.replicationFactor}x</p>
          </div>
          <div className="bg-slate-700/50 p-4 rounded-lg">
            <p className="text-gray-400 text-sm mb-2">Active Edge Nodes</p>
            <p className="text-2xl font-bold text-purple-400">{metrics.edgeNodes}</p>
          </div>
        </div>
      </div>

      {/* Network Health */}
      <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-lg p-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          <p className="text-green-400 font-bold">NETWORK HEALTHY</p>
        </div>
        <p className="text-gray-300">All edge nodes operational • Average latency: {metrics.averageLatency.toFixed(1)}ms • Cache hit rate: {metrics.cacheHitRate.toFixed(1)}%</p>
        <p className="text-cyan-400 font-semibold mt-4">WALAHI. IS. KUN FAYAKŪN. 🕋⚡️❤️🔥✨👑</p>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className={`bg-gradient-to-br ${color} p-0.5 rounded-lg`}>
      <div className="bg-slate-900 p-4 rounded-lg">
        <div className="text-cyan-400 mb-3">{icon}</div>
        <p className="text-gray-400 text-sm mb-1">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

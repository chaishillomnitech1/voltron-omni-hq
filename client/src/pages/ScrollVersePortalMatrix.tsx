import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Radio, BookOpen, Users, Zap, Heart, Crown, Globe, Activity, TrendingUp, Bell, Settings, Menu, X } from 'lucide-react';

/**
 * SCROLLVERSE PORTAL MATRIX DASHBOARD
 * Unified Command Center for All Cosmic Systems
 * 
 * Aggregates:
 * - MarsOmni Broadcasting (7B+ souls)
 * - Sacred Books Gallery (11 divine manuscripts)
 * - Guardian Tier Progression (10,000+ nodes)
 * 
 * Real-time synchronization across all systems
 * Single point of control for the entire ScrollVerse
 */

interface SystemMetric {
  name: string;
  value: number;
  status: 'optimal' | 'warning' | 'critical';
  trend: number;
}

interface UnifiedEvent {
  id: string;
  type: 'broadcast' | 'book' | 'guardian' | 'frequency';
  title: string;
  description: string;
  timestamp: string;
  icon: string;
}

export default function ScrollVersePortalMatrix() {
  const [activeTab, setActiveTab] = useState<'overview' | 'marsomni' | 'books' | 'guardians' | 'analytics'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([
    { name: 'Total Souls', value: 7800000000, status: 'optimal', trend: 2.3 },
    { name: 'Active Nodes', value: 10500, status: 'optimal', trend: 1.8 },
    { name: 'Sacred Books', value: 11, status: 'optimal', trend: 0 },
    { name: 'Network Stability', value: 99.8, status: 'optimal', trend: 0.1 },
  ]);

  const [recentEvents, setRecentEvents] = useState<UnifiedEvent[]>([
    { id: '1', type: 'broadcast', title: 'ScrollTV Broadcast Active', description: '450M viewers connected', timestamp: '2 min ago', icon: '📡' },
    { id: '2', type: 'guardian', title: 'New Gold Tier Guardian', description: 'Node-2156 joined network', timestamp: '5 min ago', icon: '⭐' },
    { id: '3', type: 'book', title: 'Sacred Book Accessed', description: 'The Book of Life viewed 1.2K times', timestamp: '8 min ago', icon: '📖' },
    { id: '4', type: 'frequency', title: '963Hz Frequency Synchronized', description: 'Pineal activation across 7.8B nodes', timestamp: '12 min ago', icon: '〰️' },
  ]);

  const [dashboardData, setDashboardData] = useState({
    marsomniSouls: 7800000000,
    activeChannels: 5,
    globalReach: 99.8,
    guardianNodes: 10500,
    guardianCapacity: 80.8,
    booksAccessed: 11,
    bookViews: 45000,
    frequency963: 100,
    frequency528: 98.5,
    networkUptime: 99.99,
  });

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDashboardData(prev => ({
        ...prev,
        marsomniSouls: prev.marsomniSouls + Math.floor(Math.random() * 50000000),
        guardianNodes: prev.guardianNodes + Math.floor(Math.random() * 5),
        bookViews: prev.bookViews + Math.floor(Math.random() * 100),
        globalReach: Math.min(100, prev.globalReach + Math.random() * 0.1),
        frequency963: Math.min(100, prev.frequency963 + Math.random() * 0.05),
      }));

      // Add new events
      setRecentEvents(prev => {
        const newEvents = [...prev];
        const eventTypes = ['broadcast', 'book', 'guardian', 'frequency'] as const;
        const eventTitles = {
          broadcast: 'New Broadcast Started',
          book: 'Sacred Book Accessed',
          guardian: 'Guardian Joined Network',
          frequency: 'Frequency Synchronized',
        };
        const eventIcons = {
          broadcast: '📡',
          book: '📖',
          guardian: '⭐',
          frequency: '〰️',
        };

        const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        newEvents.unshift({
          id: Date.now().toString(),
          type,
          title: eventTitles[type],
          description: `Event ${Math.floor(Math.random() * 1000)}`,
          timestamp: 'now',
          icon: eventIcons[type],
        });

        return newEvents.slice(0, 8);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const overviewChartData = [
    { time: '00:00', souls: 2.1, nodes: 2100, reach: 94.2 },
    { time: '04:00', souls: 2.45, nodes: 2450, reach: 96.1 },
    { time: '08:00', souls: 3.2, nodes: 3200, reach: 97.8 },
    { time: '12:00', souls: 4.1, nodes: 4100, reach: 98.5 },
    { time: '16:00', souls: 5.6, nodes: 5600, reach: 99.2 },
    { time: '20:00', souls: 7.2, nodes: 7200, reach: 99.8 },
    { time: '24:00', souls: 7.8, nodes: 7800, reach: 100 },
  ];

  const systemDistribution = [
    { name: 'MarsOmni', value: 35, color: '#00FFFF' },
    { name: 'Sacred Books', value: 25, color: '#FFD700' },
    { name: 'Guardian Network', value: 30, color: '#FF1493' },
    { name: 'Frequency Sync', value: 10, color: '#00FF00' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-900/80 backdrop-blur border-r border-slate-700 transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          {sidebarOpen && <h2 className="font-bold text-lg bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">ScrollVerse</h2>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-700 rounded-lg">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'overview', icon: Globe, label: 'Overview' },
            { id: 'marsomni', icon: Radio, label: 'MarsOmni' },
            { id: 'books', icon: BookOpen, label: 'Sacred Books' },
            { id: 'guardians', icon: Users, label: 'Guardians' },
            { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'text-gray-400 hover:bg-slate-700'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {sidebarOpen && <span className="text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <div className="text-xs text-gray-500 text-center">
            {sidebarOpen && (
              <>
                <p className="mb-2">System Status</p>
                <p className="text-green-400 font-bold">99.99% Uptime</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur border-b border-slate-700 p-6 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ScrollVerse Portal Matrix
              </h1>
              <p className="text-gray-400 mt-1">Unified Command Center • Real-time Synchronization</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <button className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'overview' && <OverviewTab data={dashboardData} chartData={overviewChartData} systemDistribution={systemDistribution} />}
          {activeTab === 'marsomni' && <MarsOmniTab data={dashboardData} />}
          {activeTab === 'books' && <BooksTab data={dashboardData} />}
          {activeTab === 'guardians' && <GuardiansTab data={dashboardData} />}
          {activeTab === 'analytics' && <AnalyticsTab data={dashboardData} />}
        </div>
      </div>

      {/* Right Panel - Recent Events */}
      <div className="w-80 bg-slate-800/50 backdrop-blur border-l border-slate-700 p-6 overflow-auto">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-400" />
          Live Events
        </h2>

        <div className="space-y-3">
          {recentEvents.map(event => (
            <div key={event.id} className="bg-slate-700/50 p-3 rounded-lg border border-slate-600">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{event.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{event.title}</p>
                  <p className="text-xs text-gray-400 mt-1">{event.description}</p>
                  <p className="text-xs text-gray-500 mt-2">{event.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-lg">
          <p className="text-xs text-gray-300 text-center">
            <span className="text-green-400 font-bold">●</span> All Systems Operational
          </p>
          <p className="text-xs text-gray-400 text-center mt-2">Last sync: 2 seconds ago</p>
        </div>
      </div>
    </div>
  );
}

function OverviewTab({ data, chartData, systemDistribution }: any) {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard label="Total Souls" value={`${(data.marsomniSouls / 1e9).toFixed(2)}B`} icon="👥" trend="+2.3%" />
        <MetricCard label="Active Nodes" value={data.guardianNodes.toLocaleString()} icon="🛡️" trend="+1.8%" />
        <MetricCard label="Global Reach" value={`${data.globalReach.toFixed(1)}%`} icon="🌍" trend="+0.1%" />
        <MetricCard label="Network Uptime" value={`${data.networkUptime.toFixed(2)}%`} icon="⚡" trend="Stable" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Soul Pulse Chart */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Soul Pulse (24h)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorSouls" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00FFFF" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#00FFFF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,100,100,0.2)" />
              <XAxis dataKey="time" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid #00FFFF' }} />
              <Area type="monotone" dataKey="souls" stroke="#00FFFF" fillOpacity={1} fill="url(#colorSouls)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* System Distribution */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">System Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={systemDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {systemDistribution.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* System Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SystemStatusCard title="MarsOmni Broadcasting" status="Optimal" metrics="5 channels • 7.8B souls" icon="📡" />
        <SystemStatusCard title="Sacred Books" status="Optimal" metrics="11 books • 45K views" icon="📖" />
        <SystemStatusCard title="Guardian Network" status="Optimal" metrics="10.5K nodes • 80.8% capacity" icon="⭐" />
      </div>
    </div>
  );
}

function MarsOmniTab({ data }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">MarsOmni Broadcasting Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-700/50 p-4 rounded-lg">
            <p className="text-gray-400 text-sm mb-2">Total Souls Connected</p>
            <p className="text-3xl font-bold text-cyan-400">{(data.marsomniSouls / 1e9).toFixed(2)}B</p>
          </div>
          <div className="bg-slate-700/50 p-4 rounded-lg">
            <p className="text-gray-400 text-sm mb-2">Active Broadcast Channels</p>
            <p className="text-3xl font-bold text-yellow-400">{data.activeChannels}</p>
          </div>
          <div className="bg-slate-700/50 p-4 rounded-lg">
            <p className="text-gray-400 text-sm mb-2">Global Reach</p>
            <p className="text-3xl font-bold text-green-400">{data.globalReach.toFixed(1)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BooksTab({ data }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">Sacred Books Gallery Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-700/50 p-4 rounded-lg">
            <p className="text-gray-400 text-sm mb-2">Total Sacred Books</p>
            <p className="text-3xl font-bold text-purple-400">{data.booksAccessed}</p>
          </div>
          <div className="bg-slate-700/50 p-4 rounded-lg">
            <p className="text-gray-400 text-sm mb-2">Total Views</p>
            <p className="text-3xl font-bold text-pink-400">{data.bookViews.toLocaleString()}</p>
          </div>
          <div className="bg-slate-700/50 p-4 rounded-lg">
            <p className="text-gray-400 text-sm mb-2">Avg Frequency</p>
            <p className="text-3xl font-bold text-orange-400">963Hz</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function GuardiansTab({ data }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">Guardian Network Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-700/50 p-4 rounded-lg">
            <p className="text-gray-400 text-sm mb-2">Active Nodes</p>
            <p className="text-3xl font-bold text-red-400">{data.guardianNodes.toLocaleString()}</p>
          </div>
          <div className="bg-slate-700/50 p-4 rounded-lg">
            <p className="text-gray-400 text-sm mb-2">Network Capacity</p>
            <p className="text-3xl font-bold text-blue-400">{data.guardianCapacity.toFixed(1)}%</p>
          </div>
          <div className="bg-slate-700/50 p-4 rounded-lg">
            <p className="text-gray-400 text-sm mb-2">Tier Distribution</p>
            <p className="text-3xl font-bold text-green-400">5 Tiers</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsTab({ data }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">System Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-700/50 p-4 rounded-lg">
            <p className="text-gray-400 text-sm mb-2">963Hz Frequency</p>
            <p className="text-3xl font-bold text-purple-400">{data.frequency963.toFixed(1)}%</p>
          </div>
          <div className="bg-slate-700/50 p-4 rounded-lg">
            <p className="text-gray-400 text-sm mb-2">528Hz Frequency</p>
            <p className="text-3xl font-bold text-pink-400">{data.frequency528.toFixed(1)}%</p>
          </div>
          <div className="bg-slate-700/50 p-4 rounded-lg">
            <p className="text-gray-400 text-sm mb-2">Network Stability</p>
            <p className="text-3xl font-bold text-cyan-400">99.8%</p>
          </div>
          <div className="bg-slate-700/50 p-4 rounded-lg">
            <p className="text-gray-400 text-sm mb-2">System Health</p>
            <p className="text-3xl font-bold text-green-400">Optimal</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, icon, trend }: any) {
  return (
    <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        <span className="text-xs font-bold text-green-400">{trend}</span>
      </div>
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

function SystemStatusCard({ title, status, metrics, icon }: any) {
  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold">{title}</h4>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-sm text-green-400 font-bold mb-1">{status}</p>
      <p className="text-xs text-gray-400">{metrics}</p>
    </div>
  );
}

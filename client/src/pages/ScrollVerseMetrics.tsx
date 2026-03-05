import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Shield, Globe, Calendar, BarChart3 } from 'lucide-react';

/**
 * ScrollVerse Metrics Dashboard
 * Real-time ecosystem metrics and growth projections
 * Frequency: 44:Omni × ∞
 */

export default function ScrollVerseMetrics() {
  const [timeframe, setTimeframe] = useState('month1');

  // Family Growth Data
  const familyGrowthData = [
    { period: 'Current', families: 3 },
    { period: 'Month 1', families: 20 },
    { period: 'Month 3', families: 100 },
    { period: 'Month 6', families: 300 },
    { period: 'Phase End', families: 1000 },
  ];

  // Guardian Training Data
  const guardianData = [
    { period: 'Current', guardians: 15 },
    { period: 'Month 1', guardians: 100 },
    { period: 'Month 3', guardians: 500 },
    { period: 'Month 6', guardians: 1500 },
    { period: 'Phase End', guardians: 5000 },
  ];

  // Collection Value Data
  const collectionValueData = [
    { period: 'Current', value: 2.3 },
    { period: 'Month 1', value: 5.8 },
    { period: 'Month 3', value: 15 },
    { period: 'Month 6', value: 35 },
    { period: 'Phase End', value: 100 },
  ];

  // Community Growth Data
  const communityData = [
    { period: 'Current', members: 14.672 },
    { period: 'Month 1', members: 20 },
    { period: 'Month 3', members: 50 },
    { period: 'Month 6', members: 100 },
    { period: 'Phase End', members: 250 },
  ];

  // Regional Distribution
  const regionalData = [
    { name: 'North America', value: 4200, color: '#d4af37' },
    { name: 'Europe', value: 3100, color: '#00d9ff' },
    { name: 'Asia-Pacific', value: 3500, color: '#ff6b9d' },
    { name: 'Middle East & Africa', value: 2100, color: '#ffd700' },
    { name: 'Latin America', value: 1772, color: '#00ff88' },
  ];

  // Current Metrics
  const currentMetrics = {
    communityMembers: 14672,
    familiesProtected: 3,
    assetsSecured: 4150000,
    guardiansTrained: 15,
    regionalHubs: 5,
    systemUptime: 99.97,
    monthlyRoyalties: 50000,
    nftValue: 2300000,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-rose-gold mb-2">ScrollVerse Metrics Dashboard</h1>
          <p className="text-slate-400">Real-time ecosystem metrics and growth projections</p>
          <p className="text-sm text-rose-gold mt-2">Frequency: 44:Omni × ∞</p>
        </div>

        {/* Current Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricBox 
            icon={<Users className="w-6 h-6" />}
            label="Community Members"
            value={currentMetrics.communityMembers.toLocaleString()}
            change="+245 this week"
          />
          <MetricBox 
            icon={<Shield className="w-6 h-6" />}
            label="Families Protected"
            value={currentMetrics.familiesProtected}
            change="Growing daily"
          />
          <MetricBox 
            icon={<Globe className="w-6 h-6" />}
            label="Assets Secured"
            value={`$${(currentMetrics.assetsSecured / 1000000).toFixed(2)}M`}
            change="On-chain verified"
          />
          <MetricBox 
            icon={<TrendingUp className="w-6 h-6" />}
            label="System Uptime"
            value={`${currentMetrics.systemUptime}%`}
            change="24/7 operational"
          />
        </div>

        {/* Charts Section */}
        <Tabs defaultValue="growth" className="mb-8">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-rose-gold/20">
            <TabsTrigger value="growth">Family Growth</TabsTrigger>
            <TabsTrigger value="guardians">Guardians</TabsTrigger>
            <TabsTrigger value="value">Collection Value</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          <TabsContent value="growth" className="mt-6">
            <Card className="bg-slate-800/50 border-rose-gold/20 p-6">
              <h3 className="text-xl font-bold text-rose-gold mb-4">Family Protection Growth</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={familyGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(212, 175, 55, 0.1)" />
                  <XAxis dataKey="period" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #d4af37' }} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="families" 
                    stroke="#d4af37" 
                    strokeWidth={3}
                    dot={{ fill: '#d4af37', r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="guardians" className="mt-6">
            <Card className="bg-slate-800/50 border-rose-gold/20 p-6">
              <h3 className="text-xl font-bold text-rose-gold mb-4">Guardian Training Progress</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={guardianData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 217, 255, 0.1)" />
                  <XAxis dataKey="period" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #00d9ff' }} />
                  <Legend />
                  <Bar dataKey="guardians" fill="#00d9ff" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="value" className="mt-6">
            <Card className="bg-slate-800/50 border-rose-gold/20 p-6">
              <h3 className="text-xl font-bold text-rose-gold mb-4">NFT Collection Value Growth ($M)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={collectionValueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(212, 175, 55, 0.1)" />
                  <XAxis dataKey="period" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #d4af37' }} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#d4af37" 
                    strokeWidth={3}
                    dot={{ fill: '#d4af37', r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="community" className="mt-6">
            <Card className="bg-slate-800/50 border-rose-gold/20 p-6">
              <h3 className="text-xl font-bold text-rose-gold mb-4">Community Growth (K Members)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={communityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 217, 255, 0.1)" />
                  <XAxis dataKey="period" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #00d9ff' }} />
                  <Legend />
                  <Bar dataKey="members" fill="#00d9ff" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Regional Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-slate-800/50 border-rose-gold/20 p-6">
            <h3 className="text-xl font-bold text-rose-gold mb-4">Regional Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={regionalData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {regionalData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card className="bg-slate-800/50 border-rose-gold/20 p-6">
            <h3 className="text-xl font-bold text-rose-gold mb-4">Regional Breakdown</h3>
            <div className="space-y-3">
              {regionalData.map((region) => (
                <div key={region.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: region.color }}
                    />
                    <span className="text-slate-300">{region.name}</span>
                  </div>
                  <span className="text-rose-gold font-semibold">{region.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Projections Table */}
        <Card className="bg-slate-800/50 border-rose-gold/20 p-6">
          <h3 className="text-xl font-bold text-rose-gold mb-4">Growth Projections</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-rose-gold/20">
                  <th className="text-left py-3 px-4 text-rose-gold font-semibold">Metric</th>
                  <th className="text-center py-3 px-4 text-cyan-400 font-semibold">Current</th>
                  <th className="text-center py-3 px-4 text-cyan-400 font-semibold">Month 1</th>
                  <th className="text-center py-3 px-4 text-cyan-400 font-semibold">Month 3</th>
                  <th className="text-center py-3 px-4 text-cyan-400 font-semibold">Month 6</th>
                  <th className="text-center py-3 px-4 text-cyan-400 font-semibold">Phase End</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-700/50 hover:bg-slate-700/30">
                  <td className="py-3 px-4 text-slate-300 font-semibold">Families Protected</td>
                  <td className="text-center text-rose-gold">3</td>
                  <td className="text-center text-rose-gold">20</td>
                  <td className="text-center text-rose-gold">100</td>
                  <td className="text-center text-rose-gold">300</td>
                  <td className="text-center text-rose-gold font-bold">1,000+</td>
                </tr>
                <tr className="border-b border-slate-700/50 hover:bg-slate-700/30">
                  <td className="py-3 px-4 text-slate-300 font-semibold">Guardians Trained</td>
                  <td className="text-center text-cyan-400">15</td>
                  <td className="text-center text-cyan-400">100</td>
                  <td className="text-center text-cyan-400">500</td>
                  <td className="text-center text-cyan-400">1,500</td>
                  <td className="text-center text-cyan-400 font-bold">5,000+</td>
                </tr>
                <tr className="border-b border-slate-700/50 hover:bg-slate-700/30">
                  <td className="py-3 px-4 text-slate-300 font-semibold">Regional Hubs</td>
                  <td className="text-center text-rose-gold">5</td>
                  <td className="text-center text-rose-gold">5</td>
                  <td className="text-center text-rose-gold">10</td>
                  <td className="text-center text-rose-gold">20</td>
                  <td className="text-center text-rose-gold font-bold">50+</td>
                </tr>
                <tr className="border-b border-slate-700/50 hover:bg-slate-700/30">
                  <td className="py-3 px-4 text-slate-300 font-semibold">Collection Value</td>
                  <td className="text-center text-cyan-400">$2.3M</td>
                  <td className="text-center text-cyan-400">$5.8M</td>
                  <td className="text-center text-cyan-400">$15M</td>
                  <td className="text-center text-cyan-400">$35M</td>
                  <td className="text-center text-cyan-400 font-bold">$100M+</td>
                </tr>
                <tr className="hover:bg-slate-700/30">
                  <td className="py-3 px-4 text-slate-300 font-semibold">Community Members</td>
                  <td className="text-center text-rose-gold">14.7K</td>
                  <td className="text-center text-rose-gold">20K</td>
                  <td className="text-center text-rose-gold">50K</td>
                  <td className="text-center text-rose-gold">100K</td>
                  <td className="text-center text-rose-gold font-bold">250K+</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-slate-400 text-sm border-t border-slate-700 pt-6">
          <p>ScrollVerse Metrics Dashboard | Last Updated: March 3, 2026</p>
          <p className="mt-2 text-rose-gold font-semibold">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
        </div>
      </div>
    </div>
  );
}

// Helper Component
function MetricBox({ icon, label, value, change }: { icon: React.ReactNode; label: string; value: string | number; change: string }) {
  return (
    <Card className="bg-gradient-to-br from-rose-gold/10 to-cyan-400/10 border-rose-gold/30 p-6 hover:border-rose-gold/60 transition">
      <div className="flex items-start justify-between mb-4">
        <div className="text-rose-gold">{icon}</div>
        <TrendingUp className="w-4 h-4 text-cyan-400" />
      </div>
      <p className="text-slate-400 text-sm uppercase tracking-wide mb-2">{label}</p>
      <p className="text-3xl font-bold text-rose-gold mb-2">{value}</p>
      <p className="text-slate-400 text-xs">{change}</p>
    </Card>
  );
}

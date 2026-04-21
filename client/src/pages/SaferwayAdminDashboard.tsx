import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Calendar, Zap, Heart, Globe, ArrowUp, ArrowDown } from 'lucide-react';

/**
 * SAFERWAY ADMIN DASHBOARD
 * Real-time metrics, revenue tracking, system health
 */

export default function SaferwayAdminDashboard() {
  const [totalRevenue, setTotalRevenue] = useState(2160000);
  const [detailingBookings, setDetailingBookings] = useState(342);
  const [auctionListings, setAuctionListings] = useState(1250);
  const [rentalBookings, setRentalBookings] = useState(567);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalRevenue(prev => prev + Math.random() * 50);
      setDetailingBookings(prev => prev + (Math.random() > 0.7 ? 1 : 0));
      setAuctionListings(prev => prev + (Math.random() > 0.8 ? 1 : 0));
      setRentalBookings(prev => prev + (Math.random() > 0.75 ? 1 : 0));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    {
      title: 'Annual Revenue',
      value: `$${(totalRevenue / 1000000).toFixed(2)}M`,
      change: '+21.6%',
      icon: DollarSign,
      color: '#00D9FF',
      bgColor: '#00D9FF20'
    },
    {
      title: 'Detailing Bookings',
      value: detailingBookings,
      change: '+12.5%',
      icon: Calendar,
      color: '#D4AF37',
      bgColor: '#D4AF3720'
    },
    {
      title: 'Auction Listings',
      value: auctionListings,
      change: '+8.3%',
      icon: Globe,
      color: '#E91E63',
      bgColor: '#E91E6320'
    },
    {
      title: 'Rental Bookings',
      value: rentalBookings,
      change: '+15.2%',
      icon: Users,
      color: '#00D9FF',
      bgColor: '#00D9FF20'
    }
  ];

  const revenueStreams = [
    {
      name: 'Ceramic Coating',
      revenue: 1200000,
      percentage: 55.6,
      growth: '+18.2%',
      color: '#00D9FF'
    },
    {
      name: 'Car Rentals',
      revenue: 600000,
      percentage: 27.8,
      growth: '+22.5%',
      color: '#D4AF37'
    },
    {
      name: 'Auction Pipeline',
      revenue: 360000,
      percentage: 16.6,
      growth: '+12.1%',
      color: '#E91E63'
    }
  ];

  const aiSystems = [
    {
      name: 'Bruddah Bot',
      status: 'Optimal',
      uptime: '99.98%',
      requests: '12.5K/day',
      color: '#00D9FF'
    },
    {
      name: 'Empire Manager',
      status: 'Optimal',
      uptime: '99.95%',
      requests: '8.3K/day',
      color: '#D4AF37'
    },
    {
      name: 'Guardian Spirit',
      status: 'Optimal',
      uptime: '99.99%',
      requests: '5.2K/day',
      color: '#E91E63'
    },
    {
      name: 'Growth Engine',
      status: 'Optimal',
      uptime: '99.97%',
      requests: '15.8K/day',
      color: '#00D9FF'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-rose-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-transparent sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                  <BarChart3 className="w-8 h-8 text-cyan-400" />
                  Admin Dashboard
                </h1>
                <p className="text-gray-400 mt-1">Real-time metrics & system monitoring</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Last updated</p>
                <p className="text-lg font-semibold text-white">{new Date().toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, idx) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: metric.bgColor }}
                      >
                        <Icon className="w-6 h-6" style={{ color: metric.color }} />
                      </div>
                      <div className="flex items-center gap-1 text-green-400 text-sm font-semibold">
                        <ArrowUp className="w-4 h-4" />
                        {metric.change}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">{metric.title}</p>
                    <p className="text-2xl font-bold text-white">{metric.value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold text-white mb-8">Revenue Streams</h2>
            <div className="space-y-6">
              {revenueStreams.map((stream, idx) => (
                <div key={idx} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{stream.name}</h3>
                      <p className="text-sm text-gray-400">${(stream.revenue / 1000).toFixed(0)}K</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold" style={{ color: stream.color }}>
                        {stream.percentage.toFixed(1)}%
                      </p>
                      <p className="text-sm text-green-400">{stream.growth}</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${stream.percentage}%`,
                        backgroundColor: stream.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Systems Status */}
        <div className="border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold text-white mb-8">AI Systems Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aiSystems.map((system, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">{system.name}</h3>
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Status</p>
                      <p className="text-sm font-semibold text-green-400">{system.status}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Uptime</p>
                      <p className="text-sm font-semibold text-white">{system.uptime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Daily Requests</p>
                      <p className="text-sm font-semibold" style={{ color: system.color }}>
                        {system.requests}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold text-white mb-8">System Health</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">API Performance</h3>
                  <Zap className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Response Time</span>
                    <span className="text-sm font-semibold text-white">45ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Requests/sec</span>
                    <span className="text-sm font-semibold text-cyan-400">1,250</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Error Rate</span>
                    <span className="text-sm font-semibold text-green-400">0.02%</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">Database</h3>
                  <Heart className="w-6 h-6 text-rose-400" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Uptime</span>
                    <span className="text-sm font-semibold text-white">99.99%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Query Time</span>
                    <span className="text-sm font-semibold text-rose-400">12ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Storage Used</span>
                    <span className="text-sm font-semibold text-white">245GB</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">Security</h3>
                  <Globe className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">SSL Certificate</span>
                    <span className="text-sm font-semibold text-green-400">Valid</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Firewall Status</span>
                    <span className="text-sm font-semibold text-green-400">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">DDoS Protection</span>
                    <span className="text-sm font-semibold text-green-400">Enabled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-white mb-8">Recent Activity</h2>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg overflow-hidden">
            <div className="divide-y divide-slate-700">
              {[
                { time: '5 min ago', event: 'New detailing booking from James Mitchell', type: 'booking' },
                { time: '12 min ago', event: 'Auction listing added: 2021 Tesla Model 3', type: 'auction' },
                { time: '28 min ago', event: 'Car rental: Sarah Johnson - BMW M440i', type: 'rental' },
                { time: '45 min ago', event: 'AI System Health Check: All systems optimal', type: 'system' },
                { time: '1 hour ago', event: 'Revenue milestone: $2.16M annual run rate', type: 'revenue' }
              ].map((activity, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-700 hover:bg-opacity-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: activity.type === 'booking' ? '#00D9FF' : activity.type === 'auction' ? '#D4AF37' : activity.type === 'rental' ? '#E91E63' : '#10B981'
                      }}
                    />
                    <div>
                      <p className="text-sm text-white font-medium">{activity.event}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                  <TrendingUp className="w-4 h-4 text-gray-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

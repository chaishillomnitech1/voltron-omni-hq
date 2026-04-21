import React, { useState, useEffect } from 'react';
import { Brain, Zap, Users, TrendingUp, Lock, BarChart3, Cpu, Gauge, DollarSign, Car, Gavel, Sparkles, ArrowRight, ChevronDown } from 'lucide-react';

/**
 * SAFERWAY EMPIRE - AI SYSTEMS & REVENUE STREAMS SHOWCASE
 * Design Philosophy: Luxury Blockchain Ecosystem
 * - Color Palette: Deep Black (#050505), Gold (#D4AF37), Cyan (#00D9FF), Rose (#E91E63)
 * - Typography: Bold headers + clean body
 * - Aesthetic: Sacred geometry, glowing accents, real-time data
 * - Interaction: Smooth animations, interactive cards, live metrics
 */

interface AISystem {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  capabilities: string[];
  status: 'active' | 'operational' | 'live';
  performance: number;
  color: string;
}

interface RevenueStream {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  yearlyRevenue: number;
  monthlyAverage: number;
  growth: number;
  color: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

const AI_SYSTEMS: AISystem[] = [
  {
    id: 'bruddah-bot',
    name: 'Bruddah Bot',
    title: 'Customer Service AI',
    description: '24/7 intelligent customer support with real-time assistance, booking help, and personalized recommendations.',
    icon: <Users className="w-6 h-6" />,
    capabilities: ['24/7 Support', 'Booking Assist', 'Recommendations', 'Multi-Language', 'Sentiment Analysis', 'FAQ Automation'],
    status: 'live',
    performance: 98.5,
    color: '#00D9FF'
  },
  {
    id: 'empire-manager',
    name: 'Empire Manager',
    title: 'Operations AI',
    description: 'Autonomous operations management with scheduling optimization, inventory tracking, and predictive analytics.',
    icon: <Gauge className="w-6 h-6" />,
    capabilities: ['Booking Optimization', 'Fleet Management', 'Inventory Tracking', 'Demand Forecasting', 'Staff Scheduling', 'Performance Analytics'],
    status: 'operational',
    performance: 96.2,
    color: '#D4AF37'
  },
  {
    id: 'guardian-spirit',
    name: 'Guardian Spirit',
    title: 'Community Engagement AI',
    description: 'Continuous community interaction with Discord automation, announcements, leaderboards, and event management.',
    icon: <Users className="w-6 h-6" />,
    capabilities: ['Discord Bot', 'Announcements', 'Leaderboards', 'Event Promotion', 'Moderation', 'Engagement Tracking'],
    status: 'live',
    performance: 94.8,
    color: '#E91E63'
  },
  {
    id: 'growth-engine',
    name: 'Growth Engine',
    title: 'Marketing AI',
    description: 'Intelligent marketing automation with content generation, social media management, and campaign optimization.',
    icon: <TrendingUp className="w-6 h-6" />,
    capabilities: ['Content Generation', 'Social Media', 'Email Campaigns', 'Influencer Outreach', 'A/B Testing', 'Growth Analytics'],
    status: 'active',
    performance: 92.1,
    color: '#00D9FF'
  },
  {
    id: 'smart-contract-manager',
    name: 'Smart Contract Manager',
    title: 'Blockchain AI',
    description: 'Autonomous blockchain operations with token distribution, NFT minting, staking management, and security monitoring.',
    icon: <Lock className="w-6 h-6" />,
    capabilities: ['Token Distribution', 'NFT Minting', 'Staking Management', 'Reward Distribution', 'Security Monitoring', 'Gas Optimization'],
    status: 'operational',
    performance: 99.1,
    color: '#D4AF37'
  },
  {
    id: 'insight-engine',
    name: 'Insight Engine',
    title: 'Analytics AI',
    description: 'Real-time data analysis with predictive modeling, trend analysis, and actionable business intelligence.',
    icon: <BarChart3 className="w-6 h-6" />,
    capabilities: ['Real-Time Analytics', 'Trend Analysis', 'Predictive Modeling', 'Revenue Forecasting', 'Risk Assessment', 'Opportunity Identification'],
    status: 'live',
    performance: 97.3,
    color: '#E91E63'
  }
];

const REVENUE_STREAMS: RevenueStream[] = [
  {
    id: 'ceramic-coating',
    name: 'Ceramic Coating',
    description: 'Premium auto detailing service with advanced ceramic coating technology and professional installation.',
    icon: <Car className="w-6 h-6" />,
    yearlyRevenue: 1200000,
    monthlyAverage: 100000,
    growth: 15.3,
    color: '#00D9FF',
    metrics: [
      { label: 'Bookings/Month', value: '450+' },
      { label: 'Avg Service', value: '$2,200' },
      { label: 'Satisfaction', value: '98.5%' },
      { label: 'Repeat Rate', value: '87%' }
    ]
  },
  {
    id: 'car-rentals',
    name: 'Car Rentals',
    description: 'Luxury vehicle rental fleet with flexible booking, competitive pricing, and premium customer service.',
    icon: <Car className="w-6 h-6" />,
    yearlyRevenue: 600000,
    monthlyAverage: 50000,
    growth: 22.7,
    color: '#D4AF37',
    metrics: [
      { label: 'Active Fleet', value: '85 cars' },
      { label: 'Daily Rate', value: '$180-$450' },
      { label: 'Occupancy', value: '78%' },
      { label: 'Repeat Customers', value: '62%' }
    ]
  },
  {
    id: 'auction-pipeline',
    name: 'Auction Pipeline',
    description: 'Blockchain-enabled auction system for rare vehicles, collectibles, and exclusive assets with real-time bidding.',
    icon: <Gavel className="w-6 h-6" />,
    yearlyRevenue: 360000,
    monthlyAverage: 30000,
    growth: 34.2,
    color: '#E91E63',
    metrics: [
      { label: 'Auctions/Month', value: '12-15' },
      { label: 'Avg Hammer', value: '$45,000' },
      { label: 'Commission', value: '8%' },
      { label: 'Bidder Base', value: '2,500+' }
    ]
  }
];

// AI System Card Component
function AISystemCard({ system }: { system: AISystem }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="group relative bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl"
        style={{ backgroundColor: system.color }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="p-3 rounded-lg"
            style={{ backgroundColor: `${system.color}20` }}
          >
            <div style={{ color: system.color }}>
              {system.icon}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-semibold px-2 py-1 rounded-full"
              style={{
                backgroundColor: `${system.color}30`,
                color: system.color
              }}
            >
              {system.status.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Title and description */}
        <h3 className="text-lg font-bold text-white mb-2">{system.name}</h3>
        <p className="text-sm text-gray-400 mb-4">{system.title}</p>

        {/* Performance metric */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-400">Performance</span>
            <span className="text-sm font-semibold" style={{ color: system.color }}>
              {system.performance}%
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-500"
              style={{
                width: `${system.performance}%`,
                backgroundColor: system.color
              }}
            />
          </div>
        </div>

        {/* Capabilities - Expanded */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-slate-800">
            <p className="text-xs text-gray-400 mb-3 font-semibold">CAPABILITIES</p>
            <div className="grid grid-cols-2 gap-2">
              {system.capabilities.map((cap, idx) => (
                <div
                  key={idx}
                  className="text-xs text-gray-300 flex items-center gap-2"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: system.color }}
                  />
                  {cap}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Expand indicator */}
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-400 group-hover:text-gray-300">
          {isExpanded ? 'Click to collapse' : 'Click to expand'}
          <ChevronDown
            className={`w-3 h-3 transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </div>
      </div>
    </div>
  );
}

// Revenue Stream Card Component
function RevenueStreamCard({ stream }: { stream: RevenueStream }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl"
        style={{ backgroundColor: stream.color }}
      />

      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="p-3 rounded-lg"
            style={{ backgroundColor: `${stream.color}20` }}
          >
            <div style={{ color: stream.color }}>
              {stream.icon}
            </div>
          </div>
          <div
            className="text-xs font-semibold px-2 py-1 rounded-full"
            style={{
              backgroundColor: `${stream.color}30`,
              color: stream.color
            }}
          >
            +{stream.growth.toFixed(1)}%
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-2">{stream.name}</h3>
        <p className="text-sm text-gray-400 mb-6">{stream.description}</p>

        {/* Revenue metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-xs text-gray-400 mb-1">Yearly Revenue</p>
            <p className="text-xl font-bold" style={{ color: stream.color }}>
              ${(stream.yearlyRevenue / 1000000).toFixed(2)}M
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Monthly Avg</p>
            <p className="text-xl font-bold" style={{ color: stream.color }}>
              ${(stream.monthlyAverage / 1000).toFixed(0)}K
            </p>
          </div>
        </div>

        {/* Detailed metrics - Show on hover */}
        {isHovered && (
          <div className="pt-6 border-t border-slate-800 space-y-3">
            {stream.metrics.map((metric, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="text-xs text-gray-400">{metric.label}</span>
                <span className="text-sm font-semibold text-gray-200">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Main component
export default function SaferwayShowcase() {
  const [totalRevenue, setTotalRevenue] = useState(2160000);
  const [activeAIFilter, setActiveAIFilter] = useState<string | null>(null);

  // Simulate live revenue updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalRevenue(prev => prev + Math.random() * 50);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredSystems = activeAIFilter
    ? AI_SYSTEMS.filter(sys => sys.id === activeAIFilter)
    : AI_SYSTEMS;

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
        {/* Header Section */}
        <div className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            {/* Main title */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5" style={{ color: '#00D9FF' }} />
                <span className="text-sm font-semibold text-gray-400">SAFERWAY EMPIRE</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                AI Systems & Revenue Streams
              </h1>
              <p className="text-lg text-gray-400 max-w-2xl">
                Six autonomous AI systems powering three revenue streams. Real-time operations, 24/7 customer support, and continuous growth.
              </p>
            </div>

            {/* Key metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-2">Total Annual Revenue</p>
                <p className="text-2xl sm:text-3xl font-bold text-white">
                  ${(totalRevenue / 1000000).toFixed(2)}M
                </p>
                <p className="text-xs text-cyan-400 mt-2">Live tracking</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-2">AI Systems Active</p>
                <p className="text-2xl sm:text-3xl font-bold text-white">6</p>
                <p className="text-xs text-yellow-400 mt-2">100% operational</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-2">Revenue Streams</p>
                <p className="text-2xl sm:text-3xl font-bold text-white">3</p>
                <p className="text-xs text-rose-400 mt-2">Fully integrated</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Systems Section */}
        <div className="border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Six AI Systems
              </h2>
              <p className="text-gray-400">
                Autonomous intelligence powering every aspect of SAFERWAY EMPIRE operations.
              </p>
            </div>

            {/* AI Systems Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSystems.map(system => (
                <AISystemCard key={system.id} system={system} />
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Streams Section */}
        <div className="border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Three Revenue Streams
              </h2>
              <p className="text-gray-400">
                Diversified income sources with continuous growth and optimization.
              </p>
            </div>

            {/* Revenue Streams Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {REVENUE_STREAMS.map(stream => (
                <RevenueStreamCard key={stream.id} stream={stream} />
              ))}
            </div>

            {/* Total Revenue Breakdown */}
            <div className="mt-12 bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8">
              <h3 className="text-lg font-bold text-white mb-6">Revenue Breakdown</h3>
              <div className="space-y-4">
                {REVENUE_STREAMS.map(stream => (
                  <div key={stream.id}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-300">{stream.name}</span>
                      <span className="text-sm font-semibold" style={{ color: stream.color }}>
                        ${(stream.yearlyRevenue / 1000000).toFixed(2)}M
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${(stream.yearlyRevenue / totalRevenue) * 100}%`,
                          backgroundColor: stream.color
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Integration Section */}
        <div className="border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Complete Integration
              </h2>
              <p className="text-gray-400">
                All systems work together seamlessly for maximum efficiency and growth.
              </p>
            </div>

            {/* Integration features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-cyan-500 bg-opacity-20 rounded-lg">
                    <Cpu className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Autonomous Operations</h3>
                    <p className="text-sm text-gray-400">
                      AI systems operate 24/7 without human intervention, optimizing every process continuously.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-yellow-500 bg-opacity-20 rounded-lg">
                    <DollarSign className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Revenue Optimization</h3>
                    <p className="text-sm text-gray-400">
                      Smart algorithms maximize revenue across all streams while maintaining customer satisfaction.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-rose-500 bg-opacity-20 rounded-lg">
                    <Users className="w-6 h-6 text-rose-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Customer Experience</h3>
                    <p className="text-sm text-gray-400">
                      24/7 AI support ensures customers always get instant assistance and personalized recommendations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-cyan-500 bg-opacity-20 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Continuous Growth</h3>
                    <p className="text-sm text-gray-400">
                      Real-time analytics and predictive modeling ensure sustainable growth and market expansion.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="bg-gradient-to-r from-cyan-500 to-rose-500 bg-opacity-10 border border-cyan-500 border-opacity-30 rounded-lg p-8 sm:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Join SAFERWAY EMPIRE?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience the future of auto detailing, car rentals, and blockchain auctions with AI-powered excellence.
            </p>
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300">
              Get Started <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

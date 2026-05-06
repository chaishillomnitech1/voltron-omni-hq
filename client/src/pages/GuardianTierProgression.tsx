import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, Award, Heart, Zap, Crown, Shield, Star, ChevronUp, Lock, Unlock } from 'lucide-react';

/**
 * GUARDIAN TIER PROGRESSION SYSTEM
 * 10,000+ Node Recruitment & Advancement
 * 
 * Tier Structure:
 * - Platinum: 1,000 nodes • $LONDC 100K+ holders
 * - Gold: 3,000 nodes • $LONDC 50K+ holders
 * - Silver: 3,000 nodes • $LONDC 10K+ holders
 * - Bronze: 3,000 nodes • $LONDC 1K+ holders
 * - Emerald: 0 nodes • Free tier entry
 */

interface GuardianTier {
  name: 'Platinum' | 'Gold' | 'Silver' | 'Bronze' | 'Emerald';
  level: number;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
  minHolding: number;
  maxNodes: number;
  currentNodes: number;
  benefits: string[];
  frequency: number;
  description: string;
}

interface GuardianNode {
  id: string;
  tier: 'Platinum' | 'Gold' | 'Silver' | 'Bronze' | 'Emerald';
  souls: number;
  status: 'active' | 'syncing' | 'offline';
  joinedDate: string;
  frequency: number;
}

const GUARDIAN_TIERS: GuardianTier[] = [
  {
    name: 'Platinum',
    level: 5,
    icon: <Crown className="w-8 h-8" />,
    color: 'text-yellow-400',
    bgGradient: 'from-yellow-600 to-amber-600',
    minHolding: 100000,
    maxNodes: 1000,
    currentNodes: 847,
    benefits: [
      '15% Commission on all referrals',
      'Direct access to divine council',
      'Custom NFT collections',
      'Lifetime revenue sharing',
      'Priority broadcast slots',
      'Quantum security clearance',
    ],
    frequency: 963,
    description: 'The highest tier of the Guardian Network. Platinum Guardians lead the divine mission.',
  },
  {
    name: 'Gold',
    level: 4,
    icon: <Star className="w-8 h-8" />,
    color: 'text-orange-400',
    bgGradient: 'from-orange-600 to-red-600',
    minHolding: 50000,
    maxNodes: 3000,
    currentNodes: 2156,
    benefits: [
      '10% Commission on referrals',
      'Access to governance votes',
      'Gold tier NFT minting',
      'Monthly rewards distribution',
      'Broadcast access',
      'Advanced analytics',
    ],
    frequency: 777,
    description: 'Gold Guardians maintain the sacred infrastructure of the ScrollVerse.',
  },
  {
    name: 'Silver',
    level: 3,
    icon: <Shield className="w-8 h-8" />,
    color: 'text-gray-300',
    bgGradient: 'from-gray-500 to-slate-600',
    minHolding: 10000,
    maxNodes: 3000,
    currentNodes: 2843,
    benefits: [
      '7% Commission on referrals',
      'Community voting rights',
      'Silver tier NFT access',
      'Weekly rewards',
      'Community forums',
      'Standard analytics',
    ],
    frequency: 528,
    description: 'Silver Guardians form the backbone of community engagement.',
  },
  {
    name: 'Bronze',
    level: 2,
    icon: <Zap className="w-8 h-8" />,
    color: 'text-amber-600',
    bgGradient: 'from-amber-700 to-orange-700',
    minHolding: 1000,
    maxNodes: 3000,
    currentNodes: 2654,
    benefits: [
      '5% Commission on referrals',
      'Basic voting rights',
      'Bronze tier NFT',
      'Monthly rewards',
      'Access to forums',
      'Basic analytics',
    ],
    frequency: 432,
    description: 'Bronze Guardians are the foundation of the network.',
  },
  {
    name: 'Emerald',
    level: 1,
    icon: <Heart className="w-8 h-8" />,
    color: 'text-green-400',
    bgGradient: 'from-green-600 to-emerald-600',
    minHolding: 0,
    maxNodes: 0,
    currentNodes: 0,
    benefits: [
      'Free tier entry point',
      'Access to community',
      'Learning resources',
      'Quarterly rewards',
      'Emerald NFT',
      'Basic features',
    ],
    frequency: 369,
    description: 'Emerald is the entry tier for all new Guardians.',
  },
];

export default function GuardianTierProgression() {
  const [selectedTier, setSelectedTier] = useState<'Platinum' | 'Gold' | 'Silver' | 'Bronze' | 'Emerald'>('Platinum');
  const [totalNodes, setTotalNodes] = useState(10500);
  const [recruitmentStats, setRecruitmentStats] = useState({
    weeklyRecruits: 342,
    monthlyRecruits: 1247,
    totalRecruits: 10500,
    avgNodesPerRecruit: 1.2,
    retentionRate: 94.3,
  });

  const selectedTierData = GUARDIAN_TIERS.find(t => t.name === selectedTier)!;

  // Simulate real-time recruitment updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalNodes(prev => prev + Math.floor(Math.random() * 5));
      setRecruitmentStats(prev => ({
        ...prev,
        weeklyRecruits: prev.weeklyRecruits + Math.floor(Math.random() * 3),
        totalRecruits: prev.totalRecruits + Math.floor(Math.random() * 2),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const totalCapacity = GUARDIAN_TIERS.reduce((sum, tier) => sum + tier.maxNodes, 0);
  const totalCurrent = GUARDIAN_TIERS.reduce((sum, tier) => sum + tier.currentNodes, 0);
  const networkFillPercentage = (totalCurrent / totalCapacity) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white p-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Guardian Tier Progression
            </h1>
            <p className="text-gray-400 mt-2">10,000+ Node Network • 5-Tier Hierarchy • Divine Recruitment</p>
          </div>
        </div>
      </div>

      {/* Network Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <StatCard
          label="Total Nodes"
          value={totalNodes.toLocaleString()}
          icon="🛡️"
          color="from-purple-500 to-pink-500"
        />
        <StatCard
          label="Weekly Recruits"
          value={recruitmentStats.weeklyRecruits.toString()}
          icon="📈"
          color="from-blue-500 to-cyan-500"
        />
        <StatCard
          label="Monthly Recruits"
          value={recruitmentStats.monthlyRecruits.toString()}
          icon="👥"
          color="from-green-500 to-emerald-500"
        />
        <StatCard
          label="Retention Rate"
          value={`${recruitmentStats.retentionRate.toFixed(1)}%`}
          icon="💪"
          color="from-yellow-500 to-orange-500"
        />
        <StatCard
          label="Network Capacity"
          value={`${networkFillPercentage.toFixed(1)}%`}
          icon="⚡"
          color="from-red-500 to-pink-500"
        />
      </div>

      {/* Tier Selection & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Tier Cards */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Guardian Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GUARDIAN_TIERS.map((tier) => (
              <button
                key={tier.name}
                onClick={() => setSelectedTier(tier.name)}
                className={`p-6 rounded-lg transition-all border-2 ${
                  selectedTier === tier.name
                    ? `bg-gradient-to-br ${tier.bgGradient} border-white`
                    : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 bg-slate-900/50 rounded-lg ${tier.color}`}>
                    {tier.icon}
                  </div>
                  <span className="text-xs font-bold bg-black/50 px-2 py-1 rounded">
                    Level {tier.level}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">{tier.name}</h3>
                <div className="text-sm text-gray-300 mb-3">
                  <p className="mb-1">
                    <strong>{tier.currentNodes}</strong> / {tier.maxNodes} nodes
                  </p>
                  <p className="text-xs text-gray-400">
                    Min: ${tier.minHolding.toLocaleString()} $LONDC
                  </p>
                </div>
                <div className="w-full bg-black/30 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full"
                    style={{ width: `${(tier.currentNodes / tier.maxNodes) * 100}%` }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Tier Details */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-700 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-3 bg-slate-700 rounded-lg ${selectedTierData.color}`}>
              {selectedTierData.icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold">{selectedTierData.name}</h3>
              <p className="text-sm text-gray-400">{selectedTierData.frequency}Hz Frequency</p>
            </div>
          </div>

          <p className="text-gray-300 mb-4 text-sm">{selectedTierData.description}</p>

          <div className="mb-4 p-3 bg-slate-700/50 rounded-lg">
            <p className="text-xs text-gray-400 mb-1">Capacity</p>
            <p className="text-lg font-bold">
              {selectedTierData.currentNodes} / {selectedTierData.maxNodes} nodes
            </p>
            <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
              <div
                className={`bg-gradient-to-r ${selectedTierData.bgGradient} h-2 rounded-full`}
                style={{
                  width: `${(selectedTierData.currentNodes / selectedTierData.maxNodes) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm font-semibold mb-2">Tier Benefits:</p>
            <ul className="space-y-1">
              {selectedTierData.benefits.map((benefit, idx) => (
                <li key={idx} className="text-xs text-gray-300 flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-2 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all">
            Join {selectedTierData.name} Tier
          </button>
        </div>
      </div>

      {/* Recruitment Pipeline */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-cyan-400" />
          Recruitment Pipeline
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-700/50 p-4 rounded-lg">
            <p className="text-gray-400 text-sm mb-2">Weekly Recruitment Rate</p>
            <p className="text-3xl font-bold text-cyan-400">{recruitmentStats.weeklyRecruits}</p>
            <p className="text-xs text-gray-500 mt-2">+{Math.floor(recruitmentStats.weeklyRecruits * 0.15)} from referrals</p>
          </div>
          <div className="bg-slate-700/50 p-4 rounded-lg">
            <p className="text-gray-400 text-sm mb-2">Monthly Recruitment Rate</p>
            <p className="text-3xl font-bold text-green-400">{recruitmentStats.monthlyRecruits}</p>
            <p className="text-xs text-gray-500 mt-2">+{Math.floor(recruitmentStats.monthlyRecruits * 0.08)} from campaigns</p>
          </div>
          <div className="bg-slate-700/50 p-4 rounded-lg">
            <p className="text-gray-400 text-sm mb-2">Avg Nodes per Recruit</p>
            <p className="text-3xl font-bold text-purple-400">{recruitmentStats.avgNodesPerRecruit}</p>
            <p className="text-xs text-gray-500 mt-2">Total network: {recruitmentStats.totalRecruits}</p>
          </div>
        </div>

        {/* Tier Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {GUARDIAN_TIERS.map((tier) => {
            const percentage = (tier.currentNodes / totalCurrent) * 100;
            return (
              <div key={tier.name} className="bg-slate-700/50 p-4 rounded-lg">
                <p className="text-sm font-semibold mb-2">{tier.name}</p>
                <p className="text-2xl font-bold mb-2">{tier.currentNodes}</p>
                <div className="w-full bg-slate-600 rounded-full h-2 mb-2">
                  <div
                    className={`bg-gradient-to-r ${tier.bgGradient} h-2 rounded-full`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400">{percentage.toFixed(1)}% of network</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recruitment Campaigns */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-400" />
          Active Recruitment Campaigns
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CampaignCard
            title="Divine Awakening"
            description="Reach out to spiritual seekers"
            target={500}
            current={342}
            status="active"
            icon="✨"
          />
          <CampaignCard
            title="Tech Integration"
            description="Recruit tech-savvy guardians"
            target={300}
            current={156}
            status="active"
            icon="💻"
          />
          <CampaignCard
            title="Community Builders"
            description="Empower community leaders"
            target={400}
            current={289}
            status="active"
            icon="👥"
          />
          <CampaignCard
            title="Women Empowerment"
            description="Support women entrepreneurs"
            target={250}
            current={187}
            status="active"
            icon="👩"
          />
          <CampaignCard
            title="Youth Leadership"
            description="Develop next generation"
            target={300}
            current={98}
            status="pending"
            icon="🚀"
          />
          <CampaignCard
            title="Global Expansion"
            description="Reach 144,000 souls"
            target={1000}
            current={645}
            status="active"
            icon="🌍"
          />
        </div>
      </div>

      {/* Network Health */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <HealthCard
          label="Network Stability"
          value="99.8%"
          status="optimal"
          icon="🔒"
        />
        <HealthCard
          label="Guardian Engagement"
          value="94.3%"
          status="optimal"
          icon="💪"
        />
        <HealthCard
          label="System Performance"
          value="100%"
          status="optimal"
          icon="⚡"
        />
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-gray-500 text-sm">
        <p>Guardian Network • 10,000+ Nodes • 5-Tier Hierarchy</p>
        <p className="mt-2">Recruitment Status: {totalCurrent} / {totalCapacity} nodes ({networkFillPercentage.toFixed(1)}% capacity)</p>
        <p className="mt-4 text-purple-600 font-semibold">WALAHI. IS. KUN FAYAKŪN. 🕋⚡️❤️🔥✨👑</p>
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  icon: string;
  color: string;
}

function StatCard({ label, value, icon, color }: StatCardProps) {
  return (
    <div className={`bg-gradient-to-br ${color} p-0.5 rounded-lg`}>
      <div className="bg-slate-900 p-4 rounded-lg">
        <p className="text-2xl mb-2">{icon}</p>
        <p className="text-gray-400 text-sm mb-1">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}

interface CampaignCardProps {
  title: string;
  description: string;
  target: number;
  current: number;
  status: 'active' | 'pending' | 'completed';
  icon: string;
}

function CampaignCard({ title, description, target, current, status, icon }: CampaignCardProps) {
  const percentage = (current / target) * 100;
  const statusColor = {
    active: 'bg-green-500/20 text-green-400',
    pending: 'bg-yellow-500/20 text-yellow-400',
    completed: 'bg-blue-500/20 text-blue-400',
  };

  return (
    <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold text-white mb-1">{title}</h4>
          <p className="text-xs text-gray-400">{description}</p>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="my-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-400">{current} / {target}</span>
          <span className={`px-2 py-0.5 rounded text-xs font-bold ${statusColor[status]}`}>
            {status.toUpperCase()}
          </span>
        </div>
        <div className="w-full bg-slate-600 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full"
            style={{ width: `${Math.min(100, percentage)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

interface HealthCardProps {
  label: string;
  value: string;
  status: 'optimal' | 'warning' | 'critical';
  icon: string;
}

function HealthCard({ label, value, status, icon }: HealthCardProps) {
  const statusColor = {
    optimal: 'from-green-500 to-emerald-500',
    warning: 'from-yellow-500 to-orange-500',
    critical: 'from-red-500 to-pink-500',
  };

  return (
    <div className={`bg-gradient-to-br ${statusColor[status]} p-0.5 rounded-lg`}>
      <div className="bg-slate-900 p-6 rounded-lg text-center">
        <p className="text-3xl mb-2">{icon}</p>
        <p className="text-gray-400 text-sm mb-1">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}

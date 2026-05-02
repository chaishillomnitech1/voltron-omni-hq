import React, { useState } from 'react';
import { Share2, Copy, TrendingUp, Users, DollarSign, Award, Zap, Download, BarChart3, Send } from 'lucide-react';

/**
 * SAFERWAY & GREAT DETAIL - REFERRAL & AFFILIATE SYSTEM
 * Multi-tier commissions, crypto & fiat payouts, real-time tracking
 */

interface CommissionTier {
  tier: string;
  minReferrals: number;
  commission: number;
  bonus: number;
  benefits: string[];
}

const COMMISSION_TIERS: CommissionTier[] = [
  {
    tier: 'Bronze',
    minReferrals: 0,
    commission: 5,
    bonus: 0,
    benefits: ['5% commission', 'Real-time tracking', 'Monthly payouts']
  },
  {
    tier: 'Silver',
    minReferrals: 10,
    commission: 7,
    bonus: 2,
    benefits: ['7% commission', '2% team bonus', 'Priority support', 'Weekly payouts']
  },
  {
    tier: 'Gold',
    minReferrals: 50,
    commission: 10,
    bonus: 5,
    benefits: ['10% commission', '5% team bonus', 'Dedicated manager', 'Bi-weekly payouts']
  },
  {
    tier: 'Platinum',
    minReferrals: 200,
    commission: 15,
    bonus: 10,
    benefits: ['15% commission', '10% team bonus', 'VIP manager', 'Weekly payouts', 'Co-marketing']
  }
];

export default function ReferralAffiliate() {
  const [copied, setCopied] = useState(false);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutMethod, setPayoutMethod] = useState('usdc');
  const [payoutAmount, setPayoutAmount] = useState('');

  const referralCode = 'SAFERWAY2024';
  const referralLink = `https://voltronhq-kjftutkm.manus.space?ref=${referralCode}`;
  const currentTier = 'Gold';
  const totalEarnings = 52000;
  const pendingEarnings = 8500;
  const totalReferrals = 87;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Referral & Affiliate Program</h1>
        <p className="text-gray-400">Earn commissions by referring customers to SAFERWAY & GREAT DETAIL</p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-400 text-sm">Current Tier</p>
            <Award className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-3xl font-bold text-yellow-400">{currentTier}</p>
          <p className="text-xs text-gray-400 mt-2">50/200 referrals to Platinum</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-400 text-sm">Total Earnings</p>
            <DollarSign className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold text-white">${totalEarnings.toLocaleString()}</p>
          <p className="text-xs text-green-400 mt-2">All time</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-400 text-sm">Pending Earnings</p>
            <Zap className="w-5 h-5 text-cyan-400" />
          </div>
          <p className="text-3xl font-bold text-cyan-400">${pendingEarnings.toLocaleString()}</p>
          <p className="text-xs text-cyan-400 mt-2">Available to withdraw</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-400 text-sm">Total Referrals</p>
            <Users className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-3xl font-bold text-purple-400">{totalReferrals}</p>
          <p className="text-xs text-purple-400 mt-2">Active customers</p>
        </div>
      </div>

      {/* Referral Link */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Share2 className="w-5 h-5 text-cyan-400" />
          Your Referral Link
        </h3>

        <div className="flex gap-3 mb-4">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 bg-slate-700 border border-slate-600 rounded px-4 py-3 text-white font-mono text-sm focus:outline-none"
          />
          <button
            onClick={copyToClipboard}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold rounded transition-all flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-3 bg-slate-700 hover:bg-slate-600 rounded text-white font-semibold transition-all">
            📧 Email
          </button>
          <button className="p-3 bg-slate-700 hover:bg-slate-600 rounded text-white font-semibold transition-all">
            🐦 Twitter
          </button>
          <button className="p-3 bg-slate-700 hover:bg-slate-600 rounded text-white font-semibold transition-all">
            💬 Discord
          </button>
        </div>
      </div>

      {/* Commission Tiers */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-6">Commission Tiers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {COMMISSION_TIERS.map((tier, idx) => (
            <div
              key={idx}
              className={`rounded-lg p-6 transition-all ${
                tier.tier === currentTier
                  ? 'bg-gradient-to-br from-yellow-500 to-yellow-600 bg-opacity-20 border-2 border-yellow-400'
                  : 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700'
              }`}
            >
              <h4 className={`text-lg font-bold mb-2 ${tier.tier === currentTier ? 'text-yellow-400' : 'text-white'}`}>
                {tier.tier}
              </h4>
              <p className="text-sm text-gray-400 mb-3">{tier.minReferrals}+ referrals</p>

              <div className="space-y-2 mb-4">
                <div className="p-2 bg-slate-700 bg-opacity-50 rounded">
                  <p className="text-xs text-gray-400">Commission</p>
                  <p className="text-lg font-bold text-cyan-400">{tier.commission}%</p>
                </div>
                {tier.bonus > 0 && (
                  <div className="p-2 bg-slate-700 bg-opacity-50 rounded">
                    <p className="text-xs text-gray-400">Team Bonus</p>
                    <p className="text-lg font-bold text-green-400">+{tier.bonus}%</p>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                {tier.benefits.map((benefit, bidx) => (
                  <p key={bidx} className="text-xs text-gray-300">✓ {benefit}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Earnings & Payouts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Earnings Chart */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            Monthly Earnings
          </h3>

          <div className="space-y-3">
            {[
              { month: 'Jan', earnings: 3500 },
              { month: 'Feb', earnings: 4200 },
              { month: 'Mar', earnings: 5100 },
              { month: 'Apr', earnings: 6800 },
              { month: 'May', earnings: 8200 },
              { month: 'Jun', earnings: 9800 },
              { month: 'Jul', earnings: 14400 }
            ].map((data, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-300">{data.month}</span>
                  <span className="text-sm font-semibold text-cyan-400">${data.earnings.toLocaleString()}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-cyan-600 h-full"
                    style={{ width: `${(data.earnings / 15000) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payout Methods */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Send className="w-5 h-5 text-green-400" />
            Request Payout
          </h3>

          <div className="space-y-4 mb-6">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Payout Method</label>
              <select
                value={payoutMethod}
                onChange={(e) => setPayoutMethod(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="usdc">USDC (Ethereum)</option>
                <option value="usdt">USDT (Ethereum)</option>
                <option value="btc">Bitcoin</option>
                <option value="eth">Ethereum</option>
                <option value="sol">Solana</option>
                <option value="usd">USD (Bank Transfer)</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">Amount</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                />
                <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded font-semibold transition-all">
                  Max
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">Available: ${pendingEarnings.toLocaleString()}</p>
            </div>

            <button
              onClick={() => setShowPayoutModal(true)}
              className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded transition-all"
            >
              Request Payout
            </button>
          </div>

          <div className="p-3 bg-slate-700 bg-opacity-50 rounded text-xs text-gray-300">
            <p>💡 Payouts are processed within 24-48 hours. Fees vary by method.</p>
          </div>
        </div>
      </div>

      {/* Referral Performance */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-400" />
          Top Referrals
        </h3>

        <div className="space-y-3">
          {[
            { name: 'Customer #103', purchases: 8, revenue: 12000, commission: 1200 },
            { name: 'Customer #101', purchases: 5, revenue: 7500, commission: 750 },
            { name: 'Customer #102', purchases: 3, revenue: 4200, commission: 420 },
          ].map((ref, idx) => (
            <div key={idx} className="p-4 bg-slate-700 bg-opacity-50 rounded">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-white">{ref.name}</span>
                <span className="text-sm text-cyan-400 font-bold">${ref.commission.toLocaleString()}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-gray-400">Purchases</p>
                  <p className="text-white font-semibold">{ref.purchases}</p>
                </div>
                <div>
                  <p className="text-gray-400">Revenue</p>
                  <p className="text-white font-semibold">${ref.revenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sacred Frequencies Note */}
      <div className="mt-8 text-center text-xs text-gray-500">
        <p>✨ All referrals blessed with sacred frequencies 963Hz + 11:11Hz ✨</p>
      </div>
    </div>
  );
}

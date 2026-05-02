import React, { useState } from 'react';
import { Gift, Zap, TrendingUp, Award, Lock, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * SAFERWAY & GREAT DETAIL - LOYALTY REWARDS COMPONENT
 * Points tracking, tier progression, reward redemption
 */

interface Tier {
  name: string;
  minPoints: number;
  maxPoints: number;
  multiplier: number;
  benefits: string[];
  color: string;
}

const TIERS: Tier[] = [
  {
    name: 'Bronze',
    minPoints: 0,
    maxPoints: 999,
    multiplier: 1,
    benefits: ['1 point per $1', 'Birthday bonus (50 pts)', 'Early promotions'],
    color: 'from-orange-600 to-orange-700'
  },
  {
    name: 'Silver',
    minPoints: 1000,
    maxPoints: 4999,
    multiplier: 1.25,
    benefits: ['1.25 points per $1', 'Birthday bonus (100 pts)', 'Priority booking', 'Free upgrades'],
    color: 'from-gray-400 to-gray-500'
  },
  {
    name: 'Gold',
    minPoints: 5000,
    maxPoints: 14999,
    multiplier: 1.5,
    benefits: ['1.5 points per $1', 'Birthday bonus (250 pts)', 'VIP priority', 'Free upgrades (2x)', 'Exclusive events'],
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    name: 'Platinum',
    minPoints: 15000,
    maxPoints: Infinity,
    multiplier: 2,
    benefits: ['2 points per $1', 'Birthday bonus (500 pts)', 'Concierge', 'Unlimited upgrades', 'VIP experiences', 'Account manager'],
    color: 'from-blue-400 to-blue-500'
  }
];

const AVAILABLE_REWARDS = [
  { id: 1, name: '$10 Off Detailing', cost: 1000, discount: 10, service: 'detailing', redeems: 1250 },
  { id: 2, name: '$25 Off Rental', cost: 2500, discount: 25, service: 'rental', redeems: 680 },
  { id: 3, name: 'Free Ceramic Upgrade', cost: 3000, discount: 30, service: 'detailing', redeems: 420 },
  { id: 4, name: '$50 Off Auction', cost: 5000, discount: 50, service: 'auction', redeems: 180 },
];

export function LoyaltyRewards() {
  const [userPoints, setUserPoints] = useState(8500);
  const [selectedReward, setSelectedReward] = useState<number | null>(null);
  const [redeemHistory, setRedeemHistory] = useState([
    { date: '2026-05-01', reward: '$10 Off Detailing', points: -1000 },
    { date: '2026-04-28', reward: 'Ceramic Booking', points: 1200 },
  ]);

  const currentTier = TIERS.find(t => userPoints >= t.minPoints && userPoints <= t.maxPoints) || TIERS[0];
  const nextTier = TIERS[TIERS.indexOf(currentTier) + 1];
  const pointsToNextTier = nextTier ? nextTier.minPoints - userPoints : 0;
  const progressPercent = nextTier ? ((userPoints - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100 : 100;

  const handleRedeem = (reward: any) => {
    if (userPoints >= reward.cost) {
      setUserPoints(userPoints - reward.cost);
      setRedeemHistory([
        { date: new Date().toISOString().split('T')[0], reward: reward.name, points: -reward.cost },
        ...redeemHistory
      ]);
      setSelectedReward(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Points Summary */}
      <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 bg-opacity-10 border border-cyan-500 border-opacity-30 rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-gray-400 mb-1">Your Points</p>
            <p className="text-4xl font-bold text-cyan-400">{userPoints.toLocaleString()}</p>
          </div>
          <Zap className="w-12 h-12 text-cyan-400 opacity-50" />
        </div>

        {nextTier && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-400">Progress to {nextTier.name}</p>
              <p className="text-sm font-semibold text-cyan-300">{pointsToNextTier.toLocaleString()} points needed</p>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-400 to-cyan-500 h-full transition-all duration-500"
                style={{ width: `${Math.min(progressPercent, 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Current Tier */}
      <div className={`bg-gradient-to-r ${currentTier.color} bg-opacity-10 border border-opacity-30 rounded-lg p-6`}>
        <div className="flex items-center gap-4 mb-4">
          <Award className="w-8 h-8 text-yellow-400" />
          <div>
            <p className="text-sm text-gray-400">Current Tier</p>
            <p className="text-2xl font-bold text-white">{currentTier.name}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xs text-gray-400">Points Multiplier</p>
            <p className="text-2xl font-bold text-yellow-400">{currentTier.multiplier}x</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {currentTier.benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
              {benefit}
            </div>
          ))}
        </div>
      </div>

      {/* Tier Roadmap */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4">Loyalty Tiers</h3>

        <div className="space-y-3">
          {TIERS.map((tier, idx) => {
            const isCurrentTier = tier.name === currentTier.name;
            const isFutureTier = TIERS.indexOf(tier) > TIERS.indexOf(currentTier);

            return (
              <div
                key={idx}
                className={`p-4 rounded-lg border transition-all ${
                  isCurrentTier
                    ? `bg-gradient-to-r ${tier.color} bg-opacity-20 border-yellow-500 border-opacity-50`
                    : isFutureTier
                    ? 'bg-slate-700 border-slate-600 opacity-60'
                    : 'bg-slate-700 border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white">{tier.name}</p>
                    <p className="text-xs text-gray-400">
                      {tier.minPoints.toLocaleString()} - {tier.maxPoints === Infinity ? '∞' : tier.maxPoints.toLocaleString()} points
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-yellow-400">{tier.multiplier}x Points</p>
                    {isCurrentTier && <p className="text-xs text-green-400">Current</p>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Available Rewards */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Gift className="w-5 h-5 text-purple-400" />
          Available Rewards
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AVAILABLE_REWARDS.map(reward => {
            const canRedeem = userPoints >= reward.cost;

            return (
              <div
                key={reward.id}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  canRedeem
                    ? 'bg-slate-700 border-slate-600 hover:border-purple-500'
                    : 'bg-slate-800 border-slate-700 opacity-50'
                }`}
                onClick={() => canRedeem && setSelectedReward(reward.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-white">{reward.name}</h4>
                  {canRedeem ? (
                    <Unlock className="w-5 h-5 text-green-400" />
                  ) : (
                    <Lock className="w-5 h-5 text-gray-500" />
                  )}
                </div>

                <p className="text-sm text-gray-400 mb-3">{reward.service.charAt(0).toUpperCase() + reward.service.slice(1)}</p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Cost</p>
                    <p className="text-lg font-bold text-cyan-400">{reward.cost.toLocaleString()} pts</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Redeemed</p>
                    <p className="text-lg font-bold text-yellow-400">{reward.redeems.toLocaleString()}x</p>
                  </div>
                </div>

                {selectedReward === reward.id && (
                  <Button
                    onClick={() => handleRedeem(reward)}
                    disabled={!canRedeem}
                    className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Redeem Now
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Points History */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>

        <div className="space-y-2">
          {redeemHistory.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-slate-700 bg-opacity-50 rounded">
              <div>
                <p className="text-sm font-semibold text-white">{item.reward}</p>
                <p className="text-xs text-gray-400">{item.date}</p>
              </div>
              <p className={`font-bold ${item.points > 0 ? 'text-green-400' : 'text-purple-400'}`}>
                {item.points > 0 ? '+' : ''}{item.points.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Referral Bonus */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 bg-opacity-10 border border-green-500 border-opacity-30 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-2">Refer & Earn</h3>
        <p className="text-sm text-gray-300 mb-4">Get 500 bonus points when your friend completes their first booking!</p>
        <Button className="bg-green-600 hover:bg-green-700 text-white font-bold">
          Share Referral Link
        </Button>
      </div>
    </div>
  );
}

export default LoyaltyRewards;

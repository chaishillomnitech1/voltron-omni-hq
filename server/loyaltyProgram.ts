import { z } from 'zod';
import { protectedProcedure, router } from './_core/trpc';
import { TRPCError } from '@trpc/server';

/**
 * SAFERWAY & GREAT DETAIL - CUSTOMER LOYALTY PROGRAM
 * Points-based rewards, tier system, cross-service accumulation
 */

interface LoyaltyAccount {
  id: string;
  userId: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  totalPoints: number;
  availablePoints: number;
  pointsExpiring: number;
  expirationDate: Date;
  joinedAt: Date;
  nextTierPoints: number;
}

interface LoyaltyTier {
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  minPoints: number;
  maxPoints: number;
  pointsMultiplier: number;
  benefits: string[];
  rewardValue: number;
}

interface PointsTransaction {
  id: string;
  userId: number;
  type: 'earn' | 'redeem' | 'expire';
  points: number;
  reason: string;
  serviceType: 'detailing' | 'auction' | 'rental';
  bookingId?: string;
  timestamp: Date;
}

interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  discountPercentage: number;
  applicableTo: ('detailing' | 'auction' | 'rental')[];
  expirationDays: number;
  redeemCount: number;
  available: boolean;
}

// Loyalty tiers
const LOYALTY_TIERS: Record<string, LoyaltyTier> = {
  bronze: {
    tier: 'bronze',
    minPoints: 0,
    maxPoints: 999,
    pointsMultiplier: 1,
    benefits: [
      '1 point per $1 spent',
      'Birthday bonus (50 points)',
      'Early access to promotions'
    ],
    rewardValue: 0.01
  },
  silver: {
    tier: 'silver',
    minPoints: 1000,
    maxPoints: 4999,
    pointsMultiplier: 1.25,
    benefits: [
      '1.25 points per $1 spent',
      'Birthday bonus (100 points)',
      'Priority booking',
      'Free service upgrades'
    ],
    rewardValue: 0.012
  },
  gold: {
    tier: 'gold',
    minPoints: 5000,
    maxPoints: 14999,
    pointsMultiplier: 1.5,
    benefits: [
      '1.5 points per $1 spent',
      'Birthday bonus (250 points)',
      'VIP priority booking',
      'Free service upgrades (2x)',
      'Exclusive events access'
    ],
    rewardValue: 0.015
  },
  platinum: {
    tier: 'platinum',
    minPoints: 15000,
    maxPoints: Infinity,
    pointsMultiplier: 2,
    benefits: [
      '2 points per $1 spent',
      'Birthday bonus (500 points)',
      'Concierge service',
      'Free service upgrades (unlimited)',
      'VIP events & experiences',
      'Personal account manager'
    ],
    rewardValue: 0.02
  }
};

// Available rewards
const AVAILABLE_REWARDS: Reward[] = [
  {
    id: 'reward_1',
    name: '$10 Off Detailing',
    description: 'Get $10 off any detailing service',
    pointsCost: 1000,
    discountPercentage: 10,
    applicableTo: ['detailing'],
    expirationDays: 90,
    redeemCount: 1250,
    available: true
  },
  {
    id: 'reward_2',
    name: '$25 Off Rental',
    description: 'Get $25 off any car rental',
    pointsCost: 2500,
    discountPercentage: 15,
    applicableTo: ['rental'],
    expirationDays: 90,
    redeemCount: 680,
    available: true
  },
  {
    id: 'reward_3',
    name: 'Free Ceramic Upgrade',
    description: 'Free ceramic coating upgrade on detailing',
    pointsCost: 3000,
    discountPercentage: 30,
    applicableTo: ['detailing'],
    expirationDays: 60,
    redeemCount: 420,
    available: true
  },
  {
    id: 'reward_4',
    name: '$50 Off Auction Listing',
    description: 'Get $50 off your next auction listing',
    pointsCost: 5000,
    discountPercentage: 20,
    applicableTo: ['auction'],
    expirationDays: 90,
    redeemCount: 180,
    available: true
  }
];

export const loyaltyProgramRouter = router({
  /**
   * GET LOYALTY ACCOUNT
   * Retrieve user's loyalty account details
   */
  getLoyaltyAccount: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        const account: LoyaltyAccount = {
          id: `loyalty_${ctx.user.id}`,
          userId: ctx.user.id,
          tier: 'gold',
          totalPoints: 8500,
          availablePoints: 7200,
          pointsExpiring: 300,
          expirationDate: new Date(Date.now() + 30 * 86400000),
          joinedAt: new Date(Date.now() - 365 * 86400000),
          nextTierPoints: 6500
        };

        const tier = LOYALTY_TIERS[account.tier];
        const pointsToNextTier = 15000 - account.totalPoints;

        return {
          account,
          tier,
          pointsToNextTier,
          percentToNextTier: Math.round((account.totalPoints / 15000) * 100)
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch loyalty account'
        });
      }
    }),

  /**
   * GET AVAILABLE REWARDS
   * List all available rewards
   */
  getAvailableRewards: protectedProcedure
    .input(z.object({
      serviceType: z.enum(['detailing', 'auction', 'rental']).optional(),
    }))
    .query(async ({ input }) => {
      try {
        let rewards = AVAILABLE_REWARDS;

        if (input.serviceType) {
          rewards = rewards.filter(r => r.applicableTo.includes(input.serviceType!));
        }

        return {
          rewards: rewards.filter(r => r.available),
          total: rewards.length
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch rewards'
        });
      }
    }),

  /**
   * REDEEM REWARD
   * Redeem points for a reward
   */
  redeemReward: protectedProcedure
    .input(z.object({
      rewardId: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        const reward = AVAILABLE_REWARDS.find(r => r.id === input.rewardId);

        if (!reward) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Reward not found'
          });
        }

        const redeemCode = `REWARD_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        console.log(`[Loyalty] Redeemed: ${input.rewardId} for user ${ctx.user.id}`);

        return {
          success: true,
          reward,
          redeemCode,
          expirationDate: new Date(Date.now() + reward.expirationDays * 86400000),
          message: `Reward redeemed! Use code ${redeemCode} at checkout.`
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to redeem reward'
        });
      }
    }),

  /**
   * GET POINTS HISTORY
   * Retrieve points transaction history
   */
  getPointsHistory: protectedProcedure
    .input(z.object({
      limit: z.number().default(50),
      type: z.enum(['earn', 'redeem', 'expire']).optional(),
    }))
    .query(async ({ input, ctx }) => {
      try {
        const transactions: PointsTransaction[] = [
          {
            id: 'tx_1',
            userId: ctx.user.id,
            type: 'earn',
            points: 1200,
            reason: 'Ceramic Coating Pro booking',
            serviceType: 'detailing',
            bookingId: 'booking_1',
            timestamp: new Date(Date.now() - 86400000)
          },
          {
            id: 'tx_2',
            userId: ctx.user.id,
            type: 'earn',
            points: 450,
            reason: 'Tesla Model S rental',
            serviceType: 'rental',
            bookingId: 'booking_2',
            timestamp: new Date(Date.now() - 172800000)
          },
          {
            id: 'tx_3',
            userId: ctx.user.id,
            type: 'redeem',
            points: -1000,
            reason: 'Redeemed: $10 Off Detailing',
            serviceType: 'detailing',
            timestamp: new Date(Date.now() - 259200000)
          }
        ];

        let filtered = transactions;
        if (input.type) {
          filtered = filtered.filter(t => t.type === input.type);
        }

        return {
          transactions: filtered.slice(0, input.limit),
          total: filtered.length
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch points history'
        });
      }
    }),

  /**
   * GET LOYALTY TIERS
   * List all loyalty tiers
   */
  getLoyaltyTiers: protectedProcedure
    .query(() => {
      return Object.values(LOYALTY_TIERS).map(tier => ({
        ...tier,
        pointsRange: `${tier.minPoints.toLocaleString()} - ${tier.maxPoints === Infinity ? '∞' : tier.maxPoints.toLocaleString()}`
      }));
    }),

  /**
   * EARN POINTS
   * Award points for a booking
   */
  earnPoints: protectedProcedure
    .input(z.object({
      bookingId: z.string(),
      amount: z.number().positive(),
      serviceType: z.enum(['detailing', 'auction', 'rental']),
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        const account: LoyaltyAccount = {
          id: `loyalty_${ctx.user.id}`,
          userId: ctx.user.id,
          tier: 'gold',
          totalPoints: 8500,
          availablePoints: 7200,
          pointsExpiring: 300,
          expirationDate: new Date(),
          joinedAt: new Date(),
          nextTierPoints: 6500
        };

        const tier = LOYALTY_TIERS[account.tier];
        const earnedPoints = Math.round(input.amount * tier.pointsMultiplier);

        console.log(`[Loyalty] Earned ${earnedPoints} points for user ${ctx.user.id}`);

        return {
          success: true,
          pointsEarned: earnedPoints,
          newTotal: account.totalPoints + earnedPoints,
          message: `Congratulations! You earned ${earnedPoints} points.`
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to earn points'
        });
      }
    }),

  /**
   * GET REFERRAL BONUS
   * Get bonus points for referrals
   */
  getReferralBonus: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        return {
          referralBonus: 500,
          referralBonusDescription: '500 points when your referred friend completes first booking',
          totalReferralBonusEarned: 2500,
          referralCount: 5
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch referral bonus'
        });
      }
    }),

  /**
   * GET BIRTHDAY BONUS
   * Check if user has birthday bonus available
   */
  getBirthdayBonus: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        const today = new Date();
        const isBirthdayMonth = today.getMonth() === 4; // May

        return {
          birthdayBonusAvailable: isBirthdayMonth,
          birthdayBonusAmount: 250,
          message: isBirthdayMonth ? 'Happy Birthday! Claim your 250 bonus points.' : 'Birthday bonus will be available in May.'
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch birthday bonus'
        });
      }
    })
});

export default loyaltyProgramRouter;

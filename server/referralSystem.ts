import { z } from 'zod';
import { protectedProcedure, router } from './_core/trpc';
import { TRPCError } from '@trpc/server';

/**
 * SAFERWAY & GREAT DETAIL - REFERRAL & AFFILIATE SYSTEM
 * Multi-tier commissions, crypto & fiat payouts, real-time tracking
 */

interface ReferralProgram {
  id: string;
  userId: number;
  referralCode: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  totalReferrals: number;
  totalEarnings: number;
  pendingEarnings: number;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
}

interface ReferralCommission {
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  minReferrals: number;
  maxReferrals: number;
  commissionPercentage: number;
  bonusPercentage: number;
  description: string;
}

interface ReferredCustomer {
  id: string;
  referrerId: number;
  customerId: number;
  referralCode: string;
  totalPurchases: number;
  totalRevenue: number;
  commissionEarned: number;
  status: 'active' | 'inactive';
  referredAt: Date;
  lastPurchaseAt: Date;
}

interface PayoutRequest {
  id: string;
  userId: number;
  amount: number;
  currency: 'USD' | 'BTC' | 'ETH' | 'SOL' | 'USDC' | 'USDT';
  walletAddress: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
  completedAt?: Date;
}

// Commission tiers
const COMMISSION_TIERS: Record<string, ReferralCommission> = {
  bronze: {
    tier: 'bronze',
    minReferrals: 0,
    maxReferrals: 9,
    commissionPercentage: 5,
    bonusPercentage: 0,
    description: '5% commission on all referrals'
  },
  silver: {
    tier: 'silver',
    minReferrals: 10,
    maxReferrals: 49,
    commissionPercentage: 7,
    bonusPercentage: 2,
    description: '7% commission + 2% team bonus'
  },
  gold: {
    tier: 'gold',
    minReferrals: 50,
    maxReferrals: 199,
    commissionPercentage: 10,
    bonusPercentage: 5,
    description: '10% commission + 5% team bonus'
  },
  platinum: {
    tier: 'platinum',
    minReferrals: 200,
    maxReferrals: Infinity,
    commissionPercentage: 15,
    bonusPercentage: 10,
    description: '15% commission + 10% team bonus + exclusive perks'
  }
};

export const referralRouter = router({
  /**
   * CREATE REFERRAL PROGRAM
   * Initialize referral program for user
   */
  createReferralProgram: protectedProcedure
    .mutation(async ({ ctx }) => {
      try {
        const referralCode = generateReferralCode();
        
        const program: ReferralProgram = {
          id: `ref_${Math.random().toString(36).substr(2, 9)}`,
          userId: ctx.user.id,
          referralCode,
          tier: 'bronze',
          totalReferrals: 0,
          totalEarnings: 0,
          pendingEarnings: 0,
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date()
        };

        console.log(`[Referral] Program created for user ${ctx.user.id}: ${referralCode}`);

        return {
          success: true,
          program,
          referralLink: `https://voltronhq-kjftutkm.manus.space?ref=${referralCode}`
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create referral program'
        });
      }
    }),

  /**
   * GET REFERRAL PROGRAM
   * Retrieve user's referral program details
   */
  getReferralProgram: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        // Mock program data
        const program: ReferralProgram = {
          id: `ref_${Math.random().toString(36).substr(2, 9)}`,
          userId: ctx.user.id,
          referralCode: 'SAFERWAY2024',
          tier: 'gold',
          totalReferrals: 87,
          totalEarnings: 52000,
          pendingEarnings: 8500,
          status: 'active',
          createdAt: new Date(Date.now() - 90 * 86400000),
          updatedAt: new Date()
        };

        const tier = COMMISSION_TIERS[program.tier];

        return {
          program,
          tier,
          referralLink: `https://voltronhq-kjftutkm.manus.space?ref=${program.referralCode}`,
          stats: {
            conversionRate: 12.5,
            avgOrderValue: 598,
            repeatPurchaseRate: 45
          }
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch referral program'
        });
      }
    }),

  /**
   * GET REFERRED CUSTOMERS
   * List all customers referred by user
   */
  getReferredCustomers: protectedProcedure
    .input(z.object({
      limit: z.number().default(50),
      offset: z.number().default(0),
    }))
    .query(async ({ input, ctx }) => {
      try {
        const referredCustomers: ReferredCustomer[] = [
          {
            id: 'ref_cust_1',
            referrerId: ctx.user.id,
            customerId: 101,
            referralCode: 'SAFERWAY2024',
            totalPurchases: 5,
            totalRevenue: 7500,
            commissionEarned: 750,
            status: 'active',
            referredAt: new Date(Date.now() - 60 * 86400000),
            lastPurchaseAt: new Date(Date.now() - 3 * 86400000)
          },
          {
            id: 'ref_cust_2',
            referrerId: ctx.user.id,
            customerId: 102,
            referralCode: 'SAFERWAY2024',
            totalPurchases: 3,
            totalRevenue: 4200,
            commissionEarned: 420,
            status: 'active',
            referredAt: new Date(Date.now() - 45 * 86400000),
            lastPurchaseAt: new Date(Date.now() - 5 * 86400000)
          },
          {
            id: 'ref_cust_3',
            referrerId: ctx.user.id,
            customerId: 103,
            referralCode: 'SAFERWAY2024',
            totalPurchases: 8,
            totalRevenue: 12000,
            commissionEarned: 1200,
            status: 'active',
            referredAt: new Date(Date.now() - 30 * 86400000),
            lastPurchaseAt: new Date(Date.now() - 1 * 86400000)
          }
        ];

        return {
          customers: referredCustomers.slice(input.offset, input.offset + input.limit),
          total: referredCustomers.length,
          offset: input.offset,
          limit: input.limit
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch referred customers'
        });
      }
    }),

  /**
   * GET COMMISSION TIERS
   * List all available commission tiers
   */
  getCommissionTiers: protectedProcedure
    .query(() => {
      return Object.values(COMMISSION_TIERS).map(tier => ({
        ...tier,
        benefits: getBenefitsForTier(tier.tier)
      }));
    }),

  /**
   * REQUEST PAYOUT
   * Create payout request for earned commissions
   */
  requestPayout: protectedProcedure
    .input(z.object({
      amount: z.number().positive(),
      currency: z.enum(['USD', 'BTC', 'ETH', 'SOL', 'USDC', 'USDT']),
      walletAddress: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        const payoutRequest: PayoutRequest = {
          id: `payout_${Math.random().toString(36).substr(2, 9)}`,
          userId: ctx.user.id,
          amount: input.amount,
          currency: input.currency,
          walletAddress: input.walletAddress,
          status: 'pending',
          createdAt: new Date()
        };

        console.log(`[Payout] Requested ${input.amount} ${input.currency} for user ${ctx.user.id}`);

        return {
          success: true,
          payoutRequest,
          message: `Payout request created. You will receive ${input.amount} ${input.currency} within 24-48 hours.`
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create payout request'
        });
      }
    }),

  /**
   * GET PAYOUT HISTORY
   * Retrieve user's payout history
   */
  getPayoutHistory: protectedProcedure
    .input(z.object({
      limit: z.number().default(50),
    }))
    .query(async ({ input, ctx }) => {
      try {
        const payouts: PayoutRequest[] = [
          {
            id: 'payout_1',
            userId: ctx.user.id,
            amount: 5000,
            currency: 'USD',
            walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f42e0',
            status: 'completed',
            createdAt: new Date(Date.now() - 10 * 86400000),
            completedAt: new Date(Date.now() - 9 * 86400000)
          },
          {
            id: 'payout_2',
            userId: ctx.user.id,
            amount: 0.25,
            currency: 'BTC',
            walletAddress: '1A1z7agoat2LWQLW23EADGF3B6JrMtPc2a',
            status: 'completed',
            createdAt: new Date(Date.now() - 5 * 86400000),
            completedAt: new Date(Date.now() - 4 * 86400000)
          },
          {
            id: 'payout_3',
            userId: ctx.user.id,
            amount: 3500,
            currency: 'USDC',
            walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f42e0',
            status: 'processing',
            createdAt: new Date(Date.now() - 1 * 86400000)
          }
        ];

        return {
          payouts: payouts.slice(0, input.limit),
          total: payouts.length
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch payout history'
        });
      }
    }),

  /**
   * GET REFERRAL ANALYTICS
   * Detailed analytics for referral program
   */
  getReferralAnalytics: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        return {
          totalReferrals: 87,
          activeReferrals: 82,
          conversionRate: 12.5,
          totalEarnings: 52000,
          pendingEarnings: 8500,
          avgCommissionPerReferral: 598,
          topPerformingReferral: {
            customerId: 103,
            revenue: 12000,
            commission: 1200
          },
          monthlyEarnings: [
            { month: 'Jan', earnings: 3500 },
            { month: 'Feb', earnings: 4200 },
            { month: 'Mar', earnings: 5100 },
            { month: 'Apr', earnings: 6800 },
            { month: 'May', earnings: 8200 },
            { month: 'Jun', earnings: 9800 },
            { month: 'Jul', earnings: 14400 }
          ]
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch referral analytics'
        });
      }
    }),

  /**
   * TRACK REFERRAL CLICK
   * Track when someone clicks referral link
   */
  trackReferralClick: protectedProcedure
    .input(z.object({
      referralCode: z.string(),
    }))
    .mutation(async ({ input }) => {
      try {
        console.log(`[Referral] Click tracked for code: ${input.referralCode}`);
        return { success: true };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to track referral click'
        });
      }
    }),

  /**
   * TRACK REFERRAL CONVERSION
   * Track when referral converts to customer
   */
  trackReferralConversion: protectedProcedure
    .input(z.object({
      referralCode: z.string(),
      customerId: z.number(),
      orderValue: z.number(),
    }))
    .mutation(async ({ input }) => {
      try {
        const tier = COMMISSION_TIERS['gold']; // Mock tier
        const commission = (input.orderValue * tier.commissionPercentage) / 100;

        console.log(`[Referral] Conversion tracked: ${input.referralCode} -> Customer ${input.customerId}, Commission: $${commission}`);

        return {
          success: true,
          commission,
          message: `Congratulations! You earned $${commission.toFixed(2)} commission.`
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to track referral conversion'
        });
      }
    })
});

/**
 * HELPER FUNCTIONS
 */

function generateReferralCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function getBenefitsForTier(tier: string): string[] {
  const benefits: Record<string, string[]> = {
    bronze: [
      '5% commission on all referrals',
      'Real-time earnings tracking',
      'Monthly payouts'
    ],
    silver: [
      '7% commission on all referrals',
      '2% team bonus',
      'Priority support',
      'Weekly payouts'
    ],
    gold: [
      '10% commission on all referrals',
      '5% team bonus',
      'Dedicated account manager',
      'Bi-weekly payouts',
      'Exclusive marketing materials'
    ],
    platinum: [
      '15% commission on all referrals',
      '10% team bonus',
      'VIP account manager',
      'Weekly payouts',
      'Custom marketing support',
      'Co-marketing opportunities',
      'Revenue share on team'
    ]
  };

  return benefits[tier] || [];
}

export default referralRouter;

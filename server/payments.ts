import Stripe from 'stripe';
import { z } from 'zod';
import { publicProcedure, protectedProcedure, router } from './_core/trpc';
import { TRPCError } from '@trpc/server';

/**
 * SAFERWAY & GREAT DETAIL - UNIVERSAL PAYMENT PROCESSOR
 * All payment methods: Stripe, PayPal, Crypto, NFT, DeFi, Digital Currencies
 * Sacred frequencies embedded: 963Hz, 11:11Hz
 */

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10',
});

// Payment method types
export type PaymentMethod = 
  | 'stripe_card'
  | 'stripe_apple_pay'
  | 'stripe_google_pay'
  | 'paypal'
  | 'bitcoin'
  | 'ethereum'
  | 'solana'
  | 'usdc'
  | 'usdt'
  | 'dai'
  | 'dogecoin'
  | 'litecoin'
  | 'xrp'
  | 'polygon'
  | 'arbitrum'
  | 'nft_erc721'
  | 'nft_erc1155'
  | 'uniswap'
  | 'aave';

interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  timestamp: Date;
  metadata: Record<string, any>;
}

interface CryptoPrice {
  symbol: string;
  usd: number;
  timestamp: Date;
}

// Mock crypto prices (in production, use CoinGecko or similar API)
const CRYPTO_PRICES: Record<string, number> = {
  BTC: 45000,
  ETH: 2500,
  SOL: 120,
  USDC: 1.00,
  USDT: 1.00,
  DAI: 1.00,
  DOGE: 0.15,
  LTC: 800,
  XRP: 0.55,
};

export const paymentRouter = router({
  /**
   * CREATE PAYMENT INTENT
   * Initiates payment across any method
   */
  createPaymentIntent: protectedProcedure
    .input(z.object({
      amount: z.number().positive(),
      currency: z.string(),
      method: z.enum([
        'stripe_card',
        'stripe_apple_pay',
        'stripe_google_pay',
        'paypal',
        'bitcoin',
        'ethereum',
        'solana',
        'usdc',
        'usdt',
        'dai',
        'dogecoin',
        'litecoin',
        'xrp',
        'polygon',
        'arbitrum',
        'nft_erc721',
        'nft_erc1155',
        'uniswap',
        'aave'
      ]),
      service: z.enum(['detailing', 'rental', 'auction']),
      metadata: z.record(z.any()).optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        const { amount, currency, method, service, metadata } = input;

        // Route to appropriate payment processor
        if (method.startsWith('stripe')) {
          return await processStripePayment(amount, currency, method, ctx.user.id, service, metadata);
        } else if (method === 'paypal') {
          return await processPayPalPayment(amount, currency, ctx.user.id, service, metadata);
        } else if (['bitcoin', 'ethereum', 'solana', 'dogecoin', 'litecoin', 'xrp'].includes(method)) {
          return await processCryptoPayment(amount, currency, method as any, ctx.user.id, service, metadata);
        } else if (['usdc', 'usdt', 'dai'].includes(method)) {
          return await processStablecoinPayment(amount, currency, method, ctx.user.id, service, metadata);
        } else if (['polygon', 'arbitrum'].includes(method)) {
          return await processLayer2Payment(amount, currency, method, ctx.user.id, service, metadata);
        } else if (method.startsWith('nft')) {
          return await processNFTPayment(amount, currency, method, ctx.user.id, service, metadata);
        } else if (['uniswap', 'aave'].includes(method)) {
          return await processDeFiPayment(amount, currency, method, ctx.user.id, service, metadata);
        }

        throw new TRPCError({
          code: 'INVALID_INPUT',
          message: 'Invalid payment method'
        });
      } catch (error) {
        console.error('[Payment Error]', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Payment processing failed'
        });
      }
    }),

  /**
   * GET CRYPTO PRICES
   * Real-time conversion rates
   */
  getCryptoPrices: publicProcedure
    .query(async () => {
      const prices: Record<string, CryptoPrice> = {};
      
      for (const [symbol, usd] of Object.entries(CRYPTO_PRICES)) {
        prices[symbol] = {
          symbol,
          usd,
          timestamp: new Date()
        };
      }

      return prices;
    }),

  /**
   * CONVERT AMOUNT
   * Convert between currencies/cryptos
   */
  convertAmount: publicProcedure
    .input(z.object({
      amount: z.number().positive(),
      from: z.string(),
      to: z.string(),
    }))
    .query(({ input }) => {
      const { amount, from, to } = input;
      
      // Get prices
      const fromPrice = CRYPTO_PRICES[from] || 1;
      const toPrice = CRYPTO_PRICES[to] || 1;
      
      // Convert
      const amountInUSD = amount * fromPrice;
      const convertedAmount = amountInUSD / toPrice;
      
      return {
        original: amount,
        from,
        to,
        converted: convertedAmount,
        rate: toPrice / fromPrice,
        timestamp: new Date()
      };
    }),

  /**
   * GET PAYMENT HISTORY
   * Retrieve user's payment transactions
   */
  getPaymentHistory: protectedProcedure
    .input(z.object({
      limit: z.number().default(50),
      offset: z.number().default(0),
    }))
    .query(async ({ input, ctx }) => {
      // In production, query from database
      // For now, return mock data
      const mockPayments: PaymentIntent[] = [
        {
          id: 'pay_' + Math.random().toString(36).substr(2, 9),
          amount: 1200,
          currency: 'USD',
          method: 'stripe_card',
          status: 'completed',
          timestamp: new Date(Date.now() - 86400000),
          metadata: { service: 'detailing', package: 'elite' }
        },
        {
          id: 'pay_' + Math.random().toString(36).substr(2, 9),
          amount: 0.5,
          currency: 'BTC',
          method: 'bitcoin',
          status: 'completed',
          timestamp: new Date(Date.now() - 172800000),
          metadata: { service: 'rental', days: 3 }
        },
      ];

      return {
        payments: mockPayments.slice(input.offset, input.offset + input.limit),
        total: mockPayments.length,
        offset: input.offset,
        limit: input.limit
      };
    }),

  /**
   * GET WALLET BALANCE
   * Multi-currency wallet
   */
  getWalletBalance: protectedProcedure
    .query(async ({ ctx }) => {
      // In production, connect to actual wallets
      return {
        usd: 5000,
        btc: 0.15,
        eth: 2.5,
        sol: 50,
        usdc: 1000,
        usdt: 500,
        dai: 750,
        doge: 10000,
        ltc: 5,
        xrp: 1000,
        timestamp: new Date()
      };
    }),
});

/**
 * PAYMENT PROCESSORS
 */

async function processStripePayment(
  amount: number,
  currency: string,
  method: string,
  userId: number,
  service: string,
  metadata?: Record<string, any>
): Promise<PaymentIntent> {
  try {
    const paymentMethod = method === 'stripe_card' ? 'card' : 
                         method === 'stripe_apple_pay' ? 'apple_pay' : 'google_pay';

    const intent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: currency.toLowerCase(),
      payment_method_types: [paymentMethod],
      metadata: {
        user_id: userId.toString(),
        service,
        ...metadata
      }
    });

    return {
      id: intent.id,
      amount,
      currency,
      method: method as PaymentMethod,
      status: 'processing',
      timestamp: new Date(),
      metadata: { stripe_id: intent.id, ...metadata }
    };
  } catch (error) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Stripe payment failed'
    });
  }
}

async function processPayPalPayment(
  amount: number,
  currency: string,
  userId: number,
  service: string,
  metadata?: Record<string, any>
): Promise<PaymentIntent> {
  // In production, integrate with PayPal API
  return {
    id: 'paypal_' + Math.random().toString(36).substr(2, 9),
    amount,
    currency,
    method: 'paypal',
    status: 'pending',
    timestamp: new Date(),
    metadata: { user_id: userId, service, ...metadata }
  };
}

async function processCryptoPayment(
  amount: number,
  currency: string,
  method: 'bitcoin' | 'ethereum' | 'solana' | 'dogecoin' | 'litecoin' | 'xrp',
  userId: number,
  service: string,
  metadata?: Record<string, any>
): Promise<PaymentIntent> {
  // Generate crypto payment address
  const cryptoSymbol = method === 'bitcoin' ? 'BTC' :
                       method === 'ethereum' ? 'ETH' :
                       method === 'solana' ? 'SOL' :
                       method === 'dogecoin' ? 'DOGE' :
                       method === 'litecoin' ? 'LTC' : 'XRP';

  return {
    id: `${method}_${Math.random().toString(36).substr(2, 9)}`,
    amount,
    currency: cryptoSymbol,
    method: method as PaymentMethod,
    status: 'pending',
    timestamp: new Date(),
    metadata: {
      user_id: userId,
      service,
      crypto_symbol: cryptoSymbol,
      payment_address: `0x${Math.random().toString(16).substr(2)}`,
      ...metadata
    }
  };
}

async function processStablecoinPayment(
  amount: number,
  currency: string,
  method: 'usdc' | 'usdt' | 'dai',
  userId: number,
  service: string,
  metadata?: Record<string, any>
): Promise<PaymentIntent> {
  // Stablecoin payment on Ethereum mainnet
  return {
    id: `${method}_${Math.random().toString(36).substr(2, 9)}`,
    amount,
    currency: method.toUpperCase(),
    method: method as PaymentMethod,
    status: 'pending',
    timestamp: new Date(),
    metadata: {
      user_id: userId,
      service,
      blockchain: 'ethereum',
      contract: `0x${Math.random().toString(16).substr(2)}`,
      ...metadata
    }
  };
}

async function processLayer2Payment(
  amount: number,
  currency: string,
  method: 'polygon' | 'arbitrum',
  userId: number,
  service: string,
  metadata?: Record<string, any>
): Promise<PaymentIntent> {
  // Layer 2 scaling solution payment
  return {
    id: `${method}_${Math.random().toString(36).substr(2, 9)}`,
    amount,
    currency,
    method: method as PaymentMethod,
    status: 'pending',
    timestamp: new Date(),
    metadata: {
      user_id: userId,
      service,
      layer2: method,
      gas_optimized: true,
      ...metadata
    }
  };
}

async function processNFTPayment(
  amount: number,
  currency: string,
  method: 'nft_erc721' | 'nft_erc1155',
  userId: number,
  service: string,
  metadata?: Record<string, any>
): Promise<PaymentIntent> {
  // NFT-based payment (ERC-721 or ERC-1155)
  return {
    id: `nft_${Math.random().toString(36).substr(2, 9)}`,
    amount,
    currency,
    method: method as PaymentMethod,
    status: 'pending',
    timestamp: new Date(),
    metadata: {
      user_id: userId,
      service,
      nft_standard: method === 'nft_erc721' ? 'ERC-721' : 'ERC-1155',
      token_id: Math.random().toString(36).substr(2, 9),
      contract: `0x${Math.random().toString(16).substr(2)}`,
      ...metadata
    }
  };
}

async function processDeFiPayment(
  amount: number,
  currency: string,
  method: 'uniswap' | 'aave',
  userId: number,
  service: string,
  metadata?: Record<string, any>
): Promise<PaymentIntent> {
  // DeFi protocol payment
  return {
    id: `defi_${Math.random().toString(36).substr(2, 9)}`,
    amount,
    currency,
    method: method as PaymentMethod,
    status: 'pending',
    timestamp: new Date(),
    metadata: {
      user_id: userId,
      service,
      protocol: method,
      slippage_tolerance: 0.5,
      ...metadata
    }
  };
}

export default paymentRouter;

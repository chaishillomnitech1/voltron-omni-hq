import { protectedProcedure, publicProcedure, router } from '../_core/trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export const paymentsRouter = router({
  /**
   * Create a payment intent for one-time payments
   */
  createPaymentIntent: publicProcedure
    .input(z.object({
      amount: z.number().positive(),
      currency: z.string().default('usd'),
      description: z.string().optional(),
      metadata: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
    }))
    .mutation(async ({ input }) => {
      try {
        if (!stripe) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.',
          });
        }
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(input.amount * 100), // Convert to cents
          currency: input.currency,
          description: input.description,
          metadata: input.metadata as Record<string, string> | undefined,
        });

        return {
          clientSecret: paymentIntent.client_secret,
          id: paymentIntent.id,
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency,
          status: paymentIntent.status,
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Payment intent creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
      }
    }),

  /**
   * Create a checkout session for products
   */
  createCheckoutSession: publicProcedure
    .input(z.object({
      lineItems: z.array(z.object({
        priceId: z.string(),
        quantity: z.number().positive(),
      })),
      successUrl: z.string(),
      cancelUrl: z.string(),
      customerEmail: z.string().email().optional(),
    }))
    .mutation(async ({ input }) => {
      try {
        if (!stripe) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Stripe is not configured.',
          });
        }
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: input.lineItems,
          mode: 'payment',
          success_url: input.successUrl,
          cancel_url: input.cancelUrl,
          customer_email: input.customerEmail,
        });

        return {
          sessionId: session.id,
          url: session.url,
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Checkout session creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
      }
    }),

  /**
   * Create a subscription
   */
  createSubscription: protectedProcedure
    .input(z.object({
      priceId: z.string(),
      customerEmail: z.string().email(),
    }))
    .mutation(async ({ input }) => {
      try {
        if (!stripe) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Stripe is not configured.',
          });
        }
        // Create or get customer
        const customers = await stripe.customers.list({
          email: input.customerEmail,
          limit: 1,
        });

        let customerId = customers.data[0]?.id;

        if (!customerId) {
          const customer = await stripe.customers.create({
            email: input.customerEmail,
          });
          customerId = customer.id;
        }

        // Create subscription
        const subscription = await stripe.subscriptions.create({
          customer: customerId,
          items: [{ price: input.priceId }],
          payment_behavior: 'default_incomplete',
          expand: ['latest_invoice.payment_intent'],
        });

        return {
          subscriptionId: subscription.id,
          status: subscription.status,
          customerId,
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Subscription creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
      }
    }),

  /**
   * Get payment intent status
   */
  getPaymentStatus: publicProcedure
    .input(z.object({ paymentIntentId: z.string() }))
    .query(async ({ input }) => {
      try {
        if (!stripe) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Stripe is not configured.',
          });
        }
        const paymentIntent = await stripe.paymentIntents.retrieve(input.paymentIntentId);

        return {
          id: paymentIntent.id,
          status: paymentIntent.status,
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency,
          created: new Date(paymentIntent.created * 1000),
        };
      } catch (error) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Payment intent not found',
        });
      }
    }),

  /**
   * List products
   */
  listProducts: publicProcedure.query(async () => {
    try {
      if (!stripe) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Stripe is not configured.',
        });
      }
      const products = await stripe.products.list({
        limit: 100,
        active: true,
      });

      return products.data.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        images: product.images,
        metadata: product.metadata,
      }));
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch products',
      });
    }
  }),

  /**
   * Get product prices
   */
  getProductPrices: publicProcedure
    .input(z.object({ productId: z.string() }))
    .query(async ({ input }) => {
      try {
        if (!stripe) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Stripe is not configured.',
          });
        }
        const prices = await stripe.prices.list({
          product: input.productId,
          active: true,
        });

        return prices.data.map(price => ({
          id: price.id,
          amount: price.unit_amount ? price.unit_amount / 100 : 0,
          currency: price.currency,
          interval: price.recurring?.interval || 'one-time',
          type: price.type,
        }));
      } catch (error) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Prices not found',
        });
      }
    }),
});

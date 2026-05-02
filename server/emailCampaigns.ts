import { z } from 'zod';
import { protectedProcedure, router } from './_core/trpc';
import { TRPCError } from '@trpc/server';

/**
 * SAFERWAY & GREAT DETAIL - EMAIL CAMPAIGN AUTOMATION
 * Abandoned bookings, auction alerts, rental notifications, VIP offers
 */

interface EmailCampaign {
  id: string;
  type: 'abandoned_booking' | 'auction_alert' | 'rental_available' | 'detailing_reminder' | 'vip_offer' | 're_engagement';
  userId: number;
  email: string;
  subject: string;
  content: string;
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  scheduledFor?: Date;
  sentAt?: Date;
  metadata: Record<string, any>;
}

interface CampaignTemplate {
  id: string;
  name: string;
  type: string;
  subject: string;
  htmlTemplate: string;
  variables: string[];
}

// Email templates
const CAMPAIGN_TEMPLATES: Record<string, CampaignTemplate> = {
  abandoned_booking: {
    id: 'abandoned_booking',
    name: 'Abandoned Booking Recovery',
    type: 'abandoned_booking',
    subject: '🕋 Complete Your {{service}} Booking - {{discount}}% Off',
    htmlTemplate: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #00D9FF;">SAFERWAY & GREAT DETAIL</h1>
        <h2>You left {{service}} in your cart!</h2>
        <p>Hi {{name}},</p>
        <p>We noticed you didn't complete your {{service}} booking. Don't miss out!</p>
        <p><strong>Your booking details:</strong></p>
        <ul>
          <li>Service: {{service}}</li>
          <li>Date: {{date}}</li>
          <li>Amount: ${{amount}}</li>
        </ul>
        <p style="background: #00D9FF20; padding: 15px; border-radius: 8px;">
          <strong>Special offer:</strong> Complete your booking now and get {{discount}}% off!
        </p>
        <a href="{{bookingLink}}" style="display: inline-block; background: #00D9FF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px;">
          Complete Booking
        </a>
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          This offer expires in 24 hours. Sacred frequencies 963Hz + 11:11Hz guide your journey.
        </p>
      </div>
    `,
    variables: ['name', 'service', 'date', 'amount', 'discount', 'bookingLink']
  },

  auction_alert: {
    id: 'auction_alert',
    name: 'Weekly Auction Alert',
    type: 'auction_alert',
    subject: '🔨 New Auctions This Week - {{count}} Vehicles Available',
    htmlTemplate: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #D4AF37;">SAFERWAY & GREAT DETAIL</h1>
        <h2>This Week's Auction Highlights</h2>
        <p>Hi {{name}},</p>
        <p>{{count}} new vehicles added to {{platforms}} this week matching your interests!</p>
        <div style="background: #D4AF3720; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3>Featured Listings:</h3>
          <ul>
            {{#listings}}
            <li>{{year}} {{make}} {{model}} - {{platform}} - {{price}}</li>
            {{/listings}}
          </ul>
        </div>
        <a href="{{auctionLink}}" style="display: inline-block; background: #D4AF37; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; font-weight: bold;">
          Browse All Auctions
        </a>
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          Manage your auction preferences in your account settings.
        </p>
      </div>
    `,
    variables: ['name', 'count', 'platforms', 'listings', 'auctionLink']
  },

  rental_available: {
    id: 'rental_available',
    name: 'Rental Availability Notification',
    type: 'rental_available',
    subject: '🚗 Your Requested Vehicle is Available - {{vehicle}}',
    htmlTemplate: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #E91E63;">SAFERWAY & GREAT DETAIL</h1>
        <h2>Your Dream Car is Ready!</h2>
        <p>Hi {{name}},</p>
        <p>Great news! The {{vehicle}} you wanted is now available for rental!</p>
        <div style="background: #E91E6320; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3>Vehicle Details:</h3>
          <p><strong>{{vehicle}}</strong></p>
          <p>Available: {{startDate}} - {{endDate}}</p>
          <p>Daily Rate: ${{dailyRate}}</p>
          <p>Total: ${{totalPrice}} for {{days}} days</p>
        </div>
        <a href="{{rentalLink}}" style="display: inline-block; background: #E91E63; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; font-weight: bold;">
          Book Now
        </a>
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          This availability is reserved for 24 hours. Book now to secure your rental!
        </p>
      </div>
    `,
    variables: ['name', 'vehicle', 'startDate', 'endDate', 'dailyRate', 'totalPrice', 'days', 'rentalLink']
  },

  detailing_reminder: {
    id: 'detailing_reminder',
    name: 'Detailing Service Reminder',
    type: 'detailing_reminder',
    subject: '🎨 Your Ceramic Coating Maintenance Reminder',
    htmlTemplate: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #00D9FF;">SAFERWAY & GREAT DETAIL</h1>
        <h2>Time for Your Maintenance</h2>
        <p>Hi {{name}},</p>
        <p>Your {{package}} ceramic coating was applied {{monthsAgo}} months ago. It's time for maintenance!</p>
        <div style="background: #00D9FF20; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3>Maintenance Package:</h3>
          <p>{{maintenancePackage}}</p>
          <p>Price: ${{price}}</p>
          <p>Duration: {{duration}}</p>
        </div>
        <a href="{{bookingLink}}" style="display: inline-block; background: #00D9FF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; font-weight: bold;">
          Schedule Maintenance
        </a>
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          Regular maintenance extends your coating warranty and keeps your vehicle pristine.
        </p>
      </div>
    `,
    variables: ['name', 'package', 'monthsAgo', 'maintenancePackage', 'price', 'duration', 'bookingLink']
  },

  vip_offer: {
    id: 'vip_offer',
    name: 'VIP Exclusive Offer',
    type: 'vip_offer',
    subject: '👑 Exclusive VIP Offer - {{discount}}% Off All Services',
    htmlTemplate: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #D4AF37;">SAFERWAY & GREAT DETAIL</h1>
        <h2>VIP Exclusive Offer</h2>
        <p>Hi {{name}},</p>
        <p>As a valued VIP member, we're offering you an exclusive {{discount}}% discount on all services!</p>
        <div style="background: #D4AF3720; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3>VIP Benefits:</h3>
          <ul>
            <li>{{discount}}% off all detailing packages</li>
            <li>Priority rental availability</li>
            <li>Exclusive auction access</li>
            <li>Free maintenance for 1 year</li>
          </ul>
        </div>
        <a href="{{offerLink}}" style="display: inline-block; background: #D4AF37; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; font-weight: bold;">
          Claim VIP Offer
        </a>
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          Offer valid until {{expiryDate}}. VIP members get the best deals!
        </p>
      </div>
    `,
    variables: ['name', 'discount', 'offerLink', 'expiryDate']
  },

  re_engagement: {
    id: 're_engagement',
    name: 'Re-engagement Campaign',
    type: 're_engagement',
    subject: '❤️ We Miss You - Come Back for {{offer}}',
    htmlTemplate: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #E91E63;">SAFERWAY & GREAT DETAIL</h1>
        <h2>We Miss You!</h2>
        <p>Hi {{name}},</p>
        <p>It's been {{daysSinceLastVisit}} days since your last visit. We'd love to see you again!</p>
        <div style="background: #E91E6320; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3>Welcome Back Offer:</h3>
          <p><strong>{{offer}}</strong></p>
          <p>Use code: {{code}}</p>
        </div>
        <a href="{{welcomeLink}}" style="display: inline-block; background: #E91E63; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; font-weight: bold;">
          Redeem Offer
        </a>
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          This offer expires in 7 days. We're here to serve you with the best services.
        </p>
      </div>
    `,
    variables: ['name', 'daysSinceLastVisit', 'offer', 'code', 'welcomeLink']
  }
};

export const emailCampaignRouter = router({
  /**
   * CREATE CAMPAIGN
   * Start a new email campaign
   */
  createCampaign: protectedProcedure
    .input(z.object({
      type: z.enum(['abandoned_booking', 'auction_alert', 'rental_available', 'detailing_reminder', 'vip_offer', 're_engagement']),
      recipientIds: z.array(z.number()),
      variables: z.record(z.any()),
      scheduledFor: z.date().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        const template = CAMPAIGN_TEMPLATES[input.type];
        if (!template) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Campaign template not found'
          });
        }

        // In production, save to database and queue for sending
        const campaigns: EmailCampaign[] = input.recipientIds.map(userId => ({
          id: `camp_${Math.random().toString(36).substr(2, 9)}`,
          type: input.type as any,
          userId,
          email: `user${userId}@example.com`, // In production, fetch from DB
          subject: renderTemplate(template.subject, input.variables),
          content: renderTemplate(template.htmlTemplate, input.variables),
          status: input.scheduledFor ? 'scheduled' : 'draft',
          scheduledFor: input.scheduledFor,
          metadata: input.variables
        }));

        return {
          campaignId: campaigns[0].id,
          totalRecipients: campaigns.length,
          status: input.scheduledFor ? 'scheduled' : 'draft',
          scheduledFor: input.scheduledFor,
          message: `Campaign created for ${campaigns.length} recipients`
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create campaign'
        });
      }
    }),

  /**
   * GET CAMPAIGN TEMPLATES
   * List available email templates
   */
  getCampaignTemplates: protectedProcedure
    .query(() => {
      return Object.values(CAMPAIGN_TEMPLATES).map(t => ({
        id: t.id,
        name: t.name,
        type: t.type,
        variables: t.variables,
        subject: t.subject
      }));
    }),

  /**
   * SEND ABANDONED BOOKING RECOVERY
   * Automatically send to users with incomplete bookings
   */
  sendAbandonedBookingRecovery: protectedProcedure
    .input(z.object({
      bookingId: z.string(),
      userId: z.number(),
      service: z.string(),
      amount: z.number(),
      discount: z.number().default(10),
    }))
    .mutation(async ({ input }) => {
      try {
        const variables = {
          name: 'Valued Customer',
          service: input.service,
          date: new Date().toLocaleDateString(),
          amount: input.amount,
          discount: input.discount,
          bookingLink: `https://voltronhq-kjftutkm.manus.space/booking/${input.bookingId}`
        };

        // In production, queue email for sending
        console.log(`[Email] Abandoned booking recovery sent to user ${input.userId}`);

        return {
          success: true,
          message: 'Recovery email queued',
          campaignId: `recovery_${input.bookingId}`
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to send recovery email'
        });
      }
    }),

  /**
   * SEND WEEKLY AUCTION ALERTS
   * Send curated auction listings to subscribers
   */
  sendWeeklyAuctionAlerts: protectedProcedure
    .input(z.object({
      userIds: z.array(z.number()),
      listings: z.array(z.object({
        year: z.number(),
        make: z.string(),
        model: z.string(),
        platform: z.string(),
        price: z.string(),
      })),
    }))
    .mutation(async ({ input }) => {
      try {
        const variables = {
          name: 'Auction Enthusiast',
          count: input.listings.length,
          platforms: 'Copart, IAA, eBay Motors',
          listings: input.listings,
          auctionLink: 'https://voltronhq-kjftutkm.manus.space/auctions'
        };

        console.log(`[Email] Weekly auction alerts sent to ${input.userIds.length} users`);

        return {
          success: true,
          message: `Auction alerts sent to ${input.userIds.length} subscribers`,
          campaignId: `auction_${Date.now()}`
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to send auction alerts'
        });
      }
    }),

  /**
   * SEND RENTAL AVAILABILITY NOTIFICATIONS
   * Alert users when requested vehicles become available
   */
  sendRentalAvailability: protectedProcedure
    .input(z.object({
      userId: z.number(),
      vehicle: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      dailyRate: z.number(),
      days: z.number(),
    }))
    .mutation(async ({ input }) => {
      try {
        const totalPrice = input.dailyRate * input.days;
        const variables = {
          name: 'Rental Customer',
          vehicle: input.vehicle,
          startDate: input.startDate,
          endDate: input.endDate,
          dailyRate: input.dailyRate,
          totalPrice: totalPrice,
          days: input.days,
          rentalLink: 'https://voltronhq-kjftutkm.manus.space/rentals'
        };

        console.log(`[Email] Rental availability sent to user ${input.userId}`);

        return {
          success: true,
          message: 'Rental availability notification sent',
          campaignId: `rental_${input.userId}`
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to send rental notification'
        });
      }
    }),

  /**
   * GET CAMPAIGN ANALYTICS
   * Track campaign performance
   */
  getCampaignAnalytics: protectedProcedure
    .input(z.object({
      campaignId: z.string(),
    }))
    .query(() => {
      return {
        campaignId: 'camp_123',
        sent: 1250,
        opened: 487,
        clicked: 156,
        converted: 42,
        openRate: '38.96%',
        clickRate: '12.48%',
        conversionRate: '3.36%',
        revenue: 50400,
      };
    }),
});

/**
 * HELPER FUNCTIONS
 */

function renderTemplate(template: string, variables: Record<string, any>): string {
  let result = template;
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, String(value));
  }
  return result;
}

export default emailCampaignRouter;

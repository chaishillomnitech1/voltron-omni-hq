/**
 * API INTEGRATIONS MODULE
 * Centralized external API connections
 * 
 * Integrations:
 * - Stripe (payment processing)
 * - Instagram (social posting)
 * - Twitter/X (social posting)
 * - TikTok (social posting)
 * - CoinGecko (live prices)
 * - Polygon.io (blockchain data)
 */

import Stripe from 'stripe';

// ============================================================================
// STRIPE INTEGRATION
// ============================================================================

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10',
});

export async function createStripeCheckoutSession(params: {
  customerId?: string;
  customerEmail: string;
  lineItems: Array<{ price: string; quantity: number }>;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}) {
  try {
    const session = await stripe.checkout.sessions.create({
      customer: params.customerId,
      customer_email: params.customerEmail,
      line_items: params.lineItems,
      mode: 'payment',
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      metadata: params.metadata,
    });

    console.log(`[Stripe] Created checkout session: ${session.id}`);
    return { success: true, sessionId: session.id, url: session.url };
  } catch (error) {
    console.error('[Stripe] Failed to create session:', error);
    return { success: false, error: String(error) };
  }
}

export async function getStripeCustomer(customerId: string) {
  try {
    const customer = await stripe.customers.retrieve(customerId);
    console.log(`[Stripe] Retrieved customer: ${customerId}`);
    return { success: true, customer };
  } catch (error) {
    console.error('[Stripe] Failed to retrieve customer:', error);
    return { success: false, error: String(error) };
  }
}

export async function handleStripeWebhook(event: any) {
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        console.log('[Stripe] Payment succeeded:', event.data.object.id);
        return { processed: true, type: 'payment_succeeded' };

      case 'charge.refunded':
        console.log('[Stripe] Charge refunded:', event.data.object.id);
        return { processed: true, type: 'charge_refunded' };

      case 'customer.subscription.updated':
        console.log('[Stripe] Subscription updated:', event.data.object.id);
        return { processed: true, type: 'subscription_updated' };

      default:
        console.log('[Stripe] Unhandled event type:', event.type);
        return { processed: false, type: event.type };
    }
  } catch (error) {
    console.error('[Stripe] Webhook processing failed:', error);
    return { processed: false, error: String(error) };
  }
}

// ============================================================================
// INSTAGRAM INTEGRATION
// ============================================================================

export async function postToInstagram(params: {
  caption: string;
  imageUrl?: string;
  accessToken: string;
}) {
  try {
    // Instagram Graph API endpoint
    const endpoint = 'https://graph.instagram.com/v18.0/me/media';

    const formData = new URLSearchParams();
    formData.append('image_url', params.imageUrl || '');
    formData.append('caption', params.caption);
    formData.append('access_token', params.accessToken);

    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.id) {
      console.log(`[Instagram] Posted successfully: ${data.id}`);
      return { success: true, postId: data.id };
    } else {
      console.error('[Instagram] Post failed:', data.error);
      return { success: false, error: data.error };
    }
  } catch (error) {
    console.error('[Instagram] Integration failed:', error);
    return { success: false, error: String(error) };
  }
}

// ============================================================================
// TWITTER/X INTEGRATION
// ============================================================================

export async function postToTwitter(params: {
  text: string;
  bearerToken: string;
  mediaIds?: string[];
}) {
  try {
    const endpoint = 'https://api.twitter.com/2/tweets';

    const payload: any = {
      text: params.text,
    };

    if (params.mediaIds && params.mediaIds.length > 0) {
      payload.media = {
        media_ids: params.mediaIds,
      };
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${params.bearerToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.data?.id) {
      console.log(`[Twitter] Posted successfully: ${data.data.id}`);
      return { success: true, tweetId: data.data.id };
    } else {
      console.error('[Twitter] Post failed:', data.errors);
      return { success: false, error: data.errors };
    }
  } catch (error) {
    console.error('[Twitter] Integration failed:', error);
    return { success: false, error: String(error) };
  }
}

// ============================================================================
// TIKTOK INTEGRATION
// ============================================================================

export async function postToTikTok(params: {
  videoUrl: string;
  caption: string;
  accessToken: string;
}) {
  try {
    const endpoint = 'https://open-api.tiktok.com/v1/post/publish/video/init/';

    const payload = {
      source_info: {
        source: 'FILE_UPLOAD',
        video_size: 0,
      },
      post_info: {
        title: params.caption,
        description: params.caption,
      },
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${params.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.data?.publish_id) {
      console.log(`[TikTok] Posted successfully: ${data.data.publish_id}`);
      return { success: true, publishId: data.data.publish_id };
    } else {
      console.error('[TikTok] Post failed:', data.error);
      return { success: false, error: data.error };
    }
  } catch (error) {
    console.error('[TikTok] Integration failed:', error);
    return { success: false, error: String(error) };
  }
}

// ============================================================================
// COINGECKO INTEGRATION
// ============================================================================

export async function getCoinGeckoPrice(coinId: string): Promise<{
  success: boolean;
  price?: number;
  marketCap?: number;
  volume24h?: number;
  change24h?: number;
  error?: string;
}> {
  try {
    const endpoint = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`;

    const response = await fetch(endpoint);
    const data = await response.json();

    if (data[coinId]) {
      const coin = data[coinId];
      console.log(`[CoinGecko] Retrieved price for ${coinId}: $${coin.usd}`);
      return {
        success: true,
        price: coin.usd,
        marketCap: coin.usd_market_cap,
        volume24h: coin.usd_24h_vol,
        change24h: coin.usd_24h_change,
      };
    } else {
      console.error('[CoinGecko] Coin not found:', coinId);
      return { success: false, error: 'Coin not found' };
    }
  } catch (error) {
    console.error('[CoinGecko] Integration failed:', error);
    return { success: false, error: String(error) };
  }
}

export async function getCoinGeckoMarketData(coinIds: string[]) {
  try {
    const endpoint = `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds.join(',')}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`;

    const response = await fetch(endpoint);
    const data = await response.json();

    console.log(`[CoinGecko] Retrieved market data for ${coinIds.length} coins`);
    return { success: true, data };
  } catch (error) {
    console.error('[CoinGecko] Integration failed:', error);
    return { success: false, error: String(error) };
  }
}

// ============================================================================
// POLYGON.IO INTEGRATION
// ============================================================================

export async function getPolygonStockPrice(ticker: string, apiKey: string) {
  try {
    const endpoint = `https://api.polygon.io/v3/quotes/latest?ticker=${ticker}&apikey=${apiKey}`;

    const response = await fetch(endpoint);
    const data = await response.json();

    if (data.status === 'OK' && data.results) {
      const result = data.results;
      console.log(`[Polygon.io] Retrieved price for ${ticker}: $${result.last_quote?.ask}`);
      return {
        success: true,
        price: result.last_quote?.ask,
        bid: result.last_quote?.bid,
        volume: result.last_quote?.size,
        timestamp: result.last_updated,
      };
    } else {
      console.error('[Polygon.io] Failed to retrieve data:', data.status);
      return { success: false, error: data.status };
    }
  } catch (error) {
    console.error('[Polygon.io] Integration failed:', error);
    return { success: false, error: String(error) };
  }
}

export async function getPolygonCryptoPrice(from: string, to: string, apiKey: string) {
  try {
    const endpoint = `https://api.polygon.io/v1/last/crypto/${from}/${to}?apikey=${apiKey}`;

    const response = await fetch(endpoint);
    const data = await response.json();

    if (data.status === 'success' && data.last) {
      const last = data.last;
      console.log(`[Polygon.io] Retrieved crypto price ${from}/${to}: ${last.price}`);
      return {
        success: true,
        price: last.price,
        bid: last.bid,
        ask: last.ask,
        timestamp: last.timestamp,
      };
    } else {
      console.error('[Polygon.io] Failed to retrieve data:', data.status);
      return { success: false, error: data.status };
    }
  } catch (error) {
    console.error('[Polygon.io] Integration failed:', error);
    return { success: false, error: String(error) };
  }
}

export async function getPolygonBlockchainData(network: string, address: string, apiKey: string) {
  try {
    const endpoint = `https://api.polygon.io/v1/blockchain/${network}/address/${address}?apikey=${apiKey}`;

    const response = await fetch(endpoint);
    const data = await response.json();

    if (data.status === 'success') {
      console.log(`[Polygon.io] Retrieved blockchain data for ${address}`);
      return { success: true, data: data.results };
    } else {
      console.error('[Polygon.io] Failed to retrieve data:', data.status);
      return { success: false, error: data.status };
    }
  } catch (error) {
    console.error('[Polygon.io] Integration failed:', error);
    return { success: false, error: String(error) };
  }
}

// ============================================================================
// HEALTH CHECK
// ============================================================================

export async function checkAllIntegrations() {
  const results: Record<string, boolean> = {
    stripe: !!process.env.STRIPE_SECRET_KEY,
    instagram: !!process.env.INSTAGRAM_ACCESS_TOKEN,
    twitter: !!process.env.TWITTER_BEARER_TOKEN,
    tiktok: !!process.env.TIKTOK_ACCESS_TOKEN,
    coingecko: true, // No API key required
    polygon: !!process.env.POLYGON_API_KEY,
  };

  console.log('[API Integrations] Health check:', results);
  return results;
}

// Export all functions
export default {
  // Stripe
  createStripeCheckoutSession,
  getStripeCustomer,
  handleStripeWebhook,

  // Instagram
  postToInstagram,

  // Twitter/X
  postToTwitter,

  // TikTok
  postToTikTok,

  // CoinGecko
  getCoinGeckoPrice,
  getCoinGeckoMarketData,

  // Polygon.io
  getPolygonStockPrice,
  getPolygonCryptoPrice,
  getPolygonBlockchainData,

  // Health
  checkAllIntegrations,
};

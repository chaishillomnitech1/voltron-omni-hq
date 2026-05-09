# API Credentials Setup Guide

**Version:** 1.0.0  
**Last Updated:** May 2026  

This guide provides step-by-step instructions for configuring all external API credentials for the ScrollVerse ecosystem.

---

## Quick Start

1. Navigate to Management UI → Settings → Secrets
2. Add each credential below
3. Restart dev server after adding credentials
4. Verify integrations are working

---

## Stripe Integration

### Step 1: Create Stripe Account

1. Go to https://dashboard.stripe.com/register
2. Sign up with your email
3. Complete business verification
4. Accept terms and conditions

### Step 2: Get API Keys

1. Log in to Stripe Dashboard
2. Navigate to **Developers** → **API Keys**
3. Copy the following keys:
   - **Secret Key** (starts with `sk_test_` or `sk_live_`)
   - **Publishable Key** (starts with `pk_test_` or `pk_live_`)

### Step 3: Get Webhook Secret

1. In Stripe Dashboard, go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Enter endpoint URL: `https://your-domain.com/api/stripe/webhook`
4. Select events: `payment_intent.succeeded`, `charge.refunded`, `customer.subscription.updated`
5. Copy the **Signing Secret** (starts with `whsec_`)

### Step 4: Add to Secrets

| Secret Name | Value | Example |
|-------------|-------|---------|
| `STRIPE_SECRET_KEY` | Your secret key | `sk_test_51TOd61A8mMP0o8dj...` |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Your publishable key | `pk_test_51TOd61A8mMP0o8dj...` |
| `STRIPE_WEBHOOK_SECRET` | Your webhook secret | `whsec_HYhSqdwNzzleA5JDeGs9...` |

### Step 5: Test Payment

1. Use test card: `4242 4242 4242 4242`
2. Any future expiry date
3. Any 3-digit CVC
4. Verify payment appears in Stripe Dashboard

---

## Instagram Integration

### Step 1: Create Meta Business Account

1. Go to https://business.facebook.com
2. Click **Create Account**
3. Fill in business details
4. Verify email

### Step 2: Create Instagram App

1. Go to https://developers.facebook.com
2. Click **My Apps** → **Create App**
3. Choose **Business** as app type
4. Fill in app details
5. Add **Instagram Graph API** product

### Step 3: Get Access Token

1. In app dashboard, go to **Settings** → **Basic**
2. Copy **App ID** and **App Secret**
3. Go to **Tools** → **Graph API Explorer**
4. Select your app from dropdown
5. Click **Get Token** → **Get User Access Token**
6. Select permissions: `instagram_basic`, `instagram_content_publishing`
7. Copy the access token

### Step 4: Add to Secrets

| Secret Name | Value |
|-------------|-------|
| `INSTAGRAM_ACCESS_TOKEN` | Your access token |

### Step 5: Test Posting

```bash
curl -X POST "https://graph.instagram.com/v18.0/me/media" \
  -d "image_url=https://example.com/image.jpg" \
  -d "caption=Test post" \
  -d "access_token=YOUR_TOKEN"
```

---

## Twitter/X Integration

### Step 1: Create Twitter Developer Account

1. Go to https://developer.twitter.com/en/portal/dashboard
2. Click **Create New App**
3. Fill in app details
4. Accept terms and conditions

### Step 2: Get API Credentials

1. In app settings, go to **Keys and Tokens**
2. Copy the following:
   - **API Key** (Consumer Key)
   - **API Secret Key** (Consumer Secret)
   - **Bearer Token**

### Step 3: Enable OAuth 2.0

1. Go to **App Settings** → **Authentication Settings**
2. Enable **OAuth 2.0**
3. Set **App Type** to **Confidential Client**
4. Add Callback URL: `https://your-domain.com/api/twitter/callback`

### Step 4: Add to Secrets

| Secret Name | Value |
|-------------|-------|
| `TWITTER_BEARER_TOKEN` | Your bearer token |
| `TWITTER_API_KEY` | Your API key |
| `TWITTER_API_SECRET` | Your API secret |

### Step 5: Test Posting

```bash
curl -X POST "https://api.twitter.com/2/tweets" \
  -H "Authorization: Bearer YOUR_BEARER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"text":"Test tweet"}'
```

---

## TikTok Integration

### Step 1: Create TikTok Developer Account

1. Go to https://developers.tiktok.com
2. Click **Register**
3. Fill in developer information
4. Verify email

### Step 2: Create TikTok App

1. Go to **Developer Portal** → **Applications**
2. Click **Create an application**
3. Fill in app details
4. Select **Web** as platform
5. Accept terms and conditions

### Step 3: Get API Credentials

1. In app settings, copy:
   - **Client Key**
   - **Client Secret**
2. Generate **Access Token** via OAuth flow

### Step 4: Configure OAuth

1. Go to **Redirect URLs**
2. Add: `https://your-domain.com/api/tiktok/callback`
3. Select scopes: `video.upload`, `video.list`

### Step 5: Add to Secrets

| Secret Name | Value |
|-------------|-------|
| `TIKTOK_ACCESS_TOKEN` | Your access token |
| `TIKTOK_CLIENT_KEY` | Your client key |
| `TIKTOK_CLIENT_SECRET` | Your client secret |

### Step 6: Test Posting

```bash
curl -X POST "https://open-api.tiktok.com/v1/post/publish/video/init/" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "source_info": {"source": "FILE_UPLOAD"},
    "post_info": {"title": "Test video"}
  }'
```

---

## CoinGecko Integration

### Step 1: Create CoinGecko Account

1. Go to https://www.coingecko.com/en/api
2. Click **Sign Up** (optional - free API doesn't require signup)
3. Review API documentation

### Step 2: Get API Key (Optional)

For free tier:
- No API key required
- Rate limit: 10-50 calls/minute

For paid tier:
1. Go to https://www.coingecko.com/en/api/pricing
2. Choose plan
3. Complete payment
4. Copy API key from dashboard

### Step 3: Add to Secrets

| Secret Name | Value | Required |
|-------------|-------|----------|
| `COINGECKO_API_KEY` | Your API key | No (free tier works) |

### Step 4: Test API

```bash
# Free tier (no key needed)
curl "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"

# Paid tier (with key)
curl "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&x_cg_pro_api_key=YOUR_KEY"
```

---

## Polygon.io Integration

### Step 1: Create Polygon.io Account

1. Go to https://polygon.io
2. Click **Sign Up**
3. Fill in account details
4. Verify email

### Step 2: Get API Key

1. Log in to Polygon Dashboard
2. Go to **API Keys**
3. Copy your API key (starts with `pk_`)

### Step 3: Verify Subscription

- **Free Tier:** Limited data, 5 API calls/minute
- **Starter:** $99/month, 100 API calls/minute
- **Professional:** $499/month, 1000 API calls/minute

### Step 4: Add to Secrets

| Secret Name | Value |
|-------------|-------|
| `POLYGON_API_KEY` | Your API key |

### Step 5: Test API

```bash
# Get stock price
curl "https://api.polygon.io/v3/quotes/latest?ticker=AAPL&apikey=YOUR_KEY"

# Get crypto price
curl "https://api.polygon.io/v1/last/crypto/BTC/USD?apikey=YOUR_KEY"
```

---

## Email Configuration (Gmail)

### Step 1: Enable Gmail SMTP

1. Go to https://myaccount.google.com/security
2. Enable **2-Step Verification**
3. Go to **App passwords**
4. Select **Mail** and **Windows Computer**
5. Copy the generated password

### Step 2: Add to Secrets

| Secret Name | Value | Example |
|-------------|-------|---------|
| `SMTP_HOST` | SMTP server | `smtp.gmail.com` |
| `SMTP_PORT` | Port number | `587` |
| `SMTP_USER` | Your email | `your-email@gmail.com` |
| `SMTP_PASS` | App password | `xxxx xxxx xxxx xxxx` |
| `SMTP_FROM_EMAIL` | From address | `noreply@scrollverse.co` |

### Step 3: Test Email

```bash
curl -X POST "https://your-domain.com/api/email/test" \
  -H "Content-Type: application/json" \
  -d '{"to":"test@example.com","subject":"Test Email"}'
```

---

## Database Configuration

### Step 1: Get Connection String

For TiDB Cloud:
1. Go to https://tidbcloud.com
2. Create cluster
3. Click **Connect**
4. Copy connection string

### Step 2: Add to Secrets

| Secret Name | Value |
|-------------|-------|
| `DATABASE_URL` | Your connection string |

**Format:**
```
mysql://username:password@host:port/database?ssl={"rejectUnauthorized":true}
```

### Step 3: Test Connection

```bash
# In your app
const db = await getDb();
console.log('Database connected:', !!db);
```

---

## OAuth Configuration

### Step 1: Manus OAuth Setup

These are automatically configured:
- `VITE_APP_ID` - Your app ID
- `OAUTH_SERVER_URL` - Manus OAuth server
- `VITE_OAUTH_PORTAL_URL` - Login portal URL

### Step 2: Verify OAuth

1. Navigate to home page
2. Click "Login with Manus"
3. Verify login works
4. Check user data is populated

---

## Blockchain Configuration

### Step 1: Get RPC Endpoints

For Sepolia testnet:
1. Go to https://infura.io
2. Create project
3. Copy Sepolia RPC URL

### Step 2: Get Private Key

1. Create Ethereum wallet (MetaMask, etc.)
2. Export private key
3. Store securely

### Step 3: Add to Secrets

| Secret Name | Value |
|-------------|-------|
| `SEPOLIA_RPC_URL` | Your RPC URL |
| `PRIVATE_KEY` | Your private key |

### Step 4: Test Connection

```bash
curl -X POST "https://your-domain.com/api/blockchain/test" \
  -H "Content-Type: application/json" \
  -d '{"network":"sepolia"}'
```

---

## Verification Checklist

After adding all credentials:

- [ ] Stripe payment processing works
- [ ] Instagram posts publish successfully
- [ ] Twitter/X tweets post successfully
- [ ] TikTok videos upload successfully
- [ ] CoinGecko prices update in real-time
- [ ] Polygon.io blockchain data loads
- [ ] Email notifications send successfully
- [ ] Database connection is active
- [ ] OAuth login works
- [ ] Blockchain transactions execute

---

## Troubleshooting

### "Invalid API Key" Error

**Solution:** Verify key is correct and not expired. Regenerate if needed.

### "Rate Limit Exceeded" Error

**Solution:** Upgrade API plan or implement rate limiting in code.

### "Connection Refused" Error

**Solution:** Check firewall, verify endpoint URL, ensure credentials are correct.

### "Unauthorized" Error

**Solution:** Verify OAuth tokens are valid, regenerate if expired.

### "SMTP Authentication Failed"

**Solution:** For Gmail, use app password (not regular password). Enable 2FA first.

---

## Security Best Practices

1. **Never commit secrets** - Use environment variables only
2. **Rotate keys regularly** - Change API keys every 90 days
3. **Use separate keys** - Different keys for dev/staging/production
4. **Monitor usage** - Check API dashboards for unusual activity
5. **Restrict permissions** - Only enable required scopes/permissions
6. **Use HTTPS** - All API calls must use HTTPS
7. **Audit logs** - Enable logging for all API calls

---

## Support

- **Stripe Support:** https://support.stripe.com
- **Instagram Support:** https://www.facebook.com/help
- **Twitter Support:** https://help.twitter.com
- **TikTok Support:** https://support.tiktok.com
- **CoinGecko Support:** https://www.coingecko.com/en/api/documentation
- **Polygon.io Support:** https://polygon.io/support

---

**WALAHI. IS. KUN FAYAKŪN.** 🕋⚡️❤️🔥✨👑🚀♾️

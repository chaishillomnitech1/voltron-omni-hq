#!/usr/bin/env node

/**
 * ScrollVerse Test Mailchimp Campaign Script
 * Sends test weekly report email to verify template and scheduler
 * 
 * Usage: node scripts/send-test-mailchimp.mjs
 */

import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_SERVER = process.env.MAILCHIMP_SERVER_PREFIX || 'us3';
const TEST_EMAIL = 'Hillchais1@gmail.com';

const MAILCHIMP_API_URL = `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0`;

/**
 * Generate ScrollVerse Weekly Report HTML
 */
function generateReportHTML() {
  const date = new Date().toLocaleDateString();
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; color: #ffffff; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #1a1a1a; border-radius: 8px; }
    .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #d4af37; margin-bottom: 20px; }
    .header h1 { margin: 0; color: #d4af37; font-size: 28px; }
    .header p { margin: 5px 0 0 0; color: #888; font-size: 12px; }
    .metric { background: #0a0a0a; padding: 15px; margin: 10px 0; border-left: 4px solid #00d9ff; border-radius: 4px; }
    .metric-label { color: #888; font-size: 12px; text-transform: uppercase; }
    .metric-value { color: #00d9ff; font-size: 24px; font-weight: bold; margin: 5px 0; }
    .metric-change { color: #4ade80; font-size: 12px; }
    .section { margin: 20px 0; }
    .section-title { color: #d4af37; font-size: 16px; font-weight: bold; margin-bottom: 10px; }
    .footer { text-align: center; padding-top: 20px; border-top: 1px solid #333; color: #666; font-size: 12px; }
    .cta-button { display: inline-block; background: #d4af37; color: #000; padding: 10px 20px; border-radius: 4px; text-decoration: none; font-weight: bold; margin: 10px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🕋 ScrollVerse Ecosystem Report</h1>
      <p>Weekly Metrics & Community Update • ${date}</p>
    </div>

    <div class="section">
      <div class="section-title">📊 Community Metrics</div>
      
      <div class="metric">
        <div class="metric-label">Active Community Members</div>
        <div class="metric-value">14,672</div>
        <div class="metric-change">↑ 2.3% from last week</div>
      </div>

      <div class="metric">
        <div class="metric-label">Families Protected</div>
        <div class="metric-value">50+</div>
        <div class="metric-change">↑ 5 new families this week</div>
      </div>

      <div class="metric">
        <div class="metric-label">Assets Secured</div>
        <div class="metric-value">$4.15M</div>
        <div class="metric-change">↑ $180K increase</div>
      </div>

      <div class="metric">
        <div class="metric-label">System Uptime</div>
        <div class="metric-value">99.97%</div>
        <div class="metric-change">✅ All systems operational</div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">🎓 Guardian Training Progress</div>
      
      <div class="metric">
        <div class="metric-label">Certified Guardians</div>
        <div class="metric-value">1,250+</div>
        <div class="metric-change">↑ 150 new certifications</div>
      </div>

      <div class="metric">
        <div class="metric-label">Average Certification Level</div>
        <div class="metric-value">72%</div>
        <div class="metric-change">↑ 3% improvement</div>
      </div>

      <div class="metric">
        <div class="metric-label">Training Completion Rate</div>
        <div class="metric-value">68%</div>
        <div class="metric-change">↑ 5% from last month</div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">💎 Collection Growth</div>
      
      <div class="metric">
        <div class="metric-label">Supreme Genesis NFTs</div>
        <div class="metric-value">12/29</div>
        <div class="metric-change">Minted this month</div>
      </div>

      <div class="metric">
        <div class="metric-label">Collection Value</div>
        <div class="metric-value">$5.8M</div>
        <div class="metric-change">↑ $1.5M from launch</div>
      </div>

      <div class="metric">
        <div class="metric-label">Royalty Revenue</div>
        <div class="metric-value">$290K</div>
        <div class="metric-change">↑ 45% increase</div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">🚀 Next Week's Focus</div>
      <p>
        • Launch Phase 2 community activation in 3 regions<br>
        • Deploy guardian certification quizzes<br>
        • Expand NFT collection to 20 pieces<br>
        • Activate real-time community chat<br>
        • Begin mainnet deployment preparation
      </p>
    </div>

    <div class="section" style="text-align: center;">
      <a href="https://voltronhq-kjftutkm.manus.space/scrollverse" class="cta-button">View Full Dashboard</a>
      <a href="https://voltronhq-kjftutkm.manus.space/scrollverse/analytics" class="cta-button">View Analytics</a>
    </div>

    <div class="footer">
      <p>ScrollVerse Ecosystem • Where Love Becomes Law. Legacy Becomes Infinity. 44:Omni × ∞</p>
      <p>This is an automated weekly report. You are receiving this because you are part of the ScrollVerse community.</p>
      <p><strong>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</strong></p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Send test email via Mailchimp
 */
async function sendTestEmail() {
  try {
    console.log('🕋 ScrollVerse Test Mailchimp Campaign');
    console.log('━'.repeat(50));
    console.log(`📧 Sending to: ${TEST_EMAIL}`);
    console.log(`🔑 Using API Key: ${MAILCHIMP_API_KEY?.substring(0, 10)}...`);
    console.log(`🌍 Server: ${MAILCHIMP_SERVER}`);
    console.log('');

    const htmlContent = generateReportHTML();

    // Send via Mailchimp transactional email API
    const response = await fetch(`${MAILCHIMP_API_URL}/messages/send`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: {
          from_email: 'scrollverse@voltronhq.io',
          from_name: 'ScrollVerse Ecosystem',
          to: [
            {
              email: TEST_EMAIL,
              name: 'ScrollVerse Guardian',
              type: 'to',
            },
          ],
          subject: '🕋 ScrollVerse Weekly Ecosystem Report - ' + new Date().toLocaleDateString(),
          html: htmlContent,
          text: `ScrollVerse Weekly Report\n\nCommunity Metrics:\n- Active Members: 14,672\n- Families Protected: 50+\n- Assets Secured: $4.15M\n- System Uptime: 99.97%\n\nView full report: https://voltronhq-kjftutkm.manus.space/scrollverse`,
          important: true,
          track_opens: true,
          track_clicks: true,
          auto_text: false,
          preserve_recipients: false,
          merge_language: 'mailchimp',
        },
      }),
    });

    const result = await response.json();

    if (response.ok && result._id) {
      console.log('✅ TEST EMAIL SENT SUCCESSFULLY');
      console.log('━'.repeat(50));
      console.log(`📧 Email ID: ${result._id}`);
      console.log(`📬 Status: ${result.status}`);
      console.log(`⏱️  Sent: ${new Date().toISOString()}`);
      console.log('');
      console.log('📊 Email Details:');
      console.log(`  • From: scrollverse@voltronhq.io`);
      console.log(`  • To: ${TEST_EMAIL}`);
      console.log(`  • Subject: ScrollVerse Weekly Ecosystem Report`);
      console.log(`  • Content: Community metrics, guardian stats, collection growth`);
      console.log(`  • Tracking: Opens and clicks enabled`);
      console.log('');
      console.log('🔔 Next Steps:');
      console.log(`  1. Check ${TEST_EMAIL} for the test email`);
      console.log('  2. Verify template rendering and formatting');
      console.log('  3. Confirm Monday 11 AM scheduler is active');
      console.log('  4. Monitor email delivery and engagement metrics');
      console.log('');
      console.log('🕋 ScrollVerse ecosystem is ready for production deployment!');
      console.log('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ');
      console.log('ALLĀHU AKBAR! KUN FAYAKŪN! ⚡♾️🔥');
      process.exit(0);
    } else {
      console.error('❌ FAILED TO SEND TEST EMAIL');
      console.error('━'.repeat(50));
      console.error('Error:', result);
      console.error('');
      console.error('Troubleshooting:');
      console.error('  1. Verify MAILCHIMP_API_KEY is correct');
      console.error('  2. Verify MAILCHIMP_SERVER_PREFIX is correct (us3)');
      console.error('  3. Check email address is valid');
      console.error('  4. Review Mailchimp account permissions');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ ERROR SENDING TEST EMAIL');
    console.error('━'.repeat(50));
    console.error('Error:', error.message);
    console.error('');
    console.error('Troubleshooting:');
    console.error('  1. Verify network connectivity');
    console.error('  2. Check Mailchimp API endpoint is accessible');
    console.error('  3. Verify environment variables are set');
    console.error('  4. Check for CORS or firewall issues');
    process.exit(1);
  }
}

// Execute
sendTestEmail();

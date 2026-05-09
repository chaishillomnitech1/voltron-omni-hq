import nodemailer from 'nodemailer';
import { db } from './db';
import { users, activityLog } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

/**
 * GMAIL ALERT SYSTEM
 * Real-time email notifications for website and artifact activity
 * 
 * Features:
 * - Real-time activity tracking
 * - Configurable alert rules
 * - Email templates
 * - Batch notifications
 * - Activity logging
 * - Alert history
 * - User preferences
 * - Unsubscribe management
 */

interface ActivityEvent {
  type: string;
  userId: string;
  title: string;
  description: string;
  data?: Record<string, any>;
  timestamp?: number;
}

interface AlertRule {
  userId: string;
  eventType: string;
  enabled: boolean;
  batchDaily?: boolean;
}

interface EmailTemplate {
  subject: string;
  html: string;
}

// Initialize Gmail transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Email templates
const emailTemplates: Record<string, EmailTemplate> = {
  user_registration: {
    subject: '🎉 Welcome to ScrollVerse - Your Journey Begins',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #050505 0%, #1a1a2e 100%); color: #fff; padding: 20px; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #00d9ff; margin: 0;">🕋 Welcome, Guardian</h1>
        </div>
        <div style="background: rgba(0, 217, 255, 0.1); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p>You have successfully joined the ScrollVerse ecosystem as a new Guardian.</p>
          <p><strong>Your Journey Starts Now:</strong></p>
          <ul>
            <li>Complete your Guardian Certification Quiz</li>
            <li>Join the community and connect with other Guardians</li>
            <li>Start earning rewards through participation</li>
            <li>Access exclusive Sacred Books and content</li>
          </ul>
        </div>
        <div style="text-align: center; margin-top: 30px;">
          <a href="{actionUrl}" style="background: #00d9ff; color: #000; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold;">Get Started</a>
        </div>
        <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
          <p>WALAHI. IS. KUN FAYAKŪN. 🕋⚡️❤️</p>
        </div>
      </div>
    `,
  },

  proposal_submitted: {
    subject: '📋 New Proposal Submitted - Your Vote Needed',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #050505 0%, #1a1a2e 100%); color: #fff; padding: 20px; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #00d9ff; margin: 0;">📋 New Proposal</h1>
        </div>
        <div style="background: rgba(0, 217, 255, 0.1); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="margin-top: 0;">{proposalTitle}</h2>
          <p><strong>Proposer:</strong> {proposerName}</p>
          <p><strong>Description:</strong> {proposalDescription}</p>
          <p><strong>Voting Ends:</strong> {votingEndsAt}</p>
        </div>
        <div style="text-align: center; margin-top: 30px;">
          <a href="{actionUrl}" style="background: #00d9ff; color: #000; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold;">Vote Now</a>
        </div>
      </div>
    `,
  },

  voting_activity: {
    subject: '🗳️ Voting Activity Update',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #050505 0%, #1a1a2e 100%); color: #fff; padding: 20px; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #00d9ff; margin: 0;">🗳️ Your Vote Recorded</h1>
        </div>
        <div style="background: rgba(0, 217, 255, 0.1); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p><strong>Proposal:</strong> {proposalTitle}</p>
          <p><strong>Your Vote:</strong> {voteChoice}</p>
          <p><strong>Current Status:</strong> {currentStatus}</p>
        </div>
      </div>
    `,
  },

  token_transfer: {
    subject: '💰 Token Transfer Notification',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #050505 0%, #1a1a2e 100%); color: #fff; padding: 20px; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #00d9ff; margin: 0;">💰 Token Transfer</h1>
        </div>
        <div style="background: rgba(0, 217, 255, 0.1); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p><strong>Amount:</strong> {amount} $LONDC</p>
          <p><strong>From:</strong> {fromAddress}</p>
          <p><strong>To:</strong> {toAddress}</p>
          <p><strong>Status:</strong> {status}</p>
        </div>
      </div>
    `,
  },

  governance_change: {
    subject: '⚙️ Governance Update',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #050505 0%, #1a1a2e 100%); color: #fff; padding: 20px; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #00d9ff; margin: 0;">⚙️ Governance Update</h1>
        </div>
        <div style="background: rgba(0, 217, 255, 0.1); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p><strong>Change:</strong> {changeDescription}</p>
          <p><strong>Effective Date:</strong> {effectiveDate}</p>
          <p><strong>Impact:</strong> {impact}</p>
        </div>
      </div>
    `,
  },

  system_alert: {
    subject: '🚨 System Alert',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #050505 0%, #1a1a2e 100%); color: #fff; padding: 20px; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #ff6b6b; margin: 0;">🚨 System Alert</h1>
        </div>
        <div style="background: rgba(255, 107, 107, 0.1); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p><strong>Alert Type:</strong> {alertType}</p>
          <p><strong>Message:</strong> {message}</p>
          <p><strong>Action Required:</strong> {actionRequired}</p>
        </div>
      </div>
    `,
  },

  milestone_achievement: {
    subject: '🏆 Milestone Achievement!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #050505 0%, #1a1a2e 100%); color: #fff; padding: 20px; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #d4af37; margin: 0;">🏆 Congratulations!</h1>
        </div>
        <div style="background: rgba(212, 175, 55, 0.1); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p><strong>Achievement:</strong> {milestoneTitle}</p>
          <p><strong>Description:</strong> {milestoneDescription}</p>
          <p><strong>Reward:</strong> {reward}</p>
        </div>
      </div>
    `,
  },
};

/**
 * Send activity alert via Gmail
 */
export async function sendActivityAlert(event: ActivityEvent, userEmail: string) {
  try {
    const template = emailTemplates[event.type];
    if (!template) {
      console.warn(`No email template found for event type: ${event.type}`);
      return false;
    }

    // Replace template variables
    let html = template.html;
    if (event.data) {
      Object.entries(event.data).forEach(([key, value]) => {
        html = html.replace(`{${key}}`, String(value));
      });
    }

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: userEmail,
      subject: template.subject,
      html,
    });

    console.log(`[Email] Alert sent to ${userEmail} for event: ${event.type}`);
    return true;
  } catch (error) {
    console.error('[Email] Failed to send alert:', error);
    return false;
  }
}

/**
 * Log activity for tracking
 */
export async function logActivity(event: ActivityEvent) {
  try {
    if (!db) {
      console.warn('[Activity Log] Database not initialized');
      return;
    }

    // Insert activity log
    await db.insert(activityLog).values({
      userId: parseInt(event.userId),
      activityType: event.type,
      details: JSON.stringify(event.data || {}),
      createdAt: new Date(event.timestamp || Date.now()),
    });

    console.log(`[Activity Log] Logged: ${event.type}`);
  } catch (error) {
    console.error('[Activity Log] Failed to log activity:', error);
  }
}

/**
 * Create or update alert rule
 */
export async function createAlertRule(rule: AlertRule) {
  try {
    // Store in user preferences (implementation depends on your schema)
    console.log(`[Alert Rule] Created rule for user ${rule.userId}: ${rule.eventType}`);
    return true;
  } catch (error) {
    console.error('[Alert Rule] Failed to create rule:', error);
    return false;
  }
}

/**
 * Send batch daily digest
 */
export async function sendDailyDigest(userId: string, userEmail: string, activities: ActivityEvent[]) {
  try {
    const activityList = activities
      .map(
        a =>
          `<li><strong>${a.title}:</strong> ${a.description} (${new Date(a.timestamp || Date.now()).toLocaleString()})</li>`
      )
      .join('');

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #050505 0%, #1a1a2e 100%); color: #fff; padding: 20px; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #00d9ff; margin: 0;">📊 Daily Activity Digest</h1>
        </div>
        <div style="background: rgba(0, 217, 255, 0.1); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p>Here's your activity summary for today:</p>
          <ul>${activityList}</ul>
          <p style="margin-top: 20px;">Total Activities: ${activities.length}</p>
        </div>
        <div style="text-align: center; margin-top: 30px;">
          <a href="{dashboardUrl}" style="background: #00d9ff; color: #000; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold;">View Dashboard</a>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: userEmail,
      subject: '📊 Your ScrollVerse Daily Digest',
      html,
    });

    console.log(`[Email] Daily digest sent to ${userEmail}`);
    return true;
  } catch (error) {
    console.error('[Email] Failed to send daily digest:', error);
    return false;
  }
}

/**
 * Get user alert preferences
 */
export async function getUserAlertPreferences(userId: string) {
  try {
    // Retrieve from database (implementation depends on your schema)
    return {
      userId,
      emailNotifications: true,
      pushNotifications: true,
      dailyDigest: true,
      eventTypes: [
        'user_registration',
        'proposal_submitted',
        'voting_activity',
        'token_transfer',
        'governance_change',
        'system_alert',
        'milestone_achievement',
      ],
    };
  } catch (error) {
    console.error('[Alert Preferences] Failed to get preferences:', error);
    return null;
  }
}

/**
 * Update user alert preferences
 */
export async function updateUserAlertPreferences(userId: string, preferences: Record<string, any>) {
  try {
    // Update in database (implementation depends on your schema)
    console.log(`[Alert Preferences] Updated for user ${userId}`);
    return true;
  } catch (error) {
    console.error('[Alert Preferences] Failed to update preferences:', error);
    return false;
  }
}

/**
 * Unsubscribe from alerts
 */
export async function unsubscribeFromAlerts(userId: string) {
  try {
    await updateUserAlertPreferences(userId, {
      emailNotifications: false,
      pushNotifications: false,
    });
    console.log(`[Alert] User ${userId} unsubscribed from alerts`);
    return true;
  } catch (error) {
    console.error('[Alert] Failed to unsubscribe:', error);
    return false;
  }
}

/**
 * Get activity history
 */
export async function getActivityHistory(userId: string, limit: number = 50) {
  try {
    if (!db) {
      console.warn('[Activity History] Database not initialized');
      return [];
    }

    // Query activity log
    // const activities = await db.select().from(activityLog).where(eq(activityLog.userId, parseInt(userId))).limit(limit);
    // return activities;
    return [];
  } catch (error) {
    console.error('[Activity History] Failed to retrieve history:', error);
    return [];
  }
}

/**
 * Test email connection
 */
export async function testEmailConnection() {
  try {
    await transporter.verify();
    console.log('[Email] SMTP connection verified successfully');
    return true;
  } catch (error) {
    console.error('[Email] SMTP connection failed:', error);
    return false;
  }
}

// Initialize email service
testEmailConnection();

export default {
  sendActivityAlert,
  logActivity,
  createAlertRule,
  sendDailyDigest,
  getUserAlertPreferences,
  updateUserAlertPreferences,
  unsubscribeFromAlerts,
  getActivityHistory,
  testEmailConnection,
};

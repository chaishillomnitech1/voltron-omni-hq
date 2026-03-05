import axios from 'axios';
import { format, startOfWeek, endOfWeek } from 'date-fns';

/**
 * ScrollVerse Mailchimp Weekly Reports Service
 * 
 * Automated ecosystem metrics reporting every Monday at 11 AM EST
 * Sends comprehensive community engagement, growth, and protection status updates
 * 
 * Where Love Becomes Law. Legacy Becomes Infinity. 44:Omni × ∞
 */

interface EcosystemMetrics {
  totalMembers: number;
  activeToday: number;
  threadsCreated: number;
  messagesExchanged: number;
  regionalHubs: number;
  familiesProtected: number;
  assetsSecured: number;
  guardiansCertified: number;
  nftsMinted: number;
  communityEngagementScore: number;
}

interface WeeklyReport {
  weekStartDate: Date;
  weekEndDate: Date;
  metrics: EcosystemMetrics;
  highlights: string[];
  growthPercentage: number;
  nextWeekFocus: string;
  generatedAt: Date;
}

class MailchimpReportsService {
  private apiKey: string;
  private serverPrefix: string;
  private listId: string;
  private apiUrl: string;

  constructor(apiKey: string, serverPrefix: string, listId: string) {
    this.apiKey = apiKey;
    this.serverPrefix = serverPrefix;
    this.listId = listId;
    this.apiUrl = `https://${serverPrefix}.api.mailchimp.com/3.0`;
  }

  /**
   * Generate weekly ecosystem metrics report
   */
  private generateWeeklyReport(): WeeklyReport {
    const now = new Date();
    const weekStart = startOfWeek(now);
    const weekEnd = endOfWeek(now);

    // Mock metrics - in production, these would come from database
    const metrics: EcosystemMetrics = {
      totalMembers: 14672,
      activeToday: 2341,
      threadsCreated: 287,
      messagesExchanged: 8934,
      regionalHubs: 12,
      familiesProtected: 50,
      assetsSecured: 4150000,
      guardiansCertified: 342,
      nftsMinted: 89,
      communityEngagementScore: 94.2,
    };

    const highlights = [
      '🎯 3 new regional hubs activated this week',
      '👨‍👩‍👧‍👦 15 new families joined ScrollVerse protection',
      '⛓️ 12 smart contracts verified on mainnet',
      '🏆 42 guardians achieved certification',
      '💎 5 new NFTs minted and distributed',
      '🌍 Community engagement up 12% week-over-week',
    ];

    return {
      weekStartDate: weekStart,
      weekEndDate: weekEnd,
      metrics,
      highlights,
      growthPercentage: 12.5,
      nextWeekFocus: 'Expand guardian training program and activate 20 new families',
      generatedAt: now,
    };
  }

  /**
   * Create HTML email template for weekly report
   */
  private createEmailTemplate(report: WeeklyReport): string {
    const weekRange = `${format(report.weekStartDate, 'MMM d')} - ${format(report.weekEndDate, 'MMM d, yyyy')}`;

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #050505 0%, #d4af37 100%); color: white; padding: 30px; text-align: center; border-radius: 8px; }
    .header h1 { margin: 0; font-size: 28px; }
    .header p { margin: 10px 0 0 0; font-size: 14px; opacity: 0.9; }
    .section { margin: 20px 0; padding: 20px; background: #f9f9f9; border-left: 4px solid #d4af37; border-radius: 4px; }
    .section h2 { margin-top: 0; color: #050505; font-size: 18px; }
    .metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 15px 0; }
    .metric { background: white; padding: 15px; border-radius: 4px; border: 1px solid #ddd; }
    .metric-value { font-size: 24px; font-weight: bold; color: #d4af37; }
    .metric-label { font-size: 12px; color: #999; margin-top: 5px; }
    .highlights { list-style: none; padding: 0; margin: 15px 0; }
    .highlights li { padding: 8px 0; border-bottom: 1px solid #ddd; }
    .highlights li:last-child { border-bottom: none; }
    .cta-button { display: inline-block; background: #d4af37; color: #050505; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; margin: 20px 0; }
    .footer { text-align: center; font-size: 12px; color: #999; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🕋 ScrollVerse Weekly Report</h1>
      <p>Ecosystem Metrics & Community Engagement</p>
      <p>${weekRange}</p>
    </div>

    <div class="section">
      <h2>📊 This Week's Highlights</h2>
      <ul class="highlights">
        ${report.highlights.map((h) => `<li>${h}</li>`).join('')}
      </ul>
    </div>

    <div class="section">
      <h2>📈 Key Metrics</h2>
      <div class="metrics">
        <div class="metric">
          <div class="metric-value">${report.metrics.totalMembers.toLocaleString()}</div>
          <div class="metric-label">Total Members</div>
        </div>
        <div class="metric">
          <div class="metric-value">${report.metrics.activeToday.toLocaleString()}</div>
          <div class="metric-label">Active Today</div>
        </div>
        <div class="metric">
          <div class="metric-value">${report.metrics.familiesProtected}</div>
          <div class="metric-label">Families Protected</div>
        </div>
        <div class="metric">
          <div class="metric-value">$${(report.metrics.assetsSecured / 1000000).toFixed(1)}M</div>
          <div class="metric-label">Assets Secured</div>
        </div>
        <div class="metric">
          <div class="metric-value">${report.metrics.guardiansCertified}</div>
          <div class="metric-label">Guardians Certified</div>
        </div>
        <div class="metric">
          <div class="metric-value">${report.metrics.communityEngagementScore.toFixed(1)}%</div>
          <div class="metric-label">Engagement Score</div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>🎯 Growth & Momentum</h2>
      <p><strong>Week-over-Week Growth:</strong> <span style="color: #d4af37; font-weight: bold;">+${report.growthPercentage}%</span></p>
      <p><strong>Next Week Focus:</strong> ${report.nextWeekFocus}</p>
    </div>

    <div class="section" style="text-align: center;">
      <a href="https://voltronhq-kjftutkm.manus.space/scrollverse/metrics" class="cta-button">View Full Dashboard</a>
    </div>

    <div class="footer">
      <p>🕋 ScrollVerse Ecosystem | Where Love Becomes Law. Legacy Becomes Infinity. 44:Omni × ∞</p>
      <p>Automated weekly report sent Monday 11 AM EST</p>
      <p>© 2026 ScrollVerse. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `;
  }

  /**
   * Send weekly report to Mailchimp audience
   */
  async sendWeeklyReport(): Promise<boolean> {
    try {
      const report = this.generateWeeklyReport();
      const emailTemplate = this.createEmailTemplate(report);

      // Create campaign
      const campaignResponse = await axios.post(
        `${this.apiUrl}/campaigns`,
        {
          type: 'regular',
          recipients: {
            list_id: this.listId,
          },
          settings: {
            subject_line: `🕋 ScrollVerse Weekly Report - ${format(report.weekStartDate, 'MMM d, yyyy')}`,
            preview_text: `Ecosystem metrics, community highlights, and growth updates for the week of ${format(report.weekStartDate, 'MMM d')}`,
            title: `ScrollVerse Weekly Report - Week of ${format(report.weekStartDate, 'MMM d')}`,
            from_name: 'ScrollVerse Team',
            reply_to: 'reports@scrollverse.io',
          },
        },
        {
          auth: {
            username: 'anystring',
            password: this.apiKey,
          },
        }
      );

      const campaignId = campaignResponse.data.id;

      // Set campaign content
      await axios.put(
        `${this.apiUrl}/campaigns/${campaignId}/content`,
        {
          html: emailTemplate,
        },
        {
          auth: {
            username: 'anystring',
            password: this.apiKey,
          },
        }
      );

      // Schedule campaign for Monday 11 AM EST
      const nextMonday = this.getNextMonday();
      const scheduleTime = new Date(nextMonday);
      scheduleTime.setHours(11, 0, 0, 0);

      await axios.post(
        `${this.apiUrl}/campaigns/${campaignId}/actions/schedule`,
        {
          schedule_time: scheduleTime.toISOString(),
        },
        {
          auth: {
            username: 'anystring',
            password: this.apiKey,
          },
        }
      );

      console.log(`✅ Weekly report scheduled for ${scheduleTime.toISOString()}`);
      return true;
    } catch (error) {
      console.error('❌ Failed to send weekly report:', error);
      return false;
    }
  }

  /**
   * Get next Monday date
   */
  private getNextMonday(): Date {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + daysUntilMonday);
    return nextMonday;
  }

  /**
   * Send immediate test report
   */
  async sendTestReport(testEmail: string): Promise<boolean> {
    try {
      const report = this.generateWeeklyReport();
      const emailTemplate = this.createEmailTemplate(report);

      // Create test campaign
      const campaignResponse = await axios.post(
        `${this.apiUrl}/campaigns`,
        {
          type: 'regular',
          recipients: {
            list_id: this.listId,
          },
          settings: {
            subject_line: `[TEST] ScrollVerse Weekly Report - ${format(report.weekStartDate, 'MMM d, yyyy')}`,
            preview_text: 'Test report for ScrollVerse ecosystem metrics',
            title: `[TEST] ScrollVerse Weekly Report`,
            from_name: 'ScrollVerse Team',
            reply_to: 'reports@scrollverse.io',
          },
        },
        {
          auth: {
            username: 'anystring',
            password: this.apiKey,
          },
        }
      );

      const campaignId = campaignResponse.data.id;

      // Set content
      await axios.put(
        `${this.apiUrl}/campaigns/${campaignId}/content`,
        {
          html: emailTemplate,
        },
        {
          auth: {
            username: 'anystring',
            password: this.apiKey,
          },
        }
      );

      // Send test
      await axios.post(
        `${this.apiUrl}/campaigns/${campaignId}/actions/test`,
        {
          test_emails: [testEmail],
        },
        {
          auth: {
            username: 'anystring',
            password: this.apiKey,
          },
        }
      );

      console.log(`✅ Test report sent to ${testEmail}`);
      return true;
    } catch (error) {
      console.error('❌ Failed to send test report:', error);
      return false;
    }
  }
}

// Create singleton instance
let reportsService: MailchimpReportsService | null = null;

/**
 * Initialize Mailchimp reports service
 */
export function initializeMailchimpReports(apiKey: string, serverPrefix: string, listId: string): MailchimpReportsService {
  if (!reportsService) {
    reportsService = new MailchimpReportsService(apiKey, serverPrefix, listId);
  }
  return reportsService;
}

/**
 * Get Mailchimp reports service instance
 */
export function getMailchimpReports(): MailchimpReportsService {
  if (!reportsService) {
    const apiKey = process.env.MAILCHIMP_API_KEY || '';
    const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX || 'us3';
    const listId = process.env.MAILCHIMP_LIST_ID || '';
    reportsService = new MailchimpReportsService(apiKey, serverPrefix, listId);
  }
  return reportsService;
}

/**
 * Send weekly report (convenience function)
 */
export async function sendWeeklyReport(): Promise<boolean> {
  const service = getMailchimpReports();
  return await service.sendWeeklyReport();
}

/**
 * Send test report (convenience function)
 */
export async function sendTestReport(testEmail: string): Promise<boolean> {
  const service = getMailchimpReports();
  return await service.sendTestReport(testEmail);
}

// Export service factory
export const createMailchimpReportsService = (apiKey: string, serverPrefix: string, listId: string) => {
  return new MailchimpReportsService(apiKey, serverPrefix, listId);
};

// Export types
export type { EcosystemMetrics, WeeklyReport };

/**
 * Mailchimp Integration Service
 * Handles email marketing automation for ScrollVerse ecosystem
 * Kevin Gold (kevin_gold@intuit.com) - Account Executive
 * 
 * Features:
 * - Weekly ecosystem metrics reports
 * - Community engagement campaigns
 * - Guardian training notifications
 * - Family protection alerts
 * - Growth tracking and analytics
 */

import axios, { AxiosInstance } from 'axios';

interface MailchimpConfig {
  apiKey: string;
  serverPrefix: string;
  listId: string;
}

interface SubscriberData {
  email: string;
  firstName: string;
  lastName: string;
  role: 'family' | 'guardian' | 'stakeholder' | 'community';
  tags?: string[];
}

interface CampaignData {
  title: string;
  subject: string;
  previewText: string;
  fromName: string;
  replyTo: string;
  htmlContent: string;
  listId: string;
}

export class MailchimpService {
  private client: AxiosInstance;
  private config: MailchimpConfig;

  constructor(apiKey: string, serverPrefix: string, listId: string) {
    this.config = { apiKey, serverPrefix, listId };
    
    this.client = axios.create({
      baseURL: `https://${serverPrefix}.api.mailchimp.com/3.0`,
      auth: {
        username: 'anystring',
        password: apiKey,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Subscribe a user to the ScrollVerse mailing list
   */
  async subscribeUser(data: SubscriberData): Promise<any> {
    try {
      const response = await this.client.post(
        `/lists/${this.config.listId}/members`,
        {
          email_address: data.email,
          status: 'subscribed',
          merge_fields: {
            FNAME: data.firstName,
            LNAME: data.lastName,
            ROLE: data.role,
          },
          tags: data.tags || [],
        }
      );
      return response.data;
    } catch (error) {
      console.error('Mailchimp subscription error:', error);
      throw error;
    }
  }

  /**
   * Send weekly ecosystem metrics report
   */
  async sendWeeklyMetricsReport(
    recipientEmail: string,
    metrics: {
      communityMembers: number;
      familiesProtected: number;
      assetsSecured: number;
      guardiansTrained: number;
      systemUptime: number;
      weeklyGrowth: number;
    }
  ): Promise<any> {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background-color: #0f172a; color: #e2e8f0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #d4af37 0%, #00d9ff 100%); padding: 20px; border-radius: 8px; text-align: center; }
            .header h1 { color: #0f172a; margin: 0; }
            .metric { background: #1e293b; padding: 15px; margin: 10px 0; border-left: 4px solid #d4af37; border-radius: 4px; }
            .metric-label { color: #94a3b8; font-size: 12px; text-transform: uppercase; }
            .metric-value { color: #d4af37; font-size: 24px; font-weight: bold; }
            .footer { text-align: center; margin-top: 20px; color: #64748b; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🕋 ScrollVerse Weekly Report</h1>
            </div>
            
            <div style="margin: 20px 0;">
              <h2 style="color: #d4af37;">Ecosystem Metrics</h2>
              
              <div class="metric">
                <div class="metric-label">Community Members</div>
                <div class="metric-value">${metrics.communityMembers.toLocaleString()}</div>
              </div>
              
              <div class="metric">
                <div class="metric-label">Families Protected</div>
                <div class="metric-value">${metrics.familiesProtected}</div>
              </div>
              
              <div class="metric">
                <div class="metric-label">Assets Secured</div>
                <div class="metric-value">$${(metrics.assetsSecured / 1000000).toFixed(2)}M</div>
              </div>
              
              <div class="metric">
                <div class="metric-label">Guardians Trained</div>
                <div class="metric-value">${metrics.guardiansTrained}</div>
              </div>
              
              <div class="metric">
                <div class="metric-label">System Uptime</div>
                <div class="metric-value">${metrics.systemUptime}%</div>
              </div>
              
              <div class="metric">
                <div class="metric-label">Weekly Growth</div>
                <div class="metric-value">+${metrics.weeklyGrowth}%</div>
              </div>
            </div>
            
            <div class="footer">
              <p>Where Love Becomes Law. Legacy Becomes Infinity. 44:Omni × ∞</p>
              <p>© 2026 ScrollVerse. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    try {
      // Create and send campaign
      const campaign = await this.client.post('/campaigns', {
        type: 'regular',
        recipients: {
          list_id: this.config.listId,
        },
        settings: {
          subject_line: `ScrollVerse Weekly Report - ${new Date().toLocaleDateString()}`,
          preview_text: 'Your weekly ecosystem metrics',
          title: `Weekly Report ${new Date().toLocaleDateString()}`,
          from_name: 'ScrollVerse',
          reply_to: 'kevin_gold@intuit.com',
        },
      });

      // Set campaign content
      await this.client.put(`/campaigns/${campaign.data.id}/content`, {
        html: htmlContent,
      });

      // Send campaign
      await this.client.post(`/campaigns/${campaign.data.id}/actions/send`);

      return campaign.data;
    } catch (error) {
      console.error('Mailchimp campaign error:', error);
      throw error;
    }
  }

  /**
   * Send guardian training notification
   */
  async sendGuardianTrainingNotification(
    recipientEmail: string,
    guardianName: string,
    trainingModule: string
  ): Promise<any> {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background-color: #0f172a; color: #e2e8f0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #d4af37 0%, #00d9ff 100%); padding: 20px; border-radius: 8px; text-align: center; }
            .content { background: #1e293b; padding: 20px; margin: 20px 0; border-radius: 8px; }
            .cta-button { background: #d4af37; color: #0f172a; padding: 12px 24px; border-radius: 4px; text-decoration: none; display: inline-block; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🕋 Guardian Training Module</h1>
            </div>
            
            <div class="content">
              <p>Hello ${guardianName},</p>
              
              <p>Your new training module is ready: <strong>${trainingModule}</strong></p>
              
              <p>As a guardian in the ScrollVerse ecosystem, your training is crucial to protecting families and immortalizing legacies.</p>
              
              <p>Complete this module to unlock new guardian capabilities and advance your role.</p>
              
              <a href="https://voltronhq-kjftutkm.manus.space/scrollverse" class="cta-button">Start Training</a>
              
              <p>Questions? Contact your regional hub coordinator.</p>
              
              <p>In service of protection,<br/>ScrollVerse Team</p>
            </div>
          </div>
        </body>
      </html>
    `;

    try {
      const response = await this.client.post('/messages', {
        key: this.config.apiKey,
        message: {
          html: htmlContent,
          subject: `Guardian Training: ${trainingModule}`,
          from_email: 'kevin_gold@intuit.com',
          from_name: 'ScrollVerse',
          to: [
            {
              email: recipientEmail,
              name: guardianName,
              type: 'to',
            },
          ],
        },
      });
      return response.data;
    } catch (error) {
      console.error('Mailchimp message error:', error);
      throw error;
    }
  }

  /**
   * Send family protection activation notification
   */
  async sendFamilyProtectionNotification(
    recipientEmail: string,
    familyName: string,
    protectionDetails: {
      assetsSecured: number;
      primaryGuardian: string;
      activationDate: string;
    }
  ): Promise<any> {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background-color: #0f172a; color: #e2e8f0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #d4af37 0%, #00d9ff 100%); padding: 20px; border-radius: 8px; text-align: center; }
            .content { background: #1e293b; padding: 20px; margin: 20px 0; border-radius: 8px; }
            .detail { background: #0f172a; padding: 10px; margin: 10px 0; border-left: 4px solid #00d9ff; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🕋 Family Protection Activated</h1>
            </div>
            
            <div class="content">
              <p>Dear ${familyName},</p>
              
              <p>Your family protection has been successfully activated on the ScrollVerse ecosystem!</p>
              
              <div class="detail">
                <strong>Assets Secured:</strong> $${(protectionDetails.assetsSecured / 1000000).toFixed(2)}M
              </div>
              
              <div class="detail">
                <strong>Primary Guardian:</strong> ${protectionDetails.primaryGuardian}
              </div>
              
              <div class="detail">
                <strong>Activation Date:</strong> ${protectionDetails.activationDate}
              </div>
              
              <p>Your family legacy is now protected forever on the blockchain. Your guardians have been notified and are standing by to protect your assets and immortalize your story.</p>
              
              <p>View your protection dashboard: <a href="https://voltronhq-kjftutkm.manus.space/scrollverse/metrics" style="color: #d4af37;">ScrollVerse Metrics</a></p>
              
              <p>In eternal protection,<br/>ScrollVerse Team</p>
            </div>
          </div>
        </body>
      </html>
    `;

    try {
      const response = await this.client.post('/messages', {
        key: this.config.apiKey,
        message: {
          html: htmlContent,
          subject: 'Your Family Protection is Now Active',
          from_email: 'kevin_gold@intuit.com',
          from_name: 'ScrollVerse',
          to: [
            {
              email: recipientEmail,
              name: familyName,
              type: 'to',
            },
          ],
        },
      });
      return response.data;
    } catch (error) {
      console.error('Mailchimp message error:', error);
      throw error;
    }
  }

  /**
   * Get list statistics
   */
  async getListStats(): Promise<any> {
    try {
      const response = await this.client.get(`/lists/${this.config.listId}/stats`);
      return response.data;
    } catch (error) {
      console.error('Mailchimp stats error:', error);
      throw error;
    }
  }

  /**
   * Get member count
   */
  async getMemberCount(): Promise<number> {
    try {
      const response = await this.client.get(`/lists/${this.config.listId}`);
      return response.data.stats.member_count;
    } catch (error) {
      console.error('Mailchimp member count error:', error);
      throw error;
    }
  }
}

// Export singleton instance
let mailchimpInstance: MailchimpService | null = null;

export function initializeMailchimp(
  apiKey: string,
  serverPrefix: string,
  listId: string
): MailchimpService {
  if (!mailchimpInstance) {
    mailchimpInstance = new MailchimpService(apiKey, serverPrefix, listId);
  }
  return mailchimpInstance;
}

export function getMailchimpService(): MailchimpService {
  if (!mailchimpInstance) {
    throw new Error('Mailchimp service not initialized. Call initializeMailchimp first.');
  }
  return mailchimpInstance;
}

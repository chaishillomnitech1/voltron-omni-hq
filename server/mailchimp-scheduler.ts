import cron from 'node-cron';
import { sendWeeklyReport, sendTestReport } from './mailchimp-reports';

/**
 * ScrollVerse Mailchimp Email Scheduler
 * 
 * Automated weekly report scheduling and delivery
 * Default: Every Monday at 11:00 AM EST
 * 
 * Where Love Becomes Law. Legacy Becomes Infinity. 44:Omni × ∞
 */

interface SchedulerConfig {
  enabled: boolean;
  cronExpression: string;
  timezone: string;
  testMode: boolean;
}

class MailchimpScheduler {
  private config: SchedulerConfig;
  private job: cron.ScheduledTask | null = null;

  constructor(config: Partial<SchedulerConfig> = {}) {
    this.config = {
      enabled: config.enabled !== false,
      cronExpression: config.cronExpression || '0 11 * * 1', // Monday 11 AM
      timezone: config.timezone || 'America/New_York',
      testMode: config.testMode || false,
    };
  }

  /**
   * Start the scheduler
   */
  start(): void {
    if (!this.config.enabled) {
      console.log('📧 Mailchimp scheduler is disabled');
      return;
    }

    if (this.job) {
      console.log('⚠️  Scheduler already running');
      return;
    }

    try {
      this.job = cron.schedule(
        this.config.cronExpression,
        async () => {
          await this.executeWeeklyReport();
        },
        {
          timezone: this.config.timezone,
        }
      );

      console.log(`✅ Mailchimp scheduler started`);
      console.log(`   Cron: ${this.config.cronExpression}`);
      console.log(`   Timezone: ${this.config.timezone}`);
      console.log(`   Next run: ${this.getNextRunTime()}`);
    } catch (error) {
      console.error('❌ Failed to start scheduler:', error);
    }
  }

  /**
   * Stop the scheduler
   */
  stop(): void {
    if (this.job) {
      this.job.stop();
      this.job = null;
      console.log('⏹️  Mailchimp scheduler stopped');
    }
  }

  /**
   * Execute weekly report
   */
  private async executeWeeklyReport(): Promise<void> {
    const startTime = Date.now();
    const weekDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    console.log(`\n🚀 Starting weekly report execution at ${new Date().toISOString()}`);
    console.log(`   Week: ${weekDate}`);

    try {
      // Send weekly report
      const success = await sendWeeklyReport();

      const duration = ((Date.now() - startTime) / 1000).toFixed(2);

      if (success) {
        console.log(`✅ Weekly report sent successfully`);
        console.log(`   Duration: ${duration}s`);
      } else {
        console.error(`❌ Weekly report failed to send`);
      }
    } catch (error) {
      console.error(`❌ Error executing weekly report:`, error);
    }
  }

  /**
   * Get next scheduled run time
   */
  getNextRunTime(): string {
    if (!this.job) {
      return 'Not scheduled';
    }

    try {
      const nextDate = this.job.nextDate();
      return nextDate.toString();
    } catch {
      return 'Unable to calculate';
    }
  }

  /**
   * Manually trigger weekly report (for testing)
   */
  async triggerManualReport(): Promise<void> {
    console.log('🔔 Triggering manual weekly report...');
    await this.executeWeeklyReport();
  }

  /**
   * Send test report to admin
   */
  async sendTestReportToAdmin(adminEmail: string): Promise<void> {
    console.log(`📧 Sending test report to ${adminEmail}...`);
    try {
      const success = await sendTestReport(adminEmail);
      if (success) {
        console.log(`✅ Test report sent successfully`);
      } else {
        console.error(`❌ Test report failed to send`);
      }
    } catch (error) {
      console.error(`❌ Error sending test report:`, error);
    }
  }

  /**
   * Get scheduler status
   */
  getStatus(): {
    enabled: boolean;
    running: boolean;
    cronExpression: string;
    timezone: string;
    nextRun: string;
  } {
    return {
      enabled: this.config.enabled,
      running: this.job !== null,
      cronExpression: this.config.cronExpression,
      timezone: this.config.timezone,
      nextRun: this.getNextRunTime(),
    };
  }

  /**
   * Update scheduler configuration
   */
  updateConfig(config: Partial<SchedulerConfig>): void {
    const wasRunning = this.job !== null;

    if (wasRunning) {
      this.stop();
    }

    this.config = {
      ...this.config,
      ...config,
    };

    if (wasRunning) {
      this.start();
    }

    console.log('✅ Scheduler configuration updated');
  }
}

// Create and export singleton instance
let schedulerInstance: MailchimpScheduler | null = null;

export function initializeMailchimpScheduler(
  config: Partial<SchedulerConfig> = {}
): MailchimpScheduler {
  if (!schedulerInstance) {
    schedulerInstance = new MailchimpScheduler(config);
  }
  return schedulerInstance;
}

export function getMailchimpScheduler(): MailchimpScheduler {
  if (!schedulerInstance) {
    schedulerInstance = new MailchimpScheduler();
  }
  return schedulerInstance;
}

export type { SchedulerConfig };

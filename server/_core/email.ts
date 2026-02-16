import nodemailer from 'nodemailer';
import { ENV } from './env';

let transporter: nodemailer.Transporter | null = null;
let isInitialized = false;

export async function initEmailService(): Promise<boolean> {
  if (isInitialized) return true;

  // Check if SMTP is configured
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('[Email] SMTP credentials not configured - email notifications disabled');
    isInitialized = true;
    return false;
  }

  try {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Test connection
    await transporter.verify();
    console.log('[Email] Service initialized successfully');
    isInitialized = true;
    return true;
  } catch (error) {
    console.warn('[Email] Failed to initialize:', error);
    isInitialized = true;
    return false;
  }
}

export async function sendEmailNotification(
  to: string,
  subject: string,
  html: string
): Promise<boolean> {
  if (!transporter) {
    console.warn('[Email] Service not initialized');
    return false;
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@voltron-omni.com',
      to,
      subject,
      html,
    });
    console.log(`[Email] Sent to ${to}: ${subject}`);
    return true;
  } catch (error) {
    console.error('[Email] Failed to send:', error);
    return false;
  }
}

export function createGitHubEventEmailTemplate(event: {
  repository: string;
  eventType: string;
  author: string;
  title: string;
  description?: string;
  url?: string;
}): string {
  const eventEmoji = {
    push: '📤',
    pull_request: '🔀',
    issue: '⚠️',
    release: '🎉',
  }[event.eventType] || '📢';

  const eventLabel = event.eventType
    .replace(/_/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #d4af37 0%, #ff6b9d 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .header h2 { margin: 0; font-size: 24px; }
          .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; }
          .value { color: #333; margin-top: 5px; }
          .button { display: inline-block; background: #d4af37; color: black; padding: 10px 20px; border-radius: 4px; text-decoration: none; font-weight: bold; margin-top: 15px; }
          .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>${eventEmoji} ${eventLabel}</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Repository</div>
              <div class="value">${event.repository}</div>
            </div>
            <div class="field">
              <div class="label">Author</div>
              <div class="value">${event.author}</div>
            </div>
            <div class="field">
              <div class="label">Title</div>
              <div class="value">${event.title}</div>
            </div>
            ${
              event.description
                ? `
            <div class="field">
              <div class="label">Description</div>
              <div class="value">${event.description}</div>
            </div>
            `
                : ''
            }
            ${
              event.url
                ? `
            <a href="${event.url}" class="button">View on GitHub</a>
            `
                : ''
            }
          </div>
          <div class="footer">
            <p>Voltron Omni Portal • ${new Date().toLocaleString()}</p>
            <p>This is an automated notification. Do not reply to this email.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function createChatNotificationEmailTemplate(message: {
  author: string;
  message: string;
  timestamp: number;
}): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #00d9ff 0%, #d4af37 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .header h2 { margin: 0; font-size: 24px; }
          .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
          .message-box { background: white; padding: 15px; border-left: 4px solid #00d9ff; margin: 15px 0; }
          .author { font-weight: bold; color: #d4af37; }
          .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>💬 New Chat Message</h2>
          </div>
          <div class="content">
            <p>You have a new message in the Voltron Portal chat:</p>
            <div class="message-box">
              <div class="author">${message.author}</div>
              <p>${message.message}</p>
              <small>${new Date(message.timestamp).toLocaleString()}</small>
            </div>
          </div>
          <div class="footer">
            <p>Voltron Omni Portal • ${new Date().toLocaleString()}</p>
            <p>This is an automated notification. Do not reply to this email.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

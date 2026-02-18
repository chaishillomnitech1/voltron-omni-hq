import { describe, it, expect, beforeAll } from 'vitest';
import nodemailer from 'nodemailer';

describe('SMTP Email Service', () => {
  let transporter: any;

  beforeAll(() => {
    // Create transporter with environment variables
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  });

  it('should validate SMTP credentials by verifying connection', async () => {
    try {
      // Verify SMTP connection
      const verified = await transporter.verify();
      expect(verified).toBe(true);
    } catch (error) {
      console.error('SMTP verification failed:', error);
      throw new Error(`SMTP configuration invalid: ${error}`);
    }
  });

  it('should send a test email successfully', async () => {
    try {
      const info = await transporter.sendMail({
        from: process.env.SMTP_FROM_EMAIL,
        to: process.env.SMTP_USER, // Send to self for testing
        subject: 'Voltron Portal - SMTP Test',
        html: '<h1>SMTP Configuration Successful</h1><p>Your email service is working correctly.</p>',
      });

      expect(info.messageId).toBeDefined();
      expect(info.response).toContain('250'); // SMTP success code
    } catch (error) {
      console.error('Email send failed:', error);
      throw new Error(`Failed to send test email: ${error}`);
    }
  });
});

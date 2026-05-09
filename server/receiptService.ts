import { PDFDocument, PDFPage, rgb } from 'pdf-lib';
import { storagePut } from './storage';

/**
 * RECEIPT GENERATION SERVICE
 * 
 * Generates professional PDF receipts for Stripe payments
 * Stores receipts in S3 for download and email delivery
 */

export interface ReceiptData {
  transactionId: string;
  userId: string;
  amount: number;
  currency: string;
  description: string;
  status: string;
  createdAt: Date;
  customerName?: string;
  customerEmail?: string;
  paymentMethod?: string;
  invoiceNumber?: string;
}

/**
 * Generate PDF receipt for a transaction
 */
export async function generatePDFReceipt(data: ReceiptData): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]); // Letter size

  // Colors
  const primaryColor = rgb(0, 0.85, 1); // Cyan
  const textColor = rgb(0.2, 0.2, 0.2); // Dark gray
  const lightGray = rgb(0.95, 0.95, 0.95);
  const successGreen = rgb(0.2, 0.8, 0.2);

  // Header Background
  page.drawRectangle({
    x: 0,
    y: 700,
    width: 612,
    height: 92,
    color: primaryColor,
  });

  // Company Logo & Title
  page.drawText('SCROLLVERSE', {
    x: 50,
    y: 750,
    size: 32,
    color: rgb(1, 1, 1),
    font: await pdfDoc.embedFont('Helvetica-Bold'),
  });

  page.drawText('RECEIPT', {
    x: 50,
    y: 720,
    size: 14,
    color: rgb(1, 1, 1),
  });

  // Receipt Number & Date (Top Right)
  page.drawText(`Receipt #${data.invoiceNumber || data.transactionId.substring(0, 8).toUpperCase()}`, {
    x: 350,
    y: 750,
    size: 12,
    color: textColor,
    font: await pdfDoc.embedFont('Helvetica-Bold'),
  });

  page.drawText(`Date: ${new Date(data.createdAt).toLocaleDateString()}`, {
    x: 350,
    y: 730,
    size: 11,
    color: textColor,
  });

  // Status Badge
  const statusColor = data.status === 'succeeded' ? successGreen : rgb(1, 0.7, 0);
  page.drawRectangle({
    x: 350,
    y: 705,
    width: 100,
    height: 20,
    color: statusColor,
  });

  page.drawText(data.status.toUpperCase(), {
    x: 360,
    y: 708,
    size: 11,
    color: rgb(1, 1, 1),
    font: await pdfDoc.embedFont('Helvetica-Bold'),
  });

  // Divider
  page.drawLine({
    start: { x: 50, y: 690 },
    end: { x: 562, y: 690 },
    thickness: 1,
    color: rgb(0.9, 0.9, 0.9),
  });

  // Bill To Section
  page.drawText('BILL TO:', {
    x: 50,
    y: 670,
    size: 11,
    color: textColor,
    font: await pdfDoc.embedFont('Helvetica-Bold'),
  });

  page.drawText(data.customerName || 'Customer', {
    x: 50,
    y: 650,
    size: 12,
    color: textColor,
    font: await pdfDoc.embedFont('Helvetica-Bold'),
  });

  page.drawText(data.customerEmail || 'N/A', {
    x: 50,
    y: 630,
    size: 11,
    color: textColor,
  });

  // Company Info (Right side)
  page.drawText('SCROLLVERSE INC.', {
    x: 350,
    y: 670,
    size: 11,
    color: textColor,
    font: await pdfDoc.embedFont('Helvetica-Bold'),
  });

  page.drawText('support@scrollverse.co', {
    x: 350,
    y: 650,
    size: 11,
    color: textColor,
  });

  page.drawText('https://scrollverse.co', {
    x: 350,
    y: 630,
    size: 11,
    color: primaryColor,
  });

  // Items Section Header
  page.drawRectangle({
    x: 50,
    y: 600,
    width: 512,
    height: 25,
    color: lightGray,
  });

  page.drawText('DESCRIPTION', {
    x: 60,
    y: 608,
    size: 11,
    color: textColor,
    font: await pdfDoc.embedFont('Helvetica-Bold'),
  });

  page.drawText('AMOUNT', {
    x: 500,
    y: 608,
    size: 11,
    color: textColor,
    font: await pdfDoc.embedFont('Helvetica-Bold'),
  });

  // Item Details
  const itemY = 575;
  page.drawText(data.description, {
    x: 60,
    y: itemY,
    size: 11,
    color: textColor,
  });

  const amountText = `${data.currency.toUpperCase()} ${(data.amount / 100).toFixed(2)}`;
  page.drawText(amountText, {
    x: 500,
    y: itemY,
    size: 11,
    color: textColor,
    font: await pdfDoc.embedFont('Helvetica-Bold'),
  });

  // Divider
  page.drawLine({
    start: { x: 50, y: 560 },
    end: { x: 562, y: 560 },
    thickness: 1,
    color: rgb(0.9, 0.9, 0.9),
  });

  // Totals Section
  const totalY = 530;

  // Subtotal
  page.drawText('Subtotal:', {
    x: 350,
    y: totalY,
    size: 11,
    color: textColor,
  });

  page.drawText(amountText, {
    x: 500,
    y: totalY,
    size: 11,
    color: textColor,
  });

  // Tax (if applicable)
  const taxAmount = Math.round(data.amount * 0.1); // 10% tax example
  page.drawText('Tax (10%):', {
    x: 350,
    y: totalY - 20,
    size: 11,
    color: textColor,
  });

  page.drawText(`${data.currency.toUpperCase()} ${(taxAmount / 100).toFixed(2)}`, {
    x: 500,
    y: totalY - 20,
    size: 11,
    color: textColor,
  });

  // Divider
  page.drawLine({
    start: { x: 350, y: totalY - 35 },
    end: { x: 562, y: totalY - 35 },
    thickness: 2,
    color: textColor,
  });

  // Total Amount
  const finalTotal = data.amount + taxAmount;
  page.drawText('TOTAL:', {
    x: 350,
    y: totalY - 55,
    size: 13,
    color: primaryColor,
    font: await pdfDoc.embedFont('Helvetica-Bold'),
  });

  page.drawText(`${data.currency.toUpperCase()} ${(finalTotal / 100).toFixed(2)}`, {
    x: 500,
    y: totalY - 55,
    size: 13,
    color: primaryColor,
    font: await pdfDoc.embedFont('Helvetica-Bold'),
  });

  // Payment Method
  page.drawRectangle({
    x: 50,
    y: 280,
    width: 512,
    height: 60,
    color: lightGray,
  });

  page.drawText('PAYMENT METHOD', {
    x: 60,
    y: 330,
    size: 11,
    color: textColor,
    font: await pdfDoc.embedFont('Helvetica-Bold'),
  });

  page.drawText(data.paymentMethod || 'Credit Card', {
    x: 60,
    y: 310,
    size: 11,
    color: textColor,
  });

  page.drawText(`Transaction ID: ${data.transactionId}`, {
    x: 60,
    y: 290,
    size: 10,
    color: rgb(0.6, 0.6, 0.6),
  });

  // Footer
  page.drawLine({
    start: { x: 50, y: 250 },
    end: { x: 562, y: 250 },
    thickness: 1,
    color: rgb(0.9, 0.9, 0.9),
  });

  page.drawText('Thank you for your purchase!', {
    x: 50,
    y: 230,
    size: 12,
    color: primaryColor,
    font: await pdfDoc.embedFont('Helvetica-Bold'),
  });

  page.drawText(
    'Your receipt has been saved to your account and a copy has been sent to your email.',
    {
      x: 50,
      y: 210,
      size: 10,
      color: rgb(0.6, 0.6, 0.6),
    }
  );

  page.drawText(
    'For support, visit https://scrollverse.co/support or email support@scrollverse.co',
    {
      x: 50,
      y: 190,
      size: 9,
      color: rgb(0.7, 0.7, 0.7),
    }
  );

  // Security Notice
  page.drawRectangle({
    x: 50,
    y: 140,
    width: 512,
    height: 40,
    color: rgb(0.98, 0.98, 1),
    borderColor: rgb(0.8, 0.9, 1),
    borderWidth: 1,
  });

  page.drawText('🔒 Secure Transaction', {
    x: 60,
    y: 165,
    size: 10,
    color: primaryColor,
    font: await pdfDoc.embedFont('Helvetica-Bold'),
  });

  page.drawText(
    'This transaction is secured with industry-standard encryption. Your payment information is protected.',
    {
      x: 60,
      y: 145,
      size: 9,
      color: rgb(0.6, 0.6, 0.6),
    }
  );

  // Page number
  page.drawText(`Page 1 of 1 | Generated on ${new Date().toLocaleString()}`, {
    x: 50,
    y: 30,
    size: 8,
    color: rgb(0.8, 0.8, 0.8),
  });

  // Convert to bytes
  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

/**
 * Save receipt to S3 storage
 */
export async function saveReceiptToStorage(
  receiptBuffer: Buffer,
  transactionId: string,
  userId: string
): Promise<{ url: string; key: string }> {
  const key = `receipts/${userId}/${transactionId}-${Date.now()}.pdf`;

  const result = await storagePut(key, receiptBuffer, 'application/pdf');

  return {
    url: result.url,
    key: result.key,
  };
}

/**
 * Generate and save receipt, return download URL
 */
export async function generateAndSaveReceipt(
  data: ReceiptData
): Promise<{ url: string; key: string }> {
  // Generate PDF
  const pdfBuffer = await generatePDFReceipt(data);

  // Save to S3
  const { url, key } = await saveReceiptToStorage(
    pdfBuffer,
    data.transactionId,
    data.userId
  );

  return { url, key };
}

/**
 * Generate receipt batch for multiple transactions
 */
export async function generateBatchReceipts(
  transactions: ReceiptData[]
): Promise<Array<{ transactionId: string; url: string; key: string }>> {
  const results = [];

  for (const transaction of transactions) {
    try {
      const { url, key } = await generateAndSaveReceipt(transaction);
      results.push({
        transactionId: transaction.transactionId,
        url,
        key,
      });
    } catch (error) {
      console.error(`Failed to generate receipt for ${transaction.transactionId}:`, error);
    }
  }

  return results;
}

/**
 * Generate receipt summary for email
 */
export function generateReceiptSummary(data: ReceiptData): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #00d9ff;">Receipt Summary</h2>
      
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Receipt #:</strong> ${data.invoiceNumber || data.transactionId.substring(0, 8)}</p>
        <p><strong>Date:</strong> ${new Date(data.createdAt).toLocaleDateString()}</p>
        <p><strong>Status:</strong> <span style="color: ${data.status === 'succeeded' ? '#00cc00' : '#ff9900'};">${data.status.toUpperCase()}</span></p>
      </div>

      <div style="margin: 20px 0;">
        <h3>Order Details</h3>
        <p><strong>Description:</strong> ${data.description}</p>
        <p><strong>Amount:</strong> ${data.currency.toUpperCase()} ${(data.amount / 100).toFixed(2)}</p>
        <p><strong>Transaction ID:</strong> ${data.transactionId}</p>
      </div>

      <div style="background-color: #f0f9ff; padding: 15px; border-left: 4px solid #00d9ff; margin: 20px 0;">
        <p style="margin: 0; color: #00d9ff;"><strong>Your receipt has been attached to this email.</strong></p>
      </div>

      <p style="color: #999; font-size: 12px; margin-top: 30px;">
        For support, visit https://scrollverse.co/support or email support@scrollverse.co
      </p>
    </div>
  `;
}

export default {
  generatePDFReceipt,
  saveReceiptToStorage,
  generateAndSaveReceipt,
  generateBatchReceipts,
  generateReceiptSummary,
};

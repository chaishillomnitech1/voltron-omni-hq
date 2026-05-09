import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Loader, X } from 'lucide-react';

/**
 * ENHANCED PAYMENT FLOW COMPONENT
 * 
 * Features:
 * - Loading animations during checkout
 * - Success/error feedback modals
 * - Real-time status updates
 * - Retry mechanism
 * - Clear user feedback
 */

interface PaymentFlowProps {
  onPaymentStart?: () => void;
  onPaymentSuccess?: (sessionId: string) => void;
  onPaymentError?: (error: string) => void;
  amount: number;
  currency: string;
  description: string;
}

type PaymentStatus = 'idle' | 'loading' | 'success' | 'error';

export const PaymentFlow: React.FC<PaymentFlowProps> = ({
  onPaymentStart,
  onPaymentSuccess,
  onPaymentError,
  amount,
  currency,
  description,
}) => {
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  const handlePayment = async () => {
    try {
      setStatus('loading');
      setErrorMessage('');
      setRetryCount(0);
      onPaymentStart?.();

      // Simulate API call to create Stripe checkout session
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency,
          description,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const data = await response.json();

      if (data.success && data.sessionId) {
        setSessionId(data.sessionId);
        setStatus('success');
        setSuccessMessage(`Payment session created successfully! Redirecting to checkout...`);
        onPaymentSuccess?.(data.sessionId);

        // Redirect to Stripe checkout
        setTimeout(() => {
          window.open(data.url, '_blank');
        }, 2000);
      } else {
        throw new Error(data.error || 'Unknown error occurred');
      }
    } catch (error) {
      setStatus('error');
      const errorMsg = error instanceof Error ? error.message : 'Payment processing failed';
      setErrorMessage(errorMsg);
      onPaymentError?.(errorMsg);
    }
  };

  const handleRetry = () => {
    if (retryCount < 3) {
      setRetryCount(retryCount + 1);
      handlePayment();
    } else {
      setErrorMessage('Maximum retry attempts reached. Please contact support.');
    }
  };

  const handleClose = () => {
    setStatus('idle');
    setErrorMessage('');
    setSuccessMessage('');
    setSessionId('');
  };

  return (
    <div className="w-full">
      {/* Payment Button */}
      <button
        onClick={handlePayment}
        disabled={status === 'loading'}
        className={`w-full py-3 px-4 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
          status === 'loading'
            ? 'bg-gray-400 cursor-not-allowed'
            : status === 'success'
            ? 'bg-green-500 hover:bg-green-600'
            : status === 'error'
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-cyan-500 hover:bg-cyan-600'
        } text-white`}
      >
        {status === 'loading' && (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            Processing Payment...
          </>
        )}
        {status === 'success' && (
          <>
            <CheckCircle className="w-5 h-5" />
            Payment Successful!
          </>
        )}
        {status === 'error' && (
          <>
            <AlertCircle className="w-5 h-5" />
            Payment Failed
          </>
        )}
        {status === 'idle' && `Pay ${currency.toUpperCase()} ${(amount / 100).toFixed(2)}`}
      </button>

      {/* Loading Modal */}
      {status === 'loading' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-cyan-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-cyan-500 rounded-full animate-spin"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Processing Payment</h3>
              <p className="text-gray-600 text-center">
                Please wait while we securely process your payment...
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-cyan-500 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
              </div>
              <p className="text-sm text-gray-500">Do not close this window</p>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {status === 'success' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Payment Successful!</h3>
              <p className="text-gray-600 text-center">{successMessage}</p>
              <div className="w-full bg-gray-100 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Session ID:</p>
                <code className="text-xs font-mono text-gray-900 break-all">{sessionId}</code>
              </div>
              <div className="flex gap-3 w-full">
                <button
                  onClick={handleClose}
                  className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-lg transition-all"
                >
                  Close
                </button>
                <button
                  onClick={() => window.open('/orders', '_blank')}
                  className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all"
                >
                  View Orders
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {status === 'error' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Payment Failed</h3>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-3">{errorMessage}</p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-700">
                  <strong>Troubleshooting:</strong>
                </p>
                <ul className="text-sm text-red-600 mt-2 space-y-1">
                  <li>• Check your internet connection</li>
                  <li>• Verify your payment information</li>
                  <li>• Try a different payment method</li>
                  <li>• Contact support if problem persists</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleClose}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleRetry}
                disabled={retryCount >= 3}
                className={`flex-1 px-4 py-2 font-semibold rounded-lg transition-all ${
                  retryCount >= 3
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                {retryCount >= 3 ? 'Max Retries' : `Retry (${retryCount}/3)`}
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              Need help? Contact support@scrollverse.co
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * PAYMENT STATUS INDICATOR COMPONENT
 * Shows real-time payment processing status
 */

interface PaymentStatusIndicatorProps {
  status: PaymentStatus;
  amount?: number;
  currency?: string;
}

export const PaymentStatusIndicator: React.FC<PaymentStatusIndicatorProps> = ({
  status,
  amount,
  currency,
}) => {
  const statusConfig = {
    idle: {
      color: 'bg-gray-100 text-gray-700',
      icon: null,
      label: 'Ready to pay',
    },
    loading: {
      color: 'bg-blue-100 text-blue-700',
      icon: <Loader className="w-4 h-4 animate-spin" />,
      label: 'Processing...',
    },
    success: {
      color: 'bg-green-100 text-green-700',
      icon: <CheckCircle className="w-4 h-4" />,
      label: 'Payment successful',
    },
    error: {
      color: 'bg-red-100 text-red-700',
      icon: <AlertCircle className="w-4 h-4" />,
      label: 'Payment failed',
    },
  };

  const config = statusConfig[status];

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${config.color}`}>
      {config.icon}
      <span className="text-sm font-medium">{config.label}</span>
      {amount && currency && status === 'idle' && (
        <span className="text-sm ml-2">
          ({currency.toUpperCase()} {(amount / 100).toFixed(2)})
        </span>
      )}
    </div>
  );
};

/**
 * PAYMENT SUMMARY COMPONENT
 * Displays payment details before checkout
 */

interface PaymentSummaryProps {
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  currency: string;
  taxRate?: number;
  discountCode?: string;
  discountAmount?: number;
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  items,
  currency,
  taxRate = 0,
  discountCode,
  discountAmount = 0,
}) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax - discountAmount;

  return (
    <div className="bg-gray-50 rounded-lg p-6 space-y-4">
      <h3 className="font-bold text-lg text-gray-900">Order Summary</h3>

      {/* Items */}
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-gray-600">
              {item.name} x {item.quantity}
            </span>
            <span className="font-medium text-gray-900">
              {currency.toUpperCase()} {(item.price * item.quantity / 100).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <hr className="border-gray-200" />

      {/* Subtotal */}
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Subtotal</span>
        <span className="text-gray-900">{currency.toUpperCase()} {(subtotal / 100).toFixed(2)}</span>
      </div>

      {/* Tax */}
      {taxRate > 0 && (
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax ({(taxRate * 100).toFixed(0)}%)</span>
          <span className="text-gray-900">{currency.toUpperCase()} {(tax / 100).toFixed(2)}</span>
        </div>
      )}

      {/* Discount */}
      {discountAmount > 0 && (
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            Discount {discountCode && `(${discountCode})`}
          </span>
          <span className="text-green-600">-{currency.toUpperCase()} {(discountAmount / 100).toFixed(2)}</span>
        </div>
      )}

      <hr className="border-gray-200" />

      {/* Total */}
      <div className="flex justify-between items-center">
        <span className="font-bold text-gray-900">Total</span>
        <span className="text-2xl font-bold text-cyan-600">
          {currency.toUpperCase()} {(total / 100).toFixed(2)}
        </span>
      </div>

      {/* Security Badge */}
      <div className="flex items-center gap-2 text-xs text-gray-600 bg-white p-3 rounded">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        <span>Your payment information is secure and encrypted</span>
      </div>
    </div>
  );
};

export default PaymentFlow;

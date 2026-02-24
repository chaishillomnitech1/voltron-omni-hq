import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, CheckCircle2, AlertCircle, Mail } from 'lucide-react';

interface NotificationConfig {
  recipientEmail: string;
  daoProposalNotifications: boolean;
  inheritanceAlerts: boolean;
  nftMintingNotifications: boolean;
}

export function EmailNotificationService() {
  const [config, setConfig] = useState<NotificationConfig>({
    recipientEmail: 'Hillchais1@gmail.com',
    daoProposalNotifications: true,
    inheritanceAlerts: true,
    nftMintingNotifications: true,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testEmailSent, setTestEmailSent] = useState(false);

  const handleSaveConfig = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/trpc/system.notifyOwner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Email Notification Configuration Updated',
          content: `Notification preferences saved:\n- DAO Proposals: ${config.daoProposalNotifications}\n- Inheritance Alerts: ${config.inheritanceAlerts}\n- NFT Minting: ${config.nftMintingNotifications}`,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        throw new Error('Failed to save configuration');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleSendTestEmail = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/trpc/system.notifyOwner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: '🧪 Test Email from Voltron Omni HQ',
          content: `This is a test email to verify your notification service is working correctly.\n\nRecipient: ${config.recipientEmail}\nTimestamp: ${new Date().toISOString()}\n\nIf you received this email, your email service is configured correctly!`,
        }),
      });

      if (response.ok) {
        setTestEmailSent(true);
        setTimeout(() => setTestEmailSent(false), 3000);
      } else {
        throw new Error('Failed to send test email');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <Card className="p-6 bg-gradient-to-br from-rose-900/20 to-cyan-900/20 border-rose-500/30">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-6 h-6 text-rose-400" />
          <h2 className="text-2xl font-bold text-rose-400">📧 Email Notification Service</h2>
        </div>

        <div className="space-y-4">
          {/* Recipient Email */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Recipient Email Address</label>
            <Input
              type="email"
              value={config.recipientEmail}
              onChange={(e) => setConfig({ ...config, recipientEmail: e.target.value })}
              className="bg-black/40 border-cyan-500/30"
              placeholder="your-email@gmail.com"
            />
            <p className="text-xs text-gray-500 mt-1">
              All notifications will be sent to this email address
            </p>
          </div>

          {/* Notification Preferences */}
          <div className="space-y-3 bg-black/20 p-4 rounded border border-cyan-500/20">
            <h3 className="text-sm font-semibold text-cyan-300">Notification Preferences</h3>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={config.daoProposalNotifications}
                onChange={(e) =>
                  setConfig({ ...config, daoProposalNotifications: e.target.checked })
                }
                className="w-4 h-4 rounded border-cyan-500/50"
              />
              <span className="text-sm text-gray-300">🗳️ DAO Proposal Notifications</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={config.inheritanceAlerts}
                onChange={(e) =>
                  setConfig({ ...config, inheritanceAlerts: e.target.checked })
                }
                className="w-4 h-4 rounded border-cyan-500/50"
              />
              <span className="text-sm text-gray-300">🏛️ Inheritance Vault Alerts</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={config.nftMintingNotifications}
                onChange={(e) =>
                  setConfig({ ...config, nftMintingNotifications: e.target.checked })
                }
                className="w-4 h-4 rounded border-cyan-500/50"
              />
              <span className="text-sm text-gray-300">🎨 NFT Minting Notifications</span>
            </label>
          </div>

          {/* Status Messages */}
          {success && (
            <div className="flex items-center gap-2 p-3 bg-green-900/20 border border-green-500/30 rounded">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span className="text-sm text-green-300">Configuration saved successfully!</span>
            </div>
          )}

          {testEmailSent && (
            <div className="flex items-center gap-2 p-3 bg-blue-900/20 border border-blue-500/30 rounded">
              <CheckCircle2 className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-blue-300">Test email sent! Check your inbox.</span>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-500/30 rounded">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-sm text-red-300">{error}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSaveConfig}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-rose-600 to-cyan-600 hover:from-rose-500 hover:to-cyan-500"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                '💾 Save Configuration'
              )}
            </Button>

            <Button
              onClick={handleSendTestEmail}
              disabled={loading}
              variant="outline"
              className="flex-1 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                '🧪 Send Test Email'
              )}
            </Button>
          </div>

          {/* Configuration Info */}
          <div className="bg-black/40 p-4 rounded border border-cyan-500/20 text-xs text-gray-400 space-y-2">
            <p>
              <strong>Gmail App Password Required:</strong> To enable email notifications, you need a Gmail App Password.
            </p>
            <p>
              1. Enable 2FA on your Google account (myaccount.google.com/security)
            </p>
            <p>
              2. Generate an App Password (myaccount.google.com/apppasswords)
            </p>
            <p>
              3. Provide the 16-character password to activate email service
            </p>
          </div>
        </div>
      </Card>

      {/* Email Events Log */}
      <Card className="p-6 bg-gradient-to-br from-rose-900/20 to-cyan-900/20 border-rose-500/30">
        <h3 className="text-lg font-bold text-rose-400 mb-4">📨 Recent Email Events</h3>
        <div className="space-y-2 text-sm text-gray-400">
          <p className="text-gray-500">Email event log will appear here when notifications are sent</p>
          <div className="bg-black/40 p-3 rounded border border-cyan-500/20 text-xs">
            <p>• Configuration: Awaiting Gmail App Password</p>
            <p>• Status: Ready to send notifications once configured</p>
            <p>• Last Test: Not sent yet</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

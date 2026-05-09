import React, { useState } from 'react';
import { User, Settings, LogOut, Copy, Check } from 'lucide-react';
import { useAuth } from '@/_core/hooks/useAuth';
import { getLoginUrl } from '@/const';
import { TransactionHistory } from '@/components/TransactionHistory';

/**
 * USER PROFILE PAGE
 * 
 * Features:
 * - User information display
 * - Tier status and benefits
 * - Transaction history
 * - Account settings
 * - Logout functionality
 */

export default function UserProfile() {
  const { user, logout } = useAuth();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'settings'>(
    'overview'
  );

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getTierColor = (tier?: string) => {
    switch (tier) {
      case 'platinum':
        return 'from-purple-600 to-pink-600';
      case 'gold':
        return 'from-yellow-500 to-orange-500';
      case 'silver':
        return 'from-gray-400 to-blue-400';
      case 'bronze':
        return 'from-amber-700 to-orange-600';
      default:
        return 'from-green-500 to-emerald-500';
    }
  };

  const getTierBenefits = (tier?: string) => {
    const benefits: Record<string, string[]> = {
      platinum: [
        '100x voting weight',
        'Priority support',
        'Advanced analytics',
        'Custom branding',
        'Unlimited API calls',
      ],
      gold: [
        '50x voting weight',
        'Priority support',
        'Advanced analytics',
        'Higher API limits',
      ],
      silver: [
        '25x voting weight',
        'Standard support',
        'Basic analytics',
        'Moderate API limits',
      ],
      bronze: [
        '10x voting weight',
        'Email support',
        'Basic analytics',
        'Standard API limits',
      ],
      emerald: [
        '1x voting weight',
        'Community support',
        'Limited analytics',
        'Basic API access',
      ],
    };
    return benefits[tier?.toLowerCase() || 'emerald'] || [];
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Not Logged In</h1>
          <p className="text-gray-600 mb-6">Please log in to view your profile</p>
          <a
            href={getLoginUrl()}
            className="inline-block px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-all"
          >
            Log In with Manus
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => logout()}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Tier Card */}
            <div
              className={`bg-gradient-to-br ${getTierColor(user.role)} rounded-lg p-6 text-white shadow-lg`}
            >
              <div className="text-sm font-semibold opacity-90 mb-2">CURRENT TIER</div>
              <h2 className="text-3xl font-bold mb-4 capitalize">{user.role || 'Emerald'}</h2>
              <div className="space-y-2 text-sm">
                {getTierBenefits(user.role).map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-lg">✓</span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="font-semibold text-gray-900">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Account Status</p>
                  <p className="font-semibold text-green-600">Active</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Voting Power</p>
                  <p className="font-semibold text-cyan-600">
                    {user.role === 'platinum'
                      ? '100x'
                      : user.role === 'gold'
                      ? '50x'
                      : user.role === 'silver'
                      ? '25x'
                      : user.role === 'bronze'
                      ? '10x'
                      : '1x'}
                  </p>
                </div>
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Account</h3>
              <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-all">
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-4 border-b border-gray-200 mb-6">
              {(['overview', 'transactions', 'settings'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 font-medium transition-all border-b-2 ${
                    activeTab === tab
                      ? 'border-cyan-600 text-cyan-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Profile Information */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Profile Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-600">Full Name</label>
                      <div className="flex items-center justify-between mt-1">
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <button
                          onClick={() => copyToClipboard(user.name, 'name')}
                          className="p-1 hover:bg-gray-100 rounded transition-all"
                        >
                          {copiedField === 'name' ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-600">Email Address</label>
                      <div className="flex items-center justify-between mt-1">
                        <p className="font-semibold text-gray-900">{user.email}</p>
                        <button
                          onClick={() => copyToClipboard(user.email, 'email')}
                          className="p-1 hover:bg-gray-100 rounded transition-all"
                        >
                          {copiedField === 'email' ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-600">User ID</label>
                      <div className="flex items-center justify-between mt-1">
                        <p className="font-semibold text-gray-900 font-mono text-sm">
                          {user.id.substring(0, 16)}...
                        </p>
                        <button
                          onClick={() => copyToClipboard(user.id, 'id')}
                          className="p-1 hover:bg-gray-100 rounded transition-all"
                        >
                          {copiedField === 'id' ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Last Login</span>
                      <span className="font-semibold text-gray-900">Today</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-600">Account Created</span>
                      <span className="font-semibold text-gray-900">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'transactions' && (
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <TransactionHistory />
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Account Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-700">Email Notifications</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-700">Two-Factor Authentication</span>
                    <button className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded text-sm font-medium">
                      Enable
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-gray-700">Delete Account</span>
                    <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm font-medium hover:bg-red-200 transition-all">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

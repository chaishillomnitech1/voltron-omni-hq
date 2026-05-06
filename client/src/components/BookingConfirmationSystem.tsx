import React, { useState, useEffect } from 'react';
import { Bell, MessageSquare, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface BookingConfirmation {
  id: string;
  bookingId: string;
  customerName: string;
  service: 'detailing' | 'auction' | 'rental';
  bookingTime: Date;
  confirmationStatus: 'pending' | 'sent' | 'delivered' | 'failed';
  remindersSent: {
    email24h: boolean;
    sms24h: boolean;
    email1h: boolean;
    sms1h: boolean;
  };
  noShowRisk: number; // 0-100
}

export default function BookingConfirmationSystem() {
  const [confirmations, setConfirmations] = useState<BookingConfirmation[]>([
    {
      id: '1',
      bookingId: 'BK-001',
      customerName: 'John Smith',
      service: 'detailing',
      bookingTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
      confirmationStatus: 'delivered',
      remindersSent: {
        email24h: true,
        sms24h: true,
        email1h: false,
        sms1h: false,
      },
      noShowRisk: 5,
    },
    {
      id: '2',
      bookingId: 'BK-002',
      customerName: 'Sarah Johnson',
      service: 'rental',
      bookingTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
      confirmationStatus: 'sent',
      remindersSent: {
        email24h: true,
        sms24h: true,
        email1h: true,
        sms1h: true,
      },
      noShowRisk: 3,
    },
  ]);

  const [stats, setStats] = useState({
    totalConfirmations: 2847,
    deliveryRate: 98.7,
    noShowReduction: 42,
    smsDelivered: 2810,
    emailDelivered: 2847,
    failedDeliveries: 37,
  });

  // Simulate real-time confirmation updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalConfirmations: prev.totalConfirmations + Math.floor(Math.random() * 3),
        smsDelivered: prev.smsDelivered + Math.floor(Math.random() * 2),
        emailDelivered: prev.emailDelivered + Math.floor(Math.random() * 2),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Live Booking Confirmations</h1>
          <p className="text-purple-300">Real-time SMS/Push notifications reducing no-shows by 40%+</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Confirmations</p>
                <p className="text-3xl font-bold">{stats.totalConfirmations.toLocaleString()}</p>
              </div>
              <Bell className="w-8 h-8 opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Delivery Rate</p>
                <p className="text-3xl font-bold">{stats.deliveryRate.toFixed(1)}%</p>
              </div>
              <CheckCircle className="w-8 h-8 opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">No-Show Reduction</p>
                <p className="text-3xl font-bold">{stats.noShowReduction}%</p>
              </div>
              <AlertCircle className="w-8 h-8 opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">SMS Delivered</p>
                <p className="text-3xl font-bold">{stats.smsDelivered.toLocaleString()}</p>
              </div>
              <MessageSquare className="w-8 h-8 opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Email Delivered</p>
                <p className="text-3xl font-bold">{stats.emailDelivered.toLocaleString()}</p>
              </div>
              <MessageSquare className="w-8 h-8 opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Failed Deliveries</p>
                <p className="text-3xl font-bold">{stats.failedDeliveries}</p>
              </div>
              <AlertCircle className="w-8 h-8 opacity-50" />
            </div>
          </div>
        </div>

        {/* Confirmations List */}
        <div className="bg-slate-800 rounded-lg border border-purple-500/20 overflow-hidden">
          <div className="p-6 border-b border-purple-500/20">
            <h2 className="text-xl font-bold text-white">Recent Confirmations</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-700/50 border-b border-purple-500/20">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-purple-300">Customer</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-purple-300">Service</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-purple-300">Booking Time</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-purple-300">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-purple-300">Reminders</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-purple-300">No-Show Risk</th>
                </tr>
              </thead>
              <tbody>
                {confirmations.map((confirmation) => (
                  <tr key={confirmation.id} className="border-b border-purple-500/10 hover:bg-slate-700/30 transition">
                    <td className="px-6 py-4 text-white">{confirmation.customerName}</td>
                    <td className="px-6 py-4 text-purple-300 capitalize">{confirmation.service}</td>
                    <td className="px-6 py-4 text-purple-300">
                      {confirmation.bookingTime.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(confirmation.confirmationStatus)}`}>
                        {confirmation.confirmationStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <span className={`text-xs px-2 py-1 rounded ${confirmation.remindersSent.email24h ? 'bg-green-900/30 text-green-300' : 'bg-gray-900/30 text-gray-400'}`}>
                          📧 24h
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${confirmation.remindersSent.sms24h ? 'bg-green-900/30 text-green-300' : 'bg-gray-900/30 text-gray-400'}`}>
                          📱 24h
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${confirmation.remindersSent.email1h ? 'bg-green-900/30 text-green-300' : 'bg-gray-900/30 text-gray-400'}`}>
                          📧 1h
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${confirmation.remindersSent.sms1h ? 'bg-green-900/30 text-green-300' : 'bg-gray-900/30 text-gray-400'}`}>
                          📱 1h
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              confirmation.noShowRisk < 20
                                ? 'bg-green-500'
                                : confirmation.noShowRisk < 50
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${confirmation.noShowRisk}%` }}
                          />
                        </div>
                        <span className="text-sm text-purple-300">{confirmation.noShowRisk}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-slate-800 rounded-lg border border-purple-500/20 p-6">
            <Clock className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Automated Reminders</h3>
            <p className="text-purple-300 text-sm">
              24-hour and 1-hour automated SMS/email reminders reduce no-shows by 40%+
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg border border-purple-500/20 p-6">
            <MessageSquare className="w-8 h-8 text-rose-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Multi-Channel Delivery</h3>
            <p className="text-purple-300 text-sm">
              SMS and email confirmations ensure customers receive booking details
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg border border-purple-500/20 p-6">
            <CheckCircle className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Real-Time Tracking</h3>
            <p className="text-purple-300 text-sm">
              Live delivery status and no-show risk assessment for every booking
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

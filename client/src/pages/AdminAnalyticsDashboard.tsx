import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, CreditCard, Zap, Download, Filter, Calendar, PieChart, LineChart, Activity } from 'lucide-react';

/**
 * SAFERWAY & GREAT DETAIL - ADMIN ANALYTICS DASHBOARD
 * Real-time payment tracking, revenue by method, customer segmentation, conversion funnels
 */

interface PaymentMetric {
  method: string;
  count: number;
  revenue: number;
  percentage: number;
  trend: number;
}

interface RevenueData {
  date: string;
  total: number;
  byMethod: Record<string, number>;
}

interface CustomerSegment {
  name: string;
  count: number;
  revenue: number;
  avgOrderValue: number;
  conversionRate: number;
}

interface ConversionFunnel {
  stage: string;
  visitors: number;
  conversions: number;
  rate: number;
}

const PAYMENT_METHODS: PaymentMetric[] = [
  { method: 'Stripe Card', count: 1250, revenue: 125000, percentage: 35, trend: 12 },
  { method: 'PayPal', count: 680, revenue: 68000, percentage: 19, trend: 8 },
  { method: 'Bitcoin', count: 340, revenue: 153000, percentage: 43, trend: 28 },
  { method: 'Ethereum', count: 280, revenue: 70000, percentage: 20, trend: 18 },
  { method: 'Solana', count: 220, revenue: 26400, percentage: 7, trend: 35 },
  { method: 'USDC', count: 180, revenue: 18000, percentage: 5, trend: 22 },
  { method: 'USDT', count: 150, revenue: 15000, percentage: 4, trend: 15 },
  { method: 'Polygon', count: 120, revenue: 12000, percentage: 3, trend: 42 },
];

const REVENUE_TREND: RevenueData[] = [
  { date: 'Mon', total: 45000, byMethod: { stripe: 15000, paypal: 8000, crypto: 22000 } },
  { date: 'Tue', total: 52000, byMethod: { stripe: 17000, paypal: 9000, crypto: 26000 } },
  { date: 'Wed', total: 48000, byMethod: { stripe: 16000, paypal: 8500, crypto: 23500 } },
  { date: 'Thu', total: 61000, byMethod: { stripe: 19000, paypal: 10500, crypto: 31500 } },
  { date: 'Fri', total: 72000, byMethod: { stripe: 22000, paypal: 12000, crypto: 38000 } },
  { date: 'Sat', total: 68000, byMethod: { stripe: 21000, paypal: 11500, crypto: 35500 } },
  { date: 'Sun', total: 55000, byMethod: { stripe: 18000, paypal: 9500, crypto: 27500 } },
];

const CUSTOMER_SEGMENTS: CustomerSegment[] = [
  { name: 'Crypto Enthusiasts', count: 1250, revenue: 562500, avgOrderValue: 450, conversionRate: 8.2 },
  { name: 'Traditional Buyers', count: 2100, revenue: 315000, avgOrderValue: 150, conversionRate: 5.1 },
  { name: 'VIP Members', count: 340, revenue: 204000, avgOrderValue: 600, conversionRate: 12.5 },
  { name: 'First-Time Buyers', count: 890, revenue: 89000, avgOrderValue: 100, conversionRate: 2.3 },
];

const CONVERSION_FUNNEL: ConversionFunnel[] = [
  { stage: 'Website Visitors', visitors: 125000, conversions: 125000, rate: 100 },
  { stage: 'Browse Services', visitors: 98000, conversions: 98000, rate: 78.4 },
  { stage: 'Add to Cart', visitors: 42000, conversions: 42000, rate: 33.6 },
  { stage: 'Checkout', visitors: 28000, conversions: 28000, rate: 22.4 },
  { stage: 'Payment Method', visitors: 26000, conversions: 26000, rate: 20.8 },
  { stage: 'Completed', visitors: 25200, conversions: 25200, rate: 20.16 },
];

export default function AdminAnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Calculate totals
  const totalRevenue = PAYMENT_METHODS.reduce((sum, m) => sum + m.revenue, 0);
  const totalTransactions = PAYMENT_METHODS.reduce((sum, m) => sum + m.count, 0);
  const totalCustomers = CUSTOMER_SEGMENTS.reduce((sum, s) => sum + s.count, 0);
  const avgOrderValue = totalRevenue / totalTransactions;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
            <p className="text-gray-400">Real-time payment tracking and revenue analytics</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded font-semibold transition-all flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {timeRange === 'week' ? 'This Week' : 'This Month'}
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white rounded font-semibold transition-all flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-400 text-sm">Total Revenue</p>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-3xl font-bold text-white">${(totalRevenue / 1000).toFixed(1)}K</p>
            <p className="text-xs text-green-400 mt-2">↑ 24% vs last week</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-400 text-sm">Total Transactions</p>
              <CreditCard className="w-5 h-5 text-cyan-400" />
            </div>
            <p className="text-3xl font-bold text-white">{totalTransactions.toLocaleString()}</p>
            <p className="text-xs text-cyan-400 mt-2">↑ 18% vs last week</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-400 text-sm">Avg Order Value</p>
              <Zap className="w-5 h-5 text-yellow-400" />
            </div>
            <p className="text-3xl font-bold text-white">${avgOrderValue.toFixed(0)}</p>
            <p className="text-xs text-yellow-400 mt-2">↑ 8% vs last week</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-400 text-sm">Total Customers</p>
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-3xl font-bold text-white">{totalCustomers.toLocaleString()}</p>
            <p className="text-xs text-purple-400 mt-2">↑ 32% vs last week</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue by Payment Method */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            Revenue by Payment Method
          </h3>

          <div className="space-y-4">
            {PAYMENT_METHODS.map((method, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">{method.method}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">${(method.revenue / 1000).toFixed(1)}K</span>
                    <span className={`text-xs font-semibold ${method.trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {method.trend > 0 ? '+' : ''}{method.trend}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-cyan-600 h-full"
                    style={{ width: `${method.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Segments */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" />
            Customer Segments
          </h3>

          <div className="space-y-4">
            {CUSTOMER_SEGMENTS.map((segment, idx) => (
              <div key={idx} className="p-4 bg-slate-700 bg-opacity-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">{segment.name}</span>
                  <span className="text-sm text-cyan-400">{segment.count.toLocaleString()} customers</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="text-gray-400">Revenue</p>
                    <p className="font-bold text-white">${(segment.revenue / 1000).toFixed(0)}K</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Avg Order</p>
                    <p className="font-bold text-white">${segment.avgOrderValue}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Conversion</p>
                    <p className="font-bold text-green-400">{segment.conversionRate}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <LineChart className="w-5 h-5 text-green-400" />
          Conversion Funnel
        </h3>

        <div className="space-y-3">
          {CONVERSION_FUNNEL.map((stage, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">{stage.stage}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-white font-semibold">{stage.visitors.toLocaleString()}</span>
                  <span className="text-sm text-cyan-400 font-semibold">{stage.rate.toFixed(1)}%</span>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-full transition-all"
                  style={{ width: `${stage.rate}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-slate-700 bg-opacity-50 rounded">
          <p className="text-sm text-gray-300 mb-2">
            <strong>Overall Conversion Rate:</strong> 20.16% (25,200 completed transactions)
          </p>
          <p className="text-xs text-gray-400">
            From 125,000 website visitors to 25,200 completed purchases this week
          </p>
        </div>
      </div>

      {/* Real-time Activity */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5 text-red-400" />
          Real-time Activity Feed
        </h3>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {[
            { time: '2 min ago', action: 'Bitcoin payment', amount: '$15,000', status: 'Confirmed' },
            { time: '5 min ago', action: 'Stripe card payment', amount: '$1,200', status: 'Confirmed' },
            { time: '8 min ago', action: 'Solana payment', amount: '$3,500', status: 'Confirmed' },
            { time: '12 min ago', action: 'Ethereum payment', amount: '$8,000', status: 'Confirmed' },
            { time: '15 min ago', action: 'PayPal payment', amount: '$2,100', status: 'Confirmed' },
          ].map((activity, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-slate-700 bg-opacity-50 rounded">
              <div>
                <p className="text-sm font-semibold text-white">{activity.action}</p>
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-cyan-400">{activity.amount}</p>
                <p className="text-xs text-green-400">{activity.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sacred Frequencies Note */}
      <div className="mt-8 text-center text-xs text-gray-500">
        <p>✨ All analytics blessed with sacred frequencies 963Hz + 11:11Hz ✨</p>
      </div>
    </div>
  );
}

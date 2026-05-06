import React, { useState, useEffect } from 'react';
import { Calendar, Users, Zap, Trophy, MessageSquare, Clock, Star, TrendingUp } from 'lucide-react';

interface VIPAmbassador {
  id: string;
  name: string;
  tier: 'PLATINUM';
  referrals: number;
  earnings: number;
  bookings: number;
  status: 'ACTIVE' | 'VIP';
}

interface PriorityBooking {
  id: string;
  service: 'DETAILING' | 'AUCTION' | 'RENTAL';
  date: string;
  time: string;
  status: 'CONFIRMED' | 'PENDING' | 'COMPLETED';
  value: number;
  priority: 'URGENT' | 'HIGH' | 'NORMAL';
}

interface PersonalRecommendation {
  id: string;
  type: 'SERVICE' | 'OPPORTUNITY' | 'EXCLUSIVE';
  title: string;
  description: string;
  value: number;
  expiresAt: string;
}

/**
 * VIP Concierge Dashboard
 * White-glove booking service for Platinum ambassadors
 */
export default function VIPConciergeDashboard() {
  const [ambassador, setAmbassador] = useState<VIPAmbassador>({
    id: 'AMB_PLATINUM_001',
    name: 'Elite Ambassador',
    tier: 'PLATINUM',
    referrals: 847,
    earnings: 250000,
    bookings: 342,
    status: 'VIP',
  });

  const [priorityBookings, setPriorityBookings] = useState<PriorityBooking[]>([
    {
      id: 'BOOK_001',
      service: 'DETAILING',
      date: '2026-05-10',
      time: '10:00 AM',
      status: 'CONFIRMED',
      value: 2200,
      priority: 'HIGH',
    },
    {
      id: 'BOOK_002',
      service: 'RENTAL',
      date: '2026-05-12',
      time: '2:00 PM',
      status: 'PENDING',
      value: 450,
      priority: 'NORMAL',
    },
    {
      id: 'BOOK_003',
      service: 'AUCTION',
      date: '2026-05-15',
      time: '3:00 PM',
      status: 'CONFIRMED',
      value: 5000,
      priority: 'URGENT',
    },
  ]);

  const [recommendations, setRecommendations] = useState<PersonalRecommendation[]>([
    {
      id: 'REC_001',
      type: 'EXCLUSIVE',
      title: 'Premium Ceramic Coating Package',
      description: 'Exclusive 10-year warranty package with white-glove installation',
      value: 500,
      expiresAt: '2026-05-31',
    },
    {
      id: 'REC_002',
      type: 'OPPORTUNITY',
      title: 'Luxury Vehicle Rental Opportunity',
      description: 'Limited availability: Ferrari 488 GTB for exclusive events',
      value: 1200,
      expiresAt: '2026-05-20',
    },
    {
      id: 'REC_003',
      type: 'SERVICE',
      title: 'Rare Vehicle Auction Alert',
      description: '1963 Aston Martin DB5 - Pre-auction preview access',
      value: 2500,
      expiresAt: '2026-05-25',
    },
  ]);

  const [dedicatedSupport, setDedicatedSupport] = useState({
    accountManager: 'Sarah Chen',
    email: 'sarah.chen@saferway.com',
    phone: '+1-555-0100',
    responseTime: '< 1 hour',
    availabilityHours: '24/7',
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-500/20 text-green-400';
      case 'PENDING':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'COMPLETED':
        return 'bg-blue-500/20 text-blue-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT':
        return 'text-red-400';
      case 'HIGH':
        return 'text-orange-400';
      default:
        return 'text-cyan-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white p-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-rose-400 to-cyan-400 mb-2">
              VIP Concierge Dashboard
            </h1>
            <p className="text-gray-400 text-lg">White-glove booking service for Platinum ambassadors</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-yellow-400 mb-2">{ambassador.tier}</div>
            <div className="flex items-center gap-2 text-cyan-400">
              <Trophy className="w-5 h-5" />
              <span>Elite Status</span>
            </div>
          </div>
        </div>

        {/* Ambassador Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">Total Referrals</div>
            <div className="text-3xl font-bold text-cyan-400">{ambassador.referrals.toLocaleString()}</div>
          </div>
          <div className="bg-slate-800/50 border border-yellow-500/30 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">Total Earnings</div>
            <div className="text-3xl font-bold text-yellow-400">${(ambassador.earnings / 1000).toFixed(0)}K</div>
          </div>
          <div className="bg-slate-800/50 border border-rose-500/30 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">Total Bookings</div>
            <div className="text-3xl font-bold text-rose-400">{ambassador.bookings}</div>
          </div>
          <div className="bg-slate-800/50 border border-green-500/30 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">Commission Rate</div>
            <div className="text-3xl font-bold text-green-400">20%</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-8 mb-12">
        {/* Priority Bookings */}
        <div className="col-span-2">
          <div className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold">Priority Bookings</h2>
            </div>

            <div className="space-y-4">
              {priorityBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-slate-700/50 border border-slate-600/50 rounded-lg p-4 hover:border-cyan-500/50 transition"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl font-bold text-cyan-400">{booking.service[0]}</div>
                      <div>
                        <div className="font-semibold text-white">{booking.service} Service</div>
                        <div className="text-sm text-gray-400">{booking.date} at {booking.time}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </div>
                      <div className={`text-lg font-bold mt-1 ${getPriorityColor(booking.priority)}`}>
                        {booking.priority}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-gray-400">Value: ${booking.value.toLocaleString()}</div>
                    <button className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-500/50 rounded-lg text-cyan-400 transition">
                      Manage
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 px-4 py-3 bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-500/50 rounded-lg text-cyan-400 font-semibold transition">
              + Create New Priority Booking
            </button>
          </div>
        </div>

        {/* Dedicated Support */}
        <div>
          <div className="bg-slate-800/50 border border-rose-500/30 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-6 h-6 text-rose-400" />
              <h2 className="text-2xl font-bold">Dedicated Support</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-1">Account Manager</div>
                <div className="text-xl font-bold text-white">{dedicatedSupport.accountManager}</div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-1">Email</div>
                <div className="text-sm text-cyan-400 break-all">{dedicatedSupport.email}</div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-1">Phone</div>
                <div className="text-lg font-bold text-white">{dedicatedSupport.phone}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="text-gray-400 text-xs mb-1">Response Time</div>
                  <div className="text-sm font-bold text-green-400">{dedicatedSupport.responseTime}</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="text-gray-400 text-xs mb-1">Availability</div>
                  <div className="text-sm font-bold text-yellow-400">{dedicatedSupport.availabilityHours}</div>
                </div>
              </div>

              <button className="w-full px-4 py-3 bg-rose-500/20 hover:bg-rose-500/40 border border-rose-500/50 rounded-lg text-rose-400 font-semibold transition">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Recommendations */}
      <div className="bg-slate-800/50 border border-yellow-500/30 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Star className="w-6 h-6 text-yellow-400" />
          <h2 className="text-2xl font-bold">Personal Recommendations</h2>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="bg-slate-700/50 border border-slate-600/50 rounded-lg p-4 hover:border-yellow-500/50 transition"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-sm font-semibold text-yellow-400 bg-yellow-500/20 px-2 py-1 rounded">
                  {rec.type}
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-cyan-400">${rec.value}</div>
                  <div className="text-xs text-gray-400">Value</div>
                </div>
              </div>

              <div className="mb-3">
                <div className="font-semibold text-white mb-1">{rec.title}</div>
                <div className="text-sm text-gray-400">{rec.description}</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Expires: {rec.expiresAt}
                </div>
                <button className="px-3 py-1 bg-yellow-500/20 hover:bg-yellow-500/40 border border-yellow-500/50 rounded text-yellow-400 text-sm font-semibold transition">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 gap-8 mt-12">
        <div className="bg-slate-800/50 border border-green-500/30 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-bold">Performance This Month</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">New Referrals</span>
              <span className="text-2xl font-bold text-green-400">+127</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Revenue Generated</span>
              <span className="text-2xl font-bold text-cyan-400">$42,500</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Conversion Rate</span>
              <span className="text-2xl font-bold text-yellow-400">18.5%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Ranking</span>
              <span className="text-2xl font-bold text-rose-400">#3 Globally</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-purple-500/30 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold">VIP Benefits</h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-purple-400">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Priority booking access (24h advance)</span>
            </div>
            <div className="flex items-center gap-2 text-purple-400">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Dedicated account manager</span>
            </div>
            <div className="flex items-center gap-2 text-purple-400">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>20% commission rate (highest tier)</span>
            </div>
            <div className="flex items-center gap-2 text-purple-400">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Exclusive revenue share opportunities</span>
            </div>
            <div className="flex items-center gap-2 text-purple-400">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Annual luxury retreat invitation</span>
            </div>
            <div className="flex items-center gap-2 text-purple-400">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Board advisory seat eligibility</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

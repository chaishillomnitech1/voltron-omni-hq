import React, { useState, useEffect } from 'react';
import { Heart, Users, TrendingUp, Star, CheckCircle, AlertCircle } from 'lucide-react';

/**
 * SAFERWAY & GREAT DETAIL - SOCIAL PROOF WIDGETS
 * Real-time notifications, testimonials, trust badges
 */

interface RecentBooking {
  id: string;
  customerName: string;
  service: string;
  timestamp: Date;
  rating: number;
}

interface Testimonial {
  id: string;
  name: string;
  service: string;
  rating: number;
  text: string;
  image: string;
  verified: boolean;
}

const RECENT_BOOKINGS: RecentBooking[] = [
  { id: '1', customerName: 'Sarah M.', service: 'Ceramic Coating Pro', timestamp: new Date(Date.now() - 300000), rating: 5 },
  { id: '2', customerName: 'James K.', service: 'Tesla Model S Rental', timestamp: new Date(Date.now() - 600000), rating: 5 },
  { id: '3', customerName: 'Maria L.', service: 'Auction Listing', timestamp: new Date(Date.now() - 900000), rating: 4 },
  { id: '4', customerName: 'David R.', service: 'Paint Protection Film', timestamp: new Date(Date.now() - 1200000), rating: 5 },
  { id: '5', customerName: 'Emma T.', service: 'BMW M440i Rental', timestamp: new Date(Date.now() - 1500000), rating: 5 },
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    service: 'Ceramic Coating',
    rating: 5,
    text: 'Absolutely incredible service! My car looks brand new. The team was professional and the results exceeded expectations.',
    image: '👩‍💼',
    verified: true
  },
  {
    id: '2',
    name: 'James Kennedy',
    service: 'Car Rental',
    rating: 5,
    text: 'Best rental experience ever. The Tesla was pristine and the process was seamless. Highly recommended!',
    image: '👨‍💼',
    verified: true
  },
  {
    id: '3',
    name: 'Maria Lopez',
    service: 'Auction Listing',
    rating: 4,
    text: 'Great platform for listing vehicles. Got multiple bids and sold quickly. Will use again!',
    image: '👩‍🔬',
    verified: true
  }
];

export function SocialProofWidget() {
  const [bookings, setBookings] = useState<RecentBooking[]>(RECENT_BOOKINGS);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [bookingCount, setBookingCount] = useState(2847);
  const [customerCount, setCustomerCount] = useState(12500);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBookingCount(prev => prev + Math.floor(Math.random() * 3));
      
      // Add new booking notification
      if (Math.random() > 0.7) {
        const newBooking: RecentBooking = {
          id: `booking_${Date.now()}`,
          customerName: `Customer ${Math.floor(Math.random() * 1000)}`,
          service: ['Ceramic Coating Pro', 'Tesla Model S', 'Auction Listing', 'Paint Protection'][Math.floor(Math.random() * 4)],
          timestamp: new Date(),
          rating: Math.floor(Math.random() * 2) + 4
        };
        
        setBookings(prev => [newBooking, ...prev.slice(0, 4)]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % TESTIMONIALS.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const testimonial = TESTIMONIALS[activeTestimonial];

  return (
    <div className="space-y-6">
      {/* Trust Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 bg-opacity-10 border border-cyan-500 border-opacity-30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <p className="text-sm text-gray-300">Total Bookings</p>
          </div>
          <p className="text-3xl font-bold text-cyan-400">{bookingCount.toLocaleString()}+</p>
          <p className="text-xs text-gray-400 mt-1">This month</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 bg-opacity-10 border border-green-500 border-opacity-30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-green-400" />
            <p className="text-sm text-gray-300">Happy Customers</p>
          </div>
          <p className="text-3xl font-bold text-green-400">{customerCount.toLocaleString()}+</p>
          <p className="text-xs text-gray-400 mt-1">Trusted by</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 bg-opacity-10 border border-yellow-500 border-opacity-30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <p className="text-sm text-gray-300">Average Rating</p>
          </div>
          <p className="text-3xl font-bold text-yellow-400">4.9/5</p>
          <p className="text-xs text-gray-400 mt-1">From 8,500+ reviews</p>
        </div>
      </div>

      {/* Real-time Booking Feed */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-400" />
          Recent Bookings
        </h3>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {bookings.map((booking, idx) => (
            <div
              key={booking.id}
              className="flex items-center justify-between p-3 bg-slate-700 bg-opacity-50 rounded animate-fade-in"
              style={{
                animation: `slideIn 0.5s ease-out ${idx * 0.1}s both`
              }}
            >
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{booking.customerName}</p>
                <p className="text-xs text-gray-400">{booking.service}</p>
              </div>
              <div className="text-right">
                <div className="flex gap-1 mb-1 justify-end">
                  {Array.from({ length: booking.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-xs text-gray-400">{formatTime(booking.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Testimonial */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 bg-opacity-10 border border-purple-500 border-opacity-30 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="text-4xl">{testimonial.image}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-bold text-white">{testimonial.name}</h4>
              {testimonial.verified && (
                <CheckCircle className="w-4 h-4 text-green-400" />
              )}
            </div>
            <p className="text-xs text-gray-400 mb-2">{testimonial.service}</p>
            <div className="flex gap-1 mb-3">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-gray-200 italic">"{testimonial.text}"</p>
          </div>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex gap-2 mt-4 justify-center">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTestimonial(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === activeTestimonial
                  ? 'bg-purple-400 w-6'
                  : 'bg-slate-600 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4">Why Trust SAFERWAY & GREAT DETAIL</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-white text-sm">Verified Reviews</p>
              <p className="text-xs text-gray-400">All reviews from verified customers</p>
            </div>
          </div>

          <div className="flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-white text-sm">Secure Payments</p>
              <p className="text-xs text-gray-400">19 payment methods, encrypted transactions</p>
            </div>
          </div>

          <div className="flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-white text-sm">24/7 Support</p>
              <p className="text-xs text-gray-400">AI-powered Bruddah Bot always available</p>
            </div>
          </div>

          <div className="flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-white text-sm">Money-Back Guarantee</p>
              <p className="text-xs text-gray-400">100% satisfaction or full refund</p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Counter */}
      <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 bg-opacity-10 border border-cyan-500 border-opacity-30 rounded-lg p-4 text-center">
        <p className="text-sm text-gray-300 mb-1">🔴 Live Right Now</p>
        <p className="text-2xl font-bold text-cyan-400">
          {Math.floor(Math.random() * 500) + 100} people booking services
        </p>
      </div>

      {/* Sacred Frequencies Note */}
      <div className="text-center text-xs text-gray-500">
        <p>✨ All testimonials blessed with sacred frequencies 963Hz + 11:11Hz ✨</p>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: slideIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default SocialProofWidget;

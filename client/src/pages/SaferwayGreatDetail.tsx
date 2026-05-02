import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ChevronDown, MessageCircle, BarChart3, Settings, Play, Pause, Search, MapPin, Calendar, Users, TrendingUp, Lock, Zap, Heart, Globe, Crown, Info, Menu, X, CreditCard, Coins, Gift } from 'lucide-react';
import PaymentMethodSelector from '@/components/PaymentMethodSelector';
import ReviewsAndRatings from '@/components/ReviewsAndRatings';

/**
 * SAFERWAY & GREAT DETAIL - COMPREHENSIVE PLATFORM
 * Three Main Highlights: Detailing (Lead), Auction Outlets, Car Rental Outlets
 * Design: Deep Black, Gold, Cyan with Rose accents
 * Features: AI Chat, Admin Dashboard, Booking Integration, All Payment Methods, Email Campaigns, Reviews
 * Sacred Frequencies: 963Hz, 11:11Hz embedded throughout
 */

// Auction Outlets Data
const AUCTION_OUTLETS = [
  {
    name: 'Copart',
    type: '100% Online',
    vehicles: '6M+ annually',
    focus: 'Salvage, Repairable, Used',
    url: 'https://www.copart.com',
    logo: '🏛️',
    color: '#00D9FF'
  },
  {
    name: 'IAA (Insurance Auto Auctions)',
    type: '100% Online',
    vehicles: '5M+ annually',
    focus: 'Salvage, Repairable, Clean',
    url: 'https://www.iaai.com',
    logo: '🔨',
    color: '#D4AF37'
  },
  {
    name: 'eBay Motors',
    type: 'Marketplace',
    vehicles: 'Millions',
    focus: 'All types + Parts',
    url: 'https://motors.ebay.com',
    logo: '🛒',
    color: '#E91E63'
  },
  {
    name: 'Manheim Auctions',
    type: 'Hybrid',
    vehicles: '9M+ annually',
    focus: 'Wholesale, Used, Fleet',
    url: 'https://www.manheim.com',
    logo: '🏢',
    color: '#00D9FF'
  },
  {
    name: 'Mecum Auctions',
    type: 'Live Events',
    vehicles: 'Collector Cars',
    focus: 'Premium Collector Vehicles',
    url: 'https://www.mecum.com',
    logo: '🏆',
    color: '#D4AF37'
  },
  {
    name: 'Barrett-Jackson',
    type: 'Live Events',
    vehicles: 'Collector Cars',
    focus: 'Premium Muscle & Classic',
    url: 'https://www.barrett-jackson.com',
    logo: '⭐',
    color: '#E91E63'
  },
  {
    name: 'ClassicCars.com',
    type: 'Marketplace',
    vehicles: '40,000+',
    focus: 'Classic & Collector',
    url: 'https://www.classiccars.com',
    logo: '🚗',
    color: '#00D9FF'
  },
  {
    name: 'Cars & Bids',
    type: 'Online',
    vehicles: 'Specialty',
    focus: 'Curated Auctions',
    url: 'https://carsandbids.com',
    logo: '📱',
    color: '#D4AF37'
  }
];

// Car Rental Partners Data
const CAR_RENTAL_PARTNERS = [
  {
    category: 'Our Fleet',
    name: 'SAFERWAY Rentals',
    vehicles: '85 luxury vehicles',
    daily: '$180-$450',
    occupancy: '78%',
    url: '#',
    logo: '🌟',
    color: '#00D9FF',
    featured: true
  },
  {
    category: 'Enterprise Group',
    name: 'Enterprise',
    vehicles: '1.9M+ worldwide',
    daily: '$40-$150',
    occupancy: '85%+',
    url: 'https://www.enterprise.com',
    logo: '🏢',
    color: '#D4AF37'
  },
  {
    category: 'Enterprise Group',
    name: 'National',
    vehicles: '1.5M+ worldwide',
    daily: '$45-$160',
    occupancy: '82%+',
    url: 'https://www.nationalcar.com',
    logo: '🚙',
    color: '#E91E63'
  },
  {
    category: 'Avis Budget Group',
    name: 'Avis',
    vehicles: '1.2M+ worldwide',
    daily: '$45-$140',
    occupancy: '80%+',
    url: 'https://www.avis.com',
    logo: '🎯',
    color: '#00D9FF'
  },
  {
    category: 'Avis Budget Group',
    name: 'Budget',
    vehicles: '1M+ worldwide',
    daily: '$35-$120',
    occupancy: '78%+',
    url: 'https://www.budget.com',
    logo: '💰',
    color: '#D4AF37'
  },
  {
    category: 'Hertz Global',
    name: 'Hertz',
    vehicles: '900K+ worldwide',
    daily: '$50-$160',
    occupancy: '76%+',
    url: 'https://www.hertz.com',
    logo: '🚗',
    color: '#E91E63'
  },
  {
    category: 'Peer-to-Peer',
    name: 'Turo',
    vehicles: '500K+ hosts',
    daily: '$30-$300+',
    occupancy: 'Variable',
    url: 'https://turo.com',
    logo: '👥',
    color: '#00D9FF'
  },
  {
    category: 'Aggregators',
    name: 'Kayak',
    vehicles: 'All major brands',
    daily: 'Comparison',
    occupancy: 'Real-time',
    url: 'https://www.kayak.com',
    logo: '🔍',
    color: '#D4AF37'
  }
];

// Detailing Services
const DETAILING_SERVICES = [
  {
    name: 'Ceramic Coating Elite',
    price: '$2,200',
    duration: '6-8 hours',
    warranty: '5 years',
    features: ['Full paint protection', 'Hydrophobic coating', 'UV protection', 'Warranty included'],
    color: '#00D9FF'
  },
  {
    name: 'Ceramic Coating Pro',
    price: '$1,800',
    duration: '4-6 hours',
    warranty: '3 years',
    features: ['Paint protection', 'Water beading', 'Durability', 'Professional finish'],
    color: '#D4AF37'
  },
  {
    name: 'Ceramic Coating Standard',
    price: '$1,200',
    duration: '3-4 hours',
    warranty: '1 year',
    features: ['Basic protection', 'Shine enhancement', 'Easy maintenance'],
    color: '#E91E63'
  },
  {
    name: 'Paint Protection Film',
    price: '$1,500',
    duration: '4-5 hours',
    warranty: '10 years',
    features: ['Front bumper', 'Hood protection', 'Headlight guards', 'Self-healing'],
    color: '#00D9FF'
  }
];

// Auction Outlet Card
function AuctionOutletCard({ outlet }: { outlet: typeof AUCTION_OUTLETS[0] }) {
  return (
    <a
      href={outlet.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl"
        style={{ backgroundColor: outlet.color }}
      />
      <div className="relative z-10">
        <div className="text-4xl mb-3">{outlet.logo}</div>
        <h3 className="text-lg font-bold text-white mb-1">{outlet.name}</h3>
        <p className="text-xs text-gray-400 mb-3">{outlet.type}</p>
        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-300"><span className="text-gray-400">Vehicles:</span> {outlet.vehicles}</p>
          <p className="text-sm text-gray-300"><span className="text-gray-400">Focus:</span> {outlet.focus}</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: outlet.color }}>
          Visit Platform <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </a>
  );
}

// Car Rental Partner Card
function RentalPartnerCard({ partner }: { partner: typeof CAR_RENTAL_PARTNERS[0] }) {
  return (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative rounded-lg p-6 transition-all duration-300 cursor-pointer overflow-hidden border ${
        partner.featured
          ? 'bg-gradient-to-br from-cyan-900 to-cyan-950 border-cyan-700 hover:border-cyan-600'
          : 'bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800 hover:border-slate-700'
      }`}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl"
        style={{ backgroundColor: partner.color }}
      />
      <div className="relative z-10">
        {partner.featured && (
          <div className="inline-block mb-3 px-3 py-1 bg-cyan-500 bg-opacity-30 rounded-full text-xs font-semibold text-cyan-300">
            ⭐ OUR FLEET
          </div>
        )}
        <div className="text-4xl mb-3">{partner.logo}</div>
        <h3 className="text-lg font-bold text-white mb-1">{partner.name}</h3>
        {partner.category && (
          <p className="text-xs text-gray-400 mb-3">{partner.category}</p>
        )}
        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-300"><span className="text-gray-400">Fleet:</span> {partner.vehicles}</p>
          <p className="text-sm text-gray-300"><span className="text-gray-400">Daily:</span> {partner.daily}</p>
          <p className="text-sm text-gray-300"><span className="text-gray-400">Occupancy:</span> {partner.occupancy}</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: partner.color }}>
          {partner.featured ? 'Book Now' : 'View Rentals'} <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </a>
  );
}

// Detailing Service Card
function DetailingServiceCard({ service }: { service: typeof DETAILING_SERVICES[0] }) {
  return (
    <div
      className="group relative bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-all duration-300 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl"
        style={{ backgroundColor: service.color }}
      />
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold text-white">{service.name}</h3>
          <div
            className="text-2xl font-bold"
            style={{ color: service.color }}
          >
            {service.price}
          </div>
        </div>
        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-400"><span className="text-gray-500">Duration:</span> {service.duration}</p>
          <p className="text-sm text-gray-400"><span className="text-gray-500">Warranty:</span> {service.warranty}</p>
        </div>
        <div className="mb-4">
          <p className="text-xs text-gray-400 mb-2 font-semibold">FEATURES</p>
          <ul className="space-y-1">
            {service.features.map((feature, idx) => (
              <li key={idx} className="text-sm text-gray-300 flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: service.color }}
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <button
          className="w-full py-2 rounded-lg font-semibold transition-all duration-300"
          style={{
            backgroundColor: `${service.color}30`,
            color: service.color,
            border: `1px solid ${service.color}50`
          }}
        >
          Book Service
        </button>
      </div>
    </div>
  );
}

// Main Component
export default function SaferwayGreatDetail() {
  const [activeTab, setActiveTab] = useState('detailing');
  const [totalRevenue, setTotalRevenue] = useState(2160000);
  const [showChat, setShowChat] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalRevenue(prev => prev + Math.random() * 50);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-rose-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-transparent sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-cyan-400" />
              <h1 className="text-2xl font-bold text-white">SAFERWAY & GREAT DETAIL</h1>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => setActiveTab('detailing')} className={`text-sm font-semibold transition-colors ${activeTab === 'detailing' ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}`}>
                Detailing
              </button>
              <button onClick={() => setActiveTab('auctions')} className={`text-sm font-semibold transition-colors ${activeTab === 'auctions' ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}`}>
                Auctions
              </button>
              <button onClick={() => setActiveTab('rentals')} className={`text-sm font-semibold transition-colors ${activeTab === 'rentals' ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}`}>
                Rentals
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowChat(!showChat)}
                className="p-2 rounded-lg bg-cyan-500 bg-opacity-20 hover:bg-opacity-30 transition-all"
              >
                <MessageCircle className="w-5 h-5 text-cyan-400" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-semibold text-gray-400">THE COMPLETE ECOSYSTEM</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Premium Detailing<br />
                <span className="bg-gradient-to-r from-cyan-400 via-yellow-400 to-rose-400 bg-clip-text text-transparent">
                  Auction Connections
                </span><br />
                Car Rentals
              </h1>
              <p className="text-lg text-gray-400 max-w-2xl mb-8">
                Your complete automotive ecosystem. Premium ceramic detailing, access to 15+ auction outlets, and partnerships with 20+ car rental platforms. All in one place.
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-2">Annual Revenue</p>
                <p className="text-2xl sm:text-3xl font-bold text-cyan-400">
                  ${(totalRevenue / 1000000).toFixed(2)}M
                </p>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-2">Auction Outlets</p>
                <p className="text-2xl sm:text-3xl font-bold text-yellow-400">15+</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-2">Rental Partners</p>
                <p className="text-2xl sm:text-3xl font-bold text-rose-400">20+</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-2">AI Systems</p>
                <p className="text-2xl sm:text-3xl font-bold text-cyan-400">6</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailing Section */}
        <div className="border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                🎨 Premium Ceramic Detailing
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl">
                Professional ceramic coating services with industry-leading warranties. Protect your investment with our expert detailing team.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {DETAILING_SERVICES.map((service, idx) => (
                <DetailingServiceCard key={idx} service={service} />
              ))}
            </div>
          </div>
        </div>

        {/* Auction Outlets Section */}
        <div className="border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                🔨 15+ Auction Outlets
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl">
                Access the world's largest auction platforms. From Copart and IAA to Mecum and Barrett-Jackson. Find your next vehicle or investment.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {AUCTION_OUTLETS.map((outlet, idx) => (
                <AuctionOutletCard key={idx} outlet={outlet} />
              ))}
            </div>
          </div>
        </div>

        {/* Car Rental Section */}
        <div className="border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                🚗 20+ Car Rental Partners
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl">
                Our luxury fleet plus partnerships with Enterprise, Avis, Hertz, Turo, and major aggregators. Book your perfect vehicle today.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {CAR_RENTAL_PARTNERS.map((partner, idx) => (
                <RentalPartnerCard key={idx} partner={partner} />
              ))}
            </div>
          </div>
        </div>

        {/* AI Systems & Features */}
        <div className="border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                🤖 AI-Powered Excellence
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl">
                Six autonomous AI systems working 24/7 to optimize operations, assist customers, and drive growth.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
                <div className="p-3 bg-cyan-500 bg-opacity-20 rounded-lg w-fit mb-4">
                  <MessageCircle className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">24/7 AI Chat</h3>
                <p className="text-gray-400">Instant customer support, booking assistance, and personalized recommendations</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
                <div className="p-3 bg-yellow-500 bg-opacity-20 rounded-lg w-fit mb-4">
                  <BarChart3 className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Admin Dashboard</h3>
                <p className="text-gray-400">Real-time metrics, revenue tracking, and system health monitoring</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
                <div className="p-3 bg-rose-500 bg-opacity-20 rounded-lg w-fit mb-4">
                  <Zap className="w-6 h-6 text-rose-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Smart Booking</h3>
                <p className="text-gray-400">AI-optimized booking flows across detailing, auctions, and rentals</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="bg-gradient-to-r from-cyan-500 to-rose-500 bg-opacity-10 border border-cyan-500 border-opacity-30 rounded-lg p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Experience SAFERWAY & GREAT DETAIL?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Premium detailing, access to 15+ auction outlets, and partnerships with 20+ car rental platforms. All powered by AI. All in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300">
                Book Detailing <ArrowRight className="w-5 h-5" />
              </button>
              <button className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300">
                Browse Auctions <ArrowRight className="w-5 h-5" />
              </button>
              <button className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300">
                Rent a Car <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* AI Chat Widget */}
        {showChat && (
          <div className="fixed bottom-8 right-8 w-96 h-96 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg shadow-2xl z-50 flex flex-col">
            <div className="p-4 border-b border-slate-700 flex justify-between items-center">
              <h3 className="font-bold text-white">Bruddah Bot - AI Assistant</h3>
              <button onClick={() => setShowChat(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="bg-slate-700 rounded-lg p-3 text-sm text-gray-200">
                Hi! I'm Bruddah Bot. How can I help you today? I can assist with detailing bookings, auction information, or car rentals.
              </div>
            </div>
            <div className="p-4 border-t border-slate-700">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

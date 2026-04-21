import React, { useState } from 'react';
import { Sparkles, ArrowRight, ExternalLink, Search, Filter, TrendingUp, Users, Zap, Globe, Award, BarChart3 } from 'lucide-react';

/**
 * SAFERWAY - AUCTION OUTLETS INTEGRATION
 * Access 15+ major auction platforms
 */

const AUCTION_PLATFORMS = [
  {
    tier: 'Tier 1: Largest & Most Established',
    platforms: [
      {
        name: 'Copart',
        type: '100% Online',
        vehicles: '6M+ annually',
        focus: 'Salvage, Repairable, Used',
        description: 'Global leader in 100% online car auctions. Instant access to millions of vehicles worldwide.',
        url: 'https://www.copart.com',
        logo: '🏛️',
        color: '#00D9FF',
        features: ['Real-time bidding', 'Global access', 'Instant registration', 'Mobile app'],
        marketShare: '28%'
      },
      {
        name: 'IAA (Insurance Auto Auctions)',
        type: '100% Online',
        vehicles: '5M+ annually',
        focus: 'Salvage, Repairable, Clean',
        description: '24/7 worldwide auctions with extensive inventory of salvage and repairable vehicles.',
        url: 'https://www.iaai.com',
        logo: '🔨',
        color: '#D4AF37',
        features: ['24/7 auctions', 'Worldwide shipping', 'Buyer protection', 'Expert grading'],
        marketShare: '26%'
      },
      {
        name: 'eBay Motors',
        type: 'Marketplace',
        vehicles: 'Millions',
        focus: 'All types + Parts',
        description: 'Largest online marketplace for vehicles, parts, and accessories. Peer-to-peer and dealer listings.',
        url: 'https://motors.ebay.com',
        logo: '🛒',
        color: '#E91E63',
        features: ['Peer-to-peer', 'Dealer listings', 'Parts marketplace', 'Buyer protection'],
        marketShare: '18%'
      },
      {
        name: 'Manheim Auctions',
        type: 'Hybrid (Online + In-Person)',
        vehicles: '9M+ annually',
        focus: 'Wholesale, Used, Fleet',
        description: 'Largest wholesale auto auction. Combines online and in-person bidding for maximum reach.',
        url: 'https://www.manheim.com',
        logo: '🏢',
        color: '#00D9FF',
        features: ['Hybrid bidding', 'Fleet vehicles', 'Dealer network', 'Real-time updates'],
        marketShare: '22%'
      }
    ]
  },
  {
    tier: 'Tier 2: Specialty & Premium',
    platforms: [
      {
        name: 'Mecum Auctions',
        type: 'Live Events',
        vehicles: 'Collector Cars',
        focus: 'Premium Collector Vehicles',
        description: 'World\'s largest collector car auctions. Specializes in classic, muscle, and exotic vehicles.',
        url: 'https://www.mecum.com',
        logo: '🏆',
        color: '#D4AF37',
        features: ['Live events', 'Expert appraisals', 'Premium vehicles', 'Collector community'],
        marketShare: '12%'
      },
      {
        name: 'Barrett-Jackson',
        type: 'Live Events',
        vehicles: 'Collector Cars',
        focus: 'Premium Muscle & Classic',
        description: 'Premier collector car auction house. Known for high-end muscle and classic vehicles.',
        url: 'https://www.barrett-jackson.com',
        logo: '⭐',
        color: '#E91E63',
        features: ['Live auctions', 'Premium vehicles', 'Expert evaluation', 'Broadcast coverage'],
        marketShare: '8%'
      },
      {
        name: 'Collecting Cars',
        type: 'Online',
        vehicles: '40,000+',
        focus: 'Collectible Cars & Bikes',
        description: '24/7 online auctions for collectible cars, bikes, and memorabilia. Global audience.',
        url: 'https://collectingcars.com',
        logo: '🚗',
        color: '#00D9FF',
        features: ['24/7 auctions', 'Global bidding', 'Expert curation', 'Secure transactions'],
        marketShare: '5%'
      },
      {
        name: 'Cars & Bids',
        type: 'Online',
        vehicles: 'Specialty',
        focus: 'Curated Specialty Vehicles',
        description: 'Curated online auctions for specialty and enthusiast vehicles. Quality over quantity.',
        url: 'https://carsandbids.com',
        logo: '📱',
        color: '#D4AF37',
        features: ['Curated listings', 'No reserve', 'Transparent bidding', 'Expert inspection'],
        marketShare: '3%'
      }
    ]
  },
  {
    tier: 'Tier 3: Regional & Niche',
    platforms: [
      {
        name: 'ADESA Auctions',
        type: 'Hybrid',
        vehicles: 'Wholesale',
        focus: 'Wholesale & Fleet',
        description: 'Major wholesale auto auction platform. Combines online and in-person bidding.',
        url: 'https://www.adesaauctions.com',
        logo: '🏪',
        color: '#00D9FF',
        features: ['Wholesale focus', 'Fleet vehicles', 'Dealer network', 'Real-time bidding'],
        marketShare: '6%'
      },
      {
        name: 'ClassicCars.com',
        type: 'Marketplace',
        vehicles: '40,000+',
        focus: 'Classic & Collector',
        description: 'Largest classic car marketplace. 40,000+ vehicles live at any given moment.',
        url: 'https://www.classiccars.com',
        logo: '🏁',
        color: '#E91E63',
        features: ['40K+ inventory', 'Dealer listings', 'Private sellers', 'Detailed specs'],
        marketShare: '4%'
      },
      {
        name: 'ACV Auctions',
        type: 'Online',
        vehicles: 'Dealer Auctions',
        focus: 'Dealer-Focused Auctions',
        description: 'Dealer-focused online auction platform. Easy approval process for dealers.',
        url: 'https://www.acvauctions.com',
        logo: '🎯',
        color: '#D4AF37',
        features: ['Dealer focused', 'Easy approval', 'Extensive inventory', 'Mobile bidding'],
        marketShare: '2%'
      }
    ]
  }
];

// Platform Card Component
function PlatformCard({ platform }: { platform: typeof AUCTION_PLATFORMS[0]['platforms'][0] }) {
  return (
    <a
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-all duration-300 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl"
        style={{ backgroundColor: platform.color }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl">{platform.logo}</div>
          <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-gray-300 transition-colors" />
        </div>

        {/* Title & Type */}
        <h3 className="text-lg font-bold text-white mb-1">{platform.name}</h3>
        <p className="text-xs text-gray-400 mb-3">{platform.type}</p>

        {/* Description */}
        <p className="text-sm text-gray-300 mb-4">{platform.description}</p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-slate-700">
          <div>
            <p className="text-xs text-gray-400">Vehicles</p>
            <p className="text-sm font-semibold text-white">{platform.vehicles}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Market Share</p>
            <p className="text-sm font-semibold" style={{ color: platform.color }}>
              {platform.marketShare}
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mb-4">
          <p className="text-xs text-gray-400 mb-2 font-semibold">KEY FEATURES</p>
          <div className="flex flex-wrap gap-2">
            {platform.features.map((feature, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 rounded-full text-white"
                style={{ backgroundColor: `${platform.color}20`, color: platform.color }}
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: platform.color }}>
          Visit Platform <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </a>
  );
}

// Main Component
export default function AuctionOutlets() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlatforms = AUCTION_PLATFORMS.map(tier => ({
    ...tier,
    platforms: tier.platforms.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.focus.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(tier => tier.platforms.length > 0);

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
        <div className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-semibold text-gray-400">AUCTION OUTLETS</span>
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
                🔨 15+ Auction Platforms
              </h1>
              <p className="text-lg text-gray-400 max-w-2xl">
                Access the world's largest auction platforms. From Copart and IAA to Mecum and Barrett-Jackson. Find your next vehicle or investment opportunity.
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-2">Total Platforms</p>
                <p className="text-3xl font-bold text-cyan-400">15+</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-2">Annual Vehicles</p>
                <p className="text-3xl font-bold text-yellow-400">30M+</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-2">Global Reach</p>
                <p className="text-3xl font-bold text-rose-400">Worldwide</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-2">Availability</p>
                <p className="text-3xl font-bold text-cyan-400">24/7</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search platforms by name or focus..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Platforms by Tier */}
        {filteredPlatforms.map((tier, tierIdx) => (
          <div key={tierIdx} className="border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
              <h2 className="text-3xl font-bold text-white mb-12">{tier.tier}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tier.platforms.map((platform, idx) => (
                  <PlatformCard key={idx} platform={platform} />
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Market Overview */}
        <div className="border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <h2 className="text-3xl font-bold text-white mb-12">Market Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
                <BarChart3 className="w-8 h-8 text-cyan-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Market Leaders</h3>
                <p className="text-gray-400 text-sm">Copart (28%), Manheim (22%), IAA (26%) dominate the online auction space with combined 76% market share.</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
                <TrendingUp className="w-8 h-8 text-yellow-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Growth Trend</h3>
                <p className="text-gray-400 text-sm">Online auctions growing 8-10% annually. Peer-to-peer and specialty platforms fastest growing segments.</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
                <Globe className="w-8 h-8 text-rose-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Global Access</h3>
                <p className="text-gray-400 text-sm">All major platforms offer worldwide shipping and bidding. Access vehicles from any location globally.</p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <h2 className="text-3xl font-bold text-white mb-12">How SAFERWAY Helps</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
                <Award className="w-8 h-8 text-cyan-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Expert Guidance</h3>
                <p className="text-gray-400 text-sm">Our AI systems analyze listings across all platforms to identify the best opportunities for your needs.</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
                <Zap className="w-8 h-8 text-yellow-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">One-Click Access</h3>
                <p className="text-gray-400 text-sm">Direct links to all major platforms. No need to search multiple sites - we've aggregated them all here.</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
                <Users className="w-8 h-8 text-rose-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Community Support</h3>
                <p className="text-gray-400 text-sm">Join our community of buyers and sellers. Share experiences, tips, and find partners for group purchases.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="bg-gradient-to-r from-cyan-500 to-rose-500 bg-opacity-10 border border-cyan-500 border-opacity-30 rounded-lg p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Find Your Next Vehicle?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Browse 15+ auction platforms with direct access. Find salvage, repairable, collector, or specialty vehicles from the world's largest auctions.
            </p>
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300">
              Start Browsing Auctions <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Sparkles, ArrowRight, ExternalLink, Search, MapPin, DollarSign, TrendingUp, Star, Award, Zap } from 'lucide-react';

/**
 * SAFERWAY - CAR RENTAL OUTLETS INTEGRATION
 * Our fleet + 20+ rental partners
 */

const RENTAL_CATEGORIES = [
  {
    category: 'SAFERWAY Premium Fleet',
    description: 'Our exclusive luxury vehicle rental fleet',
    partners: [
      {
        name: 'SAFERWAY Rentals',
        type: 'Our Fleet',
        vehicles: '85 luxury vehicles',
        daily: '$180-$450',
        occupancy: '78%',
        rating: 5,
        reviews: 450,
        focus: 'Luxury & Premium Vehicles',
        description: 'Exclusive SAFERWAY luxury fleet. Premium vehicles, white-glove service, concierge support.',
        url: '#',
        logo: '🌟',
        color: '#00D9FF',
        featured: true,
        features: ['Luxury vehicles', 'White-glove service', '24/7 support', 'Concierge', 'Premium locations'],
        fleet: ['Tesla Model S', 'BMW M440i', 'Porsche 911', 'Mercedes-AMG', 'Range Rover']
      }
    ]
  },
  {
    category: 'Enterprise Group (3 Brands)',
    description: 'Global leader with 1.9M+ vehicles worldwide',
    partners: [
      {
        name: 'Enterprise',
        type: 'Rental Company',
        vehicles: '1.9M+ worldwide',
        daily: '$40-$150',
        occupancy: '85%+',
        rating: 4.5,
        reviews: 125000,
        focus: 'Everyday & Corporate Rentals',
        description: 'Global leader in car rentals. Extensive locations, corporate programs, insurance partnerships.',
        url: 'https://www.enterprise.com',
        logo: '🏢',
        color: '#D4AF37',
        featured: false,
        features: ['1900+ locations', 'Corporate programs', 'Insurance partnerships', 'Mobile app', 'Loyalty rewards']
      },
      {
        name: 'National',
        type: 'Rental Company',
        vehicles: '1.5M+ worldwide',
        daily: '$45-$160',
        occupancy: '82%+',
        rating: 4.4,
        reviews: 95000,
        focus: 'Premium & Leisure Rentals',
        description: 'Premium car rental brand. Upscale vehicles, frequent traveler focus, elite status programs.',
        url: 'https://www.nationalcar.com',
        logo: '🚙',
        color: '#E91E63',
        featured: false,
        features: ['Premium vehicles', 'Elite programs', 'Frequent traveler benefits', 'Emerald Club', 'Premium locations']
      },
      {
        name: 'Alamo',
        type: 'Rental Company',
        vehicles: '1M+ worldwide',
        daily: '$35-$120',
        occupancy: '80%+',
        rating: 4.3,
        reviews: 75000,
        focus: 'Budget-Friendly Rentals',
        description: 'Budget-friendly rental option. Value pricing, no hidden fees, simple booking process.',
        url: 'https://www.alamo.com',
        logo: '💰',
        color: '#00D9FF',
        featured: false,
        features: ['Budget pricing', 'No hidden fees', 'Simple booking', 'Loyalty rewards', 'Wide selection']
      }
    ]
  },
  {
    category: 'Avis Budget Group (3 Brands)',
    description: 'Global presence with 2.2M+ vehicles',
    partners: [
      {
        name: 'Avis',
        type: 'Rental Company',
        vehicles: '1.2M+ worldwide',
        daily: '$45-$140',
        occupancy: '80%+',
        rating: 4.4,
        reviews: 110000,
        focus: 'Premium & Business Rentals',
        description: 'Premium rental brand. Business travelers, premium vehicles, executive programs.',
        url: 'https://www.avis.com',
        logo: '🎯',
        color: '#D4AF37',
        featured: false,
        features: ['Premium vehicles', 'Business programs', 'Executive lounge access', 'Preferred status', 'Premium service']
      },
      {
        name: 'Budget',
        type: 'Rental Company',
        vehicles: '1M+ worldwide',
        daily: '$35-$120',
        occupancy: '78%+',
        rating: 4.2,
        reviews: 85000,
        focus: 'Budget-Conscious Rentals',
        description: 'Budget-friendly option. Value pricing, extensive locations, loyalty program.',
        url: 'https://www.budget.com',
        logo: '💵',
        color: '#E91E63',
        featured: false,
        features: ['Budget pricing', 'Extensive locations', 'Loyalty program', 'Mobile app', 'Easy booking']
      },
      {
        name: 'Zipcar',
        type: 'Car Sharing',
        vehicles: '50K+ vehicles',
        daily: '$10-$20/hour',
        occupancy: 'Variable',
        rating: 4.3,
        reviews: 65000,
        focus: 'Hourly Car Sharing',
        description: 'Hourly car sharing for urban areas. Pay-as-you-go, no long-term commitment.',
        url: 'https://www.zipcar.com',
        logo: '⏰',
        color: '#00D9FF',
        featured: false,
        features: ['Hourly billing', 'Urban focus', 'No long-term commitment', 'Insurance included', 'Gas included']
      }
    ]
  },
  {
    category: 'Hertz Global (3 Brands)',
    description: 'Global operations with 900K+ vehicles',
    partners: [
      {
        name: 'Hertz',
        type: 'Rental Company',
        vehicles: '900K+ worldwide',
        daily: '$50-$160',
        occupancy: '76%+',
        rating: 4.1,
        reviews: 95000,
        focus: 'Premium & Luxury Rentals',
        description: 'Premium rental company. Luxury vehicles, executive programs, premium service.',
        url: 'https://www.hertz.com',
        logo: '🚗',
        color: '#D4AF37',
        featured: false,
        features: ['Luxury vehicles', 'Premium service', 'Executive programs', 'Gold Plus rewards', 'Premium locations']
      },
      {
        name: 'Dollar',
        type: 'Rental Company',
        vehicles: '500K+ worldwide',
        daily: '$35-$110',
        occupancy: '75%+',
        rating: 4.0,
        reviews: 60000,
        focus: 'Value Rentals',
        description: 'Value-focused rental option. Competitive pricing, good selection, loyalty rewards.',
        url: 'https://www.dollar.com',
        logo: '💸',
        color: '#E91E63',
        featured: false,
        features: ['Value pricing', 'Good selection', 'Loyalty rewards', 'Easy booking', 'Wide locations']
      },
      {
        name: 'Thrifty',
        type: 'Rental Company',
        vehicles: '400K+ worldwide',
        daily: '$30-$100',
        occupancy: '72%+',
        rating: 3.9,
        reviews: 50000,
        focus: 'Budget Rentals',
        description: 'Budget-friendly rental. Lowest prices, basic vehicles, simple service.',
        url: 'https://www.thrifty.com',
        logo: '🏷️',
        color: '#00D9FF',
        featured: false,
        features: ['Lowest prices', 'Basic vehicles', 'Simple service', 'Budget focus', 'Quick booking']
      }
    ]
  },
  {
    category: 'Peer-to-Peer & Sharing',
    description: 'Innovative rental models',
    partners: [
      {
        name: 'Turo',
        type: 'Peer-to-Peer',
        vehicles: '500K+ hosts',
        daily: '$30-$300+',
        occupancy: 'Variable',
        rating: 4.6,
        reviews: 200000,
        focus: 'Personal Vehicle Sharing',
        description: 'Airbnb for cars. Rent from local hosts. Unique vehicles, competitive pricing, local experiences.',
        url: 'https://turo.com',
        logo: '👥',
        color: '#D4AF37',
        featured: false,
        features: ['Personal vehicles', 'Local hosts', 'Unique selection', 'Competitive pricing', 'Insurance included']
      }
    ]
  },
  {
    category: 'Aggregators & Comparison',
    description: 'Compare all rental companies',
    partners: [
      {
        name: 'Kayak',
        type: 'Metasearch',
        vehicles: 'All major brands',
        daily: 'Comparison',
        occupancy: 'Real-time',
        rating: 4.5,
        reviews: 150000,
        focus: 'Rental Comparison',
        description: 'Compare prices across all major rental companies. Find best deals instantly.',
        url: 'https://www.kayak.com',
        logo: '🔍',
        color: '#E91E63',
        featured: false,
        features: ['Price comparison', 'Real-time rates', 'Best deal finder', 'Travel planning', 'Mobile app']
      },
      {
        name: 'Rentalcars.com',
        type: 'Aggregator',
        vehicles: '38+ companies',
        daily: 'Comparison',
        occupancy: 'Real-time',
        rating: 4.4,
        reviews: 120000,
        focus: 'Global Rental Comparison',
        description: 'Global rental car comparison. 38+ companies, worldwide coverage, best prices.',
        url: 'https://www.rentalcars.com',
        logo: '🌍',
        color: '#00D9FF',
        featured: false,
        features: ['38+ companies', 'Global coverage', 'Best prices', 'Easy booking', 'Customer support']
      },
      {
        name: 'AutoSlash',
        type: 'Comparison',
        vehicles: 'All major brands',
        daily: 'Comparison',
        occupancy: 'Real-time',
        rating: 4.3,
        reviews: 80000,
        focus: 'Price Comparison',
        description: 'Discount-focused rental comparison. Find lowest prices, track rate changes.',
        url: 'https://www.autoslash.com',
        logo: '💲',
        color: '#D4AF37',
        featured: false,
        features: ['Lowest prices', 'Rate tracking', 'Discount finder', 'Easy comparison', 'Mobile app']
      }
    ]
  }
];

// Partner Card Component
function PartnerCard({ partner }: { partner: typeof RENTAL_CATEGORIES[0]['partners'][0] }) {
  return (
    <a
      href={partner.url}
      target={partner.url === '#' ? undefined : '_blank'}
      rel={partner.url === '#' ? undefined : 'noopener noreferrer'}
      className={`group relative rounded-lg p-6 transition-all duration-300 overflow-hidden border ${
        partner.featured
          ? 'bg-gradient-to-br from-cyan-900 to-cyan-950 border-cyan-700 hover:border-cyan-600 md:col-span-2'
          : 'bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800 hover:border-slate-700'
      }`}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl"
        style={{ backgroundColor: partner.color }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-4xl mb-2">{partner.logo}</div>
            <h3 className="text-lg font-bold text-white">{partner.name}</h3>
            <p className="text-xs text-gray-400">{partner.type}</p>
          </div>
          {partner.url !== '#' && (
            <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-gray-300 transition-colors" />
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-300 mb-4">{partner.description}</p>

        {/* Stats */}
        <div className={`grid gap-3 mb-4 pb-4 border-b border-slate-700 ${partner.featured ? 'grid-cols-4' : 'grid-cols-2'}`}>
          <div>
            <p className="text-xs text-gray-400">Fleet Size</p>
            <p className="text-sm font-semibold text-white">{partner.vehicles}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Daily Rate</p>
            <p className="text-sm font-semibold" style={{ color: partner.color }}>{partner.daily}</p>
          </div>
          {partner.featured && (
            <>
              <div>
                <p className="text-xs text-gray-400">Rating</p>
                <p className="text-sm font-semibold text-white flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" style={{ color: partner.color }} />
                  {partner.rating}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Reviews</p>
                <p className="text-sm font-semibold text-white">{(partner.reviews / 1000).toFixed(0)}K+</p>
              </div>
            </>
          )}
        </div>

        {/* Features */}
        {partner.featured && (
          <div className="mb-4">
            <p className="text-xs text-gray-400 mb-2 font-semibold">KEY FEATURES</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {partner.features.map((feature, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-1 rounded-full text-white"
                  style={{ backgroundColor: `${partner.color}20`, color: partner.color }}
                >
                  {feature}
                </span>
              ))}
            </div>
            {partner.fleet && (
              <div>
                <p className="text-xs text-gray-400 mb-2 font-semibold">FLEET EXAMPLES</p>
                <div className="flex flex-wrap gap-2">
                  {partner.fleet.map((vehicle, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded bg-slate-800 text-gray-300"
                    >
                      {vehicle}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: partner.color }}>
          {partner.featured ? 'Book Now' : 'View Rentals'} <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </a>
  );
}

// Main Component
export default function CarRentalOutlets() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = RENTAL_CATEGORIES.map(cat => ({
    ...cat,
    partners: cat.partners.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.focus.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.partners.length > 0);

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
                <span className="text-sm font-semibold text-gray-400">CAR RENTAL OUTLETS</span>
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
                🚗 20+ Rental Partners
              </h1>
              <p className="text-lg text-gray-400 max-w-2xl">
                Our luxury fleet plus partnerships with Enterprise, Avis, Hertz, Turo, and major aggregators. Book your perfect vehicle today.
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-2">Our Fleet</p>
                <p className="text-3xl font-bold text-cyan-400">85</p>
                <p className="text-xs text-gray-400 mt-1">luxury vehicles</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-2">Partner Fleets</p>
                <p className="text-3xl font-bold text-yellow-400">10M+</p>
                <p className="text-xs text-gray-400 mt-1">worldwide</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-2">Daily Rates</p>
                <p className="text-3xl font-bold text-rose-400">$10-$450</p>
                <p className="text-xs text-gray-400 mt-1">all budgets</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-2">Global Coverage</p>
                <p className="text-3xl font-bold text-cyan-400">Worldwide</p>
                <p className="text-xs text-gray-400 mt-1">all locations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search rental companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Rental Partners by Category */}
        {filteredCategories.map((category, catIdx) => (
          <div key={catIdx} className="border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-2">{category.category}</h2>
                <p className="text-gray-400">{category.description}</p>
              </div>
              <div className={`grid gap-6 ${
                category.partners.some(p => p.featured)
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
              }`}>
                {category.partners.map((partner, idx) => (
                  <PartnerCard key={idx} partner={partner} />
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Why SAFERWAY */}
        <div className="border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <h2 className="text-3xl font-bold text-white mb-12">Why Choose SAFERWAY for Rentals?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
                <Award className="w-8 h-8 text-cyan-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Best of Both Worlds</h3>
                <p className="text-gray-400 text-sm">Our luxury fleet + partnerships with all major rental companies. One-stop shop for all your rental needs.</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
                <Zap className="w-8 h-8 text-yellow-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Competitive Pricing</h3>
                <p className="text-gray-400 text-sm">Compare prices across all partners instantly. Find the best deal for your budget and preferences.</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
                <TrendingUp className="w-8 h-8 text-rose-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Loyalty Rewards</h3>
                <p className="text-gray-400 text-sm">Earn points on all rentals. Redeem for upgrades, discounts, or free days with our partners.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="bg-gradient-to-r from-cyan-500 to-rose-500 bg-opacity-10 border border-cyan-500 border-opacity-30 rounded-lg p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Book Your Perfect Vehicle?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Choose from our luxury fleet or browse 20+ rental partners. Find the perfect vehicle for your needs.
            </p>
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300">
              Book a Rental <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Sparkles, ArrowRight, Calendar, Clock, Award, Shield, Zap, Heart, Star, Check, ChevronRight } from 'lucide-react';

/**
 * SAFERWAY - PREMIUM CERAMIC DETAILING SERVICES
 * Detailed showcase with booking integration
 */

const DETAILING_PACKAGES = [
  {
    id: 'elite',
    name: 'Ceramic Coating Elite',
    price: 2200,
    duration: '6-8 hours',
    warranty: '5 years',
    color: '#00D9FF',
    description: 'Our premium ceramic coating package with maximum protection and longevity.',
    features: [
      'Full vehicle paint protection',
      'Hydrophobic nano-coating',
      'UV protection (fade resistant)',
      '5-year warranty included',
      'Professional installation',
      'Paint correction included',
      'Ceramic trim coating',
      'Glass coating'
    ],
    highlights: ['Best Protection', 'Longest Warranty', 'Premium Finish'],
    popular: true
  },
  {
    id: 'pro',
    name: 'Ceramic Coating Pro',
    price: 1800,
    duration: '4-6 hours',
    warranty: '3 years',
    color: '#D4AF37',
    description: 'Professional ceramic coating with excellent durability and protection.',
    features: [
      'Full paint protection',
      'Water beading technology',
      'Enhanced durability',
      '3-year warranty',
      'Professional finish',
      'Easy maintenance',
      'Gloss enhancement',
      'Spot-free drying'
    ],
    highlights: ['Great Value', 'Professional Quality', 'Easy Care'],
    popular: false
  },
  {
    id: 'standard',
    name: 'Ceramic Coating Standard',
    price: 1200,
    duration: '3-4 hours',
    warranty: '1 year',
    color: '#E91E63',
    description: 'Essential ceramic coating protection for vehicle maintenance.',
    features: [
      'Basic paint protection',
      'Shine enhancement',
      'Water resistance',
      '1-year warranty',
      'Professional application',
      'Easy maintenance',
      'Improved appearance'
    ],
    highlights: ['Affordable', 'Quick Service', 'Good Protection'],
    popular: false
  },
  {
    id: 'ppf',
    name: 'Paint Protection Film',
    price: 1500,
    duration: '4-5 hours',
    warranty: '10 years',
    color: '#00D9FF',
    description: 'Protective film for high-impact areas with self-healing technology.',
    features: [
      'Front bumper protection',
      'Hood protection',
      'Headlight guards',
      'Self-healing technology',
      '10-year warranty',
      'Invisible protection',
      'UV resistant',
      'Professional installation'
    ],
    highlights: ['Longest Warranty', 'Self-Healing', 'Maximum Protection'],
    popular: false
  }
];

const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Consultation',
    description: 'We assess your vehicle and discuss your protection needs',
    icon: '📋'
  },
  {
    step: 2,
    title: 'Preparation',
    description: 'Thorough wash and surface preparation',
    icon: '🧼'
  },
  {
    step: 3,
    title: 'Application',
    description: 'Expert ceramic coating application',
    icon: '🎨'
  },
  {
    step: 4,
    title: 'Curing',
    description: 'Proper curing time for maximum protection',
    icon: '⏱️'
  },
  {
    step: 5,
    title: 'Inspection',
    description: 'Quality check and final touches',
    icon: '✅'
  },
  {
    step: 6,
    title: 'Maintenance',
    description: 'Guidance on care and maintenance',
    icon: '📚'
  }
];

const TESTIMONIALS = [
  {
    name: 'James Mitchell',
    vehicle: 'Tesla Model S',
    rating: 5,
    text: 'Absolutely incredible work! My car looks brand new. The ceramic coating has held up perfectly for over a year.',
    color: '#00D9FF'
  },
  {
    name: 'Sarah Johnson',
    vehicle: 'BMW M440i',
    rating: 5,
    text: 'Professional team, amazing results. The attention to detail is unmatched. Worth every penny!',
    color: '#D4AF37'
  },
  {
    name: 'Michael Chen',
    vehicle: 'Porsche 911',
    rating: 5,
    text: 'Best detailing service I\'ve ever used. They treated my car like it was their own.',
    color: '#E91E63'
  }
];

// Package Card Component
function PackageCard({ pkg }: { pkg: typeof DETAILING_PACKAGES[0] }) {
  return (
    <div
      className={`relative rounded-lg overflow-hidden transition-all duration-300 ${
        pkg.popular
          ? 'border-2 transform scale-105 shadow-2xl'
          : 'border border-slate-700 hover:border-slate-600'
      }`}
      style={{
        borderColor: pkg.popular ? pkg.color : undefined,
        backgroundColor: 'rgb(15, 23, 42)'
      }}
    >
      {pkg.popular && (
        <div
          className="absolute top-0 right-0 px-4 py-2 text-white text-xs font-bold"
          style={{ backgroundColor: pkg.color }}
        >
          MOST POPULAR
        </div>
      )}

      <div className="p-8">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
          <p className="text-gray-400 text-sm mb-4">{pkg.description}</p>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-bold text-white">${pkg.price}</span>
            <span className="text-gray-400">one-time</span>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-slate-700">
          <div>
            <p className="text-xs text-gray-400 mb-1">Duration</p>
            <p className="text-sm font-semibold text-white flex items-center gap-2">
              <Clock className="w-4 h-4" style={{ color: pkg.color }} />
              {pkg.duration}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Warranty</p>
            <p className="text-sm font-semibold text-white flex items-center gap-2">
              <Shield className="w-4 h-4" style={{ color: pkg.color }} />
              {pkg.warranty}
            </p>
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {pkg.highlights.map((highlight, idx) => (
              <span
                key={idx}
                className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                style={{ backgroundColor: `${pkg.color}30`, color: pkg.color }}
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-8">
          <p className="text-xs text-gray-400 font-semibold mb-3">FEATURES</p>
          <ul className="space-y-2">
            {pkg.features.map((feature, idx) => (
              <li key={idx} className="text-sm text-gray-300 flex items-start gap-3">
                <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: pkg.color }} />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <button
          className="w-full py-3 rounded-lg font-semibold transition-all duration-300 text-white flex items-center justify-center gap-2"
          style={{
            backgroundColor: pkg.popular ? pkg.color : `${pkg.color}20`,
            color: pkg.popular ? 'white' : pkg.color,
            border: pkg.popular ? 'none' : `1px solid ${pkg.color}50`
          }}
        >
          Book Service <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Main Component
export default function DetailingServices() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

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
                <span className="text-sm font-semibold text-gray-400">PREMIUM DETAILING</span>
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
                🎨 Ceramic Coating Excellence
              </h1>
              <p className="text-lg text-gray-400 max-w-2xl">
                Professional ceramic coating services with industry-leading warranties. Protect your investment with our expert detailing team.
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-2">Packages Available</p>
                <p className="text-3xl font-bold text-cyan-400">4</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-2">Customer Satisfaction</p>
                <p className="text-3xl font-bold text-yellow-400">98.5%</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-2">Warranty Up To</p>
                <p className="text-3xl font-bold text-rose-400">10 Years</p>
              </div>
            </div>
          </div>
        </div>

        {/* Packages Section */}
        <div className="border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Choose Your Package</h2>
              <p className="text-gray-400">Select the protection level that fits your needs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {DETAILING_PACKAGES.map(pkg => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Our Process</h2>
              <p className="text-gray-400">Six-step professional detailing process</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PROCESS_STEPS.map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
                    <div className="text-4xl mb-4">{step.icon}</div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {step.step}. {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                  </div>
                  {idx < PROCESS_STEPS.length - 1 && (
                    <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                      <ChevronRight className="w-8 h-8 text-slate-700" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Why Choose SAFERWAY?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
                <Award className="w-8 h-8 text-cyan-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Expert Team</h3>
                <p className="text-gray-400 text-sm">Certified professionals with 15+ years of experience</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
                <Shield className="w-8 h-8 text-yellow-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Guaranteed Protection</h3>
                <p className="text-gray-400 text-sm">Up to 10-year warranties on all services</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
                <Zap className="w-8 h-8 text-rose-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Premium Materials</h3>
                <p className="text-gray-400 text-sm">Only the highest quality ceramic coatings used</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
                <Heart className="w-8 h-8 text-cyan-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Customer Care</h3>
                <p className="text-gray-400 text-sm">Dedicated support and maintenance guidance</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
                <Star className="w-8 h-8 text-yellow-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">5-Star Rated</h3>
                <p className="text-gray-400 text-sm">98.5% customer satisfaction rate</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
                <Calendar className="w-8 h-8 text-rose-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Flexible Booking</h3>
                <p className="text-gray-400 text-sm">Easy scheduling with convenient time slots</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Customer Testimonials</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((testimonial, idx) => (
                <div key={idx} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" style={{ color: testimonial.color }} />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.vehicle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="bg-gradient-to-r from-cyan-500 to-rose-500 bg-opacity-10 border border-cyan-500 border-opacity-30 rounded-lg p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Protect Your Investment?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Book your ceramic coating service today and experience the SAFERWAY difference.
            </p>
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300">
              Schedule Appointment <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

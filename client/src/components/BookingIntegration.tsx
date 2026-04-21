import React, { useState } from 'react';
import { Calendar, MapPin, Users, DollarSign, Zap, X, Check, ArrowRight } from 'lucide-react';

/**
 * SAFERWAY BOOKING INTEGRATION
 * Unified booking flows for Detailing, Auctions, and Rentals
 */

interface BookingFormData {
  serviceType: 'detailing' | 'auction' | 'rental' | null;
  date?: string;
  time?: string;
  location?: string;
  vehicleType?: string;
  package?: string;
  duration?: string;
  name: string;
  email: string;
  phone: string;
}

export function BookingIntegration() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>({
    serviceType: null,
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleServiceSelect = (service: 'detailing' | 'auction' | 'rental') => {
    setFormData({ ...formData, serviceType: service });
    setStep(2);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setStep(1);
      setFormData({ serviceType: null, name: '', email: '', phone: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const renderServiceSelection = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white mb-6">Select Service</h2>
      <button
        onClick={() => handleServiceSelect('detailing')}
        className="w-full p-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white rounded-lg font-semibold transition-all duration-300 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">🎨</span>
          <div>
            <p>Ceramic Detailing</p>
            <p className="text-xs opacity-75">Premium coating services</p>
          </div>
        </div>
      </button>
      <button
        onClick={() => handleServiceSelect('auction')}
        className="w-full p-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-lg font-semibold transition-all duration-300 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">🔨</span>
          <div>
            <p>Auction Listings</p>
            <p className="text-xs opacity-75">Browse 15+ platforms</p>
          </div>
        </div>
      </button>
      <button
        onClick={() => handleServiceSelect('rental')}
        className="w-full p-4 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-lg font-semibold transition-all duration-300 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">🚗</span>
          <div>
            <p>Car Rentals</p>
            <p className="text-xs opacity-75">Our fleet + 20+ partners</p>
          </div>
        </div>
      </button>
    </div>
  );

  const renderDetailingForm = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white mb-6">Book Detailing Service</h2>
      <div>
        <label className="text-sm text-gray-400 mb-2 block">Select Package</label>
        <select
          value={formData.package || ''}
          onChange={(e) => handleInputChange('package', e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="">Choose a package...</option>
          <option value="elite">Ceramic Coating Elite - $2,200</option>
          <option value="pro">Ceramic Coating Pro - $1,800</option>
          <option value="standard">Ceramic Coating Standard - $1,200</option>
          <option value="ppf">Paint Protection Film - $1,500</option>
        </select>
      </div>
      <div>
        <label className="text-sm text-gray-400 mb-2 block">Preferred Date</label>
        <input
          type="date"
          value={formData.date || ''}
          onChange={(e) => handleInputChange('date', e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
        />
      </div>
      <div>
        <label className="text-sm text-gray-400 mb-2 block">Preferred Time</label>
        <input
          type="time"
          value={formData.time || ''}
          onChange={(e) => handleInputChange('time', e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
        />
      </div>
    </div>
  );

  const renderAuctionForm = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white mb-6">Find Auction Vehicles</h2>
      <div>
        <label className="text-sm text-gray-400 mb-2 block">Vehicle Type</label>
        <select
          value={formData.vehicleType || ''}
          onChange={(e) => handleInputChange('vehicleType', e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="">Select type...</option>
          <option value="salvage">Salvage Vehicles</option>
          <option value="repairable">Repairable Vehicles</option>
          <option value="collector">Collector Cars</option>
          <option value="clean">Clean Title</option>
        </select>
      </div>
      <div>
        <label className="text-sm text-gray-400 mb-2 block">Location</label>
        <input
          type="text"
          placeholder="Enter location or ZIP code"
          value={formData.location || ''}
          onChange={(e) => handleInputChange('location', e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
        />
      </div>
      <div>
        <label className="text-sm text-gray-400 mb-2 block">Budget Range</label>
        <input
          type="text"
          placeholder="e.g., $5,000 - $20,000"
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
        />
      </div>
    </div>
  );

  const renderRentalForm = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white mb-6">Book Car Rental</h2>
      <div>
        <label className="text-sm text-gray-400 mb-2 block">Pickup Date</label>
        <input
          type="date"
          value={formData.date || ''}
          onChange={(e) => handleInputChange('date', e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
        />
      </div>
      <div>
        <label className="text-sm text-gray-400 mb-2 block">Return Date</label>
        <input
          type="date"
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
        />
      </div>
      <div>
        <label className="text-sm text-gray-400 mb-2 block">Vehicle Type</label>
        <select
          value={formData.vehicleType || ''}
          onChange={(e) => handleInputChange('vehicleType', e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="">Select type...</option>
          <option value="luxury">Luxury (Our Fleet)</option>
          <option value="economy">Economy</option>
          <option value="midsize">Mid-Size</option>
          <option value="suv">SUV</option>
        </select>
      </div>
      <div>
        <label className="text-sm text-gray-400 mb-2 block">Pickup Location</label>
        <input
          type="text"
          placeholder="Enter city or airport code"
          value={formData.location || ''}
          onChange={(e) => handleInputChange('location', e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
        />
      </div>
    </div>
  );

  const renderContactForm = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white mb-6">Your Information</h2>
      <div>
        <label className="text-sm text-gray-400 mb-2 block">Full Name</label>
        <input
          type="text"
          placeholder="John Doe"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
        />
      </div>
      <div>
        <label className="text-sm text-gray-400 mb-2 block">Email</label>
        <input
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
        />
      </div>
      <div>
        <label className="text-sm text-gray-400 mb-2 block">Phone</label>
        <input
          type="tel"
          placeholder="(555) 123-4567"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
        />
      </div>
    </div>
  );

  const renderSuccessMessage = () => (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
        <Check className="w-8 h-8 text-green-400" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h2>
      <p className="text-gray-400 mb-4">
        We've received your booking request. Our team will contact you shortly to confirm.
      </p>
      <p className="text-sm text-gray-500">Confirmation email sent to {formData.email}</p>
    </div>
  );

  return (
    <>
      {/* Booking Button - can be placed in various locations */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
        >
          Book Now <ArrowRight className="w-4 h-4" />
        </button>
      )}

      {/* Booking Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-cyan-500 to-cyan-600 p-4 flex justify-between items-center">
              <h1 className="text-lg font-bold text-white">SAFERWAY Booking</h1>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setStep(1);
                  setFormData({ serviceType: null, name: '', email: '', phone: '' });
                }}
                className="p-1 hover:bg-cyan-700 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {isSubmitted ? (
                renderSuccessMessage()
              ) : (
                <>
                  {/* Progress */}
                  <div className="flex gap-2 mb-6">
                    {[1, 2, 3].map((s) => (
                      <div
                        key={s}
                        className={`h-1 flex-1 rounded-full transition-all ${
                          s <= step ? 'bg-cyan-500' : 'bg-slate-700'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Form Content */}
                  {step === 1 && renderServiceSelection()}
                  {step === 2 && formData.serviceType === 'detailing' && renderDetailingForm()}
                  {step === 2 && formData.serviceType === 'auction' && renderAuctionForm()}
                  {step === 2 && formData.serviceType === 'rental' && renderRentalForm()}
                  {step === 3 && renderContactForm()}

                  {/* Navigation */}
                  <div className="flex gap-3 mt-8">
                    {step > 1 && (
                      <button
                        onClick={() => setStep(step - 1)}
                        className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors"
                      >
                        Back
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (step < 3) {
                          setStep(step + 1);
                        } else {
                          handleSubmit();
                        }
                      }}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white rounded-lg font-semibold transition-all"
                    >
                      {step === 3 ? 'Confirm Booking' : 'Next'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BookingIntegration;

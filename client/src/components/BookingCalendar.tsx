import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, Users, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * SAFERWAY & GREAT DETAIL - BOOKING CALENDAR COMPONENT
 * Real-time availability, booking management, calendar sync
 */

interface TimeSlot {
  id: string;
  time: string;
  available: number;
  capacity: number;
  price: number;
  status: 'available' | 'full' | 'blocked';
}

interface CalendarDay {
  date: Date;
  slots: TimeSlot[];
  isToday: boolean;
  isPast: boolean;
}

export function BookingCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedService, setSelectedService] = useState<'detailing' | 'auction' | 'rental'>('detailing');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Generate calendar days
  const generateCalendarDays = (): CalendarDay[] => {
    const days: CalendarDay[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);

      const slots: TimeSlot[] = [
        { id: `slot_${i}_1`, time: '09:00', available: 5, capacity: 5, price: 1200, status: 'available' },
        { id: `slot_${i}_2`, time: '12:00', available: 3, capacity: 5, price: 1200, status: 'available' },
        { id: `slot_${i}_3`, time: '15:00', available: 0, capacity: 5, price: 1200, status: 'full' },
        { id: `slot_${i}_4`, time: '18:00', available: 4, capacity: 5, price: 1200, status: 'available' },
      ];

      days.push({
        date,
        slots,
        isToday: date.getTime() === today.getTime(),
        isPast: date < today
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const daysInView = calendarDays.slice(0, 7);

  const getServiceColor = (service: string) => {
    const colors: Record<string, string> = {
      detailing: 'from-cyan-500 to-cyan-600',
      auction: 'from-purple-500 to-purple-600',
      rental: 'from-green-500 to-green-600'
    };
    return colors[service] || 'from-slate-500 to-slate-600';
  };

  const getServicePrice = (service: string) => {
    const prices: Record<string, number> = {
      detailing: 1200,
      auction: 500,
      rental: 150
    };
    return prices[service] || 0;
  };

  return (
    <div className="space-y-6">
      {/* Service Selector */}
      <div className="flex gap-3 flex-wrap">
        {(['detailing', 'auction', 'rental'] as const).map(service => (
          <button
            key={service}
            onClick={() => setSelectedService(service)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedService === service
                ? `bg-gradient-to-r ${getServiceColor(service)} text-white`
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            {service.charAt(0).toUpperCase() + service.slice(1)}
          </button>
        ))}
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">
          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setDate(newDate.getDate() - 7);
              setCurrentDate(newDate);
            }}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          </button>
          <button
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setDate(newDate.getDate() + 7);
              setCurrentDate(newDate);
            }}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
        {daysInView.map((day, idx) => (
          <div
            key={idx}
            className={`border rounded-lg p-3 transition-all ${
              day.isPast
                ? 'bg-slate-800 border-slate-700 opacity-50 cursor-not-allowed'
                : day.isToday
                ? 'bg-gradient-to-br from-cyan-500 to-cyan-600 bg-opacity-20 border-cyan-500 border-opacity-50'
                : 'bg-slate-800 border-slate-700 hover:border-slate-600 cursor-pointer'
            }`}
          >
            <p className={`text-sm font-semibold ${day.isToday ? 'text-cyan-400' : 'text-gray-300'}`}>
              {day.date.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' })}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {day.slots.filter(s => s.status === 'available').length} available
            </p>
          </div>
        ))}
      </div>

      {/* Time Slots */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
        <h4 className="text-lg font-bold text-white mb-4">Available Times</h4>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {daysInView[0]?.slots.map(slot => (
            <button
              key={slot.id}
              onClick={() => setSelectedSlot(slot.id)}
              disabled={slot.status === 'full'}
              className={`p-3 rounded-lg transition-all font-semibold ${
                slot.status === 'full'
                  ? 'bg-slate-700 text-gray-500 cursor-not-allowed opacity-50'
                  : selectedSlot === slot.id
                  ? `bg-gradient-to-r ${getServiceColor(selectedService)} text-white`
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              <div className="text-sm">{slot.time}</div>
              <div className="text-xs mt-1 opacity-75">
                {slot.available}/{slot.capacity} spots
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Slot Details */}
      {selectedSlot && (
        <div className="bg-gradient-to-br from-green-500 to-green-600 bg-opacity-10 border border-green-500 border-opacity-30 rounded-lg p-6">
          <h4 className="text-lg font-bold text-white mb-4">Booking Summary</h4>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-sm text-gray-400">Date & Time</p>
                <p className="text-white font-semibold">
                  {daysInView[0]?.date.toLocaleDateString()} at 09:00 AM
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-sm text-gray-400">Service</p>
                <p className="text-white font-semibold">
                  {selectedService.charAt(0).toUpperCase() + selectedService.slice(1)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-sm text-gray-400">Price</p>
                <p className="text-white font-semibold">${getServicePrice(selectedService)}</p>
              </div>
            </div>
          </div>

          <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold">
            Continue to Booking
          </Button>
        </div>
      )}

      {/* Calendar Sync Options */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
        <p className="text-sm text-gray-400 mb-3">Sync to your calendar:</p>
        <div className="flex gap-2 flex-wrap">
          <button className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded text-sm text-gray-300 transition-colors">
            Google Calendar
          </button>
          <button className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded text-sm text-gray-300 transition-colors">
            Outlook
          </button>
          <button className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded text-sm text-gray-300 transition-colors">
            Apple Calendar
          </button>
        </div>
      </div>

      {/* Info Box */}
      <div className="flex gap-3 bg-blue-500 bg-opacity-10 border border-blue-500 border-opacity-30 rounded-lg p-4">
        <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-blue-300">
            <strong>Automatic Reminders:</strong> You'll receive email and SMS reminders 24 hours and 1 hour before your booking.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookingCalendar;

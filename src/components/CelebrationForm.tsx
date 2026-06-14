import React, { useState } from 'react';
import { Calendar, Users, PartyPopper, Check, HelpCircle, Mail, Phone, Clock } from 'lucide-react';
import { CelebrationBooking } from '../types';

export default function CelebrationForm() {
  const [formData, setFormData] = useState<CelebrationBooking>({
    name: '',
    email: '',
    phone: '',
    guests: 15,
    date: '',
    time: '',
    eventType: 'Birthday Celebration',
    notes: ''
  });

  const [bookingRef, setBookingRef] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const eventTypes = [
    'Birthday Celebration',
    'Anniversary Gala',
    'Charcoal Sizzle Party',
    'Office / Corporate Dinner',
    'Family Get-Together',
    'Other Special Occasion'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date) {
      alert('Please fill out at least your Name, Contact Mobile and Preferred Date.');
      return;
    }

    setSubmitting(true);
    
    // Simulate API saving
    setTimeout(() => {
      const randomCode = 'ROC-EVENT-' + Math.floor(1000 + Math.random() * 9000);
      setBookingRef(randomCode);
      setSubmitting(false);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      guests: 15,
      date: '',
      time: '',
      eventType: 'Birthday Celebration',
      notes: ''
    });
    setBookingRef(null);
  };

  return (
    <section id="celebration-section" className="py-24 bg-charcoal-deep border-t border-white/5 relative z-10">
      <div className="absolute bottom-[10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-coal-orange/3 blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left info column */}
          <div className="lg:col-span-5 text-left flex flex-col gap-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold block">
              Host With Raw Heat
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Host An Unforgettable <br />
              <span className="text-gold italic">Celebration.</span>
            </h2>
            <div className="w-16 h-1 bg-gold rounded-full my-1"></div>
            
            <p className="font-sans text-zinc-300 text-sm leading-relaxed">
              Every meal at Rolls On Coals is a festive occasion. Ready to upgrade your party? Our Vasai restaurants offer exclusive group tables, customized buffet packages, free birthday sizzler platters, and dedicated service crews.
            </p>

            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gold/5 border border-gold/15 flex items-center justify-center shrink-0">
                  <PartyPopper className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Custom Sizzler Menus</h4>
                  <p className="text-xs text-white/50 mt-1">Unlimited mocktails, fireside coal starters, and handcrafted dessert frappes.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gold/5 border border-gold/15 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Lounge Ambience</h4>
                  <p className="text-xs text-white/50 mt-1">Warm industrial candle-lit seating, customizable audio volume, and high-energy vibes.</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-white/5 bg-charcoal/30 flex items-center gap-3 mt-4">
              <span className="text-xs font-semibold text-white/70">
                Planning bulk office catering or home barbecues? Call direct hotline: 
                <a href="tel:+919823456781" className="text-gold font-bold ml-1 hover:underline">
                  +91 98234 56781
                </a>
              </span>
            </div>
          </div>

          {/* Right column: Form segment */}
          <div className="lg:col-span-7">
            <div className="p-8 pb-10 rounded-2xl bg-charcoal/30 border border-white/5 glass-panel relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 blur-2xl rounded-full"></div>

              {bookingRef ? (
                /* Success message screen */
                <div className="py-12 px-4 text-center flex flex-col items-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 mb-2">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  
                  <h3 className="font-display text-2xl font-bold text-white">Event Booking Requested!</h3>
                  <p className="font-sans text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Our Head Host from the nearest kitchen will contact you to coordinate menu selections and lock your tables.
                  </p>

                  <div className="my-4 px-6 py-4.5 rounded-xl bg-charcoal/50 border border-white/10 max-w-sm w-full mx-auto">
                    <span className="text-[10px] uppercase font-bold text-white/55 block tracking-widest leading-none mb-1.5">
                      Your Celebration Booking PIN
                    </span>
                    <strong className="text-gold font-sans font-extrabold text-lg sm:text-xl tracking-wider select-all">
                      {bookingRef}
                    </strong>
                    <div className="flex justify-between text-[11px] text-white/40 mt-3 pt-3 border-t border-white/5 font-sans">
                      <span>Guests: {formData.guests}</span>
                      <span>Date: {formData.date}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleReset}
                    className="mt-4 px-6 py-3 rounded-lg border border-white/10 text-white/70 hover:text-white hover:bg-white/5 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                /* The Interactive input Form */
                <form onSubmit={handleSubmit} className="text-left flex flex-col gap-5">
                  <h3 className="font-display text-xl font-bold text-white mb-2 flex items-center gap-2">
                    <span>Reserve Event Coordinates</span>
                    <span className="text-xs font-normal text-gold italic font-sans">(No prepay needed)</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Customer Name */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-white/50 mb-1.5 leading-none">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sumit Jaiswal"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-charcoal/50 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-gold/50 placeholder-white/20"
                      />
                    </div>

                    {/* Guest Count Selector */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-white/50 mb-1.5 leading-none">
                        Guest Count (Min 8)
                      </label>
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, guests: Math.max(8, formData.guests - 5) })}
                          className="px-3.5 py-3 bg-charcoal border border-white/5 text-zinc-300 rounded-l-xl hover:text-gold cursor-pointer text-xs"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          readOnly
                          value={formData.guests}
                          className="w-full py-3 bg-charcoal/50 border-y border-white/5 text-center text-xs text-white font-bold"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, guests: Math.min(300, formData.guests + 5) })}
                          className="px-3.5 py-3 bg-charcoal border border-white/5 text-zinc-300 rounded-r-xl hover:text-gold cursor-pointer text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Mobile contact */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-white/50 mb-1.5 leading-none">
                        Mobile Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 99000 12345"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-charcoal/50 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-gold/50 placeholder-white/20"
                      />
                    </div>

                    {/* Email address */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-white/50 mb-1.5 leading-none">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. sumit@mail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-charcoal/50 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-gold/50 placeholder-white/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Date */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-white/50 mb-1.5 leading-none">
                        Celebration Date *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60" />
                        <input
                          type="date"
                          required
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-charcoal/50 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-gold/50 [color-scheme:dark]"
                        />
                      </div>
                    </div>

                    {/* Event Type selector */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-white/50 mb-1.5 leading-none">
                        Type of Event
                      </label>
                      <select
                        value={formData.eventType}
                        onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                        className="w-full px-4 py-3 bg-charcoal/50 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-gold/50 cursor-pointer"
                      >
                        {eventTypes.map((t, index) => (
                          <option key={index} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Special notes */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-white/50 mb-1.5 leading-none">
                      Special requests or Dietary guidelines
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Need high chair for kids, live music space or allergy details..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-3 bg-charcoal/50 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-gold/50 placeholder-white/20"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-gold hover:bg-gold/90 text-charcoal-deep font-sans text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-gold/10 hover:shadow-gold/25 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{submitting ? 'Registering Tables...' : 'Submit Party Request'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

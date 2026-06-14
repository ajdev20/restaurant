import React from 'react';
import { MapPin, Phone, Clock, Compass, CheckCircle } from 'lucide-react';
import { Outlet } from '../types';

interface OutletsProps {
  outlets: Outlet[];
  selectedOutletId: string;
  onSelectOutlet: (outlet: Outlet) => void;
}

export default function Outlets({ outlets, selectedOutletId, onSelectOutlet }: OutletsProps) {
  return (
    <section id="outlets-section" className="py-24 bg-obsidian border-t border-white/5 relative z-10">
      <div className="absolute top-[30%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-gold/3 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">Locate Us</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2">
            Find Us Nearby
          </h2>
          <p className="font-sans text-white/50 text-xs sm:text-sm mt-3 leading-relaxed">
            We are rapidly expanding to bring the authentic coal-grilled experience to your doorstep. Visit us at any of our premium locations.
          </p>
          <div className="w-16 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Outlets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {outlets.map((store) => {
            const isSelected = selectedOutletId === store.id;
            
            return (
              <div
                key={store.id}
                id={`outlet-card-${store.id}`}
                className={`p-8 rounded-2xl bg-charcoal/30 border glass-panel transition-all duration-300 flex flex-col justify-between text-left group ${
                  isSelected 
                    ? 'border-gold shadow-lg shadow-gold/5 bg-charcoal/70' 
                    : 'border-white/5 hover:border-gold/30 hover:bg-charcoal/40'
                }`}
              >
                <div>
                  {/* Top pin header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected 
                        ? 'bg-gold text-charcoal-deep' 
                        : 'bg-gold/10 text-gold group-hover:bg-gold group-hover:text-charcoal-deep'
                    }`}>
                      <MapPin className="w-6 h-6 stroke-[2]" />
                    </div>

                    {isSelected ? (
                      <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-gold font-bold bg-gold/10 px-2.5 py-1 rounded">
                        <CheckCircle className="w-3 h-3 text-gold fill-gold stroke-charcoal-deep" />
                        <span>Active Kitchen</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => onSelectOutlet(store)}
                        className="text-[10px] uppercase tracking-wider text-white/50 hover:text-gold font-bold bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded transition-colors cursor-pointer"
                      >
                        Select Store
                      </button>
                    )}
                  </div>

                  {/* Brand and locations detailed */}
                  <h3 className="font-sans text-lg font-bold text-white mb-2 group-hover:text-gold transition-colors">
                    ROC {store.name}
                  </h3>
                  <p className="font-sans text-zinc-300 text-xs leading-relaxed mb-1 pr-4">
                    {store.address}
                  </p>
                  
                  {/* Landmark info */}
                  {store.landmark && (
                    <span className="text-[10px] text-zinc-500 font-medium block mb-4 italic">
                      Landmark: {store.landmark}
                    </span>
                  )}

                  {/* Time stats */}
                  <div className="flex flex-col gap-2 border-t border-white/5 pt-4">
                    <div className="flex items-center gap-2 text-white/60 text-xs">
                      <Clock className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span>{store.workingHours}</span>
                    </div>
                    
                    <a
                      href={`tel:${store.phone.replace(/\s+/g, '')}`}
                      className="flex items-center gap-2 text-white/60 text-xs hover:text-gold transition-colors inline-block text-left"
                    >
                      <Phone className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span>{store.phone}</span>
                    </a>
                  </div>
                </div>

                {/* Get Directions Link matching image specs */}
                <div className="mt-8 pt-4 border-t border-white/5">
                  <a
                    href={store.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-gold text-xs font-bold uppercase tracking-wider group-hover:gap-2.5 transition-all text-left"
                  >
                    <span>Get Directions</span>
                    <Compass className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

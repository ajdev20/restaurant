import React from 'react';
import { Flame, ArrowRight, Sparkles, Star, ShoppingBag } from 'lucide-react';

interface HeroProps {
  onOrderOnlineClick: () => void;
}

export default function Hero({ onOrderOnlineClick }: HeroProps) {
  return (
    <section
      id="hero-section"
      className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden bg-gradient-to-b from-obsidian-dark to-obsidian"
    >
      {/* Decorative heat glows */}
      <div className="absolute top-[20%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-coal-orange/5 blur-[120px] pointer-events-none gold-pulse-bg"></div>
      <div className="absolute bottom-[10%] right-[-15%] w-[40vw] h-[40vw] rounded-full bg-gold/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left gap-6">
            {/* Status Indicator Chip */}
            <div
              id="hero-status-badge"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-semibold uppercase tracking-wider"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
              </span>
              <span>Now Serving at Vasai East & West</span>
            </div>

            {/* Headline Title */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
              Where Raw Heat Meets <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-[#ffd65a] to-gold italic font-semibold">
                Refined Taste.
              </span>
            </h1>

            {/* Description Subtext */}
            <p className="font-sans text-white/70 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed">
              From Oven Baked Sandwiches to Pastas, Pizzas, Rolls & Chinese — We've Got It All! Experience the sizzle of charcoal and the aroma of authentic grill craftsmanship.
            </p>

            {/* Interactive CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mt-2">
              <button
                id="hero-order-online-cta"
                onClick={onOrderOnlineClick}
                className="px-8 py-4 bg-coal-orange text-white text-sm font-bold uppercase tracking-wider rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-coal-orange/30 transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <ShoppingBag className="w-4.5 h-4.5 text-white/95" />
                <span>Order Online Now</span>
                <ArrowRight className="w-4 h-4 text-white/90 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-explore-menu-cta"
                onClick={onOrderOnlineClick}
                className="px-8 py-4 bg-transparent text-gold hover:text-white border border-gold/40 hover:border-white rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group hover:bg-white/5 cursor-pointer"
              >
                <span>Explore Whole Menu</span>
                <Flame className="w-4 h-4 text-gold group-hover:text-coal-orange transition-colors" />
              </button>
            </div>

            {/* Fast Stats */}
            <div className="flex items-center gap-8 mt-4 pt-6 border-t border-white/5 w-full">
              <div>
                <span className="block font-display text-2xl font-bold text-gold">100%</span>
                <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider">Coal Grilled</span>
              </div>
              <div className="h-8 w-px bg-white/10"></div>
              <div>
                <span className="block font-display text-2xl font-bold text-gold">45 mins</span>
                <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider">Avg Delivery</span>
              </div>
              <div className="h-8 w-px bg-white/10"></div>
              <div>
                <span className="block font-display text-2xl font-bold text-gold">Fresh</span>
                <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider">Artisanal Wraps</span>
              </div>
            </div>
          </div>

          {/* Hero Right Media */}
          <div className="lg:col-span-5 relative flex justify-center py-4">
            <div className="relative w-full max-w-[420px] aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-charcoal float-animation shadow-coal-orange/5">
              {/* Gold light ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-gold/20 via-coal-orange/10 to-transparent rounded-3xl blur opacity-60"></div>
              
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9an8RDXXvKk-BpjOanZ7nw6xnizwfrrz97DbvOteBB-xi7nOTkmdQkWxz6RSN8fsuOLAXNgv2Nem8bjUoXXO_kXc81J_bRrOpM6-0mSLLrhyVbtCUHyhnv4dELpVpi6Bz8Mxw_DitIBNdi2YikrsIoHnt-mPbKJWo59uu5_yW2hJwqHHG8HRuZ7WdUksbzMYiW_Y9EdUzJPGkVGiui4GPc4HQbmvru6gTMvhyLZ61TnMN9hj2M4KtvHiBaD6wifSf7Z1J0R-FKGE"
                alt="ROC Charcoal Roll"
                className="w-full h-full object-cover relative z-10 transition-transform duration-700 hover:scale-110"
                referrerPolicy="no-referrer"
              />

              {/* Float Badge overlay */}
              <div className="absolute bottom-6 right-6 z-20 px-4 py-3 rounded-xl bg-charcoal/90 backdrop-blur-md border border-gold/40 shadow-xl flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border border-black bg-coal-orange flex items-center justify-center text-[10px] font-bold text-white">🔥</div>
                  <div className="w-8 h-8 rounded-full border border-black bg-gold flex items-center justify-center text-[10px] font-bold text-black">✨</div>
                  <div className="w-8 h-8 rounded-full border border-black bg-charcoal-light flex items-center justify-center text-[10px] font-bold text-white">5★</div>
                </div>
                <div className="text-left">
                  <span className="block text-[11px] font-bold text-white leading-none">500+ Daily Orders</span>
                  <span className="text-[9px] text-white/50 font-medium">Vasai Local Favorite</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

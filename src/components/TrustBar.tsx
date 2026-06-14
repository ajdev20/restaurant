import React from 'react';
import { Star, ShieldCheck, Award } from 'lucide-react';

export default function TrustBar() {
  return (
    <section id="trust-bar-section" className="py-8 bg-obsidian border-y border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24 text-center md:text-left">
          
          {/* Google Reviews */}
          <div className="flex flex-col sm:flex-row items-center gap-4 group">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gold/10 text-gold border border-gold/15 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="font-display text-3xl font-bold text-gold tracking-tight">4.3</span>
                <div className="flex text-gold">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-gold stroke-gold" />
                  ))}
                  <Star className="w-4.5 h-4.5 text-gold stroke-gold opacity-50" />
                </div>
              </div>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/50 mt-1">
                Verified Google Reviews
              </p>
            </div>
          </div>

          {/* Separator */}
          <div className="hidden md:block h-10 w-px bg-white/10"></div>

          {/* Justdial Ratings */}
          <div className="flex flex-col sm:flex-row items-center gap-4 group">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gold/10 text-gold border border-gold/15 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="font-display text-3xl font-bold text-gold tracking-tight">4.2</span>
                <div className="flex text-gold">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-gold stroke-gold" />
                  ))}
                  <Star className="w-4.5 h-4.5 text-gold stroke-gold opacity-40" />
                </div>
              </div>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/50 mt-1">
                Justdial Ratings (Vasai East)
              </p>
            </div>
          </div>

          {/* Separator */}
          <div className="hidden md:block h-10 w-px bg-white/10"></div>

          {/* Safety standards */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="text-xl sm:text-2xl font-bold text-white/40 font-display">FSSAI APPROVED</span>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/50">
              100% Hygiene Certified
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

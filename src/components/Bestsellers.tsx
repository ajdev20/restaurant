import React from 'react';
import { Star, Flame, Coffee, CookingPot, Utensils, Sparkles, Plus, Check } from 'lucide-react';
import { MenuItem } from '../types';

interface BestsellersProps {
  items: MenuItem[];
  onOpenCustomizer: (item: MenuItem) => void;
  cartItemIds: string[];
}

export default function Bestsellers({ items, onOpenCustomizer, cartItemIds }: BestsellersProps) {
  // Only display marked bestsellers
  const bestsellers = items.filter(i => i.isBestseller);

  // Match visual category icons based on item category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'beverages':
        return <Coffee className="w-4 h-4 text-white/60" />;
      case 'chinese':
        return <CookingPot className="w-4 h-4 text-white/60" />;
      case 'sandwiches':
        return <Utensils className="w-4 h-4 text-white/60" />;
      default:
        return <Flame className="w-4 h-4 text-white/60" />;
    }
  };

  return (
    <section id="bestsellers-section" className="py-20 bg-charcoal-deep relative z-10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-coal-orange/3 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header containing text and simulated carousel arrow triggers */}
        <div className="flex justify-between items-end mb-12">
          <div className="text-left">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold block mb-2">
              The Best Sellers
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Our Must-Try Delicacies
            </h2>
            <div className="w-12 h-0.5 bg-coal-orange mt-3"></div>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <div className="text-xs text-white/40 uppercase font-bold tracking-widest mr-2">Swipe To Explore</div>
            <button className="w-10 h-10 rounded-full border border-white/10 hover:border-gold/50 flex items-center justify-center text-white/60 hover:text-gold hover:bg-white/5 transition-all cursor-pointer">
              ←
            </button>
            <button className="w-10 h-10 rounded-full border border-white/10 hover:border-gold/50 flex items-center justify-center text-white/60 hover:text-gold hover:bg-white/5 transition-all cursor-pointer">
              →
            </button>
          </div>
        </div>

        {/* 4 Cards Grid exactly like visual spec */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestsellers.map((dish) => {
            const alreadyInCart = cartItemIds.some(id => id.startsWith(dish.id));
            
            return (
              <div
                key={dish.id}
                id={`bestseller-card-${dish.id}`}
                className="group relative rounded-2xl overflow-hidden bg-charcoal/30 border border-white/5 flex flex-col justify-between gold-glow group"
              >
                {/* Media frame */}
                <div className="aspect-[4/5] overflow-hidden relative w-full bg-charcoal-light">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  {/* Subtle Gradient Cover at bottom and top */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 opacity-70"></div>

                  {/* Best Seller ribbon banner */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-gold text-charcoal-deep text-[10px] font-bold uppercase tracking-wider rounded-md shadow-lg font-sans">
                      <Sparkles className="w-3.5 h-3.5 fill-charcoal-deep" />
                      <span>Best Seller</span>
                    </span>
                  </div>

                  {/* Veg/Nonveg indicator top-right */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className={`inline-block px-2.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-widest ${
                      dish.type === 'veg' 
                        ? 'bg-green-500/10 text-green-400 border border-green-500/30' 
                        : 'bg-red-500/10 text-red-400 border border-red-500/30'
                    }`}>
                      {dish.type}
                    </span>
                  </div>

                  {/* Action overlay buttons on hover */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-[2px]">
                    <button
                      onClick={() => onOpenCustomizer(dish)}
                      className="px-5 py-3 rounded-xl bg-gold hover:bg-gold/90 text-charcoal-deep text-xs font-bold uppercase tracking-wider transition-all duration-200 transform scale-90 group-hover:scale-100 hover:shadow-lg hover:shadow-gold/20 flex items-center gap-1.5 cursor-pointer"
                    >
                      {alreadyInCart ? <Check className="w-4 h-4 stroke-[3]" /> : <Plus className="w-4 h-4 stroke-[3]" />}
                      <span>{alreadyInCart ? 'Add Another' : 'Order Now'}</span>
                    </button>
                  </div>
                </div>

                {/* Info block */}
                <div className="p-5 bg-charcoal border-t border-white/5 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-base font-bold text-white group-hover:text-gold transition-colors truncate">
                      {dish.name}
                    </h3>
                    <p className="font-sans text-[11px] text-white/50 line-clamp-2 mt-1 leading-normal mb-3 text-left">
                      {dish.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5">
                    <div className="text-left">
                      <span className="text-[10px] text-white/40 block leading-none mb-0.5 uppercase tracking-wider">Premium Portion</span>
                      <span className="text-gold font-bold font-sans text-sm">₹{dish.price} - ₹{dish.price + 150}</span>
                    </div>
                    
                    <div className="flex items-center gap-1.5">
                      {getCategoryIcon(dish.category)}
                      <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded text-[10px] font-semibold text-white/80">
                        <Star className="w-3 h-3 fill-gold stroke-gold" />
                        <span>{dish.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

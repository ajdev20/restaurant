import React, { useState, useMemo } from 'react';
import { Search, Flame, Star, Coffee, CookingPot, Utensils, Plus, Check, Filter } from 'lucide-react';
import { MenuItem, DishCategory } from '../types';

interface MenuCatalogProps {
  items: MenuItem[];
  onOpenCustomizer: (item: MenuItem) => void;
  cartItemIds: string[];
}

export default function MenuCatalog({ items, onOpenCustomizer, cartItemIds }: MenuCatalogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DishCategory>('all');
  const [vegOnly, setVegOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'rating' | 'priceAsc' | 'priceDesc'>('rating');

  // Human category titles map
  const categories: { key: DishCategory; label: string }[] = [
    { key: 'all', label: 'All Items' },
    { key: 'rolls', label: 'Specialty Rolls' },
    { key: 'sandwiches', label: 'Sandwiches' },
    { key: 'pizzas-pastas', label: 'Pizzas & Pastas' },
    { key: 'chinese', label: 'Chinese Woks' },
    { key: 'beverages', label: 'Beverages & Frost' }
  ];

  const filteredAndSortedItems = useMemo(() => {
    let result = [...items];

    // Search filter
    if (searchTerm.trim() !== '') {
      const lower = searchTerm.toLowerCase();
      result = result.filter(
        item =>
          item.name.toLowerCase().includes(lower) ||
          item.description.toLowerCase().includes(lower)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(item => item.category === selectedCategory);
    }

    // Veg Only toggle
    if (vegOnly) {
      result = result.filter(item => item.type === 'veg');
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else if (sortBy === 'priceAsc') {
        return a.price - b.price;
      } else if (sortBy === 'priceDesc') {
        return b.price - a.price;
      }
      return 0;
    });

    return result;
  }, [items, searchTerm, selectedCategory, vegOnly, sortBy]);

  const getSpiceDescriptor = (level?: number) => {
    if (!level || level === 0) return 'Mild / Sweet';
    if (level === 1) return 'Mild Buzz';
    if (level === 2) return 'Medium Char';
    return 'Fiery Hot Sizzle';
  };

  return (
    <section id="menu-catalog" className="py-24 bg-obsidian-dark border-t border-white/5 relative">
      <div className="absolute top-[10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-coal-orange/3 blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">Fresh Off Coals</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-1">
            Explore Our Entire Gourmet Menu
          </h2>
          <p className="font-sans text-white/50 text-xs sm:text-sm mt-3 leading-relaxed">
            Every dish is handcrafted and finished over natural coconut charcoal and direct fire embers for that classic, premium, and authentic smokey fragrance.
          </p>
          <div className="w-16 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Toolbar: Search, Filters, and Options */}
        <div className="p-6 rounded-2xl bg-charcoal/20 border border-white/5 mb-10 shadow-xl flex flex-col gap-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="lg:col-span-5 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/40" />
              <input
                type="text"
                placeholder="Search barbecue wraps, volcano sandwiches, woks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-charcoal border border-white/5 rounded-xl text-sm text-white placeholder-white/35 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>

            {/* Sorting */}
            <div className="lg:col-span-4 flex items-center gap-3">
              <span className="text-xs text-white/45 uppercase font-bold tracking-wider shrink-0">Sort By</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 bg-charcoal border border-white/5 rounded-xl text-xs sm:text-xs font-semibold text-white/95 focus:outline-none focus:border-gold/50 transition-colors cursor-pointer"
              >
                <option value="rating">Most Popular Reviews</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
              </select>
            </div>

            {/* Veg Only Toggle */}
            <div className="lg:col-span-3 flex justify-start sm:justify-end">
              <label className="flex items-center gap-3 cursor-pointer user-select-none">
                <span className="text-xs text-white/70 uppercase font-bold tracking-wider">Veg Only 🌱</span>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={vegOnly}
                    onChange={(e) => setVegOnly(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-charcoal peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white/80 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600 border border-white/10"></div>
                </div>
              </label>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-t border-white/5 pt-4">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4.5 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.key
                    ? 'bg-gold text-charcoal-deep shadow-lg shadow-gold/10'
                    : 'bg-charcoal text-white/80 hover:text-white hover:bg-charcoal-light border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Catalog Grid */}
        {filteredAndSortedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedItems.map((dish) => {
              const alreadyInCart = cartItemIds.some(id => id.startsWith(dish.id));
              
              return (
                <div
                  key={dish.id}
                  id={`catalog-card-${dish.id}`}
                  className="rounded-2xl overflow-hidden bg-charcoal/40 border border-white/5 flex flex-col justify-between gold-glow group"
                >
                  {/* Photo frame */}
                  <div className="relative aspect-[16/10] bg-charcoal overflow-hidden w-full">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>

                    {/* Left top bestseller indicator */}
                    {dish.isBestseller && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2 py-0.5 bg-coal-orange text-white text-[9px] font-bold rounded uppercase tracking-wider">
                          Bestseller
                        </span>
                      </div>
                    )}

                    {/* Right top Veg/Non-veg Dot indicator */}
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2 py-1 rounded bg-black/70 backdrop-blur-sm border border-white/10">
                      <span className={`w-2 h-2 rounded-full ${dish.type === 'veg' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span className="text-[9px] font-bold uppercase text-white/80">{dish.type}</span>
                    </div>

                    {/* Price and Category Floating banner */}
                    <div className="absolute bottom-3 left-3 z-10 flex items-baseline gap-1.5">
                      <span className="text-lg font-bold text-white font-sans">₹{dish.price}</span>
                      <span className="text-[10px] text-white/55 line-through">₹{dish.price + 100}</span>
                    </div>
                  </div>

                  {/* Body Info segment */}
                  <div className="p-5 flex-grow flex flex-col justify-between text-left">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-display text-base font-bold text-white group-hover:text-gold transition-colors leading-snug">
                          {dish.name}
                        </h3>
                        <div className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded text-[10px] text-white/80 select-none shrink-0 border border-white/5">
                          <Star className="w-3 h-3 fill-gold stroke-gold" />
                          <span>{dish.rating}</span>
                        </div>
                      </div>

                      <p className="font-sans text-xs text-white/60 leading-relaxed mt-2 line-clamp-2">
                        {dish.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                      <div className="text-left">
                        <span className="text-[9px] block text-white/40 uppercase tracking-widest font-bold">Spice Meter</span>
                        <div className="flex items-center gap-1 mt-0.5 mt-1">
                          {[...Array(3)].map((_, idx) => (
                            <Flame
                              key={idx}
                              className={`w-3.5 h-3.5 ${
                                dish.spiceLevel !== undefined && idx < dish.spiceLevel
                                  ? 'text-coal-orange fill-coal-orange'
                                  : 'text-white/20'
                              }`}
                            />
                          ))}
                          <span className="text-[9px] font-semibold text-white/45 ml-1">
                            {getSpiceDescriptor(dish.spiceLevel)}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => onOpenCustomizer(dish)}
                        className="px-4.5 py-2.5 rounded-xl bg-charcoal hover:bg-gold border border-white/5 text-white hover:text-charcoal-deep text-[11px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer hover:shadow-lg hover:shadow-gold/10"
                      >
                        {alreadyInCart ? <Check className="w-3.5 h-3.5 text-inherit stroke-[3]" /> : <Plus className="w-3.5 h-3.5 text-inherit" />}
                        <span>{alreadyInCart ? 'Add More' : 'Order Now'}</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-16 text-center rounded-2xl bg-charcoal/20 border border-white/5">
            <Flame className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="font-display text-lg font-bold text-white">No Charcoal Delicacies Match Your Search</h3>
            <p className="font-sans text-xs text-white/50 max-w-md mx-auto mt-2">
              Try adjusting your category filter, turning off "Veg Only", or scanning for a different keyword.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setVegOnly(false);
              }}
              className="mt-6 px-5 py-2.5 rounded-lg bg-gold/15 text-gold hover:bg-gold hover:text-charcoal-deep text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

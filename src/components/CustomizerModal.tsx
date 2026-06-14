import React, { useState, useEffect } from 'react';
import { X, Flame, Sparkles, Check, HelpCircle } from 'lucide-react';
import { MenuItem, CartCustomization } from '../types';

interface CustomizerModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onConfirm: (item: MenuItem, customization: CartCustomization, finalUnitPrice: number) => void;
}

export default function CustomizerModal({ item, onClose, onConfirm }: CustomizerModalProps) {
  const [spice, setSpice] = useState<0 | 1 | 2 | 3>(1);
  const [extraCheese, setExtraCheese] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState('');

  useEffect(() => {
    if (item) {
      setSpice(item.spiceLevel !== undefined ? (item.spiceLevel as 0 | 1 | 2 | 3) : 1);
      setExtraCheese(false);
      setSpecialInstructions('');
    }
  }, [item]);

  if (!item) return null;

  const cheeseSurcharge = 50;
  const finalPrice = item.price + (extraCheese ? cheeseSurcharge : 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(
      item,
      {
        spicePreference: spice,
        addExtraCheese: extraCheese,
        specialInstructions: specialInstructions
      },
      finalPrice
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-charcoal border border-gold/35 rounded-2xl overflow-hidden shadow-2xl flex flex-col pt-0 text-left">
        
        {/* Banner with close */}
        <div className="relative aspect-[16/6] bg-obsidian-dark w-full overflow-hidden flex items-end p-6">
          <img
            src={item.image}
            alt={item.name}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-black/50"></div>

          {/* Close button with circular layout */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 border border-white/15 text-white/80 hover:text-white transition-colors hover:bg-black/80 cursor-pointer z-20"
            aria-label="Close panel"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative z-10">
            <span className="text-[9px] uppercase font-bold tracking-widest text-gold bg-gold/15 border border-gold/30 px-2 py-0.5 rounded">
              Hand-finished over Coals
            </span>
            <h3 className="font-display text-2xl font-bold text-white mt-1.5 leading-none">
              Customize Taste
            </h3>
          </div>
        </div>

        {/* Content detail */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6 font-sans">
          
          {/* Header Info */}
          <div>
            <h4 className="text-base font-bold text-white leading-tight mb-1">{item.name}</h4>
            <p className="text-xs text-white/50 leading-relaxed">{item.description}</p>
          </div>

          <div className="h-px bg-white/5"></div>

          {/* Spice level adjustment */}
          <div>
            <span className="block text-[10px] uppercase font-bold text-white/60 tracking-widest mb-3">
              Configure Spice Preference
            </span>
            <div className="grid grid-cols-4 gap-2">
              {([
                { level: 0, label: 'Zero Heat' },
                { level: 1, label: 'Mild Buzz' },
                { level: 2, label: 'Classic Medium' },
                { level: 3, label: 'Coal Sizzle' }
              ] as const).map((opt) => (
                <button
                  type="button"
                  key={opt.level}
                  onClick={() => setSpice(opt.level)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    spice === opt.level
                      ? 'bg-coal-orange/10 border-coal-orange text-white'
                      : 'bg-black/20 border-white/5 text-white/60 hover:border-white/20'
                  }`}
                >
                  <Flame className={`w-4 h-4 ${spice === opt.level ? 'text-coal-orange fill-coal-orange' : 'text-white/20'}`} />
                  <span className="text-[9px] font-bold uppercase tracking-tight leading-none">
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons checkbox */}
          <div>
            <span className="block text-[10px] uppercase font-bold text-white/60 tracking-widest mb-2">
              Surcharge Upgrades
            </span>
            <label className="flex items-center justify-between p-4 bg-black/20 border border-white/5 rounded-xl cursor-pointer hover:border-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={extraCheese}
                  onChange={(e) => setExtraCheese(e.target.checked)}
                  className="w-4 h-4 text-gold border-white/10 rounded focus:ring-0 cursor-pointer bg-charcoal"
                />
                <div>
                  <span className="text-xs font-bold text-white block">Add Extra Melted Cheese 🌱</span>
                  <span className="text-[10px] text-white/45">Double creamy layered heat-melts</span>
                </div>
              </div>
              <span className="text-xs font-bold text-gold font-sans">+₹{cheeseSurcharge}</span>
            </label>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-white/60 tracking-widest mb-1.5">
              Special instructions for Head Chef
            </label>
            <input
              type="text"
              placeholder="e.g. Make it extra crisp, no onions, etc."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full px-4 py-3 bg-black/25 border border-white/5 rounded-xl text-xs text-white placeholder-white/25 focus:outline-none focus:border-gold/5"
            />
          </div>

          <div className="h-px bg-white/5"></div>

          {/* Pricing and Submission buttons */}
          <div className="flex items-center justify-between gap-4">
            <div className="text-left">
              <span className="text-[9px] uppercase font-bold text-white/40 block leading-none mb-1">
                Portion Cost
              </span>
              <span className="text-xl font-bold font-sans text-gold">
                ₹{finalPrice}
              </span>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 rounded-xl border border-white/5 hover:border-white/10 text-white/70 hover:text-white hover:bg-white/5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-coal-orange hover:bg-coal-orange/95 text-white text-xs font-bold uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-coal-orange/20 cursor-pointer active:scale-95"
              >
                Add To Order Panel
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}

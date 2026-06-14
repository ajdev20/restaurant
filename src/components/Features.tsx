import React from 'react';
import { Banknote, Users, PartyPopper } from 'lucide-react';

export default function Features() {
  const USP_ITEMS = [
    {
      id: "pocket-prices",
      icon: <Banknote className="w-8 h-8 text-gold" />,
      title: "Pocket-friendly prices",
      description: "Premium taste shouldn't break the bank. We offer gourmet dining at accessible price points for everyone."
    },
    {
      id: "attentive-staff",
      icon: <Users className="w-8 h-8 text-gold" />,
      title: "Attentive Staff",
      description: "Our hospitality is as warm as our coals. We pride ourselves on service that makes you feel like royalty."
    },
    {
      id: "celebration-vibe",
      icon: <PartyPopper className="w-8 h-8 text-gold" />,
      title: "Celebration Vibe",
      description: "Every meal is a festive occasion. Join us for a high-energy dining experience that's always a party."
    }
  ];

  return (
    <section id="features-section" className="py-20 bg-obsidian-dark relative">
      <div className="absolute top-[30%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-gold/3 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">The ROC Standard</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2">
            Why We Are Second To None
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {USP_ITEMS.map((feat) => (
            <div
              key={feat.id}
              id={`usp-${feat.id}`}
              className="p-8 pb-10 rounded-2xl bg-charcoal/40 border border-white/5 glass-panel gold-glow text-left flex flex-col gap-5 group"
            >
              <div className="w-16 h-16 rounded-xl bg-gold/5 border border-gold/15 flex items-center justify-center group-hover:bg-gold/20 group-hover:border-gold/50 transition-all duration-300">
                {feat.icon}
              </div>
              <div>
                <h3 className="font-sans text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors">
                  {feat.title}
                </h3>
                <p className="font-sans text-white/70 text-sm leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

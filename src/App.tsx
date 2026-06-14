import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Features from './components/Features';
import Bestsellers from './components/Bestsellers';
import MenuCatalog from './components/MenuCatalog';
import Outlets from './components/Outlets';
import CelebrationForm from './components/CelebrationForm';
import CustomizerModal from './components/CustomizerModal';
import CartSidebar from './components/CartSidebar';
import OrderStatusPanel from './components/OrderStatusPanel';
import { MENU_ITEMS, OUTLETS, TESTIMONIALS } from './data/menuData';
import { MenuItem, CartItem, CartCustomization, Outlet } from './types';
import { Flame, Star, Send, Twitter, ShieldCheck, HelpCircle } from 'lucide-react';

export default function App() {
  // Local storage support for persistent cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('roc_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [customizerItem, setCustomizerItem] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedOutletId, setSelectedOutletId] = useState<string>(OUTLETS[0].id);
  const [placedOrder, setPlacedOrder] = useState<any | null>(null);
  const [activeSection, setActiveSection] = useState('hero-section');

  // Sync to database local storage on modify
  useEffect(() => {
    localStorage.setItem('roc_cart', JSON.stringify(cart));
  }, [cart]);

  // Section observer to style active nav highlights
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero-section', 'menu-catalog', 'outlets-section', 'celebration-section', 'testimony-section'];
      let current = 'hero-section';
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            current = sectionId;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // height of fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Add Item handler
  const handleAddItemToCart = (item: MenuItem, customization: CartCustomization, finalPrice: number) => {
    // Composition of unique key containing item ID + extra cheese + spice level
    const customKey = `${item.id}-${customization.spicePreference}-${customization.addExtraCheese ? 'cheese' : 'none'}`;

    setCart(prevCart => {
      const existingIdx = prevCart.findIndex(i => i.id === customKey);
      
      if (existingIdx > -1) {
        // Increment quantity
        const updated = [...prevCart];
        updated[existingIdx].quantity += 1;
        updated[existingIdx].totalPrice = updated[existingIdx].quantity * updated[existingIdx].unitPrice;
        return updated;
      } else {
        // Add new order line
        const newItem: CartItem = {
          id: customKey,
          item,
          quantity: 1,
          customization,
          unitPrice: finalPrice,
          totalPrice: finalPrice
        };
        return [...prevCart, newItem];
      }
    });

    setCustomizerItem(null);
    setIsCartOpen(true); // Automatically open sidebar tray to notify consumer!
  };

  const handleUpdateQuantity = (cartItemId: string, change: number) => {
    setCart(prevCart => {
      const updated = prevCart.map(item => {
        if (item.id === cartItemId) {
          const nextQty = Math.max(1, item.quantity + change);
          return {
            ...item,
            quantity: nextQty,
            totalPrice: nextQty * item.unitPrice
          };
        }
        return item;
      });
      return updated;
    });
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart(prev => prev.filter(i => i.id !== cartItemId));
  };

  const handleSelectOutlet = (store: Outlet) => {
    setSelectedOutletId(store.id);
  };

  const handleCheckoutCompleted = (checkoutData: any) => {
    setPlacedOrder(checkoutData);
    setCart([]); // Reset local state
    setIsCartOpen(false);
  };

  return (
    <div className="bg-obsidian-dark text-white min-h-screen font-sans antialiased overflow-x-hidden selection:bg-gold selection:text-charcoal-deep">
      
      {/* Dynamic Order status tracker overlay */}
      {placedOrder && (
        <OrderStatusPanel
          orderDetails={placedOrder}
          onReset={() => {
            setPlacedOrder(null);
            handleScrollToSection('hero-section');
          }}
        />
      )}

      {/* Header element */}
      <Navbar
        cartCount={totalCartCount}
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
        onNavigateToSection={handleScrollToSection}
        activeSection={activeSection}
      />

      {/* Banner hero cover */}
      <Hero onOrderOnlineClick={() => handleScrollToSection('menu-catalog')} />

      {/* Ratings and Hygiene standards */}
      <TrustBar />

      {/* Features bento panels */}
      <Features />

      {/* Key bestsellers row/columns */}
      <Bestsellers
        items={MENU_ITEMS}
        onOpenCustomizer={(item) => setCustomizerItem(item)}
        cartItemIds={cart.map(i => i.id)}
      />

      {/* Comprehensive menus listing */}
      <MenuCatalog
        items={MENU_ITEMS}
        onOpenCustomizer={(item) => setCustomizerItem(item)}
        cartItemIds={cart.map(i => i.id)}
      />

      {/* Locations and maps redirection outposts */}
      <Outlets
        outlets={OUTLETS}
        selectedOutletId={selectedOutletId}
        onSelectOutlet={handleSelectOutlet}
      />

      {/* Celebrations, banquet, bulk booking form coordinates */}
      <CelebrationForm />

      {/* Luxury Client Testimonials Slider segment */}
      <section id="testimony-section" className="py-24 bg-obsidian border-t border-white/5 relative">
        <div className="absolute top-[30%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-gold/3 blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">Real Feedback</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2">
              Patrons Say It General
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className="p-8 rounded-2xl bg-charcoal/40 border border-white/5 flex flex-col justify-between text-left relative group hover:border-gold/30 transition-all duration-300"
              >
                <div>
                  {/* Stars counter */}
                  <div className="flex text-gold mb-4">
                    {[...Array(test.stars)].map((_, s) => (
                      <Star key={s} className="w-4 h-4 fill-gold stroke-gold" />
                    ))}
                  </div>
                  <p className="font-sans text-white/80 text-sm italic leading-relaxed mb-6">
                    "{test.text}"
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-white/5 pt-4">
                  <div>
                    <h5 className="text-xs font-bold text-white uppercase tracking-wider">{test.name}</h5>
                    <span className="text-[10px] text-zinc-500">{test.role}</span>
                  </div>
                  <span className="text-[10px] text-zinc-600 font-medium">{test.date}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* High-quality footer segment */}
      <footer className="bg-obsidian-dark border-t border-white/5 pt-20 pb-8 text-white relative z-10 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16 items-start text-left">
            
            {/* Column 1: Brand descriptions */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <Flame className="w-6 h-6 text-coal-orange" />
                <span className="font-display text-2xl font-bold text-gold tracking-wider">
                  Rolls On Coals
                </span>
              </div>
              <p className="font-sans text-white/55 text-xs sm:text-sm leading-relaxed pr-6">
                Bringing the timeless flavor of coal-grilled delicacies to the modern fast-casual space. Quality, consistency, and a premium experience in every bite.
              </p>
              
              {/* Media links */}
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-charcoal hover:bg-gold hover:text-charcoal-deep border border-white/5 flex items-center justify-center transition-all cursor-pointer text-white/70"
                >
                  f
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-charcoal hover:bg-gold hover:text-charcoal-deep border border-white/5 flex items-center justify-center transition-all cursor-pointer text-white/70 animate-pulse"
                >
                  ig
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-charcoal hover:bg-gold hover:text-charcoal-deep border border-white/5 flex items-center justify-center transition-all cursor-pointer text-white/70"
                >
                  <Twitter className="w-4 h-4 text-inherit" />
                </a>
              </div>
            </div>

            {/* Column 2: Useful Links */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              <h4 className="text-xs uppercase font-extrabold tracking-widest text-[#ffd65a]">
                Quick Links
              </h4>
              <ul className="flex flex-col gap-3 text-xs text-white/60">
                <li>
                  <button onClick={() => handleScrollToSection('menu-catalog')} className="hover:text-gold cursor-pointer transition-colors block text-left">
                    Explore Menu
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollToSection('outlets-section')} className="hover:text-gold cursor-pointer transition-colors block text-left">
                    Outlets Directory
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollToSection('celebration-section')} className="hover:text-gold cursor-pointer transition-colors block text-left">
                    Celebration Booking
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Legal stuff */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              <h4 className="text-xs uppercase font-extrabold tracking-widest text-[#ffd65a]">
                Support & Info
              </h4>
              <ul className="flex flex-col gap-3 text-xs text-white/60">
                <li>
                  <a href="#privacy" className="hover:text-gold transition-colors block">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-gold transition-colors block">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="tel:+919823456781" className="hover:text-gold transition-colors block">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <h4 className="text-xs uppercase font-extrabold tracking-widest text-[#ffd65a] block mb-1">
                Newsletter
              </h4>
              <p className="text-white/50 text-xs leading-relaxed">
                Subscribe for exclusive discounts, weekend sizzler offers and new store alerts.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you for subscribing to Rolls On Coals Sizzler updates!');
                }}
                className="flex gap-2 mt-2 w-full"
              >
                <input
                  type="email"
                  required
                  placeholder="Your premium email address"
                  className="px-4 py-3 bg-charcoal border border-white/5 rounded-xl text-xs text-white placeholder-white/20 focus:outline-none focus:border-gold/50 flex-grow"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-gold text-charcoal-deep text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-lg shadow-gold/5"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

          </div>

          {/* Footer baseline */}
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-[11px] text-zinc-500">
              © {new Date().getFullYear()} Rolls On Coals. All rights reserved.
            </span>
            
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span className="flex items-center gap-1">
                ⚡ Powered by Coal Heat & Coals Craftsmanship
              </span>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating customize modal */}
      <CustomizerModal
        item={customizerItem}
        onClose={() => setCustomizerItem(null)}
        onConfirm={handleAddItemToCart}
      />

      {/* Sliding cart side drawer */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        outlets={OUTLETS}
        selectedOutletId={selectedOutletId}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onPlaceOrder={handleCheckoutCompleted}
      />

    </div>
  );
}

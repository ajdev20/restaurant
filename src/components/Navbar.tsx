import React, { useState, useEffect } from 'react';
import { Flame, ShoppingCart, Menu as MenuIcon, X, MapPin, Sparkles, PhoneCall } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartToggle: () => void;
  onNavigateToSection: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({
  cartCount,
  onCartToggle,
  onNavigateToSection,
  activeSection,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Menu', id: 'menu-catalog' },
    { label: 'Outlets', id: 'outlets-section' },
    { label: 'Celebrations', id: 'celebration-section' },
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onNavigateToSection(id);
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-obsidian/90 backdrop-blur-md py-3 shadow-md border-b border-white/5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div
            id="nav-brand"
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => handleLinkClick('hero-section')}
          >
            <div className="w-10 h-10 rounded-full bg-coal-orange/15 border border-coal-orange/40 flex items-center justify-center group-hover:bg-coal-orange/25 transition-all">
              <Flame className="w-5 h-5 text-coal-orange animate-pulse" />
            </div>
            <div>
              <span className="font-display text-xl sm:text-2xl font-bold text-gold tracking-wide">
                Rolls On Coals
              </span>
              <span className="text-[9px] block tracking-[0.25em] text-white/50 -mt-1 uppercase">
                Raw Heat • Refined Taste
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`font-sans text-xs font-semibold uppercase tracking-widest transition-all duration-200 cursor-pointer pb-1 border-b-2 hover:text-gold ${
                  activeSection === item.id
                    ? 'border-gold text-gold'
                    : 'border-transparent text-white/80'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Cart & CTA Header controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Call hotline */}
            <a
              href="tel:+919823456781"
              title="Call hotline"
              className="hidden lg:flex items-center gap-2 text-white/70 hover:text-gold transition-colors text-xs font-medium"
            >
              <PhoneCall className="w-4 h-4 text-gold" />
              <span>+91 98234 56781</span>
            </a>

            {/* Shopping Cart button with counter */}
            <button
              id="navbar-cart-trigger"
              onClick={onCartToggle}
              className="relative p-2.5 rounded-full bg-charcoal hover:bg-charcoal-light border border-white/5 text-white transition-all hover:scale-105 active:scale-95 group cursor-pointer"
              aria-label={`Open shopping cart with ${cartCount} items`}
            >
              <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-coal-orange text-[10px] font-bold text-white shadow-lg animate-bounce">
                {cartCount}
              </div>
              <ShoppingCart className="w-4.5 h-4.5 text-white/90 group-hover:text-gold transition-colors" />
            </button>

            {/* Quick Order Online CTA */}
            <button
              id="header-order-online-btn"
              onClick={() => handleLinkClick('menu-catalog')}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg bg-coal-orange text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-coal-orange/90 active:scale-95 transition-all cursor-pointer hover:shadow-coal-orange/20 hover:shadow-lg accent-glow"
            >
              Order Online
            </button>

            {/* Mobile Menu Toggle button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-charcoal hover:bg-charcoal-light text-white/85 transition-all cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div id="mobile-drawer" className="md:hidden bg-obsidian border-b border-white/5 px-4 pt-2 pb-6 flex flex-col gap-4 animate-fadeIn">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              className={`w-full text-left py-2 px-3 rounded-md text-sm font-semibold tracking-wider uppercase ${
                activeSection === item.id
                  ? 'bg-coal-orange/10 text-gold border-l-4 border-gold'
                  : 'text-white/80 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="h-px bg-white/5 my-2"></div>
          <div className="flex flex-col gap-3 px-3">
            <a
              href="tel:+919823456781"
              className="flex items-center gap-3 text-white/70 text-xs py-1"
            >
              <PhoneCall className="w-4 h-4 text-gold" />
              <span>Contact Order Desk: +91 98234 56781</span>
            </a>
            <div className="flex items-center gap-2 text-white/70 text-xs">
              <MapPin className="w-4 h-4 text-gold" />
              <span>Currently Delivery Store: Vasai, MH</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

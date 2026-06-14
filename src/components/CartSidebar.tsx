import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Truck, Store, Ticket, Check, ChevronRight, AlertCircle } from 'lucide-react';
import { CartItem, Outlet } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  outlets: Outlet[];
  selectedOutletId: string;
  onUpdateQuantity: (cartItemId: string, change: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onPlaceOrder: (checkoutDetails: {
    name: string;
    phone: string;
    address: string;
    deliveryType: 'delivery' | 'pickup';
    outletId: string;
    subtotal: number;
    discount: number;
    taxes: number;
    deliveryFee: number;
    total: number;
    promoApplied: string;
  }) => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  outlets,
  selectedOutletId,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
}: CartSidebarProps) {
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string>('');
  const [promoError, setPromoError] = useState('');

  // Checkout info fields
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestAddress, setGuestAddress] = useState('');

  const currentOutlet = outlets.find(o => o.id === selectedOutletId) || outlets[0];

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  
  // Promo calculation
  let discount = 0;
  if (appliedPromo === 'ROC100' && subtotal >= 300) {
    discount = 100;
  } else if (appliedPromo === 'FIRSTBURN') {
    discount = Math.round(subtotal * 0.15); // 15% off
  }

  const deliveryFee = deliveryType === 'delivery' ? 45 : 0;
  const taxes = Math.round((subtotal - discount) * 0.05); // 5% GST
  const finalTotal = Math.max(0, subtotal - discount + deliveryFee + taxes);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoInput.trim().toUpperCase();

    if (code === 'ROC100') {
      if (subtotal < 350) {
        setPromoError('ROC100 requires a minimum order of ₹350.');
        return;
      }
      setAppliedPromo('ROC100');
    } else if (code === 'FIRSTBURN') {
      setAppliedPromo('FIRSTBURN');
    } else {
      setPromoError('Invalid coupon code. Try FIRSTBURN or ROC100.');
    }
    setPromoInput('');
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    if (!guestName.trim()) {
      alert('Please fill out your Name.');
      return;
    }
    if (!guestPhone.trim() || guestPhone.replace(/\D/g, '').length < 10) {
      alert('Please enter a valid 10-digit Phone Contact number.');
      return;
    }
    if (deliveryType === 'delivery' && !guestAddress.trim()) {
      alert('Please state your Delivery Address details.');
      return;
    }

    onPlaceOrder({
      name: guestName,
      phone: guestPhone,
      address: deliveryType === 'delivery' ? guestAddress : currentOutlet.address,
      deliveryType,
      outletId: selectedOutletId,
      subtotal,
      discount,
      taxes,
      deliveryFee,
      total: finalTotal,
      promoApplied: appliedPromo
    });
  };

  if (!isOpen) return null;

  const getSpiceName = (spice?: number) => {
    if (spice === 0) return 'Mild / No Heat';
    if (spice === 1) return 'Mild Spices';
    if (spice === 2) return 'Medium Char';
    if (spice === 3) return 'Coal Sizzle Fire';
    return '';
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="flex-1 cursor-pointer" onClick={onClose} aria-hidden="true"></div>

      {/* Cart Container Drawer */}
      <div className="w-full max-w-md bg-charcoal border-l border-white/5 shadow-2xl h-full flex flex-col justify-between overflow-hidden relative">
        
        {/* Header Block */}
        <div className="p-6 bg-obsidian border-b border-white/5 flex justify-between items-center shrink-0 text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-coal-orange animate-ping"></span>
            <h3 className="font-display text-lg font-bold text-white tracking-wide">
              Your Charcoal Feast
            </h3>
            <span className="text-zinc-500 font-bold text-xs">({cartItems.length} items)</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-charcoal-light border border-white/5 text-white/55 hover:text-white hover:bg-white/5 cursor-pointer"
            aria-label="Close cart side panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic content scrollable area */}
        <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-6 scrollbar-thin">
          
          {cartItems.length === 0 ? (
            /* Empty state */
            <div className="py-20 text-center flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30">
                🔥
              </div>
              <div>
                <h4 className="font-display text-base font-bold text-white">Your Cart is Cold</h4>
                <p className="font-sans text-xs text-white/40 max-w-xs mx-auto mt-1 leading-normal">
                  Add premium woodsmoke rolls, volcano toasted sandwiches, or chilled hazelnut shake starters and fire up!
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 bg-gold text-charcoal-deep text-[11px] font-bold uppercase tracking-widest rounded-lg hover:brightness-110 cursor-pointer"
              >
                Explore Bestsellers
              </button>
            </div>
          ) : (
            /* Items List */
            <div className="flex flex-col gap-4 text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">
                Selected Coordinates
              </span>

              {cartItems.map((cartItem) => (
                <div
                  key={cartItem.id}
                  className="p-4 rounded-xl bg-black/20 border border-white/5 flex gap-4 relative group"
                >
                  <img
                    src={cartItem.item.image}
                    alt={cartItem.item.name}
                    className="w-14 h-14 object-cover rounded-lg bg-charcoal-light shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-sans text-xs font-bold text-white block">
                          {cartItem.item.name}
                        </span>
                        <button
                          onClick={() => onRemoveItem(cartItem.id)}
                          className="text-white/30 hover:text-red-400 p-1 rounded hover:bg-white/5 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Displaying selected customizations */}
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        <span className="px-1.5 py-0.5 rounded bg-coal-orange/10 border border-coal-orange/20 text-[9px] text-coal-orange font-bold uppercase tracking-tight">
                          {getSpiceName(cartItem.customization.spicePreference)}
                        </span>
                        {cartItem.customization.addExtraCheese && (
                          <span className="px-1.5 py-0.5 rounded bg-green-500/15 border border-green-500/20 text-[9px] text-green-400 font-bold uppercase tracking-tight">
                            + Extra Cheese
                          </span>
                        )}
                        {cartItem.customization.specialInstructions && (
                          <span className="text-[10px] text-zinc-500 italic block w-full mt-1">
                            Chef note: "{cartItem.customization.specialInstructions}"
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-white/5">
                      <span className="text-gold font-bold font-sans text-xs">
                        ₹{cartItem.totalPrice}
                      </span>
                      
                      {/* Quantity editors */}
                      <div className="flex items-center rounded-lg bg-charcoal text-[11px] font-bold border border-white/10 overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(cartItem.id, -1)}
                          className="px-2.5 py-1 text-white/60 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-white font-sans">{cartItem.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(cartItem.id, 1)}
                          className="px-2.5 py-1 text-white/60 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cartItems.length > 0 && (
            /* Dispatch settings */
            <div className="flex flex-col gap-4 text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">
                Dispatch Coordinates
              </span>
              
              {/* Type Selectors */}
              <div className="grid grid-cols-2 gap-2 bg-black/15 p-1 rounded-xl border border-white/5">
                <button
                  type="button"
                  onClick={() => setDeliveryType('delivery')}
                  className={`py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    deliveryType === 'delivery'
                      ? 'bg-coal-orange text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Delivery</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryType('pickup')}
                  className={`py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    deliveryType === 'pickup'
                      ? 'bg-coal-orange text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Self-Pickup</span>
                </button>
              </div>

              {/* Outlet label or Delivery details */}
              <div className="p-4 bg-charcoal-deep rounded-xl border border-white/5 flex flex-col gap-3">
                <span className="text-[9px] uppercase font-bold text-white/50 block leading-none">
                  Fulfilling Kitchen Outlet
                </span>
                <div className="flex items-center justify-between text-xs font-semibold text-white">
                  <span>ROC {currentOutlet.name}</span>
                  <span className="text-[10px] text-gold uppercase tracking-wider">
                    {deliveryType === 'delivery' ? 'Home Delivery' : 'Pickup at Outlet'}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 leading-normal mb-1">
                  {deliveryType === 'delivery' 
                    ? `Order is routed to ROC ${currentOutlet.name} closer to you.`
                    : `Address: ${currentOutlet.address} (Collect dynamically from store).`}
                </p>
              </div>

              {/* Promo Coupon Module */}
              <form onSubmit={handleApplyPromo} className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-bold text-white/50 block">
                  Promo Discount Code
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <Ticket className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-600" />
                    <input
                      type="text"
                      placeholder="e.g. FIRSTBURN or ROC100"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-black/20 border border-white/5 rounded-xl text-xs text-white uppercase placeholder-white/20 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4.5 py-2.5 bg-gold hover:brightness-110 text-charcoal-deep text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                
                {/* Feedback promo status or errors */}
                {appliedPromo && (
                  <span className="text-xs text-green-400 font-medium flex items-center gap-1 bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Coupon "{appliedPromo}" matches successfully!</span>
                  </span>
                )}
                {promoError && (
                  <span className="text-xs text-red-400 font-medium flex items-center gap-1.5 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <span>{promoError}</span>
                  </span>
                )}
                
                <span className="text-[10px] text-white/35 italic block leading-normal mt-0.5">
                  🔥 Hint: FIRSTBURN (15% off, no minimum) • ROC100 (₹100 discount, min ₹350)
                </span>
              </form>

              {/* Personal Details to finalize order */}
              <hr className="border-white/5 my-2" />
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/55 block">
                  Identify Coordinates To Cook
                </span>

                {/* Name */}
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-4 py-3 bg-black/15 border border-white/5 rounded-xl text-xs text-white placeholder-white/20 focus:outline-none focus:border-gold/30"
                  />
                </div>

                {/* Mobile */}
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="10-Digit Mobile Contact *"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-black/15 border border-white/5 rounded-xl text-xs text-white placeholder-white/20 focus:outline-none focus:border-gold/30"
                  />
                </div>

                {/* Address (conditional on delivery) */}
                {deliveryType === 'delivery' && (
                  <div>
                    <textarea
                      required
                      rows={2}
                      placeholder="Home / Office Complete Delivery Address *"
                      value={guestAddress}
                      onChange={(e) => setGuestAddress(e.target.value)}
                      className="w-full px-4 py-3 bg-black/15 border border-white/5 rounded-xl text-xs text-white placeholder-white/20 focus:outline-none focus:border-gold/30"
                    ></textarea>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

        {/* Totals & Sticky Checkout Action Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-obsidian border-t border-white/5 shrink-0 flex flex-col gap-4 text-left">
            
            {/* Breakdowns list */}
            <div className="flex flex-col gap-2 font-sans text-xs">
              <div className="flex justify-between text-white/55">
                <span>Subtotal Portion</span>
                <span>₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Discount ({appliedPromo})</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between text-white/55">
                <span>Central + State GST (5%)</span>
                <span>₹{taxes}</span>
              </div>
              <div className="flex justify-between text-white/55">
                <span>Dispatch Fee ({deliveryType})</span>
                <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
              </div>
              
              <div className="h-px bg-white/10 my-1"></div>
              
              <div className="flex justify-between text-base font-bold text-white">
                <span>Aggregate Total</span>
                <span className="text-gold font-sans">₹{finalTotal}</span>
              </div>
            </div>

            {/* Direct simulated placement trigger */}
            <button
              onClick={handleCheckoutSubmit}
              className="w-full py-4 bg-coal-orange hover:bg-coal-orange/90 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer active:scale-95 hover:shadow-lg hover:shadow-coal-orange/15 shadow-xl accent-glow"
            >
              <span>Sizzle & Place Order!</span>
              <ChevronRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
            </button>
            <span className="text-[9px] text-zinc-500 text-center leading-none">
              By confirming, order is submitted cleanly to the selected kitchen. No real card charge needed.
            </span>
          </div>
        )}

      </div>
    </div>
  );
}

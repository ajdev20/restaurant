import React, { useState, useEffect } from 'react';
import { Check, Flame, ChefHat, Truck, Smile, Hourglass, RefreshCw, ChevronRight } from 'lucide-react';
import { OrderStatus } from '../types';

interface OrderStatusPanelProps {
  orderDetails: {
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
  } | null;
  onReset: () => void;
}

export default function OrderStatusPanel({ orderDetails, onReset }: OrderStatusPanelProps) {
  const [currentStep, setCurrentStep] = useState<OrderStatus>('received');
  
  // Auto advance statuses on a timer for immersive simulation!
  useEffect(() => {
    if (!orderDetails) return;

    const timers = [
      setTimeout(() => setCurrentStep('preparing'), 7000),
      setTimeout(() => setCurrentStep('coals'), 15000),
      setTimeout(() => setCurrentStep('out_for_delivery'), 24000),
      setTimeout(() => setCurrentStep('delivered'), 34000),
    ];

    return () => {
      timers.forEach(t => clearTimeout(t));
    };
  }, [orderDetails]);

  if (!orderDetails) return null;

  const steps: { key: OrderStatus; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      key: 'received',
      label: 'Order Received',
      desc: 'The kitchen has accepted your basket and is queuing your ingredients.',
      icon: <Hourglass className="w-5 h-5 text-inherit" />
    },
    {
      key: 'preparing',
      label: 'Chef Preparing',
      desc: 'Your wheat paratha is being kneaded and crisp veggies sliced fresh.',
      icon: <ChefHat className="w-5 h-5 text-inherit" />
    },
    {
      key: 'coals',
      label: 'Sizzling on Coals',
      desc: 'Kebabs, cottage cheese chunk slabs, and special sauce are hot grilling over live embers.',
      icon: <Flame className="w-5 h-5 text-inherit" />
    },
    {
      key: 'out_for_delivery',
      label: orderDetails.deliveryType === 'delivery' ? 'Out for Delivery' : 'Ready for Collect',
      desc: orderDetails.deliveryType === 'delivery' 
        ? 'ROC rider has secured the premium thermal wrap and is speeding to your coordinate.'
        : 'Your parcel is packed in eco-friendly steam-vented boxes. Head to select checkout counter!',
      icon: <Truck className="w-5 h-5 text-inherit" />
    },
    {
      key: 'delivered',
      label: orderDetails.deliveryType === 'delivery' ? 'Feast Delivered' : 'Feast Collected!',
      desc: 'Delicious woodsmoke-flavor bites achieved! Serve while hot and leave a review!',
      icon: <Smile className="w-5 h-5 text-inherit" />
    }
  ];

  const getStepIndex = (status: OrderStatus) => {
    const indices: Record<OrderStatus, number> = {
      received: 0,
      preparing: 1,
      coals: 2,
      out_for_delivery: 3,
      delivered: 4
    };
    return indices[status];
  };

  const activeIndex = getStepIndex(currentStep);

  // Manual bypass toggle for testers!
  const handleSimulateNext = () => {
    const sequence: OrderStatus[] = ['received', 'preparing', 'coals', 'out_for_delivery', 'delivered'];
    const nextIdx = (activeIndex + 1) % sequence.length;
    setCurrentStep(sequence[nextIdx]);
  };

  const orderNum = 'ROC-ONLINE-' + Math.floor(10000 + Math.random() * 90000);

  return (
    <section id="order-tracker-panel" className="fixed inset-0 z-50 bg-obsidian-dark flex items-center justify-center p-4 overflow-y-auto pt-20">
      
      {/* Decorative coal glows */}
      <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-coal-orange/10 blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-gold/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl w-full bg-charcoal border border-gold/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative z-10 my-8">
        
        {/* Dynamic simulation helper banner */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={handleSimulateNext}
            className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] text-zinc-300 hover:text-gold transition-colors font-bold uppercase tracking-widest flex items-center gap-1.5 cursor-pointer"
            title="Accelerate wait times for evaluation"
          >
            <RefreshCw className="w-3.5 h-3.5 text-gold animate-spin" style={{ animationDuration: '6s' }} />
            <span>Fast-Simulate State</span>
          </button>
        </div>

        {/* Header summary info block */}
        <div className="text-left mb-8 pb-6 border-b border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div>
            <span className="text-[10px] uppercase font-extrabold tracking-[0.3em] text-gold block mb-2 leading-none">
              Kitchen Combustion In Progress
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Tracking Your Fire-Feast
            </h2>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span className="text-xs font-bold text-white/50">Receipt:</span>
              <strong className="text-xs font-bold text-white uppercase bg-white/5 px-2.5 py-1 rounded select-all border border-white/5">
                {orderNum}
              </strong>
            </div>
          </div>

          <div className="text-left md:text-right">
            <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-1 leading-none">
              Estimated Delivery Time
            </span>
            <span className="font-display text-2xl font-bold text-gold">
              {activeIndex === 4 ? 'Arrived!' : '25 - 35 Minutes'}
            </span>
            <p className="text-[11px] text-white/40 mt-1">
              Fulfilling store: ROC Area Kitchen
            </p>
          </div>
        </div>

        {/* Main Body: Timeline and recipient summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Area: Timeline of steps */}
          <div className="lg:col-span-7 text-left flex flex-col gap-6">
            {steps.map((step, idx) => {
              const isPast = getStepIndex(step.key) < activeIndex;
              const isCurrent = step.key === currentStep;
              const isFuture = getStepIndex(step.key) > activeIndex;

              return (
                <div key={step.key} className="flex gap-4 relative">
                  
                  {/* Visual line */}
                  {idx < steps.length - 1 && (
                    <div className={`absolute left-5 top-10 bottom-[-24px] w-0.5 z-0 ${
                      getStepIndex(steps[idx+1].key) <= activeIndex ? 'bg-coal-orange' : 'bg-white/10'
                    }`}></div>
                  )}

                  {/* Icon step indicator */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border z-10 transition-colors ${
                    isPast 
                      ? 'bg-coal-orange/20 border-coal-orange text-coal-orange' 
                      : isCurrent 
                        ? 'bg-gold text-charcoal-deep border-gold shadow-lg shadow-gold/20 scale-110 animate-pulse' 
                        : 'bg-black/20 border-white/5 text-white/20'
                  }`}>
                    {isPast ? <Check className="w-4.5 h-4.5 stroke-[3]" /> : step.icon}
                  </div>

                  {/* Text descriptions */}
                  <div className="flex-grow pt-1">
                    <h4 className={`text-sm font-bold uppercase tracking-wider ${
                      isCurrent ? 'text-gold' : isFuture ? 'text-white/20' : 'text-zinc-400'
                    }`}>
                      {step.label}
                    </h4>
                    <p className={`text-xs mt-1.5 leading-relaxed leading-normal ${
                      isCurrent ? 'text-white/80 font-medium' : isFuture ? 'text-white/10' : 'text-zinc-500'
                    }`}>
                      {step.desc}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Right Area: Receipient summary card */}
          <div className="lg:col-span-5 text-left">
            <div className="p-6 rounded-2xl bg-black/15 border border-white/5 flex flex-col gap-5">
              <h3 className="text-xs uppercase font-bold text-white/55 tracking-wider border-b border-white/5 pb-3 block">
                Deliver Address Coordinates
              </h3>

              <div className="text-xs flex flex-col gap-3 font-sans">
                <div>
                  <span className="text-white/35 block text-[10px] uppercase font-bold tracking-wider mb-1">Customer Nominee</span>
                  <strong className="text-white text-sm">{orderDetails.name}</strong>
                </div>

                <div>
                  <span className="text-white/35 block text-[10px] uppercase font-bold tracking-wider mb-1">Mobile Hotline</span>
                  <span className="text-zinc-300 font-mono tracking-wide">{orderDetails.phone}</span>
                </div>

                <div>
                  <span className="text-white/35 block text-[10px] uppercase font-bold tracking-wider mb-1">Fulfillment Address</span>
                  <span className="text-zinc-300 leading-normal block italic pr-4">
                    {orderDetails.address}
                  </span>
                </div>

                <div className="pt-3 border-t border-white/5 flex flex-col gap-2">
                  <div className="flex justify-between text-white/45 text-[11px]">
                    <span>Cart Subtotal</span>
                    <span>₹{orderDetails.subtotal}</span>
                  </div>
                  {orderDetails.discount > 0 && (
                    <div className="flex justify-between text-green-400 text-[11px]">
                      <span>Promo Savings</span>
                      <span>-₹{orderDetails.discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-white/45 text-[11px]">
                    <span>Dispatch Fee + Taxes</span>
                    <span>₹{orderDetails.deliveryFee + orderDetails.taxes}</span>
                  </div>
                  <hr className="border-white/5 my-1" />
                  <div className="flex justify-between font-bold text-white text-sm">
                    <span>Total Cash Due</span>
                    <span className="text-gold">₹{orderDetails.total}</span>
                  </div>
                </div>
              </div>

              {/* Status indicator badge */}
              <div className="p-3 bg-gold/5 border border-gold/15 rounded-xl flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping"></span>
                <span className="text-[10px] font-bold uppercase text-gold tracking-widest font-sans">
                  Payment Method: Cash On Delivery
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer controls */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <p className="text-[11px] text-zinc-500 text-center sm:text-left">
            🔥 Tip: This tracking is fully simulated over a live timer. You can mock advance steps immediately.
          </p>
          <button
            onClick={onReset}
            className="px-6 py-3 rounded-xl bg-gold hover:bg-gold/90 text-charcoal-deep text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <span>Feast Again! Order More</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}

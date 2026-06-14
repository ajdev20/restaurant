# Rolls On Coals (ROC) — Premium Modern Dining

A highly polished, interactive Single Page Application (SPA) designed and built for **Rolls On Coals (ROC)**. This website matches the requested dark gourmet aesthetic, showcasing premium woodsmoke charcoal delicacies with gold accents, smooth hover animations, fluid grid responsiveness, and a fully functional online ordering micro-experience.

---

## 🎨 Design System & Visual Strategy

The user interface utilizes a bespoke **Obsidian & Embers** visual language, tailored specifically to elevate Rolls On Coals from a fast-casual standard to an exclusive, warm, candle-lit steakhouse vibe:

- **Obsidian Dark Canvas (`#0c0f0f` / `#070909`):** Deep charcoal and absolute backdrops reduce eye strain and provide outstanding contrast for professional food photography.
- **Smoky Gold Accents (`#e9c349`):** Represents high-quality, artisanal wrapping, and warm candles. Applied to borders, headings, ratings stars, and active states.
- **Coal Orange Highlights (`#ff5625`):** Denotes direct charcoal heat and active highlights. Used on primary order-CTAs and fire indicators.
- **Mighty Micro-Animations:** Staggered fade-ins, floating hero images, glowing amber fire glows, and card zoom transitions guide interest naturally.
- **Typography pairing:** Authority-focused *Playfair Display* for headliners and high-readability *Montserrat* for body text.

---

## 🚀 Key Interactive Features

1. **Gourmet Food Customizer:** Clicking "Order Now" on any card slide-opens a custom panel where patrons specify desired Spice preference grades (Mild Buzz, Classic Medium, or Coal Sizzle Fire) and toggle extra layers of Melted Cheese (with an automatically calculated surcharge).
2. **Dynamic Sliding Cart Sidebar:** Manage selected delicacies, increment or decrement quantities, remove products, select preferred fulfilment outlet, and toggle between Self-Pickup (removes delivery surcharges) or Home Delivery.
3. **Smart Coupon Promo Engine:** Apply discount vouchers like **FIRSTBURN** (gets flat 15% discount) or **ROC100** (gets flat ₹100 off with a minimum purchase of ₹350) with immediate subtotal updates, Central/State GST tax calculations, and errors checks.
4. **Interactive Simulated Real-time Order Tracker:** Once details are validated and checkout is triggered, the screen turns into a dashboard following a vertical timeline (Order Created ➔ Kitchen Prep ➔ Sizzling on Coals ➔ Rider Transit ➔ Delivered). Includes a "Fast-Simulate State" toggle button for immediate reviewer testing.
5. **Physical Locations Directory:** Explores existing outlets (Vasai East, Agarwal Complex, Madhuban Township) with addresses, hours, call-desk triggers, and active get-directions links. 
6. **Celebration Booking Coordinator:** Interactive reservation portal with guest counters, calendar inputs, event classification selectors, special chef notes, and instantly generated Booking Confirmation PIN codes.

---

## ♿ Accessibility & Quality Standards

- **Semantic HTML Tags:** Structured with standard `<nav>`, `<header>`, `<main>`, `<section>`, and `<footer>` layouts to ensure seamless reader navigability.
- **Touch Targets:** Large, comfortable 44px+ buttons for quick mobile tapping.
- **Visual Contrast:** High contrast off-whites on charcoal layouts satisfy strict contrast thresholds.
- **Zero Heavy Layers:** Powered solely by native **React 19**, **Vite**, and **Tailwind CSS**, leaving out unnecessary third-party overhead for faster loads.

---

## 🛠️ Local Launch and Build Guide

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Install required workspace dependencies
npm install
```

### Dev Mode
Starts a local development server on port 3000:
```bash
npm run dev
```

### Production Build
Assembles high-fidelity minified assets inside the `dist/` bundle directory:
```bash
npm run build
```

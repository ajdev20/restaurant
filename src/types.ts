/**
 * Types declarations for Rolls On Coals (ROC) Applet
 */

export type DishCategory = 'all' | 'rolls' | 'sandwiches' | 'pizzas-pastas' | 'chinese' | 'beverages';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Exclude<DishCategory, 'all'>;
  type: 'veg' | 'nonveg';
  isBestseller?: boolean;
  rating: number;
  ratingCount: number;
  spiceLevel?: 0 | 1 | 2 | 3; // 0 = None, 3 = High Sizzle
}

export interface CartCustomization {
  spicePreference?: 0 | 1 | 2 | 3;
  addExtraCheese?: boolean;
  specialInstructions?: string;
}

export interface CartItem {
  id: string; // Dynamic ID composed of item ID + customizations key
  item: MenuItem;
  quantity: number;
  customization: CartCustomization;
  unitPrice: number;
  totalPrice: number;
}

export interface Outlet {
  id: string;
  name: string;
  address: string;
  landmark: string;
  mapsUrl: string;
  phone: string;
  isMain?: boolean;
  workingHours: string;
}

export interface CelebrationBooking {
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  eventType: string;
  notes?: string;
}

export type OrderStatus = 'received' | 'preparing' | 'coals' | 'out_for_delivery' | 'delivered';

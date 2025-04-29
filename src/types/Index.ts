export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  rating: number;
  reviews: Review[];
  availability: AvailabilitySlot[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface AvailabilitySlot {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface CartItem {
  service: Service;
  quantity: number;
  notes?: string;
  appliedDiscount?: number;
}

export interface Address {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface SavedCart {
  id: string;
  name: string;
  items: CartItem[];
  savedAt: Date;
  promoCode: string | null;
  promoDiscount: number;
}

export interface PromoCodeResult {
  valid: boolean;
  discount: number;
  message: string;
}

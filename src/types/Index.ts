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
  providerId?: string;
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
  customizations?: ServiceCustomization[];
  scheduledTime?: AvailabilitySlot;
}

export interface Address {
  id?: string;
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault?: boolean;
  userId?: string;
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

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  orderDate: Date;
  scheduledDate?: Date;
  scheduledTime?: string;
  total: number;
  status: OrderStatus;
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  promoCode?: string;
  promoDiscount?: number;
}

export interface OrderItem {
  serviceId: string;
  serviceName: string;
  quantity: number;
  price: number;
  providerId: string;
  providerName: string;
  customizations?: ServiceCustomization[];
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface ServiceProvider {
  id: string;
  name: string;
  description: string;
  logo?: string;
  coverImage?: string;
  rating: number;
  reviewCount: number;
  contactInfo: {
    email: string;
    phone?: string;
    website?: string;
    address?: string;
  };
  specialties: string[];
  services: string[];
  founded?: string;
  serviceAreas?: string[];
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface PaymentMethod {
  id: string;
  type: "credit_card" | "paypal" | "bank_transfer" | "cash";
  details: {
    cardNumber?: string;
    cardholderName?: string;
    expiryDate?: string;
    cvv?: string;
    accountNumber?: string;
    routingNumber?: string;
    paypalEmail?: string;
  };
  isDefault?: boolean;
}

export interface ServiceCustomization {
  id: string;
  name: string;
  options: ServiceCustomizationOption[];
  selectedOption?: ServiceCustomizationOption;
  required: boolean;
}

export interface ServiceCustomizationOption {
  id: string;
  name: string;
  priceAdjustment: number;
}

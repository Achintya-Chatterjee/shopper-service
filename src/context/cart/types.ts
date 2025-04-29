import { CartItem, SavedCart, Service } from "@/types/Index";

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (service: Service, notes?: string) => void;
  removeFromCart: (serviceId: string) => void;
  updateQuantity: (serviceId: string, quantity: number) => void;
  updateCartItemNotes: (serviceId: string, notes: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  getDiscountedTotal: () => number;
  saveCartForLater: () => Promise<string | undefined>;
  loadSavedCart: (savedCartId: string) => void;
  getSavedCarts: () => SavedCart[];
  shareCart: () => Promise<string>;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  promoCode: string | null;
  promoDiscount: number;
  savedCarts: SavedCart[];
  isLoading: boolean;
  userId: string | null;
  setCartItems: (items: CartItem[]) => void;
  setPromoCode: (code: string | null) => void;
  setPromoDiscount: (discount: number) => void;
}

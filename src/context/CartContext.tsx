import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { CartItem, Service, SavedCart } from "@/types/Index";
import { toast } from "@/components/ui/sonner";
import { generateShareableCartId } from "@/lib/utils";
import { applyPromoCode, calculateQuantityDiscounts } from "@/lib/cart";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (service: Service, notes?: string) => void;
  removeFromCart: (serviceId: string) => void;
  updateQuantity: (serviceId: string, quantity: number) => void;
  updateCartItemNotes: (serviceId: string, notes: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  getDiscountedTotal: () => number;
  saveCartForLater: () => void;
  loadSavedCart: (savedCartId: string) => void;
  getSavedCarts: () => SavedCart[];
  shareCart: () => string;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  promoCode: string | null;
  promoDiscount: number;
  savedCarts: SavedCart[];
}

const SAVED_CARTS_KEY = "saved_carts";
const CURRENT_CART_KEY = "current_cart";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [savedCarts, setSavedCarts] = useState<SavedCart[]>([]);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState(0);

  // Load cart from localStorage on component mount
  useEffect(() => {
    try {
      const savedCartData = localStorage.getItem(CURRENT_CART_KEY);
      if (savedCartData) {
        const parsedData = JSON.parse(savedCartData);
        setCartItems(parsedData.cartItems || []);
        setPromoCode(parsedData.promoCode || null);
        setPromoDiscount(parsedData.promoDiscount || 0);
      }

      const savedCartsData = localStorage.getItem(SAVED_CARTS_KEY);
      if (savedCartsData) {
        setSavedCarts(JSON.parse(savedCartsData));
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(
        CURRENT_CART_KEY,
        JSON.stringify({
          cartItems,
          promoCode,
          promoDiscount,
        })
      );
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cartItems, promoCode, promoDiscount]);

  // Save saved carts to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SAVED_CARTS_KEY, JSON.stringify(savedCarts));
    } catch (error) {
      console.error("Error saving carts to localStorage:", error);
    }
  }, [savedCarts]);

  const addToCart = (service: Service, notes?: string) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.service.id === service.id
      );

      if (existingItem) {
        toast.success(`Added another ${service.name} to cart`);
        return prevItems.map((item) =>
          item.service.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast.success(`${service.name} added to cart`);
        return [
          ...prevItems,
          {
            service,
            quantity: 1,
            notes: notes || "",
            appliedDiscount: 0,
          },
        ];
      }
    });
  };

  const removeFromCart = (serviceId: string) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find(
        (item) => item.service.id === serviceId
      );
      if (itemToRemove) {
        toast.info(`${itemToRemove.service.name} removed from cart`);
      }
      return prevItems.filter((item) => item.service.id !== serviceId);
    });
  };

  const updateQuantity = (serviceId: string, quantity: number) => {
    if (quantity < 1) return;

    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.service.id === serviceId ? { ...item, quantity } : item
      );

      // Recalculate quantity discounts after updating
      return calculateQuantityDiscounts(updatedItems);
    });
  };

  const updateCartItemNotes = (serviceId: string, notes: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.service.id === serviceId ? { ...item, notes } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setPromoCode(null);
    setPromoDiscount(0);
    toast.info("Cart cleared");
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.service.price * item.quantity,
      0
    );
  };

  const getDiscountedTotal = () => {
    const subtotal = getCartTotal();
    // Apply item-level discounts (quantity discounts)
    const itemDiscounts = cartItems.reduce(
      (total, item) => total + (item.appliedDiscount || 0) * item.quantity,
      0
    );

    // Apply cart-level discount (promo code)
    const discountedTotal = subtotal - itemDiscounts - promoDiscount;
    return discountedTotal > 0 ? discountedTotal : 0;
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const saveCartForLater = () => {
    if (cartItems.length === 0) {
      toast.error("Cannot save an empty cart");
      return;
    }

    const cartName = `Cart ${savedCarts.length + 1}`;
    const newSavedCart: SavedCart = {
      id: generateShareableCartId(),
      name: cartName,
      items: [...cartItems],
      savedAt: new Date(),
      promoCode,
      promoDiscount,
    };

    setSavedCarts((prev) => [...prev, newSavedCart]);
    toast.success("Cart saved for later");
    return newSavedCart.id;
  };

  const loadSavedCart = (savedCartId: string) => {
    const savedCart = savedCarts.find((cart) => cart.id === savedCartId);
    if (!savedCart) {
      toast.error("Saved cart not found");
      return;
    }

    setCartItems(savedCart.items);
    setPromoCode(savedCart.promoCode || null);
    setPromoDiscount(savedCart.promoDiscount || 0);
    toast.success("Saved cart loaded");
  };

  const getSavedCarts = () => {
    return savedCarts;
  };

  const shareCart = () => {
    if (cartItems.length === 0) {
      toast.error("Cannot share an empty cart");
      return "";
    }

    // Generate a unique ID for sharing
    const shareableCartId = saveCartForLater();
    const shareableLink = `${window.location.origin}/shared-cart/${shareableCartId}`;

    // Copy to clipboard
    navigator.clipboard
      .writeText(shareableLink)
      .then(() => toast.success("Cart link copied to clipboard"))
      .catch(() => toast.error("Failed to copy link"));

    return shareableLink;
  };

  const applyPromoCodeToCart = (code: string) => {
    const result = applyPromoCode(code, getCartTotal());
    if (result.valid) {
      setPromoCode(code);
      setPromoDiscount(result.discount);
      toast.success(`Promo code applied: ${result.message}`);
      return true;
    } else {
      toast.error(`Invalid promo code: ${result.message}`);
      return false;
    }
  };

  const removePromoCode = () => {
    setPromoCode(null);
    setPromoDiscount(0);
    toast.info("Promo code removed");
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateCartItemNotes,
    clearCart,
    getCartTotal,
    getCartItemCount,
    getDiscountedTotal,
    saveCartForLater,
    loadSavedCart,
    getSavedCarts,
    shareCart,
    applyPromoCode: applyPromoCodeToCart,
    removePromoCode,
    promoCode,
    promoDiscount,
    savedCarts,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

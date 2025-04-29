import { createContext, useContext, ReactNode, useEffect } from "react";
import { CartItem, Service, SavedCart } from "@/types/Index";
import { toast } from "@/components/ui/sonner";
import {
  saveCartToLocalStorage,
  calculateQuantityDiscounts,
  handlePromoCode,
  saveCartToDatabase,
  shareCartToDatabase,
  createLocalSavedCart,} from "./cart/cartUtils";
import { useCartAuth, useCartData } from "./cart/cartHooks";
import { CartContextType } from "./cart/types";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { userId } = useCartAuth();
  const {
    cartItems,
    setCartItems,
    savedCarts,
    setSavedCarts,
    promoCode,
    setPromoCode,
    promoDiscount,
    setPromoDiscount,
    isLoading,
  } = useCartData(userId);

  // Save cart to localStorage whenever it changes (for non-authenticated users)
  useEffect(() => {
    if (!userId) {
      saveCartToLocalStorage(cartItems, promoCode, promoDiscount);
    }
  }, [cartItems, promoCode, promoDiscount, userId]);

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

  const saveCartForLater = async () => {
    if (cartItems.length === 0) {
      toast.error("Cannot save an empty cart");
      return;
    }

    const cartName = `Cart ${savedCarts.length + 1}`;

    // If user is not authenticated, save to localStorage
    if (!userId) {
      const newSavedCart = createLocalSavedCart(
        cartItems,
        promoCode,
        promoDiscount,
        cartName
      );
      setSavedCarts((prev) => [...prev, newSavedCart]);
      toast.success("Cart saved for later");
      return newSavedCart.id;
    }

    // If authenticated, save to Supabase
    try {
      const data = await saveCartToDatabase(userId, cartName, cartItems);

      // Add the new cart to local state
      const newSavedCart = {
        id: data.id,
        name: data.name,
        items: data.items as unknown as CartItem[],
        savedAt: new Date(data.created_at),
        // Use default values instead of accessing potentially missing properties
        promoCode: null,
        promoDiscount: 0,
      };

      setSavedCarts((prev) => [newSavedCart, ...prev]);
      toast.success("Cart saved to your account");
      return data.id;
    } catch (error) {
      console.error("Error saving cart:", error);
      toast.error("Failed to save cart");
      return undefined;
    }
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

  const shareCart = async (): Promise<string> => {
    if (cartItems.length === 0) {
      toast.error("Cannot share an empty cart");
      return "";
    }

    try {
      // For authenticated users, create a shared cart in the database
      if (userId) {
        const data = await shareCartToDatabase(
          userId,
          cartItems,
          promoCode,
          promoDiscount
        );
        const shareableLink = `${window.location.origin}/shared-cart/${data.id}`;

        // Copy to clipboard
        await navigator.clipboard
          .writeText(shareableLink)
          .then(() => toast.success("Cart link copied to clipboard"))
          .catch(() => toast.error("Failed to copy link"));

        return shareableLink;
      } else {
        // For non-authenticated users, use the local saved cart approach
        const savedCartId = await saveCartForLater();
        if (!savedCartId) return "";

        const shareableLink = `${window.location.origin}/shared-cart/${savedCartId}`;

        // Copy to clipboard
        await navigator.clipboard
          .writeText(shareableLink)
          .then(() => toast.success("Cart link copied to clipboard"))
          .catch(() => toast.error("Failed to copy link"));

        return shareableLink;
      }
    } catch (error) {
      console.error("Error sharing cart:", error);
      toast.error("Failed to share cart");
      return "";
    }
  };

  const applyPromoCodeToCart = (code: string) => {
    const result = handlePromoCode(code, getCartTotal());
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
    isLoading,
    userId,
    setCartItems,
    setPromoCode,
    setPromoDiscount,
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

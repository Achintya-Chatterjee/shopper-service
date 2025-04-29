import { CartItem, PromoCodeResult } from "@/types/Index";

// Available promo codes
const PROMO_CODES: Record<
  string,
  { discount: number; type: "percentage" | "fixed"; min?: number }
> = {
  WELCOME10: { discount: 10, type: "percentage" },
  SAVE20: { discount: 20, type: "percentage", min: 100 },
  FLAT25: { discount: 25, type: "fixed", min: 150 },
  SPECIAL15: { discount: 15, type: "percentage" },
};

// Quantity discount thresholds
const QUANTITY_DISCOUNTS = [
  { threshold: 5, discount: 0.05 }, // 5% discount for 5+ items
  { threshold: 10, discount: 0.1 }, // 10% discount for 10+ items
  { threshold: 20, discount: 0.15 }, // 15% discount for 20+ items
];

/**
 * Applies a promo code to the cart
 */
export function applyPromoCode(
  code: string,
  cartTotal: number
): PromoCodeResult {
  const upperCode = code.toUpperCase();
  const promoInfo = PROMO_CODES[upperCode];

  if (!promoInfo) {
    return {
      valid: false,
      discount: 0,
      message: "Invalid promo code",
    };
  }

  // Check minimum purchase requirement
  if (promoInfo.min && cartTotal < promoInfo.min) {
    return {
      valid: false,
      discount: 0,
      message: `Requires minimum purchase of $${promoInfo.min}`,
    };
  }

  let discount = 0;
  if (promoInfo.type === "percentage") {
    discount = (cartTotal * promoInfo.discount) / 100;
    return {
      valid: true,
      discount,
      message: `${promoInfo.discount}% discount applied`,
    };
  } else {
    discount = promoInfo.discount;
    return {
      valid: true,
      discount,
      message: `$${promoInfo.discount} discount applied`,
    };
  }
}

/**
 * Calculates quantity-based discounts for cart items
 */
export function calculateQuantityDiscounts(items: CartItem[]): CartItem[] {
  return items.map((item) => {
    let appliedDiscount = 0;

    // Find the highest applicable discount
    for (let i = QUANTITY_DISCOUNTS.length - 1; i >= 0; i--) {
      if (item.quantity >= QUANTITY_DISCOUNTS[i].threshold) {
        appliedDiscount = item.service.price * QUANTITY_DISCOUNTS[i].discount;
        break;
      }
    }

    return {
      ...item,
      appliedDiscount,
    };
  });
}

/**
 * Format cart data for sharing
 */
export function formatSharedCartData(
  cartItems: CartItem[],
  promoCode: string | null = null
) {
  return {
    items: cartItems.map((item) => ({
      serviceId: item.service.id,
      quantity: item.quantity,
      notes: item.notes || "",
    })),
    promoCode,
  };
}

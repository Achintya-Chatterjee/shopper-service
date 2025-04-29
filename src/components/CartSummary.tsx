import { useCart } from "@/context/cart";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ShoppingBag, Save } from "lucide-react";
import { PromoCodeInput } from "./PromoCodeInput";
import { SavedCarts } from "./SavedCarts";
import { ShareCart } from "./ShareCart";

export function CartSummary() {
  const {
    getCartTotal,
    getCartItemCount,
    getDiscountedTotal,
    saveCartForLater,
    promoDiscount,
  } = useCart();

  const cartTotal = getCartTotal();
  const discountedTotal = getDiscountedTotal();
  const itemCount = getCartItemCount();

  if (itemCount === 0) {
    return (
      <div className="text-center py-8">
        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-2 text-lg font-medium">Your cart is empty</h3>
        <p className="text-muted-foreground">
          Add some services to get started
        </p>
      </div>
    );
  }

  const handleSaveCart = () => {
    saveCartForLater();
  };

  return (
    <div className="space-y-6">
      <SavedCarts />

      <div className="flex flex-col gap-4">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={handleSaveCart}
        >
          <Save className="h-4 w-4 mr-2" />
          Save Cart for Later
        </Button>

        <ShareCart />
      </div>

      <PromoCodeInput />

      <div className="space-y-4">
        <div className="flex items-center justify-between text-base">
          <p>Subtotal</p>
          <p className="font-medium">{formatCurrency(cartTotal)}</p>
        </div>

        {promoDiscount > 0 && (
          <div className="flex items-center justify-between text-base text-green-600">
            <p>Promo Discount</p>
            <p>-{formatCurrency(promoDiscount)}</p>
          </div>
        )}

        <div className="border-t pt-4">
          <div className="flex items-center justify-between text-base font-medium">
            <p>Total</p>
            <p>{formatCurrency(discountedTotal)}</p>
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Taxes calculated at checkout
          </p>
        </div>
      </div>
      <Button asChild className="w-full">
        <Link to="/checkout">Proceed to Checkout</Link>
      </Button>
    </div>
  );
}

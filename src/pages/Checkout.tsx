import { CheckoutForm } from "@/components/CheckoutForm";
import { useCart } from "@/context/cart";
import { formatCurrency } from "@/lib/utils";
import { CartItem } from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

const CheckoutPage = () => {
  const { cartItems, getCartTotal } = useCart();
  const cartTotal = getCartTotal();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-lg mb-6">Add some services to checkout</p>
        <Button asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-16">
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Link>
      </Button>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <Card className="p-6">
            <CheckoutForm />
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <div className="p-4 bg-muted/50 border-b">
              <h3 className="font-medium">Items in Cart</h3>
            </div>
            <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
              {cartItems.map((item) => (
                <CartItem key={item.service.id} item={item} />
              ))}
            </div>
            <div className="p-4 bg-muted/50 border-t">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>{formatCurrency(cartTotal)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{formatCurrency(cartTotal)}</span>
              </div>
            </div>
          </Card>

          <div className="text-sm text-muted-foreground">
            <p>
              By completing your purchase, you agree to our Terms of Service and
              Privacy Policy.
            </p>
            <p className="mt-2">
              Need help? Contact our customer support at support@example.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

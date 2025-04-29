import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "@/context/cart";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { CartItem } from "@/types/Index";
import { Json } from "@/integrations/supabase/types";

const SharedCartPage = () => {
  const { cartId } = useParams();
  const {
    loadSavedCart,
    getSavedCarts,
    cartItems,
    setCartItems,
    setPromoCode,
    setPromoDiscount,
  } = useCart() as any;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!cartId) {
      navigate("/");
      return;
    }

    const fetchSharedCart = async () => {
      setIsLoading(true);

      try {
        // First, check if this is a local saved cart
        const savedCarts = getSavedCarts();
        const localCart = savedCarts.some((cart: { id: string; }) => cart.id === cartId);

        if (localCart) {
          loadSavedCart(cartId);
          toast.success("Shared cart loaded successfully!");
          navigate("/checkout");
          return;
        }

        // If not found locally, try to fetch from Supabase shared_carts table
        const { data, error } = await supabase
          .from("shared_carts")
          .select("*")
          .eq("id", cartId)
          .single();

        if (error) {
          throw new Error("The shared cart could not be found");
        }

        if (data) {
          // Type casting needed since the database structure is different
          const items = data.items as unknown as CartItem[];
          setCartItems(items);

          // Use optional chaining for potentially missing fields
          setPromoCode(data.promo_code || null);
          setPromoDiscount(data.promo_discount || 0);

          toast.success("Shared cart loaded successfully!");
          navigate("/checkout");
        }
      } catch (error) {
        console.error("Error loading shared cart:", error);
        toast.error("The shared cart could not be found");
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSharedCart();
  }, [
    cartId,
    loadSavedCart,
    navigate,
    getSavedCarts,
    setCartItems,
    setPromoCode,
    setPromoDiscount,
  ]);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">Loading Shared Cart</h1>
      <p className="text-lg mb-6">
        Please wait while we load the shared cart...
      </p>

      {isLoading ? (
        <div className="flex justify-center mb-6">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : null}

      <Button asChild>
        <div onClick={() => navigate("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </div>
      </Button>
    </div>
  );
};

export default SharedCartPage;

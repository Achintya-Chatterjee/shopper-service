import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const SharedCartPage = () => {
  const { cartId } = useParams();
  const { loadSavedCart, getSavedCarts } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (cartId) {
      const savedCarts = getSavedCarts();
      const cartExists = savedCarts.some((cart) => cart.id === cartId);

      if (cartExists) {
        loadSavedCart(cartId);
        toast.success("Shared cart loaded successfully!");
        navigate("/checkout");
      } else {
        toast.error("The shared cart could not be found");
        navigate("/");
      }
    }
  }, [cartId, loadSavedCart, navigate, getSavedCarts]);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">Loading Shared Cart</h1>
      <p className="text-lg mb-6">
        Please wait while we load the shared cart...
      </p>
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

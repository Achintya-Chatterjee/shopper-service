import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tag } from "lucide-react";

export function PromoCodeInput() {
  const [promoInput, setPromoInput] = useState("");
  const { applyPromoCode, removePromoCode, promoCode } = useCart();

  const handleApplyPromo = () => {
    if (promoInput.trim()) {
      applyPromoCode(promoInput.trim());
      setPromoInput("");
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Promo Code</p>

      {promoCode ? (
        <div className="flex items-center justify-between bg-primary/10 p-2 rounded">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{promoCode}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={removePromoCode}
            className="h-7 text-xs"
          >
            Remove
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value)}
            placeholder="Enter promo code"
            className="h-9"
          />
          <Button
            onClick={handleApplyPromo}
            disabled={!promoInput.trim()}
            className="h-9"
          >
            Apply
          </Button>
        </div>
      )}
    </div>
  );
}

import { useCompare } from "@/context/compare/CompareContext";
import { Service } from "@/types/Index";
import { Button } from "@/components/ui/button";
import { Columns3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CompareButtonProps {
  service: Service;
  variant?: "icon" | "default";
  className?: string;
}

export function CompareButton({
  service,
  variant = "default",
  className,
}: CompareButtonProps) {
  const { addToCompare, removeFromCompare, isInCompareList } = useCompare();
  const isInList = isInCompareList(service.id);

  const handleToggleCompare = () => {
    if (isInList) {
      removeFromCompare(service.id);
    } else {
      addToCompare(service);
    }
  };

  if (variant === "icon") {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggleCompare}
        className={cn("rounded-full", className)}
        aria-label={isInList ? "Remove from comparison" : "Add to comparison"}
      >
        <Columns3 className={cn("h-5 w-5", isInList && "text-primary")} />
      </Button>
    );
  }

  return (
    <Button
      variant={isInList ? "default" : "outline"}
      onClick={handleToggleCompare}
      className={className}
    >
      <Columns3 className="mr-2 h-4 w-4" />
      {isInList ? "Remove from comparison" : "Compare"}
    </Button>
  );
}

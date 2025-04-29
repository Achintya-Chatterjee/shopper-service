import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/context/favorites/FavoritesContext";
import { Service } from "@/types/Index";
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  service: Service;
  variant?: "icon" | "default";
  className?: string;
}

export function FavoriteButton({
  service,
  variant = "icon",
  className,
}: FavoriteButtonProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isServiceFavorite = isFavorite(service.id);

  const handleToggleFavorite = () => {
    if (isServiceFavorite) {
      removeFavorite(service.id);
      toast("Removed from favorites", {
        description: `${service.name} has been removed from your favorites`,
      });
    } else {
      addFavorite(service);
      toast("Added to favorites", {
        description: `${service.name} has been added to your favorites`,
      });
    }
  };

  if (variant === "icon") {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggleFavorite}
        className={cn("rounded-full", className)}
        aria-label={
          isServiceFavorite ? "Remove from favorites" : "Add to favorites"
        }
      >
        <Heart
          className={cn(
            "h-5 w-5",
            isServiceFavorite ? "fill-red-500 text-red-500" : "fill-none"
          )}
        />
      </Button>
    );
  }

  return (
    <Button
      variant={isServiceFavorite ? "default" : "outline"}
      onClick={handleToggleFavorite}
      className={className}
    >
      <Heart
        className={cn(
          "mr-2 h-4 w-4",
          isServiceFavorite ? "fill-white" : "fill-none"
        )}
      />
      {isServiceFavorite ? "In Favorites" : "Add to Favorites"}
    </Button>
  );
}

import { useFavorites } from "@/context/favorites/FavoritesContext";
import { ServiceCard } from "@/components/ServiceCard";
import { Header } from "@/components/Header";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div>
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Favorites</h1>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-muted-foreground">
              Start adding services to your favorites to see them here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;

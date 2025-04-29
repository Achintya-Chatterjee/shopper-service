import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Service } from "@/types/Index";
import { STORAGE_KEYS } from "@/config/constants";

interface FavoritesContextType {
  favorites: Service[];
  addFavorite: (service: Service) => void;
  removeFavorite: (serviceId: string) => void;
  isFavorite: (serviceId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Service[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (service: Service) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.find((item) => item.id === service.id)) {
        return prevFavorites;
      }
      return [...prevFavorites, service];
    });
  };

  const removeFavorite = (serviceId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((service) => service.id !== serviceId)
    );
  };

  const isFavorite = (serviceId: string) => {
    return favorites.some((service) => service.id === serviceId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

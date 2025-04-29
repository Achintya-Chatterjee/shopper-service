import { createContext, useContext, useState, ReactNode } from "react";
import { Service } from "@/types/Index";
import { toast } from "@/components/ui/sonner";

interface CompareContextType {
  compareList: Service[];
  addToCompare: (service: Service) => void;
  removeFromCompare: (serviceId: string) => void;
  isInCompareList: (serviceId: string) => boolean;
  clearCompareList: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const MAX_COMPARE_ITEMS = 3;

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareList, setCompareList] = useState<Service[]>([]);

  const addToCompare = (service: Service) => {
    if (compareList.some((item) => item.id === service.id)) {
      toast("Already in comparison", {
        description: `${service.name} is already in your comparison list`,
      });
      return;
    }

    if (compareList.length >= MAX_COMPARE_ITEMS) {
      toast("Comparison limit reached", {
        description: `You can compare up to ${MAX_COMPARE_ITEMS} services at once. Remove one to add another.`,
      });
      return;
    }

    setCompareList((prev) => [...prev, service]);
    toast("Added to comparison", {
      description: `${service.name} has been added to your comparison list`,
    });
  };

  const removeFromCompare = (serviceId: string) => {
    setCompareList((prev) =>
      prev.filter((service) => service.id !== serviceId)
    );
  };

  const isInCompareList = (serviceId: string) => {
    return compareList.some((service) => service.id === serviceId);
  };

  const clearCompareList = () => {
    setCompareList([]);
  };

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        isInCompareList,
        clearCompareList,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
};

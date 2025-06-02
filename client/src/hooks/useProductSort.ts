
import { useMemo } from "react";
import { Product } from "@/context/CartContext";

export const useProductSort = (products: Product[], sortBy: string) => {
  return useMemo(() => {
    const sorted = [...products];
    
    switch (sortBy) {
      case "name-asc":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price);
      case "category":
        return sorted.sort((a, b) => a.category.localeCompare(b.category));
      default:
        return sorted;
    }
  }, [products, sortBy]);
};

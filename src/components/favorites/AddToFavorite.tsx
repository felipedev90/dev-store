"use client";
import { useFavoriteStore } from "@/store/favorite-store";
import type { Product } from "@/types";
import { Heart } from "lucide-react";

interface FavoriteButtonProps {
  product: Product;
}

export default function FavoriteButton({ product }: FavoriteButtonProps) {
  const { addItem, removeItem, isFavorite } = useFavoriteStore();
  const favorited = isFavorite(product.id);

  const handleToggle = () => {
    if (favorited) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={
        favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"
      }
      title={favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
    >
      <Heart
        size={24}
        className={favorited ? "text-red-500 fill-red-500" : "text-gray-500"}
      />
    </button>
  );
}

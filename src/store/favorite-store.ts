import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types";
import type { FavoriteStore } from "@/types/favorite";

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product) => {
        const existingItem = get().items.find(
          (item) => item.product.id === product.id,
        );

        if (!existingItem) {
          set((state) => ({
            items: [...state.items, { product }],
          }));
        }
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      isFavorite: (productId: string) => {
        return get().items.some((item) => item.product.id === productId);
      },
    }),
    { name: "favorite-storage" },
  ),
);

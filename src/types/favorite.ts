import type { Product } from "./Product";

export interface FavoriteItem {
  product: Product;
}

export interface FavoriteStore {
  items: FavoriteItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

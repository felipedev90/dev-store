// Tipo do produto
export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: CategorySlug[];
  tags: string[];
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  features: string[];
  createdAt: string;
}

// Tipo da categoria do produto
export type CategorySlug =
  | "keyboard"
  | "mice"
  | "headsets"
  | "monitors"
  | "accesories";

// Tipo da categoria do produto
export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  image: string;
}

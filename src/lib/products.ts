import type { Product, Category } from "@/types";
import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import { apiClient } from "./api";

interface ApiProduct extends Omit<Product, "inStock"> {
  stock: number;
}

const products: Product[] = productsData as unknown as Product[];
const categories: Category[] = categoriesData as unknown as Category[];

export async function getAllProducts(): Promise<Product[]> {
  const data = await apiClient<ApiProduct[]>("/products");

  return data.map((produto) => ({
    ...produto,
    inStock: produto.stock > 0,
  }));
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  const produtos = await getAllProducts();
  return produtos.find((produto) => produto.slug === slug);
}

export async function getFeaturedProducts(
  limit: number = 8,
): Promise<Product[]> {
  const produtos = await getAllProducts();
  return [...produtos]
    .sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount)
    .slice(0, limit);
}

// Função que retorna os produtos de uma categoria específica
export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  const produtos = await getAllProducts();
  return produtos.filter((p) => p.category === category);
}

export async function getFilteredProducts(params: {
  category?: string;
  q?: string;
  sort?: string;
}): Promise<Product[]> {
  let filtered = await getAllProducts();

  if (params.category) {
    filtered = filtered.filter(
      (p) => p.category === (params.category as string),
    );
  }

  if (params.q) {
    const query = params.q.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some((tag: string) => tag.toLowerCase().includes(query)),
    );
  }

  switch (params.sort) {
    case "price-asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "recent":

    // Ordena os produtos do mais recente para o mais antigo, baseado na data de criação (createdAt).
    default:
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }

  return filtered;
}

// Função que retorna todas as categorias
export function getAllCategories(): Category[] {
  return categories;
}

// Função que retorna uma categoria pelo slug. Se não encontrar retorna undefined
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

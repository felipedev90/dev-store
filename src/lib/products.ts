import type { Product, Category } from "@/types";
import { apiClient } from "./api";

interface ApiProduct extends Omit<Product, "inStock"> {
  stock: number;
}

export async function getAllProducts(): Promise<Product[]> {
  const data = await apiClient<ApiProduct[]>("/products", {
    next: { revalidate: 60 }, // Revalida os dados a cada 60 segundos
  });

  return data.map((produto) => ({
    ...produto,
    inStock: produto.stock > 0,
  }));
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  try {
    const data = await apiClient<ApiProduct>(`/products/slug/${slug}`, {
      next: { revalidate: 60 }, // Revalida os dados a cada 60 segundos
    });

    return { ...data, inStock: data.stock > 0 };
  } catch (error) {
    console.error("Erro ao buscar produto pelo slug:", error);
    return undefined;
  }
}

// export async function getProductBySlug(
//   slug: string,
// ): Promise<Product | undefined> {
//   const produtos = await getAllProducts();
//   return produtos.find((produto) => produto.slug === slug);
// }

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
export async function getAllCategories(): Promise<Category[]> {
  const categoriesData = await apiClient<Category[]>("/categories", {
    next: { revalidate: 60 }, // Revalida os dados a cada 60 segundos
  });
  return categoriesData;
}

// Função que retorna uma categoria pelo slug. Se não encontrar retorna undefined
export async function getCategoryBySlug(
  slug: string,
): Promise<Category | undefined> {
  const categoriesData = await getAllCategories();
  return categoriesData.find((c) => c.slug === slug);
}

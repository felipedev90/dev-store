import type { Product, Category } from "@/types";
import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";

const products: Product[] = productsData as unknown as Product[];
const categories: Category[] = categoriesData as unknown as Category[];

// Função que retorna todos os produtos
export function getAllProducts(): Product[] {
  return products;
}

// Função que retorna um produto pelo slug. Se não encontrar retorna undefined
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

// Função para ordernar os produtos baseado no rating e reviewCount, retornando os mais populares primeiro
export function getFeaturedProducts(limit: number = 8): Product[] {
  return [...products] // Cria uma cópia do array
    .sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount)
    .slice(0, limit); // Pega os primeiros N itens do array ordenado. 0 é o índice inicial. Se vier sem argumento, pega os 8 primeiros (limit = 8)
}

// Função que retorna os produtos de uma categoria específica
export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

// Função que retorna os produtos filtrados por categoria, busca e ordenação
// params pode conter: category, q (query de busca) e sort (tipo de ordenação)
// Utiliza os parametros opcionais porque o usuário pode querer filtrar apenas por categoria, ou apenas por busca, ou apenas por ordenação, ou qualquer combinação desses filtros. Por isso, cada filtro é aplicado somente se o respectivo parâmetro for fornecido.
export function getFilteredProducts(params: {
  category?: string;
  q?: string;
  sort?: string;
}): Product[] {
  let filtered = [...products];

  if (params.category) {
    filtered = filtered.filter(
      (p) => p.category === (params.category as string),
    );
  }

  // params.q é a query de busca.
  // Se existir, filtra os produtos que tenham a query no nome, descrição ou tags.
  // A busca é case-insensitive, por isso converto tudo para minúsculo antes de comparar.
  if (params.q) {
    const query = params.q.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        // mantem no array só os produtos onde pelo menos uma dessas condições é verdadeira.
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some((tag: string) => tag.toLowerCase().includes(query)),
    );
  }

  // Ordenação dos produtos.
  // O tipo de ordenação é definido pelo parâmetro params.sort,
  // que pode ser "price-asc", "price-desc", "rating" ou "recent".
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

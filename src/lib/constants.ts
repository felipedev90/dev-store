export const STORE_NAME = "DevStore";
export const STORE_DESCRIPTION = "Sua loja de periféricos e acessórios tech";

export const CURRENCY = "BRL";
export const LOCALE = "pt-BR";

export const PRODUCTS_PER_PAGE = 12;

export const SORT_OPTIONS = [
  { label: "Mais recentes", value: "recent" },
  { label: "Menor preço", value: "price-asc" },
  { label: "Maior preço", value: "price-desc" },
  { label: "Mais avaliados", value: "rating" },
] as const;
// "as const" transforma os valores em tipos literais. Sem ele value seria string, e não "recent" | "price-asc" | "price-desc" | "rating"

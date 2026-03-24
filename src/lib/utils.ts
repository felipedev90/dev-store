import { LOCALE, CURRENCY } from "./constants";

// Função para formatar o preço em centavos para o formato de moeda local
// Recebe centavos e retorna string formatada (formatPrice(29990) => "R$ 299,90")
export function formatPrice(priceInCents: number): string {
  return new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: CURRENCY,
  }).format(priceInCents / 100);
}

// Função para calcular a porcentagem de desconto entre o preço original e o preço atual
// Recebe preço atual e preço original, retorna porcentagem arredondada (getDiscountPercentage(29990, 39990) => 25%)
export function getDiscountPercentage(
  price: number,
  originalPrice: number,
): number {
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

// Função para concatenar classes CSS de forma condicional
// Recebe uma lista de classes, filtra as que são verdadeiras e retorna uma string
// Ex: <button className={cn("bg-white px-4", isActive && "border-blue-500",disabled && "opacity-50")}></button>)
export function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

// Função para formatar CEP
export const formatCep = (value: string) => {
  return value
    .replace(/\D/g, "") // Remove caracteres não numéricos
    .replace(/^(\d{5})(\d)/, "$1-$2") // Adiciona hífen após os primeiros 5 dígitos
    .slice(0, 9); // Limita a 9 caracteres
};

// Função para formatar telefone
export const formatPhone = (value: string) => {
  return value
    .replace(/\D/g, "") // Remove caracteres não numéricos
    .slice(0, 11) // Limita a 11 dígitos
    .replace(/^(\d{2})(\d)/, "($1) $2") // Adiciona parênteses ao DDD
    .replace(/(\d{4,5})(\d{4})$/, "$1-$2"); // Adiciona hífen entre os últimos 8 dígitos
};
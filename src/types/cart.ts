import type { Product } from "./product";

// Tipo do item do carrinho - representa um produto e sua quantidade
export interface CartItem {
  product: Product;
  quantity: number;
}

// Tipo do estado do carrinho - representa os itens no carrinho e as ações para manipulá-los
// Contrato do Zustand para o estado do carrinho
export interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

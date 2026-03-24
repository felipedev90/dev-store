import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types";
import type { CartStore } from "@/types/cart";

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      // Adiciona um produto ao carrinho. Se o produto já existir, incrementa a quantidade.
      addItem: (product: Product) => {
        const existingItem = get().items.find(
          (item) => item.product.id === product.id,
        );

        if (existingItem) {
          // Se o produto já existe no carrinho, incrementa a quantidade
          set((state) => ({
            items: state.items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          }));
        } else {
          // Se o produto não existe no carrinho, adiciona um novo item com quantidade 1
          set((state) => ({
            items: [...state.items, { product, quantity: 1 }],
          }));
        }
      },

      // Remove um produto do carrinho com base no ID do produto
      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      // Atualiza a quantidade de um produto no carrinho. Se a quantidade for zero ou negativa, remove o item.
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          // Se a quantidade for zero ou negativa, remove o item do carrinho
          get().removeItem(productId);
        } else {
          // Atualiza a quantidade do item no carrinho
          set((state) => ({
            items: state.items.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item,
            ),
          }));
        }
      },

      // Limpa o carrinho, removendo todos os itens
      clearCart: () => {
        set({ items: [] });
      },

      // Calcula o total de itens no carrinho somando as quantidades de cada item
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      // Calcula o preço total do carrinho somando o preço de cada produto multiplicado pela sua quantidade
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0,
        );
      },

      isCartOpen: false,
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
    }),
    {
      // nome da chave no localStorage
      name: "cart-storage",
    },
  ),
);

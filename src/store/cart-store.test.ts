import { describe, expect, it } from 'vitest';
import { useCartStore } from './cart-store';
import { Product } from '@/types';

const mockProduct: Product = {
  id: '1',
  slug: 'produto-1',
  name: 'Produto 1',
  description: 'Descrição do Produto 1',
  price: 1000,
  originalPrice: 1500,
  images: ['image1.jpg'],
  category: 'keyboard',
  tags: ['tag1', 'tag2'],
  rating: 4.5,
  reviewCount: 10,
  inStock: true,
  features: ['feature1', 'feature2'],
  createdAt: '2024-01-01T00:00:00Z',
};

describe('Cart Store', () => {
  it('deve adicionar um item ao carrinho', () => {
    const { addItem } = useCartStore.getState();
    const { clearCart } = useCartStore.getState();

    addItem(mockProduct);

    const { items } = useCartStore.getState();

    expect(items).toHaveLength(1);
    expect(items[0].product).toEqual(mockProduct);
    expect(items[0].quantity).toBe(1);
    
    clearCart();
  });

  it('deve adicionar a quantidade correta ao adicionar o mesmo produto', () => {
    const { addItem } = useCartStore.getState();
    const { clearCart } = useCartStore.getState();

    addItem(mockProduct);
    addItem(mockProduct);

    const { items } = useCartStore.getState();

    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(2);

    clearCart();
  });

  it('deve remover um item do carrinho', () => {
    const { addItem, removeItem } = useCartStore.getState();
    const { clearCart } = useCartStore.getState();

    addItem(mockProduct);
    removeItem(mockProduct.id);

    const { items } = useCartStore.getState();

    expect(items).toHaveLength(0);

    clearCart();
  });

  it('deve atualizar a quantidade de um item para zero e removê-lo do carrinho', () => {
    const { addItem, updateQuantity } = useCartStore.getState();
    const { clearCart } = useCartStore.getState();

    addItem(mockProduct);
    updateQuantity(mockProduct.id, 0);

    const { items } = useCartStore.getState();

    expect(items).toHaveLength(0);
    clearCart();
  });

  it('deve calcular o total do carrinho corretamente', () => {
    const { addItem, getTotalItems } = useCartStore.getState();
    const { clearCart } = useCartStore.getState();

    addItem(mockProduct);
    addItem(mockProduct);

    const totalItems = getTotalItems();

    expect(totalItems).toBe(2);
    clearCart();
  });

  it('deve calcular o preço total do carrinho corretamente', () => {
    const { addItem, getTotalPrice } = useCartStore.getState();
    const { clearCart } = useCartStore.getState();

    addItem(mockProduct);
    addItem(mockProduct);

    const totalPrice = getTotalPrice();

    expect(totalPrice).toBe(2000);
    clearCart();
  });
});
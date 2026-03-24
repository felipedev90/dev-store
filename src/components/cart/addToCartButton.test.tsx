import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, beforeEach } from "vitest";
import AddToCartButton from "./AddToCartButton";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types";

const mockProduct: Product = {
  id: "1",
  slug: "produto-1",
  name: "Produto 1",
  description: "Descrição",
  price: 100000,
  originalPrice: 150000,
  images: ["/image1.jpg"],
  category: "keyboard",
  tags: ["tag1"],
  rating: 4.5,
  reviewCount: 10,
  inStock: true, // Começamos com ele em estoque!
  features: ["feature1"],
  createdAt: "2024-01-01T00:00:00Z",
};

describe("AddToCartButton Component", () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it("deve adicionar o produto ao carrinho quando clicado", async () => {
    const user = userEvent.setup();
    render(<AddToCartButton product={mockProduct} />);

    const button = screen.getByRole("button", {
      name: /Adicionar ao carrinho/i,
    });
    await user.click(button);

    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].product.id).toBe(mockProduct.id);
  });

  it("deve exibir 'Indisponível' e estar desabilitado quando o produto não estiver em estoque", () => {
    const outOfStockProduct = { ...mockProduct, inStock: false };
    render(<AddToCartButton product={outOfStockProduct} />);

    const button = screen.getByRole("button", {
      name: /Indisponível/i,
    });
    expect(button).toBeDisabled();

    const { items } = useCartStore.getState();
    expect(items).toHaveLength(0);
  });
});

import { it, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductCard } from "./ProductCard";
import { Product } from "@/types";
import { useCartStore } from "@/store/cart-store";

const mockProduct: Product = {
  id: "1",
  slug: "produto-1",
  name: "Produto 1",
  description: "Descrição do Produto 1",
  price: 100000, // 1.000,00 em centavos
  originalPrice: 150000, // 1.500,00 em centavos
  images: ["/image1.jpg"],
  category: "keyboard",
  tags: ["tag1", "tag2"],
  rating: 4.5,
  reviewCount: 10,
  inStock: true,
  features: ["feature1", "feature2"],
  createdAt: "2024-01-01T00:00:00Z",
};

describe("ProductCard Component", () => {
  beforeEach(() => {
    // Limpa o carrinho antes de cada teste
    useCartStore.getState().clearCart();
  });

  it("deve renderizar as informações do produto corretamente", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("Produto 1")).toBeInTheDocument();
    expect(screen.getByText(/1\.000,00/)).toBeInTheDocument();
    expect(screen.getByText(/1\.500,00/)).toBeInTheDocument();
    expect(screen.getByText(/33% Off/i)).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument();
  });

  it("não deve renderizar a badge de desconto quando não houver originalPrice", () => {
    const productWithoutDiscount = { ...mockProduct, originalPrice: undefined };
    render(<ProductCard product={productWithoutDiscount} />);

    expect(screen.queryByText(/Off/i)).not.toBeInTheDocument();

    expect(screen.getByText(/1\.000,00/)).toBeInTheDocument();
  });

  it("deve conter o link com o href correto para a página de detalhes do produto", () => {
    render(<ProductCard product={mockProduct} />);

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute(
      "href",
      `/products/${mockProduct.slug}`,
    );
  });
});

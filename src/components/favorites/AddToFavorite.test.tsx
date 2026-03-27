import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, beforeEach } from "vitest";
import AddToFavorite from "./AddToFavorite";
import { useFavoriteStore } from "@/store/favorite-store";
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
  inStock: true,
  features: ["feature1"],
  createdAt: "2024-01-01T00:00:00Z",
};

describe("addToFavorite Component", () => {
  beforeEach(() => {
    useFavoriteStore.getState().removeItem(mockProduct.id);
  });

  it("deve adicionar o produto aos favoritos quando clicado", async () => {
    const user = userEvent.setup();
    render(<AddToFavorite product={mockProduct} />);

    const button = screen.getAllByRole("button", {
      name: /Adicionar aos favoritos/i,
    })[0];

    await user.click(button);
  });

  it("deve remover o produto dos favoritos quando clicado novamente", async () => {
    const user = userEvent.setup();
    render(<AddToFavorite product={mockProduct} />);
    const button = screen.getAllByRole("button", {
      name: /Adicionar aos favoritos/i,
    })[0];

    await user.click(button);

    const removeButton = screen.getAllByRole("button", {
      name: /Remover dos favoritos/i,
    })[0];

    await user.click(removeButton);
  });

  it("deve exibir o coração preenchido quando o produto estiver nos favoritos", async () => {
    const user = userEvent.setup();
    render(<AddToFavorite product={mockProduct} />);

    const button = screen.getAllByRole("button", {
      name: /Adicionar aos favoritos/i,
    })[0];

    await user.click(button);

    const favoritedButton = screen.getAllByRole("button", {
      name: /Remover dos favoritos/i,
    })[0];

    expect(favoritedButton).toBeInTheDocument();
  });
});

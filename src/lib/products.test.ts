import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  getAllProducts,
  getProductBySlug,
  getFeaturedProducts,
} from "./products";
import * as api from "./api";

interface ApiProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: "keyboard" | "mice" | "headsets" | "monitors" | "accesories";
  tags: string[];
  rating: number;
  reviewCount: number;
  features: string[];
  createdAt: string;
  stock: number;
}

function makeApiProduct(overrides: Partial<ApiProduct> = {}): ApiProduct {
  return {
    id: "1",
    slug: "produto-1",
    name: "Produto 1",
    description: "Descrição do Produto 1",
    price: 1000,
    images: ["img1.jpg"],
    category: "keyboard",
    tags: ["tag1"],
    rating: 4.5,
    reviewCount: 10,
    features: ["feature1"],
    createdAt: "2024-01-01T00:00:00Z",
    stock: 5,
    ...overrides,
  };
}

describe("getAllProducts", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("mapeamento de stock para inStock", () => {
    it("deve mapear stock > 0 para inStock: true", async () => {
      vi.spyOn(api, "apiClient").mockResolvedValueOnce([
        makeApiProduct({ stock: 5 }),
      ]);

      const products = await getAllProducts();

      expect(products[0].inStock).toBe(true);
    });

    it("deve mapear stock === 1 (mínimo positivo) para inStock: true", async () => {
      vi.spyOn(api, "apiClient").mockResolvedValueOnce([
        makeApiProduct({ stock: 1 }),
      ]);

      const products = await getAllProducts();

      expect(products[0].inStock).toBe(true);
    });

    it("deve mapear stock === 0 para inStock: false", async () => {
      vi.spyOn(api, "apiClient").mockResolvedValueOnce([
        makeApiProduct({ stock: 0 }),
      ]);

      const products = await getAllProducts();

      expect(products[0].inStock).toBe(false);
    });

    it("deve mapear múltiplos produtos com stocks diferentes corretamente", async () => {
      vi.spyOn(api, "apiClient").mockResolvedValueOnce([
        makeApiProduct({ id: "1", slug: "produto-1", stock: 10 }),
        makeApiProduct({ id: "2", slug: "produto-2", stock: 0 }),
        makeApiProduct({ id: "3", slug: "produto-3", stock: 1 }),
      ]);

      const products = await getAllProducts();

      expect(products[0].inStock).toBe(true);
      expect(products[1].inStock).toBe(false);
      expect(products[2].inStock).toBe(true);
    });

    it("deve preservar todas as outras propriedades do produto", async () => {
      const apiProduct = makeApiProduct({ stock: 3 });
      vi.spyOn(api, "apiClient").mockResolvedValueOnce([apiProduct]);

      const products = await getAllProducts();
      const { stock: _stock, ...expectedFields } = apiProduct;

      expect(products[0]).toMatchObject({ ...expectedFields, inStock: true });
    });

    it("deve retornar lista vazia quando a API retornar vazio", async () => {
      vi.spyOn(api, "apiClient").mockResolvedValueOnce([]);

      const products = await getAllProducts();

      expect(products).toHaveLength(0);
    });
  });

  describe("chamada à API", () => {
    it("deve chamar apiClient com o endpoint /products", async () => {
      const spy = vi
        .spyOn(api, "apiClient")
        .mockResolvedValueOnce([makeApiProduct()]);

      await getAllProducts();

      expect(spy).toHaveBeenCalledWith("/products");
    });

    it("deve propagar erro lançado pelo apiClient", async () => {
      vi.spyOn(api, "apiClient").mockRejectedValueOnce(
        new Error("Erro interno do servidor"),
      );

      await expect(getAllProducts()).rejects.toThrow(
        "Erro interno do servidor",
      );
    });
  });
});

describe("getProductBySlug", () => {
  beforeEach(() => {
    vi.spyOn(api, "apiClient").mockResolvedValue([
      makeApiProduct({ id: "1", slug: "teclado-mecanico", stock: 5 }),
      makeApiProduct({ id: "2", slug: "mouse-gamer", stock: 0 }),
    ]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("deve retornar o produto com o slug correto", async () => {
    const product = await getProductBySlug("mouse-gamer");

    expect(product?.slug).toBe("mouse-gamer");
  });

  it("deve retornar undefined quando o slug não existir", async () => {
    const product = await getProductBySlug("slug-inexistente");

    expect(product).toBeUndefined();
  });

  it("deve retornar o produto com inStock mapeado corretamente", async () => {
    const product = await getProductBySlug("mouse-gamer");

    expect(product?.inStock).toBe(false);
  });
});

describe("getFeaturedProducts", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("deve limitar o número de resultados ao valor do parâmetro limit", async () => {
    vi.spyOn(api, "apiClient").mockResolvedValueOnce(
      Array.from({ length: 20 }, (_, i) =>
        makeApiProduct({ id: String(i), slug: `produto-${i}`, stock: i }),
      ),
    );

    const products = await getFeaturedProducts(3);

    expect(products).toHaveLength(3);
  });

  it("deve retornar 8 produtos por padrão", async () => {
    vi.spyOn(api, "apiClient").mockResolvedValueOnce(
      Array.from({ length: 20 }, (_, i) =>
        makeApiProduct({ id: String(i), slug: `produto-${i}`, stock: 1 }),
      ),
    );

    const products = await getFeaturedProducts();

    expect(products).toHaveLength(8);
  });
});

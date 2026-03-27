"use client";
import { ProductGrid } from "@/components/product/ProductGrid";
import Container from "@/components/layout/Container";
import { useFavoriteStore } from "@/store/favorite-store";
import { useCartStore } from "@/store/cart-store";
import Link from "next/link";

export default function FavoritesPage() {
  const items = useFavoriteStore((state) => state.items);
  const removeItem = useFavoriteStore((state) => state.removeItem);
  const addItem = useCartStore((state) => state.addItem);
  const favoriteProducts = items.map((item) => item.product);

  return (
    <Container className="py-8">
      <h1 className="text-2xl font-bold mb-2">Meus Favoritos</h1>
      {favoriteProducts.length === 0 ? (
        <div className="text-center py-10 gap-2 flex flex-col items-center">
          <p className="text-gray-500">
            Você ainda não adicionou produtos aos favoritos.
          </p>
          <Link
            href="/products"
            className="text-sm text-blue-500 hover:underline mb-4 inline-block"
          >
            &larr; Voltar para produtos
          </Link>
        </div>
      ) : (
        <ProductGrid
          products={favoriteProducts}
          onRemoveItem={(id) => removeItem(id)}
          onAddItem={(product) => addItem(product)}
        />
      )}
    </Container>
  );
}

"use client";
import { ProductGrid } from "@/components/product/ProductGrid";
import Container from "@/components/layout/Container";
import { useFavoriteStore } from "@/store/favorite-store";

export default function FavoritesPage() {
  const items = useFavoriteStore((state) => state.items);
  const removeItem = useFavoriteStore((state) => state.removeItem); // Pegamos a função do Zustand

  const favoriteProducts = items.map((item) => item.product);

  return (
    <Container className="py-8">
      <h1 className="text-2xl font-bold mb-6">Meus Favoritos</h1>
      {favoriteProducts.length === 0 ? (
        <p className="text-gray-500">
          Você ainda não adicionou produtos aos favoritos.
        </p>
      ) : (
        <ProductGrid
          products={favoriteProducts}
          onRemoveItem={(id) => removeItem(id)}
        />
      )}
    </Container>
  );
}

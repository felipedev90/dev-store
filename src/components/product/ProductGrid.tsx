import { ProductCard } from "./ProductCard";
import type { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
  onRemoveItem?: (productId: string) => void;
  onAddItem?: (product: Product) => void;
}

export function ProductGrid({
  products,
  onRemoveItem,
  onAddItem,
}: ProductGridProps) {
  const isEmpty = products.length === 0;

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8">
        <p className="text-2xl font-semibold">Nenhum produto encontrado.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onRemove={onRemoveItem ? () => onRemoveItem(product.id) : undefined}
          onAdd={onAddItem ? () => onAddItem(product) : undefined}
        />
      ))}
    </div>
  );
}

/* 
- Esse componente recebe uma lista de produtos e os exibe em um layout de grade. 
- Ele utiliza o componente ProductCard para renderizar cada produto individualmente. 
- A grade é responsiva, ajustando o número de colunas com base no tamanho da tela. 
*/

import { ProductCard } from "./ProductCard";
import type { Product } from "@/types";

export function ProductGrid({ products }: { products: Product[] }) {
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
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

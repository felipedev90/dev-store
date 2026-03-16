/* 
- Esse componente é responsável por exibir as informações de um produto individualmente. 
- Ele recebe um objeto do tipo Product como prop e renderiza a imagem, nome, preço, desconto (se houver) e avaliação do produto. 
- O componente utiliza o Next.js Link para tornar o card clicável, direcionando o usuário para a página de detalhes do produto.
*/

import { formatPrice, getDiscountPercentage } from "@/lib/utils";
import type { Product } from "@/types";
import Badge from "../ui/Badge";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`}>
      {/* CARD */}
      <div className="p-4 transition-shadow cursor-pointer hover:shadow-lg rounded">
        {/* Imagem + Badge */}
        <div className="relative h-48 w-full overflow-hidden rounded-t">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain"
          />
          {product.originalPrice && (
            <div className="absolute top-3 right-1 z-10">
              <Badge variant="discount">
                {getDiscountPercentage(product.price, product.originalPrice)}%
                Off
              </Badge>
            </div>
          )}
        </div>

        <h2 className="text-lg font-bold">{product.name}</h2>

        <div className="flex items-center justify-between">
          {/* Preço original */}
          {product.originalPrice && (
            <span className="line-through text-gray-400">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          {/* Preço atual */}
          <span className="text-lg font-bold">
            {formatPrice(product.price)}
          </span>
        </div>

        <span className="flex items-center gap-2 text-sm text-gray-600">
          <Star size={18} />
          {product.rating}
        </span>
      </div>
    </Link>
  );
}

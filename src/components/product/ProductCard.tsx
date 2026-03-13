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

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`}>
      <div>
        <Image
          src={product.images[0]}
          alt={product.name}
          width={300}
          height={300}
        />
        <h2>{product.name}</h2>
        <span>{formatPrice(product.price)}</span>
        {product.originalPrice && (
          <Badge variant="discount">
            {getDiscountPercentage(product.price, product.originalPrice)}% Off
          </Badge>
        )}
        <span>{product.rating}</span>
      </div>
    </Link>
  );
}

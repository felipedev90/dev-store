import { formatPrice, getDiscountPercentage } from "@/lib/utils";
import type { Product } from "@/types";
import Badge from "../ui/Badge";
import Image from "next/image";
import Link from "next/link";
import { Star, Trash2, ShoppingCart } from "lucide-react";

// Criamos uma interface para receber o produto e a função de remover opcional
interface ProductCardProps {
  product: Product;
  onRemove?: () => void;
  onAdd?: () => void;
}

export function ProductCard({ product, onRemove, onAdd }: ProductCardProps) {
  return (
    <div className="relative group h-full">
      <Link href={`/products/${product.slug}`}>
        <div className="p-4 transition-shadow cursor-pointer hover:shadow-lg rounded h-full bg-white flex flex-col">
          <div className="relative h-48 w-full overflow-hidden rounded-t">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
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

          <h2 className="text-lg font-bold mt-2">{product.name}</h2>

          <div className="flex items-start flex-col mt-auto pt-2">
            {product.originalPrice && (
              <span className="line-through text-gray-600 text-sm">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-lg font-bold">
              {formatPrice(product.price)}
            </span>
          </div>

          <span className="flex items-center gap-2 text-sm text-gray-600 mt-2">
            <Star size={18} className="text-yellow-500 fill-yellow-500" />
            {product.rating}
          </span>
        </div>
      </Link>

      {/* BOTÃO DE EXCLUIR FLUTUANTE - Só aparece se a prop onRemove for passada */}
      {onRemove && (
        <>
          <button
            onClick={(e) => {
              e.preventDefault();
              onRemove();
            }}
            className="absolute bottom-5 right-7 lg:right-5 z-20 p-2 bg-white rounded-full text-red-500 hover:bg-red-50 hover:scale-110 transition-all lg:opacity-0 group-hover:opacity-100"
            aria-label="Remover dos favoritos"
          >
            <Trash2 size={20} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              onAdd?.();
            }}
            className="absolute bottom-5 right-16 lg:right-14 z-20 p-2 bg-white rounded-full text-green-500 hover:bg-green-50 hover:scale-110 transition-all lg:opacity-0 group-hover:opacity-100"
            aria-label="Adicionar ao carrinho"
          >
            <ShoppingCart size={20} />
          </button>
        </>
      )}
    </div>
  );
}

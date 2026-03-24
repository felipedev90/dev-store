"use client";

import type { Product } from "@/types";
import { useCartStore } from "@/store/cart-store";
import Button from "@/components/ui/Button";

interface AddToCartButtonProps {
    product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const addItem = useCartStore(state => state.addItem);

    const handleAddToCart = () => {
        addItem(product);
    }

    return (
        <Button onClick={handleAddToCart} disabled={!product.inStock} variant="primary" size="md" 
        className={`w-full ${!product.inStock ? "cursor-not-allowed opacity-50" : ""}`}>
            {product.inStock ? "Adicionar ao Carrinho" : "Indisponível"}
        </Button>
        );
    };


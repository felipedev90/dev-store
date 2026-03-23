"use client";
import Badge from "../ui/Badge";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

export default function CartIcon(){
    const totalItems = useCartStore(state => state.getTotalItems());
    const toggleCart = useCartStore(state => state.toggleCart);

    return (
        <button onClick={toggleCart} className="relative">
            <ShoppingCart size={24} />
            {totalItems > 0 && (
                <span className="absolute -top-2 -right-3">
                    <Badge variant="cart">
                        {totalItems}
                    </Badge>
                </span>
            )}
        </button>
    );
}

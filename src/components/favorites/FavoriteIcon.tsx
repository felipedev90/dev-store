"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useFavoriteStore } from "@/store/favorite-store";
import Badge from "@/components/ui/Badge";

export default function FavoriteIcon() {
  const items = useFavoriteStore((state) => state.items);

  return (
    <Link href="/favorites" className="relative" aria-label="Favoritos">
      <Heart size={24} />
      {items.length > 0 && (
        <span className="absolute -top-2 -right-3">
          <Badge variant="cart">{items.length}</Badge>
        </span>
      )}
    </Link>
  );
}

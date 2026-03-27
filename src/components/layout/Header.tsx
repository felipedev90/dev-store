"use client";
import Link from "next/link";
import Container from "./Container";
import dynamic from "next/dynamic";

const CartIcon = dynamic(() => import("@/components/cart/CartIcon"), {
  ssr: false,
});

const FavoriteIcon = dynamic(
  () => import("@/components/favorites/FavoriteIcon"),
  {
    ssr: false,
  },
);

export default function Header() {
  return (
    <header id="home" className="bg-white shadow-sm fixed w-full z-50">
      <Container>
        <div className="flex flex-wrap items-center justify-between py-2 px-1 gap-y-2">
          <div className="flex justify-center flex-col md:items-start gap-1">
            <Link href="/" className="text-xl font-bold text-shadow-mauve-400">
              DevStore_
            </Link>
            <span className="text-shadow-mauve-400 text-xs md:text-sm text-gray-700">
              A place for developers
            </span>
          </div>

          {/* w-full e order-last no mobile. Voltam ao normal no md: */}
          <nav className="w-full md:w-auto order-last md:order-0">
            <div className="flex items-center justify-center gap-3 md:gap-6 text-sm md:text-base">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <span className="text-gray-200">|</span>
              <Link
                href="/products"
                className="hover:text-blue-600 transition-colors"
              >
                Produtos
              </Link>
              <span className="text-gray-200">|</span>
              <Link
                href="/#about"
                className="hover:text-blue-600 transition-colors"
              >
                Sobre nós
              </Link>
              <span className="text-gray-200">|</span>
              <Link
                href="/#footer"
                className=" hover:text-blue-600 transition-colors"
              >
                Contato
              </Link>
            </div>
          </nav>

          <div className="flex items-center gap-4 md:gap-4">
            <FavoriteIcon />
            <CartIcon />
          </div>
        </div>
      </Container>
    </header>
  );
}

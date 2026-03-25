/* 
Componente responsável por renderizar o cabeçalho do site, incluindo o nome da loja, um link para a página de produtos e um ícone de carrinho de compras. 
Utiliza o componente Container para garantir que o conteúdo do cabeçalho esteja alinhado e espaçado corretamente.
*/
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
    <header className="bg-white shadow-sm fixed w-full z-50">
      <Container>
        <div className="flex items-center justify-between py-4">
          <div className="flex flex-col items-center">
            <Link href="/" className="text-xl font-bold">
              DevStore
            </Link>
            <span className="text-shadow-mauve-400 text-sm">
              A place for developers
            </span>
          </div>
          <nav>
            <Link
              href="/products"
              className="hover:text-blue-600 transition-colors"
            >
              Produtos
            </Link>
          </nav>
          <div className="flex items-center gap-3 md:gap-4">
            <FavoriteIcon />
            <CartIcon />
          </div>
        </div>
      </Container>
    </header>
  );
}

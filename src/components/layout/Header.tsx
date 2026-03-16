/* 
Componente responsável por renderizar o cabeçalho do site, incluindo o nome da loja, um link para a página de produtos e um ícone de carrinho de compras. 
Utiliza o componente Container para garantir que o conteúdo do cabeçalho esteja alinhado e espaçado corretamente.
*/

import Link from "next/link";
import Container from "./Container";
import { ShoppingCart } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
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
          <div>
            <ShoppingCart size={24} />
          </div>
        </div>
      </Container>
    </header>
  );
}

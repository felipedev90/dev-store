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
          <Link href="/" className="text-xl font-bold">
            DevStore
          </Link>
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

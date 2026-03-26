import Container from "@/components/layout/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getFeaturedProducts } from "@/lib/products";
import Link from "next/link";

export default function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-12">
      <Container>
        <h2 className="text-2xl font-bold mb-1">Produtos em destaque</h2>
        <ProductGrid products={featuredProducts} />
        <button className="mt-8 mx-auto block">
          <Link
            href="/products"
            className="px-6 py-3 bg-transparent text-black border border-gray-200 rounded-lg hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-colors"
          >
            Ver todos os produtos
          </Link>
        </button>
      </Container>
    </section>
  );
}

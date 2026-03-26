import Container from "@/components/layout/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getFeaturedProducts } from "@/lib/products";

export default function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-12">
      <Container>
        <h2 className="text-2xl font-bold mb-8">Produtos em destaque</h2>
        <ProductGrid products={featuredProducts} />
      </Container>
    </section>
  );
}

import { getFilteredProducts } from "@/lib/products";
import Container from "@/components/layout/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import ProductFilter from "@/components/product/ProductFilter";

type Props = {
  searchParams: Promise<{
    category?: string;
    q?: string;
    sort?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const products = getFilteredProducts(params);

  return (
    <Container>
      <ProductFilter />
      <ProductGrid products={products} />
    </Container>
  );
}

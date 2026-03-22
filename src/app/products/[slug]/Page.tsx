import { getProductBySlug, getAllProducts } from "@/lib/products";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import { formatPrice, getDiscountPercentage } from "@/lib/utils";
import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Produto não encontrado",
    };
  }
  return { title: product.name, description: product.description };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <Container className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[70vw] mx-auto border p-6 rounded-lg shadow">
        <div className="relative w-full h-96 ">
          <Image src={product.images[0]} alt={product.name} fill priority />
        </div>

        <div>
          <h2>{product.name}</h2>
          <span>{product.rating}</span>
          <p>{product.description}</p>
          <span>{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <Badge variant="discount">
              {getDiscountPercentage(product.price, product.originalPrice)}% OFF
            </Badge>
          )}
        </div>
      </div>
    </Container>
  );
}

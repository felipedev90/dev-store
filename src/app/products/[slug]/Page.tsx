import { getProductBySlug, getAllProducts } from "@/lib/products";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import { formatPrice, getDiscountPercentage } from "@/lib/utils";
import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import { Star } from "lucide-react"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 lg:gap-8 max-w-[70vw] mx-auto  p-1 md:p-6  shadow">
        <div className="relative w-full h-96 ">
          <Image src={product.images[0]} alt={product.name} fill priority className="relative w-full h-64 md:h-96 object-contain"/>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <span className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className={i < product.rating ? "text-yellow-500" : "text-gray-300"} />
            ))}
          </span>
          <p className="text-gray-700">{product.description}</p>
          <ul className="list-disc list-inside">
            {product.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          {product.originalPrice && (
            <span className="text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          <span className="text-xl font-bold">{formatPrice(product.price)}</span>
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

import Link from "next/link";
import { Star, StarHalf } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import { formatPrice, getDiscountPercentage } from "@/lib/utils";
import { getProductBySlug, getAllProducts } from "@/lib/products";
import AddToCartButton from "@/components/cart/AddToCartButton";
import AddToFavoriteButton from "@/components/favorites/AddToFavorite";
import ProductGallery from "@/components/product/ProductGallery";

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
      <Link
        href="/products"
        className="text-sm text-blue-500 hover:underline mb-4 inline-block"
      >
        &larr; Voltar para produtos
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 lg:gap-8 max-w-[100vw] md:max-w-[70vw] mx-auto p-1 md:p-6 shadow-xl rounded-lg">
        <div className="relative w-full bg-white rounded-lg">
          <ProductGallery productName={product.name} images={product.images} />
          <div className="absolute top-6 right-3 z-10">
            {product.originalPrice && (
              <Badge variant="discount">
                {getDiscountPercentage(product.price, product.originalPrice)}%
                OFF
              </Badge>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <AddToFavoriteButton product={product} />
          </div>
          <span className="flex items-center gap-1 pb-2 border-b">
            {Array.from({ length: 5 }, (_, i) => {
              if (i < Math.floor(product.rating)) {
                return (
                  <Star key={i} className="text-yellow-500 fill-yellow-500" />
                );
              } else if (i < product.rating) {
                return (
                  <StarHalf
                    key={i}
                    className="text-yellow-500 fill-yellow-500"
                  />
                );
              } else {
                return (
                  <Star key={i} className="text-gray-300 fill-transparent" />
                );
              }
            })}
            <span className="ml-1 text-sm text-gray-600 font-medium">
              {product.rating.toFixed(1)}
            </span>
          </span>
          <p className="text-gray-700 pt-2">{product.description}</p>
          <ul className="list-disc list-inside">
            {product.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-gray-600 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-3xl font-bold pb-4 text-end">
              {formatPrice(product.price)}
            </span>
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            image: product.images,
            offers: {
              "@type": "Offer",
              price: (product.price / 100).toFixed(2),
              priceCurrency: "BRL",
              availability: `https://schema.org/${product.inStock ? "InStock" : "OutOfStock"}`,
            },
          }),
        }}
      />
    </Container>
  );
}

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { getAllCategories } from "@/lib/products";

export default function Categories() {
  const productsCategory = getAllCategories();

  return (
    <section>
      <Container>
        <h2 className="text-2xl font-bold mb-8 pt-6 md:pt-0">Categorias</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {productsCategory.map((category) => (
            <Link
              key={category.slug}
              href={`/products?category=${category.slug}`}
            >
              <div className="relative h-40 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 hover:shadow-lg">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 h-full flex items-center justify-center">
                  <h3 className="text-white font-bold text-lg">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

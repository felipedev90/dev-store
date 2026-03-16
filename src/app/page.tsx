import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getAllCategories, getFeaturedProducts } from "@/lib/products";

export default function Home() {
  const productsCategory = getAllCategories();
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      <section className="relative flex items-center justify-center min-h-[70vh]">
        {/* Imagem de fundo */}
        <Image
          src="/images/hero.webp"
          alt="Hero image"
          fill
          priority
          className="object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Conteúdo */}
        <div className="relative z-10 text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tudo para seu setup, em um só lugar.
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Periféricos e acessórios tech com os melhores preços do Brasil!
          </p>

          {/* Botão */}
          <Link href="/products">
            <Button variant="secondary">Explore nossos produtos</Button>
          </Link>
        </div>
      </section>

      {/* PRODUTOS EM DESTAQUE*/}
      <section className="py-12">
        <Container>
          <h2 className="text-2xl font-bold mb-8">Produtos em destaque</h2>
          <ProductGrid products={featuredProducts} />
        </Container>
      </section>

      {/* CATEGORIAS */}
      <section className="py-12">
        <Container>
          <h2 className="text-2xl font-bold mb-8">Categorias</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {productsCategory.map((category) => (
            <Link key={category.slug} href={`/products?category=${category.slug}`}>
              <div className="relative h-40 rounded-lg overflow-hidden">
                <Image 
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40"/>
                <div className="relative z-10 h-full flex items-center justify-center">
                  <h3 className="text-white font-bold text-lg">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
            </div>
        </Container>
      </section>
    </>
  );
}

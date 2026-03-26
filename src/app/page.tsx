import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getAllCategories, getFeaturedProducts } from "@/lib/products";
import Newsletter from "@/components/layout/Newsletter";
import { Truck, Shield, CreditCard } from "lucide-react";
import LogoSlider from "@/components/layout/LogoSlider";

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

      {/* BENEFÍCIOS */}
      <section className="py-12 hidden md:block">
        <div className="relative">
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-40">
            <div className="flex items-center space-x-2">
              <Truck size={24} />
              <span className="text-sm">
                <strong className="text-blue-800">Frete grátis</strong> acima de
                R$ 200
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield size={24} />
              <span className="text-sm">
                <strong className="text-blue-800">Compra segura</strong>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CreditCard size={24} />
              <span className="text-sm">
                <strong className="text-blue-800">Parcelamento</strong> em até
                12x sem juros
              </span>
            </div>
          </div>
        </div>
      </section>

      <LogoSlider />

      {/* CATEGORIAS */}
      <section>
        <Container>
          <h2 className="text-2xl font-bold mb-8 pt-6 md:pt-0">Categorias</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {productsCategory.map((category) => (
              <Link
                key={category.slug}
                href={`/products?category=${category.slug}`}
              >
                <div className="relative h-40 rounded-lg overflow-hidden">
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

        {/* PRODUTOS EM DESTAQUE*/}
        <section className="py-12">
          <Container>
            <h2 className="text-2xl font-bold mb-8">Produtos em destaque</h2>
            <ProductGrid products={featuredProducts} />
          </Container>
        </section>

        <Newsletter />
      </section>
    </>
  );
}

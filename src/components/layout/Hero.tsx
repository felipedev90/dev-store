import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
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
      <div className="absolute inset-0 bg-black/50" />

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
  );
}

import Container from "./Container";
import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="pt-4 md:pt-0 overflow-hidden border-t border-gray-100"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2 lg:gap-10">
          <div className="flex flex-col gap-6 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
              About us
            </h2>

            <div className="space-y-4 text-lg text-neutral-700 leading-relaxed max-w-2xl mx-auto md:mx-0">
              <p>
                A <strong>DevStore</strong> nasceu da necessidade. Como
                desenvolvedores, sempre buscamos o melhor{" "}
                <span className="text-neutral-900 font-medium">
                  hardware para otimizar
                </span>{" "}
                nosso fluxo de trabalho, mas encontrar equipamentos de elite com
                suporte especializado era um desafio.
              </p>
              <p>
                Criamos a loja que nós mesmos gostaríamos de ter. Uma curadoria
                minuciosa de equipamentos de elite,{" "}
                <span className="text-neutral-900 font-medium">
                  projetada por devs, para devs
                </span>
                .
              </p>
              <p className="font-medium text-neutral-800 py-1 ">
                Não vendemos apenas produtos, entregamos desempenho e conforto
                para que você crie o seu melhor código.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative aspect-square w-full  overflow-hidden">
              <Image
                src="/images/about/about.webp"
                alt="Imagem ilustrativa sobre a DevStore mostrando um setup setup minimalista e poderoso"
                fill
                priority
                className="object-contain rounded-[50%]"
                quality={90}
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

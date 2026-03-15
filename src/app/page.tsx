import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { PackageIcon } from "lucide-react";

export default function Home() {
  return (
    <section className="relative flex align-center justify-center direction-col min-h-80vh text-center">
      <div>
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/hero.webp"
            alt="Hero image"
            width={1200}
            height={630}
            className="w-full h-full object-cover object-center block"
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative z-2 text-white max-w-2xl flex direction-col align-center g-4 p-4 rounded">
          <span>DevStore, </span>
          <span> a place for developers.</span>
          <p>Tudo para seu setup!</p>
          <p>Periféricos e acessórios tech com os melhores preços</p>
        </div>
        <div>
          <Link href="/products">
            <Button>
              Explore nossos produtos <PackageIcon size={24} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

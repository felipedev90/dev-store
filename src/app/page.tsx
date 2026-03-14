import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { PackageIcon } from "lucide-react";

export default function Home() {
  return (
    <div>
      <section>
        <div>
          <div className="w-screen">
            <Image
              src="/images/hero.webp"
              alt="Hero image"
              width={1200}
              height={630}
            />
          </div>
          <div />
          <div>
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
    </div>
  );
}

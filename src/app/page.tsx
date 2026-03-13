import Image from "next/image";

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
          <p>test</p>
        </div>
      </section>
    </div>
  );
}

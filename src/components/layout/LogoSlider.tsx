"use client";
import Image from "next/image";

const partners = [
  { name: "Dell", logo: "/images/partners/dell.svg" },
  { name: "Nvidia", logo: "/images/partners/nvidia.svg" }, // Substituiu a Logitech
  { name: "LG", logo: "/images/partners/lg.svg" },
  { name: "Samsung", logo: "/images/partners/samsung.svg" },
  { name: "HP", logo: "/images/partners/hp.svg" },
  { name: "Razer", logo: "/images/partners/razer.svg" },
  { name: "Corsair", logo: "/images/partners/corsair.svg" },
  { name: "Intel", logo: "/images/partners/intel.svg" }, // Adicionado para dar mais volume
];

export default function LogoSlider() {
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section>
      <div className="w-full pt-4 md:pb-10 overflow-hidden border-y border-white/20">
        <div className="relative w-full">
          <div className="flex w-max animate-scroll group">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-none w-40 md:w-60 h-24 flex items-center justify-center px-4 md:px-10"
              >
                <div className="relative h-full w-full max-h-12 lg:grayscale lg:group-hover:grayscale-0 lg:group-hover:opacity-100 transition-all duration-300 cursor-pointer">
                  <Image
                    src={partner.logo}
                    alt={`Logo da ${partner.name}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 160px, 240px"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-40 bg-linear-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-40 bg-linear-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductGalleryProps {
  productName: string;
  images: string[];
}

export default function ProductGallery({
  productName,
  images,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="w-full">
      <div className="relative w-full h-96 mb-4">
        <Image
          src={selectedImage}
          alt={`${productName} - Imagem principal`}
          fill
          className="object-contain rounded-lg shadow-md"
        />
      </div>
      <div className="flex space-x-4 overflow-x-auto">
        {images.map((img, index) => (
          <div
            key={index}
            className={`relative w-20 h-20 shrink-0 rounded-lg cursor-pointer border ${selectedImage === img ? "border-blue-500" : "border-gray-300"}`}
            onClick={() => setSelectedImage(img)}
          >
            <Image
              src={img}
              alt={`${productName} - Imagem ${index + 1}`}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

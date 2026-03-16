"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductFilter() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/products?q=${search}`);
  };

  return (
    <div className="flex flex-col justify-center items-center m-auto gap-4 py-8">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar produtos..."
          className="border rounded-lg px-4 py-1 mx-2"
        />
        <button
          type="submit"
          className="bg-gray-600 text-white border rounded-lg cursor-pointer hover:bg-gray-900 px-4 py-1"
        >
          Buscar
        </button>
      </form>

      <div className="flex gap-2">
        <button
          onClick={() => router.push("/products")}
          className="border border-black rounded-lg cursor-pointer px-4 py-1"
        >
          Todos
        </button>
        <button
          onClick={() => router.push("/products?category=keyboards")}
          className="border border-black rounded-lg cursor-pointer px-4 py-1"
        >
          Teclados
        </button>
        <button
          onClick={() => router.push("/products?category=mice")}
          className="border border-black rounded-lg cursor-pointer px-4 py-1"
        >
          Mouses
        </button>
        <button
          onClick={() => router.push("/products?category=headsets")}
          className="border border-black rounded-lg cursor-pointer   px-4 py-1"
        >
          Headsets
        </button>
        <button
          onClick={() => router.push("/products?category=monitors")}
          className="border border-black rounded-lg cursor-pointer  px-4 py-1"
        >
          Monitores
        </button>
        <button
          onClick={() => router.push("/products?category=accessories")}
          className="border border-black rounded-lg cursor-pointer   px-4 py-1"
        >
          Acessórios
        </button>
      </div>
    </div>
  );
}

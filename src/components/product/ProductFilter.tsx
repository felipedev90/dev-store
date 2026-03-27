"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export default function ProductFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") || ""; // Pega o valor inicial da URL se existir

  const [search, setSearch] = useState(currentQuery);
  const [prevQuery, setPrevQuery] = useState(currentQuery); // Estado para armazenar a última query submetida

  if (currentQuery !== prevQuery) {
    setSearch(currentQuery);
    setPrevQuery(currentQuery);
  }

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    //impede que a tela pule pro topo ao filtrar
    router.push(`/products?${params.toString()}`, { scroll: false });
  }

  function handleCategory(category: string) {
    const param = new URLSearchParams(searchParams.toString());

    if (category) {
      param.set("category", category);
    } else {
      param.delete("category");
    }
    param.delete("q");

    router.push(`/products?${param.toString()}`, { scroll: false });
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const param = new URLSearchParams(searchParams.toString());

    if (search) {
      param.set("q", search);
    } else {
      param.delete("q");
    }
    param.delete("category");

    router.push(`/products?${param.toString()}`, { scroll: false });
  };

  //valores atuais da URL para preencher os <select>
  const currentCategory = searchParams.get("category") || "";
  const currentSort = searchParams.get("sort") || "";

  return (
    <div className="flex flex-col justify-center items-center m-auto gap-4 py-8">
      <div className="flex flex-wrap flex-col justify-center items-center gap-2 w-full max-w-4xl px-4">
        {/* BUSCA */}
        <form
          onSubmit={handleSearch}
          className="flex-1 flex items-center mx-0 my-auto border border-gray-300 rounded-lg px-0 gap-2 w-full md:w-auto"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar produtos..."
            className="w-full md:w-64  rounded-lg px-4 py-2 focus:outline-none "
          />
          <button
            type="submit"
            className="text-gray-700 font-medium rounded-lg cursor-pointer p-2  whitespace-nowrap"
          >
            <Search className="w-6 h-6" />
          </button>
        </form>

        {/* FILTROS E ORDENAÇÃO */}
        <div className="flex flex-col w-full md:w-auto md:flex-row gap-3">
          <select
            // Define qual option deve aparecer selecionado baseado na URL
            value={currentCategory}
            onChange={(e) => handleCategory(e.target.value)}
            className="w-full md:w-auto border border-gray-300 text-gray-700 bg-white rounded-lg cursor-pointer px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="">Todas as categorias</option>
            <option value="keyboards">Teclados</option>
            <option value="mice">Mouses</option>
            <option value="headsets">Headsets</option>
            <option value="monitors">Monitores</option>
            <option value="accessories">Acessórios</option>
          </select>

          <select
            // Define qual option deve aparecer selecionado baseado na URL
            value={currentSort}
            onChange={(e) => updateFilter("sort", e.target.value)}
            className="w-full md:w-auto border border-gray-300 text-gray-700 bg-white rounded-lg cursor-pointer px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="">Ordenar por</option>
            <option value="recent">Mais recentes</option>
            <option value="price-asc">Menor preço</option>
            <option value="price-desc">Maior preço</option>
            <option value="rating">Mais avaliados</option>
          </select>
        </div>
      </div>
    </div>
  );
}

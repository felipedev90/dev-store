import type { MetadataRoute } from "next";
import { getAllProducts, getAllCategories } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dev-store-zeta.vercel.app";

  const products = getAllProducts().map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(product.createdAt),
  }));

  const categories = getAllCategories().map((category) => ({
    url: `${baseUrl}/products?category=${category.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/products`, lastModified: new Date() },
    ...products,
    ...categories,
  ];
}

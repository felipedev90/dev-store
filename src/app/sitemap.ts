import { getAllProducts, getAllCategories } from "@/lib/products";

export default async function sitemap() {
  const baseUrl = "https://dev-store-zeta.vercel.app";

  const productsData = await getAllProducts();

  const products = productsData.map((product) => ({
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

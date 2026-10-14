import type { Metadata } from "next";
import { ProductsView } from "@/app/products/products-view";
import { pageAlternates } from "@/lib/seo";
import { listProducts, productsPageFetchInit } from "@/lib/products-store";

export const metadata: Metadata = {
  title: "产品中心",
  alternates: pageAlternates("/products"),
};

export default async function ProductsPage() {
  const { products } = await listProducts({ init: productsPageFetchInit });
  return <ProductsView products={products} />;
}

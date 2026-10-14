import type { Metadata } from "next";
import { HomeView } from "@/app/home-view";
import { pageAlternates } from "@/lib/seo";
import { listProducts, productsPageFetchInit } from "@/lib/products-store";

export const metadata: Metadata = {
  title: "Activewear OEM/ODM Manufacturer",
  alternates: pageAlternates("/"),
};

export default async function HomePage() {
  const { products } = await listProducts({ init: productsPageFetchInit });
  return <HomeView products={products} />;
}

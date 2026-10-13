import type { Metadata } from "next";
import { HomeView } from "@/app/home-view";
import { listProducts, productsPageFetchInit } from "@/lib/products-store";

export const metadata: Metadata = {
  title: "运动服 OEM/ODM 制造商",
};

export default async function HomePage() {
  const { products } = await listProducts({ init: productsPageFetchInit });
  return <HomeView products={products} />;
}

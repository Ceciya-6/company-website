import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, productsPageFetchInit } from "@/lib/products-store";
import { products as fallbackProducts } from "@/lib/products";
import { ProductDetailView } from "./detail-view";

export const dynamicParams = true;

export function generateStaticParams() {
  return fallbackProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const product = await getProductBySlug((await params).slug, productsPageFetchInit);
  return { title: product?.name ?? "产品详情" };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const product = await getProductBySlug((await params).slug, productsPageFetchInit);

  if (!product) notFound();

  return <ProductDetailView product={product} />;
}

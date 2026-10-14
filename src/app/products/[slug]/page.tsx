import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, productsPageFetchInit } from "@/lib/products-store";
import { pageAlternates } from "@/lib/seo";
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
  const path = `/products/${product?.slug ?? (await params).slug}`;
  return {
    title: product?.name ?? "产品详情",
    // 产品描述优先用后台 Description，空时回退站点默认描述。
    description: product?.alt || undefined,
    alternates: pageAlternates(path),
  };
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

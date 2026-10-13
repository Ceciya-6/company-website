import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Check } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, productsPageFetchInit } from "@/lib/products-store";
import { products as fallbackProducts } from "@/lib/products";

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

  const specs: [string, string][] = [
    ["面料成分及克重", product.fabric],
    ["尺码", product.sizes],
    ["颜色", product.colors],
    ["起订量", product.moq],
    ["打样周期", product.sampleDays],
    ["定制选项", product.customOptions],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]));

  return (
    <main className="bg-brand-secondary px-5 py-10 sm:px-8 sm:py-16 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link href="/products" className="inline-flex min-h-11 items-center gap-2 font-bold text-brand-muted hover:text-brand-accent">
          <ArrowLeft aria-hidden="true" size={18} weight="bold" /> 返回产品中心
        </Link>

        <div className="mt-7 grid gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="relative aspect-square overflow-hidden bg-white">
            <Image
              src={product.image}
              alt={product.alt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm font-bold tracking-[0.18em] text-brand-accent uppercase">YOMEGA · OEM / ODM</p>
            <h1 className="mt-4 text-4xl tracking-tight sm:text-5xl">{product.name}</h1>
            <p className="mt-6 text-base leading-8 text-brand-muted">{product.alt}</p>

            <ul className="mt-7 space-y-3 border-y border-brand-border py-6">
              {product.highlights.map((highlight) => (
                <li key={highlight} className="flex items-center gap-3 font-semibold">
                  <Check aria-hidden="true" size={19} weight="bold" className="shrink-0 text-brand-accent" />
                  {highlight}
                </li>
              ))}
            </ul>

            {specs.length > 0 ? (
              <dl className="mt-6 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
                {specs.map(([label, value]) => (
                  <div key={label} className="flex gap-3">
                    <dt className="w-20 shrink-0 font-bold text-brand-primary">{label}</dt>
                    <dd className="leading-6 text-brand-muted">{value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-6 text-sm leading-6 text-brand-muted">
                面料成分、克重、颜色、尺码、定制方式、样品周期和本款 MOQ 将根据您的项目要求确认。
              </p>
            )}
            <Link
              href={`/contact?source=product&product=${encodeURIComponent(product.name)}#quote-form`}
              className="quote-cta mt-7 w-full sm:w-fit"
            >
              就这款产品询盘 <ArrowRight aria-hidden="true" size={18} weight="bold" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

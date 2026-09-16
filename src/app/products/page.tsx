import type { Metadata } from "next";
import { DownloadSimple } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "产品中心",
};

export default function ProductsPage() {
  return (
    <main className="min-h-[60vh] bg-brand-secondary px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-7 border-b border-brand-border pb-9 sm:flex-row sm:items-end sm:pb-11">
          <div>
            <p className="mb-4 text-sm font-bold tracking-[0.2em] text-brand-muted uppercase">
              YOMEGA
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-brand-primary sm:text-5xl">
              产品中心
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-brand-muted sm:text-lg">
              Explore our latest yoga and activewear styles for OEM/ODM and
              private-label production.
            </p>
          </div>

          <a
            href="/files/catalog-2026.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-sm bg-brand-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-accent sm:w-auto"
          >
            <DownloadSimple aria-hidden="true" size={20} weight="bold" />
            Download Product Catalog
          </a>
        </div>

        <section
          className="grid gap-6 py-9 sm:grid-cols-2 sm:gap-8 sm:py-12"
          aria-label="Product collection"
        >
          {products.map((product, index) => (
            <article
              key={product.image}
              className="overflow-hidden rounded-sm border border-brand-border bg-brand-card transition-colors hover:border-brand-accent"
            >
              <Link href={`/products/${product.slug}`} className="group block">
                <div className="relative aspect-square overflow-hidden bg-white">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    loading={index === 0 ? "eager" : "lazy"}
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </Link>
              <div className="p-5 sm:p-6">
                <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                  <Link href={`/products/${product.slug}`} className="hover:text-brand-accent">{product.name}</Link>
                </h2>
                <p className="mt-3 text-base leading-7 text-brand-muted">
                  {product.alt}
                </p>
                <Link href={`/products/${product.slug}`} className="mt-5 inline-flex min-h-11 items-center font-bold text-brand-primary hover:text-brand-accent">
                  View product details →
                </Link>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

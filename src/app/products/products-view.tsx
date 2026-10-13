"use client";

import { DownloadSimple } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import type { Product } from "@/lib/products";

export function ProductsView({ products }: { products: Product[] }) {
  const { t } = useI18n();

  return (
    <main className="min-h-[60vh] bg-brand-secondary px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-7 border-b border-brand-border pb-9 sm:flex-row sm:items-end sm:pb-11">
          <div>
            <p className="mb-4 text-sm font-bold tracking-[0.2em] text-brand-muted uppercase">
              {t("products.eyebrow")}
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-brand-primary sm:text-5xl">
              {t("products.title")}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-brand-muted sm:text-lg">
              {t("products.subtitle")}
            </p>
          </div>

          <a
            href="/files/catalog-2026.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-sm bg-brand-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-accent sm:w-auto"
          >
            <DownloadSimple aria-hidden="true" size={20} weight="bold" />
            {t("products.catalog")}
          </a>
        </div>

        <section
          className="grid gap-6 py-9 sm:grid-cols-2 sm:gap-8 sm:py-12"
          aria-label="Products"
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
                  {t("products.viewDetails")}
                </Link>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

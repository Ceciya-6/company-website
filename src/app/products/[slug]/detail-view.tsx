"use client";

import { ArrowLeft, ArrowRight, Check } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import type { Product } from "@/lib/products";

export function ProductDetailView({ product }: { product: Product }) {
  const { t } = useI18n();

  const specs: [string, string][] = [
    [t("detail.specFabric"), product.fabric],
    [t("detail.specSizes"), product.sizes],
    [t("detail.specColors"), product.colors],
    [t("detail.specMoq"), product.moq],
    [t("detail.specSample"), product.sampleDays],
    [t("detail.specCustom"), product.customOptions],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]));

  return (
    <main className="bg-brand-secondary px-5 py-10 sm:px-8 sm:py-16 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link href="/products" className="inline-flex min-h-11 items-center gap-2 font-bold text-brand-muted hover:text-brand-accent">
          <ArrowLeft aria-hidden="true" size={18} weight="bold" /> {t("detail.back")}
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
            <p className="text-sm font-bold tracking-[0.18em] text-brand-accent uppercase">{t("detail.eyebrow")}</p>
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

            {product.colorVariants && product.colorVariants.length > 0 ? (
              <div className="mt-6">
                <h2 className="text-sm font-bold tracking-[0.14em] text-brand-primary uppercase">
                  {t("detail.colorsTitle")}
                </h2>
                <ul className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4">
                  {product.colorVariants.map((color) => (
                    <li key={color.id} className="min-w-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={color.image}
                        alt={`${product.name} · ${color.name}`}
                        loading="lazy"
                        className="aspect-square w-full border border-brand-border bg-white object-cover"
                      />
                      <p className="mt-1.5 truncate text-center text-xs leading-5 text-brand-muted">
                        {color.name}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {specs.length > 0 ? (
              <dl className="mt-6 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
                {specs.map(([label, value]) => (
                  <div key={label} className="flex gap-3">
                    <dt className="w-24 shrink-0 font-bold text-brand-primary">{label}</dt>
                    <dd className="leading-6 text-brand-muted">{value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-6 text-sm leading-6 text-brand-muted">
                {t("detail.fallback")}
              </p>
            )}
            <Link
              href={`/contact?source=product&product=${encodeURIComponent(product.name)}#quote-form`}
              className="quote-cta mt-7 w-full sm:w-fit"
            >
              {t("detail.cta")} <ArrowRight aria-hidden="true" size={18} weight="bold" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import {
  ArrowRight,
  CheckCircle,
  ClipboardText,
  Package,
  PaintBrush,
  ShieldCheck,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { HeroVideo } from "@/components/hero-video";
import { useI18n } from "@/lib/i18n";
import type { Product } from "@/lib/products";

export function HomeView({ products }: { products: Product[] }) {
  const { t } = useI18n();

  const trustItems = [
    { value: "9+", label: t("home.trustExperience") },
    { value: "300+", label: t("home.trustStyles") },
    { value: t("home.trustSamplingValue"), label: t("home.trustSampling") },
    { value: t("home.trustMoqValue"), label: t("home.trustMoq") },
  ];

  const advantages = [
    { icon: Package, title: t("home.adv1Title"), text: t("home.adv1Text") },
    { icon: PaintBrush, title: t("home.adv2Title"), text: t("home.adv2Text") },
    { icon: ClipboardText, title: t("home.adv3Title"), text: t("home.adv3Text") },
    { icon: ShieldCheck, title: t("home.adv4Title"), text: t("home.adv4Text") },
  ];

  const featured = products.filter((product) => product.featured);
  const displayProducts = (featured.length > 0 ? featured : products).slice(0, 12);

  return (
    <main className="overflow-hidden bg-brand-secondary">
      <section className="relative min-h-[calc(100svh-68px)] bg-brand-primary text-white sm:min-h-[calc(100svh-76px)]">
        <HeroVideo />

        <div className="relative mx-auto flex min-h-[calc(100svh-68px)] max-w-7xl items-end px-5 pt-7 pb-10 sm:min-h-[calc(100svh-76px)] sm:px-8 sm:pt-10 sm:pb-14 lg:px-10 lg:pb-20">
          <div className="max-w-3xl [text-shadow:0_2px_14px_rgba(0,0,0,0.9)]">
            <p className="text-xs font-bold tracking-[0.18em] text-white uppercase sm:text-sm sm:tracking-[0.24em]">
              {t("home.heroEyebrow")}
            </p>
            <h1 className="mt-4 max-w-3xl text-[clamp(2.45rem,7vw,5.8rem)] leading-[0.96] font-bold tracking-[-0.055em] text-white">
              {t("home.heroTitleA")} <span className="text-brand-accent italic">{t("home.heroTitleB")}</span> {t("home.heroTitleC")}
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-6 text-white sm:text-lg sm:leading-8">
              {t("home.heroSubtitle")}
            </p>
            <div className="mt-6 flex flex-col gap-3 min-[420px]:flex-row sm:mt-8">
              <Link
                href="/contact?source=home-hero#quote-form"
                className="quote-cta w-full min-[420px]:w-auto"
              >
                {t("common.getQuote")} <ArrowRight aria-hidden="true" size={18} weight="bold" />
              </Link>
              <Link
                href="/products"
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/50 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white hover:text-brand-primary"
              >
                {t("common.browseProducts")} <ArrowRight aria-hidden="true" size={18} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black text-white" aria-label="YOMEGA">
        <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <div
              key={item.label}
              className="border-r border-b border-white/10 px-5 py-6 last:border-r-0 even:border-r-0 lg:border-b-0 lg:even:border-r"
            >
              <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {item.value}
              </p>
              <p className="mt-2 text-xs font-bold tracking-[0.12em] text-brand-accent uppercase sm:text-sm">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-primary px-5 py-16 text-white sm:px-8 sm:py-24 lg:px-10" aria-labelledby="advantages">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold tracking-[0.18em] text-brand-accent uppercase">{t("home.advEyebrow")}</p>
          <h2 id="advantages" className="mt-3 max-w-3xl text-4xl tracking-tight text-white sm:text-5xl">
            {t("home.advTitle")}
          </h2>
          <div className="mt-10 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="bg-brand-primary p-6 sm:p-7">
                  <Icon aria-hidden="true" size={30} weight="regular" className="text-brand-accent" />
                  <h3 className="mt-6 text-xl text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-10" aria-labelledby="featured-products">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold tracking-[0.18em] text-brand-accent uppercase">{t("home.prodEyebrow")}</p>
              <h2 id="featured-products" className="mt-3 text-4xl tracking-tight sm:text-5xl">{t("home.prodTitle")}</h2>
            </div>
            <Link href="/products" className="inline-flex items-center gap-2 font-bold hover:text-brand-accent">
              {t("home.prodAll")} <ArrowRight aria-hidden="true" size={18} weight="bold" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-8">
            {displayProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group overflow-hidden border border-brand-border bg-brand-card"
              >
                <div className="relative aspect-square overflow-hidden bg-white">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                  />
                </div>
                <div className="flex items-center justify-between gap-4 p-5 sm:p-6">
                  <div>
                    <p className="text-xs font-bold tracking-[0.14em] text-brand-accent uppercase">OEM / ODM</p>
                    <h3 className="mt-2 text-xl tracking-tight sm:text-2xl">{product.name}</h3>
                  </div>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-brand-border transition-colors group-hover:border-brand-accent group-hover:bg-brand-accent group-hover:text-white">
                    <ArrowRight aria-hidden="true" size={20} weight="bold" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-10" aria-labelledby="next-step">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-3">
            <Link href="/faq" className="group border border-brand-border bg-brand-card p-7 transition-colors hover:border-brand-accent">
              <p className="text-sm font-bold text-brand-accent">{t("home.step1Eyebrow")}</p>
              <h3 className="mt-7 text-2xl">{t("home.step1Title")}</h3>
              <p className="mt-3 leading-7 text-brand-muted">{t("home.step1Text")}</p>
              <span className="mt-7 inline-flex items-center gap-2 font-bold group-hover:text-brand-accent">{t("home.step1Link")} <ArrowRight aria-hidden="true" size={18} weight="bold" /></span>
            </Link>
            <Link href="/about" className="group border border-brand-border bg-brand-card p-7 transition-colors hover:border-brand-accent">
              <p className="text-sm font-bold text-brand-accent">{t("home.step2Eyebrow")}</p>
              <h3 className="mt-7 text-2xl">{t("home.step2Title")}</h3>
              <p className="mt-3 leading-7 text-brand-muted">{t("home.step2Text")}</p>
              <span className="mt-7 inline-flex items-center gap-2 font-bold group-hover:text-brand-accent">{t("home.step2Link")} <ArrowRight aria-hidden="true" size={18} weight="bold" /></span>
            </Link>
            <div className="bg-brand-primary p-7 text-white">
              <p className="text-sm font-bold text-white/70">{t("home.step3Eyebrow")}</p>
              <h2 id="next-step" className="mt-7 text-2xl text-white">{t("home.step3Title")}</h2>
              <p className="mt-3 leading-7 text-white/80">{t("home.step3Text")}</p>
              <Link href="/contact?source=home-case#quote-form" className="quote-cta mt-7">
                {t("home.step3Link")} <ArrowRight aria-hidden="true" size={18} weight="bold" />
              </Link>
            </div>
          </div>
          <div className="mt-10 flex items-start gap-3 border-t border-brand-border pt-8 text-sm leading-6 text-brand-muted">
            <CheckCircle aria-hidden="true" size={21} weight="fill" className="mt-0.5 shrink-0 text-brand-accent" />
            <p>{t("home.note")}</p>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import { ArrowRight, Package, PaintBrush, ShieldCheck } from "@phosphor-icons/react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export function CasesView() {
  const { t } = useI18n();

  const cases = [
    {
      icon: Package,
      eyebrow: t("cases.case1Eyebrow"),
      title: t("cases.case1Title"),
      description: t("cases.case1Text"),
    },
    {
      icon: PaintBrush,
      eyebrow: t("cases.case2Eyebrow"),
      title: t("cases.case2Title"),
      description: t("cases.case2Text"),
    },
    {
      icon: ShieldCheck,
      eyebrow: t("cases.case3Eyebrow"),
      title: t("cases.case3Title"),
      description: t("cases.case3Text"),
    },
  ];

  return (
    <main className="min-h-[60vh] bg-brand-secondary px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="max-w-3xl border-b border-brand-border pb-9 sm:pb-12">
          <p className="text-sm font-bold tracking-[0.2em] text-brand-accent uppercase">
            {t("cases.eyebrow")}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {t("cases.title")}
          </h1>
          <p className="mt-5 text-base leading-8 text-brand-muted sm:text-lg">
            {t("cases.intro")}
          </p>
        </header>

        <section className="grid gap-px bg-brand-border py-px sm:grid-cols-3" aria-label={t("cases.ariaLabel")}>
          {cases.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className="bg-brand-card p-7 sm:p-8">
                <Icon aria-hidden="true" size={32} weight="regular" className="text-brand-accent" />
                <p className="mt-8 text-xs font-bold tracking-[0.16em] text-brand-accent uppercase">
                  {item.eyebrow}
                </p>
                <h2 className="mt-3 text-2xl tracking-tight">{item.title}</h2>
                <p className="mt-4 leading-7 text-brand-muted">{item.description}</p>
              </article>
            );
          })}
        </section>

        <section className="mt-12 flex flex-col items-start justify-between gap-6 bg-brand-primary p-7 text-white sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="text-2xl text-white sm:text-3xl">{t("cases.ctaTitle")}</h2>
            <p className="mt-3 max-w-2xl leading-7 text-white/70">
              {t("cases.ctaText")}
            </p>
          </div>
          <Link href="/contact?source=cases#quote-form" className="quote-cta shrink-0">
            {t("cases.ctaButton")} <ArrowRight aria-hidden="true" size={18} weight="bold" />
          </Link>
        </section>
      </div>
    </main>
  );
}

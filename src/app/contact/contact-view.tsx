"use client";

import {
  AirplaneTilt,
  ArrowRight,
  Certificate,
  CheckCircle,
  ClockCountdown,
  EnvelopeSimple,
  Package,
  ShieldCheck,
  Truck,
  WhatsappLogo,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { QuoteForm } from "@/components/quote-form";

export function ContactView({
  productName,
  source,
}: {
  productName: string;
  source: string;
}) {
  const { t, ta } = useI18n();

  const trustSections = [
    {
      number: "01",
      eyebrow: "CERTIFICATION",
      title: t("contact.s1Title"),
      icon: Certificate,
      items: ta("contact.s1Items"),
    },
    {
      number: "02",
      eyebrow: "PACKAGING",
      title: t("contact.s2Title"),
      icon: Package,
      items: ta("contact.s2Items"),
    },
    {
      number: "03",
      eyebrow: "LOGISTICS",
      title: t("contact.s3Title"),
      icon: Truck,
      items: ta("contact.s3Items"),
    },
    {
      number: "04",
      eyebrow: "TRADE TERMS",
      title: t("contact.s4Title"),
      icon: ShieldCheck,
      items: ta("contact.s4Items"),
    },
    {
      number: "05",
      eyebrow: "RESPONSE",
      title: t("contact.s5Title"),
      icon: ClockCountdown,
      items: ta("contact.s5Items"),
    },
  ];

  return (
    <main className="bg-brand-secondary">
      <section className="border-b border-brand-border" aria-labelledby="quote-title">
        <div className="mx-auto grid w-full max-w-[1536px] lg:min-h-[850px] lg:grid-cols-[minmax(0,1.05fr)_minmax(560px,0.95fr)]">
          <div className="flex min-w-0 flex-col justify-between px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-16">
            <div className="max-w-3xl">
              <p className="flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-brand-muted uppercase sm:text-sm">
                <span className="text-brand-accent">◆</span> {t("contact.eyebrow")}
              </p>
              <h1
                id="quote-title"
                className="mt-8 max-w-[820px] text-[clamp(3.35rem,7vw,7.7rem)] leading-[0.88] font-medium tracking-[-0.065em]"
              >
                {t("contact.titleA")}
                <span className="block text-brand-accent">{t("contact.titleB")}</span>
              </h1>
              <p className="mt-10 max-w-2xl text-lg leading-9 text-brand-muted sm:text-xl sm:leading-10">
                {t("contact.intro")}
              </p>
              <ul className="mt-10 space-y-4 text-base leading-7 text-brand-muted sm:text-lg">
                <li className="flex gap-3"><CheckCircle className="mt-1 shrink-0 text-brand-accent" size={20} weight="fill" />{t("contact.check1")}</li>
                <li className="flex gap-3"><CheckCircle className="mt-1 shrink-0 text-brand-accent" size={20} weight="fill" />{t("contact.check2")}</li>
                <li className="flex gap-3"><CheckCircle className="mt-1 shrink-0 text-brand-accent" size={20} weight="fill" />{t("contact.check3")}</li>
              </ul>

              <Link
                href="https://xmmega-catalog.com/ceciya"
                target="_blank"
                rel="noreferrer"
                className="mt-10 inline-flex min-h-20 w-full max-w-xl items-center justify-between gap-5 bg-brand-primary px-6 py-5 text-white transition-colors hover:bg-brand-accent sm:px-8"
              >
                <span>
                  <span className="block font-bold">{t("contact.catalogTitle")}</span>
                  <span className="mt-1 block text-sm text-white/60">{t("contact.catalogSub")}</span>
                </span>
                <ArrowRight aria-hidden="true" size={23} weight="bold" />
              </Link>
            </div>

            <div className="mt-14 grid gap-6 border-t border-brand-border pt-8 sm:grid-cols-2 lg:mt-20">
              <div>
                <p className="text-xs font-bold tracking-[0.16em] text-brand-accent uppercase">{t("contact.emailLabel")}</p>
                <a href="mailto:Ceciya@xmmega.com" className="mt-2 inline-flex items-center gap-2 font-bold hover:text-brand-accent">
                  <EnvelopeSimple aria-hidden="true" size={20} /> Ceciya@xmmega.com
                </a>
              </div>
              <div>
                <p className="text-xs font-bold tracking-[0.16em] text-brand-accent uppercase">{t("contact.whatsappLabel")}</p>
                <a href="https://wa.me/8615396238862" target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-2 font-bold hover:text-brand-accent">
                  <WhatsappLogo aria-hidden="true" size={20} /> +86 153 9623 8862
                </a>
              </div>
            </div>
          </div>

          <div id="quote-form" className="min-w-0 scroll-mt-24 border-t border-brand-border bg-white p-4 sm:p-8 lg:border-t-0 lg:border-l lg:p-10 xl:p-14">
            <QuoteForm productName={productName} source={source} />
          </div>
        </div>
      </section>

      <section className="bg-brand-primary px-5 py-16 text-white sm:px-8 sm:py-24 lg:px-10" aria-labelledby="trust-title">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold tracking-[0.2em] text-brand-accent uppercase">{t("contact.trustEyebrow")}</p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <h2 id="trust-title" className="text-4xl tracking-tight text-white sm:text-6xl">{t("contact.trustTitle")}</h2>
            <p className="max-w-2xl text-base leading-8 text-white/60 lg:justify-self-end">
              {t("contact.trustIntro")}
            </p>
          </div>

          <div className="mt-12 border-t border-white/15">
            {trustSections.map((section) => {
              const Icon = section.icon;
              return (
                <article key={section.number} className="grid gap-6 border-b border-white/15 py-9 sm:grid-cols-[96px_220px_1fr] sm:gap-8 sm:py-11">
                  <p className="text-sm font-bold tracking-[0.16em] text-brand-accent">{section.number}</p>
                  <div>
                    <Icon aria-hidden="true" size={30} className="text-brand-accent" />
                    <p className="mt-5 text-xs font-bold tracking-[0.15em] text-white/45">{section.eyebrow}</p>
                    <h3 className="mt-2 text-2xl text-white">{section.title}</h3>
                  </div>
                  <ul className="grid gap-4 text-sm leading-7 text-white/70 lg:grid-cols-2 lg:gap-x-10">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2.5 size-1.5 shrink-0 bg-brand-accent" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          <div className="mt-10 flex items-start gap-4 border border-white/15 p-5 text-sm leading-7 text-white/60 sm:p-6">
            <AirplaneTilt aria-hidden="true" size={24} className="mt-0.5 shrink-0 text-brand-accent" />
            <p>{t("contact.logisticsNote")}</p>
          </div>
        </div>
      </section>
    </main>
  );
}

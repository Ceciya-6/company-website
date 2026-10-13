"use client";

import { ArrowRight, MagnifyingGlass, X } from "@phosphor-icons/react";
import Link from "next/link";
import { Fragment, type ReactNode, useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { faqCategories } from "@/lib/faqs";

function Highlight({ text, query }: { text: string; query: string }) {
  const term = query.trim();
  if (!term) return text;

  const pattern = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(pattern);

  return parts.map((part, index): ReactNode =>
    part.toLocaleLowerCase() === term.toLocaleLowerCase() ? (
      <mark key={`${part}-${index}`} className="bg-brand-accent px-0.5 text-white">
        {part}
      </mark>
    ) : (
      <Fragment key={`${part}-${index}`}>{part}</Fragment>
    ),
  );
}

export function FaqExplorer() {
  const [query, setQuery] = useState("");
  const { t, lang } = useI18n();
  const normalizedQuery = query.trim().toLocaleLowerCase();

  const filteredCategories = useMemo(
    () =>
      faqCategories
        .map((category) => {
          if (!normalizedQuery) return category;

          const categoryMatches = `${category.title} ${category.description}`
            .toLocaleLowerCase()
            .includes(normalizedQuery);
          const items = category.items.filter(
            (item) =>
              categoryMatches ||
              `${item.question} ${item.answer}`
                .toLocaleLowerCase()
                .includes(normalizedQuery),
          );

          return { ...category, items };
        })
        .filter((category) => category.items.length > 0),
    [normalizedQuery],
  );

  const resultCount = filteredCategories.reduce(
    (total, category) => total + category.items.length,
    0,
  );

  return (
    <main className="bg-brand-secondary">
      <section className="border-b border-brand-border px-5 pt-14 sm:px-8 sm:pt-20 lg:px-10" aria-labelledby="faq-title">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold tracking-[0.2em] text-brand-accent uppercase sm:text-sm">
            {t("faq.eyebrow")}
          </p>
          <h1 id="faq-title" className="mt-5 text-[clamp(3.4rem,8vw,7.5rem)] leading-[0.9] font-medium tracking-[-0.06em]">
            {t("faq.title")}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-brand-muted sm:text-xl sm:leading-9">
            {t("faq.subtitle")}
          </p>
          {lang === "en" && t("faq.contentNote") && (
            <p className="mt-4 max-w-3xl border border-brand-border bg-brand-card px-4 py-3 text-sm leading-6 text-brand-muted">
              {t("faq.contentNote")}
            </p>
          )}

          <div className="mt-10 flex max-w-4xl border border-brand-border bg-white focus-within:border-brand-primary sm:mt-12">
            <span className="flex w-14 shrink-0 items-center justify-center text-brand-muted sm:w-16">
              <MagnifyingGlass aria-hidden="true" size={23} />
            </span>
            <label htmlFor="faq-search" className="sr-only">{t("faq.searchLabel")}</label>
            <input
              id="faq-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("faq.searchPlaceholder")}
              className="min-h-16 min-w-0 flex-1 bg-white pr-3 text-base outline-none placeholder:text-brand-muted/65 [&::-webkit-search-cancel-button]:hidden sm:min-h-[72px] sm:text-lg"
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => setQuery("")}
              className={`flex w-14 shrink-0 items-center justify-center border-l border-brand-border transition-colors sm:w-16 ${
                query ? "text-brand-primary hover:bg-brand-accent hover:text-white" : "cursor-default text-brand-muted/30"
              }`}
              aria-label={t("faq.clearAria")}
              disabled={!query}
            >
              <X aria-hidden="true" size={21} weight="bold" />
            </button>
          </div>

          <p className="mt-4 text-sm text-brand-muted" aria-live="polite">
            {normalizedQuery
              ? t("faq.resultCount", { count: resultCount, topics: filteredCategories.length })
              : t("faq.totalCount", { count: resultCount, topics: faqCategories.length })}
          </p>
        </div>

        <div className="sticky top-[68px] z-30 mt-8 border-t border-brand-border bg-brand-secondary/95 backdrop-blur-sm sm:top-[76px]">
          <nav className="mx-auto flex max-w-7xl gap-7 overflow-x-auto py-4 [scrollbar-width:thin]" aria-label={t("faq.navLabel")}>
            {(normalizedQuery ? filteredCategories : faqCategories).map((category) => (
              <a key={category.number} href={`#faq-category-${category.number}`} className="shrink-0 text-sm font-bold text-brand-muted transition-colors hover:text-brand-accent">
                <span className="mr-2 text-brand-accent">{category.number}</span>
                {category.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28 lg:px-10">
        {filteredCategories.length ? (
          filteredCategories.map((category) => (
            <section key={category.number} id={`faq-category-${category.number}`} className="scroll-mt-36 border-b border-brand-border py-16 sm:py-24" aria-labelledby={`faq-heading-${category.number}`}>
              <div className="grid gap-5 sm:grid-cols-[120px_1fr] sm:gap-8">
                <p className="text-sm font-bold tracking-[0.16em] text-brand-muted">{category.number}</p>
                <div>
                  <h2 id={`faq-heading-${category.number}`} className="text-3xl tracking-tight sm:text-5xl">
                    <Highlight text={category.title} query={query} />
                  </h2>
                  <p className="mt-3 max-w-3xl text-base italic leading-7 text-brand-muted sm:text-lg">
                    <Highlight text={category.description} query={query} />
                  </p>
                </div>
              </div>

              <div className="mt-9 grid gap-px bg-brand-border sm:ml-[152px] sm:grid-cols-2">
                {category.items.map((item) => (
                  <article key={item.question} className="bg-white p-6 sm:p-8">
                    <h3 className="text-lg leading-7 sm:text-xl sm:leading-8">
                      <Highlight text={item.question} query={query} />
                    </h3>
                    <p className="mt-4 text-[15px] leading-7 text-brand-muted sm:text-base sm:leading-8">
                      <Highlight text={item.answer} query={query} />
                    </p>
                  </article>
                ))}
              </div>
            </section>
          ))
        ) : (
          <section className="py-24 text-center" aria-live="polite">
            <MagnifyingGlass aria-hidden="true" size={42} className="mx-auto text-brand-accent" />
            <h2 className="mt-6 text-3xl">{t("faq.noResultsTitle")}</h2>
            <p className="mt-3 text-brand-muted">{t("faq.noResultsText")}</p>
            <button type="button" onClick={() => setQuery("")} className="mt-7 min-h-12 bg-brand-primary px-6 py-3 font-bold text-white transition-colors hover:bg-brand-accent">
              {t("faq.noResultsBtn")}
            </button>
          </section>
        )}

        <section className="mt-16 grid gap-6 bg-brand-primary p-7 text-white sm:grid-cols-[1fr_auto] sm:items-center sm:p-10">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-brand-accent uppercase">{t("faq.ctaEyebrow")}</p>
            <h2 className="mt-3 text-3xl text-white sm:text-4xl">{t("faq.ctaTitle")}</h2>
            <p className="mt-3 max-w-2xl leading-7 text-white/65">{t("faq.ctaText")}</p>
          </div>
          <Link href="/contact?source=faq#quote-form" className="quote-cta">
            {t("common.getQuote")} <ArrowRight aria-hidden="true" size={19} weight="bold" />
          </Link>
        </section>
      </div>
    </main>
  );
}

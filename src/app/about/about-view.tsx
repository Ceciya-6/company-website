"use client";

import { CurrencyDollarSimple, Factory, Lightbulb } from "@phosphor-icons/react";
import { useI18n } from "@/lib/i18n";

export function AboutView() {
  const { t } = useI18n();

  const sections = [
    {
      title: t("about.whoTitle"),
      introduction: t("about.whoIntro"),
      details: [t("about.who1"), t("about.who2"), t("about.who3"), t("about.who4")],
    },
    {
      title: t("about.whatTitle"),
      introduction: t("about.whatIntro"),
      details: [
        t("about.what1"),
        t("about.what2"),
        t("about.what3"),
        t("about.what4"),
        t("about.what5"),
        t("about.what6"),
        t("about.what7"),
      ],
    },
  ];

  const advantages = [
    {
      title: t("about.why1Title"),
      description: t("about.why1Text"),
      icon: CurrencyDollarSimple,
    },
    {
      title: t("about.why2Title"),
      description: t("about.why2Text"),
      icon: Factory,
    },
    {
      title: t("about.why3Title"),
      description: (
        <>
          {t("about.why3Text", {
            days: (
              <strong className="font-bold text-brand-primary">{t("about.why3Days")}</strong>
            ),
          })}
        </>
      ),
      icon: Lightbulb,
    },
  ];

  return (
    <main className="min-h-screen bg-brand-secondary px-5 py-14 text-brand-primary sm:px-8 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <header className="border-b border-brand-border pb-8 sm:pb-10">
          <p className="mb-3 text-sm font-bold tracking-[0.22em] text-brand-muted uppercase">
            YOMEGA
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t("about.title")}
          </h1>
        </header>

        <div className="divide-y divide-brand-border">
          {sections.map((section) => (
            <section
              key={section.title}
              className="grid gap-5 py-9 sm:grid-cols-[180px_1fr] sm:gap-10 sm:py-12"
            >
              <h2 className="text-2xl font-bold tracking-tight">
                {section.title}
              </h2>

              <div>
                <p className="text-base leading-8 text-brand-muted sm:text-lg">
                  {section.introduction}
                </p>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-brand-muted sm:text-base">
                  {section.details.map((detail) => (
                    <li key={detail} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[0.7rem] size-1.5 shrink-0 rounded-full bg-brand-primary"
                      />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}

          <section className="grid gap-5 py-9 sm:grid-cols-[180px_1fr] sm:gap-10 sm:py-12">
            <h2 className="text-2xl font-bold tracking-tight">
              {t("about.whyTitle")}
            </h2>

            <ul className="space-y-4">
              {advantages.map((advantage) => (
                <li
                  key={advantage.title}
                  className="flex gap-4 rounded-sm border border-brand-border bg-brand-card p-5 transition-colors hover:border-brand-accent sm:p-6"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-secondary text-brand-primary">
                    <advantage.icon aria-hidden="true" size={22} weight="regular" />
                  </span>
                  <div>
                    <h3 className="font-bold text-brand-primary sm:text-lg">
                      {advantage.title}
                    </h3>
                    <p className="mt-1 text-sm leading-7 text-brand-muted sm:text-base">
                      {advantage.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}

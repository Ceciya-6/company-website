"use client";

import { useI18n } from "@/lib/i18n";

/** 中英语言切换：跟随 i18n 上下文的当前语言显示另一个选项。 */
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useI18n();
  const next = lang === "zh" ? "en" : "zh";
  const label = lang === "zh" ? "EN" : "中文";

  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      aria-label={lang === "zh" ? "Switch to English" : "切换为中文"}
      className={`inline-flex min-h-9 items-center rounded-sm border border-white/35 px-2.5 text-xs font-bold tracking-wide text-white/80 transition-colors hover:border-brand-accent hover:bg-brand-accent hover:text-white ${className}`}
    >
      {label}
    </button>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const { t } = useI18n();

  return (
    <footer className="border-t border-white/10 bg-brand-primary text-white/70">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12 lg:px-10">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-start">
          <div className="max-w-2xl">
            <Link
              href="/"
              className="inline-flex transition-opacity hover:opacity-80"
              aria-label={t("footer.homeAria")}
            >
              <Image
                src="/images/logo-yomega.png"
                alt="YOMEGA"
                width={2170}
                height={725}
                loading="eager"
                className="h-auto w-[168px] brightness-0 invert sm:w-[184px]"
              />
            </Link>
            <p className="mt-5 max-w-xl text-base leading-7">
              Xiamen Mega Garment Co., Ltd.
            </p>
            <p className="mt-2 max-w-xl text-base leading-7">
              {t("footer.blurb")}
            </p>
          </div>

          <div className="shrink-0 md:text-right">
            <p className="text-xs font-semibold tracking-[0.16em] text-white/45 uppercase">
              {t("footer.contact")}
            </p>
            <div className="mt-2 flex flex-col items-start gap-2 md:items-end">
              <a
                href="mailto:Ceciya@xmmega.com"
                className="font-semibold text-white transition-colors hover:text-brand-accent"
              >
                Ceciya@xmmega.com
              </a>
              <a
                href="https://wa.me/8615396238862"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-white transition-colors hover:text-brand-accent"
                aria-label="WhatsApp: +86 15396238862"
              >
                WhatsApp: +86 15396238862
              </a>
            </div>
          </div>
        </div>

        <div className="mt-9 border-t border-white/10 pt-5 text-xs text-white/45">
          © {currentYear} Xiamen Mega Garment Co., Ltd. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}

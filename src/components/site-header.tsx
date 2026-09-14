"use client";

import { List, X } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { label: "首页", href: "/" },
  { label: "关于我们", href: "/about" },
  { label: "产品中心", href: "/products" },
  { label: "常见问题", href: "/faq" },
  { label: "联系我们", href: "/contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-primary text-white shadow-[0_1px_0_rgba(255,255,255,0.06)]">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 sm:h-[76px] sm:px-8 lg:px-10">
        <Link
          href="/"
          className="flex shrink-0 items-center transition-opacity hover:opacity-80"
          aria-label="YOUMEGA 首页"
        >
          <Image
            src="/logo.png"
            alt="YOUMEGA"
            width={1465}
            height={285}
            priority
            className="h-auto w-[138px] brightness-0 invert sm:w-[164px]"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="主导航">
          {navigation.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-sm px-4 py-2.5 text-sm font-semibold transition-colors ${
                  item.href === "/contact"
                    ? "ml-2 bg-brand-accent text-white hover:bg-white hover:text-brand-primary"
                    : isActive
                      ? "bg-white/10 text-white"
                      : "text-white/72 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="flex size-11 shrink-0 items-center justify-center rounded-sm border border-white/35 text-white transition-colors hover:border-brand-accent hover:bg-brand-accent md:hidden"
          aria-label={isMenuOpen ? "关闭导航菜单" : "打开导航菜单"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? (
            <X aria-hidden="true" size={24} weight="regular" />
          ) : (
            <List aria-hidden="true" size={26} weight="regular" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="移动端主导航"
          className="border-t border-white/10 bg-brand-primary md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col px-5 py-3 sm:px-8">
            {navigation.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`min-h-12 border-b border-white/10 px-2 py-3.5 text-base font-semibold last:border-b-0 ${
                    item.href === "/contact"
                      ? "my-2 flex items-center justify-center rounded-sm border-b-0 bg-brand-accent text-white"
                      : isActive
                        ? "text-white"
                        : "text-white/70 hover:text-brand-accent"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}

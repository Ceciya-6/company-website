"use client";

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
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[#f7f2e8]/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="text-xl font-bold tracking-[0.16em] text-stone-900 transition-colors hover:text-orange-600"
          aria-label="YOUMEGA 首页"
        >
          YOUMEGA
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="主导航">
          {navigation.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-2 text-sm font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:bg-orange-600 after:transition-transform ${
                  isActive
                    ? "text-orange-600 after:scale-x-100"
                    : "text-stone-700 after:scale-x-0 hover:text-orange-600 hover:after:scale-x-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-full border border-stone-300 text-stone-800 transition-colors hover:border-orange-500 hover:text-orange-600 md:hidden"
          aria-label={isMenuOpen ? "关闭导航菜单" : "打开导航菜单"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="size-5"
          >
            {isMenuOpen ? (
              <>
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </>
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      <nav
        id="mobile-navigation"
        aria-label="移动端主导航"
        className={`overflow-hidden border-t border-stone-200 bg-[#f7f2e8] transition-[max-height,opacity] duration-300 md:hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
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
                className={`border-b border-stone-200/80 px-1 py-3.5 text-sm font-medium last:border-b-0 ${
                  isActive ? "text-orange-600" : "text-stone-700"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

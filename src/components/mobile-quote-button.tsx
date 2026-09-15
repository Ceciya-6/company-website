"use client";

import { ChatCircleDots } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileQuoteButton() {
  const pathname = usePathname();

  if (pathname.startsWith("/contact")) return null;

  return (
    <Link
      href="/contact?source=mobile#quote-form"
      className="quote-fab fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex size-14 items-center justify-center rounded-full border border-white/30 bg-brand-accent text-white transition-colors hover:bg-brand-primary md:hidden"
      aria-label="打开获取报价表单"
    >
      <ChatCircleDots aria-hidden="true" size={27} weight="bold" />
    </Link>
  );
}

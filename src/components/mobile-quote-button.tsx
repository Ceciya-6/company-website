"use client";

import { WhatsappLogo } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";

const whatsappMessage =
  "Hello YOMEGA, I would like to request a quotation for activewear OEM/ODM. Please contact me.";
const whatsappHref = `https://wa.me/8615396238862?text=${encodeURIComponent(whatsappMessage)}`;

export function MobileQuoteButton() {
  const pathname = usePathname();

  if (pathname.startsWith("/contact")) return null;

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noreferrer"
      className="quote-fab fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex size-14 items-center justify-center rounded-full border border-white/30 bg-brand-accent text-white transition-colors hover:bg-brand-primary md:hidden"
      aria-label="通过 WhatsApp 获取报价"
    >
      <WhatsappLogo aria-hidden="true" size={29} weight="fill" />
    </a>
  );
}

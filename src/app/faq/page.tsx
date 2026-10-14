import type { Metadata } from "next";
import { FaqExplorer } from "@/components/faq-explorer";
import { pageAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "YOMEGA answers on activewear OEM/ODM: MOQ, pricing, sampling, production, quality, fabrics, shipping, compliance and scaling your brand.",
  alternates: pageAlternates("/faq"),
};

export default function FaqPage() {
  return <FaqExplorer />;
}

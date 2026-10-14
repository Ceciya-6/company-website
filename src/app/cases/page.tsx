import type { Metadata } from "next";
import { CasesView } from "./cases-view";
import { pageAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Customer Cases",
  description:
    "How YOMEGA supports activewear brands: small-batch launches, OEM/ODM development, quality inspection and finished-garment delivery.",
  alternates: pageAlternates("/cases"),
};

export default function CasesPage() {
  return <CasesView />;
}

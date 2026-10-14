import type { Metadata } from "next";
import { ContactView } from "./contact-view";
import { pageAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Send YOMEGA an activewear OEM/ODM inquiry — certifications, packaging, logistics, trade terms and response commitments.",
  alternates: pageAlternates("/contact"),
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string | string[]; source?: string | string[] }>;
}) {
  const params = await searchParams;
  const requestedProduct = params.product;
  const productName =
    typeof requestedProduct === "string" ? requestedProduct : "";
  const source = typeof params.source === "string" ? params.source : "contact";

  return <ContactView productName={productName} source={source} />;
}

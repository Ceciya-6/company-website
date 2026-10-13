import type { Metadata } from "next";
import { ContactView } from "./contact-view";

export const metadata: Metadata = {
  title: "获取询价",
  description:
    "向 YOMEGA 提交运动服 OEM/ODM 询价，并了解认证、包装、物流、交易条件与响应承诺。",
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

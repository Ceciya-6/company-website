import type { Metadata } from "next";
import { FaqExplorer } from "@/components/faq-explorer";

export const metadata: Metadata = {
  title: "常见问题",
  description:
    "查看 YOUMEGA 关于运动服 OEM/ODM 起订量、价格、打样、生产、质量、面料、运输、合规和品牌规模化的常见问题。",
};

export default function FaqPage() {
  return <FaqExplorer />;
}

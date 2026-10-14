import type { Metadata } from "next";
import { AboutView } from "./about-view";
import { pageAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "关于我们",
  description:
    "了解 YOMEGA 与 Xiamen Mega Garment Co., Ltd. 的运动服供应能力、生产体系和 OEM/ODM 服务。",
  alternates: pageAlternates("/about"),
};

export default function AboutPage() {
  return <AboutView />;
}

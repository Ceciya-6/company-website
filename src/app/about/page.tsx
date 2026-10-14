import type { Metadata } from "next";
import { AboutView } from "./about-view";
import { pageAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about YOMEGA and Xiamen Mega Garment Co., Ltd. — activewear supply capabilities, in-house production systems and OEM/ODM services.",
  alternates: pageAlternates("/about"),
};

export default function AboutPage() {
  return <AboutView />;
}

import type { Metadata } from "next";
import { CasesView } from "./cases-view";

export const metadata: Metadata = {
  title: "客户案例",
  description:
    "了解 YOMEGA 如何支持运动服品牌完成小批量启动、OEM/ODM 产品开发、质量检验与成衣交付。",
};

export default function CasesPage() {
  return <CasesView />;
}

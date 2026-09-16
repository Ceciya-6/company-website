import type { Metadata } from "next";
import { ArrowRight, Package, PaintBrush, ShieldCheck } from "@phosphor-icons/react/ssr";
import Link from "next/link";

export const metadata: Metadata = {
  title: "客户案例",
  description:
    "了解 YOMEGA 如何支持运动服品牌完成小批量启动、OEM/ODM 产品开发、质量检验与成衣交付。",
};

const cases = [
  {
    icon: Package,
    eyebrow: "STOCK + LOGO",
    title: "小批量品牌启动",
    description:
      "通过现款加 Logo 方案从 100 套起步，可混颜色和尺码，帮助品牌先验证市场需求并控制首批库存。",
  },
  {
    icon: PaintBrush,
    eyebrow: "OEM / ODM",
    title: "从参考图到产品样品",
    description:
      "根据参考图片、样衣或需求说明推进面料、版型、颜色、Logo、标签和包装，完成可确认的产品样品。",
  },
  {
    icon: ShieldCheck,
    eyebrow: "QUALITY + DELIVERY",
    title: "大货质量与交付",
    description:
      "样品确认后进入生产，按照项目要求完成质量检验、包装与物流准备，并在关键节点同步进度。",
  },
];

export default function CasesPage() {
  return (
    <main className="min-h-[60vh] bg-brand-secondary px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="max-w-3xl border-b border-brand-border pb-9 sm:pb-12">
          <p className="text-sm font-bold tracking-[0.2em] text-brand-accent uppercase">
            Customer Cases
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            客户合作案例
          </h1>
          <p className="mt-5 text-base leading-8 text-brand-muted sm:text-lg">
            从小批量品牌启动到全定制开发，我们根据产品阶段、目标数量和交付要求制定适合的合作路径。
          </p>
        </header>

        <section className="grid gap-px bg-brand-border py-px sm:grid-cols-3" aria-label="客户合作场景">
          {cases.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className="bg-brand-card p-7 sm:p-8">
                <Icon aria-hidden="true" size={32} weight="regular" className="text-brand-accent" />
                <p className="mt-8 text-xs font-bold tracking-[0.16em] text-brand-accent uppercase">
                  {item.eyebrow}
                </p>
                <h2 className="mt-3 text-2xl tracking-tight">{item.title}</h2>
                <p className="mt-4 leading-7 text-brand-muted">{item.description}</p>
              </article>
            );
          })}
        </section>

        <section className="mt-12 flex flex-col items-start justify-between gap-6 bg-brand-primary p-7 text-white sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="text-2xl text-white sm:text-3xl">告诉我们您的产品计划</h2>
            <p className="mt-3 max-w-2xl leading-7 text-white/70">
              提交参考图片、产品类别和预计数量，我们将在工作日 24 小时内回复。
            </p>
          </div>
          <Link href="/contact?source=cases#quote-form" className="quote-cta shrink-0">
            获取报价 <ArrowRight aria-hidden="true" size={18} weight="bold" />
          </Link>
        </section>
      </div>
    </main>
  );
}

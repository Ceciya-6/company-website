import type { Metadata } from "next";
import {
  CurrencyDollarSimple,
  Factory,
  Lightbulb,
} from "@phosphor-icons/react/ssr";

export const metadata: Metadata = {
  title: "关于我们",
  description:
    "了解 YOMEGA 与 Xiamen Mega Garment Co., Ltd. 的运动服供应能力、生产体系和 OEM/ODM 服务。",
};

const sections = [
  {
    title: "我们是谁",
    introduction:
      "YOMEGA 是 Xiamen Mega Garment Co., Ltd. 旗下运动服品牌与制造业务。我们自 2017 年开展对外销售与品牌制造，目前公司约有 238 人。",
    details: [
      "品牌：YOMEGA",
      "法律主体：Xiamen Mega Garment Co., Ltd.",
      "对外销售与品牌制造成立年份：2017",
      "公司规模：约 238 人",
    ],
  },
  {
    title: "我们做什么",
    introduction:
      "我们具备无缝和裁剪缝制运动服供应能力，为客户提供从产品开发到成衣交付的一体化服务。",
    details: [
      "厂内可完成：制版、打样、裁剪、缝制、针织、Logo 印刷/应用、质量检验和包装",
      "外协完成：常规面料生产、染色、Logo 制作；特殊 Logo 工艺逐单确认",
      "核心女装品类：leggings、biker shorts、sports bras、tops",
      "可确认的认证/体系：OEKO-TEX Standard 100、BSCI、GRS、GCC",
      "成衣检验口径：AQL 2.5",
      "现货不加 Logo：50 sets 起，可混颜色和尺码",
      "现货加 Logo：100 pieces in total，可混款式、颜色和尺码",
    ],
  },
];

const advantages = [
  {
    title: "低 MOQ",
    description: "灵活的起订量，帮助品牌以更低门槛启动新品并测试市场。",
    icon: CurrencyDollarSimple,
  },
  {
    title: "支持 ODM/OEM 生产",
    description: "支持定制面料、版型、Logo、标签、颜色和包装，满足不同品牌的产品需求。",
    icon: Factory,
  },
  {
    title: "从想法到真实产品",
    description: (
      <>
        全定制样品交期约为{" "}
        <strong className="font-bold text-brand-primary">12–15 天</strong>
        。一个好的工厂，可以帮你把想法变成真实的产品。
      </>
    ),
    icon: Lightbulb,
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-brand-secondary px-5 py-14 text-brand-primary sm:px-8 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <header className="border-b border-brand-border pb-8 sm:pb-10">
          <p className="mb-3 text-sm font-bold tracking-[0.22em] text-brand-muted uppercase">
            YOMEGA
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            关于我们
          </h1>
        </header>

        <div className="divide-y divide-brand-border">
          {sections.map((section) => (
            <section
              key={section.title}
              className="grid gap-5 py-9 sm:grid-cols-[180px_1fr] sm:gap-10 sm:py-12"
            >
              <h2 className="text-2xl font-bold tracking-tight">
                {section.title}
              </h2>

              <div>
                <p className="text-base leading-8 text-brand-muted sm:text-lg">
                  {section.introduction}
                </p>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-brand-muted sm:text-base">
                  {section.details.map((detail) => (
                    <li key={detail} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[0.7rem] size-1.5 shrink-0 rounded-full bg-brand-primary"
                      />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}

          <section className="grid gap-5 py-9 sm:grid-cols-[180px_1fr] sm:gap-10 sm:py-12">
            <h2 className="text-2xl font-bold tracking-tight">
              为什么选择我们
            </h2>

            <ul className="space-y-4">
              {advantages.map((advantage) => (
                <li
                  key={advantage.title}
                  className="flex gap-4 rounded-sm border border-brand-border bg-brand-card p-5 transition-colors hover:border-brand-accent sm:p-6"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-secondary text-brand-primary">
                    <advantage.icon aria-hidden="true" size={22} weight="regular" />
                  </span>
                  <div>
                    <h3 className="font-bold text-brand-primary sm:text-lg">
                      {advantage.title}
                    </h3>
                    <p className="mt-1 text-sm leading-7 text-brand-muted sm:text-base">
                      {advantage.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}

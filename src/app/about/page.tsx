import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于我们 | YOUMEGA",
  description:
    "了解 YOUMEGA 与 Xiamen Mega Garment Co., Ltd. 的运动服供应能力、生产体系和 OEM/ODM 服务。",
};

const sections = [
  {
    title: "我们是谁",
    introduction:
      "YOUMEGA 是 Xiamen Mega Garment Co., Ltd. 旗下运动服品牌与制造业务。我们自 2017 年开展对外销售与品牌制造，目前公司约有 238 人。",
    details: [
      "品牌：YOUMEGA",
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
    icon: (
      <path d="M12 3v18m5-14H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    ),
  },
  {
    title: "支持 ODM/OEM 生产",
    description: "支持定制面料、版型、Logo、标签、颜色和包装，满足不同品牌的产品需求。",
    icon: (
      <>
        <path d="M4 21v-7a2 2 0 0 1 2-2h4V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16" />
        <path d="M8 21h14M14 7h2m-2 4h2m-2 4h2" />
      </>
    ),
  },
  {
    title: "从想法到真实产品",
    description: (
      <>
        全定制样品交期约为{" "}
        <strong className="font-bold text-orange-600">12–15 天</strong>
        。一个好的工厂，可以帮你把想法变成真实的产品。
      </>
    ),
    icon: (
      <>
        <path d="M9 18h6m-5 3h4" />
        <path d="M8.5 14.5A7 7 0 1 1 15.5 14.5C14.5 15.2 14 16 14 17h-4c0-1-.5-1.8-1.5-2.5Z" />
      </>
    ),
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-stone-50 px-5 py-14 text-stone-900 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <header className="border-b border-stone-200 pb-8 sm:pb-10">
          <p className="mb-3 text-sm font-semibold tracking-[0.22em] text-emerald-700 uppercase">
            YOUMEGA
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            关于我们
          </h1>
        </header>

        <div className="divide-y divide-stone-200">
          {sections.map((section) => (
            <section
              key={section.title}
              className="grid gap-5 py-9 sm:grid-cols-[180px_1fr] sm:gap-10 sm:py-12"
            >
              <h2 className="text-2xl font-semibold tracking-tight">
                {section.title}
              </h2>

              <div>
                <p className="text-base leading-8 text-stone-700 sm:text-lg">
                  {section.introduction}
                </p>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-stone-600 sm:text-base">
                  {section.details.map((detail) => (
                    <li key={detail} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[0.7rem] size-1.5 shrink-0 rounded-full bg-emerald-600"
                      />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}

          <section className="grid gap-5 py-9 sm:grid-cols-[180px_1fr] sm:gap-10 sm:py-12">
            <h2 className="text-2xl font-semibold tracking-tight">
              为什么选择我们
            </h2>

            <ul className="space-y-4">
              {advantages.map((advantage) => (
                <li
                  key={advantage.title}
                  className="flex gap-4 rounded-2xl border border-stone-200 bg-white p-5 sm:p-6"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-5"
                    >
                      {advantage.icon}
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-semibold text-stone-900 sm:text-lg">
                      {advantage.title}
                    </h3>
                    <p className="mt-1 text-sm leading-7 text-stone-600 sm:text-base">
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

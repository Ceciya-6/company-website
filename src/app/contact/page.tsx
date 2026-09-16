import type { Metadata } from "next";
import {
  AirplaneTilt,
  ArrowRight,
  Certificate,
  CheckCircle,
  ClockCountdown,
  EnvelopeSimple,
  Package,
  ShieldCheck,
  Truck,
  WhatsappLogo,
} from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { QuoteForm } from "@/components/quote-form";

export const metadata: Metadata = {
  title: "获取询价",
  description:
    "向 YOMEGA 提交运动服 OEM/ODM 询价，并了解认证、包装、物流、交易条件与响应承诺。",
};

const trustSections = [
  {
    number: "01",
    eyebrow: "CERTIFICATION",
    title: "认证与合规",
    icon: Certificate,
    items: [
      "YOMEGA 持有 OEKO-TEX Standard 100 认证，供应商资质审核期间可按要求提供文件。",
      "GRS 范围证书：由相应工厂或染厂持有；BSCI：工厂通过 amfori BSCI 社会责任审核。",
      "出口欧盟与美国的货物按 REACH、CPSIA 要求准备，具体证书主体、覆盖范围和有效期以文件为准。",
      "供应商资质审核期间，可按要求提供对应认证文件。",
    ],
  },
  {
    number: "02",
    eyebrow: "PACKAGING",
    title: "品牌包装",
    icon: Package,
    items: [
      "支持单件独立包装袋、品牌包装袋、外箱标记和电商物流包装。",
      "可根据客户仓库或电商物流中心要求，配置从内包装到品牌外箱的方案。",
      "下单前逐项确认包装材质、尺寸、品牌印刷、外箱标记、装箱数量和定制费用。",
    ],
  },
  {
    number: "03",
    eyebrow: "LOGISTICS",
    title: "物流选择",
    icon: Truck,
    items: [
      "海运拼箱 LCL：页面示例为 28–45 天，适合小于 10m³ 的货量。",
      "海运整箱 FCL：页面示例为 25–40 天，20 尺柜约适合 10–25m³。",
      "空运：页面示例为 5–10 天，适合样品、紧急补货或 200kg 以下批次。",
      "可从厦门、深圳、宁波、上海等中国港口安排 FOB 发运；运费和时效以订舱时确认为准。",
    ],
  },
  {
    number: "04",
    eyebrow: "TRADE TERMS",
    title: "交易条件",
    icon: ShieldCheck,
    items: [
      "支持 FOB、CIF、DDP、EXW，卖方与买方责任按正式订单约定。",
      "首次订单或无自有货代的小批量项目，可优先比较 DDP；中等货量可比较 CIF。",
      "经常发货或有自有货代的项目，可优先比较 FOB；中国境内有物流整合能力时可考虑 EXW。",
      "MOQ、样品费、付款方式、定金与尾款比例、报价有效期和售后安排均在正式报价或合同中确认。",
    ],
  },
  {
    number: "05",
    eyebrow: "RESPONSE",
    title: "响应承诺",
    icon: ClockCountdown,
    items: [
      "工作日 24 小时内回复，并提供面料选择、价格和样品制作时间表等报价信息。",
      "您不必先准备完整技术资料包；参考图片、草图或需求描述都可以作为开发起点。",
      "发送 Logo 后可免费制作效果图，并解答 MOQ、交货时间和样品费用问题。",
      "邮箱只用于报价和后续跟进；设计资料与咨询信息将按保密要求处理。",
    ],
  },
];

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

  return (
    <main className="bg-brand-secondary">
      <section className="border-b border-brand-border" aria-labelledby="quote-title">
        <div className="mx-auto grid w-full max-w-[1536px] lg:min-h-[850px] lg:grid-cols-[minmax(0,1.05fr)_minmax(560px,0.95fr)]">
          <div className="flex min-w-0 flex-col justify-between px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-16">
            <div className="max-w-3xl">
              <p className="flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-brand-muted uppercase sm:text-sm">
                <span className="text-brand-accent">◆</span> 开始询价
              </p>
              <h1
                id="quote-title"
                className="mt-8 max-w-[820px] text-[clamp(3.35rem,7vw,7.7rem)] leading-[0.88] font-medium tracking-[-0.065em]"
              >
                准备制作
                <span className="block text-brand-accent">您的产品？</span>
              </h1>
              <p className="mt-10 max-w-2xl text-lg leading-9 text-brand-muted sm:text-xl sm:leading-10">
                您不需要准备一份完美的技术资料包。只需提供参考图片、草图，或者告诉我们您的需求即可，剩下的我们一起解决。
              </p>
              <ul className="mt-10 space-y-4 text-base leading-7 text-brand-muted sm:text-lg">
                <li className="flex gap-3"><CheckCircle className="mt-1 shrink-0 text-brand-accent" size={20} weight="fill" />发送您的 Logo，我们将免费制作效果图</li>
                <li className="flex gap-3"><CheckCircle className="mt-1 shrink-0 text-brand-accent" size={20} weight="fill" />咨询 MOQ、交货时间和样品费用</li>
                <li className="flex gap-3"><CheckCircle className="mt-1 shrink-0 text-brand-accent" size={20} weight="fill" />工作日 24 小时内获得报价信息</li>
              </ul>

              <Link
                href="https://xmmega-catalog.com/ceciya"
                target="_blank"
                rel="noreferrer"
                className="mt-10 inline-flex min-h-20 w-full max-w-xl items-center justify-between gap-5 bg-brand-primary px-6 py-5 text-white transition-colors hover:bg-brand-accent sm:px-8"
              >
                <span>
                  <span className="block font-bold">获取实时目录链接</span>
                  <span className="mt-1 block text-sm text-white/60">产品目录 · 更新于 2026 年</span>
                </span>
                <ArrowRight aria-hidden="true" size={23} weight="bold" />
              </Link>
            </div>

            <div className="mt-14 grid gap-6 border-t border-brand-border pt-8 sm:grid-cols-2 lg:mt-20">
              <div>
                <p className="text-xs font-bold tracking-[0.16em] text-brand-accent uppercase">电子邮件</p>
                <a href="mailto:Ceciya@xmmega.com" className="mt-2 inline-flex items-center gap-2 font-bold hover:text-brand-accent">
                  <EnvelopeSimple aria-hidden="true" size={20} /> Ceciya@xmmega.com
                </a>
              </div>
              <div>
                <p className="text-xs font-bold tracking-[0.16em] text-brand-accent uppercase">WhatsApp</p>
                <a href="https://wa.me/8615396238862" target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-2 font-bold hover:text-brand-accent">
                  <WhatsappLogo aria-hidden="true" size={20} /> +86 153 9623 8862
                </a>
              </div>
            </div>
          </div>

          <div id="quote-form" className="min-w-0 scroll-mt-24 border-t border-brand-border bg-white p-4 sm:p-8 lg:border-t-0 lg:border-l lg:p-10 xl:p-14">
            <QuoteForm productName={productName} source={source} />
          </div>
        </div>
      </section>

      <section className="bg-brand-primary px-5 py-16 text-white sm:px-8 sm:py-24 lg:px-10" aria-labelledby="trust-title">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold tracking-[0.2em] text-brand-accent uppercase">Buyer Confidence</p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <h2 id="trust-title" className="text-4xl tracking-tight text-white sm:text-6xl">合作前，每一项都说清楚</h2>
            <p className="max-w-2xl text-base leading-8 text-white/60 lg:justify-self-end">
              认证、包装、物流、交易条件和响应承诺均按项目逐项确认。费用与时效示例只用于初步判断，最终以款式、货量、目的地和正式订单为准。
            </p>
          </div>

          <div className="mt-12 border-t border-white/15">
            {trustSections.map((section) => {
              const Icon = section.icon;
              return (
                <article key={section.number} className="grid gap-6 border-b border-white/15 py-9 sm:grid-cols-[96px_220px_1fr] sm:gap-8 sm:py-11">
                  <p className="text-sm font-bold tracking-[0.16em] text-brand-accent">{section.number}</p>
                  <div>
                    <Icon aria-hidden="true" size={30} className="text-brand-accent" />
                    <p className="mt-5 text-xs font-bold tracking-[0.15em] text-white/45">{section.eyebrow}</p>
                    <h3 className="mt-2 text-2xl text-white">{section.title}</h3>
                  </div>
                  <ul className="grid gap-4 text-sm leading-7 text-white/70 lg:grid-cols-2 lg:gap-x-10">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2.5 size-1.5 shrink-0 bg-brand-accent" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          <div className="mt-10 flex items-start gap-4 border border-white/15 p-5 text-sm leading-7 text-white/60 sm:p-6">
            <AirplaneTilt aria-hidden="true" size={24} className="mt-0.5 shrink-0 text-brand-accent" />
            <p>物流费用、税费、保险、清关安排及预计到货时间会因目的国、体积、重量和订舱情况变化，我们会在正式报价中逐项列明。</p>
          </div>
        </div>
      </section>
    </main>
  );
}

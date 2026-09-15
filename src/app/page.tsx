import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle,
  ClipboardText,
  Package,
  PaintBrush,
  ShieldCheck,
} from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "运动服 OEM/ODM 制造商",
};

const trustItems = [
  { value: "9+", label: "年出口经验" },
  { value: "300+", label: "可选款式" },
  { value: "7 天", label: "现款加标打样" },
  { value: "100 套", label: "现款加标起订" },
];

const advantages = [
  {
    icon: Package,
    title: "小批量启动",
    text: "现款加标 100 套起订，可混颜色和尺码，帮助品牌控制首批库存。",
  },
  {
    icon: PaintBrush,
    title: "从参考图开发",
    text: "支持根据参考图或样衣推进面料、版型、颜色及样品开发。",
  },
  {
    icon: ClipboardText,
    title: "完整品牌配套",
    text: "支持 Logo、标签、吊牌与包装定制，把想法落实为可交付产品。",
  },
  {
    icon: ShieldCheck,
    title: "可检查的质量控制",
    text: "厂内完成质量检验和包装，成衣检验口径为 AQL 2.5。",
  },
];

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-brand-secondary">
      <section className="relative min-h-[calc(100svh-68px)] bg-brand-primary text-white sm:min-h-[calc(100svh-76px)]">
        <Image
          src={products[0].image}
          alt=""
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="object-cover object-[62%_28%] opacity-45 sm:object-[65%_32%] lg:object-[78%_35%] lg:opacity-70"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,12,0.98)_0%,rgba(10,10,12,0.88)_48%,rgba(10,10,12,0.18)_100%)]" />

        <div className="relative mx-auto flex min-h-[calc(100svh-68px)] max-w-7xl items-center px-5 py-7 sm:min-h-[calc(100svh-76px)] sm:px-8 sm:py-10 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-xs font-bold tracking-[0.18em] text-white/75 uppercase sm:text-sm sm:tracking-[0.24em]">
              Xiamen · China · OEM / ODM · Private Label
            </p>
            <h1 className="mt-4 max-w-3xl text-[clamp(2.45rem,7vw,5.8rem)] leading-[0.96] font-bold tracking-[-0.055em] text-white">
              为自有品牌提供专业运动服 <span className="text-brand-accent italic">OEM</span> 定制
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-6 text-white/76 sm:text-lg sm:leading-8">
              厦门运动服供应商，提供现款加标、OEM/ODM 开发、定制包装及样品和大货生产服务。现款加标 100 套起订。
            </p>
            <div className="mt-6 flex flex-col gap-3 min-[420px]:flex-row sm:mt-8">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-brand-accent px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white hover:text-brand-primary"
              >
                获取报价 <ArrowRight aria-hidden="true" size={18} weight="bold" />
              </Link>
              <Link
                href="/products"
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/50 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white hover:text-brand-primary"
              >
                浏览产品 <ArrowRight aria-hidden="true" size={18} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black text-white" aria-label="YOUMEGA 关键数据">
        <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <div
              key={item.label}
              className="border-r border-b border-white/10 px-5 py-6 last:border-r-0 even:border-r-0 lg:border-b-0 lg:even:border-r"
            >
              <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {item.value}
              </p>
              <p className="mt-2 text-xs font-bold tracking-[0.12em] text-brand-accent uppercase sm:text-sm">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-10" aria-labelledby="featured-products">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold tracking-[0.18em] text-brand-accent uppercase">Featured Products</p>
              <h2 id="featured-products" className="mt-3 text-4xl tracking-tight sm:text-5xl">主推产品</h2>
            </div>
            <Link href="/products" className="inline-flex items-center gap-2 font-bold hover:text-brand-accent">
              查看产品中心 <ArrowRight aria-hidden="true" size={18} weight="bold" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-8">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group overflow-hidden border border-brand-border bg-brand-card"
              >
                <div className="relative aspect-square overflow-hidden bg-white">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                  />
                </div>
                <div className="flex items-center justify-between gap-4 p-5 sm:p-6">
                  <div>
                    <p className="text-xs font-bold tracking-[0.14em] text-brand-accent uppercase">OEM / ODM</p>
                    <h3 className="mt-2 text-xl tracking-tight sm:text-2xl">{product.name}</h3>
                  </div>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-brand-border transition-colors group-hover:border-brand-accent group-hover:bg-brand-accent group-hover:text-white">
                    <ArrowRight aria-hidden="true" size={20} weight="bold" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-primary px-5 py-16 text-white sm:px-8 sm:py-24 lg:px-10" aria-labelledby="advantages">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold tracking-[0.18em] text-brand-accent uppercase">Why YOUMEGA</p>
          <h2 id="advantages" className="mt-3 max-w-3xl text-4xl tracking-tight text-white sm:text-5xl">
            从第一件样品，到完整品牌项目
          </h2>
          <div className="mt-10 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="bg-brand-primary p-6 sm:p-7">
                  <Icon aria-hidden="true" size={30} weight="regular" className="text-brand-accent" />
                  <h3 className="mt-6 text-xl text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-10" aria-labelledby="next-step">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-3">
            <Link href="/faq" className="group border border-brand-border bg-brand-card p-7 transition-colors hover:border-brand-accent">
              <p className="text-sm font-bold text-brand-accent">01 / FAQ</p>
              <h3 className="mt-7 text-2xl">解决合作前的疑问</h3>
              <p className="mt-3 leading-7 text-brand-muted">查看 MOQ、样品、定制、交期与运输等常见问题。</p>
              <span className="mt-7 inline-flex items-center gap-2 font-bold group-hover:text-brand-accent">查看常见问题 <ArrowRight aria-hidden="true" size={18} weight="bold" /></span>
            </Link>
            <Link href="/about" className="group border border-brand-border bg-brand-card p-7 transition-colors hover:border-brand-accent">
              <p className="text-sm font-bold text-brand-accent">02 / CAPABILITY</p>
              <h3 className="mt-7 text-2xl">了解我们的生产能力</h3>
              <p className="mt-3 leading-7 text-brand-muted">了解无缝与裁剪缝制供应能力，以及厂内生产流程。</p>
              <span className="mt-7 inline-flex items-center gap-2 font-bold group-hover:text-brand-accent">关于 YOUMEGA <ArrowRight aria-hidden="true" size={18} weight="bold" /></span>
            </Link>
            <div className="bg-brand-accent p-7 text-white">
              <p className="text-sm font-bold text-white/70">03 / GET A QUOTE</p>
              <h2 id="next-step" className="mt-7 text-2xl text-white">把您的想法发给我们</h2>
              <p className="mt-3 leading-7 text-white/80">提交参考图、产品品类和预计数量，我们将在工作日 24 小时内回复。</p>
              <Link href="/contact" className="mt-7 inline-flex min-h-12 items-center gap-2 bg-white px-5 py-3 font-bold text-brand-primary transition-colors hover:bg-brand-primary hover:text-white">
                联系我们 <ArrowRight aria-hidden="true" size={18} weight="bold" />
              </Link>
            </div>
          </div>
          <div className="mt-10 flex items-start gap-3 border-t border-brand-border pt-8 text-sm leading-6 text-brand-muted">
            <CheckCircle aria-hidden="true" size={21} weight="fill" className="mt-0.5 shrink-0 text-brand-accent" />
            <p>现款加标和全定制项目的具体起订量、样品周期与大货交期，将根据款式和匹配面料重新确认。</p>
          </div>
        </div>
      </section>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-brand-primary text-white/70">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12 lg:px-10">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-start">
          <div className="max-w-2xl">
            <Link
              href="/"
              className="inline-flex transition-opacity hover:opacity-80"
              aria-label="YOUMEGA 首页"
            >
              <Image
                src="/logo.png"
                alt="YOUMEGA"
                width={1465}
                height={285}
                loading="eager"
                className="h-auto w-[168px] brightness-0 invert sm:w-[184px]"
              />
            </Link>
            <p className="mt-5 max-w-xl text-base leading-7">
              Xiamen Mega Garment Co., Ltd.
            </p>
            <p className="mt-2 max-w-xl text-base leading-7">
              我们具备无缝和裁剪缝制运动服供应能力，为客户提供从产品开发到成衣交付的一体化服务。
            </p>
          </div>

          <div className="shrink-0 md:text-right">
            <p className="text-xs font-semibold tracking-[0.16em] text-white/45 uppercase">
              Contact
            </p>
            <a
              href="mailto:Ceciya@xmmega.com"
              className="mt-2 inline-block font-semibold text-white transition-colors hover:text-brand-accent"
            >
              Ceciya@xmmega.com
            </a>
          </div>
        </div>

        <div className="mt-9 border-t border-white/10 pt-5 text-xs text-white/45">
          © {currentYear} Xiamen Mega Garment Co., Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

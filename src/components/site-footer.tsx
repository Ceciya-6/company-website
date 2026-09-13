import Link from "next/link";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-200 bg-[#eee5d5] text-stone-700">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12 lg:px-10">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-start">
          <div className="max-w-2xl">
            <Link
              href="/"
              className="text-lg font-bold tracking-[0.16em] text-stone-900 transition-colors hover:text-orange-600"
            >
              YOUMEGA
            </Link>
            <p className="mt-3 text-sm leading-7 sm:text-base">
              我们具备无缝和裁剪缝制运动服供应能力，为客户提供从产品开发到成衣交付的一体化服务。
            </p>
          </div>

          <div className="shrink-0 md:text-right">
            <p className="text-xs font-semibold tracking-[0.16em] text-stone-500 uppercase">
              Contact
            </p>
            <a
              href="mailto:Ceciya@xmmega.com"
              className="mt-2 inline-block font-medium text-stone-900 transition-colors hover:text-orange-600"
            >
              Ceciya@xmmega.com
            </a>
          </div>
        </div>

        <div className="mt-9 border-t border-stone-300/80 pt-5 text-xs text-stone-500">
          © {currentYear} Xiamen Mega Garment Co., Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

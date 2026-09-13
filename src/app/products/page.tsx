import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "产品中心",
};

export default function ProductsPage() {
  return (
    <main className="flex min-h-[60vh] items-center bg-[#f7f2e8] px-5 py-20 sm:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-orange-600 uppercase">
          YOUMEGA
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
          产品中心
        </h1>
        <p className="mt-5 text-base leading-8 text-stone-600 sm:text-lg">
          本页面内容将在后续课程完善
        </p>
      </div>
    </main>
  );
}

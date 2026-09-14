import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "联系我们",
};

export default function ContactPage() {
  return (
    <main className="flex min-h-[60vh] items-center bg-brand-secondary px-5 py-20 sm:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <p className="mb-4 text-sm font-bold tracking-[0.2em] text-brand-muted uppercase">
          YOUMEGA
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-brand-primary sm:text-5xl">
          联系我们
        </h1>
        <p className="mt-5 text-base leading-8 text-brand-muted sm:text-lg">
          本页面内容将在后续课程完善
        </p>
      </div>
    </main>
  );
}

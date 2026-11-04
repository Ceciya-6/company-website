import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { MobileQuoteButton } from "@/components/mobile-quote-button";
import { I18nProvider } from "@/lib/i18n";
import { GoogleAnalytics } from "@/components/google-analytics";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://iyomega.com"),
  title: {
    default: "YOMEGA | Activewear OEM/ODM Manufacturer",
    template: "%s | YOMEGA",
  },
  description:
    "YOMEGA supplies seamless and cut-and-sew activewear with custom fabrics, fits, logos, labels, colors and packaging.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: "YOMEGA",
    locale: "zh_CN",
    alternateLocale: ["en_US"],
    images: [{ url: "/images/logo-yomega.png" }],
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: [{ url: "/images/favicon.png", type: "image/png" }],
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
  // Google Search Console 的 HTML 标记验证，配置 NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION 后自动输出。
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-brand-secondary text-brand-primary">
        <I18nProvider>
          <SiteHeader />
          <div className="flex flex-1 flex-col">{children}</div>
          <SiteFooter />
          <MobileQuoteButton />
        </I18nProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}

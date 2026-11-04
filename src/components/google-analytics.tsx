import Script from "next/script";

/**
 * 站点自己的 GA4 衡量 ID。公开信息，写进仓库不影响安全。
 * 想临时关掉统计：在 Vercel 把 NEXT_PUBLIC_GA_ID 设成空字符串并重新部署。
 */
const DEFAULT_GA_ID = "G-MZWMS71TF7";

/**
 * Google Analytics 4 基础代码。
 *
 * 优先读 NEXT_PUBLIC_GA_ID（构建时内联），没配就用 DEFAULT_GA_ID，
 * 配成空字符串则整段不输出，行为和没接统计时完全一致。
 */
export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID ?? DEFAULT_GA_ID;

  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
      </Script>
    </>
  );
}

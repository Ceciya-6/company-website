export {};

declare global {
  interface Window {
    // GA4 由 gtag.js 注入；未安装统计时为 undefined。
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The retirement redirect lives in middleware so incoming query parameters
  // are discarded. next.config redirects automatically preserve those values.
  // Let middleware also handle trailing slashes without an intermediate hop.
  skipTrailingSlashRedirect: true,
  images: {
    // 现代格式优先：浏览器支持时下发 AVIF，其次 WebP。
    formats: ["image/avif", "image/webp"],
    // SKU 颜色图托管在 Airtable 附件 CDN，允许经 next/image 优化代理。
    remotePatterns: [
      { protocol: "https", hostname: "v5.airtableusercontent.com" },
      { protocol: "https", hostname: "dl.airtable.com" },
      { protocol: "https", hostname: "dl.airtableusercontent.com" },
    ],
  },
};

export default nextConfig;

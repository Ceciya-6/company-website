import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

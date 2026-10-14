import type { MetadataRoute } from "next";
import { listProducts } from "@/lib/products-store";

const siteUrl = "https://iyomega.com";

/**
 * 动态 sitemap：产品 URL 运行时从 Airtable 取（仅 active），每次请求实时渲染，
 * 商品上下架即刻反映；Airtable 不可用时保底输出静态页。
 * sitemap 只被爬虫低频访问，无需 ISR 缓存，避免缓存失效链路带来的延迟。
 */
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/products`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/faq`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/cases`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  let productPages: MetadataRoute.Sitemap = [];
  try {
    const result = await listProducts();
    // Airtable 不可用时只输出静态页，不输出可能失效的产品 URL。
    if (result.source === "airtable") {      productPages = result.products.map((product) => ({
        url: `${siteUrl}/products/${product.slug}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.8,
        images: [
          product.image.startsWith("http")
            ? product.image
            : `${siteUrl}${encodeURI(product.image)}`,
        ],
      }));
    }
  } catch {
    // 取数失败时保底输出静态页。
  }

  return [...staticPages, ...productPages];
}

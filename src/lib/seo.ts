import type { Metadata } from "next";

const BASE = "https://iyomega.com";

/**
 * 每页 SEO 入口：canonical 指向无参数地址；
 * 中英文采用 ?lang= 参数方案，hreflang 指向参数变体，x-default 为干净地址。
 */
export function pageAlternates(path: string): Metadata["alternates"] {
  const url = `${BASE}${path}`;
  return {
    canonical: url,
    languages: {
      "zh-CN": `${url}?lang=zh`,
      en: `${url}?lang=en`,
      "x-default": url,
    },
  };
}

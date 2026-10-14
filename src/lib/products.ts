export type ProductStatus = "active" | "draft" | "archived";

/** SKU 颜色：图片托管在 Airtable 附件字段，name 来自文件名（去扩展名）。 */
export type ProductColor = {
  id: string;
  name: string;
  image: string;
};

export type Product = {
  recordId?: string;
  slug: string;
  name: string;
  shortName: string;
  image: string;
  alt: string;
  highlights: string[];
  colorVariants?: ProductColor[];
  category?: string;
  fabric?: string;
  sizes?: string;
  colors?: string;
  moq?: string;
  sampleDays?: string;
  customOptions?: string;
  sellingPoints?: string;
  role?: string;
  status?: ProductStatus;
  featured?: boolean;
  sort?: number;
  /** Airtable 的 * EN 镜像字段：自动翻译或人工覆盖的英文值，仅管理端使用。 */
  nameEn?: string;
  shortNameEn?: string;
  categoryEn?: string;
  altEn?: string;
  highlightsEn?: string[];
  fabricEn?: string;
  sizesEn?: string;
  colorsEn?: string;
  moqEn?: string;
  sampleDaysEn?: string;
  customOptionsEn?: string;
  sellingPointsEn?: string;
};

export const products: Product[] = [
  {
    slug: "seamless-yoga-set",
    name: "Seamless Yoga Set",
    shortName: "Seamless Yoga Set",
    image: "/images/products/seamless yoga set- 2pcs.jpg",
    alt: "Seamless Yoga Set for Fitness and Beauty of the Back, High-Waisted, Hip-Boosting, Ab-Enhancing, Pilates Training, Yoga Set for Women.",
    highlights: ["Seamless construction", "High-waisted fit", "Private-label support"],
  },
  {
    slug: "womens-three-piece-sports-set",
    name: "Women’s Three-Piece Sports Set",
    shortName: "Three-Piece Sports Set",
    image: "/images/products/yogaset-3pcs.jpg",
    alt: "Tight-fitting sports outfit set for women - quick-drying and breathable fitness wear three-piece set including a cardigan and yoga pants.",
    highlights: ["Three-piece combination", "Quick-drying and breathable", "OEM/ODM support"],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

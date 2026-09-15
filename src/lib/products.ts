export type Product = {
  slug: string;
  name: string;
  shortName: string;
  image: string;
  alt: string;
  highlights: string[];
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

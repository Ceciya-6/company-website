import { NextRequest, NextResponse } from "next/server";

/**
 * 产品主图旧中文路径 → 新英文路径的 301 跳转。
 * 旧路径含 + /（）等特殊字符，path-to-regexp 无法承载，故在 middleware 精确匹配。
 */
const IMAGE_REDIRECTS: Record<string, string> = {
  "/images/products/2578/sku-1-2578背心+2578中裤+2578外套（三件套）—高级黑.jpg":
    "/images/products/sports-three-piece-set-2578/sku-1-premium-black.jpg",
  "/images/products/4535/sku-1-4535文胸-2+4535-1长裤—高级黑.jpg":
    "/images/products/sports-bra-leggings-set-4535/sku-1-premium-black.jpg",
  "/images/products/2592/sku-4-2592外套+2592长裤—高级黑.jpg":
    "/images/products/jacket-leggings-set-2592/sku-4-premium-black.jpg",
  "/images/products/裸感运动内衣撞色挂脖美背普拉提训练健身瑜伽文胸女2588/sku-1-高级黑.jpg":
    "/images/products/halter-cross-back-sports-bra-2588/sku-1-premium-black.jpg",
  "/images/products/云感假两件立领连衣裙户外跑步防走光打底A字裙摆网球裙9094/sku-1-奶黄色.jpg":
    "/images/products/mock-neck-tennis-dress-9094/sku-1-butter-yellow.jpg",
  "/images/products/3616/sku-1-3616外套+3616长裤—高级黑.jpg":
    "/images/products/sweatshirt-wide-leg-pants-set-3616/sku-1-premium-black.jpg",
  "/images/products/3129/sku-1-高级黑.jpg":
    "/images/products/high-waist-wide-leg-pants-3129/sku-1-premium-black.jpg",
};

export function middleware(request: NextRequest) {
  const path = decodeURIComponent(request.nextUrl.pathname);
  const destination = IMAGE_REDIRECTS[path];
  if (!destination) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = destination;
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: ["/images/products/:path*"],
};

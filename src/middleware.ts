import { NextRequest, NextResponse } from "next/server";

// iyomega.com is retired. Keep the site source for possible future reuse.
// Use fresh destination URLs: next.config redirects forward incoming queries.
const PAGE_DESTINATIONS: Record<string, string> = {
  "/": "/",
  "/about": "/about/",
  "/products": "/products/",
  "/faq": "/faq/",
  "/cases": "/case-studies/",
  "/contact": "/contact/",
};

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname.replace(/\/+$/, "") || "/";
  const destination =
    PAGE_DESTINATIONS[path] ??
    (path.startsWith("/products/") ? "/products/" : "/");

  return NextResponse.redirect(new URL(destination, "https://iyoumega.com"), 308);
}

export const config = {
  // Include robots.txt, sitemap.xml, assets, and unknown paths in retirement.
  matcher: ["/:path*"],
};

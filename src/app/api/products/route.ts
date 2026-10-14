import type { NextRequest } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { checkAdmin } from "@/lib/admin-auth";
import {
  createProduct,
  listProducts,
  parseProductInput,
  PRODUCTS_CACHE_TAG,
} from "@/lib/products-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function refreshProductPages(slugs: string[] = []) {
  revalidateTag(PRODUCTS_CACHE_TAG, "default");
  revalidatePath("/", "page");
  revalidatePath("/products", "page");
  revalidatePath("/sitemap.xml");
  for (const slug of slugs) revalidatePath(`/products/${slug}`, "page");
}

export async function GET(request: NextRequest) {
  const includeInactive = request.nextUrl.searchParams.get("all") === "1";
  if (includeInactive) {
    const auth = checkAdmin(request);
    if (!auth.ok) {
      return Response.json({ ok: false, message: auth.message }, { status: auth.status });
    }
  }
  try {
    const result = await listProducts({ includeInactive });
    return Response.json({ ok: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "读取商品失败。";
    return Response.json({ ok: false, message }, { status: 502 });
  }
}

export async function POST(request: NextRequest) {
  const auth = checkAdmin(request);
  if (!auth.ok) {
    return Response.json({ ok: false, message: auth.message }, { status: auth.status });
  }
  const product = parseProductInput(await request.json().catch(() => null));
  if (!product) {
    return Response.json(
      { ok: false, message: "请提供有效的名称、Slug（小写字母/数字/连字符）和主图 URL。" },
      { status: 400 },
    );
  }
  try {
    const created = await createProduct(product);
    refreshProductPages([created.slug]);
    return Response.json({ ok: true, product: created });
  } catch (error) {
    const message = error instanceof Error ? error.message : "创建商品失败。";
    return Response.json({ ok: false, message }, { status: 502 });
  }
}

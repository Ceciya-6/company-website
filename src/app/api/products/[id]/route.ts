import type { NextRequest } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { checkAdmin } from "@/lib/admin-auth";
import {
  deleteProduct,
  getProductBySlug,
  listProducts,
  parseProductInput,
  PRODUCTS_CACHE_TAG,
  updateProduct,
} from "@/lib/products-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

function refreshProductPages(slugs: string[] = []) {
  revalidateTag(PRODUCTS_CACHE_TAG, "default");
  revalidatePath("/", "page");
  revalidatePath("/products", "page");
  for (const slug of slugs) revalidatePath(`/products/${slug}`, "page");
}

export async function GET(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  // rec... 为 Airtable 记录 ID，仅管理员可按 ID 读取（含 draft/archived）。
  if (id.startsWith("rec")) {
    const auth = checkAdmin(request);
    if (!auth.ok) {
      return Response.json({ ok: false, message: auth.message }, { status: auth.status });
    }
    try {
      const result = await listProducts({ includeInactive: true });
      const product = result.products.find((item) => item.recordId === id);
      if (!product) {
        return Response.json({ ok: false, message: "商品不存在。" }, { status: 404 });
      }
      return Response.json({ ok: true, product });
    } catch (error) {
      const message = error instanceof Error ? error.message : "读取商品失败。";
      return Response.json({ ok: false, message }, { status: 502 });
    }
  }
  // 否则按 slug 公开读取 active 商品。
  const product = await getProductBySlug(id);
  if (!product) {
    return Response.json({ ok: false, message: "商品不存在或已下架。" }, { status: 404 });
  }
  return Response.json({ ok: true, product });
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const auth = checkAdmin(request);
  if (!auth.ok) {
    return Response.json({ ok: false, message: auth.message }, { status: auth.status });
  }
  const { id } = await context.params;
  const patch = parseProductInput(await request.json().catch(() => null));
  if (!patch) {
    return Response.json(
      { ok: false, message: "请提供有效的名称、Slug（小写字母/数字/连字符）和主图 URL。" },
      { status: 400 },
    );
  }
  try {
    const updated = await updateProduct(id, patch);
    refreshProductPages([updated.slug]);
    return Response.json({ ok: true, product: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : "更新商品失败。";
    return Response.json({ ok: false, message }, { status: 502 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const auth = checkAdmin(request);
  if (!auth.ok) {
    return Response.json({ ok: false, message: auth.message }, { status: auth.status });
  }
  const { id } = await context.params;
  try {
    await deleteProduct(id);
    refreshProductPages();
    return Response.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "删除商品失败。";
    return Response.json({ ok: false, message }, { status: 502 });
  }
}

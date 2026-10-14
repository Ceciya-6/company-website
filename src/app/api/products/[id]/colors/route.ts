import type { NextRequest } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { checkAdmin } from "@/lib/admin-auth";
import {
  deleteColorImage,
  PRODUCTS_CACHE_TAG,
  uploadColorImage,
} from "@/lib/products-store";
import { translateColorName } from "@/lib/product-translate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** 单张颜色图上限：Airtable uploadAttachment 约 5MB base64，这里留余量。 */
const MAX_FILE_BYTES = 3.5 * 1024 * 1024;

const MIME_EXT: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

function refreshProductPages(slugs: string[] = []) {
  revalidateTag(PRODUCTS_CACHE_TAG, "default");
  revalidatePath("/", "page");
  revalidatePath("/products", "page");
  revalidatePath("/sitemap.xml");
  for (const slug of slugs) revalidatePath(`/products/${slug}`, "page");
}

type RouteContext = { params: Promise<{ id: string }> };

/** 上传 SKU 颜色图：multipart 表单，字段 name（颜色名）+ file（图片）。 */
export async function POST(request: NextRequest, context: RouteContext) {
  const auth = checkAdmin(request);
  if (!auth.ok) {
    return Response.json({ ok: false, message: auth.message }, { status: auth.status });
  }
  const { id } = await context.params;
  try {
    const form = await request.formData();
    const name = String(form.get("name") ?? "").trim().slice(0, 60);
    const file = form.get("file");
    if (!name) {
      return Response.json({ ok: false, message: "请填写颜色名称。" }, { status: 400 });
    }
    if (!file || typeof file === "string" || !file.size) {
      return Response.json({ ok: false, message: "请选择要上传的图片。" }, { status: 400 });
    }
    const ext = MIME_EXT[file.type];
    if (!ext) {
      return Response.json(
        { ok: false, message: "仅支持 JPG / PNG / WebP / GIF 图片。" },
        { status: 400 },
      );
    }
    if (file.size > MAX_FILE_BYTES) {
      return Response.json({ ok: false, message: "图片不能超过 3.5MB。" }, { status: 400 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    // 颜色名以文件名形式存进 Airtable，中文自动译为英文，未收录的词汇原样保留。
    const enName = translateColorName(name);
    const product = await uploadColorImage(id, enName, buffer.toString("base64"), file.type, ext);
    refreshProductPages([product.slug]);
    return Response.json({ ok: true, product });
  } catch (error) {
    const message = error instanceof Error ? error.message : "上传颜色图片失败。";
    return Response.json({ ok: false, message }, { status: 502 });
  }
}

/** 删除 SKU 颜色图：JSON { attachmentId }。 */
export async function DELETE(request: NextRequest, context: RouteContext) {
  const auth = checkAdmin(request);
  if (!auth.ok) {
    return Response.json({ ok: false, message: auth.message }, { status: auth.status });
  }
  const { id } = await context.params;
  const { attachmentId } = (await request.json().catch(() => ({}))) as {
    attachmentId?: string;
  };
  if (!attachmentId) {
    return Response.json({ ok: false, message: "缺少 attachmentId。" }, { status: 400 });
  }
  try {
    const product = await deleteColorImage(id, attachmentId);
    refreshProductPages([product.slug]);
    return Response.json({ ok: true, product });
  } catch (error) {
    const message = error instanceof Error ? error.message : "删除颜色图片失败。";
    return Response.json({ ok: false, message }, { status: 502 });
  }
}

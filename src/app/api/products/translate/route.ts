import type { NextRequest } from "next/server";
import { checkAdmin } from "@/lib/admin-auth";
import {
  translateColorName,
  translateColorsList,
  translateSpec,
} from "@/lib/product-translate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** 管理端「输入中文 → 建议英文」提示接口：?text=...&kind=spec|color|colors */
export async function GET(request: NextRequest) {
  const auth = checkAdmin(request);
  if (!auth.ok) {
    return Response.json({ ok: false, message: auth.message }, { status: auth.status });
  }
  const text = request.nextUrl.searchParams.get("text")?.trim() ?? "";
  const kind = request.nextUrl.searchParams.get("kind") ?? "spec";
  if (!text) return Response.json({ ok: true, translation: "" });
  const translation =
    kind === "color"
      ? translateColorName(text)
      : kind === "colors"
        ? translateColorsList(text)
        : translateSpec(text);
  return Response.json({ ok: true, translation });
}

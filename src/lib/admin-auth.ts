import type { NextRequest } from "next/server";

export type AdminCheck = { ok: true } | { ok: false; status: number; message: string };

/**
 * 管理接口鉴权：请求头 x-admin-token 必须等于环境变量 ADMIN_TOKEN。
 * ADMIN_TOKEN 未配置时所有写接口直接拒绝，避免后台裸露在公网。
 */
export function checkAdmin(request: NextRequest): AdminCheck {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) {
    return {
      ok: false,
      status: 503,
      message: "管理后台未启用：请在环境变量中配置 ADMIN_TOKEN。",
    };
  }
  const provided = request.headers.get("x-admin-token") ?? "";
  if (provided !== expected) {
    return { ok: false, status: 401, message: "管理口令不正确。" };
  }
  return { ok: true };
}

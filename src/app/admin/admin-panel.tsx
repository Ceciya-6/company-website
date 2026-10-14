"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";

type ProductColor = { id: string; name: string; image: string };

type ProductInput = {
  recordId?: string;
  slug: string;
  name: string;
  shortName: string;
  image: string;
  alt: string;
  highlights: string;
  category: string;
  fabric: string;
  sizes: string;
  colors: string;
  moq: string;
  sampleDays: string;
  customOptions: string;
  sellingPoints: string;
  role: string;
  status: string;
  featured: boolean;
  sort: string;
  colorVariants: ProductColor[];
};

type ProductRow = ProductInput & { sort: number };

const EMPTY_FORM: ProductInput = {
  slug: "",
  name: "",
  shortName: "",
  image: "",
  alt: "",
  highlights: "",
  category: "",
  fabric: "",
  sizes: "",
  colors: "",
  moq: "",
  sampleDays: "",
  customOptions: "",
  sellingPoints: "",
  role: "",
  status: "active",
  featured: false,
  sort: "0",
  colorVariants: [],
};

const TEXT_FIELDS: { key: keyof ProductInput; label: string; hint?: string }[] = [
  { key: "name", label: "名称 *", hint: "如 Seamless Yoga Set" },
  { key: "slug", label: "Slug（URL）*", hint: "小写字母、数字、连字符，如 seamless-yoga-set" },
  { key: "shortName", label: "短名称" },
  { key: "category", label: "类别", hint: "如：瑜伽套装 / 紧身裤 / 运动内衣" },
  { key: "image", label: "主图 URL *", hint: "/images/products/xx.jpg 或 https://..." },
  { key: "fabric", label: "面料成分及克重", hint: "如：75% 尼龙 25% 氨纶 · 220gsm" },
  { key: "sizes", label: "尺码", hint: "如：XS–XL，可混码" },
  { key: "colors", label: "颜色", hint: "如：黑 / 灰 / 自定义潘通色" },
  { key: "moq", label: "起订量", hint: "如：100 套（现款加标）" },
  { key: "sampleDays", label: "打样周期", hint: "如：7 天（现款加标）" },
  { key: "sort", label: "排序（数字越小越靠前）" },
];

const TEXTAREA_FIELDS: { key: keyof ProductInput; label: string }[] = [
  { key: "alt", label: "详情页描述文案" },
  { key: "highlights", label: "卖点（每行一条）" },
  { key: "customOptions", label: "定制选项" },
  { key: "sellingPoints", label: "可证明的卖点（1–2 个）" },
];

const inputCls =
  "w-full rounded-sm border border-brand-border bg-white px-3 py-2 text-sm outline-none focus:border-brand-accent";

function toForm(product: ProductRow): ProductInput {
  return { ...product, highlights: product.highlights, sort: String(product.sort ?? 0) };
}

function fromForm(form: ProductInput) {
  return {
    slug: form.slug,
    name: form.name,
    shortName: form.shortName,
    image: form.image,
    alt: form.alt,
    highlights: form.highlights,
    category: form.category,
    fabric: form.fabric,
    sizes: form.sizes,
    colors: form.colors,
    moq: form.moq,
    sampleDays: form.sampleDays,
    customOptions: form.customOptions,
    sellingPoints: form.sellingPoints,
    role: form.role || undefined,
    status: form.status,
    featured: form.featured,
    sort: Number(form.sort) || 0,
  };
}

const STATUS_LABEL: Record<string, string> = {
  active: "在售",
  draft: "草稿",
  archived: "已下架",
};

export function AdminPanel() {
  const [token, setToken] = useState("");
  const [tokenDraft, setTokenDraft] = useState("");
  const [rows, setRows] = useState<ProductRow[]>([]);
  const [source, setSource] = useState<"airtable" | "fallback" | "">("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<ProductInput | null>(null);
  const [colorName, setColorName] = useState("");
  const [colorFile, setColorFile] = useState<File | null>(null);
  const [colorBusy, setColorBusy] = useState(false);

  const api = useCallback(
    async (path: string, init: RequestInit = {}) => {
      const response = await fetch(path, {
        ...init,
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
          ...init.headers,
        },
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.ok === false) {
        throw new Error(data.message || `请求失败（${response.status}）`);
      }
      return data;
    },
    [token],
  );

  const load = useCallback(async () => {
    setLoading(true);
    setNotice("");
    try {
      const data = await api("/api/products?all=1");
      setRows(
        (data.products ?? []).map((product: Record<string, unknown>) => ({
          ...product,
          highlights: Array.isArray(product.highlights)
            ? (product.highlights as string[]).join("\n")
            : String(product.highlights ?? ""),
          colorVariants: Array.isArray(product.colorVariants) ? product.colorVariants : [],
        })) as ProductRow[],
      );
      setSource(data.source ?? "airtable");
      if (data.error) setNotice(data.error);
    } catch (error) {
      setRows([]);
      setSource("");
      setNotice(error instanceof Error ? error.message : "加载失败。");
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    const saved = window.localStorage.getItem("yomega-admin-token");
    if (saved) {
      setToken(saved);
      setTokenDraft(saved);
    }
  }, []);

  useEffect(() => {
    if (token) load();
  }, [token, load]);

  const saveToken = (event: FormEvent) => {
    event.preventDefault();
    const value = tokenDraft.trim();
    window.localStorage.setItem("yomega-admin-token", value);
    setToken(value);
  };

  const saveProduct = async (event: FormEvent) => {
    event.preventDefault();
    if (!editing) return;
    setLoading(true);
    setNotice("");
    try {
      if (editing.recordId) {
        await api(`/api/products/${editing.recordId}`, {
          method: "PATCH",
          body: JSON.stringify(fromForm(editing)),
        });
      } else {
        await api("/api/products", { method: "POST", body: JSON.stringify(fromForm(editing)) });
      }
      setEditing(null);
      await load();
      setNotice("已保存，前台页面已同步刷新。");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "保存失败。");
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (row: ProductRow) => {
    if (!row.recordId) return;
    if (!window.confirm(`确定删除「${row.name}」吗？删除后前台立即下架。`)) return;
    setLoading(true);
    setNotice("");
    try {
      await api(`/api/products/${row.recordId}`, { method: "DELETE" });
      await load();
      setNotice("已删除。");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "删除失败。");
    } finally {
      setLoading(false);
    }
  };

  /** 颜色图走 multipart，不能用统一 JSON 的 api()。 */
  const colorRequest = async (path: string, init: RequestInit = {}) => {
    const response = await fetch(path, {
      ...init,
      headers: { "x-admin-token": token, ...init.headers },
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.ok === false) {
      throw new Error(data.message || `请求失败（${response.status}）`);
    }
    return data as { product: { colorVariants?: ProductColor[] } };
  };

  const syncEditingColors = (colorVariants: ProductColor[] | undefined) => {
    setEditing((current) => (current ? { ...current, colorVariants: colorVariants ?? [] } : current));
  };

  const uploadColor = async (event: FormEvent) => {
    event.preventDefault();
    if (!editing?.recordId || !colorFile) return;
    setColorBusy(true);
    setNotice("");
    try {
      const formData = new FormData();
      formData.set("name", colorName.trim());
      formData.set("file", colorFile);
      const data = await colorRequest(`/api/products/${editing.recordId}/colors`, {
        method: "POST",
        body: formData,
      });
      syncEditingColors(data.product.colorVariants);
      setColorName("");
      setColorFile(null);
      setNotice("颜色已上传，详情页已同步刷新。");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "上传失败。");
    } finally {
      setColorBusy(false);
    }
  };

  const removeColor = async (color: ProductColor) => {
    if (!editing?.recordId) return;
    if (!window.confirm(`确定删除颜色「${color.name}」吗？`)) return;
    setColorBusy(true);
    setNotice("");
    try {
      const data = await colorRequest(`/api/products/${editing.recordId}/colors`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attachmentId: color.id }),
      });
      syncEditingColors(data.product.colorVariants);
      setNotice("颜色已删除，详情页已同步刷新。");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "删除失败。");
    } finally {
      setColorBusy(false);
    }
  };

  return (
    <main className="min-h-screen bg-brand-secondary px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold tracking-[0.2em] text-brand-muted uppercase">YOMEGA</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">商品管理后台</h1>
          </div>
          <a href="/" className="text-sm font-bold text-brand-muted hover:text-brand-accent">
            ← 返回网站首页
          </a>
        </div>

        {!token ? (
          <form onSubmit={saveToken} className="mt-10 max-w-md border border-brand-border bg-brand-card p-6">
            <label className="block text-sm font-bold">管理口令</label>
            <p className="mt-1 text-xs leading-5 text-brand-muted">
              请输入 ADMIN_TOKEN（由网站管理员在 Vercel 环境变量中配置），仅保存在本机浏览器。
            </p>
            <input
              type="password"
              value={tokenDraft}
              onChange={(event) => setTokenDraft(event.target.value)}
              className={`mt-3 ${inputCls}`}
              placeholder="ADMIN_TOKEN"
            />
            <button type="submit" className="quote-cta mt-4 w-full">进入后台</button>
          </form>
        ) : (
          <>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setEditing({ ...EMPTY_FORM })}
                className="quote-cta"
              >
                + 新建商品
              </button>
              <button
                type="button"
                onClick={load}
                disabled={loading}
                className="inline-flex min-h-11 items-center border border-brand-border bg-brand-card px-5 text-sm font-bold hover:border-brand-accent disabled:opacity-50"
              >
                {loading ? "加载中…" : "刷新列表"}
              </button>
              {source && (
                <span className="text-xs text-brand-muted">
                  数据源：{source === "airtable" ? "Airtable" : "内置示例（Airtable 不可用）"}
                </span>
              )}
              <button
                type="button"
                onClick={() => {
                  window.localStorage.removeItem("yomega-admin-token");
                  setToken("");
                  setRows([]);
                }}
                className="ml-auto text-xs font-bold text-brand-muted hover:text-brand-accent"
              >
                退出登录
              </button>
            </div>

            {notice && (
              <p className="mt-4 border border-brand-border bg-brand-card px-4 py-3 text-sm leading-6">
                {notice}
              </p>
            )}

            <div className="mt-6 overflow-x-auto border border-brand-border bg-brand-card">
              <table className="w-full min-w-[820px] text-left text-sm">
                <thead>
                  <tr className="border-b border-brand-border text-xs tracking-[0.12em] text-brand-muted uppercase">
                    <th className="px-4 py-3">商品</th>
                    <th className="px-4 py-3">类别</th>
                    <th className="px-4 py-3">MOQ</th>
                    <th className="px-4 py-3">角色</th>
                    <th className="px-4 py-3">状态</th>
                    <th className="px-4 py-3">排序</th>
                    <th className="px-4 py-3">首页主推</th>
                    <th className="px-4 py-3 text-right">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.recordId ?? row.slug} className="border-b border-brand-border last:border-0">
                      <td className="px-4 py-3">
                        <p className="font-bold">{row.name || "（未命名）"}</p>
                        <p className="text-xs text-brand-muted">/{row.slug}</p>
                      </td>
                      <td className="px-4 py-3">{row.category || "—"}</td>
                      <td className="px-4 py-3">{row.moq || "—"}</td>
                      <td className="px-4 py-3">{row.role || "—"}</td>
                      <td className="px-4 py-3">{STATUS_LABEL[row.status] ?? row.status}</td>
                      <td className="px-4 py-3">{row.sort}</td>
                      <td className="px-4 py-3">{row.featured ? "是" : "否"}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => setEditing(toForm(row))}
                          className="mr-3 font-bold text-brand-primary hover:text-brand-accent"
                        >
                          编辑
                        </button>
                        <button
                          type="button"
                          onClick={() => removeProduct(row)}
                          className="font-bold text-red-600 hover:text-red-700"
                        >
                          删除
                        </button>
                      </td>
                    </tr>
                  ))}
                  {rows.length === 0 && !loading && (
                    <tr>
                      <td colSpan={8} className="px-4 py-10 text-center text-brand-muted">
                        暂无商品。点击「新建商品」添加第一个 SKU。
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {editing && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-4 sm:p-8">
            <form
              onSubmit={saveProduct}
              className="mx-auto max-w-3xl border border-brand-border bg-brand-secondary p-6 sm:p-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">
                  {editing.recordId ? "编辑商品" : "新建商品"}
                </h2>
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="text-sm font-bold text-brand-muted hover:text-brand-accent"
                >
                  取消 ✕
                </button>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {TEXT_FIELDS.map((field) => (
                  <label key={field.key} className="block">
                    <span className="text-xs font-bold tracking-wide">{field.label}</span>
                    <input
                      type="text"
                      value={String(editing[field.key] ?? "")}
                      onChange={(event) =>
                        setEditing({ ...editing, [field.key]: event.target.value })
                      }
                      className={`mt-1 ${inputCls}`}
                    />
                    {field.hint && (
                      <span className="mt-1 block text-[11px] text-brand-muted">{field.hint}</span>
                    )}
                  </label>
                ))}

                {TEXTAREA_FIELDS.map((field) => (
                  <label key={field.key} className="block sm:col-span-2">
                    <span className="text-xs font-bold tracking-wide">{field.label}</span>
                    <textarea
                      rows={3}
                      value={String(editing[field.key] ?? "")}
                      onChange={(event) =>
                        setEditing({ ...editing, [field.key]: event.target.value })
                      }
                      className={`mt-1 ${inputCls}`}
                    />
                  </label>
                ))}

                <label className="block">
                  <span className="text-xs font-bold tracking-wide">角色</span>
                  <select
                    value={editing.role}
                    onChange={(event) => setEditing({ ...editing, role: event.target.value })}
                    className={`mt-1 ${inputCls}`}
                  >
                    <option value="">未指定</option>
                    <option value="引流款">引流款</option>
                    <option value="利润款">利润款</option>
                    <option value="形象款">形象款</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-xs font-bold tracking-wide">状态</span>
                  <select
                    value={editing.status}
                    onChange={(event) => setEditing({ ...editing, status: event.target.value })}
                    className={`mt-1 ${inputCls}`}
                  >
                    <option value="active">在售（前台可见）</option>
                    <option value="draft">草稿（仅后台可见）</option>
                    <option value="archived">已下架</option>
                  </select>
                </label>

                <label className="flex items-center gap-2 text-sm font-bold sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={editing.featured}
                    onChange={(event) => setEditing({ ...editing, featured: event.target.checked })}
                    className="size-4 accent-brand-accent"
                  />
                  在首页「主推产品」区块展示（不勾选则按排序取前 6 个在售商品）
                </label>
              </div>

              <div className="mt-8 border border-brand-border bg-brand-card p-5 sm:p-6">
                <h3 className="text-sm font-bold tracking-wide">SKU 颜色（详情页颜色展示）</h3>
                <p className="mt-1 text-xs leading-5 text-brand-muted">
                  颜色名即上传图片的文件名；支持 JPG / PNG / WebP / GIF，单张不超过 3.5MB。
                </p>

                {editing.recordId ? (
                  <>
                    {editing.colorVariants.length > 0 ? (
                      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {editing.colorVariants.map((color) => (
                          <li
                            key={color.id}
                            className="flex items-center gap-3 border border-brand-border bg-white p-3"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={color.image}
                              alt={color.name}
                              className="size-14 shrink-0 border border-brand-border object-cover"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-bold">{color.name}</p>
                              <button
                                type="button"
                                onClick={() => removeColor(color)}
                                disabled={colorBusy}
                                className="mt-1 text-xs font-bold text-red-600 hover:text-red-700 disabled:opacity-50"
                              >
                                删除
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-4 text-sm text-brand-muted">还没有颜色，先在下方添加。</p>
                    )}

                    <form onSubmit={uploadColor} className="mt-4 flex flex-wrap items-end gap-3">
                      <label className="block w-40">
                        <span className="text-xs font-bold tracking-wide">颜色名称</span>
                        <input
                          type="text"
                          value={colorName}
                          onChange={(event) => setColorName(event.target.value)}
                          placeholder="如：高级黑"
                          className={`mt-1 ${inputCls}`}
                        />
                      </label>
                      <label className="block min-w-0 flex-1">
                        <span className="text-xs font-bold tracking-wide">颜色图片</span>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif"
                          onChange={(event) => setColorFile(event.target.files?.[0] ?? null)}
                          className="mt-1 block w-full text-sm file:mr-3 file:border-0 file:bg-brand-primary file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-brand-accent"
                        />
                      </label>
                      <button
                        type="submit"
                        disabled={colorBusy || !colorName.trim() || !colorFile}
                        className="quote-cta disabled:opacity-50"
                      >
                        {colorBusy ? "上传中…" : "上传颜色"}
                      </button>
                    </form>
                  </>
                ) : (
                  <p className="mt-4 text-sm text-brand-muted">
                    保存商品后，即可在这里上传 SKU 颜色图。
                  </p>
                )}
              </div>

              <div className="mt-8 flex gap-3">
                <button type="submit" disabled={loading} className="quote-cta disabled:opacity-50">
                  {loading ? "保存中…" : "保存"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="inline-flex min-h-12 items-center border border-brand-border bg-brand-card px-6 text-sm font-bold hover:border-brand-accent"
                >
                  取消
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}

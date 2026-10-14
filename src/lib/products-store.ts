import { Product, ProductColor, ProductStatus, getProduct, products as fallbackProducts } from "./products";

const BASE_ID = process.env.AIRTABLE_BASE_ID ?? "app1kcgOwrIxM7bip";
const TABLE_ID = process.env.AIRTABLE_PRODUCTS_TABLE ?? "Products";
const COLOR_FIELD = "Color Images";

export const PRODUCTS_CACHE_TAG = "products";

/** Next.js fetch init used by public pages: 5-minute ISR plus on-demand revalidation. */
export const productsPageFetchInit: RequestInit = {
  next: { tags: [PRODUCTS_CACHE_TAG], revalidate: 300 },
};

type AirtableRecord = { id: string; fields: Record<string, unknown> };

function tableUrl(query = "") {
  return `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_ID)}${query}`;
}

async function airtableRequest(query: string, init: RequestInit = {}) {
  const token = process.env.AIRTABLE_TOKEN;
  if (!token) throw new Error("AIRTABLE_TOKEN is not configured.");
  const response = await fetch(tableUrl(query), {
    ...init,
    ...(init.next || init.cache ? {} : { cache: "no-store" }),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`Airtable ${response.status}: ${JSON.stringify(payload).slice(0, 300)}`);
  }
  return payload as { records?: AirtableRecord[]; id?: string; fields?: Record<string, unknown> };
}

const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");
const num = (value: unknown) =>
  typeof value === "number" && Number.isFinite(value) ? value : 0;

type AirtableAttachment = { id?: string; url?: string; filename?: string };

/** 解析 Airtable 附件字段为 SKU 颜色；颜色名取文件名（去扩展名）。 */
function mapColorVariants(value: unknown): ProductColor[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const colors = value
    .map((item): ProductColor | null => {
      const attachment = item as AirtableAttachment;
      if (!attachment.id || !attachment.url) return null;
      const filename = attachment.filename ?? "";
      return {
        id: attachment.id,
        name: filename.replace(/\.[^.]+$/, "") || filename,
        image: attachment.url,
      };
    })
    .filter((item): item is ProductColor => item !== null);
  return colors.length > 0 ? colors : undefined;
}

export function mapRecord(record: AirtableRecord): Product {
  const fields = record.fields;
  const status = text(fields["Status"]) || "active";
  return {
    recordId: record.id,
    slug: text(fields["Slug"]),
    name: text(fields["Name"]),
    shortName: text(fields["Short Name"]) || text(fields["Name"]),
    image: text(fields["Image URL"]),
    alt: text(fields["Description"]),
    highlights: text(fields["Highlights"])
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean),
    category: text(fields["Category"]),
    fabric: text(fields["Fabric & GSM"]),
    sizes: text(fields["Sizes"]),
    colors: text(fields["Colors"]),
    moq: text(fields["MOQ"]),
    sampleDays: text(fields["Sample Days"]),
    customOptions: text(fields["Custom Options"]),
    sellingPoints: text(fields["Selling Points"]),
    role: text(fields["Role"]),
    status: status as ProductStatus,
    featured: Boolean(fields["Featured"]),
    sort: num(fields["Sort"]),
    colorVariants: mapColorVariants(fields[COLOR_FIELD]),
  };
}

/** 只写入调用方明确提供的字段，方便 PATCH 局部更新。 */
export function productToFields(input: Partial<Product>): Record<string, unknown> {
  const fields: Record<string, unknown> = {};
  const put = (key: string, value: unknown) => {
    if (value !== undefined) fields[key] = value;
  };
  put("Name", input.name);
  put("Slug", input.slug);
  put("Short Name", input.shortName);
  put("Image URL", input.image);
  put("Description", input.alt);
  put("Highlights", input.highlights ? input.highlights.join("\n") : undefined);
  put("Category", input.category);
  put("Fabric & GSM", input.fabric);
  put("Sizes", input.sizes);
  put("Colors", input.colors);
  put("MOQ", input.moq);
  put("Sample Days", input.sampleDays);
  put("Custom Options", input.customOptions);
  put("Selling Points", input.sellingPoints);
  put("Role", input.role);
  put("Status", input.status);
  put("Featured", input.featured);
  put("Sort", input.sort);
  return fields;
}

function cleanInput(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

/** 解析并校验管理后台提交的 JSON，返回可直接建单/更新的 Product 字段。 */
export function parseProductInput(value: unknown): Product | null {
  if (!value || typeof value !== "object") return null;
  const input = value as Record<string, unknown>;
  const product: Product = {
    slug: cleanInput(input.slug, 120),
    name: cleanInput(input.name, 200),
    shortName: cleanInput(input.shortName, 200),
    image: cleanInput(input.image, 500),
    alt: cleanInput(input.alt, 2000),
    highlights: Array.isArray(input.highlights)
      ? input.highlights
          .map((item) => cleanInput(item, 200))
          .filter(Boolean)
          .slice(0, 10)
      : cleanInput(input.highlights, 1000)
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
          .slice(0, 10),
    category: cleanInput(input.category, 80),
    fabric: cleanInput(input.fabric, 200),
    sizes: cleanInput(input.sizes, 200),
    colors: cleanInput(input.colors, 200),
    moq: cleanInput(input.moq, 80),
    sampleDays: cleanInput(input.sampleDays, 80),
    customOptions: cleanInput(input.customOptions, 500),
    sellingPoints: cleanInput(input.sellingPoints, 500),
    role: cleanInput(input.role, 40),
    status: (["active", "draft", "archived"].includes(String(input.status))
      ? String(input.status)
      : "active") as ProductStatus,
    featured: Boolean(input.featured),
    sort: Number.isFinite(Number(input.sort)) ? Number(input.sort) : 0,
  };
  if (!product.name || !/^[a-z0-9][a-z0-9-]*$/.test(product.slug) || !product.image) {
    return null;
  }
  return product;
}

export type ListProductsResult = {
  products: Product[];
  source: "airtable" | "fallback";
  error?: string;
};

function sorted(records: AirtableRecord[]): Product[] {
  return records
    .map(mapRecord)
    .filter((product) => product.slug && product.name)
    .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));
}

export async function listProducts(
  options: { includeInactive?: boolean; init?: RequestInit } = {},
): Promise<ListProductsResult> {
  const query = new URLSearchParams();
  if (!options.includeInactive) query.set("filterByFormula", "{Status}='active'");
  query.append("sort[0][field]", "Sort");
  query.append("sort[0][direction]", "asc");
  query.append("pageSize", "100");
  try {
    const data = await airtableRequest(`?${query}`, options.init ?? {});
    const list = sorted(data.records ?? []);
    if (list.length === 0 && !options.includeInactive) {
      return {
        products: fallbackProducts,
        source: "fallback",
        error: "Airtable Products 表中没有 active 商品，已显示内置示例产品。",
      };
    }
    return { products: list, source: "airtable" };
  } catch (error) {
    if (options.includeInactive) throw error;
    return {
      products: fallbackProducts,
      source: "fallback",
      error: error instanceof Error ? error.message : "Airtable 读取失败。",
    };
  }
}

export async function getProductBySlug(
  slug: string,
  init: RequestInit = {},
): Promise<Product | null> {
  const query = new URLSearchParams({
    filterByFormula: `AND({Slug}='${slug.replaceAll("'", "")}',{Status}='active')`,
  });
  try {
    const data = await airtableRequest(`?${query}`, init);
    const [product] = sorted(data.records ?? []);
    return product ?? null;
  } catch {
    return getProduct(slug) ?? null;
  }
}

export async function createProduct(product: Product) {
  const data = await airtableRequest("", {
    method: "POST",
    body: JSON.stringify({ typecast: true, records: [{ fields: productToFields(product) }] }),
  });
  const [record] = data.records ?? [];
  if (!record) throw new Error("Airtable did not return a record.");
  return mapRecord(record);
}

export async function updateProduct(recordId: string, patch: Partial<Product>) {
  const data = await airtableRequest("", {
    method: "PATCH",
    body: JSON.stringify({
      typecast: true,
      records: [{ id: recordId, fields: productToFields(patch) }],
    }),
  });
  const [record] = data.records ?? [];
  if (!record) throw new Error("Airtable did not return a record.");
  return mapRecord(record);
}

export async function deleteProduct(recordId: string) {
  // Airtable 要求 records[] 数组格式，records=id 会报 INVALID_RECORDS。
  await airtableRequest(`?records%5B%5D=${encodeURIComponent(recordId)}`, { method: "DELETE" });
}

/** 读取单条记录的 Color Images 附件列表。 */
async function listColorAttachments(recordId: string): Promise<AirtableAttachment[]> {
  const data = await airtableRequest(`/${encodeURIComponent(recordId)}`);
  const record = (data as { fields?: Record<string, unknown> }).fields;
  const value = record?.[COLOR_FIELD];
  return Array.isArray(value) ? (value as AirtableAttachment[]) : [];
}

/**
 * 上传一张 SKU 颜色图：写入 Airtable 附件字段（自动追加）。
 * 颜色名 = 文件名（去扩展名），所以这里用「颜色名.扩展名」作为上传文件名。
 * Airtable uploadAttachment 上限约 5MB base64，调用方需先限制文件大小。
 */
export async function uploadColorImage(
  recordId: string,
  name: string,
  base64: string,
  contentType: string,
  ext: string,
): Promise<Product> {
  const token = process.env.AIRTABLE_TOKEN;
  if (!token) throw new Error("AIRTABLE_TOKEN is not configured.");
  const filename = `${name}${ext}`;
  const response = await fetch(
    `https://content.airtable.com/v0/${BASE_ID}/${encodeURIComponent(recordId)}/${encodeURIComponent(COLOR_FIELD)}/uploadAttachment`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contentType, file: base64, filename }),
    },
  );
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`Airtable ${response.status}: ${JSON.stringify(payload).slice(0, 300)}`);
  }
  // uploadAttachment 响应的 fields 以字段 ID 为键，统一回读标准记录格式再映射。
  const reread = await airtableRequest(`/${encodeURIComponent(recordId)}`);
  const record = (reread as AirtableRecord).id
    ? (reread as AirtableRecord)
    : null;
  if (!record) throw new Error("Airtable did not return a record.");
  return mapRecord(record);
}

/** 删除一张 SKU 颜色图：PATCH 保留其余附件。 */
export async function deleteColorImage(recordId: string, attachmentId: string): Promise<Product> {
  const remaining = (await listColorAttachments(recordId)).filter(
    (item) => item.id && item.id !== attachmentId,
  );
  const data = await airtableRequest("", {
    method: "PATCH",
    body: JSON.stringify({
      records: [
        {
          id: recordId,
          fields: { [COLOR_FIELD]: remaining.map((item) => ({ id: item.id })) },
        },
      ],
    }),
  });
  const [record] = data.records ?? [];
  if (!record) throw new Error("Airtable did not return a record.");
  return mapRecord(record);
}

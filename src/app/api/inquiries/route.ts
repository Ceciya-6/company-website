import type { NextRequest } from "next/server";

export const runtime = "nodejs";

type Inquiry = {
  email: string;
  category: string;
  quantity: string;
  name: string;
  company: string;
  whatsapp: string;
  details: string;
  attachmentName: string;
  sourcePage: string;
  referrer: string;
  website: string;
};

type AirtableRecord = {
  id: string;
};

const MAX_LENGTHS: Record<keyof Omit<Inquiry, "website">, number> = {
  email: 254,
  category: 80,
  quantity: 120,
  name: 120,
  company: 160,
  whatsapp: 80,
  details: 4000,
  attachmentName: 255,
  sourcePage: 500,
  referrer: 500,
};

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function parseInquiry(value: unknown): Inquiry | null {
  if (!value || typeof value !== "object") return null;
  const input = value as Record<string, unknown>;
  const inquiry = {
    email: clean(input.email, MAX_LENGTHS.email),
    category: clean(input.category, MAX_LENGTHS.category),
    quantity: clean(input.quantity, MAX_LENGTHS.quantity),
    name: clean(input.name, MAX_LENGTHS.name),
    company: clean(input.company, MAX_LENGTHS.company),
    whatsapp: clean(input.whatsapp, MAX_LENGTHS.whatsapp),
    details: clean(input.details, MAX_LENGTHS.details),
    attachmentName: clean(input.attachmentName, MAX_LENGTHS.attachmentName),
    sourcePage: clean(input.sourcePage, MAX_LENGTHS.sourcePage),
    referrer: clean(input.referrer, MAX_LENGTHS.referrer),
    website: clean(input.website, 200),
  };

  if (!/^\S+@\S+\.\S+$/.test(inquiry.email) || !inquiry.category) return null;
  return inquiry;
}

function requiredEnvironment() {
  const values = {
    resendApiKey: process.env.RESEND_API_KEY,
    inquiryFromEmail: process.env.INQUIRY_FROM_EMAIL,
    inquiryToEmail: process.env.INQUIRY_TO_EMAIL,
    airtableToken: process.env.AIRTABLE_TOKEN,
    airtableBaseId: process.env.AIRTABLE_BASE_ID,
    airtableTableId: process.env.AIRTABLE_TABLE_ID,
    wecomWebhookUrl: process.env.WECOM_WEBHOOK_URL,
  };
  const missing = Object.entries(values)
    .filter(([, value]) => !value)
    .map(([key]) => key);
  return { values, missing };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function airtableRequest(
  endpoint: string,
  token: string,
  init: RequestInit,
) {
  const response = await fetch(`https://api.airtable.com/v0/${endpoint}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
    cache: "no-store",
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`Airtable ${response.status}: ${JSON.stringify(payload)}`);
  }
  return payload;
}

export async function POST(request: NextRequest) {
  const inquiry = parseInquiry(await request.json().catch(() => null));
  if (!inquiry) {
    return Response.json({ ok: false, message: "请填写有效的工作邮箱和产品类别。" }, { status: 400 });
  }

  // Hidden honeypot: bots commonly fill this field, people never see it.
  if (inquiry.website) {
    return Response.json({ ok: true, inquiryId: "accepted" });
  }

  const { values, missing } = requiredEnvironment();
  if (missing.length > 0) {
    console.error("Inquiry integration is missing environment variables:", missing);
    return Response.json({ ok: false, message: "询盘通道正在配置，请稍后重试或直接联系 WhatsApp。" }, { status: 503 });
  }

  const {
    resendApiKey,
    inquiryFromEmail,
    inquiryToEmail,
    airtableToken,
    airtableBaseId,
    airtableTableId,
    wecomWebhookUrl,
  } = values as Record<string, string>;

  const inquiryId = crypto.randomUUID();
  const submittedAt = new Date().toISOString();
  const ip = clean(request.headers.get("x-forwarded-for")?.split(",")[0], 80) || "Unavailable";
  const country = clean(request.headers.get("x-vercel-ip-country"), 80) || "Unavailable";
  const region = clean(request.headers.get("x-vercel-ip-country-region"), 120);
  const city = clean(request.headers.get("x-vercel-ip-city"), 120);
  const location = [country, region, city].filter(Boolean).join(" / ");
  const followUpAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  const endpoint = `${airtableBaseId}/${encodeURIComponent(airtableTableId)}`;

  let airtableRecord: AirtableRecord | undefined;

  try {
    const created = (await airtableRequest(endpoint, airtableToken, {
      method: "POST",
      body: JSON.stringify({
        typecast: true,
        records: [
          {
            fields: {
              "Inquiry ID": inquiryId,
              "Submitted At": submittedAt,
              "Customer Name": inquiry.name || "Not provided",
              Country: location,
              Product: inquiry.category,
              "Source Page": inquiry.sourcePage || "Unknown",
              Status: "Processing",
              Owner: "Ceciya",
              "Next Follow-up": followUpAt,
              "Work Email": inquiry.email,
              WhatsApp: inquiry.whatsapp,
              Quantity: inquiry.quantity,
              "Company / Brand": inquiry.company,
              "Project Details": inquiry.details,
              "Attachment Name": inquiry.attachmentName,
              IP: ip,
              Referrer: inquiry.referrer,
              "Delivery Status": "Pending email and WeCom notification",
            },
          },
        ],
      }),
    })) as { records?: AirtableRecord[] };
    airtableRecord = created.records?.[0];
    if (!airtableRecord) throw new Error("Airtable did not return a record ID.");

    const rows = [
      ["Inquiry ID", inquiryId],
      ["Submitted at", submittedAt],
      ["Work email", inquiry.email],
      ["Name", inquiry.name || "Not provided"],
      ["Company / Brand", inquiry.company || "Not provided"],
      ["WhatsApp", inquiry.whatsapp || "Not provided"],
      ["Product", inquiry.category],
      ["Quantity", inquiry.quantity || "To be confirmed"],
      ["Project details", inquiry.details || "Not provided"],
      ["Attachment", inquiry.attachmentName || "None"],
      ["Source page", inquiry.sourcePage || "Unknown"],
      ["Referrer", inquiry.referrer || "Direct / unavailable"],
      ["IP / location", `${ip} · ${location}`],
    ];
    const emailHtml = `<h2>New YOUMEGA website inquiry</h2><table style="border-collapse:collapse;width:100%;max-width:760px">${rows
      .map(([label, value]) => `<tr><th style="border:1px solid #ddd;padding:10px;text-align:left;vertical-align:top">${escapeHtml(label)}</th><td style="border:1px solid #ddd;padding:10px;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`)
      .join("")}</table>`;
    const emailText = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

    const [emailResponse, wecomResponse] = await Promise.all([
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `youmega-inquiry/${inquiryId}`,
          "User-Agent": "YOUMEGA-Website/1.0",
        },
        body: JSON.stringify({
          from: inquiryFromEmail,
          to: [inquiryToEmail],
          reply_to: inquiry.email,
          subject: `[Website Inquiry] ${inquiry.category} · ${inquiry.company || inquiry.name || inquiry.email}`,
          html: emailHtml,
          text: emailText,
          tags: [{ name: "inquiry_id", value: inquiryId.replaceAll("-", "_") }],
        }),
      }),
      fetch(wecomWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          msgtype: "markdown",
          markdown: {
            content: [
              "## 🔔 YOUMEGA 新询盘",
              `> 产品：<font color=\"warning\">${inquiry.category}</font>`,
              `> 客户：${inquiry.company || inquiry.name || "未填写"}`,
              `> 邮箱：${inquiry.email}`,
              `> 数量：${inquiry.quantity || "待确认"}`,
              `> 来源：${inquiry.sourcePage || "未知"}`,
              `> 地区：${location}`,
              `> 询盘编号：${inquiryId}`,
            ].join("\n"),
          },
        }),
      }),
    ]);

    const emailPayload = await emailResponse.json().catch(() => ({}));
    if (!emailResponse.ok) {
      throw new Error(`Resend ${emailResponse.status}: ${JSON.stringify(emailPayload)}`);
    }
    const wecomPayload = (await wecomResponse.json().catch(() => ({}))) as { errcode?: number; errmsg?: string };
    if (!wecomResponse.ok || wecomPayload.errcode !== 0) {
      throw new Error(`WeCom ${wecomResponse.status}: ${JSON.stringify(wecomPayload)}`);
    }

    await airtableRequest(endpoint, airtableToken, {
      method: "PATCH",
      body: JSON.stringify({
        typecast: true,
        records: [
          {
            id: airtableRecord.id,
            fields: {
              Status: "New lead",
              "Delivery Status": `Email queued (${emailPayload.id ?? "accepted"}); WeCom delivered`,
            },
          },
        ],
      }),
    });

    return Response.json({ ok: true, inquiryId });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown inquiry delivery error";
    console.error("Inquiry delivery failed:", message);
    if (airtableRecord) {
      await airtableRequest(endpoint, airtableToken, {
        method: "PATCH",
        body: JSON.stringify({
          typecast: true,
          records: [{ id: airtableRecord.id, fields: { Status: "Delivery issue", "Delivery Status": message.slice(0, 1000) } }],
        }),
      }).catch((airtableError) => console.error("Failed to mark Airtable delivery issue:", airtableError));
    }
    return Response.json({ ok: false, message: "发送未完成，请稍后重试或直接联系 WhatsApp。" }, { status: 502 });
  }
}

# YOUMEGA 询盘自动化配置与验收

网站表单只有在以下三项全部完成后才显示“发送成功”：

1. Resend 接受企业邮箱通知任务；
2. 企业微信群机器人确认收到提醒；
3. Airtable 新增记录，并把状态从 `Processing` 更新为 `New lead`。

任一服务失败时，页面显示“发送未完成”，Airtable 中已经创建的记录会标记为 `Delivery issue`，方便排查，不会把失败误报为成功。

## Airtable 表结构

创建一个名为 `YOUMEGA Website Inquiries` 的 Base，并创建 `Inquiries` 表。字段名称必须完全一致：

本项目已在 Airtable 中创建该 Base；Base ID 为 `app1kcgOwrIxM7bip`，表 ID 为 `tblHpJwa0UxSey3rA`。ID 不是访问密钥，但仍建议只在运维配置中使用。

| 字段 | 建议类型 |
| --- | --- |
| Inquiry ID | Single line text（主字段） |
| Submitted At | Date，包含时间 |
| Customer Name | Single line text |
| Country | Single line text |
| Product | Single line text |
| Source Page | Single line text |
| Status | Single select：Processing、New lead、Delivery issue |
| Owner | Single line text |
| Next Follow-up | Date，包含时间 |
| Work Email | Email |
| WhatsApp | Phone number 或 Single line text |
| Quantity | Single line text |
| Company / Brand | Single line text |
| Project Details | Long text |
| Attachment Name | Single line text |
| IP | Single line text |
| Referrer | URL 或 Single line text |
| Delivery Status | Long text |

Airtable Token 只授予这个 Base 的 `data.records:read` 与 `data.records:write` 权限。

## Vercel 环境变量

把 `.env.example` 中的七个变量分别加入 Vercel 项目的 Production、Preview 和 Development 环境。密钥不要粘贴进源码、GitHub Issue 或聊天消息。修改环境变量后重新部署。

## 三条真实测试询盘

部署完成后，用不同测试编号提交三次，例如：

- `QA-01`：Yoga Set / 100 sets / source `homepage`
- `QA-02`：Leggings / 300 pcs / source `products`
- `QA-03`：Sports Bras / 500 pcs / source `faq`

每次都必须看到页面“发送成功”和唯一询盘编号。随后逐项核对：

- 企业邮箱收到 3 封标题以 `[Website Inquiry]` 开头的邮件；邮件内有来源页、提交时间、IP/地区和对应询盘编号。
- 企业微信群收到 3 条“YOUMEGA 新询盘”提醒；负责人手机在企业微信通知开启时响铃或震动。
- Airtable `Inquiries` 表新增 3 行；三行状态均为 `New lead`，Delivery Status 同时包含 Email queued 与 WeCom delivered。
- 三处的询盘编号逐条一致。只有编号一致，才能证明邮件、提醒和台账来自同一次提交。

如果页面显示失败，先到 Airtable 检查是否有 `Delivery issue`，再查看 Vercel Functions 日志中的服务名和 HTTP 状态。不要在截图中暴露 token 或 webhook 地址。

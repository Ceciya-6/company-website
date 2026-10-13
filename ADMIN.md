# YOMEGA 商品管理后台

入口：`/admin`（例如 https://iyomega.com/admin）。页面已设置 `noindex`，不会被搜索引擎收录。

## 登录

管理后台使用口令鉴权：

1. 口令就是 Vercel 环境变量 `ADMIN_TOKEN`（`production` / `preview` / `development` 三个环境均已配置，本地开发副本在 `.env.development.local`）。
2. 打开 `/admin`，输入口令；口令只保存在本机浏览器 `localStorage`。
3. `ADMIN_TOKEN` 未配置或口令错误时，所有写接口返回 401/503，不会暴露数据。

接口层鉴权方式：请求头 `x-admin-token: <ADMIN_TOKEN>`。

## 商品 CRUD 接口

| 方法 | 路径 | 鉴权 | 说明 |
| --- | --- | --- | --- |
| GET | `/api/products` | 公开 | 在售商品（Status=active），Airtable 故障时自动回退内置示例商品 |
| GET | `/api/products?all=1` | 管理 | 全部商品（含草稿/下架） |
| POST | `/api/products` | 管理 | 新建商品，Body 为商品 JSON |
| GET | `/api/products/{id}` | slug 公开 / `rec...` 管理 | 单个商品；`rec` 开头为 Airtable 记录 ID |
| PATCH | `/api/products/{id}` | 管理 | 按记录 ID 更新（`rec...`） |
| DELETE | `/api/products/{id}` | 管理 | 按记录 ID 删除（`rec...`） |

写操作成功后自动 `revalidatePath` 首页、产品中心和对应详情页（ISR 缓存 5 分钟内也会自动过期）。

商品 JSON 字段（大小写敏感）：

```json
{
  "slug": "seamless-yoga-set",
  "name": "Seamless Yoga Set",
  "shortName": "Seamless Yoga Set",
  "image": "/images/products/xx.jpg",
  "alt": "详情页描述文案",
  "highlights": ["卖点一", "卖点二"],
  "category": "瑜伽套装",
  "fabric": "75% 尼龙 25% 氨纶 · 220gsm",
  "sizes": "XS–XL，可混码",
  "colors": "黑 / 灰 / 潘通定制",
  "moq": "100 套（现款加标）",
  "sampleDays": "7 天（现款加标）",
  "customOptions": "Logo 热转印 / 织标 / 定制包装",
  "sellingPoints": "可证明的卖点（1–2 个）",
  "role": "引流款",
  "status": "active",
  "featured": true,
  "sort": 10
}
```

`status` 取值：`active`（在售，前台可见）/ `draft`（草稿）/ `archived`（下架）。`featured=true` 的商品在首页「主推产品」区块优先展示；没有 featured 商品时按 `sort` 取前 6 个在售商品。

## Airtable 存储

商品存放在与询盘同一个 Base（`app1kcgOwrIxM7bip`）的 **Products** 表（表名必须完全一致，可用环境变量 `AIRTABLE_PRODUCTS_TABLE` 覆盖）。当前令牌只有 `data.records:read/write` 权限，**无法用 API 建表**，需要在 Airtable 界面手动创建：

| 字段名 | 类型 |
| --- | --- |
| Name | Single line text（主字段） |
| Slug | Single line text |
| Short Name | Single line text |
| Category | Single line text |
| Image URL | Single line text |
| Description | Long text |
| Highlights | Long text（每行一条卖点） |
| Fabric & GSM | Single line text |
| Sizes | Single line text |
| Colors | Single line text |
| MOQ | Single line text |
| Sample Days | Single line text |
| Custom Options | Long text |
| Selling Points | Long text |
| Role | Single line text（建议值：引流款 / 利润款 / 形象款） |
| Status | Single line text（`active` / `draft` / `archived`） |
| Featured | Checkbox |
| Sort | Number |

用 Single line text 而非 Single select，是为了避免写入新选项时因令牌权限不足失败。

## 验收记录

- 2026-10-13：接口与后台部署上线；鉴权（无口令/错误口令 → 401）通过；建表前写接口按预期返回 Airtable 403（`INVALID_PERMISSIONS_OR_MODEL_NOT_FOUND`）。待 Products 表创建后回归：建 → 读 → 改 → 删。

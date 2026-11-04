# 访问统计（GA4）接入说明

站点原本没有任何访客统计，所有流量数据都无从查看。本文档记录已经接好的方案，以及上线后怎么用。

## 已经接好的东西

| 文件 | 作用 |
| --- | --- |
| `src/components/google-analytics.tsx` | GA4 基础代码（gtag.js），仅在配置了 `NEXT_PUBLIC_GA_ID` 时输出 |
| `src/app/layout.tsx` | 挂载统计组件；同时支持 Search Console 的 HTML 验证标记 |
| `src/components/quote-form.tsx` | 询盘提交成功后上报 `generate_lead` 转化事件 |
| `src/types/gtag.d.ts` | `window.gtag` 的类型声明 |

没配 `NEXT_PUBLIC_GA_ID` 时，页面会使用代码里的默认 ID `G-MZWMS71TF7`；把它显式设成空字符串才会关掉统计。

## 当前配置

| 项 | 值 |
| --- | --- |
| GA4 衡量 ID | `G-MZWMS71TF7` |
| 代码里的默认值 | `src/components/google-analytics.tsx` 的 `DEFAULT_GA_ID` |
| Vercel 环境变量 | 可选，不配也能统计（默认值兜底） |

衡量 ID 会公开出现在网页源码里，属于公开信息，写进仓库没有安全问题。

## 上线（代码合并后自动部署即可）

### 1. 合并到 main

Vercel 会自动构建部署。部署完成后打开 <https://iyomega.com> 即可，不需要再手动配环境变量。

### 2. 想用别的 ID 或临时关掉

Vercel 项目 → Settings → Environment Variables：

| Name | Value | 效果 |
| --- | --- | --- |
| `NEXT_PUBLIC_GA_ID` | 另一个 `G-XXXX` | 覆盖默认 ID |
| `NEXT_PUBLIC_GA_ID` | 空字符串 | 关闭统计，页面不输出任何脚本 |

`NEXT_PUBLIC_` 前缀是**构建时**写进产物的，改完必须 Redeploy 才生效。

本地开发想不上报：在仓库根目录建 `.env.local`，写一行 `NEXT_PUBLIC_GA_ID=` 即可。不加的话本地访问也会记进 GA，用「管理 → 数据流 → 配置标记设置」按 hostname 排除 `localhost` 也行。

### 3. 验证

部署完成后打开 <https://iyomega.com>，然后：

- GA4 → 报告 → **实时**：应能看到 1 个用户和当前页面
- 页面源码里搜索 `googletagmanager.com/gtag/js?id=G-`：能找到说明挂载成功
- 在站内点几次页面切换，实时报告里的页面路径应跟着变（GA4 的「增强衡量」默认会记录 History 变化）

## 上线后看哪里

| 想知道 | GA4 位置 |
| --- | --- |
| 今天多少人访问 | 报告 → 获取 → **流量获取**；或首页概览的「用户数」 |
| 哪些页面最受欢迎 | 报告 → 互动 → **页面和屏幕** |
| 访客从哪来 | 报告 → 获取 → 流量获取（自然搜索 / 直接 / 引荐 / 付费） |
| 哪些国家 | 报告 → 用户 → **用户属性** → 国家 |
| 询盘转化 | 报告 → 互动 → **转化**，事件名 `generate_lead` |

「用户数」才是人，「会话数」是访问次数。同一个人一天来三次 = 1 用户 / 3 会话。

## 建议同时开 Google Search Console

GA4 只能看到「已经进站的人」，Search Console 能看到**搜索曝光和点击**，是自然流量最直接的数据源：

1. 打开 <https://search.google.com/search-console>，添加「网域」资源 `iyomega.com`
2. 按提示在域名 DNS 加一条 TXT 记录（推荐，最稳），或选择「HTML 标记」把 content 值填进 `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
3. 验证通过后提交 `https://iyomega.com/sitemap.xml`（仓库里已有 `src/app/sitemap.ts` 自动生成）
4. 数据一般 2–3 天后开始累积

## 合规提醒

GA4 会在访客浏览器写 cookie。面向欧盟访客严格来说需要 cookie 同意横幅。如果主要客户在北美/中东，可以先不上；若后续要投欧洲广告，再补一个同意管理组件。

## 备选方案

如果想零代码、零 cookie、额度便宜，可以开 **Vercel Web Analytics**：Vercel 项目 → Analytics → Enable，然后把 `@vercel/analytics` 的 `<Analytics />` 加到 layout。缺点是免费额度只有约 2.5k 事件/月，且拿不到搜索关键词。

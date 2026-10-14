"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "zh" | "en";

const STORAGE_KEY = "yomega-lang";

const zh = {
  common: {
    getQuote: "获取报价",
    browseProducts: "浏览产品",
    whatsappQuote: "通过 WhatsApp 获取报价",
  },
  nav: {
    home: "首页",
    about: "关于我们",
    products: "产品中心",
    faq: "常见问题",
    cta: "Contact / Get a Quote",
    mainNav: "主导航",
    mobileNav: "移动端主导航",
    openMenu: "打开导航菜单",
    closeMenu: "关闭导航菜单",
  },
  footer: {
    blurb:
      "我们具备无缝和裁剪缝制运动服供应能力，为客户提供从产品开发到成衣交付的一体化服务。",
    contact: "Contact",
    rights: "版权所有。",
    homeAria: "YOMEGA 首页",
  },
  home: {
    heroEyebrow: "Xiamen · China · OEM / ODM · Private Label",
    heroTitleA: "为自有品牌提供专业运动服",
    heroTitleB: "OEM",
    heroTitleC: "定制",
    heroSubtitle:
      "厦门运动服供应商，提供现款加标、OEM/ODM 开发、定制包装及样品和大货生产服务。现款加标 100 套起订。",
    trustExperience: "年出口经验",
    trustStyles: "可选款式",
    trustSamplingValue: "7 天",
    trustSampling: "现款加标打样",
    trustMoqValue: "100 套",
    trustMoq: "现款加标起订",
    advEyebrow: "Why YOMEGA",
    advTitle: "从第一件样品，到完整品牌项目",
    adv1Title: "小批量启动",
    adv1Text: "现款加标 100 套起订，可混颜色和尺码，帮助品牌控制首批库存。",
    adv2Title: "从参考图开发",
    adv2Text: "支持根据参考图或样衣推进面料、版型、颜色及样品开发。",
    adv3Title: "完整品牌配套",
    adv3Text: "支持 Logo、标签、吊牌与包装定制，把想法落实为可交付产品。",
    adv4Title: "可检查的质量控制",
    adv4Text: "厂内完成质量检验和包装，成衣检验口径为 AQL 2.5。",
    prodEyebrow: "Featured Products",
    prodTitle: "主推产品",
    prodAll: "查看产品中心",
    step1Eyebrow: "01 / FAQ",
    step1Title: "解决合作前的疑问",
    step1Text: "查看 MOQ、样品、定制、交期与运输等常见问题。",
    step1Link: "查看常见问题",
    step2Eyebrow: "02 / CAPABILITY",
    step2Title: "了解我们的生产能力",
    step2Text: "了解无缝与裁剪缝制供应能力，以及厂内生产流程。",
    step2Link: "关于 YOMEGA",
    step3Eyebrow: "03 / GET A QUOTE",
    step3Title: "把您的想法发给我们",
    step3Text: "提交参考图、产品品类和预计数量，我们将在工作日 24 小时内回复。",
    step3Link: "我也要类似方案",
    note: "现款加标和全定制项目的具体起订量、样品周期与大货交期，将根据款式和匹配面料重新确认。",
  },
  products: {
    eyebrow: "YOMEGA",
    title: "产品中心",
    subtitle: "探索最新瑜伽与运动款式，支持 OEM/ODM 与自有品牌生产。",
    catalog: "下载产品目录",
    viewDetails: "查看产品详情 →",
  },
  detail: {
    back: "返回产品中心",
    eyebrow: "YOMEGA · OEM / ODM",
    colorsTitle: "可选颜色",
    specFabric: "面料成分及克重",
    specSizes: "尺码",
    specColors: "颜色",
    specMoq: "起订量",
    specSample: "打样周期",
    specCustom: "定制选项",
    fallback:
      "面料成分、克重、颜色、尺码、定制方式、样品周期和本款 MOQ 将根据您的项目要求确认。",
    cta: "就这款产品询盘",
  },
  about: {
    title: "About Us",
    whoTitle: "Who We Are",
    whoIntro:
      "YOMEGA is the activewear brand and manufacturing arm of Xiamen Mega Garment Co., Ltd. We have been serving export sales and private-label manufacturing since 2017, with a team of approximately 238 people today.",
    who1: "Brand: YOMEGA",
    who2: "Legal entity: Xiamen Mega Garment Co., Ltd.",
    who3: "Export sales & branded manufacturing since: 2017",
    who4: "Team size: approximately 238 people",
    whatTitle: "What We Do",
    whatIntro:
      "We supply both seamless and cut-and-sew activewear, offering an end-to-end service that takes each project from product development through to finished-garment delivery.",
    what1:
      "In-house: pattern making, sampling, cutting, sewing, knitting, logo printing & application, quality inspection and packing",
    what2:
      "Outsourced: standard fabric production, dyeing and logo manufacturing; special logo techniques confirmed on a per-order basis",
    what3: "Core women's categories: leggings, biker shorts, sports bras and tops",
    what4: "Verifiable certifications & systems: OEKO-TEX Standard 100, BSCI, GRS, GCC",
    what5: "Finished-garment inspection standard: AQL 2.5",
    what6: "Stock without logo: from 50 sets, with mixed colors and sizes",
    what7: "Stock with logo: 100 pieces in total, with mixed styles, colors and sizes",
    whyTitle: "Why Work With Us",
    why1Title: "Low MOQ",
    why1Text:
      "Flexible minimum order quantities that lower the barrier to launching new styles and testing the market.",
    why2Title: "ODM / OEM Production",
    why2Text:
      "Custom fabrics, fits, logos, labels, colors and packaging, tailored to each brand's product requirements.",
    why3Title: "From Idea to Real Product",
    why3Text:
      "Fully custom samples are delivered in around {days}. A good factory helps you turn ideas into real, deliverable products.",
    why3Days: "12–15 days",
  },
  cases: {
    eyebrow: "Customer Cases",
    title: "客户合作案例",
    intro:
      "从小批量品牌启动到全定制开发，我们根据产品阶段、目标数量和交付要求制定适合的合作路径。",
    case1Eyebrow: "STOCK + LOGO",
    case1Title: "小批量品牌启动",
    case1Text:
      "通过现款加 Logo 方案从 100 套起步，可混颜色和尺码，帮助品牌先验证市场需求并控制首批库存。",
    case2Eyebrow: "OEM / ODM",
    case2Title: "从参考图到产品样品",
    case2Text:
      "根据参考图片、样衣或需求说明推进面料、版型、颜色、Logo、标签和包装，完成可确认的产品样品。",
    case3Eyebrow: "QUALITY + DELIVERY",
    case3Title: "大货质量与交付",
    case3Text:
      "样品确认后进入生产，按照项目要求完成质量检验、包装与物流准备，并在关键节点同步进度。",
    ctaTitle: "告诉我们您的产品计划",
    ctaText: "提交参考图片、产品类别和预计数量，我们将在工作日 24 小时内回复。",
    ctaButton: "获取报价",
    ariaLabel: "客户合作场景",
  },
  contact: {
    eyebrow: "开始询价",
    titleA: "准备制作",
    titleB: "您的产品？",
    intro:
      "您不需要准备一份完美的技术资料包。只需提供参考图片、草图，或者告诉我们您的需求即可，剩下的我们一起解决。",
    check1: "发送您的 Logo，我们将免费制作效果图",
    check2: "咨询 MOQ、交货时间和样品费用",
    check3: "工作日 24 小时内获得报价信息",
    catalogTitle: "获取实时目录链接",
    catalogSub: "产品目录 · 更新于 2026 年",
    emailLabel: "电子邮件",
    whatsappLabel: "WhatsApp",
    trustEyebrow: "Buyer Confidence",
    trustTitle: "合作前，每一项都说清楚",
    trustIntro:
      "认证、包装、物流、交易条件和响应承诺均按项目逐项确认。费用与时效示例只用于初步判断，最终以款式、货量、目的地和正式订单为准。",
    s1Title: "认证与合规",
    s1Items: [
      "YOMEGA 持有 OEKO-TEX Standard 100 认证，供应商资质审核期间可按要求提供文件。",
      "GRS 范围证书：由相应工厂或染厂持有；BSCI：工厂通过 amfori BSCI 社会责任审核。",
      "出口欧盟与美国的货物按 REACH、CPSIA 要求准备，具体证书主体、覆盖范围和有效期以文件为准。",
      "供应商资质审核期间，可按要求提供对应认证文件。",
    ],
    s2Title: "品牌包装",
    s2Items: [
      "支持单件独立包装袋、品牌包装袋、外箱标记和电商物流包装。",
      "可根据客户仓库或电商物流中心要求，配置从内包装到品牌外箱的方案。",
      "下单前逐项确认包装材质、尺寸、品牌印刷、外箱标记、装箱数量和定制费用。",
    ],
    s3Title: "物流选择",
    s3Items: [
      "海运拼箱 LCL：页面示例为 28–45 天，适合小于 10m³ 的货量。",
      "海运整箱 FCL：页面示例为 25–40 天，20 尺柜约适合 10–25m³。",
      "空运：页面示例为 5–10 天，适合样品、紧急补货或 200kg 以下批次。",
      "可从厦门、深圳、宁波、上海等中国港口安排 FOB 发运；运费和时效以订舱时确认为准。",
    ],
    s4Title: "交易条件",
    s4Items: [
      "支持 FOB、CIF、DDP、EXW，卖方与买方责任按正式订单约定。",
      "首次订单或无自有货代的小批量项目，可优先比较 DDP；中等货量可比较 CIF。",
      "经常发货或有自有货代的项目，可优先比较 FOB；中国境内有物流整合能力时可考虑 EXW。",
      "MOQ、样品费、付款方式、定金与尾款比例、报价有效期和售后安排均在正式报价或合同中确认。",
    ],
    s5Title: "响应承诺",
    s5Items: [
      "工作日 24 小时内回复，并提供面料选择、价格和样品制作时间表等报价信息。",
      "您不必先准备完整技术资料包；参考图片、草图或需求描述都可以作为开发起点。",
      "发送 Logo 后可免费制作效果图，并解答 MOQ、交货时间和样品费用问题。",
      "邮箱只用于报价和后续跟进；设计资料与咨询信息将按保密要求处理。",
    ],
    logisticsNote:
      "物流费用、税费、保险、清关安排及预计到货时间会因目的国、体积、重量和订舱情况变化，我们会在正式报价中逐项列明。",
  },
  faq: {
    eyebrow: "Manufacturing FAQ",
    title: "常见问题解答。",
    subtitle:
      "来自厦门运动服 OEM 工厂的直接回答：最低起订量、样品、质量控制、运输、面料、合规性和品牌规模化。",
    searchLabel: "搜索常见问题",
    searchPlaceholder: "搜索常见问题——面料、最低起订量、质量控制、运输……",
    clearAria: "清除搜索",
    resultCount: "找到 {count} 条相关问答，来自 {topics} 个主题。",
    totalCount: "{topics} 个主题，共 {count} 条问答。",
    navLabel: "FAQ 主题导航",
    noResultsTitle: "没有找到相关问题",
    noResultsText: "请尝试搜索 MOQ、样品、面料、AQL、DDP 或其他关键词。",
    noResultsBtn: "清除搜索",
    ctaEyebrow: "Still have questions?",
    ctaTitle: "没有找到您需要的答案？",
    ctaText: "把参考图片、目标数量和市场发给我们，我们将在工作日 24 小时内回复。",
    contentNote: "",
  },
  form: {
    eyebrow: "快速询价",
    intro: "填写您的项目信息，我们将提供面料选择、价格和样品制作时间表。",
    stepLabel: "询价表第 {step} 步，共 2 步",
    step1: "基本信息",
    step2: "更多信息",
    step1Hint: "只需填写两项必填信息，即可继续完善询价。",
    email: "工作邮箱",
    category: "产品类别",
    select: "请选择",
    quantity: "预计数量",
    optional: "（可选）",
    qtyPh: "例如：300–500 件",
    continue: "继续",
    privacy1: "我们不会发送垃圾邮件，邮箱仅用于报价和后续跟进。",
    step2Hint: "快完成了。这些信息将帮助我们准备更准确的报价。",
    name: "您的姓名",
    namePh: "您的姓名",
    company: "公司 / 品牌",
    companyPh: "品牌名称",
    whatsappPh: "+1 555 123 4567",
    details: "项目详情",
    detailsPh: "例如：需要 500 条高腰紧身裤，腰部需要热转印 Logo。",
    attach: "选择参考资料以记录文件名（原件稍后通过 WhatsApp 补发）",
    fileTooBig: "文件超过 10MB，请压缩后重新选择。",
    website: "网站",
    privacy2: "您的设计资料将保密处理，不会对外分享。",
    back: "返回",
    submitting: "正在安全发送…",
    submit: "获取我的报价（24 小时内）",
    step2Note: "我们将在工作日 24 小时内回复。信息仅用于回复您的咨询。",
    successKicker: "发送成功",
    successTitle: "我们已收到您的询盘",
    successText:
      "邮件通知、负责人提醒和线索台账已经同步完成。我们将在工作日 24 小时内回复。",
    inquiryId: "询盘编号",
    fileRecorded: "已记录文件名 {name}。请通过 WhatsApp 补发文件原件，并注明上方询盘编号。",
    whatsappFollow: "在 WhatsApp 补充信息",
    genericError: "发送未完成，请稍后重试。",
    productPrefix: "我想咨询这款产品：",
  },
};

const en: typeof zh = {
  common: {
    getQuote: "Get a Quote",
    browseProducts: "Browse Products",
    whatsappQuote: "Get a quote via WhatsApp",
  },
  nav: {
    home: "Home",
    about: "About",
    products: "Products",
    faq: "FAQ",
    cta: "Contact / Get a Quote",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
  },
  footer: {
    blurb:
      "Seamless and cut-&-sew activewear manufacturing, from product development to finished-garment delivery.",
    contact: "Contact",
    rights: "All rights reserved.",
    homeAria: "YOMEGA homepage",
  },
  home: {
    heroEyebrow: "Xiamen · China · OEM / ODM · Private Label",
    heroTitleA: "Professional Activewear",
    heroTitleB: "OEM",
    heroTitleC: "for Your Private Label",
    heroSubtitle:
      "Xiamen activewear supplier: stock styles with your logo, OEM/ODM development, custom packaging, sampling and bulk production. Stock + logo from 100 sets.",
    trustExperience: "Years of export experience",
    trustStyles: "Ready styles",
    trustSamplingValue: "7 days",
    trustSampling: "Sampling, stock + logo",
    trustMoqValue: "100 sets",
    trustMoq: "MOQ, stock + logo",
    advEyebrow: "Why YOMEGA",
    advTitle: "From first sample to full brand program",
    adv1Title: "Small-batch launch",
    adv1Text:
      "Stock styles with your logo from 100 sets, mixed colors and sizes, keeping first inventory under control.",
    adv2Title: "Develop from a reference",
    adv2Text:
      "Develop fabrics, fits, colors and samples from your reference images or sample garments.",
    adv3Title: "Full branding support",
    adv3Text:
      "Logo, labels, hang tags and packaging customization — turning ideas into deliverable products.",
    adv4Title: "Inspectable quality control",
    adv4Text:
      "In-house inspection and packing, with AQL 2.5 as the finished-garment inspection standard.",
    prodEyebrow: "Featured Products",
    prodTitle: "Featured Products",
    prodAll: "View all products",
    step1Eyebrow: "01 / FAQ",
    step1Title: "Answers before you commit",
    step1Text: "MOQ, samples, customization, lead time and shipping — covered upfront.",
    step1Link: "Browse the FAQ",
    step2Eyebrow: "02 / CAPABILITY",
    step2Title: "See how we produce",
    step2Text:
      "Seamless and cut-&-sew capacity, plus an inside look at our production flow.",
    step2Link: "About YOMEGA",
    step3Eyebrow: "03 / GET A QUOTE",
    step3Title: "Send us your idea",
    step3Text:
      "Share reference images, product category and estimated quantity — we reply within 24 business hours.",
    step3Link: "Get a similar project",
    note: "MOQ, sampling time and bulk lead time for stock + logo and fully custom projects are reconfirmed per style and matched fabric.",
  },
  products: {
    eyebrow: "YOMEGA",
    title: "Products",
    subtitle:
      "Explore our latest yoga and activewear styles for OEM/ODM and private-label production.",
    catalog: "Download Product Catalog",
    viewDetails: "View product details →",
  },
  detail: {
    back: "Back to products",
    eyebrow: "YOMEGA · OEM / ODM",
    colorsTitle: "Color Options",
    specFabric: "Fabric & GSM",
    specSizes: "Sizes",
    specColors: "Colors",
    specMoq: "MOQ",
    specSample: "Sampling time",
    specCustom: "Customization",
    fallback:
      "Fabric, GSM, colors, sizes, customization options, sampling time and MOQ for this style are confirmed against your project requirements.",
    cta: "Inquire about this product",
  },
  about: {
    title: "About Us",
    whoTitle: "Who We Are",
    whoIntro:
      "YOMEGA is the activewear brand and manufacturing arm of Xiamen Mega Garment Co., Ltd. We have been serving export sales and private-label manufacturing since 2017, with a team of approximately 238 people today.",
    who1: "Brand: YOMEGA",
    who2: "Legal entity: Xiamen Mega Garment Co., Ltd.",
    who3: "Export sales & branded manufacturing since: 2017",
    who4: "Team size: approximately 238 people",
    whatTitle: "What We Do",
    whatIntro:
      "We supply both seamless and cut-and-sew activewear, offering an end-to-end service that takes each project from product development through to finished-garment delivery.",
    what1:
      "In-house: pattern making, sampling, cutting, sewing, knitting, logo printing & application, quality inspection and packing",
    what2:
      "Outsourced: standard fabric production, dyeing and logo manufacturing; special logo techniques confirmed on a per-order basis",
    what3: "Core women's categories: leggings, biker shorts, sports bras and tops",
    what4: "Verifiable certifications & systems: OEKO-TEX Standard 100, BSCI, GRS, GCC",
    what5: "Finished-garment inspection standard: AQL 2.5",
    what6: "Stock without logo: from 50 sets, with mixed colors and sizes",
    what7: "Stock with logo: 100 pieces in total, with mixed styles, colors and sizes",
    whyTitle: "Why Work With Us",
    why1Title: "Low MOQ",
    why1Text:
      "Flexible minimum order quantities that lower the barrier to launching new styles and testing the market.",
    why2Title: "ODM / OEM Production",
    why2Text:
      "Custom fabrics, fits, logos, labels, colors and packaging, tailored to each brand's product requirements.",
    why3Title: "From Idea to Real Product",
    why3Text:
      "Fully custom samples are delivered in around {days}. A good factory helps you turn ideas into real, deliverable products.",
    why3Days: "12–15 days",
  },
  cases: {
    eyebrow: "Customer Cases",
    title: "Customer Cases",
    intro:
      "From small-batch brand launches to fully custom development, we shape the cooperation path around your product stage, target quantity and delivery requirements.",
    case1Eyebrow: "STOCK + LOGO",
    case1Title: "Small-batch brand launch",
    case1Text:
      "Start from 100 sets with stock styles plus your logo, mixed colors and sizes — validating demand while keeping first inventory under control.",
    case2Eyebrow: "OEM / ODM",
    case2Title: "From reference image to sample",
    case2Text:
      "We develop fabrics, fits, colors, logo, labels and packaging from reference images, sample garments or requirement notes — down to a confirmable product sample.",
    case3Eyebrow: "QUALITY + DELIVERY",
    case3Title: "Bulk quality and delivery",
    case3Text:
      "After sample approval, production follows your project requirements for inspection, packing and logistics, with progress synced at key milestones.",
    ctaTitle: "Tell us about your product plan",
    ctaText:
      "Share reference images, product category and estimated quantity — we reply within 24 business hours.",
    ctaButton: "Get a Quote",
    ariaLabel: "Customer cooperation scenarios",
  },
  contact: {
    eyebrow: "Start Your Inquiry",
    titleA: "Ready to make",
    titleB: "your products?",
    intro:
      "You don't need a perfect tech pack. Share reference images, sketches or simply describe what you need — we'll handle the rest together.",
    check1: "Send your logo — free mockups included",
    check2: "Ask about MOQ, lead time and sampling fees",
    check3: "Quote details within 24 business hours",
    catalogTitle: "Get the live catalog link",
    catalogSub: "Live catalog · Updated 2026",
    emailLabel: "Email",
    whatsappLabel: "WhatsApp",
    trustEyebrow: "Buyer Confidence",
    trustTitle: "Every detail, clarified before we work together",
    trustIntro:
      "Certification, packaging, logistics, trade terms and response commitments are confirmed item by item. Cost and lead-time figures are examples for early planning only — the final word rests with the style, quantity, destination and formal order.",
    s1Title: "Certification & compliance",
    s1Items: [
      "YOMEGA holds OEKO-TEX Standard 100 certification; documents available on request during supplier qualification.",
      "GRS scope certificates are held by the respective factories/dye houses; the factory is amfori BSCI audited.",
      "EU and US shipments are prepared to REACH and CPSIA requirements; certificate holders, scope and validity follow the actual documents.",
      "Corresponding certification documents can be provided on request during supplier qualification.",
    ],
    s2Title: "Branded packaging",
    s2Items: [
      "Individual poly bags, branded packaging bags, carton marks and e-commerce logistics packing supported.",
      "Configure everything from inner bags to branded outer cartons for your warehouse or e-commerce fulfillment center.",
      "Before ordering, confirm packaging material, sizes, brand printing, carton marks, packing quantity and customization costs item by item.",
    ],
    s3Title: "Logistics options",
    s3Items: [
      "Sea LCL: example 28–45 days, for volumes under 10m³.",
      "Sea FCL: example 25–40 days, a 20ft container fits roughly 10–25m³.",
      "Air freight: example 5–10 days, for samples, urgent restocks or batches under 200kg.",
      "FOB shipping from Xiamen, Shenzhen, Ningbo, Shanghai and other Chinese ports; freight and transit confirmed at booking.",
    ],
    s4Title: "Trade terms",
    s4Items: [
      "FOB, CIF, DDP and EXW supported; seller/buyer responsibilities follow the formal order.",
      "First orders or small batches without your own forwarder: compare DDP first; mid volumes can compare CIF.",
      "Regular shipping or your own forwarder: compare FOB first; EXW works when you consolidate logistics within China.",
      "MOQ, sampling fees, payment terms, deposit/balance ratio, quote validity and after-sales are confirmed in the formal quote or contract.",
    ],
    s5Title: "Response commitment",
    s5Items: [
      "Replies within 24 business hours, including fabric options, pricing and a sampling timeline.",
      "No full tech pack needed — reference images, sketches or a requirement description are enough to start.",
      "Free mockups after you send your logo, plus answers on MOQ, lead time and sampling fees.",
      "Your email is used only for the quote and follow-up; designs and inquiry details are handled confidentially.",
    ],
    logisticsNote:
      "Freight, duties, insurance, customs clearance and ETA vary by destination, volume, weight and booking conditions — we itemize everything in the formal quote.",
  },
  faq: {
    eyebrow: "Manufacturing FAQ",
    title: "Answers, straight from the factory.",
    subtitle:
      "Direct answers from a Xiamen activewear OEM factory: MOQ, samples, quality control, shipping, fabrics, compliance and scaling your brand.",
    searchLabel: "Search FAQs",
    searchPlaceholder: "Search MOQ, samples, fabric, AQL, shipping…",
    clearAria: "Clear search",
    resultCount: "{count} matching answers across {topics} topics.",
    totalCount: "{count} answers across {topics} topics.",
    navLabel: "FAQ topic navigation",
    noResultsTitle: "No matching questions",
    noResultsText: "Try MOQ, samples, fabric, AQL, DDP or other keywords.",
    noResultsBtn: "Clear search",
    ctaEyebrow: "Still have questions?",
    ctaTitle: "Still have questions?",
    ctaText:
      "Send your reference images, target quantity and market — we reply within 24 business hours.",
    contentNote:
      "FAQ entries are being translated — they currently display in Chinese. For urgent questions, reach us on WhatsApp below.",
  },
  form: {
    eyebrow: "Quick Quote",
    intro:
      "Tell us about your project — we reply with fabric options, pricing and a sampling timeline.",
    stepLabel: "Quote form step {step} of 2",
    step1: "Basic Info",
    step2: "More Details",
    step1Hint: "Two required fields — that's all it takes to continue.",
    email: "Work Email",
    category: "Product Category",
    select: "Select…",
    quantity: "Estimated Quantity",
    optional: "(optional)",
    qtyPh: "e.g. 300–500 pcs",
    continue: "Continue",
    privacy1: "No spam — your email is used only for the quote and follow-up.",
    step2Hint: "Almost done — these details help us prepare a more accurate quote.",
    name: "Your Name",
    namePh: "Your name",
    company: "Company / Brand",
    companyPh: "Brand name",
    whatsappPh: "+1 555 123 4567",
    details: "Project Details",
    detailsPh:
      "e.g. 500 high-waist leggings with a heat-transfer logo at the waist.",
    attach: "Attach a reference file (name only — send the file via WhatsApp later)",
    fileTooBig: "File exceeds 10MB — please compress and retry.",
    website: "Website",
    privacy2: "Your designs stay confidential — never shared.",
    back: "Back",
    submitting: "Sending securely…",
    submit: "Get My Quote (within 24h)",
    step2Note:
      "We reply within 24 business hours. Your information is used only to answer this inquiry.",
    successKicker: "Sent",
    successTitle: "Inquiry received",
    successText:
      "Notification email, owner alert and lead log are synced. We reply within 24 business hours.",
    inquiryId: "Inquiry ID",
    fileRecorded:
      "File name {name} recorded. Please send the actual file via WhatsApp, quoting the inquiry ID above.",
    whatsappFollow: "Continue on WhatsApp",
    genericError: "Delivery failed — please retry shortly.",
    productPrefix: "I'd like to inquire about this product: ",
  },
};

const dictionaries: Record<Lang, typeof zh> = { zh, en };

function lookup(lang: Lang, key: string): string {
  const walk = (obj: unknown, parts: string[]): string | undefined => {
    if (!obj || typeof obj !== "object") return undefined;
    const [head, ...rest] = parts;
    const value = (obj as Record<string, unknown>)[head];
    if (rest.length === 0) return typeof value === "string" ? value : undefined;
    return walk(value, rest);
  };
  return walk(dictionaries[lang], key.split(".")) ?? walk(zh, key.split(".")) ?? key;
}

function detectInitialLang(): Lang {
  if (typeof window === "undefined") return "zh";
  try {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("lang");
    if (fromUrl === "en" || fromUrl === "zh") return fromUrl;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "zh") return saved;
    return window.navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
  } catch {
    return "zh";
  }
}

type TFn = {
  (key: string): string;
  (key: string, vars: Record<string, ReactNode>): ReactNode;
};

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: TFn;
  /** 取字符串数组（如 contact.s1Items）；找不到时回退中文，再回退空数组。 */
  ta: (key: string) => string[];
};

const I18nContext = createContext<I18nContextValue>({
  lang: "zh",
  setLang: () => undefined,
  t: (key) => key,
  ta: () => [],
});

export function I18nProvider({ children }: { children: ReactNode }) {
  // SSR 与首屏始终渲染中文（与当前站点一致），挂载后再切换到访客语言，避免水合不一致。
  const [lang, setLangState] = useState<Lang>("zh");

  useEffect(() => {
    setLangState(detectInitialLang());
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.lang = next === "zh" ? "zh-CN" : "en";
    } catch {
      // localStorage may be unavailable; language still switches for this session.
    }
  }, []);

  const t = useCallback(
    ((key: string, vars?: Record<string, ReactNode>): ReactNode => {
      const text = lookup(lang, key);
      if (!vars) return text;
      const parts: ReactNode[] = [];
      const re = /\{(\w+)\}/g;
      let last = 0;
      let m: RegExpExecArray | null;
      while ((m = re.exec(text)) !== null) {
        const idx = m.index;
        if (idx > last) parts.push(text.slice(last, idx));
        const value = vars[m[1]];
        parts.push(value === undefined ? m[0] : value);
        last = idx + m[0].length;
      }
      if (last === 0) return text;
      parts.push(text.slice(last));
      return parts;
    }) as TFn,
    [lang],
  );

  const ta = useCallback((key: string): string[] => {
    const pick = (lang: Lang): string[] | undefined => {
      const value = key.split(".").reduce<unknown>((node, part) => {
        if (!node || typeof node !== "object") return undefined;
        return (node as Record<string, unknown>)[part];
      }, dictionaries[lang] as unknown);
      return Array.isArray(value)
        ? value.filter((item): item is string => typeof item === "string")
        : undefined;
    };
    return pick(lang) ?? pick("zh") ?? [];
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t, ta }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

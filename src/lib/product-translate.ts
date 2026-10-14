/**
 * 工厂 SKU 词汇中英对照与规则翻译。
 *
 * 用途：
 * 1. 管理端上传/更新 SKU 时，服务端自动把中文规格翻译成英文，写入 Airtable 的 * EN 字段；
 * 2. 前台渲染时作为兜底：EN 字段为空则对原值运行时翻译（颜色图文件名即属此类）；
 * 3. /api/products/translate 供管理端做「输入中文 → 建议英文」的实时提示。
 *
 * 词汇表覆盖本厂历史数据中出现过的颜色与术语；未覆盖的中文按原样保留（部分翻译优于不翻译）。
 */

const CN_RE = /[一-鿿]/;

export function containsChinese(value: string): boolean {
  return CN_RE.test(value);
}

/* ---------------------------------- 颜色 ---------------------------------- */

const COLOR_MAP: Record<string, string> = {
  高级黑: "Premium Black",
  黑咖啡: "Dark Coffee",
  咖啡棕: "Coffee Brown",
  红棕色: "Red Brown",
  拿铁咖: "Latte",
  娇红色: "Crimson",
  复古红: "Vintage Red",
  荧光蓝: "Fluorescent Blue",
  荧光绿: "Neon Green",
  荧光黄: "Neon Yellow",
  徽章蓝: "Badge Blue",
  雾黛蓝: "Misty Blue",
  烟灰蓝: "Smoky Blue",
  水雾蓝: "Aqua Mist",
  水蓝色: "Aqua Blue",
  藏蓝色: "Navy Blue",
  藏青色: "Navy",
  浅卡其: "Light Khaki",
  水粉色: "Soft Pink",
  慕斯粉: "Mousse Pink",
  奶黄色: "Butter Yellow",
  浅禾黄: "Pale Wheat",
  荧光色: "Neon",
  西梅紫: "Plum Purple",
  罗兰紫: "Orchid Purple",
  犀牛灰: "Rhino Grey",
  陶灰色: "Taupe Grey",
  浅果绿: "Light Apple Green",
  奶油杏: "Creamy Apricot",
  焦栗棕: "Roasted Chestnut",
  酒红色: "Wine Red",
  亚麻色: "Linen",
  香槟色: "Champagne",
  象牙白: "Ivory",
  米白色: "Off-White",
  墨绿色: "Dark Green",
  天蓝色: "Sky Blue",
  浅灰色: "Light Grey",
  深灰色: "Dark Grey",
  玫红色: "Rose Red",
  浅绿色: "Light Green",
  杏色: "Apricot",
  驼色: "Camel",
  裸色: "Nude",
  黑色: "Black",
  白色: "White",
  灰色: "Grey",
  红色: "Red",
  蓝色: "Blue",
  粉色: "Pink",
  紫色: "Purple",
  黄色: "Yellow",
  绿色: "Green",
  棕色: "Brown",
  橙色: "Orange",
  橘色: "Orange",
  咖色: "Coffee",
  黑: "Black",
  白: "White",
  灰: "Grey",
  红: "Red",
  蓝: "Blue",
  粉: "Pink",
  紫: "Purple",
  黄: "Yellow",
  绿: "Green",
  棕: "Brown",
  橙: "Orange",
};

const COLOR_KEYS = Object.keys(COLOR_MAP).sort((a, b) => b.length - a.length);

/** 从字符串头部开始做最长匹配替换；未收录的字原样保留。 */
function walkReplace(input: string, map: Record<string, string>, keys: string[]): string {
  let out = "";
  let i = 0;
  while (i < input.length) {
    const hit = keys.find((key) => input.startsWith(key, i));
    if (hit) {
      out += map[hit];
      i += hit.length;
    } else {
      out += input[i];
      i += 1;
    }
  }
  return out;
}

/** 单个颜色名翻译：先整词查表，再逐段匹配，最后原样返回。 */
export function translateColorName(name: string): string {
  const trimmed = name.trim();
  if (!trimmed || !containsChinese(trimmed)) return trimmed;
  return walkReplace(trimmed, COLOR_MAP, COLOR_KEYS).trim();
}

/** 颜色列表翻译：按 / 、，, 、；; | 拆分成单个颜色，翻译后统一用 " / " 连接。 */
export function translateColorsList(value: string): string {
  const trimmed = value.trim();
  if (!trimmed || !containsChinese(trimmed)) return trimmed;
  return trimmed
    .split(/[\/,，、;；|]+/)
    .map((token) => translateColorName(token))
    .filter(Boolean)
    .join(" / ");
}

/* -------------------------------- 规格类字段 ------------------------------- */

/** 整句/短语级翻译，优先匹配长键。 */
const PHRASE_MAP: Record<string, string> = {
  运动三件套: "Sports Three-Piece Set",
  文胸长裤套装: "Bra & Leggings Set",
  挂脖运动内衣: "Halter Sports Bra",
  高腰阔腿裤: "High-Waist Wide-Leg Pants",
  网球连衣裙: "Tennis Dress",
  卫衣套装: "Sweatshirt Set",
  瑜伽套装: "Yoga Sets",
  运动套装: "Activewear Sets",
  运动内衣: "Sports Bras",
  运动文胸: "Sports Bras",
  运动长裤: "Activewear Pants",
  连衣裙: "Dresses",
  紧身裤: "Leggings",
  网球裙: "Tennis Dresses",
  外套: "Jackets",
  卫衣: "Sweatshirts",
  背心: "Tanks",
  短裤: "Shorts",
  短裙: "Skirts",
  "（现款加标，可混色混码）": " (in-stock styles, private-label ready; mixed colors and sizes OK)",
  "（现款加标）": " (in-stock styles, private-label ready)",
  "（按项目确认）": " (confirmed per project)",
  待补充可证明卖点: "To be confirmed",
  可混色混码: "mixed colors and sizes OK",
  现款加标: "in-stock styles, private-label ready",
  定制包装: "custom packaging",
  织标: "woven labels",
  热转印: "heat transfer",
  克重: "gsm",
};

const PHRASE_KEYS = Object.keys(PHRASE_MAP).sort((a, b) => b.length - a.length);

/** 术语级翻译（短语未命中后逐段替换）。 */
const TERM_MAP: Record<string, string> = {
  聚酯纤维: "Polyester",
  竹纤维: "Bamboo Fiber",
  牛奶丝: "Milk Silk",
  尼龙: "Nylon",
  锦纶: "Nylon",
  氨纶: "Spandex",
  涤纶: "Polyester",
  莫代尔: "Modal",
  粘胶: "Viscose",
  腈纶: "Acrylic",
  天丝: "Tencel",
  棉: "Cotton",
  双: " pairs",
  套: " sets",
  件: " pcs",
  条: " pcs",
  天: " days",
};

const TERM_KEYS = Object.keys(TERM_MAP).sort((a, b) => b.length - a.length);

/**
 * 规格类文本翻译：短语 → 术语 → 标点/空格规整。
 * 无中文时原样返回；部分未收录的中文会保留在结果里。
 */
export function translateSpec(value: string): string {
  const trimmed = value.trim();
  if (!trimmed || !containsChinese(trimmed)) return trimmed;
  let out = walkReplace(trimmed, PHRASE_MAP, PHRASE_KEYS);
  if (containsChinese(out)) out = walkReplace(out, TERM_MAP, TERM_KEYS);
  // 全角标点转半角（颜色列表统一走 translateColorsList，此处规格字段用 / 分隔）
  out = out
    .replaceAll("（", "(")
    .replaceAll("）", ")")
    .replaceAll("，", ", ")
    .replaceAll("。", ".")
    .replaceAll("、", "/")
    .replaceAll("；", "; ");
  // "%字母" 补空格："100%Polyester" → "100% Polyester"
  out = out.replace(/%(?=[A-Za-z])/g, "% ");
  // 数字与字母之间补空格："100pcs" → "100 pcs"、"Nylon22" → "Nylon 22"、"220gsm" → "220 gsm"
  out = out.replace(/([A-Za-z])(?=\d)/g, "$1 ").replace(/(\d)(?=[A-Za-z])/g, "$1 ");
  // 规整多余空格与标点前的空格
  out = out
    .replace(/[ \t]{2,}/g, " ")
    .replace(/ +([,.%;)])/g, "$1")
    .replace(/\(( +)/g, "(")
    .replace(/( +)\)/g, ")");
  return out.trim();
}

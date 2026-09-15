"use client";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  EnvelopeSimple,
  LockSimple,
  Paperclip,
  WhatsappLogo,
} from "@phosphor-icons/react";
import { FormEvent, useMemo, useRef, useState } from "react";

type QuoteData = {
  email: string;
  category: string;
  quantity: string;
  name: string;
  company: string;
  whatsapp: string;
  details: string;
};

const initialData: QuoteData = {
  email: "",
  category: "",
  quantity: "",
  name: "",
  company: "",
  whatsapp: "",
  details: "",
};

export function QuoteForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [data, setData] = useState<QuoteData>(initialData);
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");
  const [isReady, setIsReady] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const inquiryBody = useMemo(
    () =>
      [
        "Hello YOUMEGA, I would like to request a quotation.",
        "",
        `Work email: ${data.email}`,
        `Category: ${data.category}`,
        `Estimated quantity: ${data.quantity || "To be confirmed"}`,
        `Name: ${data.name || "Not provided"}`,
        `Company / Brand: ${data.company || "Not provided"}`,
        `WhatsApp: ${data.whatsapp || "Not provided"}`,
        `Project details: ${data.details || "Not provided"}`,
        fileName ? `Attachment prepared: ${fileName} (please attach manually)` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    [data, fileName],
  );

  function updateField(field: keyof QuoteData, value: string) {
    setData((current) => ({ ...current, [field]: value }));
  }

  function continueToStepTwo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formRef.current?.reportValidity()) return;
    setStep(2);
  }

  function prepareInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (fileError) return;
    setIsReady(true);
  }

  function handleFile(file?: File) {
    if (!file) {
      setFileName("");
      setFileError("");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setFileName("");
      setFileError("文件超过 10MB，请压缩后重新选择。");
      return;
    }
    setFileName(file.name);
    setFileError("");
  }

  if (isReady) {
    const mailHref = `mailto:Ceciya@xmmega.com?subject=${encodeURIComponent("YOUMEGA OEM/ODM Quote Request")}&body=${encodeURIComponent(inquiryBody)}`;
    const whatsappHref = `https://wa.me/8615396238862?text=${encodeURIComponent(inquiryBody)}`;

    return (
      <div className="flex min-h-[650px] min-w-0 flex-col justify-center border border-brand-border bg-white p-6 sm:p-10" aria-live="polite">
        <CheckCircle aria-hidden="true" size={54} weight="fill" className="text-brand-accent" />
        <p className="mt-7 text-xs font-bold tracking-[0.18em] text-brand-accent uppercase">询价内容已整理</p>
        <h2 className="mt-3 text-3xl tracking-tight sm:text-4xl">选择一个渠道发送给我们</h2>
        <p className="mt-5 max-w-xl leading-8 text-brand-muted">
          点击后会打开您的邮件或 WhatsApp，并自动带入刚才填写的内容。我们将在工作日 24 小时内回复。
        </p>
        {fileName && (
          <p className="mt-4 border-l-2 border-brand-accent pl-4 text-sm leading-6 text-brand-muted">
            已选择 {fileName}。浏览器无法自动附加本地文件，请在邮件或 WhatsApp 窗口中手动添加。
          </p>
        )}
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <a href={mailHref} className="inline-flex min-h-14 items-center justify-center gap-3 bg-brand-primary px-5 py-4 font-bold text-white transition-colors hover:bg-brand-accent">
            <EnvelopeSimple aria-hidden="true" size={21} /> 通过邮件发送
          </a>
          <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex min-h-14 items-center justify-center gap-3 bg-brand-accent px-5 py-4 font-bold text-white transition-colors hover:bg-brand-primary">
            <WhatsappLogo aria-hidden="true" size={22} /> 通过 WhatsApp 发送
          </a>
        </div>
        <button type="button" onClick={() => setIsReady(false)} className="mt-6 inline-flex min-h-11 items-center gap-2 self-start font-bold text-brand-muted hover:text-brand-accent">
          <ArrowLeft aria-hidden="true" size={18} /> 返回修改
        </button>
      </div>
    );
  }

  return (
    <div className="min-w-0 border border-brand-border bg-white p-5 sm:p-8 xl:p-10">
      <p className="flex items-center gap-3 text-sm font-bold tracking-[0.16em] text-brand-muted uppercase">
        <span className="text-brand-accent">◆</span> 快速询价
      </p>
      <p className="mt-2 max-w-2xl leading-7 text-brand-muted">
        填写您的项目信息，我们将提供面料选择、价格和样品制作时间表。
      </p>

      <div className="mt-9" aria-label={`询价表第 ${step} 步，共 2 步`}>
        <div className="grid min-w-0 grid-cols-[auto_minmax(20px,1fr)_auto] items-center gap-2 text-xs font-bold sm:gap-4 sm:text-sm">
          <span className={step === 1 ? "text-brand-primary" : "text-brand-muted"}>1. 基本信息</span>
          <span className="h-0.5 bg-brand-border"><span className={`block h-full bg-brand-accent transition-[width] ${step === 1 ? "w-1/2" : "w-full"}`} /></span>
          <span className={step === 2 ? "text-brand-primary" : "text-brand-muted/60"}>2. 更多信息</span>
        </div>
      </div>

      {step === 1 ? (
        <form ref={formRef} onSubmit={continueToStepTwo} className="mt-12 space-y-6">
          <p className="leading-7 text-brand-muted">只需填写两项必填信息，即可继续完善询价。</p>
          <label className="block text-sm font-bold">
            工作邮箱 <span className="text-brand-accent">*</span>
            <input
              type="email"
              required
              autoComplete="email"
              value={data.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="you@brand.com"
              className="mt-2 min-h-14 w-full border border-brand-border bg-white px-4 text-base font-normal outline-none transition-colors placeholder:text-brand-muted/60 focus:border-brand-primary sm:min-h-16 sm:px-5"
            />
          </label>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-bold">
              产品类别 <span className="text-brand-accent">*</span>
              <select required value={data.category} onChange={(event) => updateField("category", event.target.value)} className="mt-2 min-h-14 w-full border border-brand-border bg-white px-4 text-base font-normal outline-none transition-colors focus:border-brand-primary sm:min-h-16 sm:px-5">
                <option value="">请选择</option>
                <option>Leggings</option>
                <option>Biker Shorts</option>
                <option>Sports Bras</option>
                <option>Tops</option>
                <option>Yoga Set</option>
                <option>Swimwear</option>
                <option>Other</option>
              </select>
            </label>
            <label className="block text-sm font-bold">
              预计数量 <span className="font-normal text-brand-muted">（可选）</span>
              <input type="text" inputMode="numeric" value={data.quantity} onChange={(event) => updateField("quantity", event.target.value)} placeholder="例如：300–500 件" className="mt-2 min-h-14 w-full border border-brand-border bg-white px-4 text-base font-normal outline-none transition-colors placeholder:text-brand-muted/60 focus:border-brand-primary sm:min-h-16 sm:px-5" />
            </label>
          </div>
          <button type="submit" className="inline-flex min-h-14 w-full items-center justify-center gap-3 bg-brand-primary px-6 py-4 font-bold text-white transition-colors hover:bg-brand-accent">
            继续 <ArrowRight aria-hidden="true" size={19} weight="bold" />
          </button>
          <p className="flex items-start justify-center gap-2 text-center text-sm leading-6 text-brand-muted">
            <LockSimple aria-hidden="true" size={17} className="mt-0.5 shrink-0" /> 我们不会发送垃圾邮件，邮箱仅用于报价和后续跟进。
          </p>
        </form>
      ) : (
        <form onSubmit={prepareInquiry} className="mt-12 space-y-6">
          <p className="leading-7 text-brand-muted">快完成了。这些信息将帮助我们准备更准确的报价。</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-bold">
              您的姓名 <span className="font-normal text-brand-muted">（可选）</span>
              <input value={data.name} onChange={(event) => updateField("name", event.target.value)} placeholder="您的姓名" autoComplete="name" className="mt-2 min-h-14 w-full border border-brand-border px-4 text-base font-normal outline-none placeholder:text-brand-muted/60 focus:border-brand-primary sm:min-h-16 sm:px-5" />
            </label>
            <label className="block text-sm font-bold">
              公司 / 品牌
              <input value={data.company} onChange={(event) => updateField("company", event.target.value)} placeholder="品牌名称" autoComplete="organization" className="mt-2 min-h-14 w-full border border-brand-border px-4 text-base font-normal outline-none placeholder:text-brand-muted/60 focus:border-brand-primary sm:min-h-16 sm:px-5" />
            </label>
          </div>
          <label className="block text-sm font-bold tracking-[0.08em] uppercase">
            WhatsApp <span className="font-normal tracking-normal text-brand-muted normal-case">（可选）</span>
            <input type="tel" value={data.whatsapp} onChange={(event) => updateField("whatsapp", event.target.value)} placeholder="+1 555 123 4567" autoComplete="tel" className="mt-2 min-h-14 w-full border border-brand-border px-4 text-base font-normal tracking-normal outline-none placeholder:text-brand-muted/60 focus:border-brand-primary sm:min-h-16 sm:px-5" />
          </label>
          <label className="block text-sm font-bold">
            项目详情
            <textarea value={data.details} onChange={(event) => updateField("details", event.target.value)} rows={5} placeholder="例如：需要 500 条高腰紧身裤，腰部需要热转印 Logo。" className="mt-2 w-full resize-y border border-brand-border px-4 py-4 text-base font-normal leading-7 outline-none placeholder:text-brand-muted/60 focus:border-brand-primary sm:px-5" />
          </label>
          <label className="flex min-h-14 cursor-pointer items-center gap-3 border-b border-brand-muted px-1 py-3 text-sm font-bold text-brand-muted hover:text-brand-accent">
            <Paperclip aria-hidden="true" size={20} />
            <span className="min-w-0 truncate">{fileName || "附上参考图片或技术资料包（可选，最大 10MB）"}</span>
            <input type="file" className="sr-only" accept="image/*,.pdf,.doc,.docx,.zip" onChange={(event) => handleFile(event.target.files?.[0])} />
          </label>
          {fileError && <p className="text-sm font-bold text-brand-accent" role="alert">{fileError}</p>}
          <p className="flex items-center gap-2 text-sm text-brand-muted"><LockSimple aria-hidden="true" size={17} /> 您的设计资料将保密处理，不会对外分享。</p>
          <div className="grid gap-3 sm:grid-cols-[160px_1fr]">
            <button type="button" onClick={() => setStep(1)} className="inline-flex min-h-14 items-center justify-center gap-2 border border-brand-border px-5 py-4 font-bold text-brand-muted transition-colors hover:border-brand-primary hover:text-brand-primary">
              <ArrowLeft aria-hidden="true" size={18} /> 返回
            </button>
            <button type="submit" className="inline-flex min-h-14 min-w-0 flex-wrap items-center justify-center gap-2 bg-brand-primary px-4 py-4 text-center font-bold text-white transition-colors hover:bg-brand-accent sm:gap-3 sm:px-5">
              获取我的报价（24 小时内） <ArrowRight aria-hidden="true" size={19} weight="bold" />
            </button>
          </div>
          <p className="text-center text-sm leading-6 text-brand-muted">我们将在工作日 24 小时内回复。信息仅用于回复您的咨询。</p>
        </form>
      )}
    </div>
  );
}

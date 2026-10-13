"use client";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  LockSimple,
  Paperclip,
  WhatsappLogo,
} from "@phosphor-icons/react";
import { FormEvent, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";

type QuoteData = {
  email: string;
  category: string;
  quantity: string;
  name: string;
  company: string;
  whatsapp: string;
  details: string;
};

export function QuoteForm({ productName = "", source = "contact" }: { productName?: string; source?: string }) {
  const { t } = useI18n();
  const [step, setStep] = useState<1 | 2>(1);
  const [data, setData] = useState<QuoteData>(() => ({
    email: "",
    category: "",
    quantity: "",
    name: "",
    company: "",
    whatsapp: "",
    details: productName ? `${t("form.productPrefix")}${productName}` : "",
  }));
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");
  const [website, setWebsite] = useState("");
  const [submissionState, setSubmissionState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [inquiryId, setInquiryId] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  function updateField(field: keyof QuoteData, value: string) {
    setData((current) => ({ ...current, [field]: value }));
  }

  function continueToStepTwo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formRef.current?.reportValidity()) return;
    setStep(2);
  }

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (fileError || submissionState === "submitting") return;
    setSubmissionState("submitting");
    setSubmissionMessage("");

    try {
      const sourcePage = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          attachmentName: fileName,
          sourcePage: `${source}: ${sourcePage}`,
          referrer: document.referrer,
          website,
        }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        inquiryId?: string;
        message?: string;
      };
      if (!response.ok || !result.ok) {
        throw new Error(result.message || t("form.genericError"));
      }
      setInquiryId(result.inquiryId || "");
      setSubmissionState("success");
    } catch (error) {
      setSubmissionMessage(error instanceof Error ? error.message : t("form.genericError"));
      setSubmissionState("error");
    }
  }

  function handleFile(file?: File) {
    if (!file) {
      setFileName("");
      setFileError("");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setFileName("");
      setFileError(t("form.fileTooBig"));
      return;
    }
    setFileName(file.name);
    setFileError("");
  }

  if (submissionState === "success") {
    return (
      <div className="flex min-h-[650px] min-w-0 flex-col justify-center border border-brand-border bg-white p-6 sm:p-10" aria-live="polite">
        <CheckCircle aria-hidden="true" size={54} weight="fill" className="text-brand-accent" />
        <p className="mt-7 text-xs font-bold tracking-[0.18em] text-brand-accent uppercase">{t("form.successKicker")}</p>
        <h2 className="mt-3 text-3xl tracking-tight sm:text-4xl">{t("form.successTitle")}</h2>
        <p className="mt-5 max-w-xl leading-8 text-brand-muted">
          {t("form.successText")}
        </p>
        {inquiryId && <p className="mt-4 text-sm text-brand-muted">{t("form.inquiryId")}：{inquiryId}</p>}
        {fileName && (
          <p className="mt-4 border-l-2 border-brand-accent pl-4 text-sm leading-6 text-brand-muted">
            {t("form.fileRecorded", { name: fileName })}
          </p>
        )}
        <a href={`https://wa.me/8615396238862?text=${encodeURIComponent(`Hello YOMEGA, I have submitted inquiry ${inquiryId}.`)}`} target="_blank" rel="noreferrer" className="mt-8 inline-flex min-h-14 items-center justify-center gap-3 self-start bg-brand-accent px-6 py-4 font-bold text-white transition-colors hover:bg-brand-primary">
          <WhatsappLogo aria-hidden="true" size={22} /> {t("form.whatsappFollow")}
        </a>
      </div>
    );
  }

  return (
    <div className="min-w-0 border border-brand-border bg-white p-5 sm:p-8 xl:p-10">
      <p className="flex items-center gap-3 text-sm font-bold tracking-[0.16em] text-brand-muted uppercase">
        <span className="text-brand-accent">◆</span> {t("form.eyebrow")}
      </p>
      <p className="mt-2 max-w-2xl leading-7 text-brand-muted">
        {t("form.intro")}
      </p>

      <div className="mt-9">
        <div className="grid min-w-0 grid-cols-[auto_minmax(20px,1fr)_auto] items-center gap-2 text-xs font-bold sm:gap-4 sm:text-sm">
          <span className={step === 1 ? "text-brand-primary" : "text-brand-muted"}>1. {t("form.step1")}</span>
          <span className="h-0.5 bg-brand-border"><span className={`block h-full bg-brand-accent transition-[width] ${step === 1 ? "w-1/2" : "w-full"}`} /></span>
          <span className={step === 2 ? "text-brand-primary" : "text-brand-muted/60"}>2. {t("form.step2")}</span>
        </div>
      </div>

      {step === 1 ? (
        <form ref={formRef} onSubmit={continueToStepTwo} className="mt-12 space-y-6">
          <p className="leading-7 text-brand-muted">{t("form.step1Hint")}</p>
          <label className="block text-sm font-bold">
            {t("form.email")} <span className="text-brand-accent">*</span>
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
              {t("form.category")} <span className="text-brand-accent">*</span>
              <select required value={data.category} onChange={(event) => updateField("category", event.target.value)} className="mt-2 min-h-14 w-full border border-brand-border bg-white px-4 text-base font-normal outline-none transition-colors focus:border-brand-primary sm:min-h-16 sm:px-5">
                <option value="">{t("form.select")}</option>
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
              {t("form.quantity")} <span className="font-normal text-brand-muted">{t("form.optional")}</span>
              <input type="text" inputMode="numeric" value={data.quantity} onChange={(event) => updateField("quantity", event.target.value)} placeholder={t("form.qtyPh")} className="mt-2 min-h-14 w-full border border-brand-border bg-white px-4 text-base font-normal outline-none transition-colors placeholder:text-brand-muted/60 focus:border-brand-primary sm:min-h-16 sm:px-5" />
            </label>
          </div>
          <button type="submit" className="inline-flex min-h-14 w-full items-center justify-center gap-3 bg-brand-primary px-6 py-4 font-bold text-white transition-colors hover:bg-brand-accent">
            {t("form.continue")} <ArrowRight aria-hidden="true" size={19} weight="bold" />
          </button>
          <p className="flex items-start justify-center gap-2 text-center text-sm leading-6 text-brand-muted">
            <LockSimple aria-hidden="true" size={17} className="mt-0.5 shrink-0" /> {t("form.privacy1")}
          </p>
        </form>
      ) : (
        <form onSubmit={submitInquiry} className="mt-12 space-y-6">
          <p className="leading-7 text-brand-muted">{t("form.step2Hint")}</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-bold">
              {t("form.name")} <span className="font-normal text-brand-muted">{t("form.optional")}</span>
              <input value={data.name} onChange={(event) => updateField("name", event.target.value)} placeholder={t("form.namePh")} autoComplete="name" className="mt-2 min-h-14 w-full border border-brand-border px-4 text-base font-normal outline-none placeholder:text-brand-muted/60 focus:border-brand-primary sm:min-h-16 sm:px-5" />
            </label>
            <label className="block text-sm font-bold">
              {t("form.company")}
              <input value={data.company} onChange={(event) => updateField("company", event.target.value)} placeholder={t("form.companyPh")} autoComplete="organization" className="mt-2 min-h-14 w-full border border-brand-border px-4 text-base font-normal outline-none placeholder:text-brand-muted/60 focus:border-brand-primary sm:min-h-16 sm:px-5" />
            </label>
          </div>
          <label className="block text-sm font-bold tracking-[0.08em] uppercase">
            WhatsApp <span className="font-normal tracking-normal text-brand-muted normal-case">{t("form.optional")}</span>
            <input type="tel" value={data.whatsapp} onChange={(event) => updateField("whatsapp", event.target.value)} placeholder={t("form.whatsappPh")} autoComplete="tel" className="mt-2 min-h-14 w-full border border-brand-border px-4 text-base font-normal tracking-normal outline-none placeholder:text-brand-muted/60 focus:border-brand-primary sm:min-h-16 sm:px-5" />
          </label>
          <label className="block text-sm font-bold">
            {t("form.details")}
            <textarea value={data.details} onChange={(event) => updateField("details", event.target.value)} rows={5} placeholder={t("form.detailsPh")} className="mt-2 w-full resize-y border border-brand-border px-4 py-4 text-base font-normal leading-7 outline-none placeholder:text-brand-muted/60 focus:border-brand-primary sm:px-5" />
          </label>
          <label className="flex min-h-14 cursor-pointer items-center gap-3 border-b border-brand-muted px-1 py-3 text-sm font-bold text-brand-muted hover:text-brand-accent">
            <Paperclip aria-hidden="true" size={20} />
            <span className="min-w-0 truncate">{fileName || t("form.attach")}</span>
            <input type="file" className="sr-only" accept="image/*,.pdf,.doc,.docx,.zip" onChange={(event) => handleFile(event.target.files?.[0])} />
          </label>
          <label className="sr-only" aria-hidden="true">
            {t("form.website")}
            <input tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
          </label>
          {fileError && <p className="text-sm font-bold text-brand-accent" role="alert">{fileError}</p>}
          {submissionState === "error" && <p className="border border-brand-accent/35 bg-brand-secondary p-4 text-sm font-bold text-brand-accent" role="alert">{submissionMessage}</p>}
          <p className="flex items-center gap-2 text-sm text-brand-muted"><LockSimple aria-hidden="true" size={17} /> {t("form.privacy2")}</p>
          <div className="grid gap-3 sm:grid-cols-[160px_1fr]">
            <button type="button" onClick={() => setStep(1)} className="inline-flex min-h-14 items-center justify-center gap-2 border border-brand-border px-5 py-4 font-bold text-brand-muted transition-colors hover:border-brand-primary hover:text-brand-primary">
              <ArrowLeft aria-hidden="true" size={18} /> {t("form.back")}
            </button>
            <button type="submit" disabled={submissionState === "submitting"} className="inline-flex min-h-14 min-w-0 flex-wrap items-center justify-center gap-2 bg-brand-primary px-4 py-4 text-center font-bold text-white transition-colors hover:bg-brand-accent disabled:cursor-wait disabled:opacity-65 sm:gap-3 sm:px-5">
              {submissionState === "submitting" ? t("form.submitting") : t("form.submit")} <ArrowRight aria-hidden="true" size={19} weight="bold" />
            </button>
          </div>
          <p className="text-center text-sm leading-6 text-brand-muted">{t("form.step2Note")}</p>
        </form>
      )}
    </div>
  );
}

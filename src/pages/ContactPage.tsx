import { FormEvent, useMemo, useState } from "react";
import { CalendarDays, Copy, Mail, MapPin, MessageCircle, MonitorPlay } from "lucide-react";
import { Seo } from "../components/Seo";
import { siteConfig } from "../config/siteConfig";
import { useLanguage } from "../i18n/useLanguage";
import { createWhatsAppUrl } from "../utils/whatsapp";

type FormData = { name: string; company: string; industry: string; whatsapp: string; platform: string; problem: string };
type RequiredField = "name" | "company" | "industry" | "whatsapp" | "problem";
const initialForm: FormData = { name: "", company: "", industry: "", whatsapp: "", platform: "", problem: "" };

function validWhatsApp(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15 && /^\+?[\d\s()-]+$/.test(value.trim());
}

export function ContactPage() {
  const { copy } = useLanguage();
  const content = copy.contact;
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<Record<RequiredField, true>>>({});
  const [prepared, setPrepared] = useState(false);
  const [copied, setCopied] = useState(false);

  const message = useMemo(() => {
    const industry = content.industries.find((option) => option.value === form.industry)?.label ?? form.industry;
    const labels = content.messageLabels;
    return `${content.messageGreeting}\n\n${labels.name}: ${form.name}\n${labels.company}: ${form.company}\n${labels.industry}: ${industry}\n${labels.whatsapp}: ${form.whatsapp}\n${labels.platform}: ${form.platform || labels.empty}\n${labels.problem}: ${form.problem}`;
  }, [content, form]);

  function submit(event: FormEvent) {
    event.preventDefault();
    const nextErrors: Partial<Record<RequiredField, true>> = {};
    if (!form.name.trim()) nextErrors.name = true;
    if (!form.company.trim()) nextErrors.company = true;
    if (!form.industry) nextErrors.industry = true;
    if (!validWhatsApp(form.whatsapp)) nextErrors.whatsapp = true;
    if (!form.problem.trim()) nextErrors.problem = true;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    const url = createWhatsAppUrl(siteConfig.whatsappNumber, message);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
    else setPrepared(true);
  }

  function field<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    if (key in errors) setErrors((current) => ({ ...current, [key]: undefined }));
    setPrepared(false);
    setCopied(false);
  }

  async function copyPrepared() {
    await navigator.clipboard.writeText(message);
    setCopied(true);
  }

  const methodIcons = [MessageCircle, Mail, MapPin, MonitorPlay, CalendarDays];
  const inputClass = "mt-2 min-h-12 w-full rounded-xl border border-[#29435F] bg-[#101F33] px-4 py-3 text-[#F4F8FC] outline-none transition placeholder:text-[#74869A] focus:border-brand-500 focus:ring-4 focus:ring-brand-500/30";

  return (
    <>
      <Seo title={copy.seo.contact.title} description={copy.seo.contact.description} path="/contact" />
      <section className="border-b border-zinc-200 bg-brand-50 py-16 sm:py-20">
        <div className="container-site">
          <span className="eyebrow !bg-white">{content.eyebrow}</span>
          <h1 className="page-title">{content.title}</h1>
          <p className="lead mt-6 max-w-2xl">{content.intro}</p>
        </div>
      </section>
      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <aside>
            <h2 className="content-title">{content.methodsTitle}</h2>
            <div className="mt-7 space-y-4">
              {content.methods.map((method, index) => {
                const Icon = methodIcons[index];
                const value = index === 0 && siteConfig.whatsappNumber ? siteConfig.whatsappDisplayNumber : index === 1 && siteConfig.businessEmail ? siteConfig.businessEmail : method.text;
                return <div key={method.label} className="flex gap-4 rounded-xl border border-zinc-200 p-4"><span className="icon-tile"><Icon size={20} aria-hidden="true" /></span><div><h3 className="card-title">{method.label}</h3><p className="mt-1 text-sm text-muted">{value}</p></div></div>;
              })}
            </div>
            <div className="mt-7 space-y-1 text-sm leading-6 text-muted">
              <p><span className="font-semibold text-ink">Brand:</span> SuperChat Marketing</p>
              <p><span className="font-semibold text-ink">Registered Business:</span> HAOS BROTHER MOBILITY</p>
            </div>
          </aside>
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
            <h2 className="content-title">{content.formTitle}</h2>
            <p className="mt-2 text-muted">{content.formIntro}</p>
            <form className="mt-7 grid gap-5 sm:grid-cols-2" onSubmit={submit} noValidate>
              <label htmlFor="contact-name" className="font-semibold text-ink">
                {content.fields.name} <span className="text-red-600">*</span>
                <input id="contact-name" name="name" autoComplete="name" placeholder={content.placeholders.name} className={inputClass} value={form.name} onChange={(event) => field("name", event.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
                {errors.name && <span id="name-error" className="mt-1 block text-sm text-red-700">{content.errors.name}</span>}
              </label>
              <label htmlFor="contact-company" className="font-semibold text-ink">
                {content.fields.company} <span className="text-red-600">*</span>
                <input id="contact-company" name="company" autoComplete="organization" placeholder={content.placeholders.company} className={inputClass} value={form.company} onChange={(event) => field("company", event.target.value)} aria-invalid={!!errors.company} aria-describedby={errors.company ? "company-error" : undefined} />
                {errors.company && <span id="company-error" className="mt-1 block text-sm text-red-700">{content.errors.company}</span>}
              </label>
              <label htmlFor="contact-industry" className="font-semibold text-ink">
                {content.fields.industry} <span className="text-red-600">*</span>
                <select id="contact-industry" name="industry" className={inputClass} value={form.industry} onChange={(event) => field("industry", event.target.value)} aria-invalid={!!errors.industry} aria-describedby={errors.industry ? "industry-error" : undefined}>
                  <option value="">{content.placeholders.industry}</option>
                  {content.industries.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
                {errors.industry && <span id="industry-error" className="mt-1 block text-sm text-red-700">{content.errors.industry}</span>}
              </label>
              <label htmlFor="contact-whatsapp" className="font-semibold text-ink">
                {content.fields.whatsapp} <span className="text-red-600">*</span>
                <input id="contact-whatsapp" name="whatsapp" autoComplete="tel" placeholder={content.placeholders.whatsapp} className={inputClass} inputMode="tel" value={form.whatsapp} onChange={(event) => field("whatsapp", event.target.value)} aria-invalid={!!errors.whatsapp} aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined} />
                {errors.whatsapp && <span id="whatsapp-error" className="mt-1 block text-sm text-red-700">{content.errors.whatsapp}</span>}
              </label>
              <label htmlFor="contact-platform" className="font-semibold text-ink sm:col-span-2">
                {content.fields.platform}
                <input id="contact-platform" name="platform" placeholder={content.placeholders.platform} className={inputClass} value={form.platform} onChange={(event) => field("platform", event.target.value)} />
              </label>
              <label htmlFor="contact-problem" className="font-semibold text-ink sm:col-span-2">
                {content.fields.problem} <span className="text-red-600">*</span>
                <textarea id="contact-problem" name="problem" placeholder={content.placeholders.problem} className={`${inputClass} min-h-32 resize-y`} value={form.problem} onChange={(event) => field("problem", event.target.value)} aria-invalid={!!errors.problem} aria-describedby={errors.problem ? "problem-error" : undefined} />
                {errors.problem && <span id="problem-error" className="mt-1 block text-sm text-red-700">{content.errors.problem}</span>}
              </label>
              <div className="sm:col-span-2"><button type="submit" className="btn-primary w-full sm:w-auto">{content.submit}</button></div>
            </form>
            {prepared && (
              <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5" role="status">
                <h3 className="card-title !text-amber-950">{content.preparedTitle}</h3>
                <p className="mt-2 text-sm leading-6 text-amber-900">{content.preparedText}</p>
                <button type="button" className="btn-secondary mt-4 !bg-white" onClick={copyPrepared}><Copy size={17} aria-hidden="true" />{copied ? content.copied : content.copy}</button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

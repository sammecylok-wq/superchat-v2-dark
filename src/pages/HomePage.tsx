import {
  ArrowRight,
  CalendarCheck,
  Check,
  CheckCircle2,
  ChevronDown,
  MessageSquareText,
  RefreshCcw,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ContactAction } from "../components/ContactAction";
import { VideoPlayer } from "../components/Media";
import { PlatformTag } from "../components/PlatformTag";
import { Seo } from "../components/Seo";
import { platformIconByLabel } from "../config/platformIcons";
import geoContent from "../i18n/geoContent.json";
import solutionContent from "../i18n/solutionContent.json";
import { v2Content } from "../i18n/v2Content";
import { useLanguage } from "../i18n/useLanguage";
import { PricingSection } from "../sections/PricingSection";

const outcomeIcons = [MessageSquareText, CalendarCheck, RefreshCcw];

function SectionHead({ eyebrow, title, intro, center = false }: { eyebrow: string; title: string; intro?: string; center?: boolean }) {
  return (
    <div className={`section-heading ${center ? "mx-auto text-center" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-title">{title}</h2>
      {intro && <p className="lead mt-5">{intro}</p>}
    </div>
  );
}

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-3 rounded-xl border border-[#213953] bg-[#101F33] px-4 transition focus-within:border-brand-500">
      <h3>
        <button
          type="button"
          className="flex w-full items-center justify-between gap-5 py-4 text-left text-lg font-semibold text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/30"
          aria-expanded={open}
          aria-controls={`v2-faq-${index}`}
          onClick={() => setOpen((value) => !value)}
        >
          {question}
          <ChevronDown className={`shrink-0 text-brand-600 transition ${open ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>
      </h3>
      <div id={`v2-faq-${index}`} hidden={!open} className="pb-5 pr-10 text-base leading-7 text-muted">{answer}</div>
    </div>
  );
}

export function HomePage() {
  const { currentLanguage, copy } = useLanguage();
  const content = v2Content[currentLanguage];
  const geo = geoContent[currentLanguage];
  const faqItems = copy.home.faq.items;

  return (
    <>
      <Seo title={copy.seo.home.title} description={copy.seo.home.description} keywords={copy.seo.home.keywords.join(", ")} />

      <section className="dark-hero home-section-primary relative overflow-hidden pb-16 pt-14 sm:pt-20 lg:pb-20 lg:pt-24">
        <div className="dot-grid absolute inset-y-0 right-0 -z-10 w-1/2 opacity-60" />
        <div className="container-site grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
          <div>
            <span className="eyebrow text-[11px] sm:text-sm">{content.hero.eyebrow}</span>
            <h1 className="hero-title mt-3">{content.hero.title.map((line) => <span key={line} className="block">{line}</span>)}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{content.hero.body}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link to="/demo" className="btn-primary">{content.hero.primary}<ArrowRight size={18} aria-hidden="true" /></Link>
              <ContactAction className="btn-secondary">{content.hero.secondary}</ContactAction>
            </div>
            <ul className="mt-7 grid gap-3 text-sm font-semibold text-muted sm:grid-cols-3">
              {content.hero.trust.map((item) => <li key={item} className="trust-pill flex items-start gap-2"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-brand-600" aria-hidden="true" />{item}</li>)}
            </ul>
          </div>
          <div className="mx-auto w-full max-w-[300px]">
            <div className="dark-media-shell overflow-hidden rounded-3xl">
              <VideoPlayer
                src="/videos/hero-demo.mp4"
                title={content.hero.videoTitle}
                description={content.hero.videoDescription}
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                preload="metadata"
                aspect="phone"
                fit="contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section home-section-light-tint">
        <div className="container-site">
          <SectionHead eyebrow={content.outcomes.eyebrow} title={content.outcomes.title} intro={geo.home.brandSummary} center />
          <div className="flow-grid grid gap-5 md:grid-cols-3">
            {content.outcomes.items.map((item, index) => {
              const Icon = outcomeIcons[index];
              return (
                <article key={item.title} className="card flow-card">
                  <span className="icon-tile"><Icon size={20} aria-hidden="true" /></span>
                  <h3 className="card-title mt-5">{item.title}</h3>
                  <p className="body-copy mt-3">{item.text}</p>
                </article>
              );
            })}
          </div>
          <nav aria-label={currentLanguage === "zh" ? "解决方案" : "Solutions"} className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-3">
            {Object.values(solutionContent[currentLanguage]).map((solution) => <Link key={solution.path} to={solution.path} className="rounded-full border border-brand-100 bg-white px-4 py-2 text-sm font-semibold text-brand-700 transition hover:border-brand-500 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-100">{solution.navLabel}</Link>)}
          </nav>
        </div>
      </section>

      <section className="home-section-primary py-14 sm:py-16">
        <div className="container-site">
          <SectionHead eyebrow={content.platforms.eyebrow} title={content.platforms.title} center />
          <div className="platform-hub mx-auto grid max-w-4xl gap-7 rounded-2xl p-5 sm:grid-cols-2 sm:p-7">
            <div>
              <h3 className="text-sm font-bold tracking-[.1em] text-navy">{content.platforms.customer}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">{content.platforms.customerItems.map((item) => <li key={item}><PlatformTag icon={platformIconByLabel[item]} label={item} /></li>)}</ul>
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-[.1em] text-navy">{content.platforms.tools}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">{content.platforms.toolItems.map((item) => <li key={item}><PlatformTag icon={platformIconByLabel[item]} label={item} /></li>)}</ul>
            </div>
          </div>
          <p className="mx-auto mt-4 max-w-3xl text-center text-xs leading-5 text-muted">{content.platforms.note}</p>
        </div>
      </section>

      <section className="section home-section-light">
        <div className="container-site grid items-center gap-10 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-16">
          <figure className="mx-auto w-full max-w-[300px]">
            <div className="dark-media-shell overflow-hidden rounded-3xl">
              <VideoPlayer
                src="/videos/faq-live-demo.mp4"
                title={content.live.videoTitle}
                description={content.live.videoDescription}
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                preload="metadata"
                playWhenVisible
                aspect="phone"
                fit="contain"
              />
            </div>
          </figure>
          <div>
            <SectionHead eyebrow={content.live.eyebrow} title={content.live.title} intro={content.live.body} />
            <ol className="space-y-3">
              {content.live.steps.map((step, index) => <li key={step} className="flex items-center gap-3"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white">{index + 1}</span><span className="font-semibold text-ink">{step}</span></li>)}
            </ol>
            <Link to="/demo" className="btn-primary mt-7">{content.live.cta}<ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="section home-section-primary">
        <div className="container-site">
          <SectionHead eyebrow={content.comparison.eyebrow} title={content.comparison.title} center />
          <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-[#213953] bg-[#0B1728] p-6 sm:p-7">
              <h3 className="card-title text-[#B7C5D6]">{content.comparison.ordinary}</h3>
              <ul className="mt-6 space-y-4">
                {content.comparison.rows.map(([ordinary]) => <li key={ordinary} className="flex gap-3 text-[#8192A6]"><X className="mt-0.5 shrink-0 text-[#8192A6]" size={18} aria-hidden="true" />{ordinary}</li>)}
              </ul>
            </article>
            <article className="rounded-2xl border border-brand-500/70 bg-[#14263D] p-6 sm:p-7">
              <h3 className="card-title text-white">{content.comparison.superchat}</h3>
              <ul className="mt-6 space-y-4">
                {content.comparison.rows.map(([, superchat]) => <li key={superchat} className="flex gap-3 font-medium text-[#EAF1F8]"><Check className="mt-0.5 shrink-0 text-[#57A2E6]" size={18} aria-hidden="true" />{superchat}</li>)}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section home-section-light-tint">
        <div className="container-site">
          <div className="section-heading max-w-4xl">
            <span className="eyebrow">{content.buildProcess.eyebrow}</span>
            <h2 className="section-title">
              {content.buildProcess.title.map((line) => <span key={line} className="block">{line}</span>)}
            </h2>
            <p className="lead mt-5">{content.buildProcess.body}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {content.buildProcess.steps.map((step) => (
              <article key={step.number} className="build-process-card flex min-h-[220px] flex-col rounded-2xl border p-6 sm:p-7">
                <div className="flex items-start justify-between gap-5">
                  <h3 className="card-title max-w-[15rem]">{step.title}</h3>
                  <span className="build-process-number" aria-hidden="true">{step.number}</span>
                </div>
                <p className="body-copy mt-6">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-section-primary">
        <div className="container-site grid items-center gap-12 lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-16">
          <img src="/images/founder/founder-portrait.jpeg" alt={content.service.alt} width="720" height="1080" loading="lazy" decoding="async" className="mx-auto aspect-[4/5] w-full max-w-[380px] rounded-2xl border border-brand-500/50 bg-[#101F33] object-cover object-[center_18%] p-1.5 shadow-soft" />
          <div>
            <span className="eyebrow !bg-white">{content.service.eyebrow}</span>
            <h2 className="section-title">{content.service.title}</h2>
            <p className="mt-5 font-bold text-ink">{content.service.name} <span className="font-normal text-muted">· {content.service.role}</span></p>
            <div className="mt-5 space-y-3">
              {content.service.body.map((paragraph) => <p key={paragraph} className="body-copy">{paragraph}</p>)}
            </div>
            <ol className="mt-7 grid gap-3 sm:grid-cols-2">
              {content.service.steps.map((step, index) => <li key={step} className="timeline-step flex items-center gap-3 rounded-xl border border-[#213953] bg-[#101F33] p-4"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white">{index + 1}</span><span className="font-semibold text-ink">{step}</span></li>)}
            </ol>
            <ContactAction className="btn-primary mt-7">{content.service.cta}<ArrowRight size={18} aria-hidden="true" /></ContactAction>
          </div>
        </div>
      </section>

      <PricingSection />

      <section id="faq" className="section home-section-primary">
        <div className="container-site grid gap-10 lg:grid-cols-[.55fr_1fr] lg:gap-14">
          <div><span className="eyebrow">{copy.home.faq.eyebrow}</span><h2 className="section-title">{copy.home.faq.title}</h2><p className="lead mt-5">{copy.home.faq.intro}</p></div>
          <div>
            <h3 className="content-title mb-2">{geo.home.qaTitle}</h3>
            <p className="mb-5 text-sm leading-6 text-muted">{geo.home.qaIntro}</p>
            {geo.home.qa.map((item, index) => <FaqItem key={item.q} question={item.q} answer={item.a} index={index} />)}
            {faqItems.length > 0 && (
              <details className="group mt-5 rounded-2xl border border-brand-100 bg-white p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-brand-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-100">
                  {content.faq.more}<ChevronDown className="shrink-0 transition group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className="mt-4">{faqItems.map((item, index) => <FaqItem key={item.q} question={item.q} answer={item.a} index={index + 100} />)}</div>
              </details>
            )}
          </div>
        </div>
      </section>

      <section className="section home-section-final">
        <div className="container-site">
          <div className="final-cta-dark overflow-hidden rounded-3xl border border-[#29435F] px-5 py-14 text-center shadow-soft sm:px-12 sm:py-16">
            <span className="eyebrow !border-white/20 !bg-white/10 !text-white">{content.finalCta.eyebrow}</span>
            <h2 className="section-title mx-auto !max-w-3xl !text-white">{content.finalCta.title}</h2>
            <p className="lead mx-auto mt-5 max-w-3xl !text-blue-50">{content.finalCta.text}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/demo" className="btn !bg-[#F4F8FC] !text-[#102A56] hover:!bg-[#EAF1F8]">{content.finalCta.demo}</Link>
              <ContactAction className="btn !border !border-white/40 !bg-transparent !text-white hover:!bg-white/10">{content.finalCta.contact}<ArrowRight size={18} aria-hidden="true" /></ContactAction>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

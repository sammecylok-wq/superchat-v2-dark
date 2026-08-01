import { ArrowRight, Bot, CheckCircle2, MessageSquareText, ShieldCheck, UserRoundCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { ContactAction } from "../components/ContactAction";
import { VideoPlayer } from "../components/Media";
import { Seo } from "../components/Seo";
import solutionContent from "../i18n/solutionContent.json";
import type { Language } from "../i18n/types";
import { useLanguage } from "../i18n/useLanguage";

export type SolutionKey = keyof typeof solutionContent.en;
type Solution = (typeof solutionContent)[Language][SolutionKey];

const solutionKeys = Object.keys(solutionContent.en) as SolutionKey[];

function SectionHeading({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: string }) {
  return (
    <div className="section-heading">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="section-title">{title}</h2>
      {intro && <p className="lead mt-5">{intro}</p>}
    </div>
  );
}

export function SolutionPage({ solutionKey }: { solutionKey: SolutionKey }) {
  const { currentLanguage } = useLanguage();
  const content: Solution = solutionContent[currentLanguage][solutionKey];
  const common = currentLanguage === "zh"
    ? { home: "首页", demo: "真实 Demo", related: "相关解决方案", problem: "企业面对的问题", how: "流程", benefits: "业务价值", human: "人工控制", faq: "常见问题", contact: "联系 SuperChat" }
    : { home: "Home", demo: "Live Demos", related: "Related solutions", problem: "The business problem", how: "Workflow", benefits: "Business value", human: "Human control", faq: "Questions", contact: "Contact SuperChat" };
  const related = solutionKeys.filter((key) => key !== solutionKey);

  return (
    <>
      <Seo
        title={content.seo.title}
        description={content.seo.description}
        keywords={content.seo.primaryKeyword}
        path={content.path}
        service={{ name: content.hero.title, description: content.seo.description, path: content.path }}
      />

      <section className="dark-hero home-section-primary relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="dot-grid absolute inset-y-0 right-0 -z-10 w-1/2 opacity-50" />
        <div className="container-site">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted">
            <Link to="/" className="transition hover:text-brand-500">{common.home}</Link><span aria-hidden="true">/</span><span>{content.navLabel}</span>
          </nav>
          <div className="max-w-4xl">
            <span className="eyebrow">{content.hero.eyebrow}</span>
            <h1 className="page-title mt-4 !max-w-4xl !text-[#F4F8FC]">{content.hero.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#B7C5D6]">{content.hero.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ContactAction className="btn-primary">{content.cta.primary}<ArrowRight size={18} aria-hidden="true" /></ContactAction>
              <Link to="/demo" className="btn-secondary">{common.demo}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section home-section-light-tint">
        <div className="container-site">
          <SectionHeading eyebrow={common.problem} title={content.problem.title} intro={content.problem.intro} />
          <div className="grid gap-5 md:grid-cols-3">
            {content.problem.items.map((item) => <article key={item.title} className="card"><MessageSquareText className="text-brand-600" size={22} aria-hidden="true" /><h3 className="card-title mt-5">{item.title}</h3><p className="body-copy mt-3">{item.text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section home-section-primary">
        <div className="container-site">
          <SectionHeading eyebrow={common.how} title={content.how.title} intro={content.how.intro} />
          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {content.how.steps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-[#213953] bg-[#101F33] p-5">
                <span className="flex size-9 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white">{index + 1}</span>
                <h3 className="card-title mt-5">{step.title}</h3><p className="body-copy mt-3">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section home-section-light">
        <div className="container-site">
          <SectionHeading eyebrow={common.benefits} title={content.benefits.title} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {content.benefits.items.map((item) => <article key={item.title} className="card"><CheckCircle2 className="text-brand-600" size={22} aria-hidden="true" /><h3 className="card-title mt-5">{item.title}</h3><p className="body-copy mt-3">{item.text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section home-section-primary">
        <div className="container-site">
          <SectionHeading eyebrow={common.human} title={content.human.title} intro={content.human.intro} />
          <div className="grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-brand-500/40 bg-[#102238] p-6 sm:p-7">
              <Bot className="text-brand-500" size={28} aria-hidden="true" /><h3 className="content-title mt-5">{content.human.aiTitle}</h3>
              <ul className="mt-5 space-y-3">{content.human.aiItems.map((item) => <li key={item} className="flex gap-3 text-[#D7E2ED]"><CheckCircle2 className="mt-0.5 shrink-0 text-brand-500" size={18} aria-hidden="true" />{item}</li>)}</ul>
            </article>
            <article className="rounded-2xl border border-[#29435F] bg-[#0E1D30] p-6 sm:p-7">
              <UserRoundCheck className="text-brand-500" size={28} aria-hidden="true" /><h3 className="content-title mt-5">{content.human.staffTitle}</h3>
              <ul className="mt-5 space-y-3">{content.human.staffItems.map((item) => <li key={item} className="flex gap-3 text-[#D7E2ED]"><ShieldCheck className="mt-0.5 shrink-0 text-brand-500" size={18} aria-hidden="true" />{item}</li>)}</ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section home-section-light-tint">
        <div className="container-site grid items-center gap-10 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-16">
          {content.demo.videoSrc ? (
            <div className="mx-auto w-full max-w-[280px] overflow-hidden rounded-[22px] bg-black shadow-soft">
              <VideoPlayer src={content.demo.videoSrc} title={content.demo.videoTitle} description={content.demo.text} autoPlay muted loop playsInline controls={false} playWhenVisible preload="metadata" aspect="phone" fit="contain" />
            </div>
          ) : (
            <div className="mx-auto flex aspect-[4/5] w-full max-w-[280px] items-center justify-center rounded-[22px] border border-brand-100 bg-white p-8 text-center shadow-soft">
              <div><UserRoundCheck className="mx-auto text-brand-600" size={42} aria-hidden="true" /><p className="mt-5 font-bold text-ink">AI + Human</p></div>
            </div>
          )}
          <div><SectionHeading eyebrow="Demo" title={content.demo.title} intro={content.demo.text} /><Link to="/demo" className="btn-primary">{common.demo}<ArrowRight size={18} aria-hidden="true" /></Link></div>
        </div>
      </section>

      <section className="section home-section-primary">
        <div className="container-site grid gap-10 lg:grid-cols-[.55fr_1fr] lg:gap-14">
          <SectionHeading eyebrow={common.faq} title={content.faq.title} />
          <div>
            {content.faq.items.map((item) => (
              <details key={item.q} className="group mb-3 rounded-xl border border-[#213953] bg-[#101F33] px-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-semibold text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/30">{item.q}<span className="text-brand-500 transition group-open:rotate-45" aria-hidden="true">+</span></summary>
                <p className="pb-5 pr-8 text-base leading-7 text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-section-light">
        <div className="container-site">
          <SectionHeading eyebrow={common.related} title={common.related} intro={content.relatedIntro} />
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((key) => <Link key={key} to={solutionContent[currentLanguage][key].path} className="card flex items-center justify-between gap-4 font-bold text-ink transition hover:border-brand-500 hover:text-brand-700">{solutionContent[currentLanguage][key].navLabel}<ArrowRight size={18} aria-hidden="true" /></Link>)}
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold"><Link to="/" className="text-brand-700 hover:underline">{common.home}</Link><Link to="/demo" className="text-brand-700 hover:underline">{common.demo}</Link><Link to="/contact" className="text-brand-700 hover:underline">{common.contact}</Link></div>
        </div>
      </section>

      <section className="section home-section-final">
        <div className="container-site">
          <div className="final-cta-dark rounded-3xl border border-[#29435F] px-5 py-14 text-center shadow-soft sm:px-12 sm:py-16">
            <h2 className="section-title mx-auto !max-w-3xl !text-white">{content.cta.title}</h2>
            <p className="lead mx-auto mt-5 max-w-2xl !text-blue-50">{content.cta.text}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"><ContactAction className="btn !bg-[#F4F8FC] !text-[#102A56] hover:!bg-[#EAF1F8]">{content.cta.primary}</ContactAction><Link to="/contact" className="btn !border !border-white/40 !bg-transparent !text-white hover:!bg-white/10">{content.cta.secondary}</Link></div>
          </div>
        </div>
      </section>
    </>
  );
}

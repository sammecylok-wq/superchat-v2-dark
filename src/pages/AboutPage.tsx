import { ArrowRight, BrainCircuit, HeartHandshake, MessagesSquare, ShieldCheck, TestTube2, UserRoundCheck } from "lucide-react";
import { Brand } from "../components/Brand";
import { ContactAction } from "../components/ContactAction";
import { Seo } from "../components/Seo";
import { useLanguage } from "../i18n/useLanguage";

const beliefIcons = [HeartHandshake, TestTube2, ShieldCheck, BrainCircuit, MessagesSquare];

export function AboutPage() {
  const { copy } = useLanguage();
  const content = copy.about;

  return (
    <>
      <Seo title={copy.seo.about.title} description={copy.seo.about.description} path="/about" />
      <section className="section about-section-white">
        <div className="container-site grid items-center gap-12 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <div className="mb-7"><Brand size="about" /></div>
            <span className="eyebrow !bg-white">{content.eyebrow}</span>
            <h1 className="page-title">{content.title}</h1>
            <p className="mt-7 text-xl font-semibold leading-8 text-ink">{content.coreTitle}</p>
            <p className="lead mt-4">{content.coreText}</p>
            <p className="lead mt-4">{content.servicePositioning}</p>
          </div>
          <img src="/images/founder/founder-portrait.jpeg" alt={content.founderAlt} width="720" height="1080" loading="lazy" decoding="async" className="aspect-[2/3] w-full max-w-md justify-self-center rounded-3xl border border-brand-100 object-cover object-[center_18%] shadow-soft sm:aspect-[3/4]" />
        </div>
      </section>

      <section className="section about-section-tint">
        <div className="container-site">
          <div className="mx-auto max-w-4xl">
            <span className="eyebrow">{content.founderEyebrow}</span>
            <h2 className="content-title">{content.founderName}</h2>
            <p className="mt-2 font-semibold text-brand-700">{content.founderRole} · {content.founderLocation}</p>
            <h3 className="content-title mt-10">{content.whyTitle}</h3>
            <div className="mt-5 space-y-4 text-base leading-7 text-muted">
              {content.whyParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section about-section-white">
        <div className="container-site">
          <div className="section-heading mx-auto text-center">
            <span className="eyebrow">{content.approachEyebrow}</span>
            <h2 className="section-title mx-auto">{content.approachTitle}</h2>
            <p className="lead mx-auto mt-5 max-w-3xl">{content.approachText}</p>
          </div>
          <h3 className="content-title mb-6 text-center">{content.beliefsTitle}</h3>
          <div className="grid gap-5 sm:grid-cols-2">
            {content.beliefs.map((belief, index) => {
              const Icon = beliefIcons[index];
              return <article key={belief.title} className="card"><span className="icon-tile"><Icon size={21} aria-hidden="true" /></span><h4 className="card-title mt-5">{belief.title}</h4><p className="body-copy mt-3">{belief.text}</p></article>;
            })}
          </div>
        </div>
      </section>

      <section className="section about-section-tint">
        <div className="container-site text-center">
          <UserRoundCheck className="mx-auto text-brand-600" size={36} aria-hidden="true" />
          <h2 className="section-title mx-auto mt-5 !max-w-3xl">{content.closingTitle}</h2>
          <p className="lead mx-auto mt-5 max-w-2xl">{content.closingText}</p>
          <div className="mt-8"><ContactAction>{content.cta}<ArrowRight size={18} aria-hidden="true" /></ContactAction></div>
        </div>
      </section>
    </>
  );
}

import { Seo } from "../components/Seo";
import { useLanguage } from "../i18n/useLanguage";

function LegalPage({ type }: { type: "privacy" | "terms" }) {
  const { copy } = useLanguage();
  const content = copy[type];
  const seo = copy.seo[type];
  const businessStatement = type === "privacy"
    ? "SuperChat Marketing is a brand operated by HAOS BROTHER MOBILITY, a business registered in Malaysia."
    : "These services are provided by HAOS BROTHER MOBILITY under the SuperChat Marketing brand.";

  return (
    <>
      <Seo title={seo.title} description={seo.description} path={type === "privacy" ? "/privacy" : "/terms"} />
      <section className="border-b border-zinc-200 bg-zinc-50 py-16 sm:py-20">
        <div className="container-site">
          <span className="eyebrow">{content.eyebrow}</span>
          <h1 className="page-title">{content.title}</h1>
          <p className="mt-5 text-sm text-muted">{content.updated}</p>
        </div>
      </section>
      <section className="section">
        <div className="container-site max-w-4xl">
          <div className="mb-10 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">{content.notice}</div>
          <p className="body-pretty mb-10">{businessStatement}</p>
          <div className="space-y-10">
            {content.sections.map((section, index) => (
              <section key={section.title} aria-labelledby={`${type}-${index}`}>
                <h2 id={`${type}-${index}`} className="content-title">{index + 1}. {section.title}</h2>
                <p className="body-pretty mt-3">{section.body}</p>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function PrivacyPage() { return <LegalPage type="privacy" />; }
export function TermsPage() { return <LegalPage type="terms" />; }

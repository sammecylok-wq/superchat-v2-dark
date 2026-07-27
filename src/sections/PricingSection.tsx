import { Check, ChevronDown, MessageCircle } from "lucide-react";
import { ContactAction } from "../components/ContactAction";
import { siteConfig } from "../config/siteConfig";
import { useLanguage } from "../i18n/useLanguage";
import { v2Content } from "../i18n/v2Content";

export function PricingSection() {
  const { copy, currentLanguage } = useLanguage();
  const content = copy.home.pricing;
  const v2 = v2Content[currentLanguage].pricing;

  return (
    <section id="pricing" className="section home-section-light" aria-labelledby="pricing-title">
      <div className="container-site">
        <div className="mx-auto max-w-4xl text-center">
          <span className="eyebrow !bg-white">{content.eyebrow}</span>
          <h2 id="pricing-title" className="section-title mx-auto">{content.title}</h2>
          <p className="lead mx-auto mt-5 max-w-3xl">{content.intro}</p>
        </div>

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
          {content.plans.map((plan, index) => {
            const recommended = index === 1;
            return (
              <article
                key={plan.name}
                className={`flex min-w-0 flex-col rounded-3xl border p-6 shadow-sm sm:p-7 ${
                  recommended
                    ? "border-brand-500 bg-[#14263D] ring-2 ring-brand-500/20 lg:-translate-y-2 lg:shadow-soft"
                    : index === 2
                      ? "border-brand-500/50 bg-[#101F33]"
                      : "border-[#213953] bg-[#101F33]"
                }`}
              >
                <span className={`w-fit rounded-full px-3 py-1.5 text-xs font-bold ${recommended ? "bg-brand-500 text-white" : "bg-brand-50 text-brand-700"}`}>{plan.tag}</span>
                <h3 className="content-title mt-5">{plan.name}</h3>
                <div className="mt-6 border-y border-[#DCE4EE] py-5">
                  {"originalPrice" in plan && <p className="text-sm text-muted line-through">{plan.originalPrice}</p>}
                  <p className="mt-1 text-3xl font-bold tracking-tight text-navy">{plan.price}</p>
                  {"contract" in plan && <p className="mt-2 text-sm font-semibold text-brand-700">{plan.contract}</p>}
                  {"promotion" in plan && <p className="mt-2 text-sm font-bold text-brand-700">{plan.promotion}</p>}
                </div>

                <ul className="mt-6 space-y-3">
                  {v2.coreFeatures[index].map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm leading-6 text-muted">
                      <Check className="mt-1 shrink-0 text-green-600" size={17} strokeWidth={2.5} aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <details className="group mt-5 border-t border-[#DCE4EE] pt-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold text-brand-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-100">
                    {v2.fullFeatures}<ChevronDown className="size-4 transition group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <ul className="mt-4 space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-xs leading-5 text-muted">
                        <Check className="mt-0.5 shrink-0 text-brand-600" size={15} aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs leading-5 text-muted">{plan.finePrint}</p>
                </details>
                <ContactAction
                  message={plan.whatsappMessage}
                  ariaLabel={plan.cta}
                  className={`${recommended ? "btn-primary" : "btn-secondary !border-brand-500 !text-brand-700 hover:!bg-brand-50"} mt-5 w-full`}
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  {plan.cta}
                </ContactAction>
              </article>
            );
          })}
        </div>
        <p className="mt-6 text-center text-sm font-semibold text-muted">{content.consultant}: {siteConfig.whatsappDisplayNumber}</p>

        <details className="group mx-auto mt-8 max-w-4xl rounded-2xl border border-[#213953] bg-[#101F33] p-5 sm:p-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-navy focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-100">
            {v2.notes}<ChevronDown className="shrink-0 text-brand-600 transition group-open:rotate-180" aria-hidden="true" />
          </summary>
          <div className="mt-5">
            <h3 className="card-title">{content.notesTitle}</h3>
            <ul className="mt-4 grid gap-3 md:grid-cols-2">
              {content.notes.map((note) => (
                <li key={note} className="flex items-start gap-2.5 text-sm leading-6 text-muted">
                  <Check className="mt-1 shrink-0 text-green-600" size={17} aria-hidden="true" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </details>
      </div>
    </section>
  );
}

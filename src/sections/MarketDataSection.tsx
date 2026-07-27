import { ExternalLink, Globe2, MapPin } from "lucide-react";
import { useLanguage } from "../i18n/useLanguage";

const sources = {
  malaysia: {
    label: "Kantar 2024 Business Messaging Usage Research, commissioned by Meta",
    href: "https://international.astroawani.com/malaysia-news/whatsapp-connects-businesses-consumers-most-malaysians-prefer-messaging-meta-485315",
  },
  global: {
    label: "WhatsApp Business, State of Business Messaging",
    href: "https://whatsappbusiness.com/resources/resource-library/state-of-business-messaging/",
  },
} as const;

const statMeta = [
  { source: sources.malaysia, Icon: MapPin },
  { source: sources.malaysia, Icon: MapPin },
  { source: sources.global, Icon: Globe2 },
];

export function MarketDataSection() {
  const { copy } = useLanguage();
  const content = copy.home.market;

  return (
    <section className="section bg-brand-50" aria-labelledby="market-data-title">
      <div className="container-site">
        <div className="max-w-4xl">
          <span className="eyebrow !bg-white">{content.eyebrow}</span>
          <h2 id="market-data-title" className="section-title">{content.title}</h2>
          <div className="mt-5 max-w-3xl space-y-3 text-lg leading-8 text-muted">
            {content.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {content.stats.map((stat, index) => {
            const { source, Icon } = statMeta[index];
            return (
              <article key={`${stat.scope}-${stat.value}`} className="flex min-w-0 flex-col rounded-2xl border border-[#DCE4EE] bg-white p-6 shadow-sm sm:p-7">
                <span className="inline-flex w-fit min-w-0 items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700">
                  <Icon className="shrink-0" size={15} aria-hidden="true" />
                  <span>{stat.scope}</span>
                </span>
                <p className="mt-7 break-words text-5xl font-bold leading-none tracking-[-0.04em] text-navy sm:text-[3.5rem]">{stat.value}</p>
                <p className="mt-5 flex-1 text-base leading-7 text-ink">{stat.description}</p>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex items-start gap-1.5 border-t border-[#DCE4EE] pt-4 text-xs leading-5 text-muted underline decoration-brand-100 underline-offset-4 transition-colors hover:text-brand-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-100"
                  aria-label={`${source.label} (${copy.common.openNewWindow})`}
                >
                  <span>{copy.common.source}: {source.label}</span>
                  <ExternalLink className="mt-0.5 shrink-0" size={13} aria-hidden="true" />
                </a>
              </article>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-[#DCE4EE] bg-white/80 p-5 text-sm leading-6 text-muted sm:p-6">
          <p className="font-bold text-navy">{content.sources}</p>
          <ul className="mt-2 space-y-2">
            {Object.values(sources).map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-start gap-1.5 underline decoration-brand-100 underline-offset-4 transition-colors hover:text-brand-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-100"
                  aria-label={`${source.label} (${copy.common.openNewWindow})`}
                >
                  <span>{source.label}</span>
                  <ExternalLink className="mt-1 shrink-0" size={13} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-5">{content.note}</p>
        </div>
      </div>
    </section>
  );
}

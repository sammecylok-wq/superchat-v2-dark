import { ArrowDown, ArrowRight, BrainCircuit, MessagesSquare, Wrench } from "lucide-react";
import { PlatformTag } from "../components/PlatformTag";
import { platformIconByLabel } from "../config/platformIcons";
import { useLanguage } from "../i18n/useLanguage";

function ListPanel({ title, items, icon: Icon }: { title: string; items: readonly string[]; icon: typeof MessagesSquare }) {
  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm sm:p-7">
      <span className="icon-tile"><Icon size={21} aria-hidden="true" /></span>
      <h3 className="card-title mt-5">{title}</h3>
      <ul className="mt-5 flex flex-wrap gap-2.5">
        {items.map((item) => <li key={item}><PlatformTag icon={platformIconByLabel[item]} label={item} /></li>)}
      </ul>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex items-center justify-center text-brand-500" aria-hidden="true">
      <ArrowDown className="lg:hidden" size={24} />
      <ArrowRight className="hidden lg:block" size={26} />
    </div>
  );
}

export function MultiPlatformSection() {
  const { copy } = useLanguage();
  const content = copy.home.multiPlatform;

  return (
    <section className="section bg-white" aria-labelledby="multi-platform-title">
      <div className="container-site">
        <div className="mx-auto max-w-4xl text-center">
          <span className="eyebrow">{content.eyebrow}</span>
          <h2 id="multi-platform-title" className="section-title mx-auto">{content.title}</h2>
          <div className="mx-auto mt-5 max-w-3xl space-y-3 text-lg leading-8 text-muted">
            {content.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>

        <div className="mt-10 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1.08fr_auto_1fr] lg:gap-5">
          <ListPanel title={content.channelsTitle} items={content.channels} icon={MessagesSquare} />
          <FlowArrow />
          <div className="rounded-2xl border border-brand-500 bg-navy p-6 text-white shadow-soft sm:p-7">
            <span className="flex size-11 items-center justify-center rounded-xl bg-brand-500 text-white"><BrainCircuit size={22} aria-hidden="true" /></span>
            <h3 className="card-title mt-5 !text-white">{content.systemTitle}</h3>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
              {content.systemItems.map((item) => <li key={item} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-blue-50">{item}</li>)}
            </ul>
          </div>
          <FlowArrow />
          <ListPanel title={content.toolsTitle} items={content.tools} icon={Wrench} />
        </div>

        <p className="mx-auto mt-7 max-w-4xl text-center text-sm leading-6 text-muted">{content.disclaimer}</p>
      </div>
    </section>
  );
}

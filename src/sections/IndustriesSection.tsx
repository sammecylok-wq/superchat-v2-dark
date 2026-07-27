import { CalendarCheck, Droplets, Eye, Heart, Scissors } from "lucide-react";
import { useLanguage } from "../i18n/useLanguage";

const industryMeta = [
  { Icon: Heart, primary: true },
  { Icon: Scissors, primary: true },
  { Icon: Droplets, primary: true },
  { Icon: Eye, primary: false },
  { Icon: CalendarCheck, primary: false },
];

export function IndustriesSection() {
  const { copy } = useLanguage();
  const content = copy.home.industries;

  return (
    <section className="section bg-white" aria-labelledby="industries-title">
      <div className="container-site">
        <div className="mx-auto max-w-4xl text-center">
          <span className="eyebrow">{content.eyebrow}</span>
          <h2 id="industries-title" className="section-title mx-auto">{content.title}</h2>
          <p className="lead mx-auto mt-5 max-w-3xl">{content.intro}</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {content.items.map((item, index) => {
            const { Icon, primary } = industryMeta[index];
            return (
              <article key={item.title} className={`flex min-h-[210px] min-w-0 flex-col rounded-2xl border bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md ${primary ? "border-brand-100" : "border-[#DCE4EE]"}`}>
                <span className="icon-tile"><Icon size={21} aria-hidden="true" /></span>
                <h3 className="card-title mt-5 break-words">{item.title}</h3>
                <p className="body-copy mt-3">{item.text}</p>
              </article>
            );
          })}
        </div>
        <div className="mt-8 rounded-2xl border border-brand-100 bg-brand-50 p-6 text-center sm:p-7">
          <p className="text-lg font-bold text-navy">{content.closingTitle}</p>
          <p className="mx-auto mt-2 max-w-3xl leading-7 text-muted">{content.closingText}</p>
        </div>
      </div>
    </section>
  );
}

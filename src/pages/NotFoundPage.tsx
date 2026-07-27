import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Brand } from "../components/Brand";
import { Seo } from "../components/Seo";
import { useLanguage } from "../i18n/useLanguage";

export function NotFoundPage() {
  const { copy } = useLanguage();
  const content = copy.notFound;

  return (
    <section className="section min-h-[60vh]">
      <Seo title={copy.seo.notFound.title} description={copy.seo.notFound.description} path="/404" noindex />
      <div className="container-site text-center">
        <div className="mb-8 flex justify-center"><Brand size="about" /></div>
        <p className="text-sm font-bold tracking-[.2em] text-brand-600">404</p>
        <h1 className="page-title mx-auto mt-4">{content.title}</h1>
        <p className="lead mx-auto mt-5 max-w-xl">{content.text}</p>
        <Link to="/" className="btn-primary mt-8"><ArrowLeft size={18} aria-hidden="true" />{content.button}</Link>
      </div>
    </section>
  );
}

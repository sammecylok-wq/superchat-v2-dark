import { LogIn, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig } from "../config/siteConfig";
import geoContent from "../i18n/geoContent.json";
import { v2Content } from "../i18n/v2Content";
import { useLanguage } from "../i18n/useLanguage";
import { createWhatsAppUrl } from "../utils/whatsapp";
import { Brand } from "./Brand";

export function Footer() {
  const { copy, currentLanguage } = useLanguage();
  const v2 = v2Content[currentLanguage];
  const geo = geoContent[currentLanguage].footer;
  const whatsappUrl = createWhatsAppUrl(siteConfig.whatsappNumber, copy.common.whatsappPrefill);
  const footerLinks = [
    [v2.nav.home, "/"],
    [v2.nav.demo, "/demo"],
    [v2.nav.pricing, "/#pricing"],
    [v2.nav.about, "/about"],
    [geo.contact, "/contact"],
    [v2.nav.faq, "/#faq"],
    [copy.footer.privacy, "/privacy"],
    [copy.footer.terms, "/terms"],
  ];

  return (
    <footer className="border-t border-[#E5E7EB] bg-[#F8FAFC] py-12 text-[#4B5563] sm:py-16 lg:pb-16 lg:pt-20">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start lg:gap-16">
          <div>
            <Brand size="footer" />
            <p className="mt-6 max-w-md text-base font-bold leading-7 text-[#111827]">{geo.tagline}</p>
            <p className="mt-3 text-sm leading-6 text-[#4B5563]">{geo.market} · {siteConfig.whatsappDisplayNumber}</p>
            {import.meta.env.DEV && <span className="mt-4 inline-flex rounded-full border border-[#BFDBFE] bg-[#EFF6FF] px-3 py-1 text-xs font-bold text-[#1D4ED8]">{v2.footer.preview}</span>}
          </div>
          <div className="lg:justify-self-end">
            <nav aria-label={copy.footer.navigation}>
              <ul className="flex max-w-2xl flex-wrap gap-x-5 gap-y-3 text-sm font-medium text-[#374151]">
                {footerLinks.map(([label, to]) => <li key={to}><Link to={to} className="rounded-sm transition-colors duration-200 hover:text-[#2563EB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/30">{label}</Link></li>)}
                <li><a href={siteConfig.clientLoginUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-sm transition-colors duration-200 hover:text-[#2563EB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/30"><LogIn size={15} aria-hidden="true" />{v2.footer.login}</a></li>
                {whatsappUrl && <li><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-sm font-semibold text-[#2563EB] transition-colors duration-200 hover:text-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/30"><MessageCircle size={15} aria-hidden="true" />{v2.footer.whatsapp}</a></li>}
              </ul>
            </nav>
          </div>
        </div>
        <div className="mt-12 border-t border-[#E5E7EB] pt-6 text-xs leading-5 text-[#6B7280]">
          <p>© {new Date().getFullYear()} {copy.footer.rights}</p>
          <p className="mt-1">SuperChat Marketing is operated by HAOS BROTHER MOBILITY.</p>
        </div>
      </div>
    </footer>
  );
}

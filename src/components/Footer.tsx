import { LogIn, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig } from "../config/siteConfig";
import { v2Content } from "../i18n/v2Content";
import { useLanguage } from "../i18n/useLanguage";
import { createWhatsAppUrl } from "../utils/whatsapp";
import { Brand } from "./Brand";

export function Footer() {
  const { copy, currentLanguage } = useLanguage();
  const v2 = v2Content[currentLanguage];
  const whatsappUrl = createWhatsAppUrl(siteConfig.whatsappNumber, copy.common.whatsappPrefill);
  const footerLinks = [
    [v2.nav.home, "/"],
    [v2.nav.demo, "/demo"],
    [v2.nav.pricing, "/#pricing"],
    [v2.nav.about, "/about"],
    [v2.nav.faq, "/#faq"],
    [copy.footer.privacy, "/privacy"],
    [copy.footer.terms, "/terms"],
  ];

  return (
    <footer className="border-t border-[#213953] bg-[#040A12] pb-24 pt-14 text-[#EAF1F8] sm:pb-14">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <div>
            <Brand size="footer" />
            <p className="mt-5 max-w-md text-base font-semibold leading-7 text-navy">{v2.footer.tagline}</p>
            {import.meta.env.DEV && <span className="mt-4 inline-flex rounded-full border border-[#29435F] bg-[#101F33] px-3 py-1 text-xs font-bold text-[#8FC4F2]">{v2.footer.preview}</span>}
          </div>
          <div className="lg:justify-self-end">
            <nav aria-label={copy.footer.navigation}>
              <ul className="flex max-w-2xl flex-wrap gap-x-5 gap-y-3 text-sm font-medium text-[#8FA0B5]">
                {footerLinks.map(([label, to]) => <li key={to}><Link to={to} className="hover:text-brand-700">{label}</Link></li>)}
                {siteConfig.clientLoginUrl && <li><a href={siteConfig.clientLoginUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-brand-700"><LogIn size={15} aria-hidden="true" />{v2.footer.login}</a></li>}
                {whatsappUrl && <li><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-brand-700 hover:text-brand-600"><MessageCircle size={15} aria-hidden="true" />{v2.footer.whatsapp}</a></li>}
              </ul>
            </nav>
          </div>
        </div>
        <div className="mt-10 border-t border-[#213953] pt-6 text-xs leading-5 text-[#8FA0B5]">
          <p>© {new Date().getFullYear()} {copy.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}

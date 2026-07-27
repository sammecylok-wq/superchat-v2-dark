import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../config/siteConfig";
import { useLanguage } from "../i18n/useLanguage";
import { createWhatsAppUrl } from "../utils/whatsapp";

type Props = {
  children: ReactNode;
  className?: string;
  message?: string;
  ariaLabel?: string;
};

export function ContactAction({ children, className = "btn-primary", message, ariaLabel }: Props) {
  const { copy } = useLanguage();
  const resolvedLabel = ariaLabel ?? copy.nav.book;
  const url = createWhatsAppUrl(siteConfig.whatsappNumber, message ?? copy.common.whatsappPrefill);
  if (!url) {
    return <Link to="/contact" className={className} aria-label={`${resolvedLabel} — ${copy.common.contactUnavailable}`}>{children}</Link>;
  }
  return <a href={url} target="_blank" rel="noopener noreferrer" className={className} aria-label={resolvedLabel}>{children}</a>;
}

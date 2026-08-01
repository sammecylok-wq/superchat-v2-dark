import { useEffect } from "react";
import { siteConfig } from "../config/siteConfig";
import { useLanguage } from "../i18n/useLanguage";

type Props = { title: string; description: string; keywords?: string; path?: string; noindex?: boolean };

function setMeta(selector: string, attrs: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.append(element);
  }
  Object.entries(attrs).forEach(([key, value]) => element?.setAttribute(key, value));
}

export function Seo({ title, description, keywords, path = "/", noindex = false }: Props) {
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    const canonicalUrl = `${siteConfig.domain}${path === "/" ? "/" : path}`;
    const imageUrl = `${siteConfig.domain}/images/logo/superchat-logo.png`;
    const locale = currentLanguage === "zh" ? "zh_MY" : "en_MY";

    document.title = title;
    document.documentElement.lang = currentLanguage === "zh" ? "zh" : "en-MY";
    setMeta('meta[name="description"]', { name: "description", content: description });
    if (keywords) {
      setMeta('meta[name="keywords"]', { name: "keywords", content: keywords });
    } else {
      document.head.querySelector('meta[name="keywords"]')?.remove();
    }
    setMeta('meta[property="og:site_name"]', { property: "og:site_name", content: siteConfig.brandName });
    setMeta('meta[property="og:title"]', { property: "og:title", content: title });
    setMeta('meta[property="og:description"]', { property: "og:description", content: description });
    setMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    setMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    setMeta('meta[property="og:image"]', { property: "og:image", content: imageUrl });
    setMeta('meta[property="og:image:width"]', { property: "og:image:width", content: "417" });
    setMeta('meta[property="og:image:height"]', { property: "og:image:height", content: "136" });
    setMeta('meta[property="og:image:alt"]', { property: "og:image:alt", content: "SuperChat Marketing" });
    setMeta('meta[property="og:locale"]', { property: "og:locale", content: locale });
    setMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary" });
    setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    setMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    setMeta('meta[name="twitter:image"]', { name: "twitter:image", content: imageUrl });
    setMeta('meta[name="robots"]', { name: "robots", content: noindex ? "noindex, nofollow" : "index, follow" });
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = canonicalUrl;

    const structuredData = path === "/"
      ? [
          {
            id: "organization-structured-data",
            value: {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `${siteConfig.domain}/#organization`,
              name: siteConfig.brandName,
              url: `${siteConfig.domain}/`,
              logo: imageUrl,
              telephone: `+${siteConfig.whatsappNumber}`,
              areaServed: { "@type": "Country", name: "Malaysia" },
              knowsLanguage: ["en-MY", "zh", "ms-MY"],
            },
          },
          {
            id: "website-structured-data",
            value: {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${siteConfig.domain}/#website`,
              name: siteConfig.brandName,
              url: `${siteConfig.domain}/`,
              inLanguage: ["en-MY", "zh"],
            },
          },
          {
            id: "service-structured-data",
            value: {
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": `${siteConfig.domain}/#service`,
              name: "AI WhatsApp Automation for Malaysian Businesses",
              serviceType: "AI-powered customer communication automation",
              description: "AI-powered customer communication automation for WhatsApp enquiries, lead qualification, appointment booking, follow-up and human takeover.",
              url: `${siteConfig.domain}/`,
              provider: { "@type": "Organization", "@id": `${siteConfig.domain}/#organization`, name: siteConfig.brandName },
              areaServed: { "@type": "Country", name: "Malaysia" },
              audience: { "@type": "BusinessAudience", audienceType: "Malaysian businesses" },
              availableChannel: {
                "@type": "ServiceChannel",
                serviceUrl: `${siteConfig.domain}/contact`,
                availableLanguage: ["Chinese", "English", "Malay"],
              },
            },
          },
        ]
      : [];

    ["organization-structured-data", "website-structured-data", "service-structured-data"].forEach((id) => {
      const existing = document.getElementById(id);
      const entry = structuredData.find((item) => item.id === id);
      if (!entry) {
        existing?.remove();
        return;
      }
      const script = existing instanceof HTMLScriptElement ? existing : document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(entry.value);
      if (!existing) document.head.append(script);
    });
  }, [currentLanguage, title, description, keywords, path, noindex]);
  return null;
}

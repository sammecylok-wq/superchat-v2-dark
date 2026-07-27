import { useEffect } from "react";
import { siteConfig } from "../config/siteConfig";

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
  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', { name: "description", content: description });
    if (keywords) {
      setMeta('meta[name="keywords"]', { name: "keywords", content: keywords });
    } else {
      document.head.querySelector('meta[name="keywords"]')?.remove();
    }
    setMeta('meta[property="og:title"]', { property: "og:title", content: title });
    setMeta('meta[property="og:description"]', { property: "og:description", content: description });
    setMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    setMeta('meta[property="og:url"]', { property: "og:url", content: `${siteConfig.domain}${path}` });
    setMeta('meta[property="og:image"]', { property: "og:image", content: `${siteConfig.domain}/images/logo/superchat-logo.png` });
    setMeta('meta[property="og:image:alt"]', { property: "og:image:alt", content: "SuperChat Marketing" });
    setMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary" });
    setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    setMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    setMeta('meta[name="twitter:image"]', { name: "twitter:image", content: `${siteConfig.domain}/images/logo/superchat-logo.png` });
    setMeta('meta[name="robots"]', { name: "robots", content: noindex ? "noindex, nofollow" : "index, follow" });
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = `${siteConfig.domain}${path}`;
  }, [title, description, keywords, path, noindex]);
  return null;
}

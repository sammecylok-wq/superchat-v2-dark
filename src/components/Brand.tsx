import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/useLanguage";

type BrandProps = {
  size?: "header" | "footer" | "about";
};

const sizeClasses = {
  header: "h-7 max-w-[132px] sm:h-8 sm:max-w-[150px]",
  footer: "h-10 max-w-[190px]",
  about: "h-12 max-w-[220px] sm:h-14 sm:max-w-[260px]",
};

export function Brand({ size = "header" }: BrandProps) {
  const { copy } = useLanguage();
  const linkClass = size === "header"
    ? "inline-flex shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/25"
    : size === "footer"
      ? "inline-flex shrink-0 items-center rounded-lg py-2 pr-4 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2563EB]/25"
      : "inline-flex shrink-0 items-center rounded-xl border border-white/10 bg-white/95 px-2.5 py-1.5 shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-100";

  return (
    <Link
      to="/"
      className={linkClass}
      aria-label={copy.common.brandHome}
    >
      <img
        src="/images/logo/superchat-logo.png"
        alt="SuperChat Marketing"
        width="417"
        height="136"
        decoding="async"
        className={`w-auto object-contain ${sizeClasses[size]}`}
      />
    </Link>
  );
}

import { LogIn, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { siteConfig } from "../config/siteConfig";
import { v2Content } from "../i18n/v2Content";
import { useLanguage } from "../i18n/useLanguage";
import { Brand } from "./Brand";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { copy, currentLanguage } = useLanguage();
  const v2 = v2Content[currentLanguage];
  const clientLoginEnabled = Boolean(siteConfig.clientLoginUrl);

  const links = [
    { label: v2.nav.home, to: "/" },
    { label: v2.nav.demo, to: "/demo" },
    { label: v2.nav.how, to: "/#how-it-works" },
    { label: v2.nav.pricing, to: "/#pricing" },
    { label: v2.nav.about, to: "/about" },
    { label: v2.nav.faq, to: "/#faq" },
  ];

  useEffect(() => {
    if (location.hash) {
      window.requestAnimationFrame(() => {
        document.getElementById(location.hash.slice(1))?.scrollIntoView({ block: "start" });
      });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [location.hash, location.pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  const linkClass = "rounded-lg px-2.5 py-2 text-sm font-medium text-[#102A56] transition hover:bg-[#F7FAFE] hover:text-[#2878C8] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/25";
  const activeLinkClass = "!bg-[#EFF6FD] !text-[#2878C8]";
  const mobileLinkClass = "rounded-xl px-4 py-3 font-semibold text-[#102A56] transition hover:bg-[#F7FAFE] hover:text-[#2878C8] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/25";

  function isHashLinkActive(to: string) {
    const [, hash = ""] = to.split("#");
    return location.pathname === "/" && location.hash === `#${hash}`;
  }

  return (
    <header className={`site-header-light sticky top-0 z-50 border-b transition-shadow ${scrolled ? "shadow-[0_2px_12px_rgba(16,42,86,0.10)]" : "shadow-[0_1px_8px_rgba(16,42,86,0.06)]"}`}>
      <div className="container-site flex h-16 items-center justify-between gap-4 text-[#102A56] sm:h-[68px]">
        <Brand />
        <nav className="hidden min-w-0 items-center gap-0.5 xl:flex" aria-label={copy.nav.primary}>
          {links.map((link) => link.to.includes("#")
            ? <Link key={link.to} to={link.to} className={`${linkClass} ${isHashLinkActive(link.to) ? activeLinkClass : ""}`}>{link.label}</Link>
            : <NavLink key={link.to} to={link.to} end={link.to === "/"} className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ""}`}>{link.label}</NavLink>
          )}
        </nav>
        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <LanguageSwitcher />
          {clientLoginEnabled ? (
            <a
              href={siteConfig.clientLoginUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={copy.nav.clientLoginAria}
              className="btn !min-h-10 !whitespace-nowrap !border !border-[#2878C8] !bg-[#2878C8] !px-4 !py-2 text-sm !text-white shadow-sm hover:!border-[#1E5FA7] hover:!bg-[#1E5FA7] hover:shadow-md focus-visible:ring-[#2878C8]/30"
            >
              <LogIn className="size-4" aria-hidden="true" />
              {copy.nav.clientLogin}
            </a>
          ) : (
            <span
              aria-disabled="true"
              className="btn !min-h-10 !whitespace-nowrap !border !border-[#2878C8] !bg-[#2878C8] !px-4 !py-2 text-sm !text-white opacity-50 shadow-sm"
            >
              <LogIn className="size-4" aria-hidden="true" />
              {copy.nav.clientLogin}
            </span>
          )}
        </div>
        <button
          type="button"
          className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#DCE4EE] bg-[#F7FAFE] text-[#102A56] transition hover:border-[#B8CCE2] hover:bg-[#EAF3FC] hover:text-[#2878C8] focus-visible:border-brand-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/25 xl:hidden"
          aria-label={open ? copy.nav.closeMenu : copy.nav.openMenu}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      {open && (
        <nav id="mobile-menu" className="site-mobile-menu-light border-t px-5 py-5 shadow-[0_14px_30px_rgba(16,42,86,0.12)] xl:hidden" aria-label={copy.nav.mobile}>
          <div className="mx-auto flex max-w-[1200px] flex-col gap-1">
            <div className="mb-3">
              <LanguageSwitcher mobile onChange={() => setOpen(false)} />
            </div>
            {links.map((link) => link.to.includes("#")
              ? <Link key={link.to} to={link.to} className={`${mobileLinkClass} ${isHashLinkActive(link.to) ? activeLinkClass : ""}`} onClick={() => setOpen(false)}>{link.label}</Link>
              : <NavLink key={link.to} to={link.to} end={link.to === "/"} className={({ isActive }) => `${mobileLinkClass} ${isActive ? activeLinkClass : ""}`} onClick={() => setOpen(false)}>{link.label}</NavLink>
            )}
            {clientLoginEnabled ? (
              <a
                href={siteConfig.clientLoginUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={copy.nav.clientLoginAria}
                className="btn mt-3 !border !border-[#2878C8] !bg-[#2878C8] !text-white shadow-sm hover:!border-[#1E5FA7] hover:!bg-[#1E5FA7] hover:shadow-md focus-visible:ring-[#2878C8]/30"
                onClick={() => setOpen(false)}
              >
                <LogIn className="size-5" aria-hidden="true" />
                {copy.nav.clientLogin}
              </a>
            ) : (
              <span aria-disabled="true" className="btn mt-3 !border !border-brand-500 !bg-brand-500 !text-white opacity-50 shadow-sm">
                <LogIn className="size-5" aria-hidden="true" />
                {copy.nav.clientLogin}
              </span>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}

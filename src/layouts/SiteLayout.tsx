import { MessageCircle } from "lucide-react";
import { Outlet } from "react-router-dom";
import { ContactAction } from "../components/ContactAction";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useLanguage } from "../i18n/useLanguage";

export function SiteLayout() {
  const { copy } = useLanguage();
  return (
    <>
      <a className="skip-link" href="#main-content">{copy.common.skipToContent}</a>
      <Header />
      <main id="main-content"><Outlet /></main>
      <Footer />
      <ContactAction className="fixed bottom-4 right-4 z-40 inline-flex min-h-12 items-center gap-2 rounded-full bg-brand-500 px-5 py-3 font-semibold text-white shadow-xl shadow-brand-700/20 transition hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-100 sm:bottom-6 sm:right-6">
        <MessageCircle size={19} aria-hidden="true" />{copy.nav.book}
      </ContactAction>
    </>
  );
}

import { useLanguage } from "../i18n/useLanguage";

type Props = {
  mobile?: boolean;
  onChange?: () => void;
};

export function LanguageSwitcher({ mobile = false, onChange }: Props) {
  const { currentLanguage, setLanguage, copy } = useLanguage();

  function choose(language: "zh" | "en") {
    setLanguage(language);
    onChange?.();
  }

  const base = "min-h-10 rounded-lg px-3 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/25";
  const selected = "bg-[#2878C8] text-white shadow-sm";
  const unselected = "text-[#102A56] hover:bg-[#EAF3FC] hover:text-[#2878C8]";

  return (
    <div
      className={`language-switch-light inline-flex items-center rounded-xl border p-1 ${mobile ? "w-full justify-center" : ""}`}
      role="group"
      aria-label={copy.nav.language}
    >
      <button
        type="button"
        className={`${base} ${currentLanguage === "zh" ? selected : unselected}`}
        aria-label={copy.nav.selectChinese}
        aria-pressed={currentLanguage === "zh"}
        onClick={() => choose("zh")}
      >
        中文
      </button>
      <span className="px-0.5 text-[#7B8797]" aria-hidden="true">/</span>
      <button
        type="button"
        className={`${base} ${currentLanguage === "en" ? selected : unselected}`}
        aria-label={copy.nav.selectEnglish}
        aria-pressed={currentLanguage === "en"}
        onClick={() => choose("en")}
      >
        {mobile ? "English" : "EN"}
      </button>
    </div>
  );
}

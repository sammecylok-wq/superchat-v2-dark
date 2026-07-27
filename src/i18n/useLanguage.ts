import { createContext, useContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Language } from "./types";
import type { Translation } from "./translations";

export type LanguageContextValue = {
  currentLanguage: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
  t: (key: string) => string;
  copy: Translation;
};

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}

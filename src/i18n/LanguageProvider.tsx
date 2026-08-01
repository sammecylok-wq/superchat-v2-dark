import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { ReactNode, SetStateAction } from "react";
import { translations } from "./translations";
import { defaultLanguage, languageStorageKey, supportedLanguages, type Language } from "./types";
import { LanguageContext } from "./useLanguage";

function readSavedLanguage(): Language {
  if (typeof window === "undefined") return defaultLanguage;
  const saved = window.localStorage.getItem(languageStorageKey);
  return supportedLanguages.includes(saved as Language) ? (saved as Language) : defaultLanguage;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(readSavedLanguage);
  const pendingScrollPosition = useRef<{ x: number; y: number } | null>(null);
  const scrollRestoreFrame = useRef<number | null>(null);
  const scrollRestoreTimer = useRef<number | null>(null);

  const setLanguage = useCallback((next: SetStateAction<Language>) => {
    setCurrentLanguage((current) => {
      const resolved = typeof next === "function" ? next(current) : next;
      const safeLanguage = supportedLanguages.includes(resolved) ? resolved : defaultLanguage;
      if (safeLanguage !== current) {
        pendingScrollPosition.current = { x: window.scrollX, y: window.scrollY };
      }
      return safeLanguage;
    });
  }, []);

  useLayoutEffect(() => {
    if (!pendingScrollPosition.current) return;
    const { x, y } = pendingScrollPosition.current;
    pendingScrollPosition.current = null;
    const restoreScroll = () => {
      const previousBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(x, y);
      document.documentElement.style.scrollBehavior = previousBehavior;
    };
    restoreScroll();
    const firstFrame = window.requestAnimationFrame(() => {
      scrollRestoreFrame.current = window.requestAnimationFrame(restoreScroll);
    });
    scrollRestoreTimer.current = window.setTimeout(restoreScroll, 100);
    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (scrollRestoreFrame.current !== null) {
        window.cancelAnimationFrame(scrollRestoreFrame.current);
        scrollRestoreFrame.current = null;
      }
      if (scrollRestoreTimer.current !== null) {
        window.clearTimeout(scrollRestoreTimer.current);
        scrollRestoreTimer.current = null;
      }
    };
  }, [currentLanguage]);

  useEffect(() => {
    window.localStorage.setItem(languageStorageKey, currentLanguage);
    document.documentElement.lang = currentLanguage === "zh" ? "zh" : "en-MY";
  }, [currentLanguage]);

  const copy = translations[currentLanguage];
  const t = useCallback((key: string) => {
    const value = key.split(".").reduce<unknown>((current, segment) => {
      if (current && typeof current === "object" && segment in current) {
        return (current as Record<string, unknown>)[segment];
      }
      return undefined;
    }, translations[currentLanguage]);
    return typeof value === "string" ? value : key;
  }, [currentLanguage]);

  const value = useMemo(
    () => ({ currentLanguage, setLanguage, t, copy }),
    [copy, currentLanguage, setLanguage, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "fr" | "en";
type Ctx = { lang: Lang; setLang: (l: Lang) => void };

const LanguageContext = createContext<Ctx | undefined>(undefined);
const STORAGE_KEY = "qvtbox.lang";

function detectInitialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved === "fr" || saved === "en") return saved;
  } catch {}
  const nav = (typeof navigator !== "undefined" ? navigator.language : "fr")?.toLowerCase();
  return nav?.startsWith("fr") ? "fr" : "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => detectInitialLang());
  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, lang); } catch {} }, [lang]);
  const value = useMemo(() => ({ lang, setLang }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    const err = new Error('[LanguageContext] Provider manquant — fallback "fr" appliqué.');
    console.warn(err.stack || err.message);
    return { lang: "fr", setLang: () => {} };
  }
  return ctx;
}

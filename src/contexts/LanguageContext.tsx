// src/contexts/LanguageContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "fr" | "en";
type Ctx = { lang: Lang; setLang: (l: Lang) => void };

const FallbackCtx: Ctx = { lang: "fr", setLang: () => {} };
const LanguageContext = createContext<Ctx>(FallbackCtx);

// DEBUG: si tu vois 2 logs ci-dessous en prod, tu as 2 modules duplicats
// (imports différents) → unifie les chemins d'import.
console.log("[LanguageContext] loaded from", import.meta.url);

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
  return useContext(LanguageContext);
}

// src/contexts/LanguageContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "fr" | "en";
type Ctx = { lang: Lang; setLang: (l: Lang) => void };

/**
 * ✅ Fallback par défaut (fr) : même SANS Provider, useLanguage() retourne quelque chose
 * => fini les crashes "must be used within a LanguageProvider".
 */
const FallbackCtx: Ctx = { lang: "fr", setLang: () => {} };
const LanguageContext = createContext<Ctx>(FallbackCtx);

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

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch {}
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): Ctx {
  // ✅ Ne plantera jamais : il y a toujours une valeur (FallbackCtx) si pas de Provider
  return useContext(LanguageContext);
}

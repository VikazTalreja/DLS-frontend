"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import en from "./messages/en.json";
import mr from "./messages/mr.json";

const MESSAGES = { en, mr };

const I18nContext = createContext({
  lang: "en",
  setLang: () => {},
  t: (key, vars) => key,
});

function get(obj, path) {
  return path.split(".").reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : undefined), obj);
}

function format(str, vars) {
  if (!vars) return str;
  return Object.keys(vars).reduce((s, k) => s.replaceAll(`{${k}}`, String(vars[k])), str);
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
    if (saved && (saved === "en" || saved === "mr")) setLang(saved);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("lang", lang);
  }, [lang]);

  const messages = MESSAGES[lang] ?? MESSAGES.en;

  const t = useMemo(() => {
    return (key, vars) => {
      const val = get(messages, key) ?? key;
      return typeof val === "string" ? format(val, vars) : key;
    };
  }, [messages]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}

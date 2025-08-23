"use client";

import { useMemo, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Normalize either a plain object or URLSearchParams into a plain object
export function normalizeQuery(input) {
  if (!input) return {};
  if (typeof input === "object" && !(input instanceof URLSearchParams)) {
    // Next.js passes searchParams as a plain object to Server Components
    return { ...input };
  }
  const params = input instanceof URLSearchParams ? input : new URLSearchParams(String(input));
  const out = {};
  for (const [k, v] of params.entries()) out[k] = v;
  return out;
}

export function toURLSearchParams(obj) {
  const usp = new URLSearchParams();
  Object.entries(obj || {}).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    usp.set(k, String(v));
  });
  return usp;
}

export function mergeQuery(base, updates, options = {}) {
  const q = { ...normalizeQuery(base) };
  const up = normalizeQuery(updates);
  Object.entries(up).forEach(([k, v]) => {
    if (v === null || v === undefined || v === "") {
      if (!options.keepEmpty) delete q[k];
      else q[k] = "";
    } else q[k] = v;
  });
  return q;
}

export function buildHref(pathname, baseSearch, updates, options) {
  const q = mergeQuery(baseSearch, updates, options);
  const s = toURLSearchParams(q).toString();
  return s ? `${pathname}?${s}` : pathname;
}

export function useQueryUrl() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryObj = useMemo(() => normalizeQuery(searchParams), [searchParams]);

  const push = useCallback((updates, options) => {
    router.push(buildHref(pathname, searchParams, updates, options));
  }, [router, pathname, searchParams]);

  const replace = useCallback((updates, options) => {
    router.replace(buildHref(pathname, searchParams, updates, options));
  }, [router, pathname, searchParams]);

  const goto = useCallback((pathnameNext, updates, options) => {
    router.push(buildHref(pathnameNext, searchParams, updates, options));
  }, [router, searchParams]);

  return { pathname, searchParams, query: queryObj, push, replace, goto };
}

export function getNumber(obj, key, fallback) {
  const v = normalizeQuery(obj)[key];
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

export function getString(obj, key, fallback = "") {
  const v = normalizeQuery(obj)[key];
  return v ?? fallback;
}

export function setStep(router, pathname, searchParams, step) {
  const href = buildHref(pathname, searchParams, { step });
  router.replace(href);
}

// Hook for simple multi-step flows using ?step=<n>
export function useStepFlow({ initialStep = 1 } = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = useMemo(() => normalizeQuery(searchParams), [searchParams]);

  const step = useMemo(() => {
    const s = Number(query.step);
    return Number.isFinite(s) && s > 0 ? s : initialStep;
  }, [query.step, initialStep]);

  const set = useCallback((nextStep, extra) => {
    router.replace(buildHref(pathname, searchParams, { step: nextStep, ...extra }));
  }, [router, pathname, searchParams]);

  const next = useCallback((extra) => set(step + 1, extra), [set, step]);
  const prev = useCallback((extra) => set(Math.max(1, step - 1), extra), [set, step]);

  return { step, query, set, next, prev, pathname };
}

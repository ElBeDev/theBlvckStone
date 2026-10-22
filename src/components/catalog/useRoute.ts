"use client";

import { useCallback, useEffect, useState } from "react";
import { ROUTE_EVENT, ROUTE_STORAGE_KEY, VISITED_STORAGE_KEY } from "@/lib/catalog";

function readList(key: string) {
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(parsed) ? parsed.filter((c) => typeof c === "string") : [];
  } catch {
    return [];
  }
}

function writeList(key: string, list: string[]) {
  try {
    window.localStorage.setItem(key, JSON.stringify(list));
  } catch {
    // Storage can be unavailable (private mode); the page still works.
  }
  window.dispatchEvent(new CustomEvent(ROUTE_EVENT));
}

// The marked entries ("tu ruta") and the entries already opened. Both live in
// this browser only and are shared across pages through a window event.
export function useRoute() {
  const [route, setRoute] = useState<string[]>([]);
  const [visited, setVisited] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      setRoute(readList(ROUTE_STORAGE_KEY));
      setVisited(readList(VISITED_STORAGE_KEY));
      setReady(true);
    };
    sync();
    window.addEventListener(ROUTE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(ROUTE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback((code: string) => {
    const current = readList(ROUTE_STORAGE_KEY);
    const next = current.includes(code)
      ? current.filter((c) => c !== code)
      : [...current, code];
    writeList(ROUTE_STORAGE_KEY, next);
  }, []);

  const clear = useCallback(() => writeList(ROUTE_STORAGE_KEY, []), []);

  const markVisited = useCallback((code: string) => {
    const current = readList(VISITED_STORAGE_KEY);
    if (!current.includes(code)) writeList(VISITED_STORAGE_KEY, [...current, code]);
  }, []);

  return { route, visited, ready, toggle, clear, markVisited };
}

"use client";

import { useSyncExternalStore } from "react";

const subscribe = (onChange: () => void) => {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
};

const getServerSnapshot = () => "";

export function usePageUrl(): string {
  return useSyncExternalStore(subscribe, () => window.location.href, getServerSnapshot);
}

export function useSearchParam(name: string): string {
  return useSyncExternalStore(
    subscribe,
    () => new URLSearchParams(window.location.search).get(name) ?? "",
    getServerSnapshot,
  );
}

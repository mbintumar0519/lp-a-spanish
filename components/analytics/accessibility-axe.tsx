"use client";

import { useEffect } from "react";

const AXE_DEBOUNCE_MS = 1000;

export function AccessibilityAxe() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    Promise.all([import("@axe-core/react"), import("react"), import("react-dom")])
      .then(([{ default: axe }, React, ReactDOM]) => axe(React, ReactDOM, AXE_DEBOUNCE_MS))
      .catch(() => undefined);
  }, []);

  return null;
}

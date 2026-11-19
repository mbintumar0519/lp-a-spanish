"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/site";

export function useCrioWebForm() {
  useEffect(() => {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = siteConfig.crio.stylesheetUrl;
    document.head.appendChild(stylesheet);

    const script = document.createElement("script");
    script.src = siteConfig.crio.scriptUrl;
    script.async = true;
    script.onload = () => {
      if (window.ajax) window.ajax.get(siteConfig.crio.impressionUrl);
      else console.error("CRIO ajax object not available");
    };
    script.onerror = () => console.error("Failed to load CRIO script");
    document.body.appendChild(script);

    return () => {
      stylesheet.remove();
      script.remove();
    };
  }, []);
}

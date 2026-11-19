"use client";

import { useEffect } from "react";

const EXTENSION_ATTRIBUTES = ["data--h-bstatus", "data--h-bresult", "data--h-bfrom-bx"];
const CLEANUP_INTERVAL_MS = 5000;

function removeExtensionAttributes() {
  document.querySelectorAll("img[data--h-bstatus], img[data--h-bresult]").forEach((image) => {
    EXTENSION_ATTRIBUTES.forEach((attribute) => image.removeAttribute(attribute));
  });
}

export function BrowserExtensionCleanup() {
  useEffect(() => {
    removeExtensionAttributes();
    const intervalId = window.setInterval(removeExtensionAttributes, CLEANUP_INTERVAL_MS);
    return () => window.clearInterval(intervalId);
  }, []);

  return null;
}

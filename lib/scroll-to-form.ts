import type { SyntheticEvent } from "react";
import { HERO_FORM_ID } from "@/config/site";

const FOCUS_DELAY_MS = 800;

export function scrollToHeroForm(event?: SyntheticEvent) {
  event?.preventDefault();

  const form = document.getElementById(HERO_FORM_ID);
  if (!form) return;

  form.scrollIntoView({ behavior: "smooth", block: "center" });
  window.setTimeout(() => form.querySelector("input")?.focus(), FOCUS_DELAY_MS);
}

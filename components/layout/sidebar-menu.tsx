"use client";

import { useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { scrollToHeroForm } from "@/lib/scroll-to-form";
import { CalendarIcon, PhoneIcon } from "@/components/ui/icons";
import { NAVIGATION_LINKS } from "@/components/layout/navigation";

type SidebarMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LINK_DELAY_STEP_MS = 50;

export function SidebarMenu({ isOpen, onClose }: SidebarMenuProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSchedule = () => {
    scrollToHeroForm();
    onClose();
  };

  return (
    <div
      id="sidebar-menu"
      aria-hidden={!isOpen}
      inert={!isOpen}
      className={cn(
        "fixed inset-0 z-30 lg:hidden transition-all duration-500 ease-out",
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-black/50 transition-opacity duration-500 ease-out",
          isOpen ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />

      <div
        className={cn(
          "absolute top-20 left-0 right-0 bottom-0 bg-white flex flex-col transition-all duration-500 ease-out",
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0",
        )}
      >
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-3">
          {NAVIGATION_LINKS.map(({ href, label }, index) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                "py-4 px-4 text-gray-900 text-lg font-sans font-semibold no-underline rounded-lg hover:bg-gray-50 hover:text-red-500 transition-all duration-300 ease-out",
                index === 0 && "mt-12",
                isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0",
              )}
              style={{ transitionDelay: `${(index + 1) * LINK_DELAY_STEP_MS}ms` }}
            >
              {label}
            </Link>
          ))}
        </div>

        <div
          className={cn(
            "p-6 flex flex-col gap-3 border-t border-gray-100 bg-white transition-all duration-500 ease-out",
            isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
          style={{ transitionDelay: "300ms" }}
        >
          <button
            type="button"
            onClick={handleSchedule}
            className="w-full py-4 px-6 bg-red-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-red-700 active:scale-[0.97] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <CalendarIcon className="w-5 h-5" />
            Agendar Evaluación Gratis
          </button>
          <a
            href={siteConfig.phone.href}
            onClick={onClose}
            className="w-full py-4 px-6 bg-white text-gray-900 font-bold text-lg rounded-xl border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 active:scale-[0.97] transition-all duration-200 flex items-center justify-center gap-2 no-underline"
          >
            <PhoneIcon className="w-5 h-5 text-red-500" />
            Llamar o Enviar Mensaje
          </a>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { scrollToHeroForm } from "@/lib/scroll-to-form";
import { CtaButton } from "@/components/ui/cta-button";
import { CalendarIcon, CloseIcon, MenuIcon, PhoneIcon } from "@/components/ui/icons";
import { NAVIGATION_LINKS } from "@/components/layout/navigation";
import { SidebarMenu } from "@/components/layout/sidebar-menu";

const desktopLinkClassName =
  "text-gray-900 text-base font-sans font-semibold no-underline whitespace-nowrap hover:text-red-600 hover:underline hover:underline-offset-4";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <>
      <nav className="bg-white fixed top-10 w-full h-20 z-40 shadow-lg flex items-center">
        <div className="max-w-7xl mx-auto px-6 relative w-full">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] w-fit lg:static lg:left-auto lg:top-auto lg:translate-x-0 lg:translate-y-0 lg:w-auto">
              <a href="#main" className="flex items-center">
                <img
                  src="/logo.png"
                  alt="Denali Health – Stone Mountain"
                  width="200"
                  height="55"
                  className="h-[55px] w-[200px] object-contain transition-opacity duration-300 ease-in-out"
                />
              </a>
            </div>

            <div className="hidden lg:flex items-center gap-6">
              {NAVIGATION_LINKS.map(({ href, label }) => (
                <Link key={href} href={href} className={desktopLinkClassName}>
                  {label}
                </Link>
              ))}
              <button
                type="button"
                onClick={scrollToHeroForm}
                className={`inline-flex items-center gap-1.5 bg-transparent border-0 cursor-pointer ${desktopLinkClassName}`}
              >
                <CalendarIcon className="w-4 h-4" />
                Agendar Evaluación Gratis
              </button>
              <div>
                <CtaButton
                  href={siteConfig.phone.href}
                  className="px-4 py-2 text-sm"
                  icon={<PhoneIcon className="w-4 h-4" />}
                >
                  Llamar Ahora
                </CtaButton>
              </div>
            </div>

            <div className="w-10 h-10 invisible lg:hidden" />

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMenuOpen}
              aria-controls="sidebar-menu"
              className="p-2 rounded-lg bg-gray-100 text-gray-900 border-0 cursor-pointer transition-all duration-300 ease-in-out absolute right-0 top-1/2 -translate-y-1/2 z-[2] hover:bg-gray-200 lg:hidden"
            >
              {isMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <SidebarMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
}

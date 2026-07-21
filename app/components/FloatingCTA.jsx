'use client';

import { useState, useEffect } from 'react';
import { scrollToHeroForm } from '../utils/scrollToForm';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const heroForm = document.getElementById('hero-form');
    if (!heroForm) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(heroForm);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      role="complementary"
      aria-label="Llamada a la acción fija"
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 md:hidden ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-red-600 font-bold text-xs md:text-sm uppercase tracking-wide">
                Prueba de Lp(a) Gratis
              </span>
              <span className="text-gray-700 text-xs md:text-sm font-medium">
                Vea Si Califica
              </span>
            </div>
          </div>

          <button
            onClick={scrollToHeroForm}
            className="flex-shrink-0 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm md:text-base px-5 md:px-7 py-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
          >
            Aplicar Ahora
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

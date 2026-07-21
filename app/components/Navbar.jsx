'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CTAButton from './CTAButton';
import { scrollToHeroForm } from '../utils/scrollToForm';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      <nav 
        className="bg-white fixed top-10 w-full h-20 z-40 shadow-lg flex items-center"
      >
        <div className="max-w-7xl mx-auto px-6 relative w-full">
          <div className="flex items-center justify-between relative">
            {/* Logo - centered on mobile */}
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
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <Link 
                href="/#about" 
                className="text-gray-900 text-base font-sans font-semibold no-underline whitespace-nowrap hover:text-red-600 hover:underline hover:underline-offset-4"
              >
                Sobre
              </Link>
              <Link 
                href="/#benefits" 
                className="text-gray-900 text-base font-sans font-semibold no-underline whitespace-nowrap hover:text-red-600 hover:underline hover:underline-offset-4"
              >
                Beneficios
              </Link>
              <Link 
                href="/#pi" 
                className="text-gray-900 text-base font-sans font-semibold no-underline whitespace-nowrap hover:text-red-600 hover:underline hover:underline-offset-4"
              >
                Conozca al Investigador
              </Link>
              <Link 
                href="/#enroll" 
                className="text-gray-900 text-base font-sans font-semibold no-underline whitespace-nowrap hover:text-red-600 hover:underline hover:underline-offset-4"
              >
                Cómo Participar
              </Link>
              <Link 
                href="/#contact" 
                className="text-gray-900 text-base font-sans font-semibold no-underline whitespace-nowrap hover:text-red-600 hover:underline hover:underline-offset-4"
              >
                Contacto
              </Link>
              <button
                onClick={scrollToHeroForm}
                className="inline-flex items-center gap-1.5 text-gray-900 text-base font-sans font-semibold no-underline whitespace-nowrap bg-transparent border-0 cursor-pointer hover:text-red-600 hover:underline hover:underline-offset-4"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Agendar Evaluación Gratis
              </button>
              
              <div>
                <CTAButton
                  href="tel:+18137966716"
                  className="px-4 py-2 text-sm"
                  icon={
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  }
                >
                  Llamar Ahora
                </CTAButton>
              </div>
            </div>
            
            {/* Invisible placeholder to prevent layout shift */}
            <div className="w-10 h-10 invisible lg:hidden"></div>
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Abrir menú"
              className="p-2 rounded-lg bg-gray-100 text-gray-900 border-0 cursor-pointer transition-all duration-300 ease-in-out absolute right-0 top-1/2 -translate-y-1/2 z-[2] hover:bg-gray-200 lg:hidden"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <div className={`fixed inset-0 z-30 lg:hidden transition-all duration-500 ease-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Backdrop */}
        <div className={`absolute inset-0 bg-black/50 transition-opacity duration-500 ease-out ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsOpen(false)} />
        
        {/* Menu panel */}
        <div className={`absolute top-20 left-0 right-0 bottom-0 bg-white flex flex-col transition-all duration-500 ease-out ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}>
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-3">
            <Link 
              href="/#about" 
              onClick={() => setIsOpen(false)}
              className={`py-4 px-4 text-gray-900 text-lg font-sans font-semibold no-underline rounded-lg hover:bg-gray-50 hover:text-red-500 transition-all duration-300 ease-out mt-12 ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}
              style={{ transitionDelay: '50ms' }}
            >
              Sobre
            </Link>
            <Link 
              href="/#benefits" 
              onClick={() => setIsOpen(false)}
              className={`py-4 px-4 text-gray-900 text-lg font-sans font-semibold no-underline rounded-lg hover:bg-gray-50 hover:text-red-500 transition-all duration-300 ease-out ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}
              style={{ transitionDelay: '100ms' }}
            >
              Beneficios
            </Link>
            <Link 
              href="/#pi" 
              onClick={() => setIsOpen(false)}
              className={`py-4 px-4 text-gray-900 text-lg font-sans font-semibold no-underline rounded-lg hover:bg-gray-50 hover:text-red-500 transition-all duration-300 ease-out ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}
              style={{ transitionDelay: '150ms' }}
            >
              Conozca al Investigador
            </Link>
            <Link 
              href="/#enroll" 
              onClick={() => setIsOpen(false)}
              className={`py-4 px-4 text-gray-900 text-lg font-sans font-semibold no-underline rounded-lg hover:bg-gray-50 hover:text-red-500 transition-all duration-300 ease-out ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}
              style={{ transitionDelay: '200ms' }}
            >
              Cómo Participar
            </Link>
            <Link 
              href="/#contact" 
              onClick={() => setIsOpen(false)}
              className={`py-4 px-4 text-gray-900 text-lg font-sans font-semibold no-underline rounded-lg hover:bg-gray-50 hover:text-red-500 transition-all duration-300 ease-out ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}
              style={{ transitionDelay: '250ms' }}
            >
              Contacto
            </Link>
          </div>
          
          {/* Bottom buttons */}
          <div className={`p-6 flex flex-col gap-3 border-t border-gray-100 bg-white transition-all duration-500 ease-out ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
            <button
              onClick={() => {
                scrollToHeroForm();
                setIsOpen(false);
              }}
              className="w-full py-4 px-6 bg-red-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-red-700 active:scale-[0.97] transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Agendar Evaluación Gratis
            </button>
            <a
              href="tel:+18137966716"
              onClick={() => setIsOpen(false)}
              className="w-full py-4 px-6 bg-white text-gray-900 font-bold text-lg rounded-xl border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 active:scale-[0.97] transition-all duration-200 flex items-center justify-center gap-2 no-underline"
            >
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Llamar o Enviar Mensaje
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #0d9488 100%)',
      position: 'relative',
      overflow: 'hidden'
    }} className="py-10 md:py-16">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          width: '100%',
          height: '100%'
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
          <div>
            <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-4 md:mb-6">Salud Cardíaca Lp(a)</h3>
            <p className="text-white/90 text-sm md:text-base font-body leading-relaxed">
              Un estudio de investigación cardiovascular para personas con Lp(a) elevado. Se proporciona compensación y se reembolsan gastos de viaje.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg md:text-xl font-heading font-bold text-white mb-4 md:mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-2 md:space-y-4">
              <li>
                <Link 
                  href="/#about" 
                  className="text-white/90 hover:text-white transition-colors duration-200 text-sm md:text-base font-body footer-link"
                >
                  Sobre el Estudio
                </Link>
              </li>
              <li>
                <Link 
                  href="/#pi" 
                  className="text-white/90 hover:text-white transition-colors duration-200 text-sm md:text-base font-body footer-link"
                >
                  Conozca al Investigador
                </Link>
              </li>
              <li>
                <Link 
                  href="/#benefits" 
                  className="text-white/90 hover:text-white transition-colors duration-200 text-sm md:text-base font-body footer-link"
                >
                  Beneficios
                </Link>
              </li>
              <li>
                <Link 
                  href="/#enroll" 
                  className="text-white/90 hover:text-white transition-colors duration-200 text-sm md:text-base font-body footer-link"
                >
                  Qué Esperar
                </Link>
              </li>
              <li>
                <Link 
                  href="/#faq" 
                  className="text-white/90 hover:text-white transition-colors duration-200 text-sm md:text-base font-body footer-link"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg md:text-xl font-heading font-bold text-white mb-4 md:mb-6">Contáctenos</h3>
            <p className="text-white/90 mb-3 md:mb-4 text-sm md:text-base font-body">
              ¿Tiene preguntas sobre el estudio?
            </p>
            <Link 
              href="/#contact" 
              className="inline-flex items-center text-white/90 hover:text-white transition-colors duration-200 text-sm md:text-base font-body footer-link"
            >
              <span>Póngase en contacto con nuestro equipo</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 md:h-5 md:w-5 ml-2" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
            </Link>
          </div>
        </div>
        
        <div className="border-t border-white/30 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/90 text-xs md:text-sm mb-3 md:mb-0 text-center md:text-left font-body">
              © {new Date().getFullYear()} Denali Health Plant City. Todos los derechos reservados.
            </p>
            <div className="flex space-x-4 md:space-x-6">
              <Link 
                href="/privacy" 
                className="text-white/90 hover:text-white transition-colors duration-200 text-xs md:text-sm font-body footer-link"
              >
                Política de Privacidad
              </Link>
              <Link 
                href="/terms" 
                className="text-white/90 hover:text-white transition-colors duration-200 text-xs md:text-sm font-body footer-link"
              >
                Términos de Servicio
              </Link>
            </div>
          </div>
          <p className="text-white/80 text-[11px] leading-relaxed mt-4 font-body">
            Este estudio de investigación (Protocolo 20230222) se lleva a cabo según las regulaciones de la FDA y pautas éticas estrictas. La compensación y el reembolso de viaje se proporcionan para reducir las barreras de participación, no como pago por asumir riesgos. El estudio es supervisado por una junta de revisión independiente para garantizar su seguridad y que sus derechos sean protegidos.
          </p>
        </div>
      </div>
    </footer>
  );
} 
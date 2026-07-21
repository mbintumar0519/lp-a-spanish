'use client';

import SectionHeader from './SectionHeader';
import CTAButton from './CTAButton';
import { FaCalendarAlt, FaVial, FaClipboardCheck } from 'react-icons/fa';

export default function LpaTestingSection() {
  const scrollToHeroForm = () => {
    const heroForm = document.getElementById('hero-form');
    if (heroForm) {
      heroForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        const firstInput = heroForm.querySelector('input');
        if (firstInput) firstInput.focus();
      }, 500);
    }
  };

  return (
    <section className="bg-gradient-to-br from-white to-red-50 py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_20%_50%,#dc2626_0%,transparent_50%),radial-gradient(circle_at_80%_80%,#f97316_0%,transparent_50%)]"></div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <SectionHeader
          title="¡Obtenga Sus Resultados de Lp(a) en 3 Pasos Fáciles!"
          description="La mayoría de las personas no conocen sus niveles de Lp(a). Únase a nuestro estudio de investigación y obtenga pruebas completas—totalmente gratis, sin seguro requerido."
        />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 mb-12">
          <div className="step-card bg-white rounded-3xl p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.08)] border-2 border-red-500/10 transition-all duration-300 ease-in-out relative hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-red-600 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-[0_4px_12px_rgba(220,38,38,0.3)] font-sans">
              1
            </div>

            <div className="w-20 h-20 bg-gradient-to-br from-red-600/10 to-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6 mt-4">
              <FaCalendarAlt className="text-[2rem] text-red-600" />
            </div>

            <h3 className="text-2xl text-gray-900 font-semibold mb-3 font-sans">
              Paso 1: Agendar
            </h3>
            <p className="text-gray-600 leading-relaxed text-base font-sans">
              Complete nuestro formulario rápido de preselección. Cuéntenos un poco sobre usted y su historial de salud cardiovascular. Nuestro equipo se pondrá en contacto en 24 horas.
            </p>
          </div>

          <div className="step-card bg-white rounded-3xl p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.08)] border-2 border-orange-500/10 transition-all duration-300 ease-in-out relative hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-400 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-[0_4px_12px_rgba(249,115,22,0.3)] font-sans">
              2
            </div>

            <div className="w-20 h-20 bg-gradient-to-br from-orange-500/10 to-amber-400/10 rounded-full flex items-center justify-center mx-auto mb-6 mt-4">
              <FaVial className="text-[2rem] text-orange-500" />
            </div>

            <h3 className="text-2xl text-gray-900 font-semibold mb-3 font-sans">
              Paso 2: Hágase la Prueba
            </h3>
            <p className="text-gray-600 leading-relaxed text-base font-sans">
              Visite nuestra clínica en Plant City para una simple extracción de sangre. Recibirá pruebas completas incluyendo Lp(a), panel lipídico, A1c y más. Además, $100 de compensación por su tiempo.
            </p>
          </div>

          <div className="step-card bg-white rounded-3xl p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.08)] border-2 border-red-500/10 transition-all duration-300 ease-in-out relative hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-red-600 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-[0_4px_12px_rgba(220,38,38,0.3)] font-sans">
              3
            </div>

            <div className="w-20 h-20 bg-gradient-to-br from-red-600/10 to-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6 mt-4">
              <FaClipboardCheck className="text-[2rem] text-red-600" />
            </div>

            <h3 className="text-2xl text-gray-900 font-semibold mb-3 font-sans">
              Paso 3: Obtenga Resultados
            </h3>
            <p className="text-gray-600 leading-relaxed text-base font-sans">
              En pocas semanas, nuestro equipo compartirá sus resultados, explicará qué significan para su salud cardíaca y le dará una copia para su médico. Si es elegible, conozca el estudio.
            </p>
          </div>
        </div>

        <div className="text-center">
          <CTAButton
            onClick={scrollToHeroForm}
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
          >
            Agendar Evaluación Gratis
          </CTAButton>
          
          <p className="mt-4 text-gray-600 text-sm font-sans">
            ✓ Sin seguro requerido  •  ✓ Pruebas completas gratis  •  ✓ $100 de compensación
          </p>
        </div>
      </div>
    </section>
  );
}

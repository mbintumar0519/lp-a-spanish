'use client';

import SectionHeader from './SectionHeader';

export default function StatisticsSection() {
  return (
    <section className="py-16 border-t border-b border-red-500/10 bg-[linear-gradient(135deg,rgba(220,38,38,0.05)_0%,rgba(249,115,22,0.05)_50%,rgba(251,191,36,0.05)_100%)]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader title="El Riesgo Oculto Que la Mayoría de los Médicos No Revisan" />
        
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 mt-8">
          <div className="stat-card bg-white rounded-2xl p-8 text-center border-2 border-red-500/10 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)]">
            <div className="inline-block mb-4 font-sans font-bold leading-[1.2] text-[clamp(2.5rem,5vw,4rem)] text-red-600">
              1 en 5
            </div>
            <h3 className="text-xl text-gray-900 font-semibold mb-2 font-sans">
              Personas Tienen Lp(a) Elevado
            </h3>
            <p className="text-gray-600 text-base leading-relaxed font-sans">
              Y la mayoría no lo sabe porque no está incluido en las pruebas de colesterol estándar
            </p>
          </div>

          <div className="stat-card bg-white rounded-2xl p-8 text-center border-2 border-orange-500/10 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)]">
            <div className="inline-block mb-4 font-sans font-bold leading-[1.2] text-[clamp(2.5rem,5vw,4rem)] text-red-600">
              60%
            </div>
            <h3 className="text-xl text-gray-900 font-semibold mb-2 font-sans">
              Mayor Riesgo de Derrame Cerebral
            </h3>
            <p className="text-gray-600 text-base leading-relaxed font-sans">
              El Lp(a) elevado aumenta significativamente su riesgo de derrame cerebral y enfermedad cardíaca
            </p>
          </div>

          <div className="stat-card bg-white rounded-2xl p-8 text-center border-2 border-red-500/10 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)]">
            <div className="inline-block mb-4 font-sans font-bold leading-[1.2] text-[clamp(2.5rem,5vw,4rem)] text-red-600">
              90%
            </div>
            <h3 className="text-xl text-gray-900 font-semibold mb-2 font-sans">
              Los Médicos No Lo Revisan
            </h3>
            <p className="text-gray-600 text-base leading-relaxed font-sans">
              La mayoría de los médicos no prueba regularmente el Lp(a), y rara vez está cubierto por el seguro
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

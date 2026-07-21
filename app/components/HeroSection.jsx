'use client';

import PreScreeningForm from './PreScreenForm';

export default function HeroSection() {

  return (
    <section className="hero-gradient relative min-h-screen overflow-hidden">
      {/* Solid background - extends to cover navbar area */}
      <div className="absolute inset-0 z-0 bg-red-800">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Content container */}
      <div className="hero-content max-w-7xl mx-auto px-6 pb-20 relative z-10 pt-[180px]">
        {/* Mobile: Text first, then form */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-20 lg:items-start gap-10">
          {/* Text content - appears first on mobile */}
          <div className="hero-text order-1 lg:order-1">
            <div>
              <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-snug md:leading-tight lg:leading-[1.1] mb-4 md:mb-6 [text-shadow:0_2px_4px_rgba(0,0,0,0.1)] font-sans">
                ¿Preocupado por su Riesgo de un Infarto?
              </h1>
              <p className="text-white/95 text-base md:text-lg lg:text-xl leading-relaxed mb-6 md:mb-8 font-sans">
               <span className="bg-white text-red-900 px-[0.3em] py-[0.15em] rounded-[0.25em] font-bold">1 de cada 5 personas</span> tiene <strong>Lp(a) Alto</strong>: un colesterol genético que puede aumentar su riesgo de infarto en un <span className="bg-white text-red-900 px-[0.3em] py-[0.15em] rounded-[0.25em] font-bold">300%.</span> Hágase la prueba hoy para ver si califica para un ensayo clínico que evalúa un tratamiento investigacional destinado a prevenir un primer evento cardíaco mayor, dirigido por el Dr. Powell y el equipo de Denali Health.
              </p>

              {/* Balanced benefits - larger and higher contrast */}
              <div className="benefits-balanced grid grid-cols-2 gap-4 mt-7 mx-auto max-w-[680px]">
                <div className="benefit-pill flex items-center justify-center gap-3 lg:gap-4 px-4 py-3 lg:px-6 lg:py-4 bg-white rounded-3xl border border-white text-base lg:text-lg text-red-900 font-semibold shadow-[0_6px_24px_rgba(0,0,0,0.25)]">
                  <svg className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-center leading-tight">Sin Seguro Requerido</span>
                </div>

                <div className="benefit-pill flex items-center justify-center gap-3 lg:gap-4 px-4 py-3 lg:px-6 lg:py-4 bg-white rounded-3xl border border-white text-base lg:text-lg text-red-900 font-semibold shadow-[0_6px_24px_rgba(0,0,0,0.25)]">
                  <svg className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-center leading-tight">Atención Experta</span>
                </div>

                <div className="benefit-pill flex items-center justify-center gap-3 lg:gap-4 px-4 py-3 lg:px-6 lg:py-4 bg-white rounded-3xl border border-white text-base lg:text-lg text-red-900 font-semibold shadow-[0_8px_28px_rgba(0,0,0,0.28)]">
                  <svg className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-center leading-tight">$100 por visita</span>
                </div>

                <div className="benefit-pill flex items-center justify-center gap-3 lg:gap-4 px-4 py-3 lg:px-6 lg:py-4 bg-white rounded-3xl border border-white text-base lg:text-lg text-red-900 font-semibold shadow-[0_8px_28px_rgba(0,0,0,0.28)]">
                  <svg className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-center leading-tight">Transporte Incluido</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pre-Screening Form - appears second on mobile, right side on desktop */}
          <div className="order-2 lg:order-2">
            <PreScreeningForm />
          </div>
        </div>
      </div>
    </section>
  );
}

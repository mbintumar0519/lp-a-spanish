'use client';

import SectionHeader from './SectionHeader';

export default function ContactSection() {

  return (
    <section id="contact" className="contact-section bg-gradient-to-b from-gray-50 to-white py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dc2626' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          title="Dé el Primer Paso Hoy"
          description="Llame o envíe un mensaje a +1 (813) 796‑6716. O envíe un correo a info@denali-health.com. Gastos de viaje reembolsados para ayudarle a llegar."
        />

        <div className="max-w-[1000px] mx-auto">
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-gray-900">Ubicación de la Oficina</h3>

            <div className="w-full h-[280px] md:h-[320px] rounded-2xl overflow-hidden shadow-md mb-8">
              <iframe
                src="https://www.google.com/maps?q=1601%20W%20Reynolds%20St%20STE%20203%20Plant%20City%20FL%2033563&output=embed"
                width="100%"
                height="100%"
                className="border-0"
                allowFullScreen=""
                loading="lazy"
                title="Ubicación de la Oficina Denali Health"
              ></iframe>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
              <div className="flex flex-col items-center text-center p-4 md:p-5 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300 border border-gray-100">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-gradient-to-br from-red-600 to-orange-500 shadow-lg">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="text-base font-semibold text-gray-900 mb-1">Dirección</h4>
                <p className="text-sm text-gray-600 leading-snug">1601 W Reynolds St STE 203<br />Plant City, FL 33563</p>
              </div>

              <div className="flex flex-col items-center text-center p-4 md:p-5 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300 border border-gray-100">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-gradient-to-br from-red-600 to-orange-500 shadow-lg">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-base font-semibold text-gray-900 mb-1">Horario</h4>
                <p className="text-sm text-gray-600 leading-snug">Lun–Vie: 8am–5pm<br />Sáb: 9am–1pm (con cita)</p>
              </div>

              <div className="flex flex-col items-center text-center p-4 md:p-5 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300 border border-gray-100">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-gradient-to-br from-red-600 to-orange-500 shadow-lg">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                </div>
                <h4 className="text-base font-semibold text-gray-900 mb-1">Transporte</h4>
                <p className="text-sm text-gray-600 leading-snug">Gastos de viaje reembolsados<br />Estacionamiento gratis disponible</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 md:p-8 border border-red-100">
              <div className="text-center mb-6">
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">¿Listo para Empezar?</h4>
                <p className="text-gray-600 text-sm md:text-base">Agende una llamada u obtenga direcciones a nuestra oficina.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[600px] mx-auto">
                <a
                  href="tel:+18137966716"
                  className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-red-700 to-red-600 text-white px-6 py-4 md:py-5 text-base md:text-lg rounded-xl font-bold shadow-lg shadow-red-900/25 hover:from-red-800 hover:to-red-700 hover:shadow-xl hover:shadow-red-900/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Llamar o Enviar Mensaje
                </a>

                <a
                  href="https://maps.google.com/?q=1601+W+Reynolds+St+STE+203+Plant+City+FL+33563"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-white text-red-700 px-6 py-4 md:py-5 text-base md:text-lg rounded-xl font-bold border-2 border-red-200 shadow-md hover:bg-red-50 hover:border-red-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Obtener Direcciones
                </a>
              </div>

              <div className="text-center mt-4">
                <a href="tel:+18137966716" className="text-red-700 font-bold text-lg md:text-xl hover:text-red-900 transition-colors">
                  +1 (813) 796‑6716
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

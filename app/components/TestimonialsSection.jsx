'use client';

import { useState, useEffect, useCallback } from 'react';

const testimonials = [
  {
    initials: 'DB',
    name: 'Darius Bennet',
    role: 'Paciente',
    text: 'Excelente experiencia. Me encanta el personal. Lo recomiendo altamente',
  },
  {
    initials: 'SL',
    name: 'Steve Lee',
    role: 'Paciente',
    text: 'Mis proveedores fueron muy acogedores, atentos y conocedores. Espero con ansias mi atención futura.',
  },
  {
    initials: 'VF',
    name: 'Vivian Franklin',
    role: 'Paciente',
    text: 'El personal fue maravilloso. Recomendaré Denali a mis amigos',
  },
  {
    initials: 'MS',
    name: 'Mohammad Samhouri',
    role: 'Paciente',
    text: 'El mejor equipo de todos, muy útil y conocedor',
  },
  {
    initials: 'MM',
    name: 'Marcus M.',
    role: 'Paciente',
    text: 'El transporte gratuito y la compensación hicieron muy fácil asistir a mis citas. El equipo fue profesional y atento durante todo mi tratamiento.',
  },
];

function getSlidesPerView() {
  if (typeof window === 'undefined') return 1;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const update = () => setSlidesPerView(getSlidesPerView());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const totalSlides = Math.ceil(testimonials.length / slidesPerView);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (totalSlides <= 1) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next, totalSlides]);

  useEffect(() => {
    setActive((a) => (a >= totalSlides ? 0 : a));
  }, [totalSlides]);

  const slidePercent = 100 / slidesPerView;

  return (
    <section className="bg-white py-12 lg:py-16 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 lg:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-900 mb-4 lg:mb-6 font-sans tracking-tight">
            Historias de Éxito de Pacientes
          </h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${active * slidePercent}%)` }}
            >
              {testimonials.map((t) => (
                <div
                  key={t.initials}
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-2 sm:px-3"
                >
                  <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 border border-gray-100 h-full flex flex-col">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700 text-base lg:text-lg leading-relaxed mb-6 font-sans flex-grow">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 mt-auto">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold text-sm">
                        {t.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                        <p className="text-gray-500 text-xs">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {totalSlides > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Testimonio anterior"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-red-700 hover:bg-red-50 hover:text-red-900 transition-all duration-200 z-10"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={next}
                aria-label="Siguiente testimonio"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-red-700 hover:bg-red-50 hover:text-red-900 transition-all duration-200 z-10"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {totalSlides > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Ir a la diapositiva ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === active
                    ? 'bg-red-600 w-6'
                    : 'bg-gray-300 hover:bg-gray-400 w-2.5'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

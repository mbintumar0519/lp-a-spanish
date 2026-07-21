'use client';

import { useEffect, useState } from 'react';
import SectionHeader from './SectionHeader';
import CTAButton from './CTAButton';
import { scrollToHeroForm } from '../utils/scrollToForm';

export default function AboutSection() {
  const [pageUrl, setPageUrl] = useState('');
  useEffect(() => {
    try {
      setPageUrl(window.location.href);
    } catch {}
  }, []);
  return (
    <section id="about" className="about-section bg-gray-50 py-20">
      <div className="container max-w-7xl mx-auto px-6">
        <SectionHeader title="Sobre el Estudio de Salud Cardíaca con Lipoproteína(a)" />
        
        <div className="info-cards grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="info-card bg-white rounded-2xl p-8 text-center border-2 border-red-500/10 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(220,38,38,0.15)] hover:border-red-600">
            <div className="icon-wrapper w-20 h-20 bg-gradient-to-br from-red-600/15 to-orange-500/15 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-2xl text-gray-900 mb-4 font-semibold">Sobre el Estudio</h3>
            <p className="text-gray-500 leading-relaxed">
              Este es un estudio de investigación global de Fase 3 que evalúa <strong>olpasiran</strong>, un medicamento investigacional que se enfoca en la producción de Lp(a) en el hígado. Con <strong>1 de cada 5 personas</strong> teniendo Lp(a) elevado—frecuentemente sin saberlo—este estudio busca determinar si reducir Lp(a) puede ayudar a prevenir primeros infartos importantes, derrames cerebrales o procedimientos cardíacos urgentes.
            </p>
          </div>
          
          <div className="info-card bg-white rounded-2xl p-8 text-center border-2 border-red-500/10 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(220,38,38,0.15)] hover:border-red-600">
            <div className="icon-wrapper w-20 h-20 bg-gradient-to-br from-red-600/15 to-orange-500/15 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl text-gray-900 mb-4 font-semibold">¿Qué Es el Lp(a)?</h3>
            <p className="text-gray-500 leading-relaxed">
              La lipoproteína(a), o Lp(a), es una <strong>proteína genética en su sangre que se acumula independientemente de la dieta o el ejercicio</strong>. A diferencia de otro colesterol, no puede controlarla con cambios de estilo de vida. El Lp(a) alto aumenta el riesgo de derrame cerebral en un <strong>60%</strong>, sin embargo, el <strong>90% de los médicos no lo revisa regularmente</strong>. Típicamente no está incluido en las pruebas de colesterol estándar.
            </p>
          </div>
          
          <div className="info-card bg-white rounded-2xl p-8 text-center border-2 border-red-500/10 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(220,38,38,0.15)] hover:border-red-600">
            <div className="icon-wrapper w-20 h-20 bg-gradient-to-br from-red-600/15 to-orange-500/15 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-2xl text-gray-900 mb-4 font-semibold">A Quién Buscamos</h3>
            <p className="text-gray-500 leading-relaxed">
              Adultos con <strong>niveles elevados de Lp(a)</strong> y factores de riesgo como presión arterial alta, colesterol alto, diabetes, historial familiar de enfermedad cardíaca o tabaquismo. Si tiene Lp(a) alto y quiere contribuir a una investigación crítica que podría ayudar a futuras generaciones, nos gustaría saber de usted.
            </p>
          </div>
        </div>
        
        <div className="max-w-[680px] mx-auto my-12 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border-2 border-red-200 text-center shadow-[0_8px_30px_rgba(220,38,38,0.1)]">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-bold mb-4">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            Programa de Referidos
          </div>
          <h3 className="text-red-900 text-2xl md:text-3xl font-bold mb-3">
            ¡Gane $50 por cada referido calificado!
          </h3>
          <p className="text-gray-600 text-base md:text-lg mb-6">
            ¿Conoce a alguien que podría beneficiarse? Comparta esta oportunidad y gane $50 cuando complete una evaluación gratis.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2">
            <a
              href={`sms:?body=${encodeURIComponent('Hay un estudio de investigación de salud cardíaca para personas con Lp(a) alto. ¡Gane $50 por cada referido calificado! No se necesita seguro. Si esto podría ayudarle a usted o a alguien que conoce, mire:\n\n' + (pageUrl || ''))}`}
              className="inline-flex items-center gap-1 px-4 py-2.5 bg-slate-100 border border-slate-300 rounded-lg text-slate-600 no-underline text-sm font-medium transition-all duration-200 ease-in-out hover:bg-slate-200 hover:-translate-y-0.5"
            >
              <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
              </svg>
              Texto
            </a>

            <a
              href={`https://wa.me/?text=${encodeURIComponent('Estudio de investigación de salud cardíaca para personas con Lp(a) alto. ¡Gane $50 por cada referido calificado! No se necesita seguro. Más información:\n\n' + (pageUrl || ''))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-4 py-2.5 bg-green-100 border border-green-300 rounded-lg text-green-700 no-underline text-sm font-medium transition-all duration-200 ease-in-out hover:bg-green-200 hover:-translate-y-0.5"
            >
              <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.64 15.64c-1.39 1.39-3.23 2.14-5.14 2.14s-3.75-.75-5.14-2.14S5.22 14.41 5.22 12.5s.75-3.75 2.14-5.14S10.59 5.22 12.5 5.22s3.75.75 5.14 2.14 2.14 3.23 2.14 5.14-.75 3.75-2.14 5.14z"/>
              </svg>
              WhatsApp
            </a>

            <a
              href={`https://m.me/?link=${encodeURIComponent(pageUrl || '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-4 py-2.5 bg-blue-100 border border-blue-300 rounded-lg text-blue-800 no-underline text-sm font-medium transition-all duration-200 ease-in-out hover:bg-blue-200 hover:-translate-y-0.5"
            >
              <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.95 3.61 9.05 8.33 9.84V14.7h-2.5v-2.7h2.5v-2.06c0-2.47 1.47-3.84 3.72-3.84 1.08 0 2.21.19 2.21.19v2.43h-1.24c-1.23 0-1.61.76-1.61 1.54V12h2.74l-.44 2.7h-2.3v7.14C18.39 21.05 22 16.95 22 12c0-5.52-4.48-10-10-10z"/>
              </svg>
              Messenger
            </a>

            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  const message = `Estudio de investigación de salud cardíaca para personas con Lp(a) alto. ¡Gane $50 por cada referido calificado! No se necesita seguro. Más información: ${typeof window !== 'undefined' ? window.location.href : ''}`;
                  navigator.clipboard.writeText(message);
                  alert('¡Mensaje copiado al portapapeles! Ahora puede pegarlo en cualquier app.');
                }
              }}
              className="inline-flex items-center gap-1 px-4 py-2.5 bg-slate-100 border border-slate-300 rounded-lg text-slate-600 text-sm font-medium transition-all duration-200 ease-in-out cursor-pointer hover:bg-slate-200 hover:-translate-y-0.5"
            >
              <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
              </svg>
              Copiar
            </button>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <CTAButton onClick={scrollToHeroForm} icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}>
            Agendar Evaluación Gratis
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

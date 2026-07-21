'use client';

import SectionHeader from './SectionHeader';
import Image from "next/image";
import CTAButton from './CTAButton';
import { scrollToHeroForm } from '../utils/scrollToForm';

export default function MeetPISection() {
  return (
    <section id="pi" className="py-12 md:py-24 bg-background-light relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 opacity-5">
        <div className="wave-divider"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-full md:w-1/3 max-w-[280px] mx-auto md:mx-0 mb-8 md:mb-0">
            <div className="relative">
              <div className="absolute inset-0 transform rotate-6 rounded-2xl bg-[linear-gradient(135deg,#dc2626_0%,#f97316_100%)]"></div>
              <Image
                src="/doctor.jpg"
                alt="Dr. Richard Powell, MPH, MD"
                width={400}
                height={500}
                className="relative rounded-2xl shadow-xl"
                priority
              />
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <SectionHeader
              title="Sobre el Dr. Richard Powell"
              description="Investigador Principal"
            />
            
            <div className="space-y-5 md:space-y-6">
              <div className="bg-background-white p-4 md:p-6 rounded-lg shadow-md border-l-4 border-red-600">
                <p className="text-text-secondary text-base md:text-lg font-body">
                  El Dr. Powell es un médico investigador dedicado a avanzar el cuidado cardiovascular a través de ensayos clínicos. &ldquo;La enfermedad cardíaca sigue siendo una preocupación de salud primordial&rdquo;, dice. &ldquo;Estamos comprometidos a encontrar nuevas formas de proteger a las personas con mayor riesgo.&rdquo;
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 my-5 md:my-6">
                <div className="bg-background-white p-4 md:p-5 rounded-lg shadow-md text-center border-t-4 border-red-600">
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full mb-3 md:mb-4 text-red-600 bg-[linear-gradient(135deg,rgba(220,38,38,0.15),rgba(249,115,22,0.15))]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg md:text-xl mb-1 font-heading text-red-600">Médico Investigador</h3>
                  <p className="text-base md:text-lg text-text-secondary font-body font-semibold">MPH, MD</p>
                </div>
                
                <div className="bg-background-white p-4 md:p-5 rounded-lg shadow-md text-center border-t-4 border-red-600">
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full mb-3 md:mb-4 text-red-600 bg-[linear-gradient(135deg,rgba(220,38,38,0.15),rgba(249,115,22,0.15))]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg md:text-xl mb-1 font-heading text-red-600">Investigación Cardiovascular</h3>
                  <p className="text-base md:text-lg text-text-secondary font-body font-semibold">Liderando ensayos clínicos de salud cardíaca</p>
                </div>
                
                <div className="bg-background-white p-4 md:p-5 rounded-lg shadow-md text-center border-t-4 border-red-600">
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full mb-3 md:mb-4 text-red-600 bg-[linear-gradient(135deg,rgba(220,38,38,0.15),rgba(249,115,22,0.15))]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg md:text-xl mb-1 font-heading text-red-600">Atención Centrada en el Paciente</h3>
                  <p className="text-base md:text-lg text-text-secondary font-body font-semibold">Dedicado a una investigación segura y compasiva
                  </p>
                </div>
              </div>
              
              <blockquote className="pl-4 md:pl-6 italic text-base md:text-lg text-text-secondary font-body bg-background-white p-3 md:p-4 rounded-r-lg shadow-md border-l-4 border-red-600">
                &ldquo;La investigación nos da esperanza de mejores formas de prevenir la enfermedad cardíaca. Cada participante que se une a nosotros ayuda a avanzar lo que sabemos sobre proteger los corazones.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
        
        <div className="mt-8 md:mt-12 text-center">
          <div>
            <CTAButton onClick={scrollToHeroForm} icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}>
              Agendar Evaluación Gratis
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}

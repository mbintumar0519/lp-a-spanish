'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldHeart, faCar, faCreditCard, faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import SectionHeader from './SectionHeader';
import CTAButton from './CTAButton';
import { scrollToHeroForm } from '../utils/scrollToForm';

const benefits = [
  {
    icon: faCreditCard,
    title: 'Compensación por Su Tiempo',
    description: 'Recibirá $100 por cada visita del estudio completada. Los pagos se proporcionan por su tiempo y compromiso, ya sea que reciba el medicamento del estudio o placebo.',
    color: 'from-red-600 to-red-500'
  },
  {
    icon: faCar,
    title: 'Transporte Incluido',
    description: 'Transporte gratuito hacia y desde las visitas del estudio. Si viajar es difícil, nuestro equipo puede ayudar a organizar el transporte.',
    color: 'from-orange-600 to-orange-500'
  },
  {
    icon: faShieldHeart,
    title: 'Sin Seguro Requerido',
    description: 'Toda la atención relacionada con el estudio se proporciona sin costo. Medicamento del estudio (o placebo), pruebas de Lp(a), análisis de sangre, ECG, exámenes físicos y monitoreo — todo gratis. No se necesita seguro, sin cargos por visitas o procedimientos del estudio.',
    color: 'from-red-700 to-red-600'
  },
  {
    icon: faUserDoctor,
    title: 'Equipo Experto',
    description: 'Equipo de investigación experimentado que proporciona monitoreo cuidadoso y evaluaciones de seguridad durante los períodos de selección, tratamiento y seguimiento.',
    color: 'from-orange-700 to-orange-600'
  }
];

export default function BenefitsSection() {
  return (
    <section id="benefits" className="py-20 md:py-28 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dc2626' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          title="Todo Lo Que Proporcionamos"
          description="No se requiere seguro. Toda la atención del estudio, monitoreo y prueba de Lp(a) proporcionados gratis. Compensación y apoyo de viaje incluidos."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 lg:p-8 shadow-[0_2px_15px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-500 ease-out hover:-translate-y-2 border border-gray-100 hover:border-red-100"
            >
              <div className={`absolute top-0 left-6 right-6 h-1 bg-gradient-to-r ${benefit.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="flex items-start gap-5">
                <div className={`shrink-0 w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out`}>
                  <FontAwesomeIcon icon={benefit.icon} className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                </div>

                <div className="flex-1 pt-1">
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 group-hover:text-red-700 transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14 lg:mt-16">
          <CTAButton onClick={scrollToHeroForm} icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}>
            Agendar Evaluación Gratis
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

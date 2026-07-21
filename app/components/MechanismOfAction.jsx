'use client';

import SectionHeader from './SectionHeader';
import { FaShieldAlt, FaDna } from 'react-icons/fa';
import { FaAtom, FaBullseye } from 'react-icons/fa';

const MechanismOfAction = () => {
  const steps = [
    {
      icon: <FaDna className="w-12 h-12" />,
      title: "Actúa Sobre el Lp(a) en su Origen",
      description: "Olpasiran es un ARN de interferencia pequeño (siRNA) que funciona bloqueando la producción de Lp(a) en su hígado."
    },
    {
      icon: <FaBullseye className="w-12 h-12" />,
      title: "Previniendo Primeros Eventos Cardíacos Mayores",
      description: "El estudio busca ver si bajar el Lp(a) puede ayudar a prevenir infartos, procedimientos cardíacos urgentes o muerte por enfermedad cardíaca."
    },
    {
      icon: <FaShieldAlt className="w-12 h-12" />,
      title: "Monitoreo Cercano y Seguridad",
      description: "Recibirá monitoreo regular de salud, análisis de sangre, chequeos del corazón (ECG) y evaluaciones de seguridad durante todo el estudio."
    },
    {
      icon: <FaAtom className="w-12 h-12" />,
      title: "Horario de Tratamiento Simple",
      description: "El medicamento del estudio se administra como una inyección bajo la piel aproximadamente cada 3 meses (cada 12 semanas)."
    }
  ];

  return (
    <section id="mechanism" className="mechanism-section py-12 bg-[linear-gradient(180deg,rgba(251,191,36,0.03)_0%,rgba(255,255,255,1)_50%,rgba(251,191,36,0.03)_100%)]">
      <div className="container max-w-7xl mx-auto px-6">
        <SectionHeader
          title="Cómo Funciona Olpasiran"
          description="Un enfoque investigacional para bajar el Lp(a) y reducir el riesgo cardiovascular"
        />

        <div className="max-w-[1152px] mx-auto">
          <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-100 shadow-md">
            <p className="text-gray-600 leading-relaxed font-sans text-base">
              Olpasiran (AMG 890) es un medicamento investigacional que usa tecnología de interferencia de ARN para bloquear la producción de Lp(a) en su hígado. Como el Lp(a) es genético y <strong>no se ve afectado por la dieta o el ejercicio</strong>, este enfoque dirigido puede ayudar a reducir el riesgo cardiovascular en personas con Lp(a) elevado. El Lp(a) alto no se puede controlar con cambios de estilo de vida o medicamentos estándar para el colesterol, y actualmente <strong>no hay tratamientos de Lp(a) aprobados</strong> en el mercado. <em>Olpasiran aún no está aprobado por la FDA.</em>
            </p>
          </div>

          <div className="feature-grid grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="feature-card flex gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-[0_8px_30px_rgba(249,115,22,0.15)] hover:border-orange-500/30 transition-all duration-300"
              >
                <div className="icon-box shrink-0 w-[50px] h-[50px] rounded-xl flex items-center justify-center bg-[linear-gradient(135deg,#dc2626,#f97316)]">
                  <div className="text-white text-2xl">
                    {step.icon}
                  </div>
                </div>
                <div className="content">
                  <h3 className="text-lg text-gray-900 mb-2 font-semibold">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 leading-normal text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MechanismOfAction;

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CTAButton from './CTAButton';
import SectionHeader from './SectionHeader';
import { scrollToHeroForm } from '../utils/scrollToForm';

const faqs = [
  {
    question: "¿Qué es la lipoproteína(a) [Lp(a)]?",
    answer: "El 20% de la población mundial tiene Lp(a) elevado, una proteína muy pegajosa (colesterol) en su sangre que es afectada por la genética en lugar del estilo de vida. A diferencia de otro colesterol, no puede controlarla con dieta o ejercicio. Una prueba de lipoproteína(a) puede ayudar a determinar sus niveles de Lp(a), sin embargo, típicamente no está cubierta por el seguro y no está incluida en las pruebas de colesterol estándar."
  },
  {
    question: "¿Hay algún tratamiento para Lp(a) elevado?",
    answer: "Actualmente, no hay tratamientos de Lp(a) aprobados en el mercado. Por esto este estudio de investigación es tan importante—los participantes tienen la oportunidad de acceder a tratamientos investigacionales que pueden ayudar a bajar Lp(a) y reducir el riesgo cardiovascular."
  },
  {
    question: "¿Por qué me uniría a un estudio en lugar de solo ver a mi médico regular?",
    answer: "Participar le da acceso a un posible nuevo tratamiento que aún no está disponible al público, monitoreo cercano por especialistas en investigación cardiovascular, y la oportunidad de contribuir a investigación crítica que podría ayudar a futuras generaciones. Puede continuar viendo a su médico regular para atención no relacionada con el estudio."
  },
  {
    question: "¿Cuáles son los riesgos?",
    answer: "Como con cualquier tratamiento investigacional, puede haber riesgos incluyendo reacciones en el sitio de inyección, reacciones alérgicas y otros efectos secundarios. Los efectos secundarios más comunes vistos con olpasiran han sido reacciones en el sitio de inyección como enrojecimiento, dolor o hinchazón. Todos los riesgos conocidos serán discutidos con usted en detalle antes de que decida participar."
  },
  {
    question: "¿Qué pasa si recibo placebo?",
    answer: "El estudio está diseñado para comparar el medicamento investigacional con placebo para evaluar su efectividad. Tiene la misma oportunidad de recibir olpasiran o placebo. Sin importar cuál reciba, su salud será monitoreada de cerca durante todo el estudio, y recibirá compensación por su tiempo."
  },
  {
    question: "¿Esto me costará algo? ¿Necesito seguro?",
    answer: "Sin costo para usted, y no se requiere seguro. Toda la atención relacionada con el estudio, pruebas de Lp(a), análisis de laboratorio, ECG y procedimientos se proporcionan sin cargo. Recibirá $100 de compensación por visita completada, y los gastos de viaje razonables serán reembolsados cuando presente recibos."
  },
  {
    question: "¿Puedo dejar el estudio más tarde si cambio de opinión?",
    answer: "Sí, la participación es completamente voluntaria. Puede retirarse del estudio en cualquier momento sin ninguna penalidad o pérdida de beneficios. Su atención médica regular no se verá afectada por su decisión."
  },
  {
    question: "¿Todavía veré a mi médico regular?",
    answer: "Sí, debe continuar viendo a su médico regular para atención no relacionada con el estudio. El equipo del estudio informará a su médico personal que está participando en este estudio si usted da permiso."
  },
  {
    question: "¿Quién ve mi información?",
    answer: "Su privacidad es importante. Solo personal autorizado del estudio, el patrocinador (Amgen), agencias reguladoras como la FDA, y juntas de revisión ética tendrán acceso a su información. Su información se mantendrá confidencial según lo permitido por la ley."
  },
  {
    question: "¿Cuánto dura el estudio?",
    answer: "Se espera que esté en el estudio por aproximadamente 3.5 a 5.5 años en total, incluyendo la revisión inicial (hasta 2 meses), tratamiento (3.5-5 años con inyecciones cada 12 semanas), y un seguimiento de seguridad aproximadamente 30 días después de su última inyección."
  },
];

function FAQItem({ faq, index, isOpen, onToggle }) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden mb-4 ${
        isOpen
          ? 'bg-white border-red-200 shadow-lg shadow-red-900/5'
          : 'bg-gray-50/80 border-gray-100 hover:bg-white hover:border-gray-200 hover:shadow-md'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer group"
        aria-expanded={isOpen}
      >
        <span className={`text-base sm:text-lg font-semibold leading-snug transition-colors duration-200 ${
          isOpen ? 'text-red-700' : 'text-gray-900 group-hover:text-red-700'
        }`}>
          {faq.question}
        </span>
        <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? 'bg-red-600 text-white rotate-180'
            : 'bg-gray-100 text-gray-500 group-hover:bg-red-50 group-hover:text-red-600'
        }`}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={`answer-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
              <div className="h-px w-full bg-gradient-to-r from-red-200/50 via-red-100 to-transparent mb-4" />
              <p className="text-gray-600 leading-relaxed text-base font-sans">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 lg:py-20 bg-gradient-to-b from-red-50/30 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Preguntas Frecuentes"
          description="Encuentre respuestas a preguntas comunes sobre nuestro estudio de investigación clínica."
        />

        <div className="mt-8 lg:mt-12">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </div>

        <div className="text-center mt-12 lg:mt-16">
          <CTAButton
            onClick={scrollToHeroForm}
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
          >
            Agendar Evaluación Gratis
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

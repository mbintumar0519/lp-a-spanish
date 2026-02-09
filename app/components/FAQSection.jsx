'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0); // Start with first FAQ open

  const faqs = [
    {
      question: "¿Qué es la lipoproteína(a) [Lp(a)]?",
      answer: "El 20% de la población mundial tiene Lp(a) elevado, una proteína muy pegajosa (colesterol) en su sangre que es afectada por la genética en lugar del estilo de vida. A diferencia de otro colesterol, no puede controlarla con dieta o ejercicio. Una prueba de lipoproteína(a) puede ayudar a determinar sus niveles de Lp(a), sin embargo, típicamente no está cubierta por el seguro y no está incluida en las pruebas de colesterol estándar."
    },
    {
      question: "¿Hay algún tratamiento para Lp(a) elevado?",
      answer: "Actualmente, no hay tratamientos de Lp(a) aprobados en el mercado. Por esto este estudio de investigación es tan importantelos participantes tienen la oportunidad de acceder a tratamientos investigacionales que pueden ayudar a bajar Lp(a) y reducir el riesgo cardiovascular."
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

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };


  return (
    <section id="faq" className="faq-section" style={{
      background: 'linear-gradient(180deg, rgba(20, 184, 166, 0.03) 0%, rgba(255, 255, 255, 1) 100%)',
      padding: 'var(--space-20) 0'
    }}>
      <div className="container" style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 var(--space-6)'
      }}>
        {/* Section header */}
        <div className="section-header" style={{
            textAlign: 'center',
            marginBottom: 'var(--space-16)'
          }}
        >
          <h2 style={{
            fontSize: 'var(--text-4xl)',
            color: 'var(--gray-900)',
            fontWeight: '700',
            marginBottom: 'var(--space-4)',
            fontFamily: 'var(--font-heading)'
          }}>
            Preguntas Frecuentes
          </h2>
          <div className="underline" style={{
            width: '80px',
            height: '4px',
            background: 'linear-gradient(90deg, #14b8a6 0%, #5eead4 100%)',
            margin: '0 auto var(--space-6)',
            borderRadius: '2px'
          }}></div>
          <p style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--gray-500)',
            maxWidth: '512px',
            margin: '0 auto',
            fontFamily: 'var(--font-primary)'
          }}>
            Encuentre respuestas a preguntas comunes sobre nuestro estudio de investigación clínica.
          </p>
        </div>
        
        <div className="faq-container" style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {faqs.map((faq, index) => (
            <div key={index}>
              <div 
                className={`faq-item transition-all duration-300 ${
                  openIndex === index ? 'active' : ''
                }`} style={{
                  background: openIndex === index ? 'white' : 'var(--gray-50)',
                  borderRadius: '0.75rem',
                  marginBottom: 'var(--space-4)',
                  overflow: 'hidden',
                  border: openIndex === index ? '1px solid #14b8a6' : '1px solid var(--gray-200)',
                  boxShadow: openIndex === index ? 'var(--shadow-md)' : 'none'
                }}
              >
                <div 
                  className="faq-question" 
                  onClick={() => toggleFAQ(index)}
                  style={{
                    padding: 'var(--space-6)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <h3 style={{
                    fontSize: 'var(--text-lg)',
                    color: 'var(--gray-900)',
                    fontWeight: '600'
                  }}>
                    {faq.question}
                  </h3>
                  <div className={`icon ${openIndex === index ? 'rotate' : ''}`} style={{
                    width: '24px',
                    height: '24px',
                    color: '#14b8a6',
                  }}>
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                {openIndex === index && (
                  <div
                    className="overflow-hidden"
                    id={`faq-answer-${index}`}
                  >
                      <div className={`faq-answer ${openIndex === index ? 'open' : ''}`} style={{
                        padding: openIndex === index ? '0 var(--space-6) var(--space-6)' : '0',
                        color: 'var(--gray-600)',
                        lineHeight: '1.6',
                        maxHeight: openIndex === index ? '500px' : '0',
                        overflow: 'hidden',
                      }}>
                        <p style={{
                          lineHeight: '1.6',
                          fontSize: 'var(--text-base)',
                          fontFamily: 'var(--font-primary)'
                        }}>
                          {faq.answer}
                        </p>
                      </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div style={{
            textAlign: 'center',
            marginTop: 'var(--space-16)'
          }}
        >
          <p style={{
            color: 'var(--gray-900)',
            marginBottom: 'var(--space-6)',
            fontSize: 'var(--text-lg)',
            fontWeight: '500',
            fontFamily: 'var(--font-heading)'
          }}>
            ¿Tiene más preguntas sobre el estudio?
          </p>
          <a
            href="tel:+18137966716"
            className="btn-primary"
            style={{
              background: 'var(--primary-blue)',
              color: 'white',
              padding: 'var(--space-4) var(--space-8)',
              fontSize: 'var(--text-lg)',
              borderRadius: '0.75rem',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              boxShadow: 'var(--shadow-md)',
              textDecoration: 'none'
            }}
          >
            <svg 
              style={{ width: '20px', height: '20px' }}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
              />
            </svg>
            <span>Programe Su Cita Hoy!</span>
          </a>
        </div>
      </div>
      
      <style jsx>{`
        .btn-primary:hover {
          background: var(--primary-dark);
          box-shadow: var(--shadow-lg);
        }
      `}</style>
    </section>
  );
} 
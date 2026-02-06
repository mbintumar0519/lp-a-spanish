'use client';

import { FaShieldAlt, FaMicroscope, FaDna } from 'react-icons/fa';
import { FaAtom, FaVirus, FaBullseye } from 'react-icons/fa';

const MechanismOfAction = () => {
  const steps = [
    {
      icon: <FaDna className="w-12 h-12" />,
      title: "Se Enfoca en Lp(a) en Su Origen",
      description: "Olpasiran es un ARN de interferencia pequeño (siRNA) que funciona bloqueando la producción de Lp(a) en su hígado."
    },
    {
      icon: <FaBullseye className="w-12 h-12" />,
      title: "Prevención de Primeros Eventos Cardíacos Importantes",
      description: "El estudio busca determinar si bajar Lp(a) puede ayudar a prevenir infartos, procedimientos cardíacos urgentes o muerte por enfermedad cardíaca."
    },
    {
      icon: <FaShieldAlt className="w-12 h-12" />,
      title: "Monitoreo Cercano y Seguridad",
      description: "Recibirá monitoreo de salud regular, análisis de sangre, controles cardíacos (ECG) y evaluaciones de seguridad durante todo el estudio."
    },
    {
      icon: <FaAtom className="w-12 h-12" />,
      title: "Calendario de Tratamiento Simple",
      description: "El medicamento del estudio se administra como una inyección bajo la piel aproximadamente cada 3 meses (cada 12 semanas)."
    }
  ];

  return (
    <section id="mechanism" className="mechanism-section" style={{
      background: 'linear-gradient(180deg, rgba(251, 191, 36, 0.03) 0%, rgba(255, 255, 255, 1) 50%, rgba(251, 191, 36, 0.03) 100%)',
      padding: 'var(--space-12) 0'
    }}>
      <div className="container" style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 var(--space-6)'
      }}>
        {/* Section header */}
        <div className="section-header" style={{
            textAlign: 'center',
            marginBottom: 'var(--space-8)'
          }}
        >
          <h2 style={{
            fontSize: 'var(--text-3xl)',
            color: 'var(--gray-900)',
            fontWeight: '700',
            marginBottom: 'var(--space-3)',
            fontFamily: 'var(--font-heading)'
          }}>
            Cómo Funciona Olpasiran
          </h2>
          <div className="underline" style={{
            width: '80px',
            height: '4px',
            background: 'linear-gradient(90deg, #14b8a6 0%, #5eead4 100%)',
            margin: '0 auto var(--space-4)',
            borderRadius: '2px'
          }}></div>
          <p style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--gray-500)',
            maxWidth: '768px',
            margin: '0 auto',
            fontFamily: 'var(--font-primary)'
          }}>
            Un enfoque investigacional para bajar Lp(a) y reducir el riesgo cardiovascular
          </p>
        </div>

        <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
          <div style={{
              background: 'white',
              borderRadius: '1rem',
              padding: 'var(--space-6)',
              marginBottom: 'var(--space-8)',
              border: '1px solid var(--gray-100)',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <p style={{
              color: 'var(--gray-600)',
              lineHeight: '1.6',
              fontFamily: 'var(--font-primary)',
              fontSize: 'var(--text-base)'
            }}>
              Olpasiran (AMG 890) es un medicamento investigacional que utiliza tecnología de interferencia de ARN para bloquear la producción de Lp(a) en su hígado. Dado que Lp(a) es genético y <strong>no se ve afectado por la dieta o el ejercicio</strong>, este enfoque dirigido puede ayudar a reducir el riesgo cardiovascular para personas con Lp(a) elevado. Lp(a) alto no puede ser controlado con cambios de estilo de vida o medicamentos estándar para el colesterol, y actualmente <strong>no hay tratamientos aprobados para Lp(a)</strong> en el mercado. <em>Olpasiran aún no está aprobado por la FDA.</em>
            </p>
          </div>

          {/* Feature cards */}
          <div className="feature-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'var(--space-6)'
          }}>
            {steps.map((step, index) => (
              <div
                key={index}
                className="feature-card" style={{
                  display: 'flex',
                  gap: 'var(--space-4)',
                  padding: 'var(--space-6)',
                  background: 'var(--gray-50)',
                  borderRadius: '1rem',
                  border: '1px solid var(--gray-100)'
                }}
              >
                <div className="icon-box" style={{
                  flexShrink: 0,
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, #dc2626, #f97316)',
                  borderRadius: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{ color: 'white', fontSize: '24px' }}>
                    {step.icon}
                  </div>
                </div>
                <div className="content">
                  <h3 style={{
                    fontSize: 'var(--text-lg)',
                    color: 'var(--gray-900)',
                    marginBottom: 'var(--space-2)',
                    fontWeight: '600'
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    color: 'var(--gray-500)',
                    lineHeight: '1.5',
                    fontSize: '0.9rem'
                  }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .feature-card:hover {
          background: white;
          box-shadow: 0 8px 30px rgba(249, 115, 22, 0.15);
          border-color: rgba(249, 115, 22, 0.3);
        }
        
        @media (max-width: 768px) {
          .feature-grid {
            grid-template-columns: 1fr !important;
            gap: var(--space-4) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default MechanismOfAction;
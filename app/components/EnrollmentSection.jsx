// No need for changes here

'use client';

export default function EnrollmentSection() {
  return (
    <section id="enroll" className="enrollment-section" style={{
      background: 'var(--gray-50)',
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
        }}>
          <h2 style={{
            fontSize: 'var(--text-4xl)',
            color: 'var(--gray-900)',
            fontWeight: '700',
            marginBottom: 'var(--space-4)',
            fontFamily: 'var(--font-heading)'
          }}>Qué Esperar</h2>
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
            maxWidth: '768px',
            margin: '0 auto',
            fontFamily: 'var(--font-primary)'
          }}>
            Desde la evaluación inicial hasta el seguimiento, lo apoyaremos en cada paso. Gastos de viaje reembolsados.
          </p>
        </div>
        
        <div className="enrollment-steps" style={{
          position: 'relative',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {/* Timeline line */}
          <div style={{
            content: '',
            position: 'absolute',
            left: '40px',
            top: '60px',
            bottom: '60px',
            width: '2px',
            background: 'var(--gray-300)'
          }}></div>
            
          {/* Step 1 */}
          <div className="step" style={{
              display: 'flex',
              gap: 'var(--space-8)',
              marginBottom: 'var(--space-12)',
              position: 'relative'
            }}
          >
            <div className="step-number" style={{
              flexShrink: 0,
              width: '80px',
              height: '80px',
              background: 'white',
              border: '3px solid #14b8a6',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'var(--text-3xl)',
              fontWeight: '700',
              color: '#14b8a6',
              position: 'relative',
              zIndex: 1
            }}>
              1
            </div>
            <div className="step-content" style={{
              flex: 1,
              background: 'white',
              padding: 'var(--space-8)',
              borderRadius: '1rem',
              border: '1px solid var(--gray-100)'
            }}>
              <h3 style={{
                fontSize: 'var(--text-2xl)',
                color: 'var(--gray-900)',
                marginBottom: 'var(--space-3)',
                fontWeight: '600'
              }}>Período de Evaluación Inicial (Hasta 2 Meses)</h3>
              <p style={{
                color: 'var(--gray-600)',
                lineHeight: '1.6'
              }}>
                Revisaremos su historial médico, mediremos sus niveles de Lp(a) y realizaremos evaluaciones de salud incluyendo análisis de sangre, ECG y signos vitales para asegurar que el estudio sea seguro para usted. Aproximadamente 2 visitas de evaluación.
              </p>
            </div>
          </div>
            
          {/* Step 2 */}
          <div className="step" style={{
              display: 'flex',
              gap: 'var(--space-8)',
              marginBottom: 'var(--space-12)',
              position: 'relative'
            }}
          >
            <div className="step-number" style={{
              flexShrink: 0,
              width: '80px',
              height: '80px',
              background: 'white',
              border: '3px solid #14b8a6',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'var(--text-3xl)',
              fontWeight: '700',
              color: '#14b8a6',
              position: 'relative',
              zIndex: 1
            }}>
              2
            </div>
            <div className="step-content" style={{
              flex: 1,
              background: 'white',
              padding: 'var(--space-8)',
              borderRadius: '1rem',
              border: '1px solid var(--gray-100)'
            }}>
              <h3 style={{
                fontSize: 'var(--text-2xl)',
                color: 'var(--gray-900)',
                marginBottom: 'var(--space-3)',
                fontWeight: '600'
              }}>Período de Tratamiento (3.5 a 5 Años)</h3>
              <p style={{
                color: 'var(--gray-600)',
                lineHeight: '1.6'
              }}>
                Recibirá medicamento del estudio o placebo como una inyección bajo la piel aproximadamente cada 3 meses (cada 12 semanas). Las visitas regulares incluyen monitoreo de salud, análisis de sangre, ECG y controles de seguridad. Se proporciona compensación por cada visita.
              </p>
            </div>
          </div>
            
          {/* Step 3 */}
          <div className="step" style={{
              display: 'flex',
              gap: 'var(--space-8)',
              marginBottom: 'var(--space-12)',
              position: 'relative'
            }}
          >
            <div className="step-number" style={{
              flexShrink: 0,
              width: '80px',
              height: '80px',
              background: 'white',
              border: '3px solid #14b8a6',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'var(--text-3xl)',
              fontWeight: '700',
              color: '#14b8a6',
              position: 'relative',
              zIndex: 1
            }}>
              3
            </div>
            <div className="step-content" style={{
              flex: 1,
              background: 'white',
              padding: 'var(--space-8)',
              borderRadius: '1rem',
              border: '1px solid var(--gray-100)'
            }}>
              <h3 style={{
                fontSize: 'var(--text-2xl)',
                color: 'var(--gray-900)',
                marginBottom: 'var(--space-3)',
                fontWeight: '600'
              }}>Seguimiento de Seguridad (Aproximadamente 30 Días)</h3>
              <p style={{
                color: 'var(--gray-600)',
                lineHeight: '1.6'
              }}>
                Aproximadamente 30 días después de su última inyección del medicamento del estudio, nos comunicaremos con usted para asegurarnos de que esté bien. Esto puede ser una visita o una llamada telefónica dependiendo del momento.
              </p>
            </div>
          </div>
            
          {/* Step 4 */}
          <div className="step" style={{
              display: 'flex',
              gap: 'var(--space-8)',
              marginBottom: 'var(--space-12)',
              position: 'relative'
            }}
          >
            <div className="step-number" style={{
              flexShrink: 0,
              width: '80px',
              height: '80px',
              background: 'white',
              border: '3px solid #14b8a6',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'var(--text-3xl)',
              fontWeight: '700',
              color: '#14b8a6',
              position: 'relative',
              zIndex: 1
            }}>
              4
            </div>
            <div className="step-content" style={{
              flex: 1,
              background: 'white',
              padding: 'var(--space-8)',
              borderRadius: '1rem',
              border: '1px solid var(--gray-100)'
            }}>
              <h3 style={{
                fontSize: 'var(--text-2xl)',
                color: 'var(--gray-900)',
                marginBottom: 'var(--space-3)',
                fontWeight: '600'
              }}>Duración Total del Estudio</h3>
              <p style={{
                color: 'var(--gray-600)',
                lineHeight: '1.6'
              }}>
                Se espera que esté en el estudio por aproximadamente 3.5 a 5.5 años en total, según cuando comience. Puede elegir dejar de participar en cualquier momento sin penalización. Las visitas se programan según su disponibilidad.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .step-number:hover {
          background: linear-gradient(135deg, #14b8a6, #5eead4);
          color: white;
          border-color: #5eead4;
        }
        
        @media (max-width: 768px) {
          .enrollment-steps {
            max-width: 100% !important;
          }
          
          .step {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
          
          .step-number {
            margin-bottom: var(--space-4) !important;
          }
        }
      `}</style>
    </section>
  );
} 
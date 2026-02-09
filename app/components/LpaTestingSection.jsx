'use client';

import { FaCalendarAlt, FaVial, FaClipboardCheck } from 'react-icons/fa';

export default function LpaTestingSection() {
  const scrollToHeroForm = () => {
    const heroForm = document.getElementById('hero-form');
    if (heroForm) {
      heroForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Optional: focus the first input
      setTimeout(() => {
        const firstInput = heroForm.querySelector('input');
        if (firstInput) firstInput.focus();
      }, 500);
    }
  };

  return (
    <section style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #fef2f2 100%)',
      padding: 'var(--space-20) 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.03,
        backgroundImage: 'radial-gradient(circle at 20% 50%, #dc2626 0%, transparent 50%), radial-gradient(circle at 80% 80%, #f97316 0%, transparent 50%)',
        pointerEvents: 'none'
      }}></div>

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 var(--space-6)',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: 'var(--space-12)'
        }}>
          <h2 style={{
            fontSize: 'var(--text-4xl)',
            color: 'var(--gray-900)',
            fontWeight: '700',
            marginBottom: 'var(--space-4)',
            fontFamily: 'var(--font-heading)'
          }}>
            ¡Obtenga Sus Resultados de Prueba de Lp(a) en 3 Pasos Fáciles!
          </h2>
          <p style={{
            fontSize: 'var(--text-xl)',
            color: 'var(--gray-600)',
            maxWidth: '768px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)'
          }}>
            La mayoría de las personas no conoce sus niveles de Lp(a). Únase a nuestro estudio de investigación y obtenga pruebas  gratis, sin seguro requerido.
          </p>
        </div>

        {/* Steps */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--space-8)',
          marginBottom: 'var(--space-12)'
        }}>
          {/* Step 1 */}
          <div style={{
            background: 'white',
            borderRadius: '1.5rem',
            padding: 'var(--space-8)',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '2px solid rgba(220, 38, 38, 0.1)',
            transition: 'all 0.3s ease',
            position: 'relative'
          }} className="step-card">
            {/* Step number badge */}
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #dc2626 0%, #f97316 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '700',
              fontSize: 'var(--text-xl)',
              boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
              fontFamily: 'var(--font-heading)'
            }}>
              1
            </div>

            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.1), rgba(249, 115, 22, 0.1))',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-6)',
              marginTop: 'var(--space-4)'
            }}>
              <FaCalendarAlt style={{
                fontSize: '2rem',
                color: '#dc2626'
              }} />
            </div>

            <h3 style={{
              fontSize: 'var(--text-2xl)',
              color: 'var(--gray-900)',
              fontWeight: '600',
              marginBottom: 'var(--space-3)',
              fontFamily: 'var(--font-heading)'
            }}>
              Paso 1: Agende
            </h3>
            <p style={{
              color: 'var(--gray-600)',
              lineHeight: '1.6',
              fontSize: 'var(--text-base)',
              fontFamily: 'var(--font-primary)'
            }}>
              Complete nuestro breve formulario de pre-evaluación. Cuéntenos un poco sobre usted y su historial de salud cardiovascular. Nuestro equipo se comunicará con usted dentro de 24 horas.
            </p>
          </div>

          {/* Step 2 */}
          <div style={{
            background: 'white',
            borderRadius: '1.5rem',
            padding: 'var(--space-8)',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '2px solid rgba(249, 115, 22, 0.1)',
            transition: 'all 0.3s ease',
            position: 'relative'
          }} className="step-card">
            {/* Step number badge */}
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #f97316 0%, #fbbf24 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '700',
              fontSize: 'var(--text-xl)',
              boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)',
              fontFamily: 'var(--font-heading)'
            }}>
              2
            </div>

            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(251, 191, 36, 0.1))',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-6)',
              marginTop: 'var(--space-4)'
            }}>
              <FaVial style={{
                fontSize: '2rem',
                color: '#f97316'
              }} />
            </div>

            <h3 style={{
              fontSize: 'var(--text-2xl)',
              color: 'var(--gray-900)',
              fontWeight: '600',
              marginBottom: 'var(--space-3)',
              fontFamily: 'var(--font-heading)'
            }}>
              Paso 2: Hágase la Prueba
            </h3>
            <p style={{
              color: 'var(--gray-600)',
              lineHeight: '1.6',
              fontSize: 'var(--text-base)',
              fontFamily: 'var(--font-primary)'
            }}>
              Visite nuestra clínica en Plant City para una extracción de sangre simple. Recibirá pruebas completas incluyendo Lp(a), panel de el colesterol, A1c y más. Además, $100 de compensación por su tiempo.
            </p>
          </div>

          {/* Step 3 */}
          <div style={{
            background: 'white',
            borderRadius: '1.5rem',
            padding: 'var(--space-8)',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '2px solid rgba(20, 184, 166, 0.1)',
            transition: 'all 0.3s ease',
            position: 'relative'
          }} className="step-card">
            {/* Step number badge */}
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #14b8a6 0%, #5eead4 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '700',
              fontSize: 'var(--text-xl)',
              boxShadow: '0 4px 12px rgba(20, 184, 166, 0.3)',
              fontFamily: 'var(--font-heading)'
            }}>
              3
            </div>

            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1), rgba(94, 234, 212, 0.1))',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-6)',
              marginTop: 'var(--space-4)'
            }}>
              <FaClipboardCheck style={{
                fontSize: '2rem',
                color: '#14b8a6'
              }} />
            </div>

            <h3 style={{
              fontSize: 'var(--text-2xl)',
              color: 'var(--gray-900)',
              fontWeight: '600',
              marginBottom: 'var(--space-3)',
              fontFamily: 'var(--font-heading)'
            }}>
              Paso 3: Obtenga Resultados
            </h3>
            <p style={{
              color: 'var(--gray-600)',
              lineHeight: '1.6',
              fontSize: 'var(--text-base)',
              fontFamily: 'var(--font-primary)'
            }}>
              En unas pocas semanas, nuestro equipo compartirá sus resultados, explicará lo que significan para su salud cardíaca y proporcionará una copia para su médico. 
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={scrollToHeroForm}
            style={{
              background: 'linear-gradient(135deg, #dc2626, #f97316)',
              color: 'white',
              padding: 'var(--space-5) var(--space-10)',
              fontSize: 'var(--text-xl)',
              borderRadius: '0.75rem',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(220, 38, 38, 0.3)',
              transition: 'all 0.3s ease',
              fontFamily: 'var(--font-heading)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-3)'
            }}
            className="cta-button"
          >
            Programe Su Cita Hoy!
            <svg style={{ width: '24px', height: '24px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          
          <p style={{
            marginTop: 'var(--space-4)',
            color: 'var(--gray-600)',
            fontSize: 'var(--text-sm)',
            fontFamily: 'var(--font-primary)'
          }}>
            ✓ Sin seguro requerido  •  ✓ Pruebas completas gratuitas  •  ✓ $100 de compensación
          </p>
        </div>
      </div>

      <style jsx>{`
        .step-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        }
        
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(220, 38, 38, 0.4);
        }
      `}</style>
    </section>
  );
}


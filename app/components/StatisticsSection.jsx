'use client';

export default function StatisticsSection() {
  return (
    <section style={{
      background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.05) 0%, rgba(249, 115, 22, 0.05) 50%, rgba(251, 191, 36, 0.05) 100%)',
      padding: 'var(--space-16) 0',
      borderTop: '1px solid rgba(20, 184, 166, 0.1)',
      borderBottom: '1px solid rgba(20, 184, 166, 0.1)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 var(--space-6)'
      }}>
        <h2 style={{
          fontSize: 'var(--text-3xl)',
          color: 'var(--gray-900)',
          fontWeight: '700',
          marginBottom: 'var(--space-12)',
          textAlign: 'center',
          fontFamily: 'var(--font-heading)'
        }}>
          El Riesgo Oculto Que la Mayoría de los Médicos No Revisan
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'var(--space-6)',
          marginTop: 'var(--space-8)'
        }}>
          {/* Stat 1 */}
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            padding: 'var(--space-8)',
            textAlign: 'center',
            border: '2px solid rgba(220, 38, 38, 0.1)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            transition: 'all 0.3s ease'
          }} className="stat-card">
            <div style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #dc2626 0%, #f97316 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: 'var(--space-4)',
              fontFamily: 'var(--font-heading)',
              lineHeight: '1.2',
              display: 'inline-block'
            }}>
              1 en 5
            </div>
            <h3 style={{
              fontSize: 'var(--text-xl)',
              color: 'var(--gray-900)',
              fontWeight: '600',
              marginBottom: 'var(--space-2)',
              fontFamily: 'var(--font-heading)'
            }}>
              Personas Tienen Lp(a) Elevado
            </h3>
            <p style={{
              color: 'var(--gray-600)',
              fontSize: 'var(--text-base)',
              lineHeight: '1.6',
              fontFamily: 'var(--font-primary)'
            }}>
              Y la mayoría no lo sabe porque no está incluido en las pruebas de colesterol estándar
            </p>
          </div>

          {/* Stat 2 */}
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            padding: 'var(--space-8)',
            textAlign: 'center',
            border: '2px solid rgba(249, 115, 22, 0.1)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            transition: 'all 0.3s ease'
          }} className="stat-card">
            <div style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #f97316 0%, #fbbf24 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: 'var(--space-4)',
              fontFamily: 'var(--font-heading)',
              lineHeight: '1.2',
              display: 'inline-block'
            }}>
              60%
            </div>
            <h3 style={{
              fontSize: 'var(--text-xl)',
              color: 'var(--gray-900)',
              fontWeight: '600',
              marginBottom: 'var(--space-2)',
              fontFamily: 'var(--font-heading)'
            }}>
              Aumento del Riesgo de Derrame Cerebral
            </h3>
            <p style={{
              color: 'var(--gray-600)',
              fontSize: 'var(--text-base)',
              lineHeight: '1.6',
              fontFamily: 'var(--font-primary)'
            }}>
              Lp(a) elevado aumenta significativamente el riesgo de derrame cerebral y enfermedad cardíaca
            </p>
          </div>

          {/* Stat 3 */}
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            padding: 'var(--space-8)',
            textAlign: 'center',
            border: '2px solid rgba(20, 184, 166, 0.1)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            transition: 'all 0.3s ease'
          }} className="stat-card">
            <div style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #14b8a6 0%, #5eead4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: 'var(--space-4)',
              fontFamily: 'var(--font-heading)',
              lineHeight: '1.2',
              display: 'inline-block'
            }}>
              90%
            </div>
            <h3 style={{
              fontSize: 'var(--text-xl)',
              color: 'var(--gray-900)',
              fontWeight: '600',
              marginBottom: 'var(--space-2)',
              fontFamily: 'var(--font-heading)'
            }}>
              Médicos No Lo Revisan
            </h3>
            <p style={{
              color: 'var(--gray-600)',
              fontSize: 'var(--text-base)',
              lineHeight: '1.6',
              fontFamily: 'var(--font-primary)'
            }}>
              La mayoría de los médicos no revisan regularmente Lp(a), y rara vez está cubierto por el seguro
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </section>
  );
}


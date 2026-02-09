'use client';

"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { scrollToHeroForm } from '../utils/scrollToForm';

export default function AboutSection() {
  const [pageUrl, setPageUrl] = useState('');
  useEffect(() => {
    try {
      setPageUrl(window.location.href);
    } catch {}
  }, []);
  return (
    <section id="about" className="about-section" style={{
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
          }}
        >
          <h2 style={{
            fontSize: 'var(--text-4xl)',
            color: 'var(--gray-900)',
            fontWeight: '700',
            marginBottom: 'var(--space-4)',
            fontFamily: 'var(--font-heading)'
          }}>
            Sobre el Estudio de Salud Cardíaca con Lipoproteína(a)
          </h2>
          <div className="underline" style={{
            width: '80px',
            height: '4px',
            background: 'linear-gradient(90deg, #14b8a6 0%, #5eead4 100%)',
            margin: '0 auto',
            borderRadius: '2px'
          }}></div>
        </div>
        
        {/* Info cards grid */}
        <div className="info-cards" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--space-8)'
        }}>
          <div className="info-card" style={{
              background: 'white',
              borderRadius: '1rem',
              padding: 'var(--space-8)',
              textAlign: 'center',
              border: '2px solid rgba(20, 184, 166, 0.1)',
              transition: 'all 0.3s ease'
            }}
          >
            <div className="icon-wrapper" style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.15), rgba(94, 234, 212, 0.15))',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-6)'
            }}>
              <svg style={{
                width: '40px',
                height: '40px',
                color: '#14b8a6'
              }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 style={{
              fontSize: 'var(--text-2xl)',
              color: 'var(--gray-900)',
              marginBottom: 'var(--space-4)',
              fontWeight: '600'
            }}>Sobre el Estudio</h3>
            <p style={{
              color: 'var(--gray-500)',
              lineHeight: '1.6'
            }}>
              Este es un estudio de investigación global de Fase 3 que evalúa <strong>olpasiran</strong>, un medicamento investigacional que se enfoca en la producción de Lp(a) en el hígado. Con <strong>1 de cada 5 personas</strong> teniendo Lp(a) elevadofrecuentemente sin saberloeste estudio busca determinar si reducir Lp(a) puede ayudar a prevenir primeros infartos importantes, derrames cerebrales o procedimientos cardíacos urgentes.
            </p>
          </div>
          
          <div className="info-card" style={{
              background: 'white',
              borderRadius: '1rem',
              padding: 'var(--space-8)',
              textAlign: 'center',
              border: '2px solid rgba(20, 184, 166, 0.1)',
              transition: 'all 0.3s ease'
            }}
          >
            <div className="icon-wrapper" style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.15), rgba(94, 234, 212, 0.15))',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-6)'
            }}>
              <svg style={{
                width: '40px',
                height: '40px',
                color: '#14b8a6'
              }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 style={{
              fontSize: 'var(--text-2xl)',
              color: 'var(--gray-900)',
              marginBottom: 'var(--space-4)',
              fontWeight: '600'
            }}>¿Qué es Lp(a)?</h3>
            <p style={{
              color: 'var(--gray-500)',
              lineHeight: '1.6'
            }}>
              La lipoproteína(a), o Lp(a), es una <strong>proteína genética en su sangre que se acumula sin importar la dieta o el ejercicio</strong>. A diferencia de otro colesterol, no puede controlarla con cambios de estilo de vida. Lp(a) elevado aumenta el riesgo de derrame cerebral en <strong>60%</strong>, sin embargo <strong>90% de los médicos no la revisan regularmente</strong>. Típicamente no está incluida en pruebas de colesterol estándar.
            </p>
          </div>
          
          <div className="info-card" style={{
              background: 'white',
              borderRadius: '1rem',
              padding: 'var(--space-8)',
              textAlign: 'center',
              border: '2px solid rgba(20, 184, 166, 0.1)',
              transition: 'all 0.3s ease'
            }}
          >
            <div className="icon-wrapper" style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.15), rgba(94, 234, 212, 0.15))',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-6)'
            }}>
              <svg style={{
                width: '40px',
                height: '40px',
                color: '#14b8a6'
              }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 style={{
              fontSize: 'var(--text-2xl)',
              color: 'var(--gray-900)',
              marginBottom: 'var(--space-4)',
              fontWeight: '600'
            }}>A Quién Buscamos</h3>
            <p style={{
              color: 'var(--gray-500)',
              lineHeight: '1.6'
            }}>
              Adultos con <strong>niveles elevados de Lp(a)</strong> y factores de riesgo como presión arterial alta, colesterol alto, diabetes, historial familiar de enfermedades cardíacas o tabaquismo. Si tiene Lp(a) elevado  que podría ayudar a futuras generaciones, nos gustaría saber de usted.
            </p>
          </div>
        </div>
        
        {/* Share Study Section */}
        <div style={{
          maxWidth: '600px',
          margin: 'var(--space-12) auto',
          background: 'white',
          borderRadius: '1rem',
          padding: 'var(--space-6)',
          border: '1px solid var(--gray-100)',
          textAlign: 'center'
        }}>
          <h3 style={{
            color: 'var(--gray-900)',
            fontSize: 'var(--text-xl)',
            fontWeight: '600',
            marginBottom: 'var(--space-3)'
          }}>
            Comparta Este Estudio
          </h3>
          <p style={{
            color: 'var(--gray-500)',
            fontSize: 'var(--text-base)',
            marginBottom: 'var(--space-4)'
          }}>
            ¿Conoce a alguien que pueda beneficiarse? Comparta esta información para prevenir infartos en sus seres queridos.
          </p>
          
          {/* Share Buttons Grid */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'var(--space-2)'
          }}>
            {/* SMS/Text Message */}
            <a
              href={`sms:?body=${encodeURIComponent('Hay un estudio de investigación de salud cardíaca para personas con Lp(a) elevado. Se proporciona compensación y reembolso de viaje. Si esto podría ayudarte a ti o a alguien que conoces, échale un vistazo:\n\n' + (pageUrl || ''))}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-1)',
                padding: '10px 16px',
                background: '#f1f5f9',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                color: '#475569',
                textDecoration: 'none',
                fontSize: 'var(--text-sm)',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e2e8f0';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f1f5f9';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
              </svg>
              Texto
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/?text=${encodeURIComponent('Estudio de investigación de salud cardíaca para personas con Lp(a) elevado. Se proporciona compensación. Aprende más:\n\n' + (pageUrl || ''))}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-1)',
                padding: '10px 16px',
                background: '#dcfce7',
                border: '1px solid #86efac',
                borderRadius: '8px',
                color: '#15803d',
                textDecoration: 'none',
                fontSize: 'var(--text-sm)',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#bbf7d0';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#dcfce7';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.64 15.64c-1.39 1.39-3.23 2.14-5.14 2.14s-3.75-.75-5.14-2.14S5.22 14.41 5.22 12.5s.75-3.75 2.14-5.14S10.59 5.22 12.5 5.22s3.75.75 5.14 2.14 2.14 3.23 2.14 5.14-.75 3.75-2.14 5.14z"/>
              </svg>
              WhatsApp
            </a>

            {/* Facebook Messenger */}
            <a
              href={`https://m.me/?link=${encodeURIComponent(pageUrl || '')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-1)',
                padding: '10px 16px',
                background: '#dbeafe',
                border: '1px solid #93c5fd',
                borderRadius: '8px',
                color: '#1e40af',
                textDecoration: 'none',
                fontSize: 'var(--text-sm)',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#bfdbfe';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#dbeafe';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.95 3.61 9.05 8.33 9.84V14.7h-2.5v-2.7h2.5v-2.06c0-2.47 1.47-3.84 3.72-3.84 1.08 0 2.21.19 2.21.19v2.43h-1.24c-1.23 0-1.61.76-1.61 1.54V12h2.74l-.44 2.7h-2.3v7.14C18.39 21.05 22 16.95 22 12c0-5.52-4.48-10-10-10z"/>
              </svg>
              Messenger
            </a>

            {/* Copy Message */}
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  const message = `Estudio de investigación de salud cardíaca para personas con Lp(a) elevado. Se proporciona compensación. Aprende más: ${typeof window !== 'undefined' ? window.location.href : ''}`;
                  navigator.clipboard.writeText(message);
                  alert('¡Mensaje copiado al portapapeles! Ahora puedes pegarlo en cualquier aplicación.');
                }
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-1)',
                padding: '10px 16px',
                background: '#f1f5f9',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                color: '#475569',
                fontSize: 'var(--text-sm)',
                fontWeight: '500',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e2e8f0';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f1f5f9';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
              </svg>
              Copiar
            </button>
          </div>
        </div>
        
        <div style={{
          textAlign: 'center',
          marginTop: 'var(--space-8)'
        }}>
          <button 
            onClick={scrollToHeroForm}
            className="btn-primary" style={{
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
            <FontAwesomeIcon icon={faClipboardCheck} style={{ width: '20px', height: '20px' }} />
            <span>Programe Su Cita Hoy!</span>
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .info-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(20, 184, 166, 0.15);
          border-color: #14b8a6;
        }
        
        .btn-primary:hover {
          background: #991b1b;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(220, 38, 38, 0.3);
        }
        
        @media (max-width: 768px) {
          .info-cards {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

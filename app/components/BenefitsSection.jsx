'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { scrollToHeroForm } from '../utils/scrollToForm';

export default function BenefitsSection() {
  return (
    <section id="benefits" className="benefits-section" style={{
      background: 'linear-gradient(180deg, rgba(249, 115, 22, 0.03) 0%, rgba(255, 255, 255, 1) 50%, rgba(249, 115, 22, 0.03) 100%)',
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
          }}>Everything We Provide</h2>
          <div className="underline" style={{
            width: '80px',
            height: '4px',
            background: 'linear-gradient(90deg, #14b8a6 0%, #5eead4 100%)',
            margin: '0 auto var(--space-6)',
            borderRadius: '2px'
          }}></div>
          <p style={{
            fontSize: 'var(--text-xl)',
            color: 'var(--gray-500)',
            maxWidth: '768px',
            margin: '0 auto',
            fontFamily: 'var(--font-primary)'
          }}>
            No insurance required. All study care, monitoring, and lp(a) testing provided free. Compensation and travel support included.
          </p>
        </div>
        
        <div className="benefits-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--space-6)',
          marginTop: 'var(--space-12)'
        }}>
          <div className="benefit-card" style={{
            display: 'flex',
            alignItems: 'start',
            gap: 'var(--space-4)',
            padding: 'var(--space-6)',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease'
          }}>
            <div className="icon-circle" style={{
              flexShrink: 0,
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #dc2626 0%, #f97316 100%)',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
              }}>
              <svg style={{
                width: '24px',
                height: '24px',
                color: 'white'
                  }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="content">
              <h3 style={{
                fontSize: 'var(--text-xl)',
                color: 'var(--gray-900)',
                marginBottom: 'var(--space-2)',
                fontWeight: '600',
                lineHeight: '1.3'
              }}>Compensation for Your Time</h3>
              <p style={{
                color: 'var(--gray-600)',
                lineHeight: '1.5',
                fontSize: 'var(--text-sm)'
              }}>
                You'll receive $100 for each completed study visit. Payments are provided for your time and commitment, whether you receive the study medication or placebo.
              </p>
            </div>
          </div>
          
          <div className="benefit-card" style={{
            display: 'flex',
            alignItems: 'start',
            gap: 'var(--space-4)',
            padding: 'var(--space-6)',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease'
          }}>
            <div className="icon-circle" style={{
              flexShrink: 0,
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #dc2626 0%, #f97316 100%)',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
              }}>
              <svg style={{
                width: '24px',
                height: '24px',
                color: 'white'
                  }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="content">
              <h3 style={{
                fontSize: 'var(--text-xl)',
                color: 'var(--gray-900)',
                marginBottom: 'var(--space-2)',
                fontWeight: '600',
                lineHeight: '1.3'
              }}>Travel Expenses Reimbursed</h3>
              <p style={{
                color: 'var(--gray-600)',
                lineHeight: '1.5',
                fontSize: 'var(--text-sm)'
              }}>
                Reasonable travel costs including mileage, parking, and other out-of-pocket expenses are reimbursed when you submit receipts to the study staff.
              </p>
            </div>
          </div>
          
          <div className="benefit-card" style={{
            display: 'flex',
            alignItems: 'start',
            gap: 'var(--space-4)',
            padding: 'var(--space-6)',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease'
          }}>
            <div className="icon-circle" style={{
              flexShrink: 0,
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #dc2626 0%, #f97316 100%)',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
              }}>
              <svg style={{
                width: '24px',
                height: '24px',
                color: 'white'
                  }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="content">
              <h3 style={{
                fontSize: 'var(--text-xl)',
                color: 'var(--gray-900)',
                marginBottom: 'var(--space-2)',
                fontWeight: '600',
                lineHeight: '1.3'
              }}>No Insurance Required</h3>
              <p style={{
                color: 'var(--gray-600)',
                lineHeight: '1.5',
                fontSize: 'var(--text-sm)'
              }}>
                All study-related care is provided at no cost. Study medication (or placebo), lp(a) testing, blood work, ECGs, physical exams, and monitoring — all free. No insurance needed, no charges for any study visits or procedures.
              </p>
            </div>
          </div>
          
          <div className="benefit-card" style={{
            display: 'flex',
            alignItems: 'start',
            gap: 'var(--space-4)',
            padding: 'var(--space-6)',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease'
          }}>
            <div className="icon-circle" style={{
              flexShrink: 0,
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #dc2626 0%, #f97316 100%)',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
              }}>
              <svg style={{
                width: '24px',
                height: '24px',
                color: 'white'
                  }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="content">
              <h3 style={{
                fontSize: 'var(--text-xl)',
                color: 'var(--gray-900)',
                marginBottom: 'var(--space-2)',
                fontWeight: '600',
                lineHeight: '1.3'
              }}>Expert Team</h3>
              <p style={{
                color: 'var(--gray-600)',
                lineHeight: '1.5',
                fontSize: 'var(--text-sm)'
              }}>
                Experienced research team providing careful monitoring and safety assessments throughout screening, treatment, and follow‑up periods.
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA button */}
        <div className="cta-wrapper" style={{
          textAlign: 'center',
          marginTop: 'var(--space-12)'
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
            <FontAwesomeIcon icon={faUserCheck} style={{ width: '20px', height: '20px' }} />
            Get your lp(a) Tested
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .benefit-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.15);
        }
        
        .benefit-card:hover .icon-circle {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(220, 38, 38, 0.4);
        }
        
        .btn-primary:hover {
          background: var(--primary-dark);
          box-shadow: var(--shadow-lg);
        }
        
        @media (max-width: 640px) {
          .benefits-grid {
            grid-template-columns: 1fr !important;
            gap: var(--space-4) !important;
          }
          
          .benefit-card {
            padding: var(--space-5) !important;
          }
          
          .icon-circle {
            width: 40px !important;
            height: 40px !important;
          }
          
          .icon-circle svg {
            width: 20px !important;
            height: 20px !important;
          }
        }
      `}</style>
    </section>
  );
} 
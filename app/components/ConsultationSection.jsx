'use client';

import Image from "next/image";
import { scrollToHeroForm } from '../utils/scrollToForm';

export default function ConsultationSection() {
  return (
    <section id="schedule" className="consultation-section" style={{
      background: 'linear-gradient(135deg, #991b1b 0%, #dc2626 50%, #991b1b 100%)',
      padding: 'var(--space-20) 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decorative elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none'
      }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          borderRadius: '50%'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '15%',
          left: '8%',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
          borderRadius: '50%'
        }}></div>
      </div>
      
      <div className="container" style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 var(--space-6)',
        position: 'relative'
      }}>
        <div className="consultation-content" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-8)',
          alignItems: 'stretch',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div className="info-panel" style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '1.5rem',
              padding: 'var(--space-8)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: 'var(--shadow-xl)'
            }}
          >
            <div className="image-container" style={{
              marginBottom: 'var(--space-6)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, #dc2626, #f97316)',
                transform: 'rotate(3deg)',
                borderRadius: '1rem'
              }}></div>
              <img 
                src="/treatment.png"
                alt="Doctor and patient discussing treatment options"
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '250px',
                  borderRadius: '1rem',
                  objectFit: 'cover'
                }}
              />
            </div>
            
            <h3 style={{
              fontSize: 'var(--text-2xl)',
              fontFamily: 'var(--font-heading)',
              fontWeight: '700',
              marginBottom: 'var(--space-4)',
              color: 'var(--gray-900)'
            }}>Why Schedule Today?</h3>
            
            <div className="benefits-list" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-3)'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  padding: 'var(--space-2)',
                  borderRadius: '50%',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg style={{ width: '20px', height: '20px' }} fill="white" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p style={{
                    fontWeight: '600',
                    color: 'var(--gray-900)',
                    fontSize: 'var(--text-base)',
                    fontFamily: 'var(--font-heading)'
                  }}>Limited Spots Available</p>
                  <p style={{
                    color: 'var(--gray-600)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'var(--font-primary)'
                  }}>We can only accept a limited number of participants for this groundbreaking investigational study. Early screening recommended.</p>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-3)'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  padding: 'var(--space-2)',
                  borderRadius: '50%',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg style={{ width: '20px', height: '20px' }} fill="white" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p style={{
                    fontWeight: '600',
                    color: 'var(--gray-900)',
                    fontSize: 'var(--text-base)',
                    fontFamily: 'var(--font-heading)'
                  }}>No-Cost Evaluation</p>
                  <p style={{
                    color: 'var(--gray-600)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'var(--font-primary)'
                  }}>Your consultation, lp(a) testing, and all study-related care are provided at no cost. No insurance required for qualified participants.</p>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-3)'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  padding: 'var(--space-2)',
                  borderRadius: '50%',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg style={{ width: '20px', height: '20px' }} fill="white" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p style={{
                    fontWeight: '600',
                    color: 'var(--gray-900)',
                    fontSize: 'var(--text-base)',
                    fontFamily: 'var(--font-heading)'
                  }}>No Obligation</p>
                  <p style={{
                    color: 'var(--gray-600)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'var(--font-primary)'
                  }}>The consultation is informational only - you decide if this investigational study is right for you.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="form-panel" style={{
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(10px)',
              borderRadius: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: 'var(--shadow-xl)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Header accent */}
            <div style={{
              background: 'linear-gradient(135deg, #dc2626, #f97316)',
              height: '8px',
              width: '100%'
            }}></div>
            
            <div style={{ padding: 'var(--space-6)' }}>
              {/* Decorative elements */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '160px',
                height: '160px',
                background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%)',
                borderRadius: '0 0 0 100%',
                zIndex: 0
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '160px',
                height: '160px',
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
                borderRadius: '0 100% 0 0',
                zIndex: 0
              }}></div>
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{
                  fontSize: 'var(--text-2xl)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: '700',
                  marginBottom: 'var(--space-2)',
                  textAlign: 'center',
                  color: 'var(--gray-900)'
                }}>Get your lp(a) Tested</h3>
                <p style={{
                  textAlign: 'center',
                  color: 'var(--gray-600)',
                  marginBottom: 'var(--space-6)',
                  fontFamily: 'var(--font-primary)'
                }}>Complete this quick form to see if you may qualify</p>
              </div>
              
              <div style={{ width: '100%', position: 'relative', zIndex: 1 }}>
                <div className="text-center">
                  <p className="text-gray-600 mb-6">Ready to learn more about this study?</p>
                  <button
                    onClick={scrollToHeroForm}
                    className="inline-block bg-white hover:bg-gray-50 text-navy-900 font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-navy-900"
                  >
                    Get your lp(a) Tested
                  </button>
                </div>
              </div>
              
              <div style={{
                marginTop: 'var(--space-6)',
                textAlign: 'center',
                position: 'relative',
                zIndex: 1
              }}>
                <p style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--gray-500)',
                  fontStyle: 'italic',
                  fontFamily: 'var(--font-primary)'
                }}>Your information is secure and will never be shared with third parties</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @media (max-width: 768px) {
          .consultation-content {
            grid-template-columns: 1fr !important;
            gap: var(--space-6) !important;
          }
        }
      `}</style>
    </section>
  );
} 
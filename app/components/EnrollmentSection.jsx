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
          }}>What to Expect</h2>
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
            From screening to follow‑up, we'll support you every step. Travel expenses reimbursed.
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
              }}>Screening Period (Up to 2 Months)</h3>
              <p style={{
                color: 'var(--gray-600)',
                lineHeight: '1.6'
              }}>
                We'll review your medical history, measure your Lp(a) levels, and perform health assessments including blood work, ECG, and vital signs to ensure the study is safe for you. About 2 screening visits.
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
              }}>Treatment Period (3.5 to 5 Years)</h3>
              <p style={{
                color: 'var(--gray-600)',
                lineHeight: '1.6'
              }}>
                You'll receive study medication or placebo as an injection under the skin about every 3 months (every 12 weeks). Regular visits include health monitoring, blood tests, ECGs, and safety checks. Compensation provided for each visit.
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
              }}>Safety Follow‑up (About 30 Days)</h3>
              <p style={{
                color: 'var(--gray-600)',
                lineHeight: '1.6'
              }}>
                About 30 days after your last study drug injection, we'll check in with you to make sure you're doing well. This may be a visit or phone call depending on timing.
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
              }}>Total Study Duration</h3>
              <p style={{
                color: 'var(--gray-600)',
                lineHeight: '1.6'
              }}>
                You are expected to be in the study for approximately 3.5 to 5.5 years total, based on when you start. You can choose to stop at any time without penalty. Visits are scheduled around your availability.
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
'use client';

import { FaShieldAlt, FaMicroscope, FaDna } from 'react-icons/fa';
import { FaAtom, FaVirus, FaBullseye } from 'react-icons/fa';

const MechanismOfAction = () => {
  const steps = [
    {
      icon: <FaDna className="w-12 h-12" />,
      title: "Targets Lp(a) at Its Source",
      description: "Olpasiran is a small interfering RNA (siRNA) that works by blocking the production of Lp(a) in your liver."
    },
    {
      icon: <FaBullseye className="w-12 h-12" />,
      title: "Preventing First Major Heart Events",
      description: "The study aims to see if lowering Lp(a) can help prevent heart attacks, urgent heart procedures, or death from heart disease."
    },
    {
      icon: <FaShieldAlt className="w-12 h-12" />,
      title: "Close Monitoring & Safety",
      description: "You'll receive regular health monitoring, blood tests, heart checks (ECGs), and safety assessments throughout the study."
    },
    {
      icon: <FaAtom className="w-12 h-12" />,
      title: "Simple Treatment Schedule",
      description: "The study drug is given as an injection under the skin about every 3 months (every 12 weeks)."
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
            How Olpasiran Works
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
            An investigational approach to lowering Lp(a) and reducing cardiovascular risk
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
              Olpasiran (AMG 890) is an investigational medication using RNA interference technology to block Lp(a) production in your liver. Since Lp(a) is genetic and <strong>not affected by diet or exercise</strong>, this targeted approach may help reduce cardiovascular risk for people with elevated Lp(a). High Lp(a) can't be controlled with lifestyle changes or standard cholesterol medications, and there are currently <strong>no approved Lp(a) treatments</strong> on the market. <em>Olpasiran is not yet FDA-approved.</em>
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
'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0); // Start with first FAQ open

  const faqs = [
    {
      question: "What is lipoprotein(a) [lp(a)]?",
      answer: "20% of the world's population has elevated lp(a), a very sticky protein (cholesterol) in your blood that is affected by genetics instead of lifestyle. Unlike other cholesterol, you cannot control it with diet or exercise. A lipoprotein(a) test can help determine your lp(a) levels, however, it is typically not covered by insurance and not included in standard cholesterol tests."
    },
    {
      question: "Are there any treatments for high lp(a)?",
      answer: "Currently, there are no approved lp(a) treatments on the market. This is why this research study is so important—participants have the opportunity to access investigational treatments that may help lower lp(a) and reduce cardiovascular risk."
    },
    {
      question: "Why would I join a study instead of just seeing my regular doctor?",
      answer: "Participating gives you access to a potential new treatment not yet available to the public, close monitoring by cardiovascular research specialists, and the opportunity to contribute to critical research that could help future generations. You can continue seeing your regular doctor for non-study care."
    },
    {
      question: "What are the risks?",
      answer: "As with any investigational treatment, there may be risks including injection site reactions, allergic reactions, and other side effects. The most common side effects seen with olpasiran have been injection site reactions like redness, pain, or swelling. All known risks will be discussed with you in detail before you decide to participate."
    },
    {
      question: "What if I get placebo?",
      answer: "The study is designed to compare the investigational medication to placebo to assess its effectiveness. You have an equal chance of receiving either olpasiran or placebo. Regardless of which you receive, your health will be closely monitored throughout the study, and you'll receive compensation for your time."
    },
    {
      question: "Will this cost me anything? Do I need insurance?",
      answer: "No cost to you, and no insurance is required. All study-related care, lp(a) testing, lab work, ECGs, and procedures are provided free of charge. You'll receive $100 compensation per completed visit, and reasonable travel expenses will be reimbursed when you submit receipts."
    },
    {
      question: "Can I leave the study later if I change my mind?",
      answer: "Yes, participation is completely voluntary. You can withdraw from the study at any time without any penalty or loss of benefits. Your regular medical care will not be affected by your decision."
    },
    {
      question: "Will I still see my regular doctor?",
      answer: "Yes, you should continue to see your regular doctor for non-study-related care. The study team will inform your personal doctor that you are participating in this study if you give permission."
    },
    {
      question: "Who sees my information?",
      answer: "Your privacy is important. Only authorized study personnel, the sponsor (Amgen), regulatory agencies like the FDA, and ethics review boards will have access to your information. Your information will be kept confidential as allowed by law."
    },
    {
      question: "How long does the study last?",
      answer: "You are expected to be in the study for approximately 3.5 to 5.5 years total, including screening (up to 2 months), treatment (3.5-5 years with injections every 12 weeks), and a safety follow-up about 30 days after your last injection."
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
            Frequently Asked Questions
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
            Find answers to common questions about our clinical research study.
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
            Have more questions about the study?
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
            <span>Get your lp(a) Tested</span>
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
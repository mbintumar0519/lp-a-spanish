'use client';

import { useState, useEffect } from 'react';

const questions = [
  {
    id: 'high_lpa',
    question: (
      <>
        ¿Le han dicho que tiene <span className="key-term">lipoproteína(a) elevada</span> o niveles altos de <strong>Lp(a)</strong>?
      </>
    ),
    icon: '🫀',
    guidanceMessage: 'Este estudio es para personas con niveles elevados de Lp(a).'
  },
  {
    id: 'age_50_plus',
    question: (
      <>
        ¿Tiene más de <span className="key-term">50</span> años?
      </>
    ),
    icon: '📅',
    guidanceMessage: 'Este estudio busca participantes de 50 años o más.'
  },
  {
    id: 'heart_risk_factors',
    question: (
      <>
        ¿Está tomando un <span className="key-term">medicamento para bajar lípidos</span>?
      </>
    ),
    icon: '💓',
    subtext: <em>Tales como estatinas, ezetimibe, inhibidores PCSK9 u otros medicamentos para bajar el colesterol.</em>,
    guidanceMessage: 'Este estudio busca personas con Lp(a) elevado y factores de riesgo cardiovascular.'
  },
  {
    id: 'can_travel',
    question: (
      <>
        ¿Puede viajar a <span className="key-term">Plant City, FL</span> para visitas regulares del estudio?
      </>
    ),
    icon: '🚗',
    subtext: <em>Los gastos de viaje serán reembolsados.</em>,
    guidanceMessage: 'Los gastos de viaje son reembolsados. Si viajar es difícil, déjenos saber — nuestro equipo puede ayudar.'
  }
];

const formatName = (name) => {
  return name
    .trim()
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function PreScreeningForm() {
  const [answers, setAnswers] = useState({});
  const [contactInfo, setContactInfo] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // CRIO Impression Tracking
  useEffect(() => {
    try {
      fetch('https://app.clinicalresearch.io/web-form-impression?id=14681', {
        method: 'GET',
        mode: 'no-cors', // CRIO returns an image/pixel, usually safe to fire-and-forget
      }).catch(err => console.warn('CRIO impression error:', err));
    } catch (e) {
      console.warn('CRIO impression error:', e);
    }
  }, []);

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!contactInfo.name?.trim()) {
      errors.name = 'El nombre completo es requerido';
    } else if (contactInfo.name.trim().length < 2) {
      errors.name = 'El nombre debe tener al menos 2 caracteres';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/.test(contactInfo.name.trim())) {
      errors.name = 'El nombre solo puede contener letras, espacios, guiones y apóstrofes';
    }

    // Phone validation
    if (!contactInfo.phone?.trim()) {
      errors.phone = 'El número de teléfono es requerido';
    } else if (!/^[\d\s()+-]+$/.test(contactInfo.phone.trim()) || contactInfo.phone.replace(/[^\d]/g, '').length < 10) {
      errors.phone = 'Por favor ingrese un número de teléfono válido con al menos 10 dígitos';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contactInfo.email?.trim()) {
      errors.email = 'La dirección de correo electrónico es requerida';
    } else if (!emailRegex.test(contactInfo.email.trim())) {
      errors.email = 'Por favor ingrese una dirección de correo electrónico válida';
    }

    // Age removed

    return errors;
  };

  // Non-conditional form - all submissions accepted
  const qualificationStatus = {
    qualified: true,
    isDisqualified: false
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    setIsSubmitting(true);

    // Format name properly
    const formattedName = formatName(contactInfo.name);
    const [firstName, ...lastNameParts] = formattedName.split(' ');
    const lastName = lastNameParts.join(' ');

    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formattedName,
          phone: contactInfo.phone,
          email: contactInfo.email,
          source: 'pre-screening-form',
          qualificationStatus: 'pending',
          answers: answers,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el formulario');
      }

      // Generate booking link
      let bookingLink = null;
      try {
        const bookingResponse = await fetch('/api/gohighlevel/generate-booking-link', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: firstName || '',
            lastName: lastName || '',
            email: contactInfo.email,
            phone: contactInfo.phone,
          }),
        });

        if (bookingResponse.ok) {
          const bookingData = await bookingResponse.json();
          if (bookingData.success && bookingData.bookingLink) {
            bookingLink = bookingData.bookingLink;
          }
        }
      } catch (bookingError) {
        console.warn('Failed to generate booking link:', bookingError);
        // Continue even if booking link generation fails
      }

      // Store user data in sessionStorage for Facebook Lead tracking on thank-you page
      sessionStorage.setItem('leadData', JSON.stringify({
        email: contactInfo.email,
        phone: contactInfo.phone,
        firstName: firstName || '',
        lastName: lastName || '',
        city: data.locationData?.city || '',
        state: data.locationData?.state || '',
        zipCode: data.locationData?.postalCode || data.locationData?.zipCode || '',
        bookingLink: bookingLink
      }));

      // Redirect to thank you page
      window.location.href = '/thank-you';

    } catch (err) {
      console.error('Submission error:', err);
      setValidationErrors({ submit: 'Algo salió mal. Por favor intente de nuevo.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="qualification-questionnaire bg-white rounded-2xl shadow-xl max-w-[600px] mx-auto animate-in slide-in-from-bottom-4 duration-500 px-4 py-6 sm:px-8 sm:py-8"
      style={{
        border: '2px solid transparent',
        backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #dc2626 0%, #f97316 100%)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box'
      }}
    >
      {/* Gradient Top Accent */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl"
        style={{ background: 'linear-gradient(135deg, #dc2626 0%, #f97316 100%)' }}
      />

      {/* Header */}
      <div className="text-center mb-8 sm:mb-10 animate-in fade-in duration-300 delay-100">
        <h2
          className="font-bold mb-3 text-gray-900 text-2xl sm:text-3xl"
          style={{ fontWeight: '700', lineHeight: '1.2', letterSpacing: '-0.02em' }}
        >
          Hágase la Prueba de Lp(a)
        </h2>

        <p className="text-gray-600 leading-relaxed max-w-lg mx-auto text-sm sm:text-base" style={{ lineHeight: '1.6' }}>
          Complete este breve formulario para ver si puede calificar para la prueba gratuita de Lp(a) y el estudio de investigación.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Questions Section */}
        <div className="mb-12 sm:mb-20">
          <div className="mb-4 sm:mb-6 animate-in slide-in-from-left duration-300 delay-200">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full text-sm font-medium" style={{
                background: 'linear-gradient(135deg, #dc2626, #f97316)',
                color: 'white'
              }}>
                1
              </div>
              <h3 className="font-medium text-gray-800 text-base sm:text-lg" style={{ fontWeight: '500', letterSpacing: '-0.005em' }}>
                Preguntas rápidas
              </h3>
            </div>
            <div className="h-px bg-gradient-to-r from-red-200 via-orange-200 to-transparent ml-9"></div>
          </div>

          <div className="space-y-6 sm:space-y-10">
            {questions.map((question, index) => (
              <div
                key={question.id}
                className="animate-in slide-in-from-right duration-300"
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                <div className="bg-gradient-to-br from-red-50/30 via-orange-50/30 to-red-50/30 rounded-xl p-4 sm:p-6 border border-red-200/30 shadow-sm">
                  <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5">
                    <span className="text-2xl sm:text-3xl flex-shrink-0" style={{ lineHeight: '1' }}>{question.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-gray-900 font-semibold mb-2 sm:mb-3 text-lg sm:text-xl" style={{ fontWeight: '600', lineHeight: '1.4', letterSpacing: '-0.01em' }}>
                        {question.question}
                      </h4>
                      {question.subtext && (
                        <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">{question.subtext}</p>
                      )}
                    </div>
                  </div>

                  {/* Yes/No Radio Buttons */}
                  <div className="flex gap-3 sm:gap-4">
                    <label className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        name={question.id}
                        value="Yes"
                        checked={answers[question.id] === 'Yes'}
                        onChange={() => handleAnswer(question.id, 'Yes')}
                        className="sr-only"
                      />
                      <div
                        className={`w-full text-center rounded-xl font-semibold transition-all duration-300 active:scale-95 sm:hover:scale-105 relative overflow-hidden ${answers[question.id] === 'Yes'
                            ? 'text-white shadow-lg border'
                            : 'bg-gradient-to-br from-red-50/40 via-orange-50/40 to-red-50/40 text-gray-700 sm:hover:from-red-100/50 sm:hover:via-orange-100/50 sm:hover:to-red-100/50 sm:hover:shadow-md border border-red-200/50 sm:hover:border-red-300/60'
                          }`}
                        style={{
                          height: '52px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '17px',
                          background: answers[question.id] === 'Yes' ? 'linear-gradient(135deg, #dc2626, #f97316)' : undefined,
                          borderColor: answers[question.id] === 'Yes' ? 'rgba(220, 38, 38, 0.3)' : undefined,
                          boxShadow: answers[question.id] === 'Yes' ? '0 8px 20px rgba(220, 38, 38, 0.25)' : undefined
                        }}
                      >
                        Sí
                      </div>
                    </label>
                    <label className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        name={question.id}
                        value="No"
                        checked={answers[question.id] === 'No'}
                        onChange={() => handleAnswer(question.id, 'No')}
                        className="sr-only"
                      />
                      <div
                        className={`w-full text-center rounded-xl font-semibold transition-all duration-300 active:scale-95 sm:hover:scale-105 relative overflow-hidden ${answers[question.id] === 'No'
                            ? 'text-white shadow-lg border'
                            : 'bg-gradient-to-br from-red-50/40 via-orange-50/40 to-red-50/40 text-gray-700 sm:hover:from-red-100/50 sm:hover:via-orange-100/50 sm:hover:to-red-100/50 sm:hover:shadow-md border border-red-200/50 sm:hover:border-red-300/60'
                          }`}
                        style={{
                          height: '52px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '17px',
                          background: answers[question.id] === 'No' ? 'linear-gradient(135deg, #dc2626, #f97316)' : undefined,
                          borderColor: answers[question.id] === 'No' ? 'rgba(220, 38, 38, 0.3)' : undefined,
                          boxShadow: answers[question.id] === 'No' ? '0 8px 20px rgba(220, 38, 38, 0.25)' : undefined
                        }}
                      >
                        No
                      </div>
                    </label>
                  </div>

                  {/* Inline Guidance */}
                  {answers[question.id] === 'No' && (
                    <div
                      className="mt-3 sm:mt-4 rounded-xl animate-in slide-in-from-top-2 duration-200 p-3 sm:p-4"
                      style={{
                        background: 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)',
                        border: '1px solid #FCA5A5'
                      }}
                    >
                      <p className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base" style={{ lineHeight: '1.5', color: '#991b1b' }}>
                        <span className="text-base sm:text-lg flex-shrink-0">
                          {question.id === 'can_travel' ? '🚐' : 'ℹ️'}
                        </span>
                        <span>{question.guidanceMessage}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="animate-in slide-in-from-bottom duration-300 delay-500">
          <div className="mb-4 sm:mb-6 animate-in slide-in-from-left duration-300 delay-200">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full text-sm font-medium" style={{
                background: 'linear-gradient(135deg, #dc2626, #f97316)',
                color: 'white'
              }}>
                2
              </div>
              <h3 className="font-medium text-gray-800 text-base sm:text-lg" style={{ fontWeight: '500', letterSpacing: '-0.005em' }}>
                Su información de contacto
              </h3>
            </div>
            <div className="h-px bg-gradient-to-r from-red-200 via-orange-200 to-transparent ml-9"></div>
          </div>

          <div className="bg-gradient-to-br from-red-50/20 via-orange-50/20 to-red-50/20 rounded-xl p-4 sm:p-6 border border-red-200/30 shadow-sm">
            <div className="space-y-4 sm:space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="name" className="block text-gray-900 font-semibold mb-2" style={{ fontSize: '14px' }}>
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={contactInfo.name}
                  onChange={(e) => {
                    setContactInfo({ ...contactInfo, name: e.target.value });
                    if (validationErrors.name) {
                      setValidationErrors({ ...validationErrors, name: undefined });
                    }
                  }}
                  className={`w-full px-4 border rounded-xl transition-all duration-300 focus:scale-102 focus:shadow-lg input-field ${validationErrors.name
                      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-200 focus:border-red-400 focus:ring-4 focus:ring-red-500/15 hover:border-red-300/50'
                    }`}
                  style={{
                    height: '48px',
                    fontSize: '16px',
                    background: validationErrors.name ? '' : 'linear-gradient(135deg, #FEFEFE 0%, #FFFBFA 100%)',
                    boxShadow: validationErrors.name ? '' : '0 1px 3px rgba(220, 38, 38, 0.05), inset 0 1px 2px rgba(0, 0, 0, 0.02)'
                  }}
                  placeholder="Juan Pérez"
                />
                {validationErrors.name && (
                  <p className="text-red-600 mt-2 animate-in slide-in-from-top-2 duration-200" style={{ fontSize: '13px' }}>
                    {validationErrors.name}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <div className="flex-1">
                  <label htmlFor="phone" className="block text-gray-900 font-semibold mb-2" style={{ fontSize: '14px' }}>
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={contactInfo.phone}
                    onChange={(e) => {
                      setContactInfo({ ...contactInfo, phone: e.target.value });
                      if (validationErrors.phone) {
                        setValidationErrors({ ...validationErrors, phone: undefined });
                      }
                    }}
                    className={`w-full px-4 border rounded-xl transition-all duration-300 focus:scale-102 focus:shadow-lg input-field ${validationErrors.phone
                        ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-200 focus:border-red-400 focus:ring-4 focus:ring-red-500/15 hover:border-red-300/50'
                      }`}
                    style={{
                      height: '48px',
                      fontSize: '16px',
                      background: validationErrors.phone ? '' : 'linear-gradient(135deg, #FEFEFE 0%, #FFFBFA 100%)',
                      boxShadow: validationErrors.phone ? '' : '0 1px 3px rgba(220, 38, 38, 0.05), inset 0 1px 2px rgba(0, 0, 0, 0.02)'
                    }}
                    placeholder="+1(813) 796-6716"
                  />
                  {validationErrors.phone && (
                    <p className="text-red-600 mt-2 animate-in slide-in-from-top-2 duration-200" style={{ fontSize: '13px' }}>
                      {validationErrors.phone}
                    </p>
                  )}
                </div>
              </div>


              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-gray-900 font-semibold mb-2" style={{ fontSize: '14px' }}>
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={contactInfo.email}
                  onChange={(e) => {
                    setContactInfo({ ...contactInfo, email: e.target.value });
                    if (validationErrors.email) {
                      setValidationErrors({ ...validationErrors, email: undefined });
                    }
                  }}
                  className={`w-full px-4 border rounded-xl transition-all duration-300 focus:scale-102 focus:shadow-lg input-field ${validationErrors.email
                      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-200 focus:border-red-400 focus:ring-4 focus:ring-red-500/15 hover:border-red-300/50'
                    }`}
                  style={{
                    height: '48px',
                    fontSize: '16px',
                    background: validationErrors.email ? '' : 'linear-gradient(135deg, #FEFEFE 0%, #FFFBFA 100%)',
                    boxShadow: validationErrors.email ? '' : '0 1px 3px rgba(220, 38, 38, 0.05), inset 0 1px 2px rgba(0, 0, 0, 0.02)'
                  }}
                  placeholder="juan@ejemplo.com"
                />
                {validationErrors.email && (
                  <p className="text-red-600 mt-2 animate-in slide-in-from-top-2 duration-200" style={{ fontSize: '13px' }}>
                    {validationErrors.email}
                  </p>
                )}
              </div>



            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6 sm:pt-8 animate-in slide-in-from-bottom duration-300 delay-700">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-white font-bold rounded-xl transition-all duration-300 shadow-lg sm:hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 sm:hover:scale-105 sm:hover:translate-y-[-2px] relative overflow-hidden button-hover"
            style={{
              height: '54px',
              fontSize: '17px',
              fontWeight: '700',
              background: isSubmitting
                ? 'linear-gradient(135deg, #94A3B8 0%, #64748B 100%)'
                : 'linear-gradient(135deg, #dc2626 0%, #f97316 100%)',
              boxShadow: isSubmitting ? '' : '0 8px 25px rgba(220, 38, 38, 0.3), 0 4px 10px rgba(220, 38, 38, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Enviando...
              </div>
            ) : (
              'Hágase la Prueba de Lp(a)'
            )}
          </button>

          {validationErrors.submit && (
            <p className="text-red-600 text-center mt-3 sm:mt-4 animate-in slide-in-from-top-2 duration-200 text-sm">
              {validationErrors.submit}
            </p>
          )}

          <p className="text-gray-600 text-center mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed">
            🔒 Su información es segura y nunca será compartida con terceros
          </p>

        </div>

        {/* Booking Link Section */}
        <div className="mt-6 sm:mt-8 animate-in slide-in-from-bottom duration-300 delay-800">
          <div className="bg-gradient-to-br from-emerald-50/40 via-teal-50/40 to-emerald-50/40 rounded-xl p-4 sm:p-6 border border-emerald-200/50 shadow-sm">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl">📅</span>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800" style={{ fontWeight: '600' }}>
                  ¿Prefiere Agendar Directamente?
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-5">
                ¡Puede agendar su prueba de Lp(a) hoy! 
              </p>
              <a
                href={`https://api.leadconnectorhq.com/widget/booking/${process.env.NEXT_PUBLIC_GOHIGHLEVEL_CALENDAR_ID || 'oCJUF0iOMFKJBd4fpZS6'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 font-semibold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
                style={{ fontSize: '16px', color: 'white' }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Agendar Prueba de Lp(a)
              </a>
              <p className="text-xs text-gray-500 mt-3 sm:mt-4">
                O complete el formulario arriba para recibir un enlace de reserva personalizado
              </p>
            </div>
          </div>
        </div>
      </form>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes buttonPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .animate-in {
          animation-fill-mode: both;
        }

        .button-hover:hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          animation: shimmer 0.6s;
        }

        input:focus {
          outline: none;
        }

        .focus\\:scale-102:focus {
          transform: scale(1.02);
        }

        .input-field {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .input-field:focus {
          transform: translateY(-1px);
        }

        :global(.key-term) {
          color: #991b1b;
          font-weight: 700;
          background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%);
          padding: 2px 6px;
          border-radius: 4px;
          border: 1px solid #FCA5A5;
          display: inline-block;
          white-space: nowrap;
        }

        @media (max-width: 640px) {
          :global(.key-term) {
            padding: 1px 4px;
            border-radius: 3px;
          }
        }
      `}</style>
    </div>
  );
}

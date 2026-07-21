'use client';

import { useState, useEffect } from 'react';
import { getAttribution, deriveLeadSource, generateEventId, persistAttribution } from '../utils/attribution';

const questions = [
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
    id: 'can_travel',
    question: (
      <>
        ¿Puede viajar a <span className="key-term">Plant City, FL</span> para visitas regulares del estudio?
      </>
    ),
    icon: '🚗',
    subtext: <em>Se proporcionará transporte.</em>,
    guidanceMessage: 'Se proporcionará transporte. Si viajar es difícil, déjenos saber — nuestro equipo puede ayudar.'
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

const formatPhone = (raw) => {
  if (!raw) return '';
  if (raw.trim().startsWith('+')) return raw;
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 0) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
};

export default function PreScreeningForm({ layout = 'vertical' }) {
  const [answers, setAnswers] = useState({});
  const [contactInfo, setContactInfo] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    persistAttribution();

    try {
      fetch('https://app.clinicalresearch.io/web-form-impression?id=14681', {
        method: 'GET',
        mode: 'no-cors',
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

    if (!contactInfo.name?.trim()) {
      errors.name = 'El nombre completo es requerido';
    } else if (contactInfo.name.trim().length < 2) {
      errors.name = 'El nombre debe tener al menos 2 caracteres';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/.test(contactInfo.name.trim())) {
      errors.name = 'El nombre solo puede contener letras, espacios, guiones y apóstrofes';
    }

    if (!contactInfo.phone?.trim()) {
      errors.phone = 'El número de teléfono es requerido';
    } else if (!/^[\d\s()+-]+$/.test(contactInfo.phone.trim()) || contactInfo.phone.replace(/[^\d]/g, '').length < 10) {
      errors.phone = 'Por favor ingrese un número de teléfono válido con al menos 10 dígitos';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contactInfo.email?.trim()) {
      errors.email = 'La dirección de correo electrónico es requerida';
    } else if (!emailRegex.test(contactInfo.email.trim())) {
      errors.email = 'Por favor ingrese una dirección de correo electrónico válida';
    }

    return errors;
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

    const formattedName = formatName(contactInfo.name);
    const [firstName, ...lastNameParts] = formattedName.split(' ');
    const lastName = lastNameParts.join(' ');

    const attr = getAttribution();
    const eventId = generateEventId();
    const leadSource = deriveLeadSource(attr);

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
          event_id: eventId,
          lead_source: leadSource,
          gclid: attr.gclid || null,
          fbclid: attr.fbclid || null,
          msclkid: attr.msclkid || null,
          utm_source: attr.utm_source || null,
          utm_medium: attr.utm_medium || null,
          utm_campaign: attr.utm_campaign || null,
          utm_content: attr.utm_content || null,
          utm_term: attr.utm_term || null,
          page_url: typeof window !== 'undefined' ? window.location.href : null,
          referrer: typeof document !== 'undefined' ? document.referrer : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el formulario');
      }

      sessionStorage.setItem('leadData', JSON.stringify({
        email: contactInfo.email,
        phone: contactInfo.phone,
        firstName: firstName || '',
        lastName: lastName || '',
        city: data.locationData?.city || '',
        state: data.locationData?.state || '',
        zipCode: data.locationData?.postalCode || data.locationData?.zipCode || ''
      }));

      window.location.href = '/thank-you';

    } catch (err) {
      console.error('Submission error:', err);
      setValidationErrors({ submit: 'Algo salió mal. Por favor intente de nuevo.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="hero-form" className={`bg-white rounded-xl shadow-2xl mx-auto overflow-hidden border border-gray-200 ${layout === 'horizontal' ? 'max-w-[520px] lg:max-w-[880px]' : 'max-w-[520px]'}`}>
      <div className="h-1.5 bg-red-800" />

      <div className="px-6 pt-7 pb-6 sm:px-8 sm:pt-8 sm:pb-7 text-center">
        <h2 className="text-gray-900 text-xl sm:text-2xl font-bold tracking-tight">
          Evaluación Gratis de Riesgo de Infarto
        </h2>
        <p className="text-gray-500 text-sm mt-2 leading-relaxed">
          Complete este formulario para ver si puede calificar para el estudio.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="px-6 pb-7 sm:px-8 sm:pb-8">
        <div className={`${layout === 'horizontal' ? 'lg:grid lg:grid-cols-2 lg:gap-8' : ''}`}>
          <div className={`mb-8 ${layout === 'horizontal' ? 'lg:mb-0' : ''}`}>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold text-white bg-red-800">
                1
              </div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Preguntas Rápidas
              </h3>
            </div>
            <div className="h-px bg-gray-200 mb-5 ml-7" />

            <div className="space-y-5">
              {questions.map((question) => (
                <div key={question.id} className="bg-gray-50 rounded-lg p-4 sm:p-5 border border-gray-100">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-xl flex-shrink-0 mt-0.5">{question.icon}</span>
                    <div>
                      <h4 className="text-gray-800 font-medium text-[15px] leading-snug">
                        {question.question}
                      </h4>
                      {question.subtext && (
                        <p className="text-gray-500 text-sm mt-1">{question.subtext}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 mt-3">
                    <label className="flex-1 cursor-pointer group">
                      <input
                        type="radio"
                        name={question.id}
                        value="Yes"
                        checked={answers[question.id] === 'Yes'}
                        onChange={() => handleAnswer(question.id, 'Yes')}
                        className="sr-only"
                      />
                      <div
                        className="w-full h-11 flex items-center justify-center text-center rounded-lg font-semibold transition-all duration-200 border text-[15px] hover:bg-red-50 hover:border-red-300 hover:text-red-800"
                        style={{
                          background: answers[question.id] === 'Yes' ? '#991b1b' : undefined,
                          color: answers[question.id] === 'Yes' ? '#ffffff' : undefined,
                          borderColor: answers[question.id] === 'Yes' ? '#991b1b' : undefined
                        }}
                      >
                        Sí
                      </div>
                    </label>
                    <label className="flex-1 cursor-pointer group">
                      <input
                        type="radio"
                        name={question.id}
                        value="No"
                        checked={answers[question.id] === 'No'}
                        onChange={() => handleAnswer(question.id, 'No')}
                        className="sr-only"
                      />
                      <div
                        className="w-full h-11 flex items-center justify-center text-center rounded-lg font-semibold transition-all duration-200 border text-[15px] hover:bg-red-50 hover:border-red-300 hover:text-red-800"
                        style={{
                          background: answers[question.id] === 'No' ? '#991b1b' : undefined,
                          color: answers[question.id] === 'No' ? '#ffffff' : undefined,
                          borderColor: answers[question.id] === 'No' ? '#991b1b' : undefined
                        }}
                      >
                        No
                      </div>
                    </label>
                  </div>

                  {answers[question.id] === 'No' && (
                    <div className="mt-3 rounded-lg p-3 text-sm bg-red-50 border border-red-200 text-red-800">
                      <span className="font-medium">Nota:</span> {question.guidanceMessage}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={`mb-6 ${layout === 'horizontal' ? 'lg:mb-0' : ''}`}>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold text-white bg-red-800">
                2
              </div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Su Información de Contacto
              </h3>
            </div>
            <div className="h-px bg-gray-200 mb-5 ml-7" />

            <div className="bg-gray-50 rounded-lg p-4 sm:p-5 border border-gray-100 space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-1.5">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={contactInfo.name}
                  onChange={(e) => {
                    setContactInfo({ ...contactInfo, name: e.target.value });
                    if (validationErrors.name) setValidationErrors({ ...validationErrors, name: undefined });
                  }}
                  className={`w-full px-3.5 py-2.5 border rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:ring-offset-0 focus:border-red-500 hover:border-red-300 ${validationErrors.name
                      ? 'border-red-400 bg-red-50'
                      : 'border-gray-300 bg-white'
                    }`}
                  placeholder="Juan Pérez"
                />
                {validationErrors.name && (
                  <p className="text-red-600 text-xs mt-1.5">{validationErrors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-1.5">
                  Número de Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={contactInfo.phone}
                  onChange={(e) => {
                    setContactInfo({ ...contactInfo, phone: formatPhone(e.target.value) });
                    if (validationErrors.phone) setValidationErrors({ ...validationErrors, phone: undefined });
                  }}
                  className={`w-full px-3.5 py-2.5 border rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:ring-offset-0 focus:border-red-500 hover:border-red-300 ${validationErrors.phone
                      ? 'border-red-400 bg-red-50'
                      : 'border-gray-300 bg-white'
                    }`}
                  placeholder="(813) 796-6716"
                />
                {validationErrors.phone && (
                  <p className="text-red-600 text-xs mt-1.5">{validationErrors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1.5">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={contactInfo.email}
                  onChange={(e) => {
                    setContactInfo({ ...contactInfo, email: e.target.value });
                    if (validationErrors.email) setValidationErrors({ ...validationErrors, email: undefined });
                  }}
                  className={`w-full px-3.5 py-2.5 border rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:ring-offset-0 focus:border-red-500 hover:border-red-300 ${validationErrors.email
                      ? 'border-red-400 bg-red-50'
                      : 'border-gray-300 bg-white'
                    }`}
                  placeholder="juan@ejemplo.com"
                />
                {validationErrors.email && (
                  <p className="text-red-600 text-xs mt-1.5">{validationErrors.email}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full text-white font-bold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97] hover:shadow-lg hover:-translate-y-0.5 h-[56px] text-lg flex items-center justify-center gap-2 ${isSubmitting ? 'bg-gray-500' : 'bg-red-600 hover:bg-red-700'}`}
        >
          {isSubmitting ? (
            'Enviando...'
          ) : (
            'Enviar información'
          )}
        </button>

        {validationErrors.submit && (
          <p className="text-red-600 text-center mt-3 text-sm">{validationErrors.submit}</p>
        )}

        <p className="text-gray-600 text-center mt-4 text-xs">
          Su información es segura y nunca será compartida.
        </p>
      </form>
    </div>
  );
}

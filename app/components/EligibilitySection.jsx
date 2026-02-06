'use client';

export default function EligibilitySection() {
  return (
    <section id="eligibility" className="py-16" style={{ 
      background: 'linear-gradient(180deg, rgba(20, 184, 166, 0.03) 0%, rgba(255, 255, 255, 1) 50%, rgba(20, 184, 166, 0.03) 100%)' 
    }}>
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">¿Podría Este Estudio Ser Adecuado para Usted?</h2>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-3xl mx-auto">
          Si tiene Lp(a) elevado y factores de riesgo cardiovascular, puede calificar para este estudio.
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Puede Calificar Si:</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-800">
              <li>Es un adulto (de 50 años o más) </li>
              <li>Le han dicho que tiene <strong>niveles elevados de Lp(a)</strong></li>
              <li>Tiene <strong>factores de riesgo cardiovascular</strong> tales como:
                <ul className="list-circle pl-5 mt-1 space-y-1 text-gray-700">
                  <li>Presión arterial alta</li>
                  <li>Colesterol alto</li>
                  <li>Diabetes tipo 2</li>
                  <li>Historial familiar de enfermedades cardíacas</li>
                  <li>Fumador actual o pasado</li>
                </ul>
              </li>
              <li>Puede asistir a visitas regulares del estudio en Plant City, FL</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Puede No Calificar Si:</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-800">
              <li>Ha tenido un infarto o derrame cerebral previo</li>
              <li>Tiene problemas severos de riñón o hígado</li>
              <li>Está embarazada, amamantando o planea quedar embarazada</li>
              <li>Tiene un procedimiento importante o cirugía planeada pronto</li>
              <li>Tiene condiciones médicas no controladas</li>
              <li>Está tomando ciertos medicamentos que pueden interferir con el estudio</li>
            </ul>
            <p className="text-gray-700 mt-3">Una evaluación completa determinará si el estudio es seguro y adecuado para usted.</p>
          </div>
        </div>
      </div>
    </section>
  );
}



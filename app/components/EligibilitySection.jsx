'use client';

export default function EligibilitySection() {
  return (
    <section id="eligibility" className="py-16" style={{ 
      background: 'linear-gradient(180deg, rgba(20, 184, 166, 0.03) 0%, rgba(255, 255, 255, 1) 50%, rgba(20, 184, 166, 0.03) 100%)' 
    }}>
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Could This Study Be Right for You?</h2>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-3xl mx-auto">
          If you have elevated Lp(a) and cardiovascular risk factors, you may qualify for this  study.
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">You May Qualify If:</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-800">
              <li>You are an adult (18 years or older)</li>
              <li>You have been told you have <strong>high Lp(a) levels</strong></li>
              <li>You have <strong>cardiovascular risk factors</strong> such as:
                <ul className="list-circle pl-5 mt-1 space-y-1 text-gray-700">
                  <li>High blood pressure</li>
                  <li>High cholesterol</li>
                  <li>Type 2 diabetes</li>
                  <li>Family history of heart disease</li>
                  <li>Current or past smoking</li>
                </ul>
              </li>
              <li>You can attend regular study visits in Plant City, FL</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">You May Not Qualify If:</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-800">
              <li>You've had a previous heart attack or stroke</li>
              <li>You have severe kidney or liver problems</li>
              <li>You are pregnant, breastfeeding, or planning to become pregnant</li>
              <li>You have a major procedure or surgery planned soon</li>
              <li>You have uncontrolled medical conditions</li>
              <li>You are taking certain medications that may interfere with the study</li>
            </ul>
            <p className="text-gray-700 mt-3">A full evaluation will determine if the study is safe and right for you.</p>
          </div>
        </div>
      </div>
    </section>
  );
}



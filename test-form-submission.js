#!/usr/bin/env node
/**
 * End-to-End Form Submission Test
 * Simulates a real form submission from the landing page
 */

require('dotenv').config();

console.log('\n=== End-to-End Form Submission Test ===\n');

async function testFormSubmission() {
  try {
    // Simulate form data from PreScreenForm.jsx
    const formData = {
      name: 'Carlos Rodríguez',
      phone: '+1 (813) 555-1234',
      email: `test.lead.${Date.now()}@example.com`,
      source: 'pre-screening-form',
      qualificationStatus: 'pending',
      answers: {
        high_lpa: 'yes',
        heart_risk_factors: 'yes',
        can_travel: 'yes'
      }
    };

    console.log('📋 Simulating form submission with data:');
    console.log('   Name:', formData.name);
    console.log('   Phone:', formData.phone);
    console.log('   Email:', formData.email);
    console.log('   Source:', formData.source);
    console.log('   Answers:', JSON.stringify(formData.answers, null, 2));
    
    console.log('\n🚀 Sending request to /api/submit-lead...\n');

    // Note: This test requires the dev server to be running
    // Run `npm run dev` in another terminal first
    const response = await fetch('http://localhost:3000/api/submit-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API request failed: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const result = await response.json();

    console.log('✅ Form submission successful!\n');
    console.log('📊 Response from server:');
    console.log(JSON.stringify(result, null, 2));

    if (result.contactId) {
      console.log('\n🎉 Lead created in GoHighLevel!');
      console.log('   Contact ID:', result.contactId);
      console.log('   Tags Applied:', result.tagsApplied?.join(', ') || 'N/A');
      
      if (result.locationData) {
        console.log('   Location:', [
          result.locationData.city,
          result.locationData.state,
          result.locationData.postalCode
        ].filter(Boolean).join(', '));
      }
    }

    console.log('\n✅ End-to-End Test PASSED\n');
    console.log('💡 Check your GoHighLevel dashboard to see the lead:');
    console.log('   Email:', formData.email);
    console.log('   Name:', formData.name);

  } catch (error) {
    console.error('\n❌ TEST FAILED\n');
    
    if (error.message.includes('ECONNREFUSED')) {
      console.error('🔴 Cannot connect to development server.');
      console.error('   Please start the dev server first:');
      console.error('   Run: npm run dev');
      console.error('   Then run this test again.');
    } else {
      console.error('Error:', error.message);
    }
    
    process.exit(1);
  }
}

// Check if dev server is running
async function checkDevServer() {
  try {
    const response = await fetch('http://localhost:3000', {
      method: 'HEAD'
    });
    return response.ok || response.status === 404; // Either works, just need the server running
  } catch (e) {
    return false;
  }
}

// Main execution
(async () => {
  console.log('🔍 Checking if development server is running...');
  
  const serverRunning = await checkDevServer();
  
  if (!serverRunning) {
    console.log('\n⚠️  Development server is not running.');
    console.log('   Please start it first:');
    console.log('   npm run dev');
    console.log('\n   Then run this test again.');
    process.exit(1);
  }
  
  console.log('✅ Development server is running\n');
  
  await testFormSubmission();
})();

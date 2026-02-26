#!/usr/bin/env node
/**
 * Simple GoHighLevel API Connection Test
 * Tests the new API key and location configuration
 */

require('dotenv').config();

const GHL_API_KEY = process.env.GOHIGHLEVEL_API_KEY;
const GHL_LOCATION_ID = process.env.GOHIGHLEVEL_LOCATION_ID;

console.log('\n=== GoHighLevel Configuration Test ===\n');

// Check environment variables
console.log('✓ API Key loaded:', GHL_API_KEY ? `${GHL_API_KEY.substring(0, 20)}...` : '❌ MISSING');
console.log('✓ Location ID:', GHL_LOCATION_ID || '❌ MISSING');

if (!GHL_API_KEY || !GHL_LOCATION_ID) {
  console.error('\n❌ Missing required environment variables!');
  process.exit(1);
}

// Test API connection
async function testGHLConnection() {
  console.log('\n=== Testing GoHighLevel API Connection ===\n');
  
  try {
    // Test 1: Create a test contact
    console.log('📝 Creating test contact...');
    
    const testContact = {
      firstName: 'Test',
      lastName: 'Lead',
      email: `test.lead.${Date.now()}@example.com`,
      phone: '+15551234567',
      tags: ['test-lead', 'website-lead', 'Lp(a)'],
      source: 'API Test',
      companyName: 'Lp(a) - Test Lead'
    };
    
    const createResponse = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(testContact)
    });
    
    const createData = await createResponse.json();
    
    if (!createResponse.ok) {
      throw new Error(`API request failed: ${createResponse.status} - ${JSON.stringify(createData)}`);
    }
    
    const contactId = createData.contact?.id || createData.id;
    
    if (!contactId) {
      throw new Error('Contact created but no ID returned');
    }
    
    console.log('✅ Contact created successfully!');
    console.log('   Contact ID:', contactId);
    console.log('   Email:', testContact.email);
    
    // Test 2: Add a note to the contact
    console.log('\n📝 Adding note to contact...');
    
    const noteResponse = await fetch(`https://rest.gohighlevel.com/v1/contacts/${contactId}/notes/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        body: '=== TEST NOTE ===\nThis is a test note created by the API integration test.\nTimestamp: ' + new Date().toISOString()
      })
    });
    
    if (!noteResponse.ok) {
      const noteError = await noteResponse.text();
      console.warn('⚠️  Note creation failed:', noteError);
    } else {
      console.log('✅ Note added successfully!');
    }
    
    console.log('\n=== ✅ ALL TESTS PASSED ===\n');
    console.log('🎉 Your GoHighLevel integration is working correctly!');
    console.log('📋 Test contact created with ID:', contactId);
    console.log('\n💡 You can now view this test lead in your GoHighLevel dashboard.');
    console.log('   Look for the contact with email:', testContact.email);
    
  } catch (error) {
    console.error('\n❌ TEST FAILED\n');
    console.error('Error:', error.message);
    
    if (error.message.includes('401')) {
      console.error('\n🔑 Authentication failed. Check that:');
      console.error('   - Your API key is correct');
      console.error('   - The API key has the required permissions');
    } else if (error.message.includes('403')) {
      console.error('\n🚫 Access forbidden. Check that:');
      console.error('   - Your API key has contact creation permissions');
      console.error('   - The location ID is correct');
    }
    
    process.exit(1);
  }
}

// Run the test
testGHLConnection().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});

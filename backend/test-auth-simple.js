// Simple authentication test script
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000/api';

async function testAuth() {
  console.log('🧪 Testing Authentication System...\n');

  try {
    // Test 1: Register a new user
    console.log('1. Testing user registration...');
    const registerResponse = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      })
    });

    const registerData = await registerResponse.json();
    console.log('Registration Status:', registerResponse.status);
    console.log('Registration Response:', registerData);
    console.log('');

    // Test 2: Login with the same user
    console.log('2. Testing user login...');
    const loginResponse = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });

    const loginData = await loginResponse.json();
    console.log('Login Status:', loginResponse.status);
    console.log('Login Response:', loginData);
    console.log('');

    // Test 3: Test protected route
    console.log('3. Testing protected route...');
    const meResponse = await fetch(`${BASE_URL}/me`, {
      method: 'GET',
      headers: {
        'Cookie': loginResponse.headers.get('set-cookie') || ''
      }
    });

    const meData = await meResponse.json();
    console.log('Protected Route Status:', meResponse.status);
    console.log('Protected Route Response:', meData);
    console.log('');

    // Summary
    console.log('📊 Test Summary:');
    console.log(`✅ Registration: ${registerResponse.status === 201 ? 'PASS' : 'FAIL'}`);
    console.log(`✅ Login: ${loginResponse.status === 200 ? 'PASS' : 'FAIL'}`);
    console.log(`✅ Protected Route: ${meResponse.status === 200 ? 'PASS' : 'FAIL'}`);

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testAuth();

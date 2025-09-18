// Final authentication test
const testUser = {
  name: 'Final Test User',
  email: 'final@test.com',
  password: 'password123'
};

async function testAuth() {
  console.log('🧪 Final Authentication Test');
  console.log('=' .repeat(40));
  
  try {
    // Test Registration
    console.log('1. Testing Registration...');
    const registerResponse = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    });
    const registerData = await registerResponse.json();
    console.log(`   Status: ${registerResponse.status}`);
    console.log(`   Success: ${registerResponse.ok ? '✅' : '❌'}`);
    
    // Test Login
    console.log('\n2. Testing Login...');
    const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testUser.email,
        password: testUser.password
      })
    });
    const loginData = await loginResponse.json();
    console.log(`   Status: ${loginResponse.status}`);
    console.log(`   Success: ${loginResponse.ok ? '✅' : '❌'}`);
    
    // Get cookies for authenticated request
    const cookies = loginResponse.headers.get('set-cookie');
    
    // Test /api/me with authentication
    console.log('\n3. Testing /api/me (authenticated)...');
    const meResponse = await fetch('http://localhost:5000/api/me', {
      method: 'GET',
      headers: { 'Cookie': cookies }
    });
    const meData = await meResponse.json();
    console.log(`   Status: ${meResponse.status}`);
    console.log(`   Success: ${meResponse.ok ? '✅' : '❌'}`);
    
    // Test admin access (should fail)
    console.log('\n4. Testing Admin Access (should fail)...');
    const adminResponse = await fetch('http://localhost:5000/api/admin/dashboard', {
      method: 'GET',
      headers: { 'Cookie': cookies }
    });
    const adminData = await adminResponse.json();
    console.log(`   Status: ${adminResponse.status}`);
    console.log(`   Expected 403: ${adminResponse.status === 403 ? '✅' : '❌'}`);
    
    console.log('\n' + '=' .repeat(40));
    console.log('🎯 All tests completed!');
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

testAuth();

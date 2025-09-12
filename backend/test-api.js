import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// Test function to verify API endpoints
async function testAPIEndpoints() {
  console.log('🧪 Testing Chalet Booking API Endpoints...\n');

  try {
    // Test 1: Check if server is running
    console.log('1. Testing server health...');
    const healthResponse = await axios.get('http://localhost:5000/');
    console.log(`✅ Server is running: ${healthResponse.data}`);
    console.log('');

  } catch (error) {
    console.log(`❌ Server health check failed: ${error.message}`);
    console.log('Make sure the server is running with: npm run dev');
    return;
  }

  try {
    // Test 2: Test chalets endpoint
    console.log('2. Testing GET /api/chalets...');
    const chaletsResponse = await axios.get(`${BASE_URL}/chalets`);
    console.log(`✅ Chalets endpoint working: ${chaletsResponse.data.count} chalets found`);
    console.log('Sample chalet:', chaletsResponse.data.data[0] ? {
      id: chaletsResponse.data.data[0].id,
      title: chaletsResponse.data.data[0].title,
      location: chaletsResponse.data.data[0].location,
      price_per_night: chaletsResponse.data.data[0].price_per_night
    } : 'No chalets found');
    console.log('');

  } catch (error) {
    console.log(`❌ Chalets endpoint failed: ${error.response?.data?.message || error.message}`);
    console.log('This is expected if Hostex API credentials are not configured');
    console.log('');
  }

  try {
    // Test 3: Test authentication endpoints
    console.log('3. Testing authentication endpoints...');
    
    // Test registration
    const registerData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'testpassword123'
    };
    
    const registerResponse = await axios.post(`${BASE_URL}/auth/register`, registerData);
    console.log(`✅ Registration working: User created with ID ${registerResponse.data.user.id}`);
    
    // Test login
    const loginData = {
      email: 'test@example.com',
      password: 'testpassword123'
    };
    
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, loginData);
    console.log(`✅ Login working: Token received`);
    const token = loginResponse.data.token;
    console.log('');

    // Test 4: Test protected booking endpoints
    console.log('4. Testing protected booking endpoints...');
    const authHeaders = { Authorization: `Bearer ${token}` };
    
    const bookingsResponse = await axios.get(`${BASE_URL}/bookings`, { headers: authHeaders });
    console.log(`✅ Bookings endpoint working: ${bookingsResponse.data.count} bookings found`);
    console.log('');

  } catch (error) {
    console.log(`❌ Authentication/Booking test failed: ${error.response?.data?.message || error.message}`);
    console.log('');
  }

  console.log('🎉 API testing completed!');
  console.log('\n📝 Next steps:');
  console.log('1. Update HOSTEX_API_KEY in .env file with real credentials');
  console.log('2. Test chalet availability: GET /api/chalets/:id/availability');
  console.log('3. Test booking status updates: PUT /api/bookings/:id/status');
}

// Run the test
testAPIEndpoints().catch(console.error);

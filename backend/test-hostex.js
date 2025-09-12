import { getAllChalets, checkChaletAvailability, updateBookingStatus } from './services/hostex.js';

// Test function to verify Hostex API integration
async function testHostexIntegration() {
  console.log('Testing Hostex API Integration...\n');

  try {
    // Test 1: Fetch all chalets
    console.log('1. Testing getAllChalets()...');
    const chalets = await getAllChalets();
    console.log(`✅ Successfully fetched ${chalets.length} chalets`);
    console.log('Sample chalet:', chalets[0] ? {
      id: chalets[0].id,
      title: chalets[0].title,
      location: chalets[0].location,
      price_per_night: chalets[0].price_per_night
    } : 'No chalets found');
    console.log('');

  } catch (error) {
    console.log(`❌ getAllChalets() failed: ${error.message}`);
    console.log('');
  }

  try {
    // Test 2: Check availability (using first chalet if available)
    console.log('2. Testing checkChaletAvailability()...');
    const chalets = await getAllChalets();
    if (chalets.length > 0) {
      const chaletId = chalets[0].id;
      const checkIn = '2024-02-01';
      const checkOut = '2024-02-03';
      
      const availability = await checkChaletAvailability(chaletId, checkIn, checkOut);
      console.log(`✅ Successfully checked availability for chalet ${chaletId}`);
      console.log('Availability result:', availability);
    } else {
      console.log('⚠️  No chalets available for availability test');
    }
    console.log('');

  } catch (error) {
    console.log(`❌ checkChaletAvailability() failed: ${error.message}`);
    console.log('');
  }

  try {
    // Test 3: Update booking status (using a dummy booking ID)
    console.log('3. Testing updateBookingStatus()...');
    const dummyBookingId = 'test-booking-123';
    const status = 'confirmed';
    
    const result = await updateBookingStatus(dummyBookingId, status);
    console.log(`✅ Successfully updated booking ${dummyBookingId} status to ${status}`);
    console.log('Update result:', result);
    console.log('');

  } catch (error) {
    console.log(`❌ updateBookingStatus() failed: ${error.message}`);
    console.log('');
  }

  console.log('Hostex API integration test completed!');
  console.log('\nNote: Some tests may fail if:');
  console.log('- HOSTEX_API_KEY is not set in .env file');
  console.log('- HOSTEX_API_URL is incorrect');
  console.log('- Network connectivity issues');
  console.log('- API endpoints return different data structure');
}

// Run the test
testHostexIntegration().catch(console.error);

import axios from 'axios';

// Hostex API configuration
const HOSTEX_API_BASE_URL = process.env.HOSTEX_API_URL || 'https://api.hostex.com/v1';
const HOSTEX_API_KEY = process.env.HOSTEX_API_KEY;

// Create axios instance with default config
const hostexClient = axios.create({
  baseURL: HOSTEX_API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${HOSTEX_API_KEY}`,
    'accept': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

/**
 * Fetch all chalets from Hostex API
 * @returns {Promise<Array>} Array of chalets with mapped properties
 */
export async function getAllChalets() {
  try {
    console.log('Fetching chalets from Hostex API...');
    
    const response = await hostexClient.get('/chalets');
    const hostexChalets = response.data.data || response.data; // Handle different API response structures
    
    // Map Hostex API response to our Chalet model format
    const mappedChalets = hostexChalets.map(chalet => ({
      id: chalet.id || chalet._id,
      title: chalet.name || chalet.title || 'Untitled Chalet',
      description: chalet.description || chalet.summary || 'No description available',
      location: {
        address: chalet.address || chalet.location?.address || 'Address not specified',
        city: chalet.city || chalet.location?.city || 'City not specified',
        country: chalet.country || chalet.location?.country || 'Country not specified',
        coordinates: chalet.coordinates || chalet.location?.coordinates || null,
      },
      price_per_night: chalet.price_per_night || chalet.price || chalet.rate || 0,
      capacity: chalet.capacity || chalet.max_guests || chalet.guest_limit || 1,
      images: chalet.images || chalet.photos || chalet.gallery || [],
      services: chalet.services || chalet.amenities || chalet.features || [],
      availability: chalet.availability || chalet.available_dates || [],
      // Additional Hostex-specific fields
      hostex_id: chalet.id || chalet._id,
      rating: chalet.rating || chalet.review_score || null,
      review_count: chalet.review_count || chalet.total_reviews || 0,
      property_type: chalet.property_type || chalet.type || 'chalet',
      bedrooms: chalet.bedrooms || chalet.bedroom_count || 1,
      bathrooms: chalet.bathrooms || chalet.bathroom_count || 1,
      size: chalet.size || chalet.area || null,
      // Booking rules
      minimum_nights: chalet.minimum_nights || chalet.min_stay || 1,
      maximum_nights: chalet.maximum_nights || chalet.max_stay || null,
      cancellation_policy: chalet.cancellation_policy || 'moderate',
    }));

    console.log(`Successfully fetched ${mappedChalets.length} chalets from Hostex API`);
    return mappedChalets;

  } catch (error) {
    console.error('Error fetching chalets from Hostex API:', error.message);
    
    // Handle different types of errors
    if (error.response) {
      // API responded with error status
      const status = error.response.status;
      const message = error.response.data?.message || error.response.data?.error || 'API request failed';
      
      if (status === 401) {
        throw new Error('Hostex API authentication failed. Check API key.');
      } else if (status === 403) {
        throw new Error('Hostex API access forbidden. Check permissions.');
      } else if (status === 404) {
        throw new Error('Hostex API endpoint not found.');
      } else if (status >= 500) {
        throw new Error('Hostex API server error. Please try again later.');
      } else {
        throw new Error(`Hostex API error (${status}): ${message}`);
      }
    } else if (error.request) {
      // Network error
      throw new Error('Network error: Unable to connect to Hostex API');
    } else {
      // Other error
      throw new Error(`Hostex API error: ${error.message}`);
    }
  }
}

/**
 * Update booking status in Hostex API
 * @param {string} bookingId - The booking ID
 * @param {string} status - New status ('confirmed', 'cancelled', 'completed', etc.)
 * @returns {Promise<Object>} Updated booking data from Hostex
 */
export async function updateBookingStatus(bookingId, status) {
  try {
    console.log(`Updating booking ${bookingId} status to ${status} in Hostex API...`);
    
    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed', 'no_show'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid booking status: ${status}. Valid statuses: ${validStatuses.join(', ')}`);
    }

    const response = await hostexClient.put(`/bookings/${bookingId}`, {
      status: status,
      updated_at: new Date().toISOString(),
    });

    const updatedBooking = response.data.data || response.data;
    
    console.log(`Successfully updated booking ${bookingId} status to ${status}`);
    return updatedBooking;

  } catch (error) {
    console.error(`Error updating booking ${bookingId} status:`, error.message);
    
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.response.data?.error || 'API request failed';
      
      if (status === 401) {
        throw new Error('Hostex API authentication failed. Check API key.');
      } else if (status === 403) {
        throw new Error('Hostex API access forbidden. Check permissions.');
      } else if (status === 404) {
        throw new Error(`Booking ${bookingId} not found in Hostex API.`);
      } else if (status >= 500) {
        throw new Error('Hostex API server error. Please try again later.');
      } else {
        throw new Error(`Hostex API error (${status}): ${message}`);
      }
    } else if (error.request) {
      throw new Error('Network error: Unable to connect to Hostex API');
    } else {
      throw new Error(`Hostex API error: ${error.message}`);
    }
  }
}

/**
 * Get booking details from Hostex API
 * @param {string} bookingId - The booking ID
 * @returns {Promise<Object>} Booking details from Hostex
 */
export async function getBookingDetails(bookingId) {
  try {
    console.log(`Fetching booking ${bookingId} details from Hostex API...`);
    
    const response = await hostexClient.get(`/bookings/${bookingId}`);
    const booking = response.data.data || response.data;
    
    console.log(`Successfully fetched booking ${bookingId} details`);
    return booking;

  } catch (error) {
    console.error(`Error fetching booking ${bookingId} details:`, error.message);
    
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.response.data?.error || 'API request failed';
      
      if (status === 404) {
        throw new Error(`Booking ${bookingId} not found in Hostex API.`);
      } else {
        throw new Error(`Hostex API error (${status}): ${message}`);
      }
    } else if (error.request) {
      throw new Error('Network error: Unable to connect to Hostex API');
    } else {
      throw new Error(`Hostex API error: ${error.message}`);
    }
  }
}

/**
 * Check chalet availability for specific dates
 * @param {string} chaletId - The chalet ID
 * @param {string} checkIn - Check-in date (YYYY-MM-DD)
 * @param {string} checkOut - Check-out date (YYYY-MM-DD)
 * @returns {Promise<Object>} Availability information
 */
export async function checkChaletAvailability(chaletId, checkIn, checkOut) {
  try {
    console.log(`Checking availability for chalet ${chaletId} from ${checkIn} to ${checkOut}`);
    
    const response = await hostexClient.get(`/chalets/${chaletId}/availability`, {
      params: {
        check_in: checkIn,
        check_out: checkOut,
      },
    });

    const availability = response.data.data || response.data;
    
    console.log(`Successfully checked availability for chalet ${chaletId}`);
    return availability;

  } catch (error) {
    console.error(`Error checking availability for chalet ${chaletId}:`, error.message);
    
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.response.data?.error || 'API request failed';
      
      if (status === 404) {
        throw new Error(`Chalet ${chaletId} not found in Hostex API.`);
      } else {
        throw new Error(`Hostex API error (${status}): ${message}`);
      }
    } else if (error.request) {
      throw new Error('Network error: Unable to connect to Hostex API');
    } else {
      throw new Error(`Hostex API error: ${error.message}`);
    }
  }
}

// API utility functions for the chalet booking system
// In a real application, these would make actual HTTP requests to a backend API

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface Chalet {
  id: string;
  name: string;
  location: string;
  price: number;
  image: string;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  rating: number;
  description: string;
  amenities: string[];
}

export interface Booking {
  id: string;
  chaletId: string;
  userId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

// Mock API functions - replace with actual API calls
export const api = {
  // Chalets
  async getChalets(): Promise<ApiResponse<Chalet[]>> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      data: [],
      success: true
    };
  },

  async getChalet(id: string): Promise<ApiResponse<Chalet | null>> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      data: null,
      success: true
    };
  },

  // Bookings
  async getBookings(userId: string): Promise<ApiResponse<Booking[]>> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 400));
    return {
      data: [],
      success: true
    };
  },

  async createBooking(booking: Omit<Booking, 'id' | 'createdAt'>): Promise<ApiResponse<Booking>> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      data: {
        ...booking,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      },
      success: true
    };
  },

  async cancelBooking(bookingId: string): Promise<ApiResponse<boolean>> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      data: true,
      success: true
    };
  },

  // Authentication
  async login(email: string, password: string): Promise<ApiResponse<{ user: any; token: string }>> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      data: {
        user: { id: '1', email, name: 'User', role: 'user' },
        token: 'mock-jwt-token'
      },
      success: true
    };
  },

  async register(name: string, email: string, password: string): Promise<ApiResponse<{ user: any; token: string }>> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      data: {
        user: { id: Date.now().toString(), email, name, role: 'user' },
        token: 'mock-jwt-token'
      },
      success: true
    };
  }
};

export default api;

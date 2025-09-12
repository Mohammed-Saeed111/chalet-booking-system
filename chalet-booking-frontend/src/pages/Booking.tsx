import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Booking = () => {
  const { user } = useAuth();
  const [bookings] = useState([
    {
      id: '1',
      chaletName: 'Mountain View Chalet',
      location: 'Aspen, Colorado',
      checkIn: '2024-02-15',
      checkOut: '2024-02-18',
      guests: 4,
      totalPrice: 1050,
      status: 'confirmed',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300'
    },
    {
      id: '2',
      chaletName: 'Cozy Alpine Retreat',
      location: 'Park City, Utah',
      checkIn: '2024-03-10',
      checkOut: '2024-03-12',
      guests: 2,
      totalPrice: 560,
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1551524164-6cf77ac2b0b3?w=300'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Please log in to view your bookings
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            You need to be logged in to access your booking history.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Bookings
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your chalet reservations and view booking history
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No bookings found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Get started by booking your first chalet.
            </p>
            <div className="mt-6">
              <a
                href="/chalets"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Browse Chalets
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      className="h-48 w-full object-cover md:h-full"
                      src={booking.image}
                      alt={booking.chaletName}
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {booking.chaletName}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {booking.location}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">Check-in:</span>
                        <span className="ml-2 text-gray-600 dark:text-gray-300">
                          {new Date(booking.checkIn).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">Check-out:</span>
                        <span className="ml-2 text-gray-600 dark:text-gray-300">
                          {new Date(booking.checkOut).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">Guests:</span>
                        <span className="ml-2 text-gray-600 dark:text-gray-300">
                          {booking.guests}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">Total:</span>
                        <span className="ml-2 text-gray-600 dark:text-gray-300">
                          ${booking.totalPrice}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-4">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                        View Details
                      </button>
                      {booking.status === 'confirmed' && (
                        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                          Cancel Booking
                        </button>
                      )}
                      {booking.status === 'pending' && (
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                          Confirm Payment
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;

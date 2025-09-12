import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Chalet {
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
}

const Chalets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price');

  // Mock data - in real app, this would come from an API
  const chalets: Chalet[] = [
    {
      id: '1',
      name: 'Mountain View Chalet',
      location: 'Aspen, Colorado',
      price: 350,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500',
      bedrooms: 3,
      bathrooms: 2,
      guests: 6,
      rating: 4.8,
      description: 'Stunning mountain views with modern amenities'
    },
    {
      id: '2',
      name: 'Cozy Alpine Retreat',
      location: 'Park City, Utah',
      price: 280,
      image: 'https://images.unsplash.com/photo-1551524164-6cf77ac2b0b3?w=500',
      bedrooms: 2,
      bathrooms: 1,
      guests: 4,
      rating: 4.6,
      description: 'Perfect for a romantic getaway'
    },
    {
      id: '3',
      name: 'Luxury Ski Lodge',
      location: 'Whistler, Canada',
      price: 450,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
      bedrooms: 4,
      bathrooms: 3,
      guests: 8,
      rating: 4.9,
      description: 'Premium ski-in/ski-out location'
    },
    {
      id: '4',
      name: 'Rustic Cabin',
      location: 'Lake Tahoe, California',
      price: 200,
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500',
      bedrooms: 2,
      bathrooms: 1,
      guests: 4,
      rating: 4.4,
      description: 'Authentic mountain cabin experience'
    },
    {
      id: '5',
      name: 'Modern Chalet',
      location: 'St. Moritz, Switzerland',
      price: 600,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500',
      bedrooms: 5,
      bathrooms: 4,
      guests: 10,
      rating: 4.9,
      description: 'Luxury alpine living at its finest'
    },
    {
      id: '6',
      name: 'Family Mountain Home',
      location: 'Breckenridge, Colorado',
      price: 320,
      image: 'https://images.unsplash.com/photo-1551524164-6cf77ac2b0b3?w=500',
      bedrooms: 3,
      bathrooms: 2,
      guests: 6,
      rating: 4.7,
      description: 'Perfect for family vacations'
    }
  ];

  const filteredChalets = chalets
    .filter(chalet => 
      chalet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chalet.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        case 'guests':
          return b.guests - a.guests;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Chalets
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover your perfect mountain retreat
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-1/2">
              <input
                type="text"
                placeholder="Search chalets by name or location..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-auto">
              <select
                className="w-full md:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="price">Sort by Price</option>
                <option value="rating">Sort by Rating</option>
                <option value="guests">Sort by Guests</option>
              </select>
            </div>
          </div>
        </div>

        {/* Chalets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredChalets.map((chalet) => (
            <div key={chalet.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img
                  src={chalet.image}
                  alt={chalet.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-2 py-1 rounded-full">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    ${chalet.price}/night
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {chalet.name}
                  </h3>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {chalet.rating}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {chalet.location}
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                  {chalet.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    </svg>
                    {chalet.bedrooms} beds
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M10.5 3L12 2l1.5 1H21v6H3V3h7.5z" />
                    </svg>
                    {chalet.bathrooms} baths
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {chalet.guests} guests
                  </div>
                </div>
                
                <Link
                  to={`/chalet/${chalet.id}`}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-center block"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredChalets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              No chalets found matching your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chalets;

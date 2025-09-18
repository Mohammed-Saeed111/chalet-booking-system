import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';

interface Chalet {
  id: string;
  name: string;
  location: string;
  price: number;
  image: string;
  bedrooms: number;
  bathrooms: number;
  beds: number;
  family: number;
  guests: number;
  rating: number;
  description: string;
}

const Chalets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price');
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  // Mock data - in real app, this would come from an API
  const chalets: Chalet[] = [
    {
      id: '1',
      name: 'Chalet A2 Chalet',
      location: 'Saudi Arabia',
      price: 500,
      image: '/assets/chaleta2chalet.jpeg',
      bedrooms: 1,
      bathrooms: 2,
      beds: 2,
      family: 1,
      guests: 5,
      rating: 4.4,
      description: 'A luxurious chalet with modern amenities and stunning views for a comfortable stay.'
    },
    {
      id: '2',
      name: 'Chalet A3 Chalet',
      location: 'Saudi Arabia',
      price: 600,
      image: '/assets/a3.avif',
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      family: 1,
      guests: 4,
      rating: 4.6,
      description: 'A luxurious chalet with modern amenities and stunning views for a comfortable stay.'
    },
    {
      id: '3',
      name: 'Executive Five 5 Bay Palm',
      location: 'Saudi Arabia',
      price: 700,
      image: '/assets/picture-1.jpeg',
      bedrooms: 1,
      bathrooms: 1,
      beds: 3,
      family: 2,
      guests: 8,
      rating: 4.9,
      description: 'A luxurious chalet with modern amenities and stunning views for a comfortable stay.'
    },
    {
      id: '4',
      name: 'Chalet A1 Chalet',
      location: 'Saudi Arabia',
      price: 800,
      image: '/assets/a4.avif',
      bedrooms: 2,
      bathrooms: 1,
      beds: 2,
      family: 1,
      guests: 4,
      rating: 4.4,
      description: 'A luxurious chalet with modern amenities and stunning views for a comfortable stay.'
    },
    {
      id: '5',
      name: 'Execute 2 from Palm',
      location: 'Saudi Arabia',
      price: 1200,
      image: '/assets/a5.avif',
      bedrooms: 5,
      bathrooms: 4,
      beds: 4,
      family: 2,
      guests: 10,
      rating: 4.9,
      description: 'A luxurious chalet with modern amenities and stunning views for a comfortable stay.'
    },
    {
      id: '6',
      name: 'Villa Cali Garden 11',
      location: 'Saudi Arabia',
      price: 900,
      image: '/assets/a6.avif',
      bedrooms: 3,
      bathrooms: 2,
      beds: 3,
      family: 2,
      guests: 6,
      rating: 4.7,
      description: 'A luxurious chalet with modern amenities and stunning views for a comfortable stay.'
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('chalets.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('chalets.subtitle')}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-1/2">
              <input
                type="text"
                placeholder={t('common.search')}
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
                <option value="price">{t('chalets.sort.price_low_high')}</option>
                <option value="rating">{t('chalets.sort.rating')}</option>
                <option value="guests">{t('chalets.sort.newest')}</option>
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
                <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} bg-white dark:bg-gray-800 px-2 py-1 rounded-full`}>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    ${chalet.price}/{t('common.per_night')}
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

                <Link
                  to={`/chalet/${chalet.id}`}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-center block"
                >
                  {t('chalets.view_details')}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredChalets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              {t('chalets.no_results')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chalets;

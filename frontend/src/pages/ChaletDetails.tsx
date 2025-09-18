// ChaletDetails.tsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { chalets } from "../data/chalets";

const ChaletDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [selectedDates, setSelectedDates] = useState({
    checkIn: "",
    checkOut: "",
  });
  const [guests, setGuests] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Get chalet by id from chalets data
  const chalet = chalets.find((c) => c.id === id);

  if (!chalet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('errors.page_not_found')}</h2>
          <Link to="/chalets" className="text-blue-600 hover:underline">{t('chalets.title')}</Link>
        </div>
      </div>
    );
  }

  const handleBooking = () => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) {
      alert(t('chalet_details.select_dates'));
      return;
    }
    alert(t('chalet_details.redirecting'));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'} text-sm`}>
            <li>
              <Link
                to="/"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {t('navbar.home')}
              </Link>
            </li>
            <li className="text-gray-500 dark:text-gray-400">/</li>
            <li>
              <Link
                to="/chalets"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {t('navbar.chalets')}
              </Link>
            </li>
            <li className="text-gray-500 dark:text-gray-400">/</li>
            <li className="text-gray-900 dark:text-white font-medium">
              {chalet.name}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              {/* Main image */}
              <div className="mb-4">
                <img
                  src={chalet.images[0] ? `/assets/${chalet.images[0].src}` : ''}
                  alt={chalet.name}
                  className="w-full h-64 md:h-96 object-cover rounded-lg cursor-pointer"
                  onClick={() => setSelectedImage(chalet.images[0] ? `/assets/${chalet.images[0].src}` : '')}
                />
              </div>

              {/* Show chalet-specific images */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {chalet.images.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {item.description}
                    </p>
                    <img
                      src={`/assets/${item.src}`}
                      alt={item.title}
                      className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
                      onClick={() => setSelectedImage(`/assets/${item.src}`)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Modal for enlarged image */}
            {selectedImage && (
              <div
                className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                onClick={() => setSelectedImage(null)}
              >
                <img
                  src={selectedImage}
                  alt="Enlarged view"
                  className="max-w-4xl max-h-[90vh] rounded-lg shadow-lg"
                />
              </div>
            )}

            {/* Chalet Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {chalet.name}
                </h1>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-yellow-400 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {chalet.rating}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
                {chalet.location}
              </p>

              <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-6' : 'space-x-6'} mb-6 text-sm text-gray-600 dark:text-gray-300`}>
                <div className="flex items-center">
                  <svg
                    className={`w-4 h-4 ${isRTL ? 'ml-1' : 'mr-1'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                    />
                  </svg>
                  {chalet.bedrooms} {t('chalet_details.bedrooms')}
                </div>
                <div className="flex items-center">
                  <svg
                    className={`w-4 h-4 ${isRTL ? 'ml-1' : 'mr-1'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M10.5 3L12 2l1.5 1H21v6H3V3h7.5z"
                    />
                  </svg>
                  {chalet.bathrooms} {t('chalet_details.bathrooms')}
                </div>
                <div className="flex items-center">
                  <svg
                    className={`w-4 h-4 ${isRTL ? 'ml-1' : 'mr-1'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {t('chalet_details.capacity')}: {chalet.guests} {t('common.guests')}
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {chalet.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('chalet_details.amenities')}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">{t('chalet_details.wifi')}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">{t('chalet_details.parking')}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">{t('chalet_details.kitchen')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  ${chalet.price}
                  <span className="text-lg text-gray-600 dark:text-gray-300">/{t('common.per_night')}</span>
                </div>
                <div className="flex items-center justify-center">
                  <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{chalet.rating}</span>
                </div>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('common.check_in')}
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={selectedDates.checkIn}
                    onChange={(e) => setSelectedDates({...selectedDates, checkIn: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('common.check_out')}
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={selectedDates.checkOut}
                    onChange={(e) => setSelectedDates({...selectedDates, checkOut: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('common.guests')}
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                  >
                    <option value={1}>1 {t('common.guest')}</option>
                    <option value={2}>2 {t('common.guests')}</option>
                    <option value={3}>3 {t('common.guests')}</option>
                    <option value={4}>4 {t('common.guests')}</option>
                    <option value={5}>5+ {t('common.guests')}</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={handleBooking}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                >
                  {t('chalet_details.book_now')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChaletDetails;

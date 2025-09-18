import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
// import any chalet data or details only if it existed before the 'View Details' step

const Home = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section
        className="relative w-full min-h-[115vh] text-white bg-center bg-cover"
        style={{
          backgroundImage: "url('/assets/chalenda.png')", // الصورة موجودة في public/assets
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[70vh]">
          <div className="w-full text-center">
            {/* Search Box */}
            <div className="w-full max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-4 md:p-5 grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4 items-end">
                
                {/* Destination */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t('common.location')}</label>
                  <input
                    type="text"
                    placeholder={t('common.search')}
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                {/* Check in */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t('common.check_in')}</label>
                  <input
                    type="date"
                      className="w-full h-11 px-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-black"
                  />
                </div>

                {/* Check out */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t('common.check_out')}</label>
                  <input
                    type="date"
                      className="w-full h-11 px-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-black"
                  />
                </div>

                {/* Guests + Search */}
                <div className="flex md:block gap-3">
                  <div className="flex-1 md:mb-0">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('common.guests')}</label>
                    <select className="w-full h-11 px-3 rounded-xl border border-red-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900">
                      <option>0</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4+</option>
                    </select>
                  </div>
                  <button
                    className="md:mt-6 h-11 md:h-11 whitespace-nowrap inline-flex items-center justify-center px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow"
                  >
                    {t('common.search')}
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chalet Preview Section removed: revert to original Home page content before 'View Details' feature */}

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.why_choose')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('home.why_choose_text')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t('home.luxury_accommodations')}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('home.luxury_accommodations_text')}
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="text-center p-6">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t('home.easy_booking')}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('home.easy_booking_text')}
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="text-center p-6">
              <div className="bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t('home.prime_locations')}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('home.prime_locations_text')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('home.ready_adventure')}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('home.ready_adventure_text')}
          </p>
          <Link
            to="/chalets"
            className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg transition-colors inline-block"
          >
{t('home.book_now')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

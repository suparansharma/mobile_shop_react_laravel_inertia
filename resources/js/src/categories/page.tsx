import React from 'react';
import type { Metadata } from 'next';
import { Link } from 'react-router-dom';

export const metadata: Metadata = {
  title: 'Categories | Cell X',
  description: 'Browse our wide range of gadgets and mobile accessories by category.',
};

const categories = [
  {
    id: 'smartphones',
    name: 'Smartphones',
    description: 'Latest iPhones, Samsung Galaxy, and premium Android devices.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
    ),
    color: 'from-blue-500 to-cyan-400',
    itemCount: 124,
  },
  {
    id: 'smartwatches',
    name: 'Smartwatches',
    description: 'Track your fitness and stay connected with top wearables.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    color: 'from-purple-500 to-pink-500',
    itemCount: 45,
  },
  {
    id: 'earbuds',
    name: 'Earbuds & Audio',
    description: 'Premium AirPods, TWS earbuds, and wireless headphones.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
    ),
    color: 'from-orange-500 to-red-500',
    itemCount: 89,
  },
  {
    id: 'chargers',
    name: 'Chargers & Cables',
    description: 'Fast chargers, MagSafe, and durable braided cables.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    ),
    color: 'from-green-400 to-emerald-600',
    itemCount: 210,
  },
  {
    id: 'powerbanks',
    name: 'Power Banks',
    description: 'High-capacity portable chargers for all your devices.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
    ),
    color: 'from-yellow-400 to-orange-500',
    itemCount: 34,
  },
  {
    id: 'accessories',
    name: 'Cases & Protectors',
    description: 'Premium covers, clear cases, and tempered glass.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
    ),
    color: 'from-indigo-500 to-blue-600',
    itemCount: 300,
  }
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 relative">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4 relative z-10">
            Shop by <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Category</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto relative z-10">
            Find exactly what you're looking for. Browse our complete collection of premium gadgets and tech accessories.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link to={`/shop?category=${category.id}`} key={category.id} className="group relative block rounded-3xl overflow-hidden bg-white dark:bg-[#141414] shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-[#2a2a2a] hover:-translate-y-2">
              
              {/* Background Gradient Glow */}
              <div className={`absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-30 blur-2xl transition-opacity duration-300`}></div>
              
              <div className="p-8">
                {/* Icon Box */}
                <div className={`inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br ${category.color} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-orange-500 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {category.description}
                </p>
                
                {/* Footer */}
                <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4 mt-auto">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                    {category.itemCount} Items
                  </span>
                  <div className="flex items-center text-orange-500 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span className="mr-2">Explore</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
      </div>
    </div>
  );
}

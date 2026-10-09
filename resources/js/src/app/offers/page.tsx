import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Special Offers | Cell X',
  description: 'Check out our latest deals and discounts on smartphones and accessories.',
};

export default function OffersPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#141414] rounded-2xl shadow-sm border border-gray-100 dark:border-[#2a2a2a] p-8 md:p-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">Special Offers</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          We frequently update our exciting deals and exclusive discounts. Stay tuned or visit our physical store at Jamuna Future Park for on-the-spot offers!
        </p>
        <div className="inline-block p-6 rounded-xl bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 font-medium">
          No active online offers at the moment. Please check back later.
        </div>
      </div>
    </div>
  );
}

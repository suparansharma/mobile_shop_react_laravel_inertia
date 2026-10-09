import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping Policy | Cell X',
  description: 'Learn about our delivery and shipping methods across Bangladesh.',
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#141414] rounded-2xl shadow-sm border border-gray-100 dark:border-[#2a2a2a] p-8 md:p-12">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 border-b border-gray-100 dark:border-gray-800 pb-4">Shipping Policy</h1>
        
        <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200">Delivery Inside Dhaka</h2>
          <p>We offer fast delivery within Dhaka city. Standard delivery usually takes 1-2 business days. Express delivery options are available at checkout.</p>
          
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mt-8">Delivery Outside Dhaka</h2>
          <p>For orders outside Dhaka, we partner with reliable courier services. Delivery generally takes 3-5 business days depending on your location.</p>
          
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mt-8">Shipping Charges</h2>
          <p>Shipping charges are calculated at checkout based on your location and the weight of your order.</p>
          
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mt-8">Order Tracking</h2>
          <p>Once your order is dispatched, you will receive a tracking ID via SMS or email to monitor your package.</p>
        </div>
      </div>
    </div>
  );
}

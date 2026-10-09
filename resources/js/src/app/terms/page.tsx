import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Cell X',
  description: 'Terms of service for Cell X.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#141414] rounded-2xl shadow-sm border border-gray-100 dark:border-[#2a2a2a] p-8 md:p-12">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 border-b border-gray-100 dark:border-gray-800 pb-4">Terms & Conditions</h1>
        
        <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed">
          <p>Welcome to Cell X. By accessing our website and purchasing our products, you agree to be bound by the following terms and conditions.</p>
          
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mt-8">General Conditions</h2>
          <p>We reserve the right to refuse service to anyone for any reason at any time. Prices for our products are subject to change without notice.</p>
          
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mt-8">Products and Availability</h2>
          <p>We have made every effort to display as accurately as possible the colors and images of our products. All descriptions of products and product pricing are subject to change at anytime without notice.</p>
          
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mt-8">Accuracy of Billing and Account Information</h2>
          <p>You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store.</p>
        </div>
      </div>
    </div>
  );
}

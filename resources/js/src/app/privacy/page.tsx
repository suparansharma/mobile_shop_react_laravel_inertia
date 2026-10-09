import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Cell X',
  description: 'How we protect your data.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#141414] rounded-2xl shadow-sm border border-gray-100 dark:border-[#2a2a2a] p-8 md:p-12">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 border-b border-gray-100 dark:border-gray-800 pb-4">Privacy Policy</h1>
        
        <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed">
          <p>At Cell X, we are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner.</p>
          
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mt-8">Information We Collect</h2>
          <p>We may collect personal information such as your name, email address, phone number, and delivery address when you register an account or place an order.</p>
          
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mt-8">How We Use Your Information</h2>
          <p>Your information is used strictly to process your orders, provide customer support, and, if you opt-in, to send you promotional offers.</p>
          
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mt-8">Data Protection</h2>
          <p>We implement a variety of security measures to maintain the safety of your personal information. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.</p>
        </div>
      </div>
    </div>
  );
}

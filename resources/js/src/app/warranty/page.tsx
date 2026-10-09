import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Warranty Policy | Cell X',
  description: 'Official brand warranty details for our products.',
};

export default function WarrantyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#141414] rounded-2xl shadow-sm border border-gray-100 dark:border-[#2a2a2a] p-8 md:p-12">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 border-b border-gray-100 dark:border-gray-800 pb-4">Warranty Policy</h1>
        
        <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed">
          <p>We ensure that all our customers receive 100% authentic products. Warranty terms vary depending on the brand and the type of product purchased.</p>
          
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mt-8">Official Brand Warranty</h2>
          <p>Most smartphones and electronics come with an official 1-year brand warranty. If you encounter any manufacturing defects within this period, you can claim warranty services directly from the brand's authorized service centers or through us.</p>
          
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mt-8">What is NOT Covered?</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Physical damage, dents, or liquid damage.</li>
            <li>Unauthorized repairs or software modifications (rooting/jailbreaking).</li>
            <li>Normal wear and tear of accessories like cables or chargers.</li>
          </ul>
          
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mt-8">How to Claim</h2>
          <p>To claim a warranty, bring the device along with the original box and invoice to our shop at Jamuna Future Park, and our team will guide you through the process.</p>
        </div>
      </div>
    </div>
  );
}

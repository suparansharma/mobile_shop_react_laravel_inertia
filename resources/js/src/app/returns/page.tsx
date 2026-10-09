import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Return Policy | Cell X',
  description: 'Our return and exchange policy.',
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#141414] rounded-2xl shadow-sm border border-gray-100 dark:border-[#2a2a2a] p-8 md:p-12">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 border-b border-gray-100 dark:border-gray-800 pb-4">Return & Exchange Policy</h1>
        
        <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed">
          <p>At Cell X, we prioritize your satisfaction. If you are not completely satisfied with your purchase, we are here to help.</p>
          
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mt-8">3-Day Replacement Guarantee</h2>
          <p>If you receive a defective or damaged product, you can request a replacement within 3 days of delivery. The item must be unused, in its original packaging, and with all accessories and receipts included.</p>
          
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mt-8">Conditions for Return</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>The product must be physically undamaged.</li>
            <li>Software issues that can be fixed via updates are not covered under replacement.</li>
            <li>Original invoice and packaging box must be provided.</li>
          </ul>
          
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mt-8">Refunds</h2>
          <p>Refunds are only processed if we are unable to provide a replacement for a valid defective item. Processing time typically takes 5-7 business days.</p>
        </div>
      </div>
    </div>
  );
}

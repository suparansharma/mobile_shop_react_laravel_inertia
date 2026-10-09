import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Cell X',
  description: 'Learn about Cell X, your premier destination for the latest gadgets and accessories at Jamuna Future Park.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a]">
      {/* Hero Section */}
      <div className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white dark:bg-[#111] border-b border-gray-100 dark:border-gray-800">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-orange-600/10 blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Cell X</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Your ultimate destination for premium gadgets, cutting-edge smartphones, and exclusive mobile accessories in Bangladesh.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Our Story */}
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
          <div className="lg:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-gray-200 dark:bg-gray-800 flex items-center justify-center border border-gray-100 dark:border-gray-700">
               {/* Placeholder for an actual store or device image, using a sleek gradient/icon for now */}
               <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900"></div>
               <svg className="w-24 h-24 text-gray-400 dark:text-gray-600 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
               </svg>
            </div>
          </div>
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Story</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Located in the heart of Dhaka at Jamuna Future Park, <span className="font-semibold text-gray-900 dark:text-gray-200">Cell X</span> started with a simple mission: to bring the most innovative technology directly to you. 
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              We understand that a smartphone is more than just a device—it's your connection to the world. That's why we meticulously curate our inventory to offer only 100% authentic, top-tier brands and the latest tech accessories.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Why Cell X?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="group bg-white dark:bg-[#141414] rounded-2xl p-8 border border-gray-100 dark:border-[#2a2a2a] shadow-sm hover:shadow-xl hover:border-orange-500/30 dark:hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-orange-50 dark:bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Authentic Products</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Original & quality-checked products.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white dark:bg-[#141414] rounded-2xl p-8 border border-gray-100 dark:border-[#2a2a2a] shadow-sm hover:shadow-xl hover:border-orange-500/30 dark:hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-orange-50 dark:bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Competitive Price</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Competitive pricing for smartphones and gadgets.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white dark:bg-[#141414] rounded-2xl p-8 border border-gray-100 dark:border-[#2a2a2a] shadow-sm hover:shadow-xl hover:border-orange-500/30 dark:hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-orange-50 dark:bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Trusted Support</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Customer support before and after purchase.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-white dark:bg-[#141414] rounded-2xl p-8 border border-gray-100 dark:border-[#2a2a2a] shadow-sm hover:shadow-xl hover:border-orange-500/30 dark:hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-orange-50 dark:bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Secure Shopping</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Safe & convenient online shopping experience.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group bg-white dark:bg-[#141414] rounded-2xl p-8 border border-gray-100 dark:border-[#2a2a2a] shadow-sm hover:shadow-xl hover:border-orange-500/30 dark:hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-orange-50 dark:bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Easy Exchange</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Phone exchange facility where applicable.
              </p>
            </div>

          </div>
        </div>

        {/* Visit Us Section */}
        <div className="bg-orange-500 rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 z-0 opacity-10">
            {/* Abstract Background Pattern */}
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
            </svg>
          </div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience Tech in Person</h2>
            <p className="text-lg md:text-xl text-orange-100 mb-10">
              Visit our flagship store at Jamuna Future Park and explore the latest gadgets hands-on before you buy.
            </p>
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20">
              <div className="bg-white text-orange-500 p-4 rounded-full">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-xl">Cell X</h3>
                <p className="text-orange-50">Jamuna Future Park, Level-4, Block-B, Shop No. 030C</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Cell X',
  description: 'Get in touch with Cell X. Find our store location at Jamuna Future Park or contact us via hotline.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Contact <span className="text-orange-500">Us</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions about our products or need support? We're here to help. Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 bg-white dark:bg-[#111] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          
          {/* Contact Information (Left Side) */}
          <div className="p-8 md:p-12 relative flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800">
            
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Get In Touch</h2>
            
            <div className="space-y-8">
              {/* Store Name & Address */}
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1 bg-orange-100 dark:bg-orange-500/20 p-3 rounded-full text-orange-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">Cell X</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                    Jamuna Future Park<br />
                    Level-4, Block-B, Shop No. 030C<br />
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              {/* Hotline */}
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-orange-100 dark:bg-orange-500/20 p-3 rounded-full text-orange-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Hotline</h3>
                  <a href="tel:01950000984" className="text-2xl font-bold text-orange-500 hover:text-orange-600 transition-colors">
                    01950000984
                  </a>
                </div>
              </div>

              {/* Email Support */}
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-orange-100 dark:bg-orange-500/20 p-3 rounded-full text-orange-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Email Support</h3>
                  <a href="mailto:support@cellx.com.bd" className="text-xl font-bold text-orange-500 hover:text-orange-600 transition-colors break-all">
                    support@cellx.com.bd
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1 bg-orange-100 dark:bg-orange-500/20 p-3 rounded-full text-orange-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Business Hours</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Wednesday - Monday<br />
                    <span className="text-gray-900 dark:text-white font-medium">11:00 AM - 9:00 PM</span><br />
                    <span className="text-orange-500 text-sm mt-1 inline-block">*Tuesday Closed</span>
                  </p>
                </div>
              </div>

              {/* Connect With Us */}
              <div className="flex items-start pt-6 border-t border-gray-100 dark:border-gray-800">
                <div className="flex-shrink-0 mt-1 bg-orange-100 dark:bg-orange-500/20 p-3 rounded-full text-orange-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <div className="ml-4 w-full">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Connect With Us</h3>
                  <div className="flex flex-wrap gap-3">
                    <a href="https://www.facebook.com/Cellxbd" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                    </a>
                    <a href="https://www.instagram.com/cellx.bd/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-xl bg-pink-50 text-pink-600 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-500 hover:text-white dark:bg-pink-900/30 dark:text-pink-400 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                    </a>
                    <a href="https://www.tiktok.com/@cellx.bd" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 text-gray-800 hover:bg-black hover:text-white dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white dark:hover:text-black transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 15.68a6.34 6.34 0 006.27 6.32 6.32 6.32 0 006.1-4.9c.09-.36.13-.73.13-1.1V9a8.36 8.36 0 004 1.13V6.66a5.2 5.2 0 01-1.91-.01v.04z" /></svg>
                    </a>
                    <a href="https://www.youtube.com/@FaisalNaeem" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </a>
                    <a href="https://wa.me/+8801950000984" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-50 text-green-500 hover:bg-green-500 hover:text-white dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-500 dark:hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (Right Side) */}
          <div className="p-8 md:p-12 relative">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                  <input type="text" id="first_name" className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors" placeholder="John" />
                </div>
                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
                  <input type="text" id="last_name" className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors" placeholder="Doe" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <input type="email" id="email" className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors" placeholder="john@example.com" />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                <input type="tel" id="phone" className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors" placeholder="01XXXXXXXXX" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Message</label>
                <textarea id="message" rows={4} className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none" placeholder="How can we help you?"></textarea>
              </div>

              <button type="button" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex justify-center items-center gap-2">
                Send Message
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </form>
          </div>
        </div>
        
      </div>
    </div>
  );
}

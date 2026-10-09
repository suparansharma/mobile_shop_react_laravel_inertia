"use client";

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { HeroBanner, bannerApi } from '@/lib/api/banners';
import BannerSlider from '@/components/BannerSlider';
import CustomerReviewsSlider from '@/components/CustomerReviewsSlider';
import { fetchPublicProducts } from '@/lib/api/products';
import { fetchPublicCategories } from '@/lib/api/categories';

export default function Home() {
  const [banners, setBanners] = useState<Record<string, HeroBanner[]>>({});
  const [products, setProducts] = useState<any[]>([]);
  const [usedProducts, setUsedProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bannersData, productsRes, usedProductsRes, categoriesRes] = await Promise.all([
          bannerApi.getPublicBanners().catch(() => ({})),
          fetchPublicProducts(1, 4, { is_featured: 1 }).catch(() => ({ data: [] })),
          fetchPublicProducts(1, 4, { type: 'used' }).catch(() => ({ data: [] })),
          fetchPublicCategories().catch(() => ({ data: [] }))
        ]);
        setBanners(bannersData);
        setProducts(productsRes.data || []);
        setUsedProducts(usedProductsRes.data || []);
        setCategories(Array.isArray(categoriesRes) ? categoriesRes : (categoriesRes.data || []));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);



  const getImageUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL 
      ? process.env.NEXT_PUBLIC_API_URL.replace('/api/v1', '') 
      : (process.env.NEXT_PUBLIC_BASE_URL || `${process.env.NEXT_PUBLIC_BASE_URL || 'https://api.cellx.com.bd'}`);
    return `${baseUrl}/storage/${path}`;
  };

  return (
    <div className="bg-transparent text-gray-900 dark:text-gray-100">
      {/* Hero Section (New Layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
          {/* Banners Section */}
          {loading ? (
            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-auto lg:h-[500px] rounded-xl sm:rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse shadow-sm"></div>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
                <div className="w-full sm:flex-1 aspect-[16/9] sm:aspect-auto sm:min-h-[190px] lg:h-[238px] rounded-xl sm:rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse shadow-sm"></div>
                <div className="w-full sm:flex-1 aspect-[16/9] sm:aspect-auto sm:min-h-[190px] lg:h-[238px] rounded-xl sm:rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse shadow-sm"></div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 sm:gap-6">
              {/* Main Banner */}
              <BannerSlider 
                banners={banners['main'] || []} 
                getImageUrl={getImageUrl} 
                className="w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-auto lg:h-[500px]" 
                fallbackImage="https://dummyimage.com/1200x500/eee/999.png&text=Promotion+Banner"
              />

              {/* Side Banners */}
              {(banners['side_top']?.length > 0 || banners['side_bottom']?.length > 0) && (
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
                  {banners['side_top']?.length > 0 && (
                    <BannerSlider 
                      banners={banners['side_top']} 
                      getImageUrl={getImageUrl} 
                      className="w-full sm:flex-1 aspect-[16/9] sm:aspect-auto sm:min-h-[190px] lg:h-[238px]" 
                      fallbackImage=""
                    />
                  )}
                  
                  {banners['side_bottom']?.length > 0 && (
                    <BannerSlider 
                      banners={banners['side_bottom']} 
                      getImageUrl={getImageUrl} 
                      className="w-full sm:flex-1 aspect-[16/9] sm:aspect-auto sm:min-h-[190px] lg:h-[238px]" 
                      fallbackImage=""
                    />
                  )}
                </div>
              )}
            </div>
          )}

        {/* Features Bar */}
        <div className="mt-8 bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hidden md:flex flex-wrap justify-between items-center gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500/10 p-3 rounded-full text-orange-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">36 Months EMI</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-orange-500/10 p-3 rounded-full text-orange-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
            </div>
            <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">Fastest Home Delivery</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-orange-500/10 p-3 rounded-full text-orange-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </div>
            <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">Exchange Facility</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-orange-500/10 p-3 rounded-full text-orange-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
            </div>
            <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">Best Price Deals</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-orange-500/10 p-3 rounded-full text-orange-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
            <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">After-Sales Service</span>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {(loading || products.length > 0) && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-300">Products</span>
            </h2>
            <Link to="/shop" className="text-orange-500 hover:text-orange-400 font-medium transition-colors">View All &rarr;</Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => {
                const thumbnail = Array.isArray(product.images) 
                  ? product.images.find((img: any) => img.is_thumbnail) || product.images[0] 
                  : null;
                  
                return (
                  <Link to={`/product/${product.slug}`} key={product.id} className="bg-white dark:bg-[#111] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 group cursor-pointer flex flex-col h-full overflow-hidden block">
                    <div className="h-64 bg-gray-100 dark:bg-[#1a1a1a] relative overflow-hidden flex items-center justify-center border-b border-gray-200 dark:border-gray-800 p-4">
                      {thumbnail ? (
                        <img 
                          src={getImageUrl(thumbnail.image_path)} 
                          alt={product.name} 
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-500 text-gray-600">
                          No Image
                        </div>
                      )}
                      
                      {product.discount_price > 0 && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">SALE</span>
                      )}
                    </div>
                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1 group-hover:text-orange-400 transition-colors line-clamp-2" title={product.name}>
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-3 capitalize">{product.brand?.name || 'Unknown'} • {product.category?.name || 'Uncategorized'}</p>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div>
                          {product.discount_price > 0 ? (
                            <>
                              <span className="text-xl font-bold text-gray-900 dark:text-white">৳{Number(product.discount_price).toLocaleString()}</span>
                              <span className="text-sm text-gray-500 line-through ml-2">৳{Number(product.price).toLocaleString()}</span>
                            </>
                          ) : (
                            <span className="text-xl font-bold text-gray-900 dark:text-white">৳{Number(product.price).toLocaleString()}</span>
                          )}
                        </div>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            // Add to cart functionality could go here
                          }}
                          className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 p-2 rounded-full hover:bg-orange-500 hover:text-white dark:hover:bg-orange-600 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        </button>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* Featured Used Devices */}
      {(loading || usedProducts.length > 0) && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Featured Used <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-300">Devices</span>
            </h2>
            <Link to="/shop?type=used" className="text-orange-500 hover:text-orange-400 font-medium transition-colors">View All &rarr;</Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {usedProducts.map((product) => {
              const thumbnail = Array.isArray(product.images) 
                ? product.images.find((img: any) => img.is_thumbnail) || product.images[0] 
                : null;
                
              return (
                <Link to={`/product/${product.slug}`} key={product.id} className="bg-white dark:bg-[#111] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 group cursor-pointer flex flex-col h-full overflow-hidden block">
                  <div className="h-64 bg-gray-100 dark:bg-[#1a1a1a] relative overflow-hidden flex items-center justify-center border-b border-gray-200 dark:border-gray-800 p-4">
                    {thumbnail ? (
                      <img 
                        src={getImageUrl(thumbnail.image_path)} 
                        alt={product.name} 
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-500 text-gray-600">
                        No Image
                      </div>
                    )}
                    
                    {product.discount_price > 0 && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">SALE</span>
                    )}
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1 group-hover:text-orange-400 transition-colors line-clamp-2" title={product.name}>
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3 capitalize">{product.brand?.name || 'Unknown'} • {product.category?.name || 'Uncategorized'}</p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div>
                        {product.discount_price > 0 ? (
                          <>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">৳{Number(product.discount_price).toLocaleString()}</span>
                            <span className="text-sm text-gray-500 line-through ml-2">৳{Number(product.price).toLocaleString()}</span>
                          </>
                        ) : (
                          <span className="text-xl font-bold text-gray-900 dark:text-white">৳{Number(product.price).toLocaleString()}</span>
                        )}
                      </div>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          // Add to cart functionality could go here
                        }}
                        className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 p-2 rounded-full hover:bg-orange-500 hover:text-white dark:hover:bg-orange-600 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
      )}

      {/* Categories */}
      <section className="bg-gray-50 dark:bg-[#050505] py-16 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold mb-12 text-gray-900 dark:text-white text-center md:text-left">
            Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-300">Categories</span>
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-10">
            {categories.slice(0, 16).map((cat, i) => (
              <Link to={`/shop?category=${cat.slug}`} key={cat.id || i} className="group cursor-pointer block flex flex-col items-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mb-4 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-2 bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-gray-800 group-hover:border-orange-500/50 shadow-sm p-4 text-gray-500 group-hover:text-orange-500 transition-colors">
                  {cat.image || cat.icon ? (
                    <img src={getImageUrl(cat.image || cat.icon)} alt={cat.name} className="w-full h-full object-contain filter group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.5)] transition-all" />
                  ) : (
                    (() => {
                      const n = (cat.name || '').toLowerCase();
                      if (n.includes('mobile') || n.includes('smartphone') || n.includes('phone') || n.includes('android')) {
                        return <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
                      }
                      if (n.includes('tablet') || n.includes('ipad')) {
                        return <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" transform="rotate(90 12 12)" /></svg>;
                      }
                      if (n.includes('watch') || n.includes('smart watch') || n.includes('band')) {
                        return <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
                      }
                      if (n.includes('headphone') || n.includes('earphone') || n.includes('neckband') || n.includes('airpod') || n.includes('buds')) {
                        return <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 00-18 0v4a2 2 0 002 2h2v-6a2 2 0 012-2h8a2 2 0 012 2v6h2a2 2 0 002-2v-4z" /></svg>;
                      }
                      if (n.includes('speaker') || n.includes('audio')) {
                        return <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5 10h4l5-5v14l-5-5H5a2 2 0 01-2-2v-2a2 2 0 012-2z" /></svg>;
                      }
                      if (n.includes('charger') || n.includes('power bank') || n.includes('cable') || n.includes('adapter')) {
                        return <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
                      }
                      if (n.includes('cover') || n.includes('protector') || n.includes('glass') || n.includes('case')) {
                        return <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
                      }
                      if (n.includes('memory') || n.includes('sd card') || n.includes('storage') || n.includes('drive')) {
                        return <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>;
                      }
                      if (n.includes('part') || n.includes('repair') || n.includes('battery')) {
                        return <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
                      }
                      
                      // Default icon (grid/apps)
                      return <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
                    })()
                  )}
                </div>
                <h3 className="text-center text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-orange-400 transition-colors px-1 line-clamp-2 w-full">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Sliding Section */}
      <CustomerReviewsSlider />
    </div>
  );
}

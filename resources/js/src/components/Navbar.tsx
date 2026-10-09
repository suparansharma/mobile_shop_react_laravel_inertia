"use client";

import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCompareStore } from '@/store/compareStore';
import { useEffect, useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import SearchBar from '@/components/SearchBar';

export default function Navbar() {
  const pathname = useLocation().pathname;
  const totalItems = useCartStore((state) => state.items.reduce((total, item) => total + item.quantity, 0));
  const wishlistTotal = useWishlistStore((state) => state.items.length);
  const compareTotal = useCompareStore((state) => state.items.length);
  const fetchWishlist = useWishlistStore((state) => state.fetchWishlist);
  const { isAuthenticated, user, logout } = useAuthStore();
  // Hydration fix for zustand persist
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    if (isAuthenticated()) {
      fetchWishlist();
    }
  }, [isAuthenticated, fetchWishlist]);
  return (
    <nav className="bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24 gap-4">
          <div className="flex-shrink-0 flex items-center">
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden mr-3 p-2 text-gray-600 dark:text-gray-300 hover:text-orange-500 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="MobileShop Logo" className="h-16 sm:h-20 w-auto object-contain hidden dark:block" />
              <img src="/light.png" alt="MobileShop Logo" className="h-16 sm:h-20 w-auto object-contain block dark:hidden" />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link to="/" className={`font-medium transition-colors ${pathname === '/' ? 'text-orange-500' : 'text-gray-600 dark:text-gray-300 hover:text-orange-500'}`}>Home</Link>
            <Link to="/shop" className={`font-medium transition-colors ${pathname === '/shop' ? 'text-orange-500' : 'text-gray-600 dark:text-gray-300 hover:text-orange-500'}`}>Shop</Link>
            <Link to="/categories" className={`font-medium transition-colors ${pathname === '/categories' ? 'text-orange-500' : 'text-gray-600 dark:text-gray-300 hover:text-orange-500'}`}>Categories</Link>
            <Link to="/contact" className={`font-medium transition-colors ${pathname === '/contact' ? 'text-orange-500' : 'text-gray-600 dark:text-gray-300 hover:text-orange-500'}`}>Contact</Link>
            {mounted && user && (user.role === 'admin' || user.role === 'super_admin') && (
              <Link to="/admin" className={`font-bold transition-colors ${pathname === '/admin' ? 'text-orange-600 dark:text-orange-400' : 'text-orange-500 hover:text-orange-600 dark:hover:text-orange-400'}`}>Admin Panel</Link>
            )}
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xs lg:max-w-md mx-2">
            <SearchBar />
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile Search Button */}
            <button
              onClick={() => setIsMobileSearchOpen(true)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors"
              aria-label="Open search"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <Link to="/wishlist" className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {mounted && wishlistTotal > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {wishlistTotal}
                </span>
              )}
            </Link>
            <Link to="/cart" className="p-2 text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {mounted && totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-orange-500 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link to="/compare" className="p-2 text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              {mounted && compareTotal > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-orange-500 rounded-full">
                  {compareTotal}
                </span>
              )}
            </Link>
            {mounted && isAuthenticated() ? (
              <Link to="/profile" className="flex items-center justify-center w-10 h-10 bg-orange-500/20 text-orange-500 rounded-full font-bold uppercase hover:bg-orange-500/30 transition-colors">
                {user?.name.charAt(0) || 'U'}
              </Link>
            ) : (
              <Link to="/login" className="hidden md:inline-flex bg-orange-500 text-white px-5 py-2 rounded-full font-medium hover:bg-orange-600 transition-all shadow-md hover:shadow-lg hover:shadow-orange-500/20">
                Login
              </Link>
            )}
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Search Modal Overlay */}
        {isMobileSearchOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md md:hidden flex flex-col p-4 animate-in fade-in duration-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-white font-bold text-base flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search Cellx
              </span>
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Close search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="w-full">
              <SearchBar isMobileModal={true} onClose={() => setIsMobileSearchOpen(false)} />
            </div>
          </div>
        )}

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 dark:border-gray-800 space-y-4">
            {/* Search in Drawer */}
            <div className="pb-1">
              <SearchBar onClose={() => setIsMobileMenuOpen(false)} />
            </div>

            <Link onClick={() => setIsMobileMenuOpen(false)} href="/" className={`block font-medium transition-colors ${pathname === '/' ? 'text-orange-500' : 'text-gray-600 dark:text-gray-300 hover:text-orange-500'}`}>Home</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/shop" className={`block font-medium transition-colors ${pathname === '/shop' ? 'text-orange-500' : 'text-gray-600 dark:text-gray-300 hover:text-orange-500'}`}>Shop</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/categories" className={`block font-medium transition-colors ${pathname === '/categories' ? 'text-orange-500' : 'text-gray-600 dark:text-gray-300 hover:text-orange-500'}`}>Categories</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/contact" className={`block font-medium transition-colors ${pathname === '/contact' ? 'text-orange-500' : 'text-gray-600 dark:text-gray-300 hover:text-orange-500'}`}>Contact</Link>
            {mounted && user && (user.role === 'admin' || user.role === 'super_admin') && (
              <Link onClick={() => setIsMobileMenuOpen(false)} href="/admin" className={`block font-bold transition-colors ${pathname === '/admin' ? 'text-orange-600 dark:text-orange-400' : 'text-orange-500 hover:text-orange-600 dark:hover:text-orange-400'}`}>Admin Panel</Link>
            )}

            {/* Mobile Auth Section */}
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              {mounted && isAuthenticated() ? (
                <div className="flex flex-col gap-2">
                  <Link 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    href="/profile" 
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 text-gray-800 dark:text-gray-200"
                  >
                    <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm">
                      {user?.name.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{user?.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2 px-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg text-sm font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  href="/login" 
                  className="flex items-center justify-center w-full bg-orange-500 text-white py-2.5 px-4 rounded-xl font-medium hover:bg-orange-600 transition-all shadow-md shadow-orange-500/20"
                >
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

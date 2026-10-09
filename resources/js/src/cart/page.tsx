"use client";

import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { 
    items, 
    subtotal, 
    discount, 
    deliveryCharge, 
    total, 
    couponCode,
    removeFromCart, 
    updateQuantity, 
    clearCart,
    applyCoupon,
    fetchCart
  } = useCartStore();
  
  const { isAuthenticated } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [couponInput, setCouponInput] = useState('');

  useEffect(() => {
    setMounted(true);
    fetchCart();
  }, [isAuthenticated, fetchCart]);

  if (!mounted) return null;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    if (!isAuthenticated()) {
      alert("Please log in to apply coupons.");
      return;
    }
    await applyCoupon(couponInput);
    setCouponInput('');
    alert("Coupon applied successfully!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-8">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-24 bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-gray-800">
          <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/shop" className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-orange-500 hover:bg-orange-600 shadow-md transition-all">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="lg:w-2/3">
            <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden mb-6">
              <ul className="divide-y divide-gray-800">
                {items.map((item) => (
                  <li key={item.product_id} className="p-6 flex sm:flex-row flex-col gap-6">
                    <div className="w-24 h-24 bg-gray-100 dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-gray-800 flex items-center justify-center flex-shrink-0 p-2 overflow-hidden">
                      {item.image ? (
                        <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL || (process.env.NEXT_PUBLIC_BASE_URL || `${process.env.NEXT_PUBLIC_BASE_URL || 'https://api.cellx.com.bd'}`)}/storage/${item.image}`} alt={item.name} className="w-full h-full object-contain" />
                      ) : (
                        <span className="text-gray-500">No Image</span>
                      )}
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between">
                        <div>
                          <Link to={`/product/${item.slug || item.product_id}`} className="text-lg font-bold text-gray-900 dark:text-white hover:text-orange-500 transition-colors">
                            {item.name}
                          </Link>
                          <p className="text-gray-600 dark:text-gray-400 font-medium mt-1">৳{Number(item.price).toFixed(2)}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.product_id)}
                          className="text-gray-500 hover:text-red-500 transition-colors p-2 h-fit"
                          title="Remove item"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex border border-gray-700 rounded-lg overflow-hidden w-28">
                          <button 
                            onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                            className="px-3 py-1 bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-700 font-bold"
                          >-</button>
                          <input 
                            type="text" 
                            className="w-full text-center bg-transparent border-x border-gray-700 focus:outline-none font-semibold text-gray-900 dark:text-white text-sm" 
                            value={item.quantity} 
                            readOnly 
                          />
                          <button 
                            onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                            className="px-3 py-1 bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-700 font-bold"
                          >+</button>
                        </div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <button 
              onClick={() => clearCart()}
              className="text-red-500 hover:text-red-400 font-medium text-sm transition-colors border border-red-900/50 rounded-lg px-4 py-2 bg-transparent hover:bg-red-900/20 shadow-sm"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400 mb-6 pb-6 border-b border-gray-200 dark:border-gray-800">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900 dark:text-white">৳{Number(subtotal).toFixed(2)}</span>
                </div>
                
                {Number(discount) > 0 && (
                  <div className="flex justify-between text-green-500">
                    <span>Discount {couponCode && `(${couponCode})`}</span>
                    <span className="font-medium">-৳{Number(discount).toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="font-medium text-gray-900 dark:text-white">৳{Number(deliveryCharge).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-end mb-8">
                <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                <span className="text-2xl font-extrabold text-orange-500">৳{Number(total).toFixed(2)}</span>
              </div>
              
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="mb-6 flex gap-2">
                <input 
                  type="text" 
                  placeholder="Coupon code" 
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-[#1a1a1a] border border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-sm placeholder-gray-500"
                />
                <button 
                  type="submit" 
                  className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                >
                  Apply
                </button>
              </form>

              <Link 
                to="/checkout"
                className="w-full block text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-orange-500/30"
              >
                Proceed to Checkout
              </Link>
              
              {!isAuthenticated() && (
                 <p className="mt-4 text-xs text-center text-gray-500">
                   <Link to="/login" className="text-orange-500 hover:underline">Log in</Link> to save your cart and apply specific coupons.
                 </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

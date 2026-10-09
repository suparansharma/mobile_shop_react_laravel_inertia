"use client";

import { useState, useRef, useEffect } from "react";
import { CustomerReviewItem, customerReviewApi } from "@/lib/api/customerReviews";

const DEFAULT_REVIEWS: CustomerReviewItem[] = [
  {
    id: 1,
    name: "তানিয়া আক্তার",
    device: "iPhone 14 Pro",
    image_path: "/reviews/review-1.jpg",
    rating: 5,
    tag: "Verified Buyer",
    review: "Cell X থেকে iPhone 14 Pro নিয়েছি। ফোনের condition একদম ফ্রেশ ছিল, আর এখন পর্যন্ত use করে কোনো সমস্যা পাইনি। Camera আর performance দুটোই চমৎকার।",
    order: 1,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: 2,
    name: "মেহেদী হাসান",
    device: "Google Pixel 8 Pro",
    image_path: "/reviews/review-2.jpg",
    rating: 5,
    tag: "Verified Buyer",
    review: "ফেসবুক পোস্ট দেখে একটু কনফিউজড ছিলাম, কিন্তু শপে এসে ফোন দেখার পর বুঝলাম ওনাদের কোয়ালিটি কেন এতো প্রশংসিত। জেনুইন প্রোডাক্ট ও ভাইদের আচরণ অমায়িক।",
    order: 2,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: 3,
    name: "সাকিব ও আফরিন",
    device: "iPhone 15 & S24 Ultra",
    image_path: "/reviews/review-3.jpg",
    rating: 5,
    tag: "Verified Buyer",
    review: "আমরা একসাথে দুইটা ফ্ল্যাগশিপ ফোন নিলাম। ১০০% জেনুইন গ্যাজেট ও বেস্ট প্রাইস পেয়েছি। ওয়ারেন্টি পলিসি এবং আফটার সেল সার্ভিস অসাধারণ!",
    order: 3,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: 4,
    name: "ফারহানা ইয়াসমিন",
    device: "iPhone 15 Pink",
    image_path: "/reviews/review-4.jpg",
    rating: 5,
    tag: "Verified Buyer",
    review: "ইউজড ফোন কিনতে এসে এমন ফ্রেশ পিঙ্ক কালার কন্ডিশন পাবো ভাবি নাই! ব্যাটারি হেলথ ও ফুল বডি ১০০% আনটাচড ছিল। Cell X-এর সার্ভিস সেরা।",
    order: 4,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: 5,
    name: "মো. নাজমুল হুদা",
    device: "Nexus Flagship",
    image_path: "/reviews/review-5.jpg",
    rating: 5,
    tag: "Verified Buyer",
    review: "সবচেয়ে কম ব্যাটারি সাইকেলের ফোনটা বেছে নেওয়ার সুযোগ পেয়েছি। কোনো হিডেন চার্জ নেই, সরাসরি টেস্ট করে নেওয়ার সুবিধা অনেক ভালো লেগেছে।",
    order: 5,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
];

export default function CustomerReviewsSlider({
  initialReviews,
}: {
  initialReviews?: CustomerReviewItem[];
}) {
  const [reviews, setReviews] = useState<CustomerReviewItem[]>(initialReviews || DEFAULT_REVIEWS);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!initialReviews) {
      customerReviewApi
        .getPublicReviews()
        .then((data) => {
          if (data && data.length > 0) {
            setReviews(data);
          }
        })
        .catch(() => {
          // Keep default fallback
        });
    }
  }, [initialReviews]);

  // Auto smooth scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrameId: number;
    const speed = 0.8; // px per frame

    const step = () => {
      if (!isPaused && container) {
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += speed;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const getImageUrl = (path: string | null) => {
    if (!path) return "/reviews/review-1.jpg";
    if (path.startsWith("http") || path.startsWith("/")) return path;
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "").replace("/api/v1", "");
    return `${baseUrl}/storage/${path}`;
  };

  // Duplicate reviews for seamless continuous infinite scroll loop
  const displayReviews = [...reviews, ...reviews, ...reviews];

  return (
    <section className="py-16 bg-white dark:bg-[#070707] border-t border-gray-200 dark:border-gray-800/80 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-orange-500 font-bold uppercase tracking-widest text-xs">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-1">
              Customer <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-400">Review</span>
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScroll("left")}
              className="p-2.5 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111] text-gray-700 dark:text-gray-300 hover:bg-orange-500 hover:text-white hover:border-orange-500 dark:hover:bg-orange-500 dark:hover:border-orange-500 transition-all shadow-sm"
              aria-label="Previous reviews"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="p-2.5 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111] text-gray-700 dark:text-gray-300 hover:bg-orange-500 hover:text-white hover:border-orange-500 dark:hover:bg-orange-500 dark:hover:border-orange-500 transition-all shadow-sm"
              aria-label="Next reviews"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Infinite Sliding Container */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex gap-6 overflow-x-auto scrollbar-none py-4 select-none cursor-grab active:cursor-grabbing no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayReviews.map((review, index) => (
            <div
              key={`${review.id}-${index}`}
              className="flex-shrink-0 w-[270px] sm:w-[310px] bg-gray-50 dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-gray-800/90 shadow-sm hover:shadow-xl hover:shadow-orange-500/10 hover:border-orange-500/40 transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Customer Photo Box */}
              <div className="w-full aspect-[3/4] relative overflow-hidden bg-gray-200 dark:bg-gray-800">
                <img
                  src={getImageUrl(review.image_path)}
                  alt={review.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Verified Tag */}
                {review.tag && (
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1">
                    <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {review.tag}
                  </div>
                )}

                {/* Orange Quote Circle Overlap */}
                <div className="absolute -bottom-4 left-5 w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/30 z-10">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
              </div>

              {/* Review Content */}
              <div className="p-5 pt-7 flex flex-col justify-between flex-grow">
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Bengali Review Text */}
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-4 italic">
                    "{review.review}"
                  </p>
                </div>

                {/* Author & Device Details */}
                <div className="pt-3 border-t border-gray-200/80 dark:border-gray-800/80 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                      {review.name}
                    </h4>
                    <p className="text-xs text-orange-500 font-medium mt-0.5">
                      {review.device}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

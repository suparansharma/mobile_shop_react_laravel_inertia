"use client";

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HeroBanner } from '@/lib/api/banners';

export default function BannerSlider({ 
  banners, 
  getImageUrl,
  className,
  fallbackImage
}: { 
  banners: HeroBanner[], 
  getImageUrl: (path: string) => string,
  className?: string,
  fallbackImage: string
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    if (!banners || banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000); // 5 seconds per slide
    return () => clearInterval(interval);
  }, [banners]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    } else if (isRightSwipe) {
      setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!banners || banners.length === 0) {
    return (
      <div className={`relative rounded-xl sm:rounded-2xl overflow-hidden group shadow-lg ${className}`}>
        <img 
          src={fallbackImage} 
          alt="Promotion" 
          className="w-full h-full object-cover object-center"
        />
      </div>
    );
  }

  return (
    <div 
      className={`relative rounded-xl sm:rounded-2xl overflow-hidden group shadow-lg select-none ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {banners.map((banner, index) => {
        const isActive = index === currentIndex;
        return (
          <div 
            key={banner.id || index}
            className={`absolute inset-0 transition-opacity duration-1000 ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            {banner.link_url ? (
              <Link to={banner.link_url} className="w-full h-full block">
                <img 
                  src={getImageUrl(banner.image_path)} 
                  alt={banner.title || "Promotion"} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </Link>
            ) : (
              <img 
                src={getImageUrl(banner.image_path)} 
                alt={banner.title || "Promotion"} 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
            )}
          </div>
        );
      })}

      {/* Dots */}
      {banners.length > 1 && (
        <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 flex justify-center gap-1.5 sm:gap-2 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-5 sm:w-6 bg-orange-500' 
                  : 'w-2 sm:w-2.5 bg-white/60 hover:bg-white/90'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

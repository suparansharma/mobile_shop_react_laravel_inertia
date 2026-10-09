"use client";

import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface ProductSearchResult {
  id: number;
  name: string;
  slug: string;
  price: number;
  discount_price: number | null;
  stock: number;
  brand?: { name: string };
  category?: { name: string };
  images?: { image_path: string; is_thumbnail?: boolean }[];
}

const POPULAR_SEARCHES = [
  "iPhone 15",
  "Samsung Galaxy",
  "Used Phone",
  "Smart Watch",
  "AirPods",
  "Charger",
];

export default function SearchBar({
  isMobileModal = false,
  onClose,
}: {
  isMobileModal?: boolean;
  onClose?: () => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useNavigate();
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut Ctrl+K or / to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === "Escape") {
        setIsOpen(false);
        if (onClose) onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Debounced live search
  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
        const res = await fetch(
          `${apiUrl}/products?search=${encodeURIComponent(query.trim())}&per_page=6`
        );
        if (res.ok) {
          const data = await res.json();
          setResults(data.data || []);
        }
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsOpen(false);
    if (onClose) onClose();
    router(`/shop?search=${encodeURIComponent(query.trim())}`);
  };

  const handleItemClick = (slug: string) => {
    setIsOpen(false);
    if (onClose) onClose();
    router(`/product/${slug}`);
  };

  const handlePopularClick = (term: string) => {
    setQuery(term);
    setIsOpen(false);
    if (onClose) onClose();
    router(`/shop?search=${encodeURIComponent(term)}`);
  };

  const getImageUrl = (images?: { image_path: string; is_thumbnail?: boolean }[]) => {
    if (!images || images.length === 0) return "/product-placeholder.png";
    const thumb = images.find((img) => img.is_thumbnail) || images[0];
    const path = thumb.image_path;
    if (path.startsWith("http") || path.startsWith("/")) return path;
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "").replace("/api/v1", "");
    return `${baseUrl}/storage/${path}`;
  };

  return (
    <div ref={searchContainerRef} className={`relative w-full ${isMobileModal ? "" : "max-w-md lg:max-w-lg"}`}>
      {/* Search Input Bar */}
      <form onSubmit={handleSearchSubmit} className="relative flex items-center">
        <div className="absolute left-3.5 text-gray-400 dark:text-gray-500 pointer-events-none">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search gadgets, smartphones, accessories..."
          className="w-full pl-10 pr-24 py-2.5 bg-gray-100 dark:bg-[#181818] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-full border border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-[#141414] focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-sm transition-all shadow-inner"
        />

        {/* Action icons in input */}
        <div className="absolute right-2.5 flex items-center gap-1">
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setResults([]);
                inputRef.current?.focus();
              }}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full"
              aria-label="Clear search"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          <button
            type="submit"
            className="p-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-colors shadow-sm"
            aria-label="Search"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </form>

      {/* Live Dropdown Results */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#141414] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
          {/* While Loading */}
          {loading && (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-orange-500 border-t-transparent"></div>
              <span className="text-xs font-medium">Searching products...</span>
            </div>
          )}

          {/* Results List */}
          {!loading && results.length > 0 && (
            <div>
              <div className="px-4 py-2 bg-gray-50 dark:bg-[#181818] border-b border-gray-100 dark:border-gray-800 text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex justify-between">
                <span>Products ({results.length})</span>
                <span>Instant Match</span>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800/60">
                {results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleItemClick(product.slug)}
                    className="p-3 hover:bg-orange-50/60 dark:hover:bg-orange-950/20 cursor-pointer flex items-center gap-3 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-[#202020] border border-gray-200 dark:border-gray-700 flex items-center justify-center p-1 flex-shrink-0 overflow-hidden">
                      <img
                        src={getImageUrl(product.images)}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate group-hover:text-orange-500 transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">
                        {product.brand?.name} {product.category ? `• ${product.category.name}` : ""}
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p className="text-xs font-bold text-gray-900 dark:text-white">
                        ৳{Number(product.discount_price || product.price).toLocaleString()}
                      </p>
                      {product.discount_price && (
                        <p className="text-[10px] text-gray-400 line-through">
                          ৳{Number(product.price).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* View all results button */}
              <button
                type="button"
                onClick={handleSearchSubmit}
                className="w-full py-2.5 px-4 bg-orange-500/10 hover:bg-orange-500 text-orange-600 hover:text-white dark:text-orange-400 dark:hover:text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5 border-t border-orange-500/20"
              >
                <span>View all results for "{query}"</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          )}

          {/* No Results found */}
          {!loading && query.trim().length >= 2 && results.length === 0 && (
            <div className="p-6 text-center">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                No products found for "{query}"
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Try searching for general keywords like "iPhone", "Samsung", or "Charger"
              </p>
            </div>
          )}

          {/* Popular searches when query is empty */}
          {(!query.trim() || query.trim().length < 2) && (
            <div className="p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => handlePopularClick(term)}
                    className="px-3 py-1 bg-gray-100 hover:bg-orange-100 dark:bg-gray-800 dark:hover:bg-orange-950/40 text-gray-700 hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-400 text-xs rounded-full transition-colors border border-gray-200/60 dark:border-gray-700/60"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

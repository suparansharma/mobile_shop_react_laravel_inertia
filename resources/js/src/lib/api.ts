export const getBaseUrl = (): string => {
  const configuredBaseUrl = 
    (typeof process !== 'undefined' && (process.env?.NEXT_PUBLIC_BASE_URL || process.env?.NEXT_PUBLIC_BACKEND_URL)) ||
    (import.meta.env?.VITE_BASE_URL);

  if (typeof window !== 'undefined') {
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    // On live site, always avoid localhost
    if (!isLocalhost) {
      if (configuredBaseUrl && !configuredBaseUrl.includes('localhost') && !configuredBaseUrl.includes('127.0.0.1')) {
        return configuredBaseUrl.replace(/\/+$/, '');
      }
      return window.location.origin;
    }

    // On local machine dev server (Vite port 5173), route to Laravel backend
    if (window.location.port === '5173') {
      return 'http://127.0.0.1:8000';
    }

    return window.location.origin;
  }

  return (configuredBaseUrl && !configuredBaseUrl.includes('localhost') && !configuredBaseUrl.includes('127.0.0.1'))
    ? configuredBaseUrl.replace(/\/+$/, '')
    : 'http://127.0.0.1:8000';
};

export const getApiUrl = (): string => {
  const configuredApiUrl = 
    (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_URL) ||
    (import.meta.env?.VITE_API_URL);

  if (typeof window !== 'undefined') {
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    // On live site, always avoid localhost
    if (!isLocalhost) {
      if (configuredApiUrl && !configuredApiUrl.includes('localhost') && !configuredApiUrl.includes('127.0.0.1')) {
        return configuredApiUrl.replace(/\/+$/, '');
      }
      return `${window.location.origin}/api/v1`;
    }

    // On local machine dev server
    if (window.location.port === '5173') {
      return 'http://127.0.0.1:8000/api/v1';
    }

    return `${window.location.origin}/api/v1`;
  }

  return (configuredApiUrl && !configuredApiUrl.includes('localhost') && !configuredApiUrl.includes('127.0.0.1'))
    ? configuredApiUrl.replace(/\/+$/, '')
    : 'http://127.0.0.1:8000/api/v1';
};

export const BASE_URL = getBaseUrl();
export const API_URL = getApiUrl();

export async function fetchProducts(params = '') {
  try {
    const res = await fetch(`${API_URL}/products${params}`, {
      next: { revalidate: 60 } // Cache for 60 seconds
    });
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  } catch (error) {
    console.error(error);
    return { data: [] };
  }
}

export async function fetchCategories() {
  try {
    const res = await fetch(`${API_URL}/categories`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchBrands() {
  try {
    const res = await fetch(`${API_URL}/brands`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) throw new Error('Failed to fetch brands');
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchProductDetails(slug: string) {
  try {
    const res = await fetch(`${API_URL}/products/${slug}`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchCategoryDetails(slug: string) {
  try {
    const res = await fetch(`${API_URL}/categories/${slug}`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchBrandDetails(slug: string) {
  try {
    const res = await fetch(`${API_URL}/brands/${slug}`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

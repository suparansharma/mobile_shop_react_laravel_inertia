import { API_URL } from '../api';

const getAuthHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return {
    'Accept': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export interface HeroBanner {
  id: number;
  position: 'main' | 'side_top' | 'side_bottom';
  title: string | null;
  subtitle: string | null;
  image_path: string;
  link_url: string | null;
  button_text: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const bannerApi = {
  // Public
  getPublicBanners: async () => {
    const res = await fetch(`${API_URL}/hero-banners`);
    if (!res.ok) throw new Error('Failed to fetch public banners');
    return res.json();
  },

  // Admin
  getAll: async () => {
    const res = await fetch(`${API_URL}/admin/hero-banners`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch banners');
    return res.json();
  },
  
  getById: async (id: number) => {
    const res = await fetch(`${API_URL}/admin/hero-banners/${id}`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch banner');
    return res.json();
  },
  
  create: async (data: FormData) => {
    const res = await fetch(`${API_URL}/admin/hero-banners`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: data,
    });
    if (!res.ok) throw new Error('Failed to create banner');
    return res.json();
  },
  
  update: async (id: number, data: FormData) => {
    data.append('_method', 'PUT'); // Laravel spoofing for multipart/form-data
    const res = await fetch(`${API_URL}/admin/hero-banners/${id}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: data,
    });
    if (!res.ok) throw new Error('Failed to update banner');
    return res.json();
  },
  
  delete: async (id: number) => {
    const res = await fetch(`${API_URL}/admin/hero-banners/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete banner');
    return res.json();
  },
  
  bulkStatusChange: async (ids: number[], status: boolean) => {
    const res = await fetch(`${API_URL}/admin/hero-banners/bulk-status`, {
      method: 'POST',
      headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids, status }),
    });
    if (!res.ok) throw new Error('Failed to update banner status');
    return res.json();
  },
};

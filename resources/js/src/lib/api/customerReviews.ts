const API_URL = (process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_BASE_URL || 'https://api.cellx.com.bd'}/api/v1`}`);

const getAuthHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return {
    'Accept': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export interface CustomerReviewItem {
  id: number;
  name: string;
  device: string | null;
  image_path: string | null;
  rating: number;
  review: string;
  tag: string | null;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const customerReviewApi = {
  // Public
  getPublicReviews: async (): Promise<CustomerReviewItem[]> => {
    const res = await fetch(`${API_URL}/customer-reviews`);
    if (!res.ok) throw new Error('Failed to fetch customer reviews');
    return res.json();
  },

  // Admin
  getAll: async (): Promise<CustomerReviewItem[]> => {
    const res = await fetch(`${API_URL}/admin/customer-reviews`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch reviews');
    return res.json();
  },
  
  getById: async (id: number): Promise<CustomerReviewItem> => {
    const res = await fetch(`${API_URL}/admin/customer-reviews/${id}`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch review');
    return res.json();
  },
  
  create: async (data: FormData): Promise<{ message: string; review: CustomerReviewItem }> => {
    const res = await fetch(`${API_URL}/admin/customer-reviews`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: data,
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to create review');
    }
    return res.json();
  },
  
  update: async (id: number, data: FormData): Promise<{ message: string; review: CustomerReviewItem }> => {
    data.append('_method', 'PUT'); // Laravel spoofing for multipart/form-data
    const res = await fetch(`${API_URL}/admin/customer-reviews/${id}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: data,
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update review');
    }
    return res.json();
  },
  
  delete: async (id: number): Promise<{ message: string }> => {
    const res = await fetch(`${API_URL}/admin/customer-reviews/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete review');
    return res.json();
  },
  
  bulkStatusChange: async (ids: number[], status: boolean): Promise<{ message: string }> => {
    const res = await fetch(`${API_URL}/admin/customer-reviews/bulk-status`, {
      method: 'POST',
      headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids, status }),
    });
    if (!res.ok) throw new Error('Failed to update status');
    return res.json();
  },

  bulkDelete: async (ids: number[]): Promise<{ message: string }> => {
    const res = await fetch(`${API_URL}/admin/customer-reviews/bulk-delete`, {
      method: 'POST',
      headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids }),
    });
    if (!res.ok) throw new Error('Failed to delete reviews');
    return res.json();
  },
};

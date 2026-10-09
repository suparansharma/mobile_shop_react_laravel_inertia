"use client";

import { useState, useEffect, useRef } from 'react';
import { CustomerReviewItem, customerReviewApi } from '@/lib/api/customerReviews';
import toast from 'react-hot-toast';

export default function CustomerReviewsAdmin() {
  const [reviews, setReviews] = useState<CustomerReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<CustomerReviewItem | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    device: '',
    rating: 5,
    review: '',
    tag: 'Verified Buyer',
    order: 0,
    is_active: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const data = await customerReviewApi.getAll();
      setReviews(data);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (review?: CustomerReviewItem) => {
    if (review) {
      setEditingReview(review);
      setFormData({
        name: review.name,
        device: review.device || '',
        rating: review.rating,
        review: review.review,
        tag: review.tag || 'Verified Buyer',
        order: review.order,
        is_active: review.is_active,
      });
      setImagePreview(getImageUrl(review.image_path));
    } else {
      setEditingReview(null);
      setFormData({
        name: '',
        device: '',
        rating: 5,
        review: '',
        tag: 'Verified Buyer',
        order: (reviews.length + 1),
        is_active: true,
      });
      setImagePreview(null);
    }
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setIsModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImageFile(null);
      setImagePreview(editingReview ? getImageUrl(editingReview.image_path) : null);
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      toast.error('Image file must be less than 3MB');
      e.target.value = '';
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.review.trim()) {
      toast.error('Please enter customer name and review text');
      return;
    }

    setSubmitting(true);
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('device', formData.device);
      data.append('rating', formData.rating.toString());
      data.append('review', formData.review);
      data.append('tag', formData.tag);
      data.append('order', formData.order.toString());
      data.append('is_active', formData.is_active ? '1' : '0');

      if (imageFile) {
        data.append('image', imageFile);
      }

      if (editingReview) {
        await customerReviewApi.update(editingReview.id, data);
        toast.success('Review updated successfully');
      } else {
        await customerReviewApi.create(data);
        toast.success('Review created successfully');
      }

      setIsModalOpen(false);
      fetchReviews();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save review');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this customer review?')) {
      try {
        await customerReviewApi.delete(id);
        toast.success('Review deleted successfully');
        fetchReviews();
      } catch (error: any) {
        toast.error(error.message || 'Failed to delete review');
      }
    }
  };

  const toggleStatus = async (id: number, currentStatus: boolean) => {
    try {
      await customerReviewApi.bulkStatusChange([id], !currentStatus);
      toast.success(`Review ${!currentStatus ? 'activated' : 'deactivated'}`);
      fetchReviews();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update status');
    }
  };

  const handleBulkStatus = async (status: boolean) => {
    if (selectedIds.length === 0) return;
    try {
      await customerReviewApi.bulkStatusChange(selectedIds, status);
      toast.success(`Selected reviews ${status ? 'activated' : 'deactivated'}`);
      setSelectedIds([]);
      fetchReviews();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update status');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (confirm(`Are you sure you want to delete ${selectedIds.length} selected review(s)?`)) {
      try {
        await customerReviewApi.bulkDelete(selectedIds);
        toast.success('Selected reviews deleted');
        setSelectedIds([]);
        fetchReviews();
      } catch (error: any) {
        toast.error(error.message || 'Failed to delete reviews');
      }
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(reviews.map((r) => r.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getImageUrl = (path: string | null) => {
    if (!path) return '/reviews/review-1.jpg';
    if (path.startsWith('http') || path.startsWith('/')) return path;
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || '').replace('/api/v1', '');
    return `${baseUrl}/storage/${path}`;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            Customer Reviews
            <span className="text-xs bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 font-semibold px-2.5 py-0.5 rounded-full">
              {reviews.length} total
            </span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage happy customer photo reviews shown in the homepage sliding testimonial section.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Review
        </button>
      </div>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/50 p-4 rounded-xl flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm font-medium text-orange-900 dark:text-orange-200">
            {selectedIds.length} review(s) selected
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBulkStatus(true)}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold"
            >
              Set Active
            </button>
            <button
              onClick={() => handleBulkStatus(false)}
              className="px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-xs font-semibold"
            >
              Set Inactive
            </button>
            <button
              onClick={handleBulkDelete}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold"
            >
              Delete Selected
            </button>
          </div>
        </div>
      )}

      {/* Reviews Table */}
      {loading ? (
        <div className="flex justify-center items-center py-24 bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-gray-800">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-gray-800 text-gray-500">
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">No customer reviews yet</p>
          <p className="text-sm mt-1">Click "Add New Review" above to add your first customer review.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#111] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-left">
              <thead className="bg-gray-50 dark:bg-[#181818] text-gray-500 dark:text-gray-400 text-xs uppercase font-semibold">
                <tr>
                  <th className="px-5 py-4 w-10">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === reviews.length && reviews.length > 0}
                      onChange={handleSelectAll}
                      className="rounded text-orange-500 focus:ring-orange-500"
                    />
                  </th>
                  <th className="px-5 py-4">Customer Photo</th>
                  <th className="px-5 py-4">Name & Device</th>
                  <th className="px-5 py-4">Review Text</th>
                  <th className="px-5 py-4">Rating</th>
                  <th className="px-5 py-4">Order</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-sm">
                {reviews.map((review) => {
                  const isSelected = selectedIds.includes(review.id);
                  return (
                    <tr
                      key={review.id}
                      className={`hover:bg-gray-50 dark:hover:bg-[#181818]/60 transition-colors ${
                        isSelected ? 'bg-orange-50/50 dark:bg-orange-950/20' : ''
                      }`}
                    >
                      <td className="px-5 py-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectOne(review.id)}
                          className="rounded text-orange-500 focus:ring-orange-500"
                        />
                      </td>
                      <td className="px-5 py-4">
                        <div className="w-14 h-[75px] sm:w-16 sm:h-[85px] aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 relative flex-shrink-0">
                          <img
                            src={getImageUrl(review.image_path)}
                            alt={review.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-5 py-4 font-medium text-gray-900 dark:text-white">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{review.name}</p>
                          {review.device && (
                            <p className="text-xs text-orange-500 font-medium mt-0.5">{review.device}</p>
                          )}
                          {review.tag && (
                            <span className="inline-block mt-1 text-[10px] bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-semibold px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/50">
                              {review.tag}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4 max-w-xs sm:max-w-sm text-gray-600 dark:text-gray-300">
                        <p className="line-clamp-2 italic">"{review.review}"</p>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-0.5 text-amber-400">
                          {[...Array(review.rating)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-600 dark:text-gray-400 font-mono text-xs">
                        #{review.order}
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => toggleStatus(review.id, review.is_active)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                            review.is_active
                              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-700'
                          }`}
                        >
                          {review.is_active ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-5 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenModal(review)}
                            className="p-1.5 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-lg transition-colors"
                            title="Edit Review"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(review.id)}
                            className="p-1.5 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors"
                            title="Delete Review"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-gray-800 rounded-2xl w-full max-w-xl p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingReview ? 'Edit Customer Review' : 'Add New Customer Review'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Customer Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. তানিয়া আক্তার"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                  />
                </div>

                {/* Device / Product */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-1">
                    Device / Product Purchased
                  </label>
                  <input
                    type="text"
                    value={formData.device}
                    onChange={(e) => setFormData({ ...formData, device: e.target.value })}
                    placeholder="e.g. iPhone 14 Pro"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                  />
                </div>
              </div>

              {/* Photo Upload & Preview */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300">
                    Customer Photo
                  </label>
                  <span className="text-[11px] font-semibold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/50 px-2 py-0.5 rounded-md border border-orange-200 dark:border-orange-800/60">
                    Fixed Size: 600 × 800 px (3:4 Portrait)
                  </span>
                </div>
                
                <div className="flex items-start gap-4 p-3.5 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-[#181818]/50">
                  {imagePreview ? (
                    <div className="w-24 h-32 aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-orange-500/50 shadow-sm flex-shrink-0 relative group">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-medium text-center p-1">
                        3:4 Ratio
                      </div>
                    </div>
                  ) : (
                    <div className="w-24 h-32 aspect-[3/4] rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800/60 flex flex-col items-center justify-center text-gray-400 flex-shrink-0 p-2 text-center">
                      <svg className="w-7 h-7 mb-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-[10px] font-medium leading-tight">3:4 Portrait</span>
                    </div>
                  )}
                  
                  <div className="flex-1 space-y-1.5 self-center">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600 cursor-pointer transition-colors"
                    />
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      Standard size: <strong className="text-gray-700 dark:text-gray-200">600×800 px (3:4)</strong>. Uploaded images will be auto-fitted & cropped to this exact ratio.
                    </p>
                  </div>
                </div>
              </div>

              {/* Rating & Tag */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-1">
                    Rating (Stars)
                  </label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                    <option value={2}>⭐⭐ (2 Stars)</option>
                    <option value={1}>⭐ (1 Star)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-1">
                    Badge Tag
                  </label>
                  <input
                    type="text"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    placeholder="e.g. Verified Buyer"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                  />
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-1">
                  Customer Review Feedback *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  placeholder="Enter the customer's comment or quote..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm leading-relaxed"
                />
              </div>

              {/* Order & Active Status */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-semibold uppercase text-gray-600 dark:text-gray-300">
                    Display Order:
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    className="w-20 px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#1a1a1a] text-gray-900 dark:text-white text-xs font-mono"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Is Active</span>
                </label>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl text-sm font-semibold bg-orange-500 hover:bg-orange-600 text-white shadow-md transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editingReview ? 'Update Review' : 'Create Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

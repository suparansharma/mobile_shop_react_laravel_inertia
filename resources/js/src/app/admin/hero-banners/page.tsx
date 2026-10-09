"use client";

import { useState, useEffect } from 'react';
import { HeroBanner, bannerApi } from '@/lib/api/banners';

export default function HeroBannersAdmin() {
  const [banners, setBanners] = useState<HeroBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<HeroBanner | null>(null);

  const [formData, setFormData] = useState({
    position: 'main',
    title: '',
    subtitle: '',
    link_url: '',
    button_text: '',
    is_active: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const data = await bannerApi.getAll();
      setBanners(data);
    } catch (error) {
      console.error('Error fetching banners:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (banner?: HeroBanner) => {
    if (banner) {
      setEditingBanner(banner);
      setFormData({
        position: banner.position,
        title: banner.title || '',
        subtitle: banner.subtitle || '',
        link_url: banner.link_url || '',
        button_text: banner.button_text || '',
        is_active: banner.is_active,
      });
    } else {
      setEditingBanner(null);
      setFormData({
        position: 'main',
        title: '',
        subtitle: '',
        link_url: '',
        button_text: '',
        is_active: true,
      });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImageFile(null);
      return;
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const isMain = formData.position === 'main';
      const requiredWidth = isMain ? 1200 : 600;
      const requiredHeight = isMain ? 500 : 400;

      if (img.width !== requiredWidth || img.height !== requiredHeight) {
        alert(`Image size must be exactly ${requiredWidth}x${requiredHeight} pixels for this position. Your image is ${img.width}x${img.height} pixels.`);
        e.target.value = ''; // clear the input
        setImageFile(null);
      } else {
        setImageFile(file);
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      alert('Invalid image file.');
      e.target.value = '';
      setImageFile(null);
    };
    img.src = objectUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('position', formData.position);
      data.append('title', formData.title);
      data.append('subtitle', formData.subtitle);
      data.append('link_url', formData.link_url);
      data.append('button_text', formData.button_text);
      data.append('is_active', formData.is_active ? '1' : '0');
      
      if (imageFile) {
        data.append('image', imageFile);
      }

      if (editingBanner) {
        await bannerApi.update(editingBanner.id, data);
      } else {
        await bannerApi.create(data);
      }
      
      setIsModalOpen(false);
      fetchBanners();
    } catch (error) {
      console.error('Error saving banner:', error);
      alert('Error saving banner');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this banner?')) {
      try {
        await bannerApi.delete(id);
        fetchBanners();
      } catch (error) {
        console.error('Error deleting banner:', error);
      }
    }
  };

  const toggleStatus = async (id: number, currentStatus: boolean) => {
    try {
      await bannerApi.bulkStatusChange([id], !currentStatus);
      fetchBanners();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Hero Banners</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Add New Banner
        </button>
      </div>

      {loading ? (
        <div className="text-gray-500 dark:text-gray-400">Loading banners...</div>
      ) : (
        <div className="bg-white dark:bg-[#111] rounded-lg shadow border border-gray-200 dark:border-gray-800 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 dark:bg-[#1a1a1a]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {banners.map((banner) => (
                <tr key={banner.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') + '/storage/' + banner.image_path}
                      alt={banner.title || 'Banner'}
                      className="h-16 w-24 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                      {banner.position.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {banner.title || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleStatus(banner.id, banner.is_active)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        banner.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {banner.is_active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleOpenModal(banner)}
                      className="text-indigo-400 hover:text-indigo-300 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(banner.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {banners.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    No banners found. Add one to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-lg p-6 w-full max-w-xl">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {editingBanner ? 'Edit Banner' : 'Add New Banner'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Position *</label>
                <select
                  value={formData.position}
                  onChange={(e) => {
                    setFormData({ ...formData, position: e.target.value });
                    setImageFile(null);
                    const fileInput = document.getElementById('banner-image-upload') as HTMLInputElement;
                    if (fileInput) fileInput.value = '';
                  }}
                  className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-gray-300 rounded-md py-2 px-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-orange-500"
                  required
                >
                  <option value="main">Main Banner (Left)</option>
                  <option value="side_top">Side Banner (Top Right)</option>
                  <option value="side_bottom">Side Banner (Bottom Right)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-gray-300 rounded-md py-2 px-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subtitle / Special Offer Text</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-gray-300 rounded-md py-2 px-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Link URL</label>
                <input
                  type="text"
                  value={formData.link_url}
                  onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-gray-300 rounded-md py-2 px-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-orange-500"
                  placeholder="/shop or /categories/phones"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Button Text</label>
                <input
                  type="text"
                  value={formData.button_text}
                  onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-gray-300 rounded-md py-2 px-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-orange-500"
                  placeholder="e.g. Shop Now"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image {editingBanner ? '' : '*'}</label>
                <input
                  id="banner-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-gray-300 rounded-md py-2 px-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-orange-500"
                  required={!editingBanner}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Required size: {formData.position === 'main' ? '1200x500' : '600x400'} pixels.
                </p>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded bg-gray-50 dark:bg-[#1a1a1a]"
                />
                <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Active
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:text-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

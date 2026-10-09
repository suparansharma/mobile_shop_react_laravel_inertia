"use client";

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import Swal from 'sweetalert2';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const { token } = useAuthStore();

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/orders${statusFilter ? `?status=${statusFilter}` : ''}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data.data || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(`${API_URL}/admin/orders/${id}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ order_status: newStatus })
      });
      
      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Order status updated',
          showConfirmButton: false,
          timer: 1500
        });
        // Update local state instead of refetching everything to be faster
        setOrders(orders.map((o: any) => o.id === id ? { ...o, order_status: newStatus } : o));
      } else {
        throw new Error(data.message || 'Failed to update status');
      }
    } catch (error: any) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  const getStatusBadge = (status: string) => {
    const classes = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500',
      confirmed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500',
      processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500',
      shipping: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-500',
      delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500',
      cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500',
      returned: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    }[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';

    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full uppercase ${classes}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Order Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">View and manage all customer orders in one place.</p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-[#1a1a1a] p-2 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
          <svg className="w-5 h-5 text-gray-400 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border-none bg-transparent focus:ring-0 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer outline-none"
          >
            <option value="">All Orders</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipping">Shipping</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
            <option value="returned">Returned</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="relative w-16 h-16">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-orange-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
          </div>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white dark:bg-[#111] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-12 text-center flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Orders Found</h3>
          <p className="text-gray-500 dark:text-gray-400">There are no orders matching your current filter.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#111] shadow-sm rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-50 dark:bg-[#1a1a1a]">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order & Date</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Payment</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-[#111] divide-y divide-gray-100 dark:divide-gray-800">
                {orders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/admin/orders/${order.id}`} className="text-sm font-black text-orange-500 hover:text-orange-600 transition-colors">
                        #{order.order_number}
                      </Link>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">{order.customer_name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{order.customer_phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
                        {order.payment_method === 'cod' ? 'COD' : order.payment_method}
                      </div>
                      <span className={`inline-flex mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        order.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.payment_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900 dark:text-gray-100">
                        ৳{Number(order.total_amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-2 items-start">
                        {getStatusBadge(order.order_status)}
                        <div className="relative">
                          <select 
                            value={order.order_status}
                            onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                            className="appearance-none bg-gray-50 dark:bg-[#222] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-md py-1.5 pl-3 pr-8 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent transition-all cursor-pointer"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="processing">Processing</option>
                            <option value="shipping">Shipping</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="returned">Returned</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/admin/orders/${order.id}`} className="text-gray-400 hover:text-orange-500 transition-colors p-2 bg-gray-50 dark:bg-gray-800 rounded-lg inline-flex group-hover:bg-orange-50 dark:group-hover:bg-orange-900/20">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

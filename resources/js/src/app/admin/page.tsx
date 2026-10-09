"use client";

import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { API_URL } from "@/lib/api";

export default function AdminDashboard() {
  const token = useAuthStore((state) => state.token);
  const [stats, setStats] = useState({
    total_revenue: 0,
    active_orders: 0,
    total_customers: 0,
    low_stock_items: 0,
  });

  useEffect(() => {
    // We can also fallback to localStorage if token state isn't populated immediately
    const authToken = token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
    if (!authToken) return;
    
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_URL}/admin_secure/dashboard/stats`, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Accept': 'application/json'
          }
        });
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      }
    };
    
    fetchStats();
  }, [token]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Revenue", value: `৳${Number(stats.total_revenue).toLocaleString()}`, color: "text-green-600", bg: "bg-green-100" },
          { title: "Active Orders", value: Number(stats.active_orders).toLocaleString(), color: "text-orange-500", bg: "bg-orange-900" },
          { title: "Total Customers", value: Number(stats.total_customers).toLocaleString(), color: "text-orange-500", bg: "bg-orange-900" },
          { title: "Low Stock Items", value: Number(stats.low_stock_items).toLocaleString(), color: "text-red-600", bg: "bg-red-100" }
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-[#111] p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.title}</h3>
              <div className={`w-8 h-8 rounded-full ${stat.bg} flex items-center justify-center`}>
                <div className={`w-2 h-2 rounded-full ${stat.color.replace('text', 'bg')}`}></div>
              </div>
            </div>
            <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#111] rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Recent Activity</h2>
          <Link to="/admin/orders" className="text-sm text-orange-500 hover:text-orange-700 font-medium">View all orders &rarr;</Link>
        </div>
        <p className="text-gray-500 dark:text-gray-400">Welcome to the Admin Dashboard. Navigate to the Orders tab to manage customer orders.</p>
      </div>
    </div>
  );
}

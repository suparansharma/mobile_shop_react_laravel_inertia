<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\User;
use App\Models\Product;

class DashboardController extends Controller
{
    public function stats()
    {
        // Total Revenue (excluding cancelled orders)
        $totalRevenue = Order::where('status', '!=', 'cancelled')->sum('total_amount');
        
        // Active Orders (assuming statuses like pending, processing, shipped)
        $activeOrders = Order::whereIn('status', ['pending', 'processing', 'shipped'])->count();
        
        // Total Customers
        $totalCustomers = User::where('role', 'user')->count();
        
        // Low Stock Items (assuming stock <= 5)
        $lowStockItems = Product::where('stock', '<=', 5)->count();
        
        return response()->json([
            'total_revenue' => $totalRevenue ?? 0,
            'active_orders' => $activeOrders ?? 0,
            'total_customers' => $totalCustomers ?? 0,
            'low_stock_items' => $lowStockItems ?? 0
        ]);
    }
}

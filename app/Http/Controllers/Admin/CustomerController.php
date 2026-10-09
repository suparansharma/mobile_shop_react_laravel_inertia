<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = User::where('role', 'user')
            ->withCount('orders')
            ->orderBy('id', 'desc')
            ->get()
            ->map(function ($user) {
                $user->total_spent = $user->orders()->whereNotIn('order_status', ['cancelled', 'returned'])->sum('total_amount');
                return $user;
            });
            
        return response()->json([
            'status' => 'success',
            'data' => $customers
        ]);
    }
}

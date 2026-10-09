<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CustomerReview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Str;

class CustomerReviewController extends Controller
{
    public function index()
    {
        $reviews = CustomerReview::orderBy('order', 'asc')->orderBy('created_at', 'desc')->get();
        return response()->json($reviews);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'device' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:3072',
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'required|string',
            'tag' => 'nullable|string|max:100',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $data = $request->except('image');
        
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = Str::random(40) . '.jpg';
            $fullPath = 'customer_reviews/' . $filename;
            
            if (!Storage::disk('public')->exists('customer_reviews')) {
                Storage::disk('public')->makeDirectory('customer_reviews');
            }
            
            // Auto fit and crop to 3:4 aspect ratio (600x800 px)
            $image = Image::make($file)->fit(600, 800, function ($constraint) {
                $constraint->upsize();
            });
            
            Storage::disk('public')->put($fullPath, (string) $image->encode('jpg', 90));
            $data['image_path'] = $fullPath;
        }

        $review = CustomerReview::create($data);

        return response()->json([
            'message' => 'Customer review created successfully',
            'review' => $review
        ], 201);
    }

    public function show($id)
    {
        $review = CustomerReview::findOrFail($id);
        return response()->json($review);
    }

    public function update(Request $request, $id)
    {
        $review = CustomerReview::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'device' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:3072',
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'required|string',
            'tag' => 'nullable|string|max:100',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            // Delete previous image if exists
            if ($review->image_path && Storage::disk('public')->exists($review->image_path)) {
                Storage::disk('public')->delete($review->image_path);
            }
            
            $file = $request->file('image');
            $filename = Str::random(40) . '.jpg';
            $fullPath = 'customer_reviews/' . $filename;
            
            if (!Storage::disk('public')->exists('customer_reviews')) {
                Storage::disk('public')->makeDirectory('customer_reviews');
            }
            
            // Auto fit and crop to 3:4 aspect ratio (600x800 px)
            $image = Image::make($file)->fit(600, 800, function ($constraint) {
                $constraint->upsize();
            });
            
            Storage::disk('public')->put($fullPath, (string) $image->encode('jpg', 90));
            $data['image_path'] = $fullPath;
        }

        $review->update($data);

        return response()->json([
            'message' => 'Customer review updated successfully',
            'review' => $review
        ]);
    }

    public function destroy($id)
    {
        $review = CustomerReview::findOrFail($id);
        
        if ($review->image_path && Storage::disk('public')->exists($review->image_path)) {
            Storage::disk('public')->delete($review->image_path);
        }
        
        $review->delete();

        return response()->json(['message' => 'Customer review deleted successfully']);
    }

    public function bulkStatusChange(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'status' => 'required|boolean'
        ]);

        CustomerReview::whereIn('id', $request->ids)->update(['is_active' => $request->status]);

        return response()->json(['message' => 'Customer reviews status updated successfully']);
    }

    public function bulkDelete(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
        ]);

        $reviews = CustomerReview::whereIn('id', $request->ids)->get();
        foreach ($reviews as $review) {
            if ($review->image_path && Storage::disk('public')->exists($review->image_path)) {
                Storage::disk('public')->delete($review->image_path);
            }
            $review->delete();
        }

        return response()->json(['message' => 'Selected reviews deleted successfully']);
    }
}

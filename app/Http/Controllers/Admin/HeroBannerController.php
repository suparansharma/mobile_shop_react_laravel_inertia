<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroBanner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HeroBannerController extends Controller
{
    public function index()
    {
        $banners = HeroBanner::orderBy('created_at', 'desc')->get();
        return response()->json($banners);
    }

    public function store(Request $request)
    {
        $request->validate([
            'position' => 'required|string|in:main,side_top,side_bottom',
            'title' => 'nullable|string',
            'subtitle' => 'nullable|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'link_url' => 'nullable|string',
            'button_text' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $data = $request->except('image');
        
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('hero_banners', 'public');
            $data['image_path'] = $path;
        }

        $banner = HeroBanner::create($data);

        return response()->json(['message' => 'Banner created successfully', 'banner' => $banner]);
    }

    public function show($id)
    {
        $banner = HeroBanner::findOrFail($id);
        return response()->json($banner);
    }

    public function update(Request $request, $id)
    {
        $banner = HeroBanner::findOrFail($id);

        $request->validate([
            'position' => 'required|string|in:main,side_top,side_bottom',
            'title' => 'nullable|string',
            'subtitle' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'link_url' => 'nullable|string',
            'button_text' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            // Delete old image
            if ($banner->image_path && Storage::disk('public')->exists($banner->image_path)) {
                Storage::disk('public')->delete($banner->image_path);
            }
            
            $path = $request->file('image')->store('hero_banners', 'public');
            $data['image_path'] = $path;
        }

        $banner->update($data);

        return response()->json(['message' => 'Banner updated successfully', 'banner' => $banner]);
    }

    public function destroy($id)
    {
        $banner = HeroBanner::findOrFail($id);
        
        if ($banner->image_path && Storage::disk('public')->exists($banner->image_path)) {
            Storage::disk('public')->delete($banner->image_path);
        }
        
        $banner->delete();

        return response()->json(['message' => 'Banner deleted successfully']);
    }

    public function bulkStatusChange(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'status' => 'required|boolean'
        ]);

        HeroBanner::whereIn('id', $request->ids)->update(['is_active' => $request->status]);

        return response()->json(['message' => 'Banners status updated successfully']);
    }
}

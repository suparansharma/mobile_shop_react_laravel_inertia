<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CustomerReview;

class CustomerReviewSeeder extends Seeder
{
    public function run()
    {
        CustomerReview::truncate();
            CustomerReview::create([
                'name' => 'তানিয়া আক্তার',
                'device' => 'iPhone 14 Pro',
                'image_path' => 'customer_reviews/review-1.jpg',
                'rating' => 5,
                'tag' => 'Verified Buyer',
                'review' => 'Cell X থেকে iPhone 14 Pro নিয়েছি। ফোনের condition একদম ফ্রেশ ছিল, আর এখন পর্যন্ত use করে কোনো সমস্যা পাইনি। Camera আর performance দুটোই চমৎকার।',
                'order' => 1,
                'is_active' => true,
            ]);
            CustomerReview::create([
                'name' => 'মেহেদী হাসান',
                'device' => 'Google Pixel 8 Pro',
                'image_path' => 'customer_reviews/review-2.jpg',
                'rating' => 5,
                'tag' => 'Verified Buyer',
                'review' => 'ফেসবুক পোস্ট দেখে একটু কনফিউজড ছিলাম, কিন্তু শপে এসে ফোন দেখার পর বুঝলাম ওনাদের কোয়ালিটি কেন এতো প্রশংসিত। জেনুইন প্রোডাক্ট ও ভাইদের আচরণ অমায়িক।',
                'order' => 2,
                'is_active' => true,
            ]);
            CustomerReview::create([
                'name' => 'সাকিব ও আফরিন',
                'device' => 'iPhone 15 & S24 Ultra',
                'image_path' => 'customer_reviews/review-3.jpg',
                'rating' => 5,
                'tag' => 'Verified Buyer',
                'review' => 'আমরা একসাথে দুইটা ফ্ল্যাগশিপ ফোন নিলাম। ১০০% জেনুইন গ্যাজেট ও বেস্ট প্রাইস পেয়েছি। ওয়ারেন্টি পলিসি এবং আফটার সেল সার্ভিস অসাধারণ!',
                'order' => 3,
                'is_active' => true,
            ]);
            CustomerReview::create([
                'name' => 'ফারহানা ইয়াসমিন',
                'device' => 'iPhone 15 Pink',
                'image_path' => 'customer_reviews/review-4.jpg',
                'rating' => 5,
                'tag' => 'Verified Buyer',
                'review' => 'ইউজড ফোন কিনতে এসে এমন ফ্রেশ পিঙ্ক কালার কন্ডিশন পাবো ভাবি নাই! ব্যাটারি হেলথ ও ফুল বডি ১০০% আনটাচড ছিল। Cell X-এর সার্ভিস সেরা।',
                'order' => 4,
                'is_active' => true,
            ]);
        CustomerReview::create([
            'name' => 'মো. নাজমুল হুদা',
            'device' => 'Nexus Flagship',
            'image_path' => 'customer_reviews/review-5.jpg',
            'rating' => 5,
            'tag' => 'Verified Buyer',
            'review' => 'সবচেয়ে কম ব্যাটারি সাইকেলের ফোনটা বেছে নেওয়ার সুযোগ পেয়েছি। কোনো হিডেন চার্জ নেই, সরাসরি টেস্ট করে নেওয়ার সুবিধা অনেক ভালো লেগেছে।',
            'order' => 5,
            'is_active' => true,
        ]);
    }
}

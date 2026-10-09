<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerReview extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'device',
        'image_path',
        'rating',
        'review',
        'tag',
        'order',
        'is_active',
    ];

    protected $casts = [
        'rating' => 'integer',
        'is_active' => 'boolean',
        'order' => 'integer',
    ];
}

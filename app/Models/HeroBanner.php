<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeroBanner extends Model
{
    use HasFactory;

    protected $fillable = [
        'position',
        'title',
        'subtitle',
        'image_path',
        'link_url',
        'button_text',
        'is_active',
    ];
}

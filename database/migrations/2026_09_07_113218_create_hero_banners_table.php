<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHeroBannersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hero_banners', function (Blueprint $table) {
            $table->id();
            $table->string('position')->comment('main, side_top, side_bottom');
            $table->string('title')->nullable();
            $table->string('subtitle')->nullable();
            $table->string('image_path');
            $table->string('link_url')->nullable();
            $table->string('button_text')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('hero_banners');
    }
}

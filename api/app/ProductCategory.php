<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'description', 'img'
    ];

    protected function categories()
    {
        return $this->belongsTo('App\ProductCategory', 'category_id');
    }

    protected function subCategories()
    {
        return $this->hasMany('App\ProductCategory', 'category_id');
    }
}

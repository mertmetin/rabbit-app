<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'description', 'price', 'category', 'img'
    ];

    protected function category()
    {
        return $this->belongsTo('App\ProductCategory', 'id');
    }
}

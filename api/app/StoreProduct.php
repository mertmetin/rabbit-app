<?php

namespace App;

use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Model;

class StoreProduct extends Model
{
    use Searchable;

    public function product()
    {
        return $this->belongsTo('App\Product');
    }
}

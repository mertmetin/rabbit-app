<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\AddressType;

class UserAddress extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'users_addresses';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 
        'description', 
        'main_text', 
        'secondary_text', 
        'apt_suite_floor', 
        'business_or_building_name', 
        'address_type', 
        'place_id',
        'lng',
        'lat'
    ];

    public function address_type()
    {
        return $this->belongsTo(AddressType::class, 'address_type');
    }
}
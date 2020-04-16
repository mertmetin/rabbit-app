<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StripeCard extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id', 'customer_id', 'fingerprint', 'last4', 'exp_month', 'exp_year', 'brand'
    ];
}

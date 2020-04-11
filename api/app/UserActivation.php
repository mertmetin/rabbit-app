<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserActivation extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'users_activations';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'token'
    ];
}

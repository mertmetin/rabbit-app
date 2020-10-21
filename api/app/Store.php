<?php

namespace App;

use TCG\Voyager\Traits\Spatial;
use Grimzy\LaravelMysqlSpatial\Eloquent\SpatialTrait;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    use Spatial;
    use SpatialTrait;

    protected $spatial = ['coordinates'];    

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name'
    ];

    protected $spatialFields = [
        'coordinates'
    ];

}    

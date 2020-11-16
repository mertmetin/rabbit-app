<?php

namespace App\Http\Controllers\Store;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Store;

class StoreController extends Controller
{
    protected function getStore(Request $request)
    {
        if (!$request->filled('address'))
            throw new \Exception('Invalid request.');

        $stores = Store::all();
        $address = $request->input('address');
        $addressLat = $address['lat'];
        $addressLng = $address['lng'];

        foreach ($stores as $key => $store) {
            $storeLat = $store['coordinates']->getLat();
            $storeLng = $store['coordinates']->getLng();
            $dist = $this->getDistance($storeLat, $storeLng, $addressLat, $addressLng);

            if ($dist < 10) {

                return [
                    'id' => $store['id'],
                    'latitude' => $storeLat, 
                    'longitude' => $storeLng
                ];
            }
        }

        return false;
    }

    function getDistance($latitude1, $longitude1, $latitude2, $longitude2) {  
        $earth_radius = 6371;  
      
        $dLat = deg2rad($latitude2 - $latitude1);  
        $dLon = deg2rad($longitude2 - $longitude1);  
        
        $a = sin($dLat/2) * sin($dLat/2) + cos(deg2rad($latitude1)) * cos(deg2rad($latitude2)) * sin($dLon/2) * sin($dLon/2);  
        $c = 2 * asin(sqrt($a));  
        $d = $earth_radius * $c;  
      
        return $d;  
}  
}

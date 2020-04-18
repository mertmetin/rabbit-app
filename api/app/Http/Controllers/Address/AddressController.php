<?php

namespace App\Http\Controllers\Address;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\UserAddress;
use App\AddressType;

class AddressController extends Controller
{
    protected function add(Request $request)
    {   
        if (!$request->filled('userId', 'address', 'placeId'))
            throw new \Exception('Invalid request.');

        $userId = $request->input('userId');
        $address = $request->input('address');
        $placeId = $request->input('placeId');

        $userAddress = UserAddress::where('user_id', $userId)
                ->where('place_id', $placeId)
                ->get()->last();

        if ($userAddress)
            throw new \Exception('This address is already added.');
        
        // Later, this will be changed.
        $type = AddressType::where('type', 'home')->get()->last();

        $result = UserAddress::create([
            'user_id' => $userId,
            'address' => $address,
            'address_type' => $type->id,
            'place_id' => $placeId
        ]);

        $result;
    }
}

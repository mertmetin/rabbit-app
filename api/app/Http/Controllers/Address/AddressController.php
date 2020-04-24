<?php

namespace App\Http\Controllers\Address;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\UserAddress;
use App\AddressType;

class AddressController extends Controller
{
    protected function get(Request $request)
    {
        if (!$request->filled('userId'))
            throw new \Exception('Invalid request.');

        $userId = $request->input('userId');
        $userAddresses = UserAddress::where('user_id', $userId)->get();

        return $userAddresses;
    }

    protected function add(Request $request)
    {   
        if (!$request->filled('userId', 'address'))
            throw new \Exception('Invalid request.');

        $userId = $request->input('userId');
        $address = $request->input('address');
        error_log(json_encode($address));
        $placeId = $address['place_id'];

        $userAddress = UserAddress::where('user_id', $userId)
                ->where('place_id', $placeId)
                ->get()->last();

        if ($userAddress)
            throw new \Exception('This address is already added.');
        
        // Later, this will be changed.
        $type = AddressType::where('type', 'home')->get()->last();

        $result = UserAddress::create([
            'user_id' => $userId,
            'place_id' => $placeId,
            'description' => $address['description'],
            'main_text' => $address['main_text'],
            'secondary_text' => $address['secondary_text'],
            'address_type' => $type->id,
        ]);

        $result;
    }
}

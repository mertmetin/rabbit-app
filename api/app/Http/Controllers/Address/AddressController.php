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
        // $use = UserAddress::with('address_type')
                //   ->find('19');
        //   error_log(json_encode(UserAddress::with('AddressTypes')));
        // try {
        //     error_log(json_encode(UserAddress::find(19)->addressTypes->type));
        // } catch (\Exception $e) {
        //     error_log($e);
        // }
        $userAddresses = UserAddress::with('address_type')->where('user_id', $userId)->get();

        return $userAddresses;
    }

    protected function add(Request $request)
    {   
        if (!$request->filled('userId', 'address'))
            throw new \Exception('Invalid request.');

        $userId = $request->input('userId');
        $address = $request->input('address');
        $placeId = $address['place_id'];

        $userAddress = UserAddress::where('user_id', $userId)
                ->where('place_id', $placeId)
                ->get()->last();

        if ($userAddress)
            throw new \Exception('This address is already added.');
        
        $type = AddressType::where('type', $address['address_type'])->get()->last();

        $result = UserAddress::create([
            'user_id' => $userId,
            'place_id' => $placeId,
            'description' => $address['description'],
            'main_text' => $address['main_text'],
            'secondary_text' => $address['secondary_text'],
            'apt_suite_floor' => $address['apt_suite_floor'],
            'business_or_building_name' => $address['business_or_building_name'],
            'address_type' => $type->id,
            'lng' => $address['lng'],
            'lat' => $address['lat']
        ]);

        $result;
    }

    protected function edit(Request $request)
    {   
        if (!$request->filled('userId', 'address'))
            throw new \Exception('Invalid request.');

        $userId = $request->input('userId');
        $address = $request->input('address');

        $dbUser = UserAddress::where('user_id', $userId)->where('place_id', $address['place_id'])->first();
        $address['user_id'] = $userId;

        return $dbUser->update($address);
    }

    protected function delete(Request $request)
    {
        if (!$request->filled('id', 'userId'))
            throw new \Exception('Invalid request.');

        $userId = $request->input('userId');
        $addressId = $request->input('id');
        $userAddress = UserAddress::where('user_id', $userId)
                ->where('id', $addressId)
                ->get()->last();

        if (!$userAddress)
            throw new \Exception('This address is already deleted');

        $userAddress = UserAddress::find($addressId);

        return $userAddress->delete();
    }
}

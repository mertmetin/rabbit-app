<?php

namespace App\Http\Controllers\Address;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\AddressType;

class AddressTypesController extends Controller
{
    protected function get(Request $request)
    {
        return AddressType::all();
    }
}

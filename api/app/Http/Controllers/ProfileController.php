<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function getAuthUser()
    {
        if (\Auth::check())
            return \Auth::user();

        return false;
    }
}

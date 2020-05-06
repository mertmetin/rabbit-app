<?php

namespace App\Http\Controllers\Promotions;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Promotion;

class PromotionsController extends Controller
{
    protected function get(Request $request)
    {
        return Promotion::all();
    }
}

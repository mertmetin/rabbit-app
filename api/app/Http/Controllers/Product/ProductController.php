<?php

namespace App\Http\Controllers\Product;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Product;

class ProductController extends Controller
{
    protected function get(Request $request)
    {
        if (!$request->filled('category'))
            throw new \Exception('Invalid request.');

        $category = $request->input('category');
        $products = Product::where('category', $category)->get();

        return $products;
    }
}

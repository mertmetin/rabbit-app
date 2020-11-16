<?php

namespace App\Http\Controllers\Product;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Product;
use App\ProductCategory;

class ProductController extends Controller
{
    protected function get(Request $request)
    {
        if (!$request->filled('category'))
            throw new \Exception('Invalid request.');

        $category = $request->input('category');

        $productCategories = ProductCategory::find($category)->subCategories;

        foreach ($productCategories as $key => &$productCategory)
        {
            $products = Product::where('category', $productCategory['id'])->get();
            $productCategories[$key]['data'] = [$products];
        }

        return $productCategories;
    }
}

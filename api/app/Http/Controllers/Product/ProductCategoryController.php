<?php

namespace App\Http\Controllers\Product;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\ProductCategory;

class ProductCategoryController extends Controller
{
    protected function get(Request $request)
    {
        if ($request->input('withSubCategories'))
            return ProductCategory::all();

        return ProductCategory::where('category_id', null)->get();
    }

    protected function getSubCategories(Request $request)
    {
        if (!$request->filled('category'))
            throw new \Exception('Invalid request.');

        $category = $request->input('category');

        return ProductCategory::find($category)->subCategories;
    }
}

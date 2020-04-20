<?php

namespace App\Http\Controllers\Product;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\ProductCategory;

class ProductCategoryController extends Controller
{
    protected function get()
    {
        return ProductCategory::all();
    }
}

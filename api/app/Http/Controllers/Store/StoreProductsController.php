<?php

namespace App\Http\Controllers\Store;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\StoreProduct;
use App\Product;
use App\ProductCategory;
use Illuminate\Support\Facades\DB;
use \Exception;

class StoreProductsController extends Controller
{
    protected function getStoreProductCategories(Request $request)
    {
        $storeId = $request->input('storeId');

        if (!$storeId)
            throw new Exception('Invalid request.');
        
        $storeProducts = StoreProduct::where('store_id', $storeId)->get();

        $categories = [];

        foreach ($storeProducts as $storeProduct)
        {
            $categoryId = $storeProduct->product['category'];
            $category = ProductCategory::find($categoryId);

            while($category->parent) {
                $subCategory = $category;
                $category = ProductCategory::find($category->parent['id']);
            }

            $categoryId = $category['id'];

            if (empty($categories[$categoryId])) {
                $categories[$categoryId] =  $category->toArray();
                $categories[$categoryId]['subcategories'] = [];
            }

            $subCategoryId = $subCategory['id'];
            $subCategories = $categories[$categoryId]['subcategories'];
            
            if (empty($subCategories[$subCategoryId]))
                $categories[$categoryId]['subcategories'][$subCategoryId] = $subCategory->toArray();
        }

        return $categories;
    }

    protected function getStoreProducts(Request $request)
    {
        $category = $request->input('category');
        $storeId =  $request->input('storeId');

        if (!$category || !$storeId)
            throw new Exception('Invalid request.');


        $storeProducts = StoreProduct::
                where('store_id', $storeId)->with('product')->get();

        if ($storeProducts->isEmpty())
            return;

        $categoryIds = ProductCategory::find($category)
            ->subCategories->pluck('id')->toArray();

        $products = [];

        foreach ($storeProducts as $storeProduct)
        {
            $product = $storeProduct->product;
            $category = $product->category;

            if (!in_array($category, $categoryIds))
                continue;

            if (empty($products[$category]))
            {
                $products[$category] = ProductCategory::where('id', $category)->first()->toArray();
                $products[$category]['data'] = [[]];
            }
            
            $products[$category]['data'] [0][]= $product;
        }

        return array_values($products);
    }
}
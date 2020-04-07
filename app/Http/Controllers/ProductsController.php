<?php

namespace App\Http\Controllers;

use App\Category;
use App\Http\Controllers\Controller;
use App\Product;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    public function index($id)
    {
        $category = Category::get();
        $product = Product::where('id', $id)->get()->first();
        return view('products', compact('category', 'product'));
    }
}

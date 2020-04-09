<?php

namespace App\Http\Controllers;

use App\Category;
use App\Http\Controllers\Controller;
use App\Product;
use Illuminate\Http\Request;

class CatalogController extends Controller
{
    public function index()
    {
        $category = Category::get();
        $products = Product::paginate(1);
        return view('catalog', compact('category', 'products'));
    }
}

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
        $category = Category::where('category_id', null)->get();
        $products = Product::with('images')->paginate(40);
        return view('catalog', compact('category', 'products'));
    }
}

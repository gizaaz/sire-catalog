<?php

namespace App\Http\Controllers;

use App\Category;
use App\Product;
use Illuminate\Http\Request;

class WelcomeController extends Controller
{
    public function index()
    {
        $category = Category::where('category_id', null)->get();
        $products = Product::with('images')->get();
        return view('index' , compact('category', 'products'));
    }
}

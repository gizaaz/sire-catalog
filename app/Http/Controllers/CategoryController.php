<?php

namespace App\Http\Controllers;

use App\Category;
use App\Product;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index($id)
    {
        $category = Category::where('category_id', null)->get();
        $categor = Category::where('id', $id)->get()->first();
        $products = Product::with('images')->where('category_id', $id)->paginate(40);
        return view('category', compact('category', 'categor', 'products'));
    }
}

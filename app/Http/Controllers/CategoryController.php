<?php

namespace App\Http\Controllers;

use App\Category;
use App\Product;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index($id)
    {
        $category = Category::get();
        $categor = Category::where('id', $id)->get()->first();
        $products = Product::where('category_id', $id)->paginate(1);
        return view('category', compact('category', 'categor', 'products'));
    }
}

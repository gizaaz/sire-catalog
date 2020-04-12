<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;

class SalesController extends Controller
{
    public function index()
    {
        $category = Category::where('category_id', null)->get();
        return view('sales', compact('category'));
    }
}

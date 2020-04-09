<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;

class SalesController extends Controller
{
    public function index()
    {
        $category = Category::get();
        return view('sales', compact('category'));
    }
}

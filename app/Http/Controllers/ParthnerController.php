<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;

class ParthnerController extends Controller
{
    public function index()
    {
        $category = Category::get();
        return view('partner', compact('category'));
    }
}

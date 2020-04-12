<?php

namespace App\Http\Controllers;

use App\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AboutController extends Controller
{
    public function index()
    {
        $category = Category::where('category_id', null)->get();
        return view('about', compact('category'));
    }
}

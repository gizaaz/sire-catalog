<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;

class ServicesController extends Controller
{
    public function index()
    {
        $category = Category::get();
        return view('services', compact('category'));
    }
}

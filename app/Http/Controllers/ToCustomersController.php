<?php

namespace App\Http\Controllers;

use App\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ToCustomersController extends Controller
{
    public function index()
    {
        $category = Category::get();
        return view('toCustomers', compact('category'));
    }
}

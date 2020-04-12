<?php

namespace App\Http\Controllers;

use App\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ContactsController extends Controller
{
    public function index()
    {
        $category = Category::where('category_id', null)->get();
        return view('contacts', compact('category'));
    }
}

<?php

namespace App\Http\Controllers;

use App\Category;
use App\Gallery;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index()
    {
        $category = Category::where('category_id', null)->get();
        $galleries = Gallery::get();
        return view('gallery', compact('category','galleries'));
    }
}

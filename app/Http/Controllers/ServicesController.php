<?php

namespace App\Http\Controllers;

use App\Category;
use App\Service;
use Illuminate\Http\Request;

class ServicesController extends Controller
{
    public function index()
    {
        $category = Category::where('category_id', null)->get();
        $services = Service::get();
        return view('services', compact('category', 'services'));
    }

    public function service($id)
    {
        $category = Category::where('category_id', null)->get();
        $service = Service::where('id', $id)->first();
        return view('service', compact('category', 'service'));
    }
}

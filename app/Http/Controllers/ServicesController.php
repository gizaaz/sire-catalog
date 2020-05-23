<?php

namespace App\Http\Controllers;

use App\Category;
use App\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

    public function confirmService(Request $request, $id)
    {
        $success = DB::table('order_service')->insert(array('user_name' => $request->name, 'phone' => $request->phone, 'city' => $request->address, 'service_id' => $id));

        if($success){
            session()->flash('success','Замовлення прийняте на обробку, очікуйте дзвінка від менеджера');
        } else {
            session()->flash('warning','Сталась помилка :(');

        }
        return redirect()->route('services');
    }
}

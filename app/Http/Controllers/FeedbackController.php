<?php

namespace App\Http\Controllers;

use App\Category;
use App\Feedback;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    public function index()
    {
        $category = Category::where('category_id', null)->get();
        $feedbacks = Feedback::get();
        return view('feedback', compact('category','feedbacks'));
    }

    public function add(Request $request, Feedback $feedback){

//        dump($request->name);
//        dump($request->email);
//        dump($request->description);
//        dump($request->stars);
//        die;
        $feedback->name = $request->name;
        $feedback->email = $request->email;
        $feedback->description = $request->description;
        $feedback->rating = $request->stars;
        $feedback->save();
        return redirect()->route('feedback');
    }
}

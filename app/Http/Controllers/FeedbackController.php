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
        $feedbacks = Feedback::where('status', 1)->orderBy('updated_at', 'desc')->get();
        return view('feedback', compact('category','feedbacks'));
    }

    public function add(Request $request, Feedback $feedback){
        $feedback->name = $request->name;
        $feedback->email = $request->email;
        $feedback->description = $request->description;
        $feedback->rating = $request->stars;
        $success = $feedback->save();
        if($success){
            session()->flash('success', 'Дякуюємо за відгук! Відгук буде опубліковано після модерації ;)');
        }
        return redirect()->route('feedback');
    }
}

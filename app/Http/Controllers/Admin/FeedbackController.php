<?php

namespace App\Http\Controllers\Admin;

use App\Feedback;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    public function index()
    {
        $feedbacks_new = Feedback::where('status', null)->orderBy('updated_at', 'desc')->get();
        $feedbacks_published = Feedback::where('status', 1)->orderBy('updated_at', 'desc')->get();
        return view('auth.feedbacks.index', compact('feedbacks_new', 'feedbacks_published'));
    }

    public function update(Request $request, Feedback $feedback)
    {
        $feedback->status = $request->get('status');
        $feedback->update();
        return redirect()->route('feedbacks.index');
    }
    public function destroy(Feedback $feedback)
    {
        $feedback->delete();
        return redirect()->route('feedbacks.index');
    }
}

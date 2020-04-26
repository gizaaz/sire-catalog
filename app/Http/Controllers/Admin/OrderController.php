<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $orders = Order::where('status', 1)->orderBy('updated_at', 'desc')->paginate(40);
        $orders_process = Order::where('status', 2)->orderBy('updated_at', 'desc')->paginate(40);
        $orders_offline = Order::where('status', 3)->orderBy('updated_at', 'desc')->paginate(40);
        return view('auth.orders.index', compact('orders', 'orders_offline', 'orders_process'));
    }

    public function show(Order $order)
    {
        return view('auth.orders.show', compact('order'));
    }

    public function update(Request $request, Order $order)
    {
        $order->status = $request->get('status');
        $order->update();
        return redirect()->route('home');
    }
}

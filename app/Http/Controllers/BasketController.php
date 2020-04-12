<?php

namespace App\Http\Controllers;

use App\Category;
use App\Order;
use App\Product;
use Illuminate\Http\Request;

class BasketController extends Controller
{
    public function index()
    {
        $category = Category::where('category_id', null)->get();
        $orderId= session('orderId');
        if (!is_null($orderId)) {
            $order = Order::findOrFail($orderId);
        }
        return view('basket', compact('category', 'order'));
    }

    public function add($productId)
    {
        $orderId = session('orderId');
        if (is_null($orderId)) {
            $order = Order::create();
            session(['orderId' => $order->id]);
        } else {
            $order = Order::find($orderId);
        }

        if ($order->products->contains($productId)) {
            $pivotRow = $order->products()->where('product_id', $productId)->first()->pivot;
            $pivotRow->count++;
            $pivotRow->update();
        } else {
            $order->products()->attach($productId);
        }
        $product = Product::with('images')->find($productId);
        session()->flash('success', 'Доданий товар ' . $product->name);
        return redirect()->route('basket');
    }

    public function remove($productId)
    {
        $orderId = session('orderId');
        if (is_null($orderId)) {
            return redirect()->route('basket');
        }
        $order = Order::find($orderId);

        if ($order->products->contains($productId)) {
            $pivotRow = $order->products()->where('product_id', $productId)->first()->pivot;
            if ($pivotRow->count < 2) {
                $order->products()->detach($productId);
            } else {
                $pivotRow->count--;
                $pivotRow->update();
            }
        }
        $product = Product::with('images')->find($productId);

        session()->flash('warning', 'Видалений товар ' . $product->name);

        return redirect()->route('basket');
    }

    public function basketConfirm(Request $request)
    {
        $orderId = session('orderId');
        if (is_null($orderId)) {
            return redirect()->route('index');
        }
        $order = Order::find($orderId);
        $success = $order->saveOrder($request->user_name, $request->phone, $request->email, $request->description);

        if($success){
            session()->flash('success','Заказ прийнятий на обробку');
        } else {
            session()->flash('warning','Сталась помилка :(');

        }

        return redirect()->route('welcome');
    }

    public function basketPlace()
    {
        $category = Category::where('category_id', null)->get();
        $orderId = session('orderId');
        if (is_null($orderId)) {
            return redirect()->route('index');
        }
        $order = Order::find($orderId);
        return view('order', compact('order', 'category'));
    }
}

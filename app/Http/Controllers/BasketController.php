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
        $category = Category::get();
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
        $product = Product::find($productId);
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
        $product = Product::find($productId);

        session()->flash('warning', 'Видалений товар ' . $product->name);

        return redirect()->route('basket');
    }

    public function basketConfirm(Request $request)
    {
        dd($request->all());
        $orderId = session('orderId');
        if (is_null($orderId)) {
            return redirect()->route('index');
        }
        $order = Order::find($orderId);
        $order->user_name = $request->user_name;
        $order->phone = $request->phone;
        $order->email = $request->email;
        $order->descriprion = $request->descriprion;
        $order->status = 1;
        $order->save();
        session()->forget('orderId');
        //$success = $order->saveOrder($request->user_name, $request->phone, $request->email, $request->description);

       /* if($success){
            session()->flash('success','Заказ прийнятий на обробку');
        } else {
            session()->flash('warning','Сталась помилка :(');

        }*/
        return redirect()->route('index');
    }

    public function basketPlace()
    {
        $category = Category::get();
        $orderId = session('orderId');
        if (is_null($orderId)) {
            return redirect()->route('index');
        }
        $order = Order::find($orderId);
        return view('order', compact('order', 'category'));
    }
}

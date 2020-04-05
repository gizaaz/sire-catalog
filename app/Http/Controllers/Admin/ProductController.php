<?php

namespace App\Http\Controllers\Admin;

use App\Category;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Image;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::get();
        return view('auth.products.index', compact('products'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $categories = Category::get();
//        $categories = Category::whereNull('category_id')
//            ->with('childrenCategories')
//            ->get();
        $child_category = Category::whereNotNull('category_id')->get();
//        dd($child_category);
        return view('auth.products.form', compact('categories', 'child_category'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ProductRequest $request
     * @param Product $product
     * @return \Illuminate\Http\Response
     */
    public function store(ProductRequest $request, Product $product)
    {
        $product->name = $request->get('name');
        $product->category_id = $request->get('category_id');
        $product->description = $request->get('description');
        $product->price = $request->get('price');
        $product->currency = $request->get('currency');
        $product->status = $request->get('status');
        $product->save();

        foreach ($request->images as $image) {
            $path = $image->store('img');
            $product->images()->save(new Image(['image' => $path]));
        }

        return redirect()->route('products.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Product $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        $images = Image::where('product_id', $product->id)->get();
        return view('auth.products.show', compact('product','images'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Product $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        $categories = Category::get();
        $images = Image::where('product_id', $product->id)->get();
        $child_category = Category::whereNotNull('category_id')->get();

        return view('auth.products.form', compact('product', 'categories', 'images', 'child_category'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Product $product
     * @return \Illuminate\Http\Response
     */

    public function deleteImage(Request $request)
    {
        $image = Image::find($request->id);
        Storage::delete($image->image);
        $image->delete();
        return response('');
    }

    public function update(ProductRequest $request, Product $product)
    {
        $params = $request->all();
        unset($params['images']);
        if ($request->has('images')) {
            foreach ($request->images as $image) {
                $path = $image->store('img');
                $product->images()->save(new Image(['image' => $path]));
            }
        }

        $product->update($params);
        return redirect()->route('products.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Product $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('products.index');
    }
}

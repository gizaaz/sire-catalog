<?php

namespace App\Http\Controllers\Admin;

use App\Category;
use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
//    public function index()
//    {
//        $categories = Category::get();
//        return view('auth.categories.index', compact('categories'));
//    }


    public function index()
    {
        $categories = Category::get();
        $child_categories = Category::whereNotNull('category_id')->get();
        return view('auth.categories.index', compact('categories','child_categories'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('auth.categories.form');
    }


//    public function childCreate()
//    {
//        $categories_not_null = Category::whereNull('category_id')->get();
//        return view('auth.categories.formchild',compact('categories_not_null'));
//    }


//    public function childStore(CategoryRequest $request, Category $category)
//    {
//        $category->name = $request->get('name');
//        $category->category_id = $request->get('child');
//
//        unset($request->images);
//        if ($request->has('images')) {
//            $path = $request->images->store('img');
//            $category->images->save($path);
//        }
//        $category->save();
////        Category::create($params);
//        return redirect()->route('categories.index');
//    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(CategoryRequest $request)
    {
        $params = $request->all();
        unset($params['images']);
        if ($request->has('images')) {
            $path = $request->file('images')->store('categories');
            $params['images'] = $path;
        }

        Category::create($params);
        return redirect()->route('categories.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Category $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        $child_category = Category::where('category_id', $category->id)
            ->with('childrenCategories')
            ->get();
        return view('auth.categories.show', compact('category', 'child_category'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Category $category
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category)
    {
        return view('auth.categories.form', compact('category'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Category $category
     * @return \Illuminate\Http\Response
     */
    public function update(CategoryRequest $request, Category $category)
    {
        $params = $request->all();
        unset($params['images']);
        if ($request->has('images')) {
            Storage::delete($category->image);
            $path = $request->file('images')->store('categories');
            $params['images'] = $path;
        }

        $category->update($params);
        return redirect()->route('categories.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Category $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        $child_category = Category::where('category_id', $category->id)
            ->with('childrenCategories')
            ->get();
        foreach ($child_category as $item) {
            $item->delete();
        }
        $category->delete();
        return redirect()->route('categories.index');
    }
}

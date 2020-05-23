<?php

namespace App\Http\Controllers\Admin;

use App\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ChildCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $child_categories = Category::whereNotNull('category_id')->paginate(40);
        return view('auth.child_categories.index', compact('child_categories'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $parent_categories = Category::whereNull('category_id')->get();
        return view('auth.child_categories.formchild',compact('parent_categories'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Category $category)
    {
        $category->name = $request->get('name');
        $category->category_id = $request->get('child');

        unset($request->images);
        if ($request->has('images')) {
            $path = $request->file('images')->store('categories');
            $request['images'] = $path;
            $category->images = $request->get('images');
        }
        $category->save();
//        Category::create($params);
        return redirect()->route('child.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $child_category = Category::where('id',$id)->get()->first();
        return view('auth.child_categories.showchild', compact( 'child_category'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $child_category = Category::where('id',$id)->get()->first();
        $parent_categories = Category::whereNull('category_id')->get();
        return view('auth.child_categories.formchild', compact('child_category','parent_categories'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $child_category = Category::where('id',$id)->get()->first();
        $child_category->name = $request->get('name');
        $child_category->category_id = $request->get('child');
        unset($request->images);
        if ($request->has('images')) {
            Storage::delete($child_category->images);
            $path = $request->file('images')->store('categories');
                $request['images'] = $path;
            $child_category->images = $request->get('images');
        }

        $child_category->update();
        return redirect()->route('child.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $category = Category::where('id',$id);
        $category->delete();
        return redirect()->route('child.index');
    }
}

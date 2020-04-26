<?php

namespace App\Http\Controllers\Admin;

use App\Gallery;
use App\GalleryImage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $galleries = Gallery::get();
        return view('auth.gallery.index', compact('galleries'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('auth.gallery.form');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param Gallery $gallery
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Gallery $gallery)
    {
        $gallery->name = $request->get('name');
        $gallery->description = $request->get('description');
        $gallery->save();

        foreach ($request->images as $image) {
            $path = $image->store('img');
            $gallery->galleryImages()->save(new GalleryImage(['image' => $path]));
        }

        return redirect()->route('gallery.index');
    }

    /**
     * Display the specified resource.
     *
     * @param Gallery $gallery
     * @return \Illuminate\Http\Response
     */
    public function show(Gallery $gallery)
    {
        $images = GalleryImage::where('gallery_id', $gallery->id)->get();
        return view('auth.gallery.show', compact('gallery','images'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Gallery $gallery
     * @return \Illuminate\Http\Response
     */
    public function edit(Gallery $gallery)
    {
        $images = GalleryImage::where('gallery_id', $gallery->id)->get();
        return view('auth.gallery.form', compact('gallery',  'images'));
    }

    public function deleteImage(Request $request)
    {
        $image = GalleryImage::find($request->id);
        Storage::delete($image->image);
        $image->delete();
        return response('');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param Gallery $gallery
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Gallery $gallery)
    {
        $params = $request->all();
        unset($params['images']);
        if ($request->has('images')) {
            foreach ($request->images as $image) {
                $path = $image->store('img');
                $gallery->galleryImages()->save(new GalleryImage(['image' => $path]));
            }
        }

        $gallery->update($params);
        return redirect()->route('gallery.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Gallery $gallery
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(Gallery $gallery)
    {
        $gallery->delete();
        $images = GalleryImage::where('gallery_id', $gallery->id)->get();
        foreach ($images as $image) {
            Storage::delete($image->image);
            $image->delete();
        }
        return redirect()->route('gallery.index');
    }
}

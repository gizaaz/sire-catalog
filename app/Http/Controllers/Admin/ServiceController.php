<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $services = Service::get();
        return view('auth.services.index', compact('services'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('auth.services.form');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param Service $service
     * @return void
     */
    public function store(Request $request, Service $service)
    {
        $service->name = $request->get('name');
        $service->summary = $request->get('summary');
        $service->description = $request->get('description');
        $service->price = $request->get('price');
        $service->icon = $request->file('image')->store('services');
        $service->save();

        return redirect()->route('services.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function show(Service $service)
    {
        return view('auth.services.show', compact('service'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function edit(Service $service)
    {
        return view('auth.services.form', compact('service'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Service $service)
    {
        $params = $request->all();
        if (!is_null($request->file('image'))) {
        Storage::delete($service->icon);
        $path = $request->file('image')->store('services');
        $params['icon'] = $path;
        }

        $service->update($params);
        return redirect()->route('services.index');
    }

    public function deleteIcon(Service $service)
    {
        Storage::delete($service->icon);
        return response('');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function destroy(Service $service)
    {
        Storage::delete($service->icon);
        $service->delete();
        return redirect()->route('services.index');
    }
}

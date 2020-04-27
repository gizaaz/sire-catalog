@extends('auth.layouts.master')

@section('title', 'Послуга ' . $service->name)

@section('content')
    <div class="col-md-12">
        <h1>{{ $service->name }}</h1>
        <table class="table">
            <tbody>
            <tr>
                <th>
                    Поле
                </th>
                <th>
                    Значення
                </th>
            </tr>
            <tr>
                <td>ID</td>
                <td>{{ $service->id}}</td>
            </tr>
            <tr>
                <td>Назва послуги</td>
                <td>{{ $service->name }}</td>
            </tr>
            <tr>
                <td>Ціна</td>
                <td>{{ $service->price }}</td>
            </tr>
            <tr>
                <td>Короткий опис</td>
                <td>{!! $service->summary !!}</td>
            </tr>
            <tr>
                <td>Опис</td>
                <td>{!! $service->description !!}</td>
            </tr>
            <tr>
                <td>Зображення</td>
                    <td><img src="{{Storage::url($service->icon)}}" height="240px"></td>
            </tr>
            </tbody>
        </table>
    </div>
@endsection

@extends('auth.layouts.master')

@section('title', 'Продукт ' . $gallery->name)

@section('content')
    <div class="col-md-12">
        <h1>{{ $gallery->name }}</h1>
        <table class="table table-striped">
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
                <td>{{ $gallery->id}}</td>
            </tr>
            <tr>
                <td>Назва товару</td>
                <td>{{ $gallery->name }}</td>
            </tr>
            <tr>
                <td>Опис</td>
                <td>{!! $gallery->description !!}</td>
            </tr>
            <tr>
            <td>Зображення</td>
                <td>
            @foreach($images as $image)
                <img src="{{Storage::url($image['image'])}}" height="240px">
            @endforeach
                </td>
            </tr>
            </tbody>
        </table>
    </div>
@endsection

@extends('auth.layouts.master')

@section('title', 'Продукт ' . $product->name)

@section('content')
    <div class="col-md-12">
        <h1>{{ $product->name }}</h1>
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
                <td>{{ $product->product_id}}</td>
            </tr>
            {{--<tr>--}}
                {{--<td>Код</td>--}}
                {{--<td>{{ $product->code }}</td>--}}
            {{--</tr>--}}
            <tr>
                <td>Назва товару</td>
                <td>{{ $product->name }}</td>
            </tr>
            <tr>
                <td>Ціна</td>
                <td>{{ $product->price }}</td>
            </tr>
            <tr>
                <td>Опис</td>
                <td>{{ $product->description }}</td>
            </tr>
            <tr>
                <td>Зображення</td>
                <td><img src="{{Storage::url($product->images)}}" height="240px"></td>
            </tr>
            <tr>
                <td>Категорія</td>
                <td>{{ $product->category->name }}</td>
            </tr>
            </tbody>
        </table>
    </div>
@endsection

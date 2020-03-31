@extends('auth.layouts.master')

@section('title', 'Категорія ' . $category->name)

@section('content')
    <div class="col-md-12">
        <h1>Категорія {{ $category->name }}</h1>
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
                <td>{{ $category->id }}</td>
            </tr>
            {{--<tr>--}}
                {{--<td>Код</td>--}}
                {{--<td>{{ $category->code }}</td>--}}
            {{--</tr>--}}
            <tr>
                <td>Назва категорії</td>
                <td>{{ $category->name }}</td>
            </tr>
            {{--<tr>--}}
                {{--<td>Описание</td>--}}
                {{--<td>{{ $category->description }}</td>--}}
            {{--</tr>--}}
            <tr>
                <td>Зображення</td>
                <td><img src="{{Storage::url($category->images)}}"
                         height="240px"></td>
            </tr>
            <tr>
                <td>Кількість товарів</td>
                <td>{{ $category->products->count() }}</td>
            </tr>
            </tbody>
        </table>
    </div>
@endsection

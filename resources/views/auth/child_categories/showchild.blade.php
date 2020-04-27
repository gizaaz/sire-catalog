@extends('auth.layouts.master')

@section('title', 'Підкатегорія ' . $child_category->name)

@section('content')
    <div class="col-md-12">
        <h1>Підкатегорія {{ $child_category->name }}</h1>
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
                <td>{{ $child_category->id }}</td>
            </tr>
            {{--<tr>--}}
                {{--<td>Код</td>--}}
                {{--<td>{{ $child_category->code }}</td>--}}
            {{--</tr>--}}
            <tr>
                <td>Назва підкатегорії</td>
                <td>{{ $child_category->name }}</td>
            </tr>
            {{--<tr>--}}
                {{--<td>Описание</td>--}}
                {{--<td>{{ $child_category->description }}</td>--}}
            {{--</tr>--}}
            <tr>
                <td>Зображення</td>
                <td>
                    @if(!is_null($child_category->images))
                    <img src="{{Storage::url($child_category->images)}}"
                         height="240px">
                        @endif
                </td>
            </tr>
            <tr>
                <td>Кількість товарів</td>
                <td>{{ $child_category->products->count() }}</td>
            </tr>
            </tbody>
        </table>
    </div>
@endsection

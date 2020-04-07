@extends('auth.layouts.master')

@section('title', 'Товары')

@section('content')
    <div class="col-md-12">
        <h1>Товари</h1>
        <a class="btn btn-success custom-fix" type="button" href="{{ route('products.create') }}">Добавити товар</a>
        <table class="table">
            <tbody>
            <tr>
                <th>
                    #
                </th>
                {{--<th>--}}
                    {{--Код--}}
                {{--</th>--}}
                <th>
                    Назва товару
                </th>
                <th>
                    Категорія
                </th>
                <th>
                    Ціна
                </th>
                <th>
                    Статус
                </th>
                <th>
                    Дії
                </th>
            </tr>
            @foreach($products as $item=>$product)
                <tr>
                    <td>{{ ++$item}}</td>
                    <td>{{ $product->name }}</td>
                    <td>
                        @if(isset($product->category->name))
                            {{$product->category->name}}
                        @else
                            <span style="color: red"> КАТЕГОРІЮ НЕ ЗНАЙДЕНО</span>
                        @endif
                    </td>
                    {{--<td>{{ $product->category->name }}</td>--}}
                    <td>{{ $product->price }} {{ $product->currency }}</td>
                    <td>
                        @if($product->status == 1)
                                В наявності
                        @else
                            Продано
                            @endif
                        </td>
                    <td>
                        <div class="btn-group" role="group">
                            <form action="{{ route('products.destroy', $product) }}" method="POST">
                                <a class="btn btn-success" type="button"
                                   href="{{ route('products.show', $product) }}">Переглянути</a>
                                <a class="btn btn-warning" type="button"
                                   href="{{ route('products.edit', $product) }}">Редагувати</a>
                                @csrf
                                @method('DELETE')
                                <input class="btn btn-danger" type="submit" value="Видалити"></form>
                        </div>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
@endsection

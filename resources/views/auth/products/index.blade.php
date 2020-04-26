@extends('auth.layouts.master')

@section('title', 'Товары')

@section('content')
    <div class="col-md-12">
        <h1>Товари</h1>
        <a class="btn btn-success custom-fix" type="button" href="{{ route('products.create') }}">Добавити товар</a>
        <table class="table table-striped">
            <tbody>
            <tr>
                <th>
                    #
                </th>
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
                            <span style="color: red; font-weight: bold"> КАТЕГОРІЮ НЕ ЗНАЙДЕНО</span>
                        @endif
                    </td>
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
                                <button class="btn btn-danger" type="submit" value="Видалити" onclick="return destroy();">Видалити</button>
                            </form>
                        </div>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
    {{$products->links('pagination')}}
@endsection

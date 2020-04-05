@extends('auth.layouts.master')

@section('title', 'Заказ ' . $order->id)

@section('content')
    <div class="py-4">
        <div class="container">
            <div class="justify-content-center">
                <div class="panel">
                    <h1>Замовлення №{{ $order->id }}</h1>
                    <p>Замовник: <b>{{ $order->user_name }}</b></p>
                    <p>Номер телефону: <b>{{ $order->phone }}</b></p>
                    <p>E-mail: <b>{{ $order->email }}</b></p>
                    <p>Повідомлення: <b>{{ $order->description }}</b></p>
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>Назва товару</th>
                            <th>Кількість</th>
                            <th>Вартість 1 товару</th>
                            <th>Ціна</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach ($order->products as $product)
                            <tr>
                                <td>
                                    <a href="{{ route('product', $product) }}">
                                        {{--<img height="56px"--}}
                                             {{--src="{{ Storage::url($product->images) }}">--}}
                                        {{ $product->name }}
                                    </a>
                                </td>
                                <td><span class="badge">{{$product->pivot->count}}</span></td>
                                <td>{{ $product->getPriceForCount()}} ГРН</td>
                                <td>{{ $product->price }} ГРН</td>
                            </tr>
                        @endforeach
                        <tr>
                            <td colspan="3"><b>Всього:</b></td>
                            <td>{{ $order->getFullPrice() }} ГРН</td>
                        </tr>
                        </tbody>
                    </table>
                    <br>
                    <p><b>Присвоїти статус:</b>
                    <div class="btn-group" role="group">
                        <form action="{{ route('orders.update', $order) }}" method="POST">
                            @csrf
                            @method('PUT')
                            <input type="text" style="display: none;" class="form-control" name="status" id="name" value="2">
                            <input class="btn btn-warning" type="submit" value="Виконується"></form>
                    </div>
                    <div class="btn-group" role="group">
                        <form action="{{ route('orders.update', $order) }}" method="POST">
                            @csrf
                            @method('PUT')
                            <input type="text" style="display: none;" class="form-control" name="status" id="name" value="0">
                            <input class="btn btn-primary" type="submit" value="Виконано"></form>
                    </div>
                    </p>
                </div>
            </div>
        </div>
    </div>
@endsection

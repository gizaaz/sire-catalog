@extends('auth.layouts.master')

@section('title', 'Заказы')

@section('content')
    <div class="col-md-12">
        <h1>Заказы</h1>
        <table class="table">
            <tbody>
            <tr>
                <th>
                    #
                </th>
                <th>
                    Ім'я
                </th>
                <th>
                    Телефон
                </th>
                <th>
                    E-mail
                </th>
                <th>
                    Лист
                </th>
                <th>
                    Дата замовлення
                </th>
                <th>
                    Сума
                </th>
                <th>
                    Дії з замовленням
                </th>
            </tr>
            {{--@foreach($orders as $order)--}}
                {{--<tr>--}}
                    {{--<td>{{ $order->id}}</td>--}}
                    {{--<td>{{ $order->name }}</td>--}}
                    {{--<td>{{ $order->phone }}</td>--}}
                    {{--<td>{{ $order->created_at->format('H:i d/m/Y') }}</td>--}}
                    {{--<td>{{ $order->getFullPrice() }} руб.</td>--}}
                    {{--<td>--}}
                        {{--<div class="btn-group" role="group">--}}
                            {{--<a class="btn btn-success" type="button"--}}
                               {{--href="http://laravel-diplom-1.rdavydov.ru/admin/orders/1">Открыть</a>--}}
                        {{--</div>--}}
                    {{--</td>--}}
                {{--</tr>--}}
            {{--@endforeach--}}
            @foreach($orders as $order)
                <tr>
                    <td>{{ $order->id}}</td>
                    <td>{{ $order->user_name}}</td>
                    <td>{{ $order->phone}}</td>
                    <td>{{ $order->email}}</td>
                    <td>{{ $order->description}}</td>
{{--                    <td>{{ $order->created_at->format('H:i d.m.Y')}}</td>--}}
                    <td>{{ $order->getFullPrice() }} currency</td>
                    <td>
                        <div class="btn-group" role="group">
                            <a class="btn btn-success" type="button"
                               href="{{route('orders.show', $order)}}">Переглянути</a>
                        </div>
                    </td>
                </tr>
            @endforeach

            </tbody>
        </table>
    </div>
@endsection

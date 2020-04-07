@extends('auth.layouts.master')

@section('title', 'Замовлення')

@section('content')
    <div id="exTab" class="container">
        <ul  class="nav nav-pills">
            <li class="active">
                <a  href="#1b" data-toggle="tab">Нові замовлення</a>
            </li>
            <li>
                <a  href="#2b" data-toggle="tab">В обробці</a>
            </li>
            <li><a href="#3b" data-toggle="tab">Виконані замовлення</a>
            </li>
        </ul>

        
        <div class="tab-content clearfix">
            <div class="tab-pane active" id="1b">

                <div class="col-md-12">
                    <h1>Нові замовлення</h1>
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
                                Дата замовлення
                            </th>
                            <th>
                                Сума
                            </th>
                            <th>
                                Замовлення
                            </th>
                            <th>
                                Присвоїти статус
                            </th>
                        </tr>
                        @foreach($orders as $order)
                            <tr>
                                <td>{{ $order->id}}</td>
                                <td>{{ $order->user_name}}</td>
                                <td>{{ $order->phone}}</td>
                                <td>{{ $order->email}}</td>
                                {{--<td>{{ $order->description}}</td>--}}
                                <td>{{ $order->created_at->format('H:i d.m.Y')}}</td>
                                <td>{{ $order->getFullPrice() }} ГРН</td>
                                <td>
                                    <div class="btn-group" role="group">
                                        <a class="btn btn-success" type="button"
                                           href="{{route('orders.show', $order)}}">Переглянути</a>
                                    </div>
                                </td>
                                <td>
                                    <div class="btn-group" role="group">
                                        <form action="{{ route('orders.update', $order) }}" method="POST">
                                            @csrf
                                            @method('PUT')
                                            <input type="text" style="display: none;" class="form-control" name="status" id="name" value="2">
                                            <input class="btn btn-warning" type="submit" value="В обробці"></form>
                                    </div>
                                    <div class="btn-group" role="group">
                                        <form action="{{ route('orders.update', $order) }}" method="POST">
                                            @csrf
                                            @method('PUT')
                                            <input type="text" style="display: none;" class="form-control" name="status" id="name" value="3">
                                            <input class="btn btn-primary" type="submit" value="Виконано"></form>
                                    </div>

                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>

            </div>


            <div class="tab-pane" id="2b">
                <div class="col-md-12">
                    <h1>Замовлення в обробці</h1>
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
                                Дата замовлення
                            </th>
                            <th>
                                Сума
                            </th>
                            <th>
                                Замовлення
                            </th>
                            <th>
                                Присвоїти статус
                            </th>
                        </tr>
                        @foreach($orders_process as $process)
                            <tr>
                                <td>{{ $process->id}}</td>
                                <td>{{ $process->user_name}}</td>
                                <td>{{ $process->phone}}</td>
                                <td>{{ $process->email}}</td>
                                <td>{{ $process->created_at->format('H:i d.m.Y')}}</td>
                                <td>{{ $process->getFullPrice() }} ГРН</td>
                                <td>
                                    <div class="btn-group" role="group">
                                        <a class="btn btn-success" type="button"
                                           href="{{route('orders.show', $process)}}">Переглянути</a>
                                    </div>
                                    </td>
                                    <td>
                                    <div class="btn-group" role="group">
                                        <form action="{{ route('orders.update', $process) }}" method="POST">
                                            @csrf
                                            @method('PUT')
                                            <input type="text" style="display: none;" class="form-control" name="status" id="name" value="3">
                                            <input class="btn btn-primary" type="submit" value="Виконано"></form>
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>

            </div>

            <div class="tab-pane" id="3b">
                <div class="col-md-12">
                    <h1>Виконані замовлення</h1>
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
                                Дата замовлення
                            </th>
                            <th>
                                Сума
                            </th>
                            <th>
                                Дії з замовленням
                            </th>
                        </tr>
                        @foreach($orders_offline as $offline)
                            <tr>
                                <td>{{ $offline->id}}</td>
                                <td>{{ $offline->user_name}}</td>
                                <td>{{ $offline->phone}}</td>
                                <td>{{ $offline->email}}</td>
                                <td>{{ $offline->created_at->format('H:i d.m.Y')}}</td>
                                <td>{{ $offline->getFullPrice() }} ГРН</td>
                                <td>
                                    <div class="btn-group" role="group">
                                        <a class="btn btn-success" type="button"
                                           href="{{route('orders.show', $offline)}}">Переглянути</a>
                                    </div>
                                {{--</td>--}}
                                {{--<td>--}}
                                <div class="btn-group" role="group">
                                    <form action="{{ route('orders.update', $offline) }}" method="POST">
                                        @csrf
                                        @method('PUT')
                                        <input type="text" style="display: none;" class="form-control" name="status" id="name" value="1">
                                        <input class="btn btn-warning" type="submit" value="Відновити замовлення"></form>
                                </div>
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    </div>
@endsection

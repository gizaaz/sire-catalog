@extends('auth.layouts.master')

@section('title', 'Замовлення')

@section('content')
    <div id="exTab" class="container">
        <ul class="nav nav-pills">
            <li>
                <a href="{{route('orders.index')}}">Нові замовлення <span class="text-black">({{$orders_count[0]}})</span></a>
            </li>
            <li>
                <a href="{{route('orders.processed')}}">В обробці <span class="text-black">({{$orders_count[1]}})</span></a>
            </li>
            <li class="active">
                <a href="#">Виконані замовлення <span class="text-white">({{$orders_count[2]}})</span></a>
            </li>
        </ul>

        <div class="tab-content clearfix">
                <div class="col-md-12">
                    <h1>Виконані замовлення</h1>
                    <table class="table table-striped">
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
                                    <div class="btn-group" role="group">
                                        <form action="{{ route('orders.update', $offline) }}" method="POST">
                                            @csrf
                                            @method('PUT')
                                            <input type="text" style="display: none;" class="form-control" name="status"
                                                   id="name" value="1">
                                            <input class="btn btn-warning" type="submit" value="Відновити замовлення">
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
            {{$orders_offline->links('pagination')}}
        </div>
    </div>
@endsection

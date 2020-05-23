@extends('auth.layouts.master')

@section('title', 'Замовлення')

@section('content')
    <div id="exTab" class="container">
        <ul class="nav nav-pills">
            <li>
                <a href="{{route('orders.index')}}">Нові замовлення <span class="text-black">({{$orders_count[0]}})</span></a>
            </li>
            <li class="active">
                <a href="#">В обробці <span class="text-white">({{$orders_count[1]}})</span></a>
            </li>
            <li><a href="{{route('orders.offline')}}">Виконані замовлення <span class="text-black">({{$orders_count[2]}})</span></a>
            </li>
        </ul>

        <div class="tab-content clearfix">
            <div class="col-md-12">
                <h1>Замовлення в обробці</h1>
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
                            Замовлення
                        </th>
                        <th>
                            Присвоїти статус
                        </th>
                    </tr>
                    @foreach($orders_process as $item=>$process)
                        <tr>
                            <td>{{ ++$item}}</td>
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
                                        <input type="text" style="display: none;" class="form-control" name="status"
                                               id="name" value="3">
                                        <input class="btn btn-primary" type="submit" value="Виконано"></form>
                                </div>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
            {{$orders_process->links('pagination')}}
        </div>
    </div>
@endsection

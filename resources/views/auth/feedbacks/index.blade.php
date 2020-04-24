@extends('auth.layouts.master')

@section('title', 'Відгуки')

@section('content')
    <div id="exTab" class="container">
        <ul  class="nav nav-pills">
            <li class="active">
                <a  href="#1b" data-toggle="tab">Нові Відгуки</a>
            </li>
            <li>
                <a  href="#2b" data-toggle="tab">Опубліковані відгуки</a>
            </li>
            {{--<li>--}}
                {{--<a href="#3b" data-toggle="tab">Видалені Відгуки</a>--}}
            {{--</li>--}}
        </ul>

        <div class="tab-content clearfix">
            <div class="tab-pane active" id="1b">

                <div class="col-md-12">
                    <h1>Нові відгуки</h1>
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
                                E-mail
                            </th>
                            <th class="rating-field">
                                Оцінка
                            </th>
                            <th>
                                Відгук
                            </th>
                            <th>
                                Створено
                            </th>
                            <th>
                                Дії
                            </th>
                        </tr>
                        @foreach($feedbacks_new as $item=>$feedback)
                            <tr>
                                <td>{{ ++$item}}</td>
                                <td>{{ $feedback->name}}</td>
                                <td>{{ $feedback->email}}</td>
                                <td>
                                    @for($i = 0; $i < $feedback->rating; $i++)
                                        <span class="star gold-star">★</span>
                                    @endfor
                                    @for($i = 5; $i > $feedback->rating; $i--)
                                        <span class="star">★</span>
                                    @endfor
                                </td>
                                <td>{{ $feedback->description}}</td>
                                <td>{{ $feedback->created_at->format('H:i d.m.Y')}}</td>
                                <td>
                                   <div class="btn-group" role="group">
                                        <form action="{{ route('feedbacks.update', $feedback) }}" method="POST">
                                            @csrf
                                            @method('PUT')
                                            <input type="text" style="display: none;" class="form-control" name="status" id="name" value="1">
                                            <input class="btn btn-primary" type="submit" value="Опублікувати"></form>
                                    </div>
                                    <div class="btn-group" role="group">
                                        <form action="{{ route('feedbacks.destroy', $feedback) }}" method="POST">
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
            </div>


            <div class="tab-pane" id="2b">
                <div class="col-md-12">
                    <h1>Опубліковані відгуки</h1>
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
                                E-mail
                            </th>
                            <th class="rating-field">
                                Оцінка
                            </th>
                            <th>
                                Відгук
                            </th>
                            <th>
                                Створено
                            </th>
                            <th>
                                Дії
                            </th>
                        </tr>

                        @foreach($feedbacks_published as $item=>$feedback)
                            <tr>
                                <td>{{ ++$item}}</td>
                                <td>{{ $feedback->name}}</td>
                                <td>{{ $feedback->email}}</td>
                                <td>
                                    @for($i = 0; $i < $feedback->rating; $i++)
                                        <span class="star gold-star">★</span>
                                    @endfor
                                    @for($i = 5; $i > $feedback->rating; $i--)
                                        <span class="star">★</span>
                                    @endfor
                                </td>
                                <td>{{ $feedback->description}}</td>
                                <td>{{ $feedback->created_at->format('H:i d.m.Y')}}</td>
                                <td>
                                    <div class="btn-group" role="group">
                                        <form action="{{ route('feedbacks.destroy', $feedback) }}" method="POST">
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
            </div>


        </div>
    </div>
@endsection

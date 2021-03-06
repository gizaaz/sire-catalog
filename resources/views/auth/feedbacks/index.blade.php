@extends('auth.layouts.master')

@section('title', 'Відгуки')

@section('content')
    <div id="exTab" class="container">
        <ul class="nav nav-pills">
            <li class="active">
                <a href="#">Нові Відгуки <span class="text-white">({{$feedback_count[0]}})</span></a>
            </li>
            <li>
                <a href="{{route('feedbacks.published')}}">Опубліковані відгуки <span class="text-black">({{$feedback_count[1]}})</span></a>
            </li>
        </ul>

        <div class="tab-content clearfix">
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
                                        <input type="text" style="display: none;" class="form-control" name="status"
                                               id="name" value="1">
                                        <input class="btn btn-primary" type="submit" value="Опублікувати"></form>
                                </div>
                                <div class="btn-group" role="group">
                                    <form action="{{ route('feedbacks.destroy', $feedback) }}" method="POST">
                                        @csrf
                                        @method('DELETE')
                                        <button class="btn btn-danger" type="submit" value="Видалити"
                                                onclick="return destroy();">Видалити
                                        </button>
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
    {{$feedbacks_new->links('pagination')}}
@endsection

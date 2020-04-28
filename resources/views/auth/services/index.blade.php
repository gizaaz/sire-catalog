@extends('auth.layouts.master')

@section('title', 'Послуги')

@section('content')
    <div class="col-md-12">
        <h1>Послуги</h1>
        <a class="btn btn-success custom-fix" type="button" href="{{ route('services.create') }}">Добавити послугу</a>
        <table class="table table-striped">
            <tbody>
            <tr>
                <th>
                    #
                </th>
                <th>
                    Назва Послуги
                </th>
                <th>
                    Ціна
                </th>
                <th>
                    Дії
                </th>
            </tr>
            @foreach($services as $item=>$service)
                <tr>
                    <td>{{ ++$item}}</td>
                    <td>{{ $service->name }}</td>
                    <td>{{ $service->price }} грн</td>
                    <td>
                        <div class="btn-group" role="group">
                            <form action="{{ route('services.destroy', $service) }}" method="POST">
                                <a class="btn btn-success" type="button"
                                   href="{{ route('services.show', $service) }}">Переглянути</a>
                                <a class="btn btn-warning" type="button"
                                   href="{{ route('services.edit', $service) }}">Редагувати</a>
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
@endsection

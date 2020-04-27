@extends('auth.layouts.master')

@section('title', 'Галерея')

@section('content')
    <div class="col-md-12">
        <h1>Галерея</h1>
        <a class="btn btn-success custom-fix" type="button" href="{{ route('gallery.create') }}">Добавити пост</a>
        <table class="table table-striped">
            <tbody>
            <tr>
                <th>
                    #
                </th>
                <th>
                    Назва
                </th>
                <th>
                    Дії
                </th>
            </tr>
            @foreach($galleries as $item=>$gallery)
                <tr>
                    <td>{{ ++$item}}</td>
                    <td>{{ $gallery->name }}</td>
                    <td>
                        <div class="btn-group" role="group">
                            <form action="{{ route('gallery.destroy', $gallery) }}" method="POST">
                                <a class="btn btn-success" type="button"
                                   href="{{ route('gallery.show', $gallery) }}">Переглянути</a>
                                <a class="btn btn-warning" type="button"
                                   href="{{ route('gallery.edit', $gallery) }}">Редагувати</a>
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
    {{$galleries->links('pagination')}}
@endsection

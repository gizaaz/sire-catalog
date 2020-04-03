@extends('auth.layouts.master')

@section('title', 'Категорії')

@section('content')
    <div class="col-md-12">
        <h1>Категорії</h1>
        <a class="btn btn-success custom-fix" type="button"
           href="{{ route('categories.create') }}">Створити категорію</a>
        <table class="table">
            <tbody>
            <tr>
                <th>
                    #
                </th>
                {{--<th>--}}
                    {{--Код--}}
                {{--</th>--}}
                <th>
                    Назва категорії
                </th>
                <th>
                    Дії
                </th>
            </tr>
            @foreach($categories as $category)
                <tr>
                    <td>{{ $category->id }}</td>
                    <td>{{ $category->name }}</td>
                    <td>
                        <div class="btn-group" role="group">
                            <form action="{{ route('categories.destroy', $category) }}" method="POST">
                                <a class="btn btn-success" type="button" href="{{ route('categories.show', $category) }}">Відкрити</a>
                                <a class="btn btn-warning" type="button" href="{{ route('categories.edit', $category) }}">Редагувати</a>
                                @csrf
                                @method('DELETE')
                                <input class="btn btn-danger" type="submit" value="Видалити"></form>
                        </div>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
@endsection

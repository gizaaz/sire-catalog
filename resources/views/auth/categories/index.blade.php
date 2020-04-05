@extends('auth.layouts.master')

@section('title', 'Категорії')

@section('content')

    <div id="exTab" class="container">
        <ul class="nav nav-pills">
            <li class="active">
                <a href="#1b" data-toggle="tab">Категорії</a>
            </li>
            <li><a href="#2b" data-toggle="tab">Підкатегорії</a>
            </li>
        </ul>


        <div class="tab-content clearfix">
            <div class="tab-pane active" id="1b">
                <div class="col-md-12">
                    <h1>Категорії</h1>
                    <a class="btn btn-success custom-fix" type="button" href="{{ route('categories.create') }}">Створити
                        категорію</a>
                    <table class="table">
                        <tbody>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                Назва категорії
                            </th>
                            <th>
                                Дії
                            </th>
                        </tr>
                        @foreach($categories as $category)
                            @if(is_null($category->category_id))
                                <tr>
                                <td>{{ $category->id }}</td>
                                <td>{{ $category->name }} </td>
                                <td>
                                    <div class="btn-group" role="group">
                                        <form action="{{ route('categories.destroy', $category) }}" method="POST">
                                            <a class="btn btn-success" type="button"
                                               href="{{ route('categories.show', $category) }}">Відкрити</a>
                                            <a class="btn btn-warning" type="button"
                                               href="{{ route('categories.edit', $category) }}">Редагувати</a>
                                            @csrf
                                            @method('DELETE')
                                            <input class="btn btn-danger" type="submit" value="Видалити"></form>
                                    </div>
                                </td>
                            </tr>
                                @endif
                        @endforeach
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="tab-pane" id="2b">
                <div class="col-md-12">
                    <h1>Підкатегорії</h1>
                    <a class="btn btn-success custom-fix" type="button" href="{{ route('child.create') }}">Створити
                    підкатегорію</a>
                    <table class="table">
                        <tbody>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                Назва підкатегорії
                            </th>
                            <th>
                                Дії
                            </th>
                        </tr>
                        @foreach($categories as $child)
                            @if(!is_null($child->category_id))
                                <tr>
                                    <td>{{ $child->id }}</td>
                                    <td>{{ $child->name }}</td>
                                    <td>
                                        <div class="btn-group" role="group">
                                            <form action="{{ route('child.destroy', $child) }}" method="POST">
                                                <a class="btn btn-success" type="button"
                                                   href="{{ route('child.show', $child) }}">Відкрити</a>
                                                <a class="btn btn-warning" type="button"
                                                   href="{{ route('child.edit', $child) }}">Редагувати</a>
                                                @csrf
                                                @method('DELETE')
                                                <input class="btn btn-danger" type="submit" value="Видалити"></form>
                                        </div>
                                    </td>
                                </tr>
                            @endif
                        @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
@endsection

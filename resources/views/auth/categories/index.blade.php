@extends('auth.layouts.master')

@section('title', 'Категорії')

@section('content')

    <div id="exTab" class="container">
        <ul class="nav nav-pills">
            <li class="active">
                <a href="#">Категорії</a>
            </li>
            <li><a href="{{route('child.index')}}">Підкатегорії</a>
            </li>
        </ul>
        {{--<div class="tab-content clearfix">--}}
                <div class="col-md-12">
                    <h1>Категорії</h1>
                    <a class="btn btn-success custom-fix" type="button" href="{{ route('categories.create') }}">Створити
                        категорію</a>
                    <table class="table table-striped">
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
                        @foreach($categories as $item=>$category)
                            @if(is_null($category->category_id))
                                <tr>
                                <td>{{ ++$item }}</td>
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
                                            <button class="btn btn-danger" type="submit" value="Видалити" onclick="return destroy();">Видалити</button></form>
                                    </div>
                                </td>
                            </tr>
                                @endif
                        @endforeach
                        </tbody>
                    </table>
                </div>
        {{--</div>--}}
    </div>
    {{$categories->links('pagination')}}
@endsection

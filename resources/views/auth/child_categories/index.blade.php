@extends('auth.layouts.master')

@section('title', 'Категорії')

@section('content')

    <div id="exTab" class="container">
        <ul class="nav nav-pills">
            <li>
                <a href="{{route('categories.index')}}">Категорії</a>
            </li>
            <li class="active">
                <a href="#">Підкатегорії</a>
            </li>
        </ul>
        <div class="tab-content clearfix">
                <div class="col-md-12">
                    <h1>Підкатегорії</h1>
                    <a class="btn btn-success custom-fix" type="button" href="{{ route('child.create') }}">Створити
                    підкатегорію</a>
                    <table class="table table-striped">
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
                        @foreach($child_categories as $item=>$child)
                                <tr>
                                    <td>{{ ++$item }}</td>
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
    {{$child_categories->links('pagination')}}
@endsection

@extends('auth.layouts.master')

@isset($child_category->category_id)
    @section('title', 'Редагувати підкатегорію ' . $child_category->name)
@else
    @section('title', 'Створити підкатегорію')
@endisset

@section('content')
    <div class="col-md-12">
        @isset($child_category)
            <h1>Редагувати підкатегорію <b>{{ $child_category->name }}</b></h1>
        @else
            <h1>Створити підкатегорію</h1>
        @endisset

        <form method="POST" enctype="multipart/form-data"
              @isset($child_category)
              action="{{ route('child.update', $child_category) }}"
              @else
              action="{{ route('child.store') }}"
            @endisset
        >
            <div>
                @isset($child_category)
                    @method('PUT')
                @endisset
                @csrf
                <div class="input-group row">
                    <label for="name" class="col-sm-2 col-form-label">Назва: </label>
                    <div class="col-sm-6">
                        @error('name')
                        <div class="alert alert-danger">{{$message}}</div>
                        @enderror
                        <input type="text" class="form-control" name="name" id="name"
                               value="{{old('name' , isset($child_category) ? $child_category->name : null)}}"
                        >
                    </div>
                </div>
                <br>
                <div class="input-group row">
                    <label for="child" class="col-sm-2 col-form-label">Категорія: </label>
                    <div class="col-sm-6">
                        <select name="child" id="child" class="form-control">
                            @foreach($parent_categories as $category)
                                <option value="{{$category->id}}"
                                        @isset($child_category)
                                        @if($child_category->category_id == $category->id)
                                        selected
                                    @endif
                                    @endisset
                                >{{$category->name}}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <br>
                <div class="input-group row">
                    <label for="image" class="col-sm-2 col-form-label">Зображення:
                        @isset($child_category)
                            <br>(Для видалення поточного зображення завантажте нове)
                        @endisset
                    </label>
                    <br>
                    <div class="col-sm-10">
                        @isset($child_category)
                            <input class="button-download" type="file" name="images" id="image">
                        @else
                            <input class="button-download" type="file" required name="images" id="image">
                        @endisset
                    </div>
                </div>
                <button class="btn btn-success">Зберегти</button>
            </div>
        </form>
    </div>
@endsection

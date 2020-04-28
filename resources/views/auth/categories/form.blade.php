@extends('auth.layouts.master')

@isset($category)
    @section('title', 'Редагувати категорію ' . $category->name)
@else
    @section('title', 'Створити категорію')
@endisset

@section('content')
    <div class="col-md-12">
        @isset($category)
            <h1>Редагувати категорію <b>{{ $category->name }}</b></h1>
        @else
            <h1>Створити категорію</h1>
        @endisset

        <form method="POST" enctype="multipart/form-data"
              @isset($category)
              action="{{ route('categories.update', $category) }}"
              @else
              action="{{ route('categories.store') }}"
            @endisset
        >
            <div>
                @isset($category)
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
                               value="{{old('name' , isset($category) ? $category->name : null)}}">
                    </div>
                </div>
                <br>
                <div class="input-group row">
                    <label for="image" class="col-sm-2 col-form-label">Зображення:
                        @isset($category)
                            <br>(Для видалення поточного зображення завантажте нове)
                        @endisset
                    </label>
                    <div class="col-sm-10">
                        @isset($category)
                            <td><img src="{{Storage::url($category->images)}}"
                                     height="140px"></td>
                            {{--@endisset--}}
                            {{--@isset($category)--}}
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

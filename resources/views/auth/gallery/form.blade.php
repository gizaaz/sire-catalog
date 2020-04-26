@extends('auth.layouts.master')

@isset($gallery)
    @section('title', 'Редагувати пост ' . $gallery->name)
@else
    @section('title', 'Створити пост')
@endisset

@section('content')
    <div class="col-md-12">
        @isset($gallery)
            <h1>Редагувати пост <b>{{ $gallery->name }}</b></h1>
        @else
            <h1>Добавити пост</h1>
        @endisset
        <form method="POST" enctype="multipart/form-data"
              @isset($gallery)
              action="{{ route('gallery.update', $gallery) }}"
              @else
              action="{{ route('gallery.store') }}"
            @endisset
        >
            <div>
                @isset($gallery)
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
                               value="{{old('name' , isset($gallery) ? $gallery->name : null)}}">
                    </div>
                </div>
                <br>
                <div class="input-group row">
                    <label for="description" class="col-sm-2 col-form-label">Опис: </label>
                    <div class="col-sm-6">
                        @error('description')
                        <div class="alert alert-danger">{{$message}}</div>
                        @enderror
                        <textarea name="description" id="summary-ckeditor" cols="72"
                                  rows="7">{{old('description' , isset($gallery) ? $gallery->description : null)}}</textarea>
                    </div>
                </div>
                <br>
                <div class="input-group row">
                    <label for="image" class="col-sm-2 col-form-label">Зображення:<br>
                        (Виберіть одне або декілька зображень)
                        @isset($images)
                            (Нажміть на зображення щоб видалити його)
                        @endisset
                    </label>
                    <div class="col-sm-10">
                        @isset($images)
                            @foreach($images as $image)
                                <td><img class="remove_img close_img" src="{{Storage::url($image['image'])}}"
                                         height="140px" data-id="{{$image['id']}}"></td>
                            @endforeach
                        @endisset
                        @isset($gallery)
                            <input class="button-download" type="file" multiple name="images[]" id="image">
                        @else
                            <input class="button-download" type="file" multiple required name="images[]" id="image">
                        @endisset
                    </div>
                </div>
                <button class="btn btn-success">Зберегти</button>
            </div>
        </form>
    </div>
@endsection

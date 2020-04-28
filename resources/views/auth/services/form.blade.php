@extends('auth.layouts.master')

@isset($service)
    @section('title', 'Редагувати послугу ' . $service->name)
@else
    @section('title', 'Створити послугу')
@endisset

@section('content')
    <div class="col-md-12">
        @isset($service)
            <h1>Редагувати товар <b>{{ $service->name }}</b></h1>
        @else
            <h1>Добавити товар</h1>
        @endisset
        <form method="POST" enctype="multipart/form-data"
              @isset($service)
              action="{{ route('services.update', $service) }}"
              @else
              action="{{ route('services.store') }}"
            @endisset
        >
            <div>
                @isset($service)
                    @method('PUT')
                @endisset
                @csrf
                <div class="input-group row">
                    <label for="name" class="col-sm-2 col-form-label">Назва послуги: </label>
                    <div class="col-sm-6">
                        @error('name')
                        <div class="alert alert-danger">{{$message}}</div>
                        @enderror
                        <input type="text" class="form-control" name="name" id="name"
                               value="{{old('name' , isset($service) ? $service->name : null)}}">
                    </div>
                </div>
                <br>
                    <div class="input-group row">
                        <label for="description" class="col-sm-2 col-form-label">Опис: </label>
                        <div class="col-sm-6">
                            @error('description')
                            <div class="alert alert-danger">{{$message}}</div>
                            @enderror
                            {{--<textarea class="form-control" id="summary-ckeditor" name="summary-ckeditor"></textarea>--}}
                            <textarea name="description" id="summary-ckeditor" cols="72"
                                      rows="7">{{old('description' , isset($service) ? $service->description : null)}}</textarea>
                        </div>
                    </div>
                    <br>
                <div class="input-group row">
                    <label for="summary" class="col-sm-2 col-form-label">Короткий опис: </label>
                    <div class="col-sm-6">
                        @error('summary')
                        <div class="alert alert-danger">{{$message}}</div>
                        @enderror
                        {{--<textarea class="form-control" id="summary-ckeditor" name="summary-ckeditor"></textarea>--}}
                        <textarea name="summary" id="summary-ckeditor" cols="72"
                                  rows="7">{{old('summary' , isset($service) ? $service->summary : null)}}</textarea>
                    </div>
                </div>
                <br>
                <div class="input-group row">
                    <label for="image" class="col-sm-2 col-form-label">Зображення:<br>
                        @isset($service->icon)
                            (Нажміть на зображення щоб видалити його)
                        @endisset
                    </label>
                    <div class="col-sm-10">
                        @isset($service->icon)
                                <td><img class="remove_img close_img" src="{{Storage::url($service->icon)}}"
                                         height="140px"></td>
                        @endisset
                        @isset($service)
                            <input type="file" name="image" id="image">Виберіть зображеня
                        @else
                            <input type="file" required name="image" id="image">Виберіть зображення
                        @endisset
                    </div>
                </div>
                <br>
                <div class="input-group row">
                    <label for="price" class="col-sm-2 col-form-label">Ціна: </label>
                    <div class="col-sm-2">
                        @error('price')
                        <div class="alert alert-danger">{{$message}}</div>
                        @enderror
                        <input type="text" class="form-control" name="price" id="price"
                               value="{{old('price' , isset($service) ? $service->price : null)}}">
                    </div>
                </div>
                <br>
                <button class="btn btn-success">Зберегти</button>
            </div>
        </form>
    </div>
@endsection

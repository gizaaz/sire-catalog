@extends('auth.layouts.master')

@isset($product)
    @section('title', 'Редактировать товар ' . $product->name)
@else
    @section('title', 'Создать товар')
@endisset

@section('content')
    <div class="col-md-12">
        @isset($product)
            <h1>Редагувати товар <b>{{ $product->name }}</b></h1>
        @else
            <h1>Добавити товар</h1>
        @endisset
        <form method="POST" enctype="multipart/form-data"
              @isset($product)
              action="{{ route('products.update', $product) }}"
              @else
              action="{{ route('products.store') }}"
            @endisset
        >
            <div>
                @isset($product)
                    @method('PUT')
                @endisset
                @csrf
                <div class="input-group row">
                    <label for="name" class="col-sm-2 col-form-label">Назва продукту: </label>
                    <div class="col-sm-6">
                        @error('name')
                        <div class="alert alert-danger">{{$message}}</div>
                        @enderror
                        <input type="text" class="form-control" name="name" id="name"
                               value="{{old('name' , isset($product) ? $product->name : null)}}">
                    </div>
                </div>
                <br>
                <div class="input-group row">
                    <label for="category_id" class="col-sm-2 col-form-label">Категорія: </label>
                    <div class="col-sm-6">
                        <select name="category_id" id="category_id" class="form-control">
                            @foreach($categories as $category)

                                @if(is_null($category->category_id))
                                    <option value="{{$category->id}}"
                                            @isset($product)
                                            @if($product->category_id == $category->id)
                                            selected
                                        @endif
                                        @endisset
                                    >{{$category->name}}</option>
                                @endif

                                @foreach($child_category as $child)
                                    @if($child->category_id == $category->id)
                                        <option value="{{$child->id}}"
                                                @isset($product)
                                                @if($product->category_id == $child->id)
                                                selected
                                            @endif
                                            @endisset
                                        >- {{$child->name}}</option>
                                    @endif

                                @endforeach

                            @endforeach

                        </select>
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
                                  rows="7">{{old('description' , isset($product) ? $product->description : null)}}</textarea>
                    </div>
                </div>
                <br>
                <div class="input-group row">
                    <label for="image" class="col-sm-2 col-form-label">Зображення:<br>
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
                        @isset($product)
                            <input type="file" multiple name="images[]" id="image">Виберіть одне або декілька зображень
                        @else
                            <input type="file" multiple required name="images[]" id="image">Виберіть одне або декілька
                            зображень
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
                               value="{{old('price' , isset($product) ? $product->price : null)}}">
                    </div>
                </div>
                <br>
                <div class="input-group row">
                    <label for="currency" class="col-sm-2 col-form-label">Валюта: </label>
                    <div class="col-sm-6">
                        <select name="currency" id="currency" class="form-control">
                            {{--<option value="EUR">EUR</option>--}}
                            {{--<option value="USD">USD</option>--}}
                            <option value="ГРН">ГРН</option>
                        </select>
                    </div>
                </div>
                <br>
                <div class="input-group row">
                    <label for="status" class="col-sm-2 col-form-label">Статус: </label>
                    <div class="col-sm-6">
                        <select name="status" id="status" class="form-control">
                            <option value="1">В наявності</option>
                            <option value="0">Продано</option>
                        </select>
                    </div>
                </div>
                {{--<br>--}}
                {{--<div class="input-group row">--}}
                {{--<label for="status" class="col-sm-2 col-form-label">Статус: </label>--}}
                {{--<div class="col-sm-2">--}}
                {{--<input type="text" class="form-control" name="status" id="status"--}}
                {{--value="@isset($product){{ $product->status }}@endisset">--}}
                {{--</div>--}}
                {{--</div>--}}
                <button class="btn btn-success">Зберегти</button>
            </div>
        </form>
    </div>
@endsection

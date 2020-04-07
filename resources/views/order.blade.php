@extends('layout')

@section('content')
    <form action="{{route('basket-confirm')}}" type="POST">
        <input name="name" type="text" placeholder="Ваше имя*" required>
        <input name="phone" type="tel" placeholder="Телефон*" required>
        <input name="email" type="email" placeholder="Email*" required>
        <textarea name="comment" placeholder="Комментарий к заказу"></textarea>
        <input type="submit" value="Підтвердити замовлення">
        @csrf
    </form>
@endsection

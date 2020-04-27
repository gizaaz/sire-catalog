@extends('layout')

@section('content')
    <main>
        <div class="inner-page">
            <nav aria-label="Вы находитесь здесь:" role="navigation">
                <ul class="breadcrumbs">
                    <li><a href="{{route('welcome')}}">Головна</a></li>
                    <li><span>Відгуки</span></li>
                </ul>
            </nav>
            <h1>Відгуки</h1>
            <div class="centered-block">

                @if(session()->has('success'))
                    <div class="success">
                        {{session()->get('success')}}
                    </div>
                @endif

                <div class="about-list">
                    @foreach($feedbacks as $feedback)
                        <div class="feedback">
                            <div class="feedback-info">
                                <img src="image/no-avatar.png">
                                <div class="feedback-name">{{$feedback->name}}</div>
                                <div class="feedback-date">{{$feedback->created_at->format('d.m.Y')}}</div>
                                <div class="feedback-rating">
                                    @for($i = 0; $i < $feedback->rating; $i++)
                                        <span class="rating-gold">★</span>
                                    @endfor
                                    @for($i = 5; $i > $feedback->rating; $i--)
                                        <span class="icon">★</span>
                                    @endfor
                                </div>
                            </div>
                            <div class="feedback-description"><p>{{$feedback->description}}</p>

                            </div>
                        </div>
                    @endforeach
                </div>
                <div class="connect-form-block">
                    <div class="connect-form-header">Залишити відгук</div>
                    <form method="POST" class="connect-form site-form" id="connect-form"
                          action="{{route('feedback-add')}}">
                        <div class="connect-form-top">
                            <input type="text" name="name" placeholder="Ваше і'мя*" required/>
                            <input type="email" name="email" placeholder="E-mail*" required/>
                            <textarea name="description" placeholder="Повідомлення*" required></textarea>
                            <div class="rating">
                                <label>
                                    <input type="radio" name="stars" value="1"/>
                                    <span class="icon">★</span>
                                </label>
                                <label>
                                    <input type="radio" name="stars" value="2"/>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                </label>
                                <label>
                                    <input type="radio" name="stars" value="3"/>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                </label>
                                <label>
                                    <input type="radio" name="stars" value="4"/>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                </label>
                                <label>
                                    <input type="radio" name="stars" value="5"/>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                </label>
                            </div>
                        </div>
                        <div class="connect-form-bottom">
                            <button type="submit"><a class="connect-form-btn site-btn site-btn-green-gradient" href="">
                                    <span class="white-arrow">Надіслати</span>
                                </a></button>
                        </div>
                        @csrf
                    </form>
                </div>
                    {{$feedbacks->links('pagination')}}
            </div>
        </div>
    </main>

@endsection

@extends('layout')

@section('content')
    <main>
        <div class="inner-page">
            <nav aria-label="Вы находитесь здесь:" role="navigation">
                <ul class="breadcrumbs">
                    <li><a href="{{route('welcome')}}">Головна</a></li>
                    <li><span>Наші роботи</span></li>
                </ul>
            </nav>
            <h1>Наші роботи</h1>
            <div class="centered-block">
                <div class="border-gallery"></div>
                @foreach($galleries as $gallery)
                    <div class="gallery-block">
                        <div class="gallery-title"><h1 >{{$gallery->name}}</h1></div>
                        <!-- Fotorama -->
                        <div class="gallery-image">
                            <div class="fotorama"
                                 data-minheight="400"
                                 data-maxheight="1000"
                                 data-minwidth="500"
                                 data-maxwidth="1000"
                                 data-nav="thumbs"
                                 data-arrows="true"
                                 data-allowfullscreen="true"
                            >
                                @foreach($gallery->galleryImages as $image)
                                    <a href="{{Storage::url($image['image'])}}"></a>
                                @endforeach
                            </div>
                        </div>
                        <div class="gallery-comment">
                                {!! $gallery->description !!}
                        </div>
                        <div class="border-gallery"></div>
                    </div>
                @endforeach
            </div>
        </div>
    </main>
@endsection

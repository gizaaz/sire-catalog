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

                <div class="gallery-block">

                    <h1 class="gallery-title">Модель Премио 5</h1>

                    <!-- Fotorama -->
                    <div class="fotorama"
                         data-width="1200"
                         data-height="600"
                         data-ratio="700/467"
                         data-max-width="100%"
                         data-max-height="100%"
                         data-nav="thumbs"
                         data-arrows="true"
                    >
                        <img src="https://cdn.pixabay.com/photo/2019/01/12/16/21/breakfast-3928800_960_720.jpg">
                        <img src="https://cdn.pixabay.com/photo/2020/01/17/16/01/tree-4773295_960_720.jpg">

                    </div>

                    <div class="gallery-comment">
                        <p>
                            Наші роботи. Знову «елітка» від ArtDoor, серія Premio, модель 05, яку ми довго чекали
                            побачити наживо, а не лише в каталогах. Дочекались. Дуже класно чорне скло лакобель
                            доповнюють тонкі алюмінієві вставки по всій висоті полотна. Однозачно, молдинги завжди
                            додають, і навіть не важливо в якому кольорі двері. На додаток, приховані петлі AGB Eclipse
                            з магнітним замком AGB Mediana + не попсові ручки і маємо бомбовий результат
                        </p>
                    </div>
                    <div class="border-gallery"></div>
                </div>





                <div class="gallery-block">

                    <h1>Модель Премио 5</h1>

                    <!-- Fotorama -->
                    <div class="fotorama"
                         data-width="1200"
                         data-height="600"
                         data-ratio="700/467"
                         data-max-width="100%"
                         data-max-height="100%"
                         data-nav="thumbs"
                         data-arrows="true"
                    >
                        <img src="https://cdn.pixabay.com/photo/2019/01/12/16/21/breakfast-3928800_960_720.jpg">
                        <img src="https://cdn.pixabay.com/photo/2020/01/17/16/01/tree-4773295_960_720.jpg">

                    </div>

                    <div class="gallery-comment">
                        <p>
                        </p>
                    </div>
                    <div class="border-gallery"></div>
                </div>







            </div>
        </div>
    </main>
@endsection

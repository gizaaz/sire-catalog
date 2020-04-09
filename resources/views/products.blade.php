@extends('layout')

@section('content')
    <main>
        <div itemscope itemtype="http://schema.org/Product" class="inner-page">
            <nav aria-label="Вы находитесь здесь:" role="navigation">
                <ul class="breadcrumbs" itemscope="" itemtype="http://schema.org/BreadcrumbList">
                    <li itemscope="" itemprop="itemListElement" itemtype="http://schema.org/ListItem"><a itemprop="item" href="https://www.estet-doors.ru/"><span itemprop="name">Главная</span></a><meta itemprop="position" content="1"></li>
                    <li itemscope="" itemprop="itemListElement" itemtype="http://schema.org/ListItem"><a itemprop="item" href="https://www.estet-doors.ru/catalog/"><span itemprop="name">Каталог дверей ESTET</span></a><meta itemprop="position" content="2"></li>
                    <li itemscope="" itemprop="itemListElement" itemtype="http://schema.org/ListItem"><a itemprop="item" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/"><span itemprop="name">Межкомнатные двери</span></a><meta itemprop="position" content="3"></li>
                    <li itemscope="" itemprop="itemListElement" itemtype="http://schema.org/ListItem"><link itemprop="item" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/r6-keramik/"><span itemprop="name">Межкомнатная дверь R6 Керамик</span><meta itemprop="position" content="4"></li>
                </ul>
            </nav>
            <h1 itemprop="name" class="bottom_remove">{{$product->name}}</h1>
            <div class="card-info centered-block-medium">
                <div class="card-slider-wrapper">
                    <div class="card-slider-for" id="product_images">
                        <div>
                            <a class="card-slider-item" href="https://www.estet-doors.ru/image/cache/catalog/images/dveri/royal/royal-r6_n_keramik_steklo-lacobel-chernoe-500x500.png" data-fancybox="gallery">
                                <div class="card-slider-item-zoom"></div>
                                <img src="https://www.estet-doors.ru/image/cache/catalog/images/dveri/royal/royal-r6_n_keramik_steklo-lacobel-chernoe-500x500.png" alt="Межкомнатная дверь R6 Керамик">
                            </a>
                        </div>
                    </div>
                    <div class="card-slider-nav">
                        <div>
                            <div class="card-slider-item">
                                <img src="https://www.estet-doors.ru/image/cache/catalog/images/dveri/royal/royal-r6_n_keramik_steklo-lacobel-chernoe-166x347.png" alt="Межкомнатная дверь R6 Керамик">
                            </div>
                        </div>
                    </div>
                </div>




                <div class="card-options-wrapper">

                    <div class="card-services-description padding_top">
                        <div class="is_stock">В наличии</div>
                        <div class="card-services-title">Описание</div>
                        <div itemprop="description" class="card-services-description-text"><p>Двери стандартных размеров:</p>

                            <ul>
                                <li>600 мм х1900/2000 мм</li>
                                <li>700 мм х1900/2000 мм</li>
                                <li>800 мм х1900/2000 мм</li>
                                <li>900 мм х1900/2000 мм</li>
                            </ul>

                            <p> </p>

                            <p>Также вы можете заказать дверь не стандартного размера с наценкой. <br>
                                Подробную информацию уточняйте у менеджеров-консультантов. </p>
                    </div>
                </div>
            </div>
                <div>
                    <form action="{{route('basket-add', $product->id)}}" method="POST">
                        <button type="submit" class="btn btn-primary" role="button">В корзину</button>
                        @csrf
                    </form>
                </div>

            <div class="card-attention-block centered-block-medium info_allign">

            </div>
    </main>
@endsection

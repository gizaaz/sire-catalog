@extends('layout')

@section('content')
    <main>
        <div itemscope itemtype="http://schema.org/Product" class="inner-page">
            <nav aria-label="Вы находитесь здесь:" role="navigation">
                <ul class="breadcrumbs" itemscope="" itemtype="http://schema.org/BreadcrumbList">
                    <li itemscope="" itemprop="itemListElement" itemtype="http://schema.org/ListItem"><a itemprop="item" href="{{route('catalog')}}"><span itemprop="name">Главная</span></a><meta itemprop="position" content="1"></li>
                    <li itemscope="" itemprop="itemListElement" itemtype="http://schema.org/ListItem"><a itemprop="item" href=""><span itemprop="name">Каталог дверей ESTET</span></a><meta itemprop="position" content="2"></li>
                    <li itemscope="" itemprop="itemListElement" itemtype="http://schema.org/ListItem"><a itemprop="item" href=""><span itemprop="name">Межкомнатные двери</span></a><meta itemprop="position" content="3"></li>
                    <li itemscope="" itemprop="itemListElement" itemtype="http://schema.org/ListItem"><link itemprop="item" href=""><span itemprop="name">Межкомнатная дверь R6 Керамик</span><meta itemprop="position" content="4"></li>
                </ul>
            </nav>
            <h1 itemprop="name" class="bottom_remove">{{$product->name}}</h1>
            <div class="card-info centered-block-medium">
                <div class="card-slider-wrapper">
                        <!-- Fotorama -->
                            <div class="fotorama"
                                 data-minheight="150"
                                 data-maxheight="400"
                                 data-minwidth="100"
                                 data-maxwidth="200"
                                 data-nav="thumbs"
                                 data-arrows="true"
                                 data-allowfullscreen="true"
                            >
                                @foreach($product->images as $image)
                                    <a href="{{Storage::url($image['image'])}}"></a>
                                @endforeach
                            </div>
{{--                    <div class="card-slider-nav">--}}
{{--                        <div>--}}
{{--                            @foreach($product->images as $images)--}}
{{--                            <div class="card-slider-item">--}}
{{--                                <img src="@if(isset($images->image)){{asset('storage/' . $images->image)}}@endif" alt="Межкомнатная дверь R6 Керамик">--}}
{{--                            </div>--}}
{{--                            @endforeach--}}
{{--                        </div>--}}
{{--                    </div>--}}
                </div>




                <div class="card-options-wrapper">

                    <div class="card-services-description padding_top">
                        <div class="is_stock">В наличии</div>
                        <div class="card-services-title">Описание</div>
                        <div itemprop="description" class="card-services-description-text">
                            {!! $product->description !!}
                        </div>
                    </div>
                    <div id="card-options">
                        <div class="card-params">
                            <div class="card-options-result">
                                <div class="card-options-result-bottom">
                                    <div class="card-options-result-price">
                                        <div class="card-options-result-price-title">Цена:</div>
                                        <div class="card-options-result-price-count site-price"><span class="price-val">{{$product->price}}</span>
                                            <span class="price-currency">{{$product->currency}}</span></div>
                                    </div>
                                    <form action="{{route('basket-add', $product->id)}}" method="POST">
                                        <button type="submit" role="button">
                                            <a href=""
                                               class="card-options-result-cart-btn site-btn site-btn-green-gradient"><span>В корзину</span></a>
                                        </button>
                                        @csrf
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <div class="card-attention-block centered-block-medium info_allign">

            </div>
    </main>
@endsection



@extends('layout')

@section('content')
        <main>
            <div class="main-page">
                <div class="main-top-block">
                    <div class="main-slider" d="slideshow0">
                        <div>
                            <div class="main-slider-item">
                                <div class="main-slider-item-img" style="background-image: url('https://www.estet-doors.ru/image/cache/catalog/slider/main_slider_03-1416x658.jpg');"></div>
                                <div class="main-slider-item-content">
                                    <div class="main-slider-item-title">Единый стиль</div>
                                    <div class="main-slider-item-text">Входные и межкомнатные двери в одном стиле</div>
                                    <a class="main-slider-item-btn site-btn site-btn-green-gradient" ><span>Смотреть всю коллекцию</span></a>
                                </div><a class="main-slider-item-to-bottom" href="#">Прокрутите вниз</a>
                            </div>
                        </div>
                        <div>
                            <div class="main-slider-item">
                                <div class="main-slider-item-img" style="background-image: url('https://www.estet-doors.ru/image/cache/catalog/slider/main_slider_01-1416x658.jpg');"></div>
                                <div class="main-slider-item-content">
                                    <div class="main-slider-item-title">Коллекция межкомнатных дверей<span class="thin-title"> «Novella»</span></div>
                                    <div class="main-slider-item-text">Практичные двери в скрытом коробе</div>
                                    <a class="main-slider-item-btn site-btn site-btn-green-gradient" ><span>Смотреть всю коллекцию</span></a>
                                </div><a class="main-slider-item-to-bottom" href="#">Прокрутите вниз</a>
                            </div>
                        </div>
                    </div><div class="main-slider-news" id="banner0">
                        <a>		<div>
                                <div class="main-slider-news-item news-item-white">
                                    <div class="main-slider-news-item-label">срочное объявление</div>
                                    <div class="main-slider-news-item-img" style="background-image: url('https://www.estet-doors.ru/image/cache/catalog/slider_news/news_new-1-498x282.jpg');"></div>
                                    <div class="main-slider-news-item-content">
                                        <div class="main-slider-news-item-title"><span></span><br><span class="thin-title">Наши вакансии</span></div>
                                        <div class="main-slider-news-item-text"></div>
                                    </div>
                                </div>
                            </div>
                        </a>  		<a>		<div>
                                <div class="main-slider-news-item news-item-white">
                                    <div class="main-slider-news-item-label">акция</div>
                                    <div class="main-slider-news-item-img" style="background-image: url('https://www.estet-doors.ru/image/cache/catalog/slider_news/slider-news3-498x282.jpg');"></div>
                                    <div class="main-slider-news-item-content">
                                        <div class="main-slider-news-item-title"><span class="thin-title">Cкидки до 10%<br>на входные двери</span></div>
                                        <div class="main-slider-news-item-text"></div>
                                    </div>
                                </div>
                            </div>
                        </a>  		<a>		<div>
                                <div class="main-slider-news-item news-item-white">
                                    <div class="main-slider-news-item-label">акция</div>
                                    <div class="main-slider-news-item-img" style="background-image: url('https://www.estet-doors.ru/image/cache/catalog/category/banners/nam8let-498x282.jpg');"></div>
                                    <div class="main-slider-news-item-content">
                                        <div class="main-slider-news-item-title"><span class="thin-title">Cкидки до 30% на полотна</span></div>
                                        <div class="main-slider-news-item-text"></div>
                                    </div>
                                </div>
                            </div>
                        </a>  </div>    </div>
                <h1>Магазины межкомнатных дверей ESTET</h1>
                <div class="special-offers">
                    <div class="special-offers-header">
                        <div class="special-offers-title display_hide">Специальные предложения</div>
                        <div class="special-offers-tabs tab-items tabs__caption">
                            <span class="special-offers-tab tab-item active">Новинки</span>
                        </div>
                    </div>
                    <div class="special-offers-sliders">
                        <div class="offers-slider1 special-offers-slider-block tabs-content active">
                            <div class="special-offers-slider-header">Новинки</div>
                            <div class="special-offers-slider tab-slider">
                                @foreach($products as $product)
                                <div class="special-offers-slider-item">
                                    <div class="goods-item-wrapper">
                                        <div class="goods-item">
                                            <div class="goods-item-img">
                                                <a href="{{route('product', ['id'=> $product->id])}}">
                                                    <img src="@if(isset($product->images[0]->image)){{asset('storage/' . $product->images[0]->image)}}@endif" alt="{{$product->name}}">
                                                </a>
                                            </div>
                                            <div class="goods-item-bottom"><a class="goods-item-title" href="{{route('product', ['id'=> $product->id])}}">{{$product->name}}</a>
                                                <div class="goods-price">
                                                    <div class="goods-item-price site-price">
                                                        <span class="price-val">Цена: {{$product->price}}</span>
                                                        <span class="price-currency">{{$product->currency}}</span>
                                                    </div>
                                                </div>
                                                <form action="{{route('basket-add', $product->id)}}" method="POST">
                                                    <button type="submit" role="button">
                                                        <a href=""
                                                           class="goods-item-btn site-btn site-btn-green-gradient"><span>В корзину</span></a>
                                                    </button>
                                                    @csrf
                                                </form>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                @endforeach
                            </div>
                            <input type="hidden" name="tab_id" value="2">
                            <input type="hidden" name="offset" value="5">
                            <span class="goods-btn site-btn site-btn-gray-light" id="tab_show_more2">Показать еще</span>
                        </div>
                        <script>
                            jQuery(document).ready(function($) {
                                $('#tab_show_more2').on('click', function(event) {
                                    event.preventDefault();
                                    var tab_id = $('.offers-slider2 input[name=tab_id]').val();
                                    var offset = $('.offers-slider2 input[name=offset]').val();

                                    if (typeof(tab_id) !== undefined && typeof(offset) !== undefined) {
                                        $.ajax({
                                            url: 'index.php?route=extension/module/custom_tab_settings/next_items',
                                            type: 'GET',
                                            dataType: 'html',
                                            data: {tab_id: tab_id,offset: offset},
                                            success: function (html) {
                                                $('.offers-slider2 .special-offers-slider-item:last').after(html);
                                                $('.offers-slider2 input[name=offset]').val(+offset+5);
                                            },
                                            error: function(xhr, ajaxOptions, thrownError) {
                                                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
                                            }
                                        });
                                    }
                                });
                            });
                        </script>
                    </div>
                </div>
                <div>
                    <div class="main-advantages">
                        <div class="main-advantages-content">
                            <div class="main-advantages-img"><img alt="" src="{{asset('/image/advant-img.png')}}" /></div>

                            <div class="main-advantages-text">
                                <div class="main-advantages-title"><span>Почему стоит сделать покупку</span><span class="green-text">именно у нас?</span></div>

                                <div class="main-advantages-list">
                                    <div class="main-advantages-list-items">
                                        <div class="main-advantages-list-item">
                                            <div class="main-advantages-list-item-title">Без лишних наценок</div>

                                            <div class="main-advantages-list-item-text">Мы работаем с фабриками напрямую, поэтому у нас всегда демократичные цены на продукцию</div>
                                        </div>

                                        <div class="main-advantages-list-item">
                                            <div class="main-advantages-list-item-title">Контроль качества</div>

                                            <div class="main-advantages-list-item-text">Мы следим за качеством на каждом этапе производства - от сушки до упаковки</div>
                                        </div>

                                        <div class="main-advantages-list-item">
                                            <div class="main-advantages-list-item-title">Индивидуальные решения</div>

                                            <div class="main-advantages-list-item-text">Наши дизайнеры следят за трендами на дверном рынке, и воплощают их в жизнь</div>
                                        </div>

                                        <div class="main-advantages-list-item">
                                            <div class="main-advantages-list-item-title">Гарантия до 5 лет</div>

                                            <div class="main-advantages-list-item-text">Мы предоставляем нашим клинетам гарантию до 5 лет, а так же постгарантийное обслуживание</div>
                                        </div>
                                    </div>

                                    <div class="main-advantages-sertificates">
                                        <div class="main-advantages-sertificat">
                                            <div class="main-advantages-sertificat-title"><span>Вся продукция имеет</span><span class="bold-text">сертификаты<br />
соответствия ГОСТ</span></div>

                                            <div class="main-advantages-sertificat-img"><img alt="" src="/img/sert.png" /></div>
                                        </div>
                                        <a class="main-advantages-sertificat-btn site-btn site-btn-green-border" href="/about/sertifikaty/">Все сертификаты</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </main>
@endsection

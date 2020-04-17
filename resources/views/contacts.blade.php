@extends('layout')

@section('content')

    <main>
        <div class="inner-page">
            <nav aria-label="Ви знаходитесь тут:" role="navigation">
                <ul class="breadcrumbs">
                    <li><a href="{{route('welcome')}}">Головна</a></li>
                    <li><span>Магазини</span></li>
                </ul>
            </nav>
            <h1 class="contacts">Магазини</h1>
            <div class="contacts-block">
                <div class="contacts-block-left">
                    <div class="contacts-block-map">
                        <div id="map" style="height:615px;">
                            <script type="text/javascript" charset="utf-8" async
                                    src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A3f50ad88ce054947f3ee5cda1c294a135fe3b898e0fedc13189f17ef0fc4c96f&amp;width=100%25&amp;height=615&amp;lang=ru_RU&amp;scroll=true"></script>
                        </div>

                        <div class="where-buy_contacts where-buy_contacts-new">
                            <div class="where-buy-top">
                                <div class="where-buy-list-wrapper">
                                    <div class="where-buy-list">
                                        <div class="where-buy-list-items" itemscope
                                             itemtype="http://schema.org/Organization">
                                            <p class="title" itemprop="name">ЧЕРНІВЦІ</p>

                                            <div class="where-buy-list-item">
                                                <div itemprop="address" itemscope
                                                     itemtype="http://schema.org/PostalAddress"
                                                     class="where-buy-list-item-name location-id-30"
                                                     data-wm-location-id="30"><span itemprop="streetAddress"> Фирменный салон «Art Door»</span>
                                                    <img
                                                        src="https://www.estet-doors.ru/image/cache/catalog/mskgreen-22x15.png"
                                                        class="no-active"/>
                                                    <img
                                                        src="https://www.estet-doors.ru/image/cache/catalog/mskgreen-27x19.png"
                                                        class="active"/>
                                                </div>
                                                <div class="where-buy-list-item-info">
                                                    <div
                                                        class="contacts-block-office-item contacts-block-office-address">
                                                        Чернівці, вулиця Руська, 82А
                                                    </div>
                                                    <div class="where-buy-list-item-info-item">
                                                        <a
                                                            class="contacts-block-office-item contacts-block-office-tel"
                                                            href="tel:+80503742575">+8 (050) 374-25-75</a>
                                                    </div>
                                                </div>
                                            </div>


                                            <div class="where-buy-list-item">
                                                <div itemprop="address" itemscope
                                                     itemtype="http://schema.org/PostalAddress"
                                                     class="where-buy-list-item-name location-id-30"
                                                     data-wm-location-id="30"><span itemprop="streetAddress">«Світ Дверей та Вікон»</span>
                                                    <img
                                                        src="https://www.estet-doors.ru/image/cache/catalog/mskgreen-22x15.png"
                                                        class="no-active"/>
                                                    <img
                                                        src="https://www.estet-doors.ru/image/cache/catalog/mskgreen-27x19.png"
                                                        class="active"/>
                                                </div>
                                                <div class="where-buy-list-item-info">
                                                    <div
                                                        class="contacts-block-office-item contacts-block-office-address">
                                                        Чернівці, вулиця Головна, 223Ф
                                                    </div>
                                                    <div class="where-buy-list-item-info-item">
                                                        <a
                                                            class="contacts-block-office-item contacts-block-office-tel"
                                                            href="tel:+80958215262">+8 (095) 821-52-62</a>
                                                        <a
                                                            class="contacts-block-office-item contacts-block-office-tel"
                                                            href="tel:+80503381575">+8 (050) 338-15-75</a>
                                                    </div>
                                                </div>
                                            </div>


                                            <div class="where-buy-list-item">
                                                <div itemprop="address" itemscope
                                                     itemtype="http://schema.org/PostalAddress"
                                                     class="where-buy-list-item-name location-id-30"
                                                     data-wm-location-id="30"><span itemprop="streetAddress">Калинівський ринок</span>
                                                    <img
                                                        src="https://www.estet-doors.ru/image/cache/catalog/mskgreen-22x15.png"
                                                        class="no-active"/>
                                                    <img
                                                        src="https://www.estet-doors.ru/image/cache/catalog/mskgreen-27x19.png"
                                                        class="active"/>
                                                </div>
                                                <div class="where-buy-list-item-info">
                                                    <div
                                                        class="contacts-block-office-item contacts-block-office-address">
                                                        Контейнер №100&lt;ЗС&gt; "перший хозряд від Добробуту"
                                                    </div>
                                                    <div class="where-buy-list-item-info-item">
                                                        <a
                                                            class="contacts-block-office-item contacts-block-office-tel"
                                                            href="tel:+80508215262">+8 (050) 821-52-62</a>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="where-buy-list-item">
                                                <div itemprop="address" itemscope
                                                     itemtype="http://schema.org/PostalAddress"
                                                     class="where-buy-list-item-name location-id-30"
                                                     data-wm-location-id="30"><span itemprop="streetAddress">Ринок Добробут</span>
                                                    <img
                                                        src="https://www.estet-doors.ru/image/cache/catalog/mskgreen-22x15.png"
                                                        class="no-active"/>
                                                    <img
                                                        src="https://www.estet-doors.ru/image/cache/catalog/mskgreen-27x19.png"
                                                        class="active"/>
                                                </div>
                                                <div class="where-buy-list-item-info">
                                                    <div
                                                        class="contacts-block-office-item contacts-block-office-address">
                                                        вул. Калинівська Контейнер 120 Art Door, нижняя стоянка
                                                    </div>
                                                    <div class="where-buy-list-item-info-item">
                                                        <a
                                                            class="contacts-block-office-item contacts-block-office-tel"
                                                            href="tel:+80508215262">+8 (050) 821-52-62</a>
                                                    </div>
                                                </div>
                                            </div>

                                            <p class="title" itemprop="name">ІВАНО-ФРАНКІВСЬК</p>

                                            <div class="where-buy-list-item">
                                                <div itemprop="address" itemscope
                                                     itemtype="http://schema.org/PostalAddress"
                                                     class="where-buy-list-item-name location-id-30"
                                                     data-wm-location-id="30"><span itemprop="streetAddress">Салон «Вікна-Двері»</span>
                                                    <img
                                                        src="https://www.estet-doors.ru/image/cache/catalog/mskgreen-22x15.png"
                                                        class="no-active"/>
                                                    <img
                                                        src="https://www.estet-doors.ru/image/cache/catalog/mskgreen-27x19.png"
                                                        class="active"/>
                                                </div>
                                                <div class="where-buy-list-item-info">
                                                    <div
                                                        class="contacts-block-office-item contacts-block-office-address">
                                                        Івано-Франківськ, Тисменицька вулиця, 249Б
                                                    </div>
                                                    <div class="where-buy-list-item-info-item">
                                                        <a
                                                            class="contacts-block-office-item contacts-block-office-tel"
                                                            href="tel:+80953737221">+8 (095) 37-37-221</a>
                                                        <a
                                                            class="contacts-block-office-item contacts-block-office-tel"
                                                            href="tel:+80673737221">+8 (067) 37-37-221</a>
                                                    </div>
                                                </div>
                                            </div>


                                            <div class="where-buy-list-item">
                                                <div itemprop="address" itemscope
                                                     itemtype="http://schema.org/PostalAddress"
                                                     class="where-buy-list-item-name location-id-30"
                                                     data-wm-location-id="30"><span itemprop="streetAddress">«Галерея Дверей Плюс»</span>
                                                    <img
                                                        src="https://www.estet-doors.ru/image/cache/catalog/mskgreen-22x15.png"
                                                        class="no-active"/>
                                                    <img
                                                        src="https://www.estet-doors.ru/image/cache/catalog/mskgreen-27x19.png"
                                                        class="active"/>
                                                </div>
                                                <div class="where-buy-list-item-info">
                                                    <div
                                                        class="contacts-block-office-item contacts-block-office-address">
                                                        Івано-Франківськ, вулиця Вовчинецька, 191
                                                    </div>
                                                    <div class="where-buy-list-item-info-item">
                                                        <a
                                                            class="contacts-block-office-item contacts-block-office-tel"
                                                            href="tel:+80342712395">+8 (0342) 71-23-95</a>
                                                        <a
                                                            class="contacts-block-office-item contacts-block-office-tel"
                                                            href="tel:+80673431547">+8 (067) 34-315-47</a>
                                                    </div>
                                                </div>
                                            </div>

                                            <p class="title" itemprop="name">ЗАСТАВНА</p>

                                            <div class="where-buy-list-item">
                                                <div itemprop="address" itemscope
                                                     itemtype="http://schema.org/PostalAddress"
                                                     class="where-buy-list-item-name location-id-30"
                                                     data-wm-location-id="30"><span itemprop="streetAddress">«Світ Дверей та Вікон»</span>
                                                    <img
                                                        src="https://www.estet-doors.ru/image/cache/catalog/mskgreen-22x15.png"
                                                        class="no-active"/>
                                                    <img
                                                        src="https://www.estet-doors.ru/image/cache/catalog/mskgreen-27x19.png"
                                                        class="active"/>
                                                </div>
                                                <div class="where-buy-list-item-info">
                                                    <div
                                                        class="contacts-block-office-item contacts-block-office-address">
                                                        Вулиця Котовского, 3А
                                                    </div>
                                                    <div class="where-buy-list-item-info-item">
                                                        <a
                                                            class="contacts-block-office-item contacts-block-office-tel"
                                                            href="tel:+80503737563">+8 (050) 37-37-563</a>
                                                        <a
                                                            class="contacts-block-office-item contacts-block-office-tel"
                                                            href="tel:+80673737653">+8 (067) 37-37-653</a>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
@endsection

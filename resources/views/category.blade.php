@extends('layout')

@section('content')
        <main>
            <div class="inner-page catalog-page">
                <nav aria-label="Вы находитесь здесь:" role="navigation">
                    <ul class="breadcrumbs">
                        <li><a href="{{route('welcome')}}">Головна</a></li>
                        <li><a href="{{route('catalog')}}">Каталог дверей</a></li>
                        <li><span>{{$categor->category_name}}</span></li>
                    </ul>
                </nav>
                <h1>{{$categor->category_name}}</h1>



                <div class = "parametr-search-wrapper">
                    <div class="parametr-search-mobile"><span>Поиск по параметрам</span></div>
                    <div class="parametr-search box mfilter-box mfilter-box-1 mfilter-content_top mfilter-direction-ltr" id="mfilter-box-1">
                        <h3 class="box-heading">Подбор по параметрам</h3>
                        <div class="box-content mfilter-content mfilter-hide-counter">
                            <ul>
                                <li
                                    data-type="price"
                                    data-base-type="price"
                                    data-id="price"
                                    data-group-key=""
                                    data-seo-name="price"
                                    data-inline-horizontal="0"
                                    data-display-live-filter="0"
                                    data-display-list-of-items="-1"
                                    class="mfilter-filter-item mfilter-price mfilter-price"
                                >

                                    <div class="mfilter-heading">
                                        <div class="mfilter-heading-content">
                                            <div class="mfilter-heading-text">
                                                <span>Цена</span>

                                            </div>
                                            <i class="mfilter-head-icon"></i>
                                        </div>
                                    </div>

                                    <div class="mfilter-content-opts">
                                        <div class="mfilter-opts-container">
                                            <div class="mfilter-content-wrapper">
                                                <div class="mfilter-options">
                                                    <div class="mfilter-option mfilter-price">
                                                        <div class="mfilter-price-inputs">
                                                            <input
                                                                id="mfilter-opts-price-min"
                                                                type="text"
                                                                class="form-control"
                                                                value=""
                                                            />
                                                            -
                                                            <input
                                                                id="mfilter-opts-price-max"
                                                                type="text"
                                                                class="form-control"
                                                                value=""
                                                            />
                                                        </div>
                                                        <div class="mfilter-price-slider">
                                                            <div id="mfilter-price-slider"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="mfilter-clearfix"></div>
                                        </div>

                                        <div class="mfilter-clearfix"></div>
                                    </div>
                                </li>
                                <li
                                    data-type="select"
                                    data-base-type="option"
                                    data-id="1"
                                    data-group-key=""
                                    data-seo-name="1o-"
                                    data-inline-horizontal="0"
                                    data-display-live-filter="0"
                                    data-display-list-of-items="-1"
                                    class="mfilter-filter-item mfilter-select mfilter-option mfilter-options"
                                >

                                    <div class="mfilter-heading">
                                        <div class="mfilter-heading-content">
                                            <div class="mfilter-heading-text">
                                                <span>Цвет стекла</span>

                                            </div>
                                            <i class="mfilter-head-icon"></i>
                                        </div>
                                    </div>

                                    <div class="mfilter-content-opts">
                                        <div class="mfilter-opts-container">
                                            <div class="mfilter-content-wrapper">
                                                <div class="mfilter-options">
                                                    <div class="mfilter-tb">
                                                        <div class="mfilter-option mfilter-select">
                                                            <select class="form-control">
                                                                <option class="default_state" value="">Выбрать</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-1-301"
                                                                    value="301"
                                                                    data-name="Cover glass"
                                                                >Cover glass</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-1-174"
                                                                    value="174"
                                                                    data-name="Без стекла"
                                                                >Без стекла</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-1-191"
                                                                    value="191"
                                                                    data-name="Зеркало 4мм. Графит"
                                                                >Зеркало 4мм. Графит</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-1-300"
                                                                    value="300"
                                                                    data-name="Зеркало сияние"
                                                                >Зеркало сияние</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-1-201"
                                                                    value="201"
                                                                    data-name="Лакобель Аляска"
                                                                >Лакобель Аляска</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-1-186"
                                                                    value="186"
                                                                    data-name="Лакобель белый"
                                                                >Лакобель белый</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-1-188"
                                                                    value="188"
                                                                    data-name="Лакобель молочный"
                                                                >Лакобель молочный</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-1-187"
                                                                    value="187"
                                                                    data-name="Лакобель черный"
                                                                >Лакобель черный</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-1-296"
                                                                    value="296"
                                                                    data-name="Лакобель шамуа"
                                                                >Лакобель шамуа</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-1-189"
                                                                    value="189"
                                                                    data-name="Матовый белый"
                                                                >Матовый белый</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-1-190"
                                                                    value="190"
                                                                    data-name="Матовый бронзовый"
                                                                >Матовый бронзовый</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-1-198"
                                                                    value="198"
                                                                    data-name="Сатинат белый"
                                                                >Сатинат белый</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-1-196"
                                                                    value="196"
                                                                    data-name="Сатинат бронзовый"
                                                                >Сатинат бронзовый</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-1-299"
                                                                    value="299"
                                                                    data-name="Сатинат графит"
                                                                >Сатинат графит</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-1-297"
                                                                    value="297"
                                                                    data-name="Триплекс белоснежный"
                                                                >Триплекс белоснежный</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-1-177"
                                                                    value="177"
                                                                    data-name="Триплекс белый"
                                                                >Триплекс белый</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-1-185"
                                                                    value="185"
                                                                    data-name="Триплекс бронзовый"
                                                                >Триплекс бронзовый</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-1-203"
                                                                    value="203"
                                                                    data-name="Триплекс графит"
                                                                >Триплекс графит</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-1-298"
                                                                    value="298"
                                                                    data-name="Триплекс прозрачный"
                                                                >Триплекс прозрачный</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-1-179"
                                                                    value="179"
                                                                    data-name="Триплекс черный "
                                                                >Триплекс черный </option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="mfilter-clearfix"></div>
                                        </div>

                                        <div class="mfilter-clearfix"></div>
                                    </div>
                                </li>
                                <li
                                    data-type="select"
                                    data-base-type="option"
                                    data-id="2"
                                    data-group-key=""
                                    data-seo-name="2o-"
                                    data-inline-horizontal="0"
                                    data-display-live-filter="0"
                                    data-display-list-of-items="-1"
                                    class="mfilter-filter-item mfilter-select mfilter-option mfilter-options"
                                >

                                    <div class="mfilter-heading">
                                        <div class="mfilter-heading-content">
                                            <div class="mfilter-heading-text">
                                                <span>Цвет</span>

                                            </div>
                                            <i class="mfilter-head-icon"></i>
                                        </div>
                                    </div>

                                    <div class="mfilter-content-opts">
                                        <div class="mfilter-opts-container">
                                            <div class="mfilter-content-wrapper">
                                                <div class="mfilter-options">
                                                    <div class="mfilter-tb">
                                                        <div class="mfilter-option mfilter-select">
                                                            <select class="form-control">
                                                                <option class="default_state" value="">Выбрать</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-242"
                                                                    value="242"
                                                                    data-name="  Enamel Жемчужный"
                                                                >  Enamel Жемчужный</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-265"
                                                                    value="265"
                                                                    data-name="Boonlayer Белый глянец"
                                                                >Boonlayer Белый глянец</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-94"
                                                                    value="94"
                                                                    data-name="Boonlayer Белый шоколад"
                                                                >Boonlayer Белый шоколад</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-266"
                                                                    value="266"
                                                                    data-name="Boonlayer Брандо"
                                                                >Boonlayer Брандо</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-60"
                                                                    value="60"
                                                                    data-name="Boonlayer Венге кантри"
                                                                >Boonlayer Венге кантри</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-106"
                                                                    value="106"
                                                                    data-name="Boonlayer Дворцовое дерево"
                                                                >Boonlayer Дворцовое дерево</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-83"
                                                                    value="83"
                                                                    data-name="Boonlayer Дуб гранж"
                                                                >Boonlayer Дуб гранж</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-269"
                                                                    value="269"
                                                                    data-name="Boonlayer Дуб серый"
                                                                >Boonlayer Дуб серый</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-204"
                                                                    value="204"
                                                                    data-name="Boonlayer Дуб торонто"
                                                                >Boonlayer Дуб торонто</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-81"
                                                                    value="81"
                                                                    data-name="Boonlayer Капучино"
                                                                >Boonlayer Капучино</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-86"
                                                                    value="86"
                                                                    data-name="Boonlayer Кедр орегон"
                                                                >Boonlayer Кедр орегон</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-223"
                                                                    value="223"
                                                                    data-name="Boonlayer Клён аваланж"
                                                                >Boonlayer Клён аваланж</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-23"
                                                                    value="23"
                                                                    data-name="Boonlayer Клён экрю"
                                                                >Boonlayer Клён экрю</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-84"
                                                                    value="84"
                                                                    data-name="Boonlayer Корица"
                                                                >Boonlayer Корица</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-82"
                                                                    value="82"
                                                                    data-name="Boonlayer Кофейное дерево"
                                                                >Boonlayer Кофейное дерево</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-271"
                                                                    value="271"
                                                                    data-name="Boonlayer Ларче"
                                                                >Boonlayer Ларче</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-76"
                                                                    value="76"
                                                                    data-name="Boonlayer Мокко"
                                                                >Boonlayer Мокко</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-273"
                                                                    value="273"
                                                                    data-name="Boonlayer Орех мраморный"
                                                                >Boonlayer Орех мраморный</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-275"
                                                                    value="275"
                                                                    data-name="Boonlayer Орех орлеан"
                                                                >Boonlayer Орех орлеан</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-88"
                                                                    value="88"
                                                                    data-name="Boonlayer Орех шаде"
                                                                >Boonlayer Орех шаде</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-277"
                                                                    value="277"
                                                                    data-name="Boonlayer Сенди"
                                                                >Boonlayer Сенди</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-92"
                                                                    value="92"
                                                                    data-name="Boonlayer Темный шоколад"
                                                                >Boonlayer Темный шоколад</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-79"
                                                                    value="79"
                                                                    data-name="Boonlayer Ясень жемчуг"
                                                                >Boonlayer Ясень жемчуг</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-244"
                                                                    value="244"
                                                                    data-name="Enamel Небесный"
                                                                >Enamel Небесный</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-243"
                                                                    value="243"
                                                                    data-name="Enamel Олива золотая"
                                                                >Enamel Олива золотая</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-99"
                                                                    value="99"
                                                                    data-name="Enamel Полярный"
                                                                >Enamel Полярный</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-356"
                                                                    value="356"
                                                                    data-name="Lacquer ral 9003"
                                                                >Lacquer ral 9003</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-121"
                                                                    value="121"
                                                                    data-name="Lacquer Агат"
                                                                >Lacquer Агат</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-123"
                                                                    value="123"
                                                                    data-name="Lacquer Айвори"
                                                                >Lacquer Айвори</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-130"
                                                                    value="130"
                                                                    data-name="Lacquer Белый"
                                                                >Lacquer Белый</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-127"
                                                                    value="127"
                                                                    data-name="Lacquer Лунный"
                                                                >Lacquer Лунный</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-122"
                                                                    value="122"
                                                                    data-name="Lacquer Мускат"
                                                                >Lacquer Мускат</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-128"
                                                                    value="128"
                                                                    data-name="Lacquer Муссон"
                                                                >Lacquer Муссон</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-124"
                                                                    value="124"
                                                                    data-name="Lacquer Перламутр бежевый"
                                                                >Lacquer Перламутр бежевый</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-129"
                                                                    value="129"
                                                                    data-name="Lacquer Песчанный"
                                                                >Lacquer Песчанный</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-125"
                                                                    value="125"
                                                                    data-name="Lacquer Черный"
                                                                >Lacquer Черный</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-126"
                                                                    value="126"
                                                                    data-name="Lacquer Шоколад"
                                                                >Lacquer Шоколад</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-280"
                                                                    value="280"
                                                                    data-name="Laquer ral_3002"
                                                                >Laquer ral_3002</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-281"
                                                                    value="281"
                                                                    data-name="Laquer ral_5009"
                                                                >Laquer ral_5009</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-282"
                                                                    value="282"
                                                                    data-name="Laquer ral_5021"
                                                                >Laquer ral_5021</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-283"
                                                                    value="283"
                                                                    data-name="Laquer ral_6019"
                                                                >Laquer ral_6019</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-284"
                                                                    value="284"
                                                                    data-name="Laquer ral_9010"
                                                                >Laquer ral_9010</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-254"
                                                                    value="254"
                                                                    data-name="Loft Бетон антрацит"
                                                                >Loft Бетон антрацит</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-255"
                                                                    value="255"
                                                                    data-name="Loft Бетон серый"
                                                                >Loft Бетон серый</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-286"
                                                                    value="286"
                                                                    data-name="Naturewood Custard"
                                                                >Naturewood Custard</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-288"
                                                                    value="288"
                                                                    data-name="Naturewood Smok"
                                                                >Naturewood Smok</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-118"
                                                                    value="118"
                                                                    data-name="NatureWood White"
                                                                >NatureWood White</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-205"
                                                                    value="205"
                                                                    data-name="NatureWood Ясень винтер"
                                                                >NatureWood Ясень винтер</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-290"
                                                                    value="290"
                                                                    data-name="Naturewood Ясень грау"
                                                                >Naturewood Ясень грау</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-293"
                                                                    value="293"
                                                                    data-name="Naturewood Ясень пастель"
                                                                >Naturewood Ясень пастель</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-294"
                                                                    value="294"
                                                                    data-name="Naturewood Ясень сайлент"
                                                                >Naturewood Ясень сайлент</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-74"
                                                                    value="74"
                                                                    data-name="Premium Белый горизонт"
                                                                >Premium Белый горизонт</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-78"
                                                                    value="78"
                                                                    data-name="Premium Белый горизонт"
                                                                >Premium Белый горизонт</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-113"
                                                                    value="113"
                                                                    data-name="Premium Ваниль"
                                                                >Premium Ваниль</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-61"
                                                                    value="61"
                                                                    data-name="Premium Венге горизонт"
                                                                >Premium Венге горизонт</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-58"
                                                                    value="58"
                                                                    data-name="Premium Джерси"
                                                                >Premium Джерси</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-62"
                                                                    value="62"
                                                                    data-name="Premium Керамик"
                                                                >Premium Керамик</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-119"
                                                                    value="119"
                                                                    data-name="Premium Мидл"
                                                                >Premium Мидл</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-249"
                                                                    value="249"
                                                                    data-name="Premium Осина крем"
                                                                >Premium Осина крем</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-115"
                                                                    value="115"
                                                                    data-name="Premium Софт белый"
                                                                >Premium Софт белый</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-71"
                                                                    value="71"
                                                                    data-name="Premium Шато"
                                                                >Premium Шато</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-114"
                                                                    value="114"
                                                                    data-name="Premium Ясень золото"
                                                                >Premium Ясень золото</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-252"
                                                                    value="252"
                                                                    data-name="Premium Ясень серебро"
                                                                >Premium Ясень серебро</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-262"
                                                                    value="262"
                                                                    data-name="Soft Touch Адамант"
                                                                >Soft Touch Адамант</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-261"
                                                                    value="261"
                                                                    data-name="Soft Touch Гавана"
                                                                >Soft Touch Гавана</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-91"
                                                                    value="91"
                                                                    data-name="Standart Белое дерево"
                                                                >Standart Белое дерево</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-236"
                                                                    value="236"
                                                                    data-name="Standart Венге"
                                                                >Standart Венге</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-55"
                                                                    value="55"
                                                                    data-name="Standart Венге 26"
                                                                >Standart Венге 26</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-73"
                                                                    value="73"
                                                                    data-name="Standart Венге светлый"
                                                                >Standart Венге светлый</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-64"
                                                                    value="64"
                                                                    data-name="Standart Венге шелк"
                                                                >Standart Венге шелк</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-90"
                                                                    value="90"
                                                                    data-name="Standart Золотой дуб"
                                                                >Standart Золотой дуб</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-50"
                                                                    value="50"
                                                                    data-name="Standart Миланский орех"
                                                                >Standart Миланский орех</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-2-53"
                                                                    value="53"
                                                                    data-name="Ультрашпон Дуб беленый"
                                                                >Ультрашпон Дуб беленый</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="mfilter-clearfix"></div>
                                        </div>

                                        <div class="mfilter-clearfix"></div>
                                    </div>
                                </li>
                                <li
                                    data-type="select"
                                    data-base-type="attribute"
                                    data-id="13"
                                    data-group-key=""
                                    data-seo-name="13-"
                                    data-inline-horizontal="0"
                                    data-display-live-filter="0"
                                    data-display-list-of-items="-1"
                                    class="mfilter-filter-item mfilter-select mfilter-attribute mfilter-attributes"
                                >

                                    <div class="mfilter-heading">
                                        <div class="mfilter-heading-content">
                                            <div class="mfilter-heading-text">
                                                <span>Тип двери</span>

                                            </div>
                                            <i class="mfilter-head-icon"></i>
                                        </div>
                                    </div>

                                    <div class="mfilter-content-opts">
                                        <div class="mfilter-opts-container">
                                            <div class="mfilter-content-wrapper">
                                                <div class="mfilter-options">
                                                    <div class="mfilter-tb">
                                                        <div class="mfilter-option mfilter-select">
                                                            <select class="form-control">
                                                                <option class="default_state" value="">Выбрать</option>
                                                                <option
                                                                    id="mfilter-opts-select-1-13-e1fde0f0d617208f425217c93cd088b2"
                                                                    value="Межкомнатная"
                                                                    data-name="Межкомнатная"
                                                                >Межкомнатная</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="mfilter-clearfix"></div>
                                        </div>

                                        <div class="mfilter-clearfix"></div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>


                <script type="text/javascript">
                    MegaFilterLang.text_display = 'Показать';
                    MegaFilterLang.text_list	= 'Список';
                    MegaFilterLang.text_grid	= 'Сетка';
                    MegaFilterLang.text_select	= '---';

                    if( typeof MegaFilterOverrideFn == 'undefined' ) {
                        var MegaFilterOverrideFn = {};
                    }

                    if( typeof MegaFilterCommonData == 'undefined' ) {
                        var MegaFilterCommonData = {};
                    }

                    MegaFilterCommonData.seo = {
                        'currentUrl' : 'https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/',
                        'aliases' : []	};

                    if( typeof MegaFilterOverrideFn['1'] == 'undefined' ) {
                        MegaFilterOverrideFn['1'] = {};
                    }

                    MegaFilterOverrideFn[1]["beforeRequest"] = function() {
                        var self = this;
                    };

                    MegaFilterOverrideFn[1]["beforeRender"] = function( htmlResponse, htmlContent, json ) {
                        var self = this;
                    };

                    MegaFilterOverrideFn[1]["afterRender"] = function( htmlResponse, htmlContent, json ) {
                        var self = this;
                    };

                    jQuery().ready(function(){
                        jQuery('#mfilter-box-1').each(function(){
                            var _t = jQuery(this).addClass('init'),
                                _p = { };

                            for( var i = 0; i < MegaFilterINSTANCES.length; i++ ) {
                                if( _t.attr('id') == MegaFilterINSTANCES[i]._box.attr('id') ) {
                                    return;
                                }
                            }

                            _p['path'] = '16';
                            _p['path_aliases'] = '';

                            var mfpModule = new MegaFilter();

                            if( typeof MegaFilterOverrideFn['1'] != 'undefined' ) {
                                for( var i in MegaFilterOverrideFn['1'] ) {
                                    mfpModule[i] = MegaFilterOverrideFn['1'][i];
                                }
                            }

                            MegaFilterINSTANCES.push(mfpModule.init( _t, {
                                'idx'					: '1',
                                'route'					: 'cHJvZHVjdC9jYXRlZ29yeQ==',
                                'routeProduct'			: 'cHJvZHVjdC9wcm9kdWN0',
                                'routeHome'				: 'Y29tbW9uL2hvbWU=',
                                'routeCategory'			: 'cHJvZHVjdC9jYXRlZ29yeQ==',
                                'routeInformation'		: 'aW5mb3JtYXRpb24vaW5mb3JtYXRpb24=',
                                'contentSelector'		: '#mfilter-content-container',
                                'contentSelectorH1'		: '.inner-page',
                                'refreshResults'		: 'immediately',
                                'refreshDelay'			: 1000,
                                'usingButtonWithCountInfo' : false,
                                'autoScroll'			: false,
                                'ajaxGetInfoUrl'		: 'https://www.estet-doors.ru/index.php?route=module/mega_filter/getajaxinfo',
                                'ajaxResultsUrl'		: 'https://www.estet-doors.ru/index.php?route=module/mega_filter/results',
                                'ajaxGetCategoryUrl'	: 'https://www.estet-doors.ru/index.php?route=module/mega_filter/getcategories',
                                'priceMin'				: 0,
                                'priceMax'				: 23840,
                                'mijoshop'				: false,
                                'joo_cart'				: false,
                                'showNumberOfProducts'	: true,
                                'calculateNumberOfProducts' : false,
                                'addPixelsFromTop'		: 0,
                                'displayListOfItems'	: {
                                    'type'				: 'scroll',
                                    'limit_of_items'	: 4,
                                    'maxHeight'			: 155,
                                    'textMore'			: 'Показать ещё (%s)',
                                    'textLess'			: 'Показать меньше',
                                    'standardScroll'	: false				},
                                'smp'					: {
                                    'isInstalled'			: false,
                                    'disableConvertUrls'	: false				},
                                'params'					: _p,
                                'inStockDefaultSelected'	: false,
                                'inStockDefaultSelectedGlobal' : false,
                                'inStockStatus'				: '7',
                                'showLoaderOverResults'		: true,
                                'showLoaderOverFilter'		: false,
                                'hideInactiveValues'		: true,
                                'manualInit'				: false,
                                'homePageAJAX'				: false,
                                'homePageContentSelector'	: '#content',
                                'ajaxPagination'			: false,
                                'text'						: {
                                    'loading'		: 'Загрузка...',
                                    'go_to_top'		: 'Перейти к началу',
                                    'init_filter'	: 'Поиск с фильтрацией',
                                    'initializing'	: 'Инициализация...'
                                },
                                'color' : {
                                    'loader_over_results' : '#ffffff',
                                    'loader_over_filter' : '#ffffff'
                                },
                                'direction'				: 'ltr',
                                'seo' : {
                                    'enabled'	: false,
                                    'aliasesEnabled' : false,
                                    'alias'		: '',
                                    'parameter'	: 'mfp',
                                    'separator'	: 'mfp',
                                    'valuesAreLinks' : false,
                                    'valuesLinksAreClickable' : false,
                                    'usePostAjaxRequests' : false,
                                    'addSlashAtTheEnd' : false,
                                    'metaRobots' : false,
                                    'metaRobotsValue' : 'noindex,follow'
                                },
                                'displayAlwaysAsWidget'		: false,
                                'displaySelectedFilters'	: false,
                                'isMobile' : false,
                                'widgetWithSwipe' : true,
                                'widgetPosition' : '',
                                'theme' : '',
                                'data' : {
                                    'category_id' : 16				}
                            }));
                        });
                    });
                </script><div id="mfilter-content-container">    <div id="mfilter-content-container">

                        <div class="sort-wrapper centered-block">
                            <div class="sort-block">
                                <div class="sort-block-quantity sort-block-item">
                                    <div class="sort-block-item-title">Показать</div>
                                    <div class="sort-block-item-content selected_view">
                                        <span value="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/?limit=32" onclick="location = 'https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/?limit=32'">32</span>
                                        <span value="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/?limit=40" class="active" onclick="location = 'https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/?limit=40'">40</span>
                                        <span value="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/?limit=64" onclick="location = 'https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/?limit=64'">64</span>
                                    </div>
                                </div>
                                <div class="sort-block-sorting sort-block-item">
                                    <div class="sort-block-item-title">Сортировка:</div>
                                    <div class="sort-block-item-content selected_sort">
                                        <div class="sort-block-sorting-item ">
                                            <div class="sort-block-sorting-item-title" onclick="location='https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/?sort=pd.name&amp;order=ASC'">По имени</div>
                                            <div class="sort-block-sorting-item-switches">
                                                <label class="asc">
                                                    <input type="radio"  name="name-switch" id="asc-name"><span class="fa fa-caret-up"></span>
                                                </label>
                                                <label class="desc">
                                                    <input type="radio"  name="name-switch" id="name-price"><span class="fa fa-caret-down"></span>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="sort-block-sorting-item ">
                                            <div class="sort-block-sorting-item-title" onclick="location='https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/?sort=p.price&amp;order=ASC'">По цене</div>
                                            <div class="sort-block-sorting-item-switches">
                                                <label class="asc">
                                                    <input type="radio"  name="price-switch" id="asc-price"><span class="fa fa-caret-up"></span>
                                                </label>
                                                <label class="desc">
                                                    <input type="radio"  name="price-switch" id="desc-price"><span class="fa fa-caret-down"></span>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="sort-block-sorting-item ">
                                            <div class="sort-block-sorting-item-title" onclick="location='https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/?sort=sale&amp;order=ASC'">По размеру скидки</div>
                                            <div class="sort-block-sorting-item-switches">
                                                <label class="asc">
                                                    <input type="radio"  name="sale-switch" id="asc-sale"><span class="fa fa-caret-up"></span>
                                                </label>
                                                <label class="desc">
                                                    <input type="radio"  name="sale-switch" id="desc-sale"><span class="fa fa-caret-down"></span>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="sort-block-sorting-item ">
                                            <div class="sort-block-sorting-item-title" onclick="location='https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/?sort=p.viewed&amp;order=ASC'">По популярности</div>
                                            <div class="sort-block-sorting-item-switches">
                                                <label class="asc">
                                                    <input type="radio"  name="popular-switch" id="asc-popular"><span class="fa fa-caret-up"></span>
                                                </label>
                                                <label class="desc">
                                                    <input type="radio"  name="popular-switch" id="desc-popular"><span class="fa fa-caret-down"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="sort-block-item sort-block-in_stock">
                                    <div class="selected_checkbox">
                                        <label class="site-check">
                                            <input type="checkbox"  onclick="location = 'https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/?sort=p.on_stock'" id="only_in_stock" value="1">
                                            <span class="custom-check fa fa-check"></span>
                                            <span>Только в наличии</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="goods-list-wrapper">
                            <div class="goods-list">
                                @foreach($products as $product)
                                <div class="goods-item-wrapper">
                                    <div class="goods-item">
                                        <div class="goods-item-img"><a href="{{route('product', ['id'=> $product->id])}}"><img src="https://www.estet-doors.ru/image/cache/catalog/category/brussel/brussel_br5-x_nf_jasen-grau-117x234.png" alt="Межкомнатная дверь BR5X"></a>
                                        </div>
                                        <div class="goods-item-bottom"><a class="goods-item-title" href="{{route('product', ['id'=> $product->id])}}">{{$product->name}}</a>
                                            <div class="goods-price">
                                                <div class="goods-item-price site-price">
                                                    <span class="price-val">Ціна: {{$product->price}} </span>
                                                    <span class="price-currency">грн.</span>
                                                </div>
                                            </div>
                                            <div class="is_stock"></div>
                                            <a class="goods-item-btn site-btn site-btn-green-gradient" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/brussel/br5x/" onclick="cart.add('1285', '1');return false;"> <span>Купить</span></a>
                                        </div>
                                    </div>
                                </div>
                                @endforeach
                            <div class="pagination-block centered-block">
                                {{$products->links()}}
                            </div>

                        </div>

                    </div>
                </div>
        </main>
@endsection

@extends('layout')

@section('content')
<main>
    <div class="inner-page">
        <nav aria-label="Вы находитесь здесь:" role="navigation">
            <ul class="breadcrumbs">
                <li><a href="{{route('welcome')}}">Главная</a></li>
                <li><span>Акции</span></li>
            </ul>
        </nav>
        <h1>Акция!</h1>
        <div class="about-pages-wrapper news-wrapper centered-block">
            <div class="news-list-wrapper list_style_image">
                <ul>
                    <li><strong>скидка 30%</strong> на полотна (за исключением Перегородок), распространяется на весь межкомнатный модельный ряд при условии заказа входной двери и полного комплекта фурнитуры</li>
                    <li><strong>скидка 30%</strong> на полотна в Белой эмали при условии заказа полного комплекта фурнитуры</li>
                    <li><strong>скидка 30%</strong> на стеновые панели, декоративные рейки</li>
                    <li><strong>скидка 25%</strong> на полотна, распространяется на весь межкомнатный модельный ряд и перегородки при условии заказа полного комплекта фурнитуры</li>
                    <li><strong>скидка 15%</strong> на полотна, распространяется на весь межкомнатный модельный ряд без фурнитуры</li>
                    <li><strong>скидка 20%</strong>&nbsp;снижена наценка за покраску по индивидуальному RAL</li>
                    <li><strong>скидка 10%</strong> на скрытый короб (на сам короб, НЕ на комплект)</li>
                    <li><strong>скидка 5%</strong> на плинтус</li>
                    <li><strong>скидка 5%</strong> на погонаж в эмали при условии заказа межкомнатных дверей (на дозаказ погонажа скидка не действует)</li>
                    <li><strong>скидка 10%</strong> на входные двери под заказ от 70 тыс. руб.</li>
                    <li><strong>скидка 7%</strong> на входные двери под заказ от 40 тыс. руб.</li>
                    <li><strong>скидка 3%</strong> на входные двери под заказ до 40 тыс. руб.</li>
                    <li><strong>ПОДАРОК</strong> стандартная установка на стальные двери в наличии (за исключением позиций из Распродажи)</li>
                    <li><strong>1300 руб.</strong> врезка межкомнатных дверей с карточными петлями</li>
                    <li><strong>1600 руб.</strong> врезка межкомнатных дверей со скрытыми петлями</li>
                </ul>

                <p align="center"><strong>Предложение действует до 15 марта!</strong></p>
                <div class="pagination-block centered-block">
                </div>
            </div>
            <div class="about-menu-wrapper buyers-menu">
                <div class="buyers-menu-header">На что обратить внимание:</div>
                <nav>
                    <ul>
                        <li><a href="">Акции</a></li>
                        <li><a href="">Словарь терминов</a></li>
                        <li><a href="">Статьи</a></li>
                        <li><a href="">Как выбрать дверь</a></li>
                        <li><a href="">Полезно</a></li>
                        <li><a href="">Смотреть видео о нашем производстве</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</main>
@endsection

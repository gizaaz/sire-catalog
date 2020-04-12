@extends('layout')

@section('content')
<main>
    <div class="inner-page">
        <nav aria-label="Вы находитесь здесь:" role="navigation">
            <ul class="breadcrumbs">
                <li><a href="https://www.estet-doors.ru/">Главная</a></li>
                <li><span>Партнерам</span></li>
            </ul>
        </nav>
        <h1>Партнерам</h1>
        <div class="centered-block">
            <div class="news-list-wrapper">
                <div class="news-list">
                    <div class="news-list-item">
                        <div class="news-list-item-img">
                        </div>
                        <div class="news-list-item-content">
                            <a class="news-list-item-name" href="">Дилерам</a>
                            <div class="news-list-item-desc">Компания ESTET  предлагает эксклюзивные условия на образцы дверей из складской программы</div>
                        </div>
                    </div>
                    <div class="news-list-item">
                        <div class="news-list-item-img">
                        </div>
                        <div class="news-list-item-content">
                            <a class="news-list-item-name" href="">Дизайнерам и архитекторам</a>
                            <div class="news-list-item-desc">Группа компаний ESTET активно сотрудничает с дизайнерами интерьеров, архитекторами</div>
                        </div>
                    </div>
                    <div class="news-list-item">
                        <div class="news-list-item-img">
                        </div>
                        <div class="news-list-item-content">
                            <a class="news-list-item-name" href="">Строителям</a>
                            <div class="news-list-item-desc">Группа компаний ESTET активно сотрудничает со строительными компаниями и организациями</div>
                        </div>
                    </div>
                </div>
                <div class="pagination-block centered-block">
                </div>
            </div>
            <div class="partners-wrapper">
                <div class="partners-left">
                    <div class="partners-img"><img alt="" src="{{asset('/image/partners.jpg')}}" /></div>

                    <div class="partners-text">
                        <div class="partners-text-top">
                            <div class="partners-text-title like-h3">В партнерстве с нами Вы получаете ряд преимуществ:</div>

                            <ul>
                                <li>Согласование и предоставление компанией дизайн проекта торговой площади;</li>
                                <li>Предоставление выставочных образцов дверей в комплекте с погонажными изделиями на специальных условиях;</li>
                                <li>Предоставление комплекта рекламного оборудования и рекламно-информационных материалов;</li>
                                <li>Оптимально сформированная матрица выставочных образцов дверей, позволяющая эффективно работать со всем ассортиментом продукции, и получение максимального дохода с площади;</li>
                                <li>Совместное проведение акций по продвижению продукции и увеличению покупательского трафика салона;</li>
                                <li>Обучение сотрудников дилерских сетей;</li>
                                <li>Успешный бизнес с успешным брендом ESTET.</li>
                            </ul>
                        </div>

                        <p>Группа компаний <span class="bold-text">«ESTET» </span>активно развивает розничную сеть под брендом ESTET | Дверные технологии в сотрудничестве с партнерами и приглашает к открытию Бренд-секций, где представлен неизменно высокий уровень продукции и сервиса, присущий фирменному стилю фабрики.</p>

                        <p>Компания работает с учетом единых корпоративных стандартов и учитывает особенности каждого конкретного региона.</p>

                        <p>В рамках единой политики формирования розничной сети на территории Москвы и Московской области предлагаем открытие в своем регионе салона межкомнатных дверей ESTET | Дверные технологии по программам: фирменная Бренд-секция ESTET.</p>
                    </div>
                </div>
                <div class="partners-right">
                    <div>
                        <div class="partners-text">
                            <div class="partners-text-title like-h4">Компания ESTET предлагает эксклюзивные условия на образцы дверей из складской программы:</div>

                            <ul>
                                <li>бесплатные образцы на ответное хранение;</li>
                                <li>бесплатная доставка образцов;</li>
                                <li>бесплатная врезка и установка образцов.</li>
                            </ul>

                            <p>Региональный склад расположен в Москве, поэтому мы всегда можем отгрузить вам двери в день заказа.</p>
                        </div>

                        <p><a class="partners-btn site-btn site-btn-green-gradient" href="{{route('catalog')}}"><span class="white-arrow">Каталог продукции</span></a></p>

                        <div class="partners-contacts">
                            <div class="partners-contacts-item partners-contacts-mail"><span>Ваши вопросы и заявки на сотрудничество можете направлять на электронную почту</span><a href="mailto:sn@estet-doors.ru">sn@estet-doors.ru</a></div>

                            <div class="partners-contacts-item partners-contacts-tel"><span>Телефоны для связи:</span><a href="tel:+74952767555">+7 (495) 276-75-55</a><a href="tel:+79057439966">+7 (905) 743-99-66</a><span>с понедельника по пятницу</span><span>с 10:00 до 18:00.</span></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</main>
@endsection

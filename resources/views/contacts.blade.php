@extends('layout')

@section('content')

<main>
    <div class="inner-page">
        <nav aria-label="Вы находитесь здесь:" role="navigation">
            <ul class="breadcrumbs">
                <li><a href="{{route('welcome')}}">Главная</a></li>
                <li><span>Контакты</span></li>
            </ul>
        </nav>
        <h1>Контакты</h1>
        <div class="contacts-block">
            <div class="contacts-block-left">
                <div class="contacts-block-map">
                    <script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A238d01fa7278d9c87ed8d43e8d9e4e42a9e877b2ae0331731665c2f099b314be&amp;width=100%25&amp;height=515&amp;lang=ru_RU&amp;scroll=true"></script>
                </div>
            </div>
            <div class="contacts-block-right">
                <div>
                    <div class="contacts-block-offices">
                        <div class="contacts-block-office">
                            <div class="contacts-block-office-title">Офис<span>1</span></div>

                            <div class="contacts-block-office-item contacts-block-office-address">109382 г. Москва, Егорьевский проезд, д. 2А, стр.2, 2 этаж, оф. 202, 205</div>
                            <a class="contacts-block-office-item contacts-block-office-tel" href="tel:+74952767555">+7 (495) 276-75-55</a>

                            <div class="contacts-block-office-item contacts-block-office-worktime"><span>пн-пт: с 10-00 до 18-00</span><span>сб: с 11-00 до 15-00</span><span>вс: выходной</span></div>
                        </div>

                        <div class="contacts-block-office">
                            <div class="contacts-block-office-title">Склад<span>2</span></div>

                            <div class="contacts-block-office-item contacts-block-office-address">г. Москва, Егорьевский проезд, д. 2А</div>

                            <div class="contacts-block-office-item contacts-block-office-worktime"><span>пн-пт: с 08-00 до 10-00</span><span>(по предварительной договоренности с офисом)</span><span>c 10-00 до 17-00 (свободно)</span><span>сб: с 11-00 до 15-00</span><span>вс: выходной</span></div>
                        </div>
                    </div>

                    <div class="contacts-block-requisites-wrapper">
                        <div class="contacts-block-requisites">
                            <div class="contacts-block-requisites-title contacts-block-title">Реквизиты</div>

                            <div class="contacts-block-requisites-tabs tabs__caption"><span class="contacts-block-requisites-tab tab-item active">Технологии ЭСТЕТ</span><span class="contacts-block-requisites-tab tab-item">Центр ЭСТЕТ</span><span class="contacts-block-requisites-tab tab-item">Дом ЭСТЕТ</span></div>
                        </div>

                        <div class="contacts-block-requisites-content-wrapper">
                            <div class="contacts-block-requisites-content tabs-content active">
                                <div class="contacts-block-requisites-content-items">
                                    <div class="contacts-block-requisites-content-item">
                                        <div class="contacts-block-requisites-content-item-name">Полное официальное наименование</div>

                                        <div class="contacts-block-requisites-content-item-desc">Общество с ограниченной ответственностью <nobr>«Технологии <span class="contacts-block-requisites-tab tab-item active">ЭСТЕТ</span>»</nobr></div>
                                    </div>

                                    <div class="contacts-block-requisites-content-item">
                                        <div class="contacts-block-requisites-content-item-name">Сокращенное официальное наименование</div>

                                        <div class="contacts-block-requisites-content-item-desc"><nobr>ООО «Технологии <span class="contacts-block-requisites-tab tab-item active">ЭСТЕТ</span>»</nobr></div>
                                    </div>

                                    <div class="contacts-block-requisites-content-item">
                                        <div class="contacts-block-requisites-content-item-name">Адрес место нахождения</div>

                                        <div class="contacts-block-requisites-content-item-desc">141080, Московская область, г. Королев, ул. Стадионная, д.7, офис 36</div>
                                    </div>

                                    <div class="contacts-block-requisites-content-item">
                                        <div class="contacts-block-requisites-content-item-name">Почтовый адрес</div>

                                        <div class="contacts-block-requisites-content-item-desc">109382, г. Москва, Егорьевский проезд, д.2А, стр.2</div>
                                    </div>

                                    <div class="contacts-block-requisites-content-item">
                                        <div class="contacts-block-requisites-content-item-name">Банковские реквизиты</div>

                                        <div class="contacts-block-requisites-content-item-desc">
                                            <div>ИНН 7723383573</div>

                                            <div>КПП 772301001</div>

                                            <div>ОГРН 1157746255754</div>

                                            <div>ОКПО 42779049</div>

                                            <div>ОКВЭД 47.7</div>

                                            <div>р/с 40702810400280000378</div>

                                            <div>в ПАО «БАНК УРАЛСИБ» г. Москва</div>

                                            <div>к/с 30101810100000000787 БИК 044525787</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="contacts-block-requisites-content-links"><a class="contacts-block-requisites-content-link" download="Реквизиты Технологии ЭСТЕТ.docx" href="/docs/tehnologii_estet.docx"><span class="name">Реквизиты Технологии ЭСТЕТ</span><span class="size">48.0KB</span></a> <a class="contacts-block-requisites-content-link" download="Реквизиты Центр ЭСТЕТ.docx" href="/docs/centr_estet.docx"><span class="name">Реквизиты Центр ЭСТЕТ</span><span class="size">45.8KB</span></a> <a class="contacts-block-requisites-content-link" download="Реквизиты Дом ЭСТЕТ.docx" href="/docs/dom_estet.docx"><span class="name">Реквизиты Дом ЭСТЕТ</span><span class="size">45.6KB</span></a></div>
                            </div>

                            <div class="contacts-block-requisites-content tabs-content">
                                <div class="contacts-block-requisites-content-items" itemscope="" itemtype="http://schema.org/Organization">
                                    <div class="contacts-block-requisites-content-item">
                                        <div class="contacts-block-requisites-content-item-name">Полное официальное наименование</div>

                                        <div class="contacts-block-requisites-content-item-desc">Общество с ограниченной ответственностью <nobr>«Центр <span class="contacts-block-requisites-tab tab-item active">ЭСТЕТ</span>»</nobr></div>
                                    </div>

                                    <div class="contacts-block-requisites-content-item">
                                        <div class="contacts-block-requisites-content-item-name">Сокращенное официальное наименование</div>

                                        <div class="contacts-block-requisites-content-item-desc" itemprop="name"><nobr>ООО «Центр <span class="contacts-block-requisites-tab tab-item active">ЭСТЕТ</span>»</nobr></div>
                                    </div>

                                    <div class="contacts-block-requisites-content-item" itemprop="address" itemscope="" itemtype="http://schema.org/PostalAddress">
                                        <div class="contacts-block-requisites-content-item-name">Адрес место нахождения</div>

                                        <div class="contacts-block-requisites-content-item-desc">109382, г. <span itemprop="addressLocality">Москва</span>, <span itemprop="streetAddress">Егорьевский пр-д, д. 2А, стр. 2, офис 203К </span></div>
                                    </div>

                                    <div class="contacts-block-requisites-content-item">
                                        <div class="contacts-block-requisites-content-item-name">Фактический адрес</div>

                                        <div class="contacts-block-requisites-content-item-desc">109382, г. Москва, Егорьевский пр-д, д. 2А, стр. 2, офис 203К</div>
                                    </div>

                                    <div class="contacts-block-requisites-content-item">
                                        <div class="contacts-block-requisites-content-item-name">Банковские реквизиты</div>

                                        <div class="contacts-block-requisites-content-item-desc">
                                            <div>ИНН 7723383492</div>

                                            <div>КПП 772301001</div>

                                            <div>ОГРН 1157746253686</div>

                                            <div>ОКПО 42824264</div>

                                            <div>ОКВЭД 52.48</div>

                                            <div>р/с 40702810100280000377</div>

                                            <div>в ПАО «БАНК УРАЛСИБ» г. Москва</div>

                                            <div>к/с 30101810100000000787 БИК 044525787</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="contacts-block-requisites-content-links"><a class="contacts-block-requisites-content-link" download="Реквизиты Технологии ЭСТЕТ.docx" href="/docs/tehnologii_estet.docx"><span class="name">Реквизиты Технологии ЭСТЕТ</span><span class="size">48.0KB</span></a> <a class="contacts-block-requisites-content-link" download="Реквизиты Центр ЭСТЕТ.docx" href="/docs/centr_estet.docx"><span class="name">Реквизиты Центр ЭСТЕТ</span><span class="size">45.8KB</span></a> <a class="contacts-block-requisites-content-link" download="Реквизиты Дом ЭСТЕТ.docx" href="/docs/dom_estet.docx"><span class="name">Реквизиты Дом ЭСТЕТ</span><span class="size">45.6KB</span></a></div>
                            </div>

                            <div class="contacts-block-requisites-content tabs-content">
                                <div class="contacts-block-requisites-content-items" itemscope="" itemtype="http://schema.org/Organization">
                                    <div class="contacts-block-requisites-content-item">
                                        <div class="contacts-block-requisites-content-item-name">Полное официальное наименование</div>

                                        <div class="contacts-block-requisites-content-item-desc">Общество с ограниченной ответственностью <nobr>«Дом <span class="contacts-block-requisites-tab tab-item active">ЭСТЕТ</span>»</nobr></div>
                                    </div>

                                    <div class="contacts-block-requisites-content-item">
                                        <div class="contacts-block-requisites-content-item-name">Сокращенное официальное наименование</div>

                                        <div class="contacts-block-requisites-content-item-desc" itemprop="name"><nobr>ООО «Дом <span class="contacts-block-requisites-tab tab-item active">ЭСТЕТ</span>»</nobr></div>
                                    </div>

                                    <div class="contacts-block-requisites-content-item" itemprop="address" itemscope="" itemtype="http://schema.org/PostalAddress">
                                        <div class="contacts-block-requisites-content-item-name">Адрес место нахождения</div>

                                        <div class="contacts-block-requisites-content-item-desc">141000, М.О., г. <span itemprop="addressLocality">Мытищи</span>, <span itemprop="streetAddress">ул. Мира, д.30</span></div>
                                    </div>

                                    <div class="contacts-block-requisites-content-item">
                                        <div class="contacts-block-requisites-content-item-name">Фактический адрес</div>

                                        <div class="contacts-block-requisites-content-item-desc">141000, М.О., г. Мытищи, ул. Мира, д.30</div>
                                    </div>

                                    <div class="contacts-block-requisites-content-item">
                                        <div class="contacts-block-requisites-content-item-name">Банковские реквизиты</div>

                                        <div class="contacts-block-requisites-content-item-desc">
                                            <div>ИНН 5029248194</div>

                                            <div>КПП 502901001</div>

                                            <div>ОГРН 1195081053089</div>

                                            <div>ОКПО 40833856</div>

                                            <div>ОКВЭД 47.78</div>

                                            <div>р/с 40702810404050000090</div>

                                            <div>в ФИЛИАЛ ЦЕНТРАЛЬНЫЙ ПАО БАНКА "ФК ОТКРЫТИЕ"</div>

                                            <div>к/с 30101810945250000297 в ГУ Банка России по ЦФО, БИК 044525297</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="contacts-block-requisites-content-links"><a class="contacts-block-requisites-content-link" download="Реквизиты Технологии ЭСТЕТ.docx" href="/docs/tehnologii_estet.docx"><span class="name">Реквизиты Технологии ЭСТЕТ</span><span class="size">48.0KB</span></a> <a class="contacts-block-requisites-content-link" download="Реквизиты Центр ЭСТЕТ.docx" href="/docs/centr_estet.docx"><span class="name">Реквизиты Центр ЭСТЕТ</span><span class="size">45.8KB</span></a> <a class="contacts-block-requisites-content-link" download="Реквизиты Дом ЭСТЕТ.docx" href="/docs/dom_estet.docx"><span class="name">Реквизиты Дом ЭСТЕТ</span><span class="size">45.6KB</span></a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="contacts-block-connect">
                <div class="contacts-block-connect-left">
                    <div class="contacts-block-connect-left-text">
                        <span>Вы можете написать нашему </span>
                        <span class="green-text">руководителю</span>
                    </div>
                    <a class="contacts-block-connect-left-btn site-btn site-btn-green-gradient" href="#director-form" data-fancybox>
                        <span class="white-arrow">Написать руководителю</span>
                    </a>
                </div>
                <div class="contacts-block-connect-right">
                    <div>
                        <div class="contacts-block-title">Свяжитесь с нами</div>
                        <div class="contacts-block-connect-right-items">
                            <div class="contacts-block-connect-right-item"><a href="mailto:hr@estet-doors.ru">hr@estet-doors.ru</a><span>- трудоустройство на работу</span></div>
                            <div class="contacts-block-connect-right-item"><a href="mailto:zakaz@estet-doors.ru">zakaz@estet-doors.ru</a><span>- предложение сотрудничества в сфере закупок</span></div>
                            <div class="contacts-block-connect-right-item"><a href="mailto:opt@estet-doors.ru">opt@estet-doors.ru</a><span>- стать нашим представителем в Московской обл-ти</span></div>
                            <div class="contacts-block-connect-right-item"><a href="mailto:help@estet-doors.ru">help@estet-doors.ru</a><span>- вопросы по качеству товара и обслуживанию</span></div>
                            <div class="contacts-block-connect-right-item"><a href="mailto:sn@estet-doors.ru">sn@estet-doors.ru</a><span>- предложить нам площадь в аренду</span></div>
                        </div></div>
                </div>
            </div>
        </div>
    </div>
</main>
@endsection

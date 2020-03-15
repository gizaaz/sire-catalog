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
            <h1 itemprop="name" class="bottom_remove">Межкомнатная дверь R6 Керамик</h1>
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
                            <p><b>Цена указана с учётом скидки 25% на полотно, при заказе полного комплекта фурнитуры.
                                    Смотрите подробнее раздел <a href="/pokupatelyam/akcii/">АКЦИИ.</a></b></p></div>
                    </div>

                    <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
                        <meta itemprop="price" content="5475">
                        <meta itemprop="priceCurrency" content="RUB">
                        <link itemprop="availability" href="http://schema.org/InStock">
                    </div>
                    <div id="app"
                         :productId='601'
                         :productTypeId='1'
                         :priceDefault='5 475'
                         :isMinPrice=""
                    ></div>
                    <input type="hidden" name="product_id" value="601">
                    <input type="hidden" name="productTypeId" value="1">
                    <input type="hidden" name="price_default" value="5475">
                    <input type="hidden" name="isMinPrice" value="">
                    <input type="hidden" name="show_info" value="1">
                    <script type=text/javascript src="{{asset('js/manifest.js')}}"></script>
                    <script type=text/javascript src="{{asset('js/vendor.js')}}"></script>
                    <script type=text/javascript src="{{asset('js/app.js')}}"></script>
                </div>
            </div>
            <div class="card-attention-block centered-block-medium info_allign">
                <span class="green-text">Внимание!</span>
                <span>Изображения дверных полотен и арок, рисунки стёкол, цветовая гамма могут отличаться от реальных в зависимости от цветопередачи и разрешения монитора. За подробной информацией просим обратиться в отдел продаж или связаться с дилерами в Вашем регионе. </span>
            </div>
            <div class="card-services-wrapper centered-block-medium bottom_remove">
                <div class="card-services">

                    <!--здесь было описание. начало-->

                    <!--здесь было описание. конец-->
                    <div class="card-services-list-wrapper">
                        <div class="card-services-list-wrapper-top">
                            <div class="card-services-title">Наши услуги</div>
                            <a href="https://www.estet-doors.ru/uslugi/">Подробнее об услугах</a>
                        </div>
                        <div class="card-services-list">
                            <div class="card-services-list-item">
                                <div class="card-services-list-item-info">
                                    <a href="https://www.estet-doors.ru/uslugi/garantiya/">Гарантия</a>
                                    <div class="card-services-list-item-info-desc">
          <span>
            Автоматически компания ESTET предоставляет гарантию на срок 5 лет при любой покупке. И не только на свою продукцию, но и на фурнитуру.            <div class="close-btn"></div>
          </span>
                                    </div>
                                </div>
                                <a href="#installation" class="card-services-list-item-btn" data-fancybox>Заказать</a>
                            </div>
                            <div class="card-services-list-item">
                                <div class="card-services-list-item-info">
                                    <a href="https://www.estet-doors.ru/uslugi/dostavka/">Доставка</a>
                                    <div class="card-services-list-item-info-desc">
          <span>
            Компания ESTET предлагает услуги по доставке заказа по нужному адресу и в удобное для Вас время, соблюдая все правила транспортировки и подъема дверей до квартиры            <div class="close-btn"></div>
          </span>
                                    </div>
                                </div>
                                <a href="#delivery" class="card-services-list-item-btn" data-fancybox>Заказать</a>
                            </div>
                            <div class="card-services-list-item">
                                <p style="color: #879096">Доставка до подъезда или до первого препятствия в пределах МКАД – 1700 рублей.<br />
                                    Подъем 1 комплекта м/к высотой до 2200мм на лифте – 200 рублей.<br />
                                    Подъем 1 комплекта м/к высотой до 2200мм без лифта, 1 этаж, за 1 комплект – 100 рублей.<br />
                                    Перемещение по прямой более 30 метров, за 1 комплект – 100 рублей.<br />
                                    Подъем 1 комплекта выше 2200мм без лифта, 1 этаж, за 1 полотно – 150 рублей.<br />
                                    Подъем 1 входной двери на лифте – 700 рублей.<br />
                                    Подъем 1 входной двери высотой до 2100мм без лифта, 1 этаж – 300 рублей.<br />
                                    Перемещение по прямой более 30 метров, за 1 комплект – 300 рублей.<br />
                                    Подъем 1 входной двери выше 2100 мм без лифта, 1 этаж – 400 рублей.<br />
                                    Перемещение по прямой более 30 метров, за 1 комплект – 400 рублей.<br />
                                    Простой: первые 20 минут – бесплатно; далее из расчёта 400 рублей в час.<br />
                                    Выезд мастера за МКАД (замер, установка, доставка) учитывается из расчета 1км. – 40 рублей к базовой стоимости услуги.</p>
                            </div>
                            <div class="card-services-list-item">
                                <div class="card-services-list-item-info">
                                    <a href="https://www.estet-doors.ru/uslugi/vyzov-menedzhera-na-dom/">Вызов менеджера на дом</a>
                                    <div class="card-services-list-item-info-desc">
          <span>
            Компания ESTET предлагает своим Покупателем услуги выездного менеджера. Получить подробную консультацию, подобрать нужное по цвету покрытие и оформить заказ, теперь возможно не выходя из дома!            <div class="close-btn"></div>
          </span>
                                    </div>
                                </div>
                                <a href="#installation" class="card-services-list-item-btn" data-fancybox>Заказать</a>
                            </div>
                            <div class="card-services-list-item">
                                <div class="card-services-list-item-info">
                                    <a href="https://www.estet-doors.ru/uslugi/vyzov-zamerschika/">Вызов замерщика</a>
                                    <div class="card-services-list-item-info-desc">
          <span>
            Компания ESTET предлагает услугу вызова замерщика на дом даже в том случае, когда у Вас нет сомнений на счет размеров проемов.             <div class="close-btn"></div>
          </span>
                                    </div>
                                </div>
                                <a href="#installation" class="card-services-list-item-btn" data-fancybox>Заказать</a>
                            </div>
                            <div class="card-services-list-item">
                                <div class="card-services-list-item-info">
                                    <a href="https://www.estet-doors.ru/uslugi/ustanovka-dverej/">Установка</a>
                                    <div class="card-services-list-item-info-desc">
          <span>
            Компания ESTET предоставляет услуги по профессиональному монтажу межкомнатных дверей. На установку действует дополнительная гарантия сроком 1 год.            <div class="close-btn"></div>
          </span>
                                    </div>
                                </div>
                                <a href="#installation" class="card-services-list-item-btn" data-fancybox>Заказать</a>
                            </div>
                        </div>
                    </div>
                    <form class="site-form overlay-mount" id="select-service-form">

                    </form>
                    <form class="site-form popup-form" id="installation">
                        <div class="popup-form-header">Оставьте зашу заявку  </div>
                        <input name="name" type="text" placeholder="Ваше имя*" required>
                        <input name="phone" type="tel" placeholder="Ваш телефон*" required>
                        <input name="address" type="text" placeholder="Город, ближайшая станция метро*" required>
                        <input type="hidden" name="current_url" value="http://www.estet.alexa.sorokarm.ru/uslugi/">
                        <input type="hidden" name="mail_to" value="install@doors.group">
                        <div class="required-msg">* - поля, обязательные для заполнения</div>
                        <div class="callback-form-bottom">
                            <div class="personal-data">
                                <label class="checkbox personal">
                                    <input type="checkbox" checked required name="agree"/>
                                    <span class="checkbox__text checkbox_agree">Нажимая на кнопку вы подтверждаете что соглашаетесь с &nbsp;</span>
                                    <a href="/pravila-obrabotki-personalnyh-dannyh/" target="_blank">Правилами обработки персональных данных</a>
                                </label>
                            </div>
                            <a class="popup-form-btn popup-form-btn site-btn site-btn-green-gradient" href="#"><span class="white-arrow">Отправить</span></a>
                        </div>
                    </form>
                    <form class="site-form popup-form" id="delivery">
                        <div class="popup-form-header">Оставьте зашу заявку  </div>
                        <input name="name" type="text" placeholder="Ваше имя*" required>
                        <input name="phone" type="tel" placeholder="Ваш телефон*" required>
                        <input name="address" type="text" placeholder="Город, ближайшая станция метро*" required>
                        <input type="hidden" name="current_url" value="http://www.estet.alexa.sorokarm.ru/uslugi/">
                        <input type="hidden" name="mail_to" value="help@estet-doors.ru">
                        <div class="required-msg">* - поля, обязательные для заполнения</div>
                        <div class="callback-form-bottom">
                            <div class="personal-data">
                                <label class="checkbox personal">
                                    <input type="checkbox" checked required name="agree"/>
                                    <span class="checkbox__text checkbox_agree">Нажимая на кнопку вы подтверждаете что соглашаетесь с &nbsp;</span>
                                    <a href="/pravila-obrabotki-personalnyh-dannyh/" target="_blank">Правилами обработки персональных данных</a>
                                </label>
                            </div>
                            <a class="popup-form-btn popup-form-btn site-btn site-btn-green-gradient" href="#"><span class="white-arrow">Отправить</span></a>
                        </div>
                    </form>


                    <script>
                        jQuery(document).ready(function($) {
                            var form = {
                                'send' : function (formId, action) {
                                    $.ajax({
                                        url: action,
                                        type: 'POST',
                                        dataType: 'json',
                                        data: $(formId).serialize(),
                                        beforeSend: function() {
                                            $(formId + ' ' + 'input').removeClass('field-error');
                                            $(formId + ' ' + 'textarea').removeClass('field-error');
                                            $(formId + ' ' + '.checkbox_agree').removeClass('agree-error');
                                        },
                                        complete: function() {

                                        },
                                        success: function(json) {

                                            if (json.success) {
                                                $(formId).trigger('reset');
                                                $(formId + ' input').attr('style','display:none');
                                                $(formId + ' .callback-form-bottom').attr('style','display:none');
                                                $(formId + ' .required-msg').attr('style','display:none');
                                                $(formId + ' .popup-form-header').html('Сообщение отправлено');
                                                dataLayer.push({'event': 'serviceform'});
                                                setTimeout(function () {
                                                    $(formId + ' .fancybox-close-small').trigger('click');
                                                    setTimeout(function () {
                                                        $(formId + ' .popup-form-header').html('Связаться с нами  ');
                                                        $(formId + ' *').removeAttr('style');
                                                    }, 1000);
                                                }, 2000);
                                            } else if (json.error) {

                                                for (var i in json.error) {
                                                    element = $(formId + ' ' + 'input[name=' + i.replace('_', '-')+']').addClass('field-error');
                                                    element = $(formId + ' ' + 'textarea[name=' + i.replace('_', '-')+']').addClass('field-error');
                                                    element = $(formId + ' .' + i).addClass('agree-error');
                                                }

                                            }
                                        },
                                        error: function(xhr, ajaxOptions, thrownError) {
                                            alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
                                        }
                                    });
                                }
                            };

                            $('#delivery').on('click', '.white-arrow', function(event) {
                                event.preventDefault();
                                form.send('#delivery', '/index.php?route=form/uslugi/mail');
                            });

                            $('#installation').on('click', '.white-arrow', function(event) {
                                event.preventDefault();
                                form.send('#installation', '/index.php?route=form/uslugi/mail');
                            });

                        });
                    </script>
                </div>
            </div>
            <div class="inner-tabs-slider">
                <div class="centered-block">
                    <div class="inner-tabs tab-items tabs__caption">
                        <span class="inner-tab tab-item">Хиты продаж</span>
                    </div>
                </div>
                <div class="inner-sliders">
                    <div class="inner-slider-block tabs-content active">
                        <div class="inner-slider-header">Хиты продаж</div>
                        <div class="inner-slider tab-slider">
                            <div class="inner-slider-item">
                                <div class="goods-item-wrapper">
                                    <div class="goods-item">
                                        <div class="goods-item-img"><a href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/ways/mezhkomnatnaya-dver-w1/"><img src="https://www.estet-doors.ru/image/cache/catalog/category/ways/ways_w1/ways_w1_n_keramik_steklo-lacobel-chernoe-200x200.png" alt="Межкомнатная дверь  W1"></a>
                                        </div>
                                        <div class="goods-item-bottom"><a class="goods-item-title" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/ways/mezhkomnatnaya-dver-w1/">Межкомнатная дверь  W1</a>
                                            <div class="goods-price">
                                                <div class="goods-item-price site-price">
                                                    <span class="price-val">Цена: 10 125</span>
                                                    <span class="price-currency">руб.</span>
                                                </div>
                                            </div>

                                            <a class="goods-item-btn site-btn site-btn-green-gradient" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/ways/mezhkomnatnaya-dver-w1/" onclick="cart.add('850'); return false;"><span>Купить</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="inner-slider-item">
                                <div class="goods-item-wrapper">
                                    <div class="goods-item">
                                        <div class="goods-item-img"><a href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/sonata/s6/"><img src="https://www.estet-doors.ru/image/cache/catalog/images/dveri/sonata/sonata_s6/sonata_s6_k13_jasen-vinter_beloe-1-200x200.png" alt="Межкомнатная дверь S6"></a>
                                        </div>
                                        <div class="goods-item-bottom"><a class="goods-item-title" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/sonata/s6/">Межкомнатная дверь S6</a>
                                            <div class="goods-price">
                                                <div class="goods-item-price site-price">
                                                    <span class="price-val">Цена: 9 075</span>
                                                    <span class="price-currency">руб.</span>
                                                </div>
                                            </div>

                                            <a class="goods-item-btn site-btn site-btn-green-gradient" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/sonata/s6/" onclick="cart.add('502'); return false;"><span>Купить</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="inner-slider-item">
                                <div class="goods-item-wrapper">
                                    <div class="goods-item">
                                        <div class="goods-item-img"><a href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/trend/t5/"><img src="https://www.estet-doors.ru/image/cache/catalog/category/trend/trend_t5/trend_t5_n_orex-mramorniy_black-200x200.png" alt="Межкомнатная дверь T5"></a>
                                        </div>
                                        <div class="goods-item-bottom"><a class="goods-item-title" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/trend/t5/">Межкомнатная дверь T5</a>
                                            <div class="goods-price">
                                                <div class="goods-item-price site-price">
                                                    <span class="price-val">Цена: 10 500</span>
                                                    <span class="price-currency">руб.</span>
                                                </div>
                                            </div>

                                            <a class="goods-item-btn site-btn site-btn-green-gradient" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/trend/t5/" onclick="cart.add('125'); return false;"><span>Купить</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="inner-slider-item">
                                <div class="goods-item-wrapper">
                                    <div class="goods-item">
                                        <div class="goods-item-img"><a href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/urban/u5/"><img src="https://www.estet-doors.ru/image/cache/catalog/category/urban/urban_u5/urban_u5_n_oreh-shade_steklo-lacobel-chernoe-200x200.png" alt="Межкомнатная дверь U5"></a>
                                        </div>
                                        <div class="goods-item-bottom"><a class="goods-item-title" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/urban/u5/">Межкомнатная дверь U5</a>
                                            <div class="goods-price">
                                                <div class="goods-item-price site-price">
                                                    <span class="price-val">Цена: 11 325</span>
                                                    <span class="price-currency">руб.</span>
                                                </div>
                                            </div>

                                            <a class="goods-item-btn site-btn site-btn-green-gradient" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/urban/u5/" onclick="cart.add('466'); return false;"><span>Купить</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="inner-slider-item">
                                <div class="goods-item-wrapper">
                                    <div class="goods-item">
                                        <div class="goods-item-img"><a href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/trend/t4/"><img src="https://www.estet-doors.ru/image/cache/catalog/category/trend/trend_t4/trend_t4_n_orex-mramorniy_black-200x200.png" alt="Межкомнатная дверь T4"></a>
                                        </div>
                                        <div class="goods-item-bottom"><a class="goods-item-title" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/trend/t4/">Межкомнатная дверь T4</a>
                                            <div class="goods-price">
                                                <div class="goods-item-price site-price">
                                                    <span class="price-val">Цена: 8 325</span>
                                                    <span class="price-currency">руб.</span>
                                                </div>
                                            </div>

                                            <a class="goods-item-btn site-btn site-btn-green-gradient" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/trend/t4/" onclick="cart.add('124'); return false;"><span>Купить</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="inner-slider-item">
                                <div class="goods-item-wrapper">
                                    <div class="goods-item">
                                        <div class="goods-item-img"><a href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/sonata/s4/"><img src="https://www.estet-doors.ru/image/cache/catalog/images/dveri/sonata/sonata_s4/sonata_s4_k13_jasen-vinter_beloe-1-200x200.png" alt="Межкомнатная дверь S4"></a>
                                        </div>
                                        <div class="goods-item-bottom"><a class="goods-item-title" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/sonata/s4/">Межкомнатная дверь S4</a>
                                            <div class="goods-price">
                                                <div class="goods-item-price site-price">
                                                    <span class="price-val">Цена: 9 225</span>
                                                    <span class="price-currency">руб.</span>
                                                </div>
                                            </div>

                                            <a class="goods-item-btn site-btn site-btn-green-gradient" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/sonata/s4/" onclick="cart.add('500'); return false;"><span>Купить</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="inner-slider-item">
                                <div class="goods-item-wrapper">
                                    <div class="goods-item">
                                        <div class="goods-item-img"><a href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/sonata/s2/"><img src="https://www.estet-doors.ru/image/cache/catalog/images/dveri/sonata/sonata_s2/sonata_s2_k13_jasen-vinter_beloe-1-200x200.png" alt="Межкомнатная дверь S2"></a>
                                        </div>
                                        <div class="goods-item-bottom"><a class="goods-item-title" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/sonata/s2/">Межкомнатная дверь S2</a>
                                            <div class="goods-price">
                                                <div class="goods-item-price site-price">
                                                    <span class="price-val">Цена: 10 650</span>
                                                    <span class="price-currency">руб.</span>
                                                </div>
                                            </div>

                                            <a class="goods-item-btn site-btn site-btn-green-gradient" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/sonata/s2/" onclick="cart.add('498'); return false;"><span>Купить</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="inner-slider-item">
                                <div class="goods-item-wrapper">
                                    <div class="goods-item">
                                        <div class="goods-item-img"><a href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/ways/mezhkomnatnaya-dver-w2/"><img src="https://www.estet-doors.ru/image/cache/catalog/category/ways/ways_w2/ways_w2_n_keramik_steklo-lacobel-chernoe-200x200.png" alt="Межкомнатная дверь W2"></a>
                                        </div>
                                        <div class="goods-item-bottom"><a class="goods-item-title" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/ways/mezhkomnatnaya-dver-w2/">Межкомнатная дверь W2</a>
                                            <div class="goods-price">
                                                <div class="goods-item-price site-price">
                                                    <span class="price-val">Цена: 8 775</span>
                                                    <span class="price-currency">руб.</span>
                                                </div>
                                            </div>

                                            <a class="goods-item-btn site-btn site-btn-green-gradient" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/ways/mezhkomnatnaya-dver-w2/" onclick="cart.add('851'); return false;"><span>Купить</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="inner-slider-item">
                                <div class="goods-item-wrapper">
                                    <div class="goods-item">
                                        <div class="goods-item-img"><a href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/verso/v1/"><img src="https://www.estet-doors.ru/image/cache/catalog/category/verso/verso_v1/verso_v1_n_sandy_white-200x200.png" alt="Межкомнатная дверь V1"></a>
                                        </div>
                                        <div class="goods-item-bottom"><a class="goods-item-title" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/verso/v1/">Межкомнатная дверь V1</a>
                                            <div class="goods-price">
                                                <div class="goods-item-price site-price">
                                                    <span class="price-val">Цена: 11 175</span>
                                                    <span class="price-currency">руб.</span>
                                                </div>
                                            </div>

                                            <a class="goods-item-btn site-btn site-btn-green-gradient" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/verso/v1/" onclick="cart.add('515'); return false;"><span>Купить</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="inner-slider-item">
                                <div class="goods-item-wrapper">
                                    <div class="goods-item">
                                        <div class="goods-item-img"><a href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/bliss/alfa/"><img src="https://www.estet-doors.ru/image/cache/catalog/category/bliss/alfa/bliss_alfa_n_belyj-gorizont_steklo-lacobel-chernoe-200x200.png" alt="Межкомнатная дверь Альфа"></a>
                                        </div>
                                        <div class="goods-item-bottom"><a class="goods-item-title" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/bliss/alfa/">Межкомнатная дверь Альфа</a>
                                            <div class="goods-price">
                                                <div class="goods-item-price site-price">
                                                    <span class="price-val">Цена: 8 400</span>
                                                    <span class="price-currency">руб.</span>
                                                </div>
                                            </div>

                                            <a class="goods-item-btn site-btn site-btn-green-gradient" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/bliss/alfa/" onclick="cart.add('861'); return false;"><span>Купить</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="inner-slider-item">
                                <div class="goods-item-wrapper">
                                    <div class="goods-item">
                                        <div class="goods-item-img"><a href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/urban/u3/"><img src="https://www.estet-doors.ru/image/cache/catalog/category/urban/urban_u3/urban_u3_n_oreh-shade_steklo-lacobel-chernoe-200x200.png" alt="Межкомнатная дверь U3"></a>
                                        </div>
                                        <div class="goods-item-bottom"><a class="goods-item-title" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/urban/u3/">Межкомнатная дверь U3</a>
                                            <div class="goods-price">
                                                <div class="goods-item-price site-price">
                                                    <span class="price-val">Цена: 9 000</span>
                                                    <span class="price-currency">руб.</span>
                                                </div>
                                            </div>

                                            <a class="goods-item-btn site-btn site-btn-green-gradient" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/urban/u3/" onclick="cart.add('468'); return false;"><span>Купить</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="inner-slider-item">
                                <div class="goods-item-wrapper">
                                    <div class="goods-item">
                                        <div class="goods-item-img"><a href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/r6-keramik/"><img src="https://www.estet-doors.ru/image/cache/catalog/images/dveri/royal/royal-r6_n_keramik_steklo-lacobel-chernoe-200x200.png" alt="Межкомнатная дверь R6 Керамик"></a>
                                        </div>
                                        <div class="goods-item-bottom"><a class="goods-item-title" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/r6-keramik/">Межкомнатная дверь R6 Керамик</a>
                                            <div class="goods-price">
                                                <div class="goods-item-price site-price">
                                                    <span class="price-val">Цена: 5 475</span>
                                                    <span class="price-currency">руб.</span>
                                                </div>
                                            </div>

                                            <a class="goods-item-btn site-btn site-btn-green-gradient" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/r6-keramik/" onclick="cart.add('601'); return false;"><span>Купить</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="inner-slider-item">
                                <div class="goods-item-wrapper">
                                    <div class="goods-item">
                                        <div class="goods-item-img"><a href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/urban/u7/"><img src="https://www.estet-doors.ru/image/cache/catalog/category/urban/urban_u7/urban_u7_n_oreh-shade_steklo-lacobel-chernoe-200x200.png" alt="Межкомнатная дверь U7"></a>
                                        </div>
                                        <div class="goods-item-bottom"><a class="goods-item-title" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/urban/u7/">Межкомнатная дверь U7</a>
                                            <div class="goods-price">
                                                <div class="goods-item-price site-price">
                                                    <span class="price-val">Цена: 14 700</span>
                                                    <span class="price-currency">руб.</span>
                                                </div>
                                            </div>

                                            <a class="goods-item-btn site-btn site-btn-green-gradient" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/urban/u7/" onclick="cart.add('464'); return false;"><span>Купить</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="inner-slider-item">
                                <div class="goods-item-wrapper">
                                    <div class="goods-item">
                                        <div class="goods-item-img"><a href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/verso/v7/"><img src="https://www.estet-doors.ru/image/cache/catalog/category/verso/verso_v7/verso_v7_n_sandy_white-200x200.png" alt="Межкомнатная дверь V7"></a>
                                        </div>
                                        <div class="goods-item-bottom"><a class="goods-item-title" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/verso/v7/">Межкомнатная дверь V7</a>
                                            <div class="goods-price">
                                                <div class="goods-item-price site-price">
                                                    <span class="price-val">Цена: 11 175</span>
                                                    <span class="price-currency">руб.</span>
                                                </div>
                                            </div>

                                            <a class="goods-item-btn site-btn site-btn-green-gradient" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/verso/v7/" onclick="cart.add('521'); return false;"><span>Купить</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="inner-slider-item">
                                <div class="goods-item-wrapper">
                                    <div class="goods-item">
                                        <div class="goods-item-img"><a href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/sonata/s8/"><img src="https://www.estet-doors.ru/image/cache/catalog/images/dveri/sonata/sonata_s8/sonata_s8_k13_jasen-vinter_beloe-1-200x200.png" alt="Межкомнатная дверь S8"></a>
                                        </div>
                                        <div class="goods-item-bottom"><a class="goods-item-title" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/sonata/s8/">Межкомнатная дверь S8</a>
                                            <div class="goods-price">
                                                <div class="goods-item-price site-price">
                                                    <span class="price-val">Цена: 10 875</span>
                                                    <span class="price-currency">руб.</span>
                                                </div>
                                            </div>

                                            <a class="goods-item-btn site-btn site-btn-green-gradient" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/sonata/s8/" onclick="cart.add('504'); return false;"><span>Купить</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="inner-slider-item">
                                <div class="goods-item-wrapper">
                                    <div class="goods-item">
                                        <div class="goods-item-img"><a href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/urban/u8/"><img src="https://www.estet-doors.ru/image/cache/catalog/category/urban/urban_u8/urban_u8_n_oreh-shade-200x200.png" alt="Межкомнатная дверь U8"></a>
                                        </div>
                                        <div class="goods-item-bottom"><a class="goods-item-title" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/urban/u8/">Межкомнатная дверь U8</a>
                                            <div class="goods-price">
                                                <div class="goods-item-price site-price">
                                                    <span class="price-val">Цена: 7 575</span>
                                                    <span class="price-currency">руб.</span>
                                                </div>
                                            </div>

                                            <a class="goods-item-btn site-btn site-btn-green-gradient" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/urban/u8/" onclick="cart.add('471'); return false;"><span>Купить</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="inner-slider-item">
                                <div class="goods-item-wrapper">
                                    <div class="goods-item">
                                        <div class="goods-item-img"><a href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/trend/t10/"><img src="https://www.estet-doors.ru/image/cache/catalog/category/trend/trend_t10/trend_t10_n_orex-mramorniy_black-200x200.png" alt="Межкомнатная дверь T10"></a>
                                        </div>
                                        <div class="goods-item-bottom"><a class="goods-item-title" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/trend/t10/">Межкомнатная дверь T10</a>
                                            <div class="goods-price">
                                                <div class="goods-item-price site-price">
                                                    <span class="price-val">Цена: 9 150</span>
                                                    <span class="price-currency">руб.</span>
                                                </div>
                                            </div>

                                            <a class="goods-item-btn site-btn site-btn-green-gradient" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/trend/t10/" onclick="cart.add('134'); return false;"><span>Купить</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="inner-slider-item">
                                <div class="goods-item-wrapper">
                                    <div class="goods-item">
                                        <div class="goods-item-img"><a href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/urban/us1/"><img src="https://www.estet-doors.ru/image/cache/catalog/category/urban/urban_us1/urban_us-1_n_korica_steklo-lacobel-chernoe-200x200.png" alt="Межкомнатная дверь  US1"></a>
                                        </div>
                                        <div class="goods-item-bottom"><a class="goods-item-title" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/urban/us1/">Межкомнатная дверь  US1</a>
                                            <div class="goods-price">
                                                <div class="goods-item-price site-price">
                                                    <span class="price-val">Цена: 18 825</span>
                                                    <span class="price-currency">руб.</span>
                                                </div>
                                            </div>

                                            <a class="goods-item-btn site-btn site-btn-green-gradient" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/urban/us1/" onclick="cart.add('452'); return false;"><span>Купить</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="inner-slider-item">
                                <div class="goods-item-wrapper">
                                    <div class="goods-item">
                                        <div class="goods-item-img"><a href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/urban/us3/"><img src="https://www.estet-doors.ru/image/cache/catalog/category/urban/urban_us3/urban_us3_n_oreh-shade_steklo-lacobel-chernoe-200x200.png" alt="Межкомнатная дверь  US3"></a>
                                        </div>
                                        <div class="goods-item-bottom"><a class="goods-item-title" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/urban/us3/">Межкомнатная дверь  US3</a>
                                            <div class="goods-price">
                                                <div class="goods-item-price site-price">
                                                    <span class="price-val">Цена: 12 750</span>
                                                    <span class="price-currency">руб.</span>
                                                </div>
                                            </div>

                                            <a class="goods-item-btn site-btn site-btn-green-gradient" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/urban/us3/" onclick="cart.add('454'); return false;"><span>Купить</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="inner-slider-item">
                                <div class="goods-item-wrapper">
                                    <div class="goods-item">
                                        <div class="goods-item-img"><a href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/urban/us4/"><img src="https://www.estet-doors.ru/image/cache/catalog/category/urban/urban_us4/urban_us4_n_oreh-shade_steklo-lacobel-chernoe-200x200.png" alt="Межкомнатная дверь  US4"></a>
                                        </div>
                                        <div class="goods-item-bottom"><a class="goods-item-title" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/urban/us4/">Межкомнатная дверь  US4</a>
                                            <div class="goods-price">
                                                <div class="goods-item-price site-price">
                                                    <span class="price-val">Цена: 19 500</span>
                                                    <span class="price-currency">руб.</span>
                                                </div>
                                            </div>

                                            <a class="goods-item-btn site-btn site-btn-green-gradient" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/urban/us4/" onclick="cart.add('474'); return false;"><span>Купить</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="inner-slider-item">
                                <div class="goods-item-wrapper">
                                    <div class="goods-item">
                                        <div class="goods-item-img"><a href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/sonata/s10/"><img src="https://www.estet-doors.ru/image/cache/catalog/images/dveri/sonata/S10/sonata_s10_k13_jasen-vinter_beloe-1-200x200.png" alt="Межкомнатная дверь S10"></a>
                                        </div>
                                        <div class="goods-item-bottom"><a class="goods-item-title" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/sonata/s10/">Межкомнатная дверь S10</a>
                                            <div class="goods-price">
                                                <div class="goods-item-price site-price">
                                                    <span class="price-val">Цена: 9 825</span>
                                                    <span class="price-currency">руб.</span>
                                                </div>
                                            </div>

                                            <a class="goods-item-btn site-btn site-btn-green-gradient" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/sonata/s10/" onclick="cart.add('506'); return false;"><span>Купить</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="inner-slider-item">
                                <div class="goods-item-wrapper">
                                    <div class="goods-item">
                                        <div class="goods-item-img"><a href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/novella/novella-n3-1/"><img src="https://www.estet-doors.ru/image/cache/catalog/category/novella/novella_n3_nl_ral9003-200x200.png" alt="Межкомнатная дверь Novella N3"></a>
                                        </div>
                                        <div class="goods-item-bottom"><a class="goods-item-title" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/novella/novella-n3-1/">Межкомнатная дверь Novella N3</a>
                                            <div class="goods-price">
                                                <div class="goods-item-price site-price">
                                                    <span class="price-val">Цена: 6 900</span>
                                                    <span class="price-currency">руб.</span>
                                                </div>
                                            </div>

                                            <a class="goods-item-btn site-btn site-btn-green-gradient" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/novella/novella-n3-1/" onclick="cart.add('902'); return false;"><span>Купить</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="inner-slider-item">
                                <div class="goods-item-wrapper">
                                    <div class="goods-item">
                                        <div class="goods-item-img"><a href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/perfect/p18/"><img src="https://www.estet-doors.ru/image/cache/catalog/category/perfect/perfect_p18_nl_ral9003-200x200.png" alt="Межкомнатная дверь Perfect P18"></a>
                                        </div>
                                        <div class="goods-item-bottom"><a class="goods-item-title" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/perfect/p18/">Межкомнатная дверь Perfect P18</a>
                                            <div class="goods-price">
                                                <div class="goods-item-price site-price">
                                                    <span class="price-val">Цена: 6 075</span>
                                                    <span class="price-currency">руб.</span>
                                                </div>
                                            </div>

                                            <a class="goods-item-btn site-btn site-btn-green-gradient" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/perfect/p18/" onclick="cart.add('1345'); return false;"><span>Купить</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="inner-slider-item">
                                <div class="goods-item-wrapper">
                                    <div class="goods-item">
                                        <div class="goods-item-img"><a href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/royal-r/rr7/"><img src="https://www.estet-doors.ru/image/cache/catalog/category/royal-r/royal-r_rr7_n_sandy_steklo-tripleks-belosnezhnyj-200x200.png" alt="Межкомнатная дверь RR7"></a>
                                        </div>
                                        <div class="goods-item-bottom"><a class="goods-item-title" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/royal-r/rr7/">Межкомнатная дверь RR7</a>
                                            <div class="goods-price">
                                                <div class="goods-item-price site-price">
                                                    <span class="price-val">Цена: 8 400</span>
                                                    <span class="price-currency">руб.</span>
                                                </div>
                                            </div>

                                            <a class="goods-item-btn site-btn site-btn-green-gradient" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/royal-r/rr7/" onclick="cart.add('1306'); return false;"><span>Купить</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="inner-slider-item">
                                <div class="goods-item-wrapper">
                                    <div class="goods-item">
                                        <div class="goods-item-img"><a href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/genesis/ge1m/"><img src="https://www.estet-doors.ru/image/cache/catalog/category/genesis/ge1m_k10_dvorcovoe-derevo-200x200.png" alt="Межкомнатная дверь GE1M"></a>
                                        </div>
                                        <div class="goods-item-bottom"><a class="goods-item-title" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/genesis/ge1m/">Межкомнатная дверь GE1M</a>
                                            <div class="goods-price">
                                                <div class="goods-item-price site-price">
                                                    <span class="price-val">Цена: 12 675</span>
                                                    <span class="price-currency">руб.</span>
                                                </div>
                                            </div>

                                            <a class="goods-item-btn site-btn site-btn-green-gradient" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/genesis/ge1m/" onclick="cart.add('1312'); return false;"><span>Купить</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="inner-slider-item">
                                <div class="goods-item-wrapper">
                                    <div class="goods-item">
                                        <div class="goods-item-img"><a href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/brussel/br5x/"><img src="https://www.estet-doors.ru/image/cache/catalog/category/brussel/brussel_br5-x_nf_jasen-grau-200x200.png" alt="Межкомнатная дверь BR5X"></a>
                                        </div>
                                        <div class="goods-item-bottom"><a class="goods-item-title" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/brussel/br5x/">Межкомнатная дверь BR5X</a>
                                            <div class="goods-price">
                                                <div class="goods-item-price site-price">
                                                    <span class="price-val">Цена: 11 700</span>
                                                    <span class="price-currency">руб.</span>
                                                </div>
                                            </div>

                                            <a class="goods-item-btn site-btn site-btn-green-gradient" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/brussel/br5x/" onclick="cart.add('1285'); return false;"><span>Купить</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="inner-slider-item">
                                <div class="goods-item-wrapper">
                                    <div class="goods-item">
                                        <div class="goods-item-img"><a href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/multistage/msr5/"><img src="https://www.estet-doors.ru/image/cache/catalog/category/multistage/multistage_msr-5_k15_sendi-200x200.png" alt="Межкомнатная дверь MSR5"></a>
                                        </div>
                                        <div class="goods-item-bottom"><a class="goods-item-title" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/multistage/msr5/">Межкомнатная дверь MSR5</a>
                                            <div class="goods-price">
                                                <div class="goods-item-price site-price">
                                                    <span class="price-val">Цена: 7 500</span>
                                                    <span class="price-currency">руб.</span>
                                                </div>
                                            </div>

                                            <a class="goods-item-btn site-btn site-btn-green-gradient" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/multistage/msr5/" onclick="cart.add('1294'); return false;"><span>Купить</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="inner-slider-item">
                                <div class="goods-item-wrapper">
                                    <div class="goods-item">
                                        <div class="goods-item-img"><a href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/renaissance/cezar-1/"><img src="https://www.estet-doors.ru/image/cache/catalog/category/renessance/door_cezar_soft-beliy_gp-200x200.png" alt="Межкомнатная дверь Цезарь 1"></a>
                                        </div>
                                        <div class="goods-item-bottom"><a class="goods-item-title" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/renaissance/cezar-1/">Межкомнатная дверь Цезарь 1</a>
                                            <div class="goods-price">
                                                <div class="goods-item-price site-price">
                                                    <span class="price-val">Цена: 12 000</span>
                                                    <span class="price-currency">руб.</span>
                                                </div>
                                            </div>

                                            <a class="goods-item-btn site-btn site-btn-green-gradient" href="https://www.estet-doors.ru/catalog/mezhkomnatnye-dveri/kollekciya/renaissance/cezar-1/" onclick="cart.add('882'); return false;"><span>Купить</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span class="goods-btn site-btn site-btn-gray-light margin_top" onclick="showMore();">Показать еще</span>
                        <input type="hidden" id="show_more_start" value="3">
                    </div>
                </div>
            </div>
        </div>
    </main>
@endsection

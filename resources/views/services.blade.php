@extends('layout')

@section('content')
<main>
    <div class="inner-page">
        <nav aria-label="Вы находитесь здесь:" role="navigation">
            <ul class="breadcrumbs">
                <li><a href="https://www.estet-doors.ru/">Главная</a></li>
                <li><span>Услуги</span></li>
            </ul>
        </nav>
        <h1>Услуги</h1>
        <div class="centered-block">
            <div class="services-list">
                <div class="about-list-item">
                    <div class="about-list-item-img"><a href="https://www.estet-doors.ru/uslugi/garantiya/"><img src="https://www.estet-doors.ru/image/cache/catalog/other/service_icon/300858-54x47.png" alt="Гарантия"></a></div><a class="about-list-item-name" href="https://www.estet-doors.ru/uslugi/garantiya/">Гарантия</a>
                    <div class="about-list-item-desc">Автоматически компания ESTET предоставляет гарантию на срок 5 лет при любой покупке. И не только на свою продукцию, но и на фурнитуру.</div>
                    <div class="about-list-item-bottom">

                        <div class="about-list-item-price"><span>Срок</span>
                            <div class="site-price"><span class="price-val">5</span><span class="price-currency">лет</span></div>
                        </div>

                    </div>
                    <a href="https://www.estet-doors.ru/uslugi/garantiya/" class="card-options-result-cart-btn site-btn site-btn-green-gradient">Подробнее</a>
                </div>
                <div class="about-list-item">
                    <div class="about-list-item-img"><a href="https://www.estet-doors.ru/uslugi/dostavka/"><img src="https://www.estet-doors.ru/image/cache/catalog/other/service_icon/serv1-54x47.png" alt="Доставка"></a></div><a class="about-list-item-name" href="https://www.estet-doors.ru/uslugi/dostavka/">Доставка</a>
                    <div class="about-list-item-desc">Компания ESTET предлагает услуги по доставке заказа по нужному адресу и в удобное для Вас время, соблюдая все правила транспортировки и подъема дверей до квартиры</div>
                    <div class="about-list-item-bottom">
                        <div class="about-list-item-price"><span>Стоимость</span>
                            <div class="site-price"><span>от</span><span class="price-val">1 700</span><span class="price-currency">руб.</span></div>
                        </div>


                    </div>
                    <a href="#delivery" class="card-options-result-cart-btn site-btn site-btn-green-gradient" data-fancybox>Заказать</a>
                </div>
                <div class="about-list-item">
                    <div class="about-list-item-img"><a href="https://www.estet-doors.ru/uslugi/vyzov-menedzhera-na-dom/"><img src="https://www.estet-doors.ru/image/cache/catalog/other/service_icon/serv3-54x47.png" alt="Вызов менеджера на дом"></a></div><a class="about-list-item-name" href="https://www.estet-doors.ru/uslugi/vyzov-menedzhera-na-dom/">Вызов менеджера на дом</a>
                    <div class="about-list-item-desc">Компания ESTET предлагает своим Покупателем услуги выездного менеджера. Получить подробную консультацию, подобрать нужное по цвету покрытие и оформить заказ, теперь возможно не выходя из дома!</div>
                    <div class="about-list-item-bottom">
                        <div class="about-list-item-price"><span>Стоимость</span>
                            <div class="site-price"><span>от</span><span class="price-val">1 000</span><span class="price-currency">руб.</span></div>
                        </div>


                    </div>
                    <a href="#installation" class="card-options-result-cart-btn site-btn site-btn-green-gradient" data-fancybox>Заказать</a>
                </div>
                <div class="about-list-item">
                    <div class="about-list-item-img"><a href="https://www.estet-doors.ru/uslugi/vyzov-zamerschika/"><img src="https://www.estet-doors.ru/image/cache/catalog/other/service_icon/serv2-54x47.png" alt="Вызов замерщика"></a></div><a class="about-list-item-name" href="https://www.estet-doors.ru/uslugi/vyzov-zamerschika/">Вызов замерщика</a>
                    <div class="about-list-item-desc">Компания ESTET предлагает услугу вызова замерщика на дом даже в том случае, когда у Вас нет сомнений на счет размеров проемов. </div>
                    <div class="about-list-item-bottom">
                        <div class="about-list-item-price"><span>Стоимость</span>
                            <div class="site-price"><span>от</span><span class="price-val">500</span><span class="price-currency">руб.</span></div>
                        </div>


                    </div>
                    <a href="#installation" class="card-options-result-cart-btn site-btn site-btn-green-gradient" data-fancybox>Заказать</a>
                </div>
                <div class="about-list-item">
                    <div class="about-list-item-img"><a href="https://www.estet-doors.ru/uslugi/ustanovka-dverej/"><img src="https://www.estet-doors.ru/image/cache/catalog/other/service_icon/serv4-54x47.png" alt="Установка"></a></div><a class="about-list-item-name" href="https://www.estet-doors.ru/uslugi/ustanovka-dverej/">Установка</a>
                    <div class="about-list-item-desc">Компания ESTET предоставляет услуги по профессиональному монтажу межкомнатных дверей. На установку действует дополнительная гарантия сроком 1 год.</div>
                    <div class="about-list-item-bottom">
                        <div class="about-list-item-price"><span>Стоимость</span>
                            <div class="site-price"><span>от</span><span class="price-val">2 950</span><span class="price-currency">руб.</span></div>
                        </div>


                    </div>
                    <a href="#installation" class="card-options-result-cart-btn site-btn site-btn-green-gradient" data-fancybox>Заказать</a>
                </div>
            </div>
            <div class="connect-form-block">
                <div class="connect-form-header">Связаться с нами</div>
                <form class="connect-form site-form" id="connect-form" action="https://www.estet-doors.ru/index.php?route=form/feedback/mail">
                    <input type="hidden" name="current_url" value="https://www.estet-doors.ru/uslugi/">
                    <div class="connect-form-top">
                        <div class="connect-form-inputs">
                            <input type="text" name="name" placeholder="Ваше имя*" required />
                            <input type="email" name="email" placeholder="E-mail*" required />
                            <input type="hidden" name="email_to" id="mail_to" />
                        </div>
                        <div class="connect-form-textarea">
                            <textarea name="enquiry" placeholder="Сообщение*" required ></textarea>
                        </div>
                    </div>
                    <div class="connect-form-bottom">
                        <div class="personal-data">
                            <label class="checkbox personal feedback">
                                <input type="checkbox" required checked name="agree"/>
                                <span class="checkbox__text checkbox_agree">Нажимая на кнопку вы подтверждаете что соглашаетесь с &nbsp;</span>
                                <a href="https://www.estet-doors.ru/pravila-obrabotki-personalnyh-dannyh/" target="_blank">Правилами обработки персональных данных</a>
                            </label>
                        </div>
                        <a class="connect-form-btn site-btn site-btn-green-gradient" href="#send">
                            <span class="white-arrow">Отправить</span>
                        </a>
                    </div>
                </form>
            </div>
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
                                        setTimeout(function () {
                                            dataLayer.push({'event': 'feedbackform'});
                                            $(formId + ' .white-arrow').html('Отправлено!');
                                            $(formId).trigger('reset');
                                            $(formId + ' .fancybox-close-small').trigger('click');
                                        }, 1000);

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

                    $('#connect-form').on('click', '.white-arrow', function(event) {
                        event.preventDefault();
                        form.send('#connect-form', 'https://www.estet-doors.ru/index.php?route=form/feedback/mail');
                    });

                });
            </script>    </div>
    </div>
</main>
@endsection

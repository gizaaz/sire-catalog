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
                    @foreach($services as $service)
                        <div class="about-list-item">
                            <div class="about-list-item-img"><a href="{{route('service', ['id' => $service->id])}}"><img
                                        src="{{Storage::url($service->icon)}}" alt="{{$service->name}}"></a></div>
                            <a class="about-list-item-name"
                               href="{{route('service', ['id' => $service->id])}}">Доставка</a>
                            <div class="about-list-item-desc">
                                {{$service->summary}}
                            </div>
                            <div class="about-list-item-bottom">
                                <div class="about-list-item-price"><span>Вартість</span>
                                    <div class="site-price"><span>від</span><span class="price-val">{{$service->price}}</span><span
                                            class="price-currency">грн.</span></div>
                                </div>
                            </div>
                            <a href="#delivery{{$service->id}}" class="card-options-result-cart-btn site-btn site-btn-green-gradient"
                               data-fancybox>Замовити</a>
                        </div>
                    @endforeach
                </div>
                <div class="connect-form-block">
                    <div class="connect-form-header">Связаться с нами</div>
                    <form class="connect-form site-form" id="connect-form">
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
                            <div class="personal-data"></div>
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
                            form.send('#connect-form', '');
                        });

                    });
                </script>    </div>
        </div>
    </main>
    @foreach($services as $service)
    <form class="site-form popup-form" id="delivery{{$service->id}}" action="{{route('service-confirm', $service->id)}}" method="POST">
        <div class="popup-form-header">Залишіть вашу заявку  </div>
        <input name="name" type="text" placeholder="Ваше ім'я*" required>
        <input name="phone" type="tel" placeholder="Ваш телефон*" required>
        <input name="address" type="text" placeholder="Місто*" required>
        <div class="required-msg">* - поля, обов'язкові для заповнення</div>
        <div class="callback-form-bottom">
            <div class="personal-data"></div>
            @csrf
            <button type="submit"><a class="popup-form-btn popup-form-btn site-btn site-btn-green-gradient"><span class="white-arrow">Отправить</span></a></button>
        </div>
    </form>

    <script>
        jQuery(document).ready(function($) {
            $('#delivery{{$service->id}}').on('click', '.white-arrow', function(event) {

            });
        });
    </script>
    @endforeach
@endsection

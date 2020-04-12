@extends('layout')

@section('content')
<main>
    <div class="inner-page">
        <nav aria-label="Вы находитесь здесь:" role="navigation">
            <ul class="breadcrumbs">
                <li><a href="{{route('welcome')}}">Главная</a></li>
                <li><span>О компании</span></li>
            </ul>
        </nav>
        <h1>О компании</h1>
        <div class="centered-block">
            <div class="about-list">
                <div class="about-list-item">
                    <div class="about-list-item-img">
                        <a href="">
                            <img src="https://www.estet-doors.ru/image/cache/catalog/other/about/298463-117x234.png" alt="Наши преимущества">
                        </a>
                    </div>
                    <a class="about-list-item-name" href="">Наши преимущества</a>
                    <div class="about-list-item-desc">Фабрика ESTET всегда приятно удивляет постоянных и новых клиентов не только высоким качеством и выгодными ценами на продукцию, но и кратчайшими сроками ее изготовления. Каждому мы предложим решение, на 100% соответствующее запросам, пожеланиям и финансовым возможностям.</div>
                </div>
                <div class="about-list-item">
                    <div class="about-list-item-img">
                        <a href="">
                            <img src="https://www.estet-doors.ru/image/cache/catalog/other/about_icon/1-117x234.png" alt="О нас">
                        </a>
                    </div>
                    <a class="about-list-item-name" href="">О нас</a>
                    <div class="about-list-item-desc">Многолетний опыт, гарантированное качество продукции, внимательное отношение к каждому заказу – далеко не все, что отмечают в компании ESTET ее клиенты. Мы уверены, что вы тоже останетесь довольны сотрудничеством и оставите о нас положительные отзывы.</div>
                </div>
                <div class="about-list-item">
                    <div class="about-list-item-img">
                        <a href="">
                            <img src="https://www.estet-doors.ru/image/cache/catalog/other/about/about2-117x234.png" alt="Вакансии">
                        </a>
                    </div>
                    <a class="about-list-item-name" href="">Вакансии</a>
                    <div class="about-list-item-desc">Стать частью сплоченной, ответственной и профессиональной команды ESTET можете и вы. Достаточно следить за вакансиями и просто отправить нам резюме. Специалисты быстро рассмотрят его и свяжутся с вами.</div>
                </div>
                <div class="about-list-item">
                    <div class="about-list-item-img">
                        <a href="">
                            <img src="https://www.estet-doors.ru/image/cache/catalog/other/about/about3-117x234.png" alt="Технологии">
                        </a>
                    </div>
                    <a class="about-list-item-name" href="">Технологии</a>
                    <div class="about-list-item-desc">ESTET ответственно относится к процессу производства продукции и использует только современные технологии, которые уже проверены и отработаны специалистами. Подробную информацию получайте у менеджеров.</div>
                </div>
                <div class="about-list-item">
                    <div class="about-list-item-img">
                        <a href="">
                            <img src="https://www.estet-doors.ru/image/cache/catalog/other/about/about4-117x234.png" alt="Вопрос-ответ">
                        </a>
                    </div>
                    <a class="about-list-item-name" href="">Вопрос-ответ</a>
                    <div class="about-list-item-desc">Если у вас возникли вопросы, касающиеся нашей продукции, ее качества, сроков изготовления и других параметров, то ищите ответы на них в этом разделе. Не нашли? Обращайтесь напрямую к специалистам. Они точно знают все ответы на ваши вопросы.</div>
                </div>
                <div class="about-list-item">
                    <div class="about-list-item-img">
                        <a href="">
                            <img src="https://www.estet-doors.ru/image/cache/catalog/other/about/about5-117x234.png" alt="Новости">
                        </a>
                    </div>
                    <a class="about-list-item-name" href="">Новости</a>
                    <div class="about-list-item-desc">Чтобы всегда быть в курсе новинок в ассортименте, не пропустить открытие новых салонов и успевать делать выгодные покупки, следите за новостями. Мы регулярно публикуем их, чтобы вы знали все о работе ESTET.</div>
                </div>
                <div class="about-list-item">
                    <div class="about-list-item-img">
                        <a href="">
                            <img src="" alt="Сертификаты">
                        </a>
                    </div>
                    <a class="about-list-item-name" href="">Сертификаты</a>
                    <div class="about-list-item-desc">Предлагаем ознакомиться с сертификатами, экспертными заключениями и дипломами. Именно они являются очередным подтверждением высокого качества выпускаемой продукции.</div>
                </div>
            </div>
            <div class="seo-block">
                <div class="seo-text">
                    <p>Компания ESTET, занимается производством интерьерных дверей с 2002 г. Двери производятся по уникальной технологии. Фабрика реализует свою продукцию через сеть фирменных салонов, что позволяет дать конечному потребителю ряд преимуществ: ЦЕНЫ от производителя, ИНДИВИДУАЛЬНЫЙ ПОДХОД, СРОКИ и ГАРАНТИИ.</p>

                    <p>Посетив наши фирменные салоны, Вас приятно удивят многообразие вариантов исполнения, широчайший модельный ряд, более 40 оттенков покрытия. Двери ESTET помогут выгодно подчеркнуть и дополнить Ваш интерьер.</p>

                </div>
            </div>
            <div class="connect-form-block">
                <div class="connect-form-header">Связаться с нами</div>
                <form class="connect-form site-form" id="connect-form">
                    <input type="hidden" name="current_url" value="">
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
                                <a href="" target="_blank">Правилами обработки персональных данных</a>
                            </label>
                        </div>
                        <a class="connect-form-btn site-btn site-btn-green-gradient" href="">
                            <span class="white-arrow">Отправить</span>
                        </a>
                    </div>
                </form>
            </div>
            </div>
    </div>
</main>
@endsection

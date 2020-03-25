<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Адмін: @yield('title')</title>

    <!-- Scripts -->
    <script src="/js/app2.js" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">

    <!-- Styles -->
    <link href="/css/app2.css" rel="stylesheet">
    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <link href="/css/admin.css" rel="stylesheet">
</head>
<body>
<div id="app">
    <nav class="navbar navbar-default navbar-expand-md navbar-light navbar-laravel">
        <div class="container">
            <a class="navbar-brand" href="{{ route('welcome') }}">
                Повернутись на сайт
            </a>

            {{--<div id="navbar" class="collapse navbar-collapse">--}}
                {{--<ul class="nav navbar-nav">--}}
                    {{--<li><a--}}
                            {{--href="http://laravel-diplom-1.rdavydov.ru/admin/categories">Категорії</a></li>--}}
                    {{--<li><a href="http://laravel-diplom-1.rdavydov.ru/admin/products">Товари</a>--}}
                    {{--</li>--}}
                    {{--<li><a href="http://laravel-diplom-1.rdavydov.ru/admin/orders">Замовлення</a></li>--}}
                {{--</ul>--}}

                @guest
                    <ul class="nav navbar-nav navbar-right">
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('login') }}">Вхід</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('register') }}">Зарееєструватись</a>
                        </li>
                    </ul>
                @endguest

                @auth
                    <ul class="nav navbar-nav">
                        <li><a
                                href="http://laravel-diplom-1.rdavydov.ru/admin/categories">Категорії</a></li>
                        <li><a href="http://laravel-diplom-1.rdavydov.ru/admin/products">Товари</a>
                        </li>
                        <li><a href="http://laravel-diplom-1.rdavydov.ru/admin/orders">Замовлення</a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li class="nav-item dropdown">
                            <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button"
                               data-toggle="dropdown"
                               aria-haspopup="true" aria-expanded="false" v-pre>
                                Адміністратор
                            </a>

                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="{{ route('logout')}}"
                                   onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                    Вихід
                                </a>

                                <form id="logout-form" action="{{ route('logout')}}" method="POST"
                                      style="display: none;">
                                    @csrf
                                </form>
                            </div>
                        </li>
                    </ul>
                @endauth
            </div>
        </div>
    </nav>

    <div class="py-4">
        <div class="container">
            <div class="row justify-content-center">
                @yield('content')
            </div>
        </div>
    </div>
</div>
</body>
</html>

@extends('layout')

@section('content')
        <main>
            <div class="inner-page">
                <nav aria-label="Вы находитесь здесь:" role="navigation">
                    <ul class="breadcrumbs">
                        <li><a href="https://www.estet-doors.ru/">Главная</a></li>
                        <li><span>Корзина</span></li>
                    </ul>
                </nav>
                <h1>Корзина        </h1>
                <div class="cart-wrapper centered-block-medium">
                    <div class="cart-block-wrapper" id="checkout-cart">
                        <div class="cart-block">
                            <div class="cart-header">
                                <div class="cart-header-counts"><span>Товары в корзине</span><span class="count"></span></div><a class="cart-header-btn" href="https://www.estet-doors.ru/index.php?route=checkout/wm_custom_cart/clear">Очистить корзину</a>
                            </div>
                            <div class="cart-table" id="product-table">
                                <div class="cart-table-header">
                                    <div class="cart-tr">
                                        <div class="cart-td cart-td-img">Товар</div>
                                        <div class="cart-td-mobile">
                                            <div class="cart-td cart-td-name"></div>
                                            <div class="cart-td-middle">
                                                <div class="cart-td cart-td-complect">Комплектация</div>
                                                <div class="cart-td cart-td-count">Количество</div>
                                                <div class="cart-td cart-td-summ">Итого</div>
                                            </div>
                                            <div class="cart-td cart-td-delete"></div>
                                        </div>
                                    </div>
                                </div>
                                @foreach($order->products as $product)
                                <div class="cart-table-body">
                                    <div class="cart-tr">
                                        <div class="cart-td cart-td-img">
                                            <a href="{{route('product', ['id'=> $product->id])}}"><img src="{{asset('storage/' . $product->images)}}" alt="{{$product->name}}"></a>
                                        </div>
                                        <div class="cart-td-mobile">
                                            <div class="cart-td cart-td-name">
                                                <div class="cart-goods-title"><a href="{{route('product', ['id'=> $product->id])}}">{{$product->name}}</a><span class="order-count"></span></div>
                                                <div class="cart-goods-price"><span>Цена:</span><span class="site-price"><span class="price-val">{{$product->price}}</span><span class="price-currency">{{$product->currency}}</span></span></div>
                                            </div>
                                            <div class="cart-td-middle">
                                                <div class="cart-td cart-td-complect">
                                                </div>
                                                <div class="cart-td cart-td-count">
                                                    <div class="buy-count-block">
                                                        <form action="{{route('basket-remove', $product->id)}}" method="POST">
                                                            <button type="submit" href="">
                                                                <span class="count-minus"></span>
                                                            </button>
                                                            @csrf
                                                        </form>
                                                        <input type="text" value="{{$product->pivot->count}} шт." readonly>
                                                        <form action="{{route('basket-add', $product->id)}}" method="POST">
                                                            <button type="submit" href="">
                                                                <span class="count-plus"></span>
                                                            </button>
                                                            @csrf
                                                        </form>

                                                    </div>
                                                </div>
                                                <div class="cart-td cart-td-summ site-price"><span class="price-val">{{$product->getPriceForCount()}}</span><span class="price-currency">{{$product->currency}}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                @endforeach
                                <div class="cart-table-footer">
                                    <div class="cart-tr">
                                        <div class="cart-td cart-td-img"></div>
                                        <div class="cart-td-mobile">
                                            <div class="cart-td cart-td-name"></div>
                                            <div class="cart-td-middle">
                                                <div class="cart-td cart-td-complect"></div>
                                                <div class="cart-td cart-td-count"></div>
                                                <div class="cart-td cart-td-summ">
                                                    <span>Итого:</span>
                                                    <span class="site-price">
                        <span class="price-val">{{$order->getFullPrice()}}</span>
                        <span class="price-currency">ГРН.</span>
                      </span>
                                                </div>
                                            </div>
                                            <div class="cart-td cart-td-delete"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="padding:0 6% 22px 6%;"><p style="margin-bottom: 0">Указана приблизительная стоимость товара, в соответствии выбранным опциям.</p>
                            <p style="margin-bottom: 0" >Фактическую стоимость товара сообщит менеджер после обработки заказа.</p></div>
                        <div class="cart-result">
                            <a class="cart-result-back-btn" href="{{route('welcome')}}">Вернуться к покупкам</a>
                            <div class="cart-result-order">
                                <a href="{{route('basket-place')}}"> <span>Оформить заказ</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

@endsection

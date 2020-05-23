<?php

namespace App\Providers;

use App\Feedback;
use App\Order;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        View::composer('auth/*'
            , function ($view) {
                $feedback_new = Feedback::where('status', null)->count();
                $feedback_publ = Feedback::where('status', 1)->count();
                $view->with('feedback_count', [$feedback_new,$feedback_publ]);
            });

        View::composer('auth/*'
            , function ($view) {

                $orders_new = Order::where('status', 1)->count();
                $orders_process = Order::where('status', 2)->count();
                $orders_offline = Order::where('status', 3)->count();
                $view->with('orders_count', [$orders_new,$orders_process,$orders_offline]);
            });


        Schema::defaultStringLength(191);
    }
}

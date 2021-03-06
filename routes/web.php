<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Auth::routes([
    'reset' => false,
    'confirm' => false,
    'verify' => false,
//    'register' => false,
]);

Route::get('/logout', 'Auth\LoginController@logout')->name('get-logout');

Route::group([
    'middleware' => 'auth',
    'namespace' => 'Admin',
    'prefix' => 'admin',
], function(){
    Route::get('/orders/new', 'OrderController@index')->name('orders.index');
    Route::get('/orders/processed', 'OrderController@processed')->name('orders.processed');
    Route::get('/orders/offline', 'OrderController@offline')->name('orders.offline');
    Route::get('/feedbacks/new', 'FeedbackController@index')->name('feedbacks.index');
    Route::get('/feedbacks/published', 'FeedbackController@published')->name('feedbacks.published');
    Route::get('/orders/{order}', 'OrderController@show')->name('orders.show');
    Route::match(['put', 'patch'],'/orders/{order}', 'OrderController@update')->name('orders.update');
    Route::match(['put', 'patch'],'/feedbacks/{feedback}', 'FeedbackController@update')->name('feedbacks.update');
    Route::delete('/feedbacks/{feedback}', 'FeedbackController@destroy')->name('feedbacks.destroy');
    Route::resource('categories/child', 'ChildCategoryController');
    Route::resource('categories', 'CategoryController');
    Route::resource('services', 'ServiceController');
    Route::resource('products', 'ProductController');
    Route::resource('gallery', 'GalleryController');
    Route::post('product/image/delete','ProductController@deleteImage');
    Route::post('service/image/delete','ServiceController@deleteIcon');
    Route::post('gallery/image/delete','GalleryController@deleteImage');
});

Route::post('/basket/add/{id}', 'BasketController@add')->name('basket-add');
Route::group(['middleware' => 'basket_not_empty'], function(){
    Route::get('/basket', 'BasketController@index')->name('basket');
    Route::get('/basket/place', 'BasketController@basketPlace')->name('basket-place');
    Route::post('/basket/remove/{id}', 'BasketController@remove')->name('basket-remove');
    Route::post('/basket/place', 'BasketController@basketConfirm')->name('basket-confirm');
});

Route::get('/', 'WelcomeController@index')->name('welcome');
Route::get('/about', 'AboutController@index')->name('about');
Route::get('/feedbacks', 'FeedbackController@index')->name('feedback');
Route::get('/gallery', 'GalleryController@index')->name('gallery');
Route::get('/contacts', 'ContactsController@index')->name('contacts');
Route::get('/to_customers', 'ToCustomersController@index')->name('toCustomers');
Route::get('/catalog', 'CatalogController@index')->name('catalog');
Route::get('/to_partner', 'ParthnerController@index')->name('partner');
Route::get('/sales', 'SalesController@index')->name('sales');
Route::get('/services', 'ServicesController@index')->name('services');
Route::get('/services/{id}', 'ServicesController@service')->name('service');
Route::post('/services/add/{id}', 'ServicesController@confirmService')->name('service-confirm');
Route::post('/feedbacks', 'FeedbackController@add')->name('feedback-add');

Route::get('/product/{id}', 'ProductsController@index')->name('product');
Route::get('/category/{id}', 'CategoryController@index')->name('category');

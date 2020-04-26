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
    Route::get('/orders', 'OrderController@index')->name('home');
    Route::get('/orders/{order}', 'OrderController@show')->name('orders.show');
    Route::match(['put', 'patch'],'/orders/{order}', 'OrderController@update')->name('orders.update');
    Route::resource('categories', 'CategoryController');
    Route::resource('services', 'ServiceController');
    Route::resource('categories/child', 'ChildCategoryController');
    Route::resource('products', 'ProductController');
    Route::post('product/image/delete','ProductController@deleteImage');
    Route::post('service/image/delete','ServiceController@deleteIcon');

});
Route::get('/', 'WelcomeController@index')->name('welcome');
Route::get('/about', 'AboutController@index')->name('about');
Route::get('/contacts', 'ContactsController@index')->name('contacts');
Route::get('/to_customers', 'ToCustomersController@index')->name('toCustomers');
Route::get('/catalog', 'CatalogController@index')->name('catalog');
Route::get('/to_partner', 'ParthnerController@index')->name('partner');
Route::get('/sales', 'SalesController@index')->name('sales');
Route::get('/services', 'ServicesController@index')->name('services');
Route::get('/services/{id}', 'ServicesController@service')->name('service');
Route::get('/basket', 'BasketController@index')->name('basket');
Route::get('/basket/place', 'BasketController@basketPlace')->name('basket-place');
Route::post('/basket/add/{id}', 'BasketController@add')->name('basket-add');
Route::post('/basket/remove/{id}', 'BasketController@remove')->name('basket-remove');
Route::post('/basket/place', 'BasketController@basketConfirm')->name('basket-confirm');

Route::get('/product/{id}', 'ProductsController@index')->name('product');
Route::get('/category/{id}', 'CategoryController@index')->name('category');

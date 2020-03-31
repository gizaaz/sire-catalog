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

Route::get('/', 'WelcomeController@index')->name('welcome');
Route::get('/about', 'AboutController@index')->name('about');
Route::get('/contacts', 'ContactsController@index')->name('contacts');
Route::get('/to_customers', 'ToCustomersController@index')->name('toCustomers');
Route::get('/catalog', 'CatalogController@index')->name('catalog');
Route::get('/product', 'ProductsController@index')->name('product');

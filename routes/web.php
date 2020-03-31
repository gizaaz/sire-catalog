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
Route::get('/to_partner', 'ParthnerController@index')->name('partner');
Route::get('/sales', 'SalesController@index')->name('sales');
Route::get('/services', 'ServicesController@index')->name('services');

Route::get('/product/{id}', 'ProductsController@index')->name('product');
Route::get('/category/{id}', 'CategoryController@index')->name('category');

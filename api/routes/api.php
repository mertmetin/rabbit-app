<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Auth::routes();
Route::post('/activateUser', 'Auth\RegisterController@activateUser');
Route::post('/resendCode', 'Auth\RegisterController@resendCode');
Route::post('/sendPasswordResetCode', 'Auth\ForgotPasswordController@sendPasswordResetCode');
Route::post('/resetPassword', 'Auth\ResetPasswordController@resetPassword');
Route::post('/changePassword', 'Auth\ChangePasswordController@changePassword');
Route::post('/editUser', 'UsersController@edit');
Route::post('/registerCustomer', 'Payment\CustomerController@register');
Route::post('/addCard', 'Payment\CardController@add');
Route::post('/deleteCard', 'Payment\CardController@delete');
Route::post('/getCards', 'Payment\CardController@get');
Route::post('/updateCard', 'Payment\CardController@update');
Route::post('/getAddresses', 'Address\AddressController@get');
Route::post('/addAddress', 'Address\AddressController@add');
Route::post('/deleteAddress', 'Address\AddressController@delete');
Route::post('/editAddress', 'Address\AddressController@edit');
Route::post('/getProducts', 'Product\ProductController@get');
Route::post('/getProductCategories', 'Product\ProductCategoryController@get');
Route::post('/getPromotions', 'Promotions\PromotionsController@get');



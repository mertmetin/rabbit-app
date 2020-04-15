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

<?php

use App\Http\Controllers\EvenementController;
use Illuminate\Support\Facades\Route;
use  App\Http\Controllers\AuthController;

//les routes login
Route::get('/login',[AuthController::class,'showLogin'])->name('login');
Route::post('/login',[  AuthController::class,'login'])->name('login.post');
Route::post('/login',[AuthController::class])->name('logout');


//les routes evenement
Route::middleware('auth')->group(function(){
    Route::resource('/admin/evenements',EvenementController::class);
});

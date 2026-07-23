<?php

use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\EvenementController;
use Illuminate\Support\Facades\Route;
use  App\Http\Controllers\AuthController;

//les routes login

Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.post');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

//les routes evenement
Route::middleware('auth')->group(function () {
    Route::resource('admin/evenements', EvenementController::class);
});

//DAshboard

Route::middleware('auth')->group(function(){

Route::get('dashboard',function(){
    return view('dashboard');})->name('dashboard');

    Route::get('dashbordEtu' , [EtudiantController::class,  'dashboard'])->name('dashbordEtu');
    Route::get('evenement' , [EvenementController::class, 'index'])->name('evenement');

});

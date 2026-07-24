<?php

use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\EvenementController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\ReservationController;


use Illuminate\Support\Facades\Route;
use  App\Http\Controllers\AuthController;

//les routes login

Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.post');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');







//DAshboard

Route::middleware('auth')->group(function(){
// dashboard admin
Route::get('dashboard',function(){
    return view('dashboard');})->name('dashboard');
        Route::post('evenement' , [EvenementController::class, 'index'])->name('evenements.index');
        // administrations des evenements
Route::get('/gererEnv/create', [EvenementController::class, 'create'])
    ->name('gererEnv.create');
      // Enregistrer un événement
    Route::post('/gererEnv', [EvenementController::class, 'store'])
        ->name('gererEnv.store');});



Route::middleware('auth')->group(function(){
// dashboard etudient
    Route::get('dashbordEtu' , [EtudiantController::class,  'dashboard'])->name('dashbordEtu');
    // list des evenement
    Route::get('evenement' , [EvenementController::class, 'index'])->name('evenement');
    // mes ticket
    Route::get('ticket',[TicketController ::class  ,'index'])->name('ticket');
//    reservation un evenement
    Route::post('reservations{evenement}', [ReservationController::class, 'store'])
    ->name('reservations.store');

// mes reservation
    Route::get('reservation',[ReservationController::class ,'index'])->name('reservation');
// administrations des evenements
Route::get('/gererEnv/create', [EvenementController::class, 'create'])
    ->name('gererEnv.create');
      // Enregistrer un événement
    Route::post('/gererEnv', [EvenementController::class, 'store'])
        ->name('gererEnv.store');
    });

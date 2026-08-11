<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthentificationController;
use App\Http\Controllers\Api\EvenementController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\TicketController;




// | AUTHENTIFICATION



Route::post('/login', [
    AuthentificationController::class,
    'login'
]);




//  ÉVÉNEMENTS



Route::get('/evenements', [
    EvenementController::class,
    'index'
]);

Route::post('/evenements', [
    EvenementController::class,
    'store'
]);

Route::put('/evenements/{id}', [
    EvenementController::class,
    'update'
]);

Route::delete('/evenements/{id}', [
    EvenementController::class,
    'destroy'
]);




// ROUTES UTILISATEUR CONNECTÉ



Route::middleware('auth:sanctum')->group(function () {


    // Logout

    Route::post('/logout', [
        AuthentificationController::class,
        'logout'
    ]);



    //  Mes réservations

    Route::get('/mes-reservations', [
        ReservationController::class,
        'mesReservations'
    ]);



    //  Créer une réservation

    Route::post('/reservations', [
        ReservationController::class,
        'store'
    ]);


    //  Annuler une réservation

    Route::delete('/reservations/{id}', [
        ReservationController::class,
        'destroy'
    ]);



    //  Mes tickets

    Route::get('/tickets', [
        TicketController::class,
        'index'
    ]);

});
